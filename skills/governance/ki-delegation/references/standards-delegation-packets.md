# Delegation-packet standard

## Scope

A delegation packet is an explicit, durable brief for bounded agent work inside one approved roadmap record.

It translates a runtime subagent brief into a reviewable artifact before workers are dispatched.

It is not required for a focused task that remains with the orchestrator, and it does not replace the work item’s plan, authority, baseline, review packet, or acceptance decision.

## Packet shape

An opted-in packet uses this structure inside the work item’s `## Delegation` section:

```markdown
## Delegation

### Locked decisions

- Decision that workers must not reopen.

### Escalate

- Decision that workers must return to the orchestrator.

### Rounds

- Round 1: `research-sources`.
- Round 2: `apply-contract` after Round 1 is gated.

### Worker: research-sources

- **Deliverable:** Primary-source evidence for the named unknown.
- **Files:** None; read-only research.
- **Definition of done:** Findings cite the source and state remaining uncertainty.
- **Model:** fast — bounded factual discovery.
- **Verify:** Orchestrator checks every source and conclusion.
- **Checkpoint:** Return after the source set is complete.
```

The packet contains non-empty `Locked decisions`, `Escalate`, and `Rounds` sections and at least one `Worker:` subsection.

Each worker subsection names a bounded deliverable, file or system boundary, pass/fail definition of done, explicit model choice, verification gate, and completion checkpoint.

The rounds record ordering and dependency boundaries; no two workers may be assigned overlapping write scope in the same round.

## Quality bar

The packet must be cold-agent ready: a worker with no hidden conversation context can begin from the brief, knows what is fixed, and knows when to stop.

Choose the minimum viable model for each worker; stronger reasoning responds to decision risk, not habit or retained context.

Split a task that mixes research, judgment, and mechanical implementation when the split makes ownership and gates clearer.

The orchestrator reviews every result and the stated verification before integrating or committing it.

## Mechanical boundary

The native rubric checks only the opt-in marker, required headings, and non-empty labeled worker fields.

It cannot decide whether a model is actually sufficient, a split is sensible, a decision is truly locked, or a verification gate is adequate; those are judgment review.

CONFORM may rename the legacy `### Escalation` heading to `### Escalate` when a packet has otherwise explicitly opted in.

It never supplies semantic packet content.
