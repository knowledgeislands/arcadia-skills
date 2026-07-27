import { describe, expect, test } from 'bun:test'
import type { KiCheckerRubricContext } from '../contexts/contexts.ts'
import { KI_CHECKER } from './ki-checker.ts'

const publicationItem = KI_CHECKER.items.find(({ code }) => code === 'KI-CHECKER-6')

if (!publicationItem?.mechanical) throw new Error('KI-CHECKER-6 must expose its mechanical policy')

const context = (state: 'in-sync' | 'missing' | 'stale', propose = () => {}): KiCheckerRubricContext => ({
  imports: [],
  rootSkill: true,
  declaredSharedModules: ['rubric'],
  sharedDependencies: [],
  legacyLibPresent: false,
  presentSharedModules: ['rubric'],
  rubricModuleExists: true,
  structuredRubricRequired: true,
  itemsIndexExists: true,
  itemsIndexDefinesRules: false,
  familyModules: [],
  publication: { target: 'references/rubric.md', rendered: '', state, propose }
})

describe('KI-CHECKER-6 generated publication policy', () => {
  test('reports exact, missing, and stale publication evidence deterministically', () => {
    expect(publicationItem.mechanical?.audit.run(context('in-sync'))).toEqual([
      { status: 'PASS', message: 'the structured catalogue publication is exact' }
    ])
    expect(publicationItem.mechanical?.audit.run(context('missing'))).toEqual([
      { status: 'VIOLATION', message: '`references/rubric.md` is missing from the structured catalogue' }
    ])
    expect(publicationItem.mechanical?.audit.run(context('stale'))).toEqual([
      { status: 'VIOLATION', message: '`references/rubric.md` differs from the structured catalogue' }
    ])
  })

  test('requests only the host-owned derived write during conform', () => {
    let proposals = 0
    publicationItem.mechanical?.conform?.run(context('stale', () => proposals++))
    publicationItem.mechanical?.conform?.run(context('missing', () => proposals++))
    publicationItem.mechanical?.conform?.run(context('in-sync', () => proposals++))

    expect(proposals).toBe(2)
  })

  test('does not apply the exemplar policy to another skill subject', () => {
    const otherSkill = { ...context('stale'), rootSkill: false }
    expect(publicationItem.mechanical?.audit.run(otherSkill)).toEqual([
      { status: 'NOT_APPLICABLE', message: 'the audited skill is not the structured rubric exemplar' }
    ])
  })
})
