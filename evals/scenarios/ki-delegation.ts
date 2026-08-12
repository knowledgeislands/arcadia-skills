/** Eval scenarios for the durable high-risk `ki-delegation` packet contract. */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-delegation',
    id: 'delegation-skips-routine-runtime-brief',
    prompt:
      'I need a runtime subagent to read two public documents and return a concise summary. The task has no repository writes, locked decision, escalation, or later audit requirement. Must I create a KI durable delegation packet?',
    assertions: [
      { name: 'does not require durable packet', re: /not.*(need|required)|no.*(need|required)|ordinary.*runtime/i },
      { name: 'identifies absent durable threshold', re: /audit|authority|escalat|risk|handoff/i },
      { name: 'allows runtime guidance to handle the task', re: /runtime|subagent|delegate/i }
    ],
    rubric:
      'House contract: `ki-delegation` is not routine subagent guidance. A durable packet is reserved for an approved delegated change whose mutation risk, cross-agent handoff, or later audit need makes locked decisions, authority, isolation, escalation, verification, and return evidence worth recording.'
  },
  {
    skill: 'ki-delegation',
    id: 'delegation-high-risk-packet',
    prompt:
      'An approved migration delegates a worker permission to change one database configuration after a locked decision. The worker must stop if compatibility evidence changes, and the eventual review needs a durable verification result. What must its KI delegation packet contain?',
    assertions: [
      { name: 'requires locked decisions and escalation', re: /locked decision|escalat/i },
      { name: 'requires bounded scope and authority', re: /scope|boundary|authority|permi/i },
      { name: 'requires isolation', re: /isolat|sandbox|worktree/i },
      { name: 'requires verification and return evidence', re: /verif|return|evidence/i }
    ],
    rubric:
      'House contract: a high-risk approved handoff uses a durable packet with non-empty Locked decisions and Escalate sections plus a worker Deliverable, Inputs, Scope, Authority, Isolation, Verify, Return, and Checkpoint. It records governance boundaries, not model choice or runtime scheduling.'
  },
  {
    skill: 'ki-delegation',
    id: 'delegation-worker-isolation-contract',
    prompt:
      'My high-risk packet names a deliverable and files but says nothing about source inputs, permitted actions, sandbox or worktree isolation, stop point, or return evidence. Is it ready to dispatch?',
    assertions: [
      { name: 'rejects the incomplete brief', re: /not ready|incomplete|must|missing|before dispatch/i },
      { name: 'requires explicit inputs', re: /input|source/i },
      { name: 'requires bounded authority', re: /authority|permi|allowed|prohibit/i },
      { name: 'requires explicit isolation', re: /isolat|sandbox|worktree|read.only/i },
      { name: 'requires a return contract', re: /return|evidence|result|report/i }
    ],
    rubric:
      'House contract: the durable packet is not ready. Each worker brief needs Deliverable, Inputs, Scope, Authority, Isolation, Verify, Return, and Checkpoint fields, while the packet supplies locked decisions and escalation. Authority bounds permitted actions; scope excludes side effects; isolation states the enforceable boundary; return states reviewable evidence.'
  }
]
