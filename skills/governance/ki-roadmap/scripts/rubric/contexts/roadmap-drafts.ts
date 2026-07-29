import type { ConformProposal, ConformWrite } from '../../shared/rubric.ts'
import { type Finding, rootRoadmap } from './roadmap-evidence.ts'

export type RoadmapDraft = {
  normaliseRoot: () => void
  proposal: () => ConformProposal
}

const safeToDraft = (findings: readonly Finding[]): boolean => !findings.some((finding) => finding.level === 'FAIL' && finding.area !== 'ROOT-1')

export const createRoadmapDraft = (_repository: string, findings: readonly Finding[]): RoadmapDraft | undefined => {
  if (!safeToDraft(findings)) return undefined
  let write: ConformWrite | undefined
  return {
    normaliseRoot: () => {
      write = { path: 'ROADMAP.md', content: rootRoadmap() }
    },
    proposal: () => (write ? { writes: [write] } : { writes: [] })
  }
}
