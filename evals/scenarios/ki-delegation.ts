/** Eval scenarios for the portable `ki-delegation` coordinator and packet contract. */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-delegation',
    id: 'delegation-coordinator-first-suitability',
    prompt:
      'I have an approved substantial change with three independent, bounded lanes. How should the primary agent use subagents, and what responsibilities must it retain?',
    assertions: [
      { name: 'adopts a coordinator-first role', re: /coordinat(or|e|ing)|orchestrat(or|e|ing)/i },
      { name: 'remains available for human interaction', re: /human|user|interaction|available/i },
      { name: 'retains authority and decisions', re: /authority|decision/i },
      { name: 'retains integration and verification', re: /integrat|verif/i }
    ],
    rubric:
      'House contract: substantial authorised work with safely independent bounded lanes should keep the primary agent as the human-facing coordinator while subagents execute suitable lanes. The coordinator retains user interaction, authority, decisions, dependency ordering, integration, verification, and final accountability.'
  },
  {
    skill: 'ki-delegation',
    id: 'delegation-keep-unsafe-work-local',
    prompt:
      'This approved task is quick, tightly coupled, and requires overlapping edits; writing a cold-agent brief would take longer than doing it. Should the primary agent still delegate it?',
    assertions: [
      { name: 'keeps unsuitable work local', re: /keep|remain|handle|do[^.\n]{0,20}(local|itself|primary|coordinator)/i },
      { name: 'does not mandate delegation', re: /do not|don.t|shouldn.t|not (delegate|required|mandatory)|no need/i },
      { name: 'recognises overlap or coupling risk', re: /overlap|coupl|conflict|integrat/i },
      { name: 'recognises brief cost', re: /brief|overhead|cost|longer|econom/i }
    ],
    rubric:
      'House contract: coordinator-first is a suitability test, not a mandate. Quick, tightly coupled, overlapping, context-heavy, or uneconomic-to-brief work stays with the primary agent because a safe worker brief and integration would cost more or increase risk.'
  },
  {
    skill: 'ki-delegation',
    id: 'delegation-worker-isolation-contract',
    prompt:
      'My worker brief names a deliverable and files but says nothing about source inputs, permitted actions, sandbox or worktree isolation, or what evidence to return. Is it ready to dispatch?',
    assertions: [
      { name: 'rejects the incomplete brief', re: /not ready|incomplete|must|missing|before dispatch/i },
      { name: 'requires explicit inputs', re: /input|source/i },
      { name: 'requires bounded authority', re: /authority|permi|allowed|prohibit/i },
      { name: 'requires explicit isolation', re: /isolat|sandbox|worktree|read.only/i },
      { name: 'requires a return contract', re: /return|evidence|result|report/i }
    ],
    rubric:
      'House contract: the packet is not cold-agent ready. Each worker brief needs explicit Inputs, Authority, Isolation, and Return fields in addition to deliverable, files, definition of done, model, verify, and checkpoint. Authority bounds allowed actions; isolation states the sandbox or worktree boundary; return states the evidence the coordinator will review.'
  }
]
