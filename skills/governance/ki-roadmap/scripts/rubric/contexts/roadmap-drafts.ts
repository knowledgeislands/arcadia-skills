import type { ConformProposal, ConformWrite } from '../../shared/rubric.ts'
import { type Finding, rootIndex, workItemsFor } from './roadmap-evidence.ts'

export type RoadmapDraft = {
  rebuildIndex: () => void
  proposal: () => ConformProposal
}

const safeToDraft = (findings: readonly Finding[]): boolean =>
  !findings.some((finding) => finding.level === 'FAIL' && finding.area !== 'INDEX-1')

export const createRoadmapDraft = (repository: string, findings: readonly Finding[]): RoadmapDraft | undefined => {
  if (!safeToDraft(findings)) return undefined
  let write: ConformWrite | undefined
  return {
    rebuildIndex: () => {
      write = { path: 'ROADMAP.md', content: rootIndex(workItemsFor(repository)) }
    },
    proposal: () => (write ? { writes: [write] } : { writes: [] })
  }
}
