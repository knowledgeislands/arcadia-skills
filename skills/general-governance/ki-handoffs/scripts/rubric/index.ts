import { relative } from 'node:path'
import {
  createHandoffsContext,
  type HandoffArtifact,
  hasDecisionsHeading,
  hasReadinessMarker,
  namesEscalate,
  namesLocked
} from './contexts/handoffs.ts'

const VALID_TIERS = new Set(['haiku', 'sonnet', 'opus'])

type NativeHandoffsContext = {
  readonly target: string
  readonly targetExists: boolean
  readonly artifacts: readonly HandoffArtifact[]
}

const outcome = (status: 'PASS' | 'VIOLATION' | 'NOT_APPLICABLE', message: string, subject?: string) => ({
  status,
  message,
  ...(subject ? { subject } : {})
})

const unavailable = (context: NativeHandoffsContext) =>
  !context.targetExists
    ? [outcome('NOT_APPLICABLE', 'Requested path is absent.', context.target)]
    : context.artifacts.length === 0
      ? [outcome('NOT_APPLICABLE', 'No handoff-opted-in artifacts (handoff: true).')]
      : undefined

const readinessWrite = (context: NativeHandoffsContext, artifact: HandoffArtifact) => ({
  path: relative(context.target, artifact.path),
  content: artifact.content.replace(artifact.frontmatterMatch, `---\n${artifact.frontmatterBlock}\nreadiness: pending\n---`)
})

export default {
  contract: 1,
  skill: 'ki-handoffs',
  createContext: ({ repository }: { readonly repository: string }): NativeHandoffsContext => {
    const { target, targetExists, artifacts } = createHandoffsContext(repository, true)
    return { target, targetExists, artifacts }
  },
  families: [
    {
      code: 'HAND',
      title: 'Handoff readiness',
      items: [
        {
          kind: 'mechanical',
          code: 'HAND-1',
          title: 'Semantic tier marker',
          level: 'FAIL',
          phase: 'INSPECT',
          audit: (context: NativeHandoffsContext) => {
            if (!context.targetExists)
              return [outcome('VIOLATION', `Requested audit path does not exist: ${context.target}`, context.target)]
            if (context.artifacts.length === 0) return [outcome('NOT_APPLICABLE', 'No handoff-opted-in artifacts (handoff: true).')]
            return context.artifacts.map((artifact) => {
              const tier = artifact.frontmatter.tier
              if (!tier) return outcome('VIOLATION', "handoff artifact missing 'tier' (one of haiku | sonnet | opus)", artifact.subject)
              return outcome(
                VALID_TIERS.has(tier) ? 'PASS' : 'VIOLATION',
                VALID_TIERS.has(tier) ? 'tier is a valid semantic value.' : `tier '${tier}' not one of haiku | sonnet | opus`,
                artifact.subject
              )
            })
          }
        },
        {
          kind: 'mechanical',
          code: 'HAND-2',
          title: 'Decisions locked versus escalate',
          level: 'FAIL',
          phase: 'INSPECT',
          audit: (context: NativeHandoffsContext) => {
            const skipped = unavailable(context)
            if (skipped) return skipped
            return context.artifacts.map((artifact) => {
              if (!hasDecisionsHeading(artifact))
                return outcome('VIOLATION', "no decisions section (a '## Decisions' heading)", artifact.subject)
              const complete = namesLocked(artifact) && namesEscalate(artifact)
              return outcome(
                complete ? 'PASS' : 'VIOLATION',
                complete
                  ? 'Decisions section distinguishes locked from escalate.'
                  : "decisions section must distinguish 'locked' from 'escalate' (both labels present)",
                artifact.subject
              )
            })
          }
        },
        {
          kind: 'mechanical',
          code: 'HAND-3',
          title: 'Readiness marker',
          level: 'WARN',
          phase: 'INSPECT',
          audit: (context: NativeHandoffsContext) => {
            const skipped = unavailable(context)
            if (skipped) return skipped
            return context.artifacts.map((artifact) =>
              outcome(
                hasReadinessMarker(artifact) ? 'PASS' : 'VIOLATION',
                hasReadinessMarker(artifact)
                  ? 'Readiness marker is present.'
                  : "no readiness marker (readiness: frontmatter, a '## Readiness' heading, or a 'Readiness test' checkbox)",
                artifact.subject
              )
            )
          },
          repair: (context: NativeHandoffsContext) => ({
            writes: context.artifacts
              .filter((artifact) => !hasReadinessMarker(artifact))
              .map((artifact) => readinessWrite(context, artifact))
          })
        },
        {
          kind: 'judgment',
          code: 'HAND-4',
          title: 'Locked decisions are closed',
          prompt: 'The locked decisions are genuinely closed: no residual reasoning, hedging, or open questions are parked under “locked”.'
        },
        {
          kind: 'judgment',
          code: 'HAND-5',
          title: 'Definition of done',
          prompt: 'Each unit has a pass/fail acceptance test, rather than a goal.'
        },
        {
          kind: 'judgment',
          code: 'HAND-6',
          title: 'Appropriate assigned tier',
          prompt: 'The assigned tier is appropriate to the concreteness and judgement required by the work.'
        },
        {
          kind: 'judgment',
          code: 'HAND-7',
          title: 'Cold-agent readiness',
          prompt: 'A cold agent at the assigned tier could execute the first phase from this handoff alone.'
        },
        {
          kind: 'judgment',
          code: 'HAND-8',
          title: 'Tokenomics composition boundary',
          prompt: 'Cost and tier-selection reasoning is delegated to ki-tokenomics; no model identifiers or prices are hard-coded.'
        }
      ]
    }
  ]
} as const
