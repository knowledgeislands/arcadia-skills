/** Eval scenarios for the flat non-KB `ki-roadmap` contract. */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-roadmap',
    id: 'repo-roadmap-flat-item-in-place-execution',
    prompt: 'This non-KB repository has a Next item that needs multi-file work. Where should I put the execution plan?',
    assertions: [
      { name: 'names canonical flat item path', re: /docs\/roadmap\//i },
      { name: 'keeps one canonical item', re: /same|single|one|in.place/i },
      { name: 'rejects duplicate plan file', re: /not|never|no.*duplicate/i }
    ],
    rubric:
      'House fact: a non-KB repository has one canonical work-item shape. The concise item directly under docs/roadmap is enriched in place with execution detail; there is no plans directory or second plan record.'
  },
  {
    skill: 'ki-roadmap',
    id: 'repo-roadmap-id-theme-and-horizon',
    prompt: "Set up a Future item for 'replace stale links' in the seo theme. I want a generic filename and no candidate field. Anything to correct?",
    assertions: [
      { name: 'repository-theme-serial identifier', re: /<REPO>-<THEME>-<NNN>|SEO|001/i },
      { name: 'flat placement', re: /docs\/roadmap\//i },
      { name: 'explicit theme field', re: /theme/i },
      { name: 'future candidate field', re: /candidate/i }
    ],
    rubric:
      'House fact: each item is docs/roadmap/<REPO>-<THEME>-<NNN>-<slug>.md and carries explicit theme, horizon, status, dependencies, and candidate: true for Future work.'
  },
  {
    skill: 'ki-roadmap',
    id: 'repo-roadmap-one-home-generated-index',
    prompt: 'I copied a work item into root ROADMAP.md for convenience and changed its link text by hand. Is that acceptable?',
    assertions: [
      { name: 'one authoritative item home', re: /one|single|authoritative|canonical|duplicate/i },
      { name: 'flat item directory owns prose', re: /docs\/roadmap\//i },
      { name: 'root is generated index', re: /generated|index|exact/i },
      { name: 'rejects hand editing', re: /not|mustn.t|cannot|regenerate|invalid|drift/i }
    ],
    rubric:
      'House fact: each item has one authoritative flat Markdown file. Root ROADMAP.md is an exact generated linked index, never a second prose home and never hand-edited.'
  },
  {
    skill: 'ki-roadmap',
    id: 'repo-roadmap-blocks-graph',
    prompt: "KI-WEB-SEO-005 cannot start until KI-WEB-CNT-004 is finished. I've added blocked-by: [KI-WEB-CNT-004] and would like to start it now in parallel. Anything wrong with that?",
    assertions: [
      { name: 'blocked-by field', re: /blocked-by/i },
      { name: 'reverse blocks edge', re: /blocks/i },
      { name: 'identifier blocker reference', re: /KI-WEB-CNT-004/i },
      { name: 'no in-progress before blockers done', re: /done|finish|complete|wait|before/i }
    ],
    rubric:
      'House fact: work-item identifiers are globally unique. blocks/blocked-by are bidirectional arrays, and no item may become ready or in-progress before its blockers are done.'
  }
]
