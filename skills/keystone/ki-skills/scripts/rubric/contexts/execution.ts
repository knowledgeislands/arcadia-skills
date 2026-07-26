import {
  type AuditOutcome,
  type MechanicalRubric,
  RUBRIC_PHASES,
  type RubricDefinition,
  type RubricFamily,
  type RubricItem,
  type RubricPhase
} from '../../shared/rubric.ts'
import type { KiSkillsRubricContext } from './contexts.ts'
import { createKiSkillsSubjects, KI_SKILLS_SUBJECT_FAMILIES, type KiSkillsSubject } from './subjects.ts'

type ExecutableMechanical = MechanicalRubric<unknown>
type ExecutableItem = RubricItem<unknown>
export type ExecutableFamily = RubricFamily<KiSkillsRubricContext, unknown>

export type KiSkillsExecutionContext = {
  readonly repository: string
  readonly subjects: readonly KiSkillsSubject[]
}

type ConformProposal = {
  readonly writes: readonly { readonly path: string; readonly content: string }[]
}

type HostedMechanical = Omit<MechanicalRubric<unknown>, 'audit' | 'conform'> & {
  readonly audit: {
    readonly phase: RubricPhase
    readonly run: (context: KiSkillsExecutionContext) => readonly AuditOutcome[]
  }
  readonly conform?: {
    readonly phase: RubricPhase
    readonly run: (context: KiSkillsExecutionContext) => ConformProposal
  }
}

type HostedItem = Omit<ExecutableItem, 'mechanical'> & {
  readonly mechanical?: HostedMechanical
}

export type HostedFamily = Omit<ExecutableFamily, 'selectContext' | 'items'> & {
  readonly selectContext: (context: KiSkillsExecutionContext) => KiSkillsExecutionContext
  readonly items: readonly HostedItem[]
}

/** Erase one family context only at the multi-subject execution boundary. */
export const executableFamily = <Context>(family: RubricFamily<KiSkillsRubricContext, Context>): ExecutableFamily => ({
  ...family,
  selectContext: (context) => family.selectContext(context),
  items: family.items.map((item): ExecutableItem => {
    if (!item.mechanical) return item
    const mechanical = item.mechanical
    return {
      ...item,
      mechanical: {
        level: mechanical.level,
        ...(mechanical.overrideLevels ? { overrideLevels: mechanical.overrideLevels } : {}),
        ...(mechanical.heuristic === undefined ? {} : { heuristic: mechanical.heuristic }),
        audit: {
          phase: mechanical.audit.phase,
          run: (context: unknown) => mechanical.audit.run(context as Context)
        },
        ...(mechanical.conform
          ? {
              conform: {
                phase: mechanical.conform.phase,
                run: (context: unknown) => mechanical.conform?.run(context as Context) ?? []
              }
            }
          : {}),
        ...(mechanical.conformOn ? { conformOn: mechanical.conformOn } : {})
      }
    }
  })
})

/** Erase the heterogeneous family contexts at their one shared execution boundary. */
export const executableCatalogue = (families: RubricDefinition<KiSkillsRubricContext>['families']): readonly ExecutableFamily[] =>
  families.map((family) => executableFamily(family as unknown as RubricFamily<KiSkillsRubricContext, unknown>))

const appliesTo = (subject: KiSkillsSubject, family: ExecutableFamily): boolean =>
  KI_SKILLS_SUBJECT_FAMILIES[subject.scope].some((code) => code === family.code)

const subjectPath = (subject: KiSkillsSubject): string | undefined => subject.subject

const auditOutcomes = (
  context: KiSkillsExecutionContext,
  family: ExecutableFamily,
  item: ExecutableItem & { readonly mechanical: ExecutableMechanical }
): readonly AuditOutcome[] =>
  context.subjects.flatMap((subject) => {
    if (!appliesTo(subject, family)) return []
    const fallback = subjectPath(subject)
    return item.mechanical.audit.run(family.selectContext(subject.context())).map((outcome) => ({
      ...outcome,
      ...(outcome.subject || !fallback ? {} : { subject: fallback })
    }))
  })

const shouldConform = (item: ExecutableItem & { readonly mechanical: ExecutableMechanical }, outcomes: readonly AuditOutcome[]): boolean =>
  outcomes.some((outcome) => outcome.status === 'VIOLATION' || (outcome.status === 'INFO' && item.mechanical.conformOn?.includes('INFO')))

/**
 * Apply every eligible item-owned transformation to shared in-memory documents,
 * then return one coalesced proposal for the host to publish.
 */
const conformProposal = (repository: string, catalogue: readonly ExecutableFamily[]) => {
  const working = createKiSkillsSubjects({ mode: 'conform', roots: [repository], reportTarget: repository })
  const conforms = catalogue
    .flatMap((family, familyIndex) =>
      family.items.flatMap((item, itemIndex) => (item.mechanical?.conform ? [{ family, familyIndex, item, itemIndex }] : []))
    )
    .sort((left, right) => {
      const phase =
        RUBRIC_PHASES.indexOf(left.item.mechanical?.conform?.phase ?? 'NORMALISE') -
        RUBRIC_PHASES.indexOf(right.item.mechanical?.conform?.phase ?? 'NORMALISE')
      return phase || left.familyIndex - right.familyIndex || left.itemIndex - right.itemIndex
    })

  for (const { family, item } of conforms)
    for (const subject of working.subjects) {
      if (!appliesTo(subject, family)) continue
      if (!item.mechanical?.conform) continue
      const familyContext = family.selectContext(subject.context())
      const outcomes = item.mechanical.audit.run(familyContext)
      if (shouldConform(item as ExecutableItem & { readonly mechanical: ExecutableMechanical }, outcomes))
        item.mechanical.conform.run(familyContext)
    }

  return working.proposal()
}

/** Bind one canonical family to KI's current repository-level host contract. */
export const bindExecution = (family: ExecutableFamily, catalogue: readonly ExecutableFamily[]): HostedFamily => ({
  ...family,
  selectContext: (context: KiSkillsExecutionContext) => context,
  items: family.items.map((item): HostedItem => {
    const { mechanical, ...identity } = item
    if (!mechanical) return identity
    return {
      ...identity,
      mechanical: {
        level: mechanical.level,
        ...(mechanical.overrideLevels ? { overrideLevels: mechanical.overrideLevels } : {}),
        ...(mechanical.heuristic === undefined ? {} : { heuristic: mechanical.heuristic }),
        ...(mechanical.conformOn ? { conformOn: mechanical.conformOn } : {}),
        audit: {
          phase: mechanical.audit.phase,
          run: (context: KiSkillsExecutionContext) => auditOutcomes(context, family, { ...identity, mechanical })
        },
        ...(mechanical.conform
          ? {
              conform: {
                phase: mechanical.conform.phase,
                run: (context: KiSkillsExecutionContext) => conformProposal(context.repository, catalogue)
              }
            }
          : {})
      }
    }
  })
})

export const createExecutionContext = ({ repository }: { readonly repository: string }): KiSkillsExecutionContext => ({
  repository,
  subjects: createKiSkillsSubjects({ mode: 'audit', roots: [repository], reportTarget: repository }).subjects
})
