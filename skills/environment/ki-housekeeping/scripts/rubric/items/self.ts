import type { RubricOutcomes } from '../../shared/rubric.ts'
import type { HousekeepingRubricContext } from '../contexts/housekeeping.ts'

const one = <Result>(outcome: Result): RubricOutcomes<Result> => [outcome]
const SELF_ITEMS = [
  {
    code: 'SELF-1',
    title: 'Repository-local ki-self source',
    description:
      'The repository owns one regular `ki-self` source at `.agents/skills/ki-self/SKILL.md`. Missing is a WARN; a symlink or non-regular source is a FAIL.',
    sources: ['standards.md'],
    mechanical: {
      level: 'WARN' as const,
      overrideLevels: ['FAIL' as const],
      audit: {
        phase: 'INSPECT' as const,
        run: (context: HousekeepingRubricContext) => {
          const source = context.localSkillSource()
          if (source.state === 'missing')
            return one({ status: 'VIOLATION', message: 'missing repository-local ki-self source', subject: source.path })
          if (source.state === 'invalid')
            return one({
              status: 'VIOLATION',
              level: 'FAIL',
              message: 'repository-local ki-self source must be an owned regular file, not a symlink',
              subject: source.path
            })
          return one({ status: 'PASS', message: 'repository-local ki-self source is present', subject: source.path })
        }
      }
    }
  },
  {
    code: 'SELF-2',
    title: 'ki-self source name',
    description: 'The source declares `name: ki-self`. A mismatch is a FAIL.',
    sources: ['standards.md'],
    mechanical: {
      level: 'FAIL' as const,
      audit: {
        phase: 'INSPECT' as const,
        run: (context: HousekeepingRubricContext) => {
          const source = context.localSkillSource()
          if (source.state !== 'present')
            return one({ status: 'NOT_APPLICABLE', message: 'no present repository-local source to check', subject: source.path })
          return one({
            status: /^name:\s*ki-self\s*$/m.test(source.content ?? '') ? 'PASS' : 'VIOLATION',
            message: /^name:\s*ki-self\s*$/m.test(source.content ?? '')
              ? 'repository-local skill source declares name: ki-self'
              : 'repository-local skill source must declare name: ki-self',
            subject: source.path
          })
        }
      }
    }
  },
  {
    code: 'SELF-3',
    title: 'Claude runtime projection',
    description:
      'When `claude-code` is declared, `.claude/skills/ki-self` is a relative link to the canonical source. A missing or divergent projection is a FAIL.',
    sources: ['standards.md'],
    mechanical: {
      level: 'FAIL' as const,
      audit: {
        phase: 'INSPECT' as const,
        run: (context: HousekeepingRubricContext) => {
          if (!context.declaredRuntimes?.includes('claude-code'))
            return one({ status: 'NOT_APPLICABLE', message: 'Claude Code is not a declared runtime', subject: '.ki-config.toml' })
          const projection = context.claudeProjection()
          return one(
            projection.state === 'present'
              ? { status: 'PASS', message: 'Claude Code projects the canonical ki-self source', subject: projection.path }
              : {
                  status: 'VIOLATION',
                  message: 'Claude Code must project the canonical ki-self source by relative link',
                  subject: projection.path
                }
          )
        }
      }
    }
  },
  {
    code: 'SELF-4',
    title: 'Local-concerns contract',
    description:
      'The local skill gives its repository an intelligible local-concerns contract: regular work has a repeatable check or procedure; semi-regular human review has a ledger such as `HOUSEKEEPING.md`; one-off work remains on the roadmap; cross-repository patterns graduate to a named shared skill.',
    sources: ['standards.md'],
    judgment: {
      prompt:
        'The local skill gives its repository an intelligible local-concerns contract: regular work has a repeatable check or procedure; semi-regular human review has a ledger such as `HOUSEKEEPING.md`; one-off work remains on the roadmap; cross-repository patterns graduate to a named shared skill.'
    }
  }
] as const

export const SELF_1 = SELF_ITEMS[0]
export const SELF_2 = SELF_ITEMS[1]
export const SELF_3 = SELF_ITEMS[2]
export const SELF_4 = SELF_ITEMS[3]
export const SELF = [SELF_1, SELF_2, SELF_3, SELF_4] as const
