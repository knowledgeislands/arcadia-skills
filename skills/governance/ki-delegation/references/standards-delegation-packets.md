# Delegation-packet standard

## Contents

- [Scope](#scope)
- [Coordinator-first decision](#coordinator-first-decision)
- [Responsibility split](#responsibility-split)
- [Packet shape](#packet-shape)
- [Authority and isolation](#authority-and-isolation)
- [Rolling worker utilisation](#rolling-worker-utilisation)
- [Quality bar](#quality-bar)
- [Mechanical boundary](#mechanical-boundary)

## Scope

A delegation packet is an explicit, durable brief for bounded agent work inside one approved roadmap record.

It translates a runtime subagent brief into a reviewable artifact before workers are dispatched.

It is not required for focused work that remains with the primary agent, and it does not replace the work item’s plan, authority, baseline, review packet, or acceptance decision. The standard defines portable behaviour; the executing runtime supplies worker creation, sandbox, permissions, and concurrency.

## Coordinator-first decision

During authorised execution, the primary agent becomes the coordinator when the work is substantial and all of these conditions hold:

- one or more useful lanes are independent and bounded;
- a cold worker can receive sufficient inputs, locked decisions, and a pass/fail outcome;
- write scopes or external systems can be isolated so concurrent work does not conflict; and
- the expected context, quality, or elapsed-time benefit exceeds the dispatch and integration cost.

Keep the work with the primary agent when it is quick, tightly coupled, dependent on frequent human decisions, costly to brief without hidden context, or unsafe to isolate. If a lane becomes ambiguous, overlapping, or newly dependent after dispatch, stop or steer that worker and return the decision to the coordinator.

## Responsibility split

The coordinator remains the single human-facing thread. It owns requirements, user interaction, authority, locked decisions, lane selection, dependency ordering, worker steering or cancellation, result review, integration, verification, and the final response. It keeps the main context centred on decisions and distilled evidence rather than worker transcripts or noisy intermediate output.

A worker owns only its named lane. It follows the supplied inputs and restrictions, performs no ungranted side effect, stops at its checkpoint or escalation boundary, and returns the requested concise evidence. A worker result is a proposal until the coordinator reviews and integrates it.

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
- **Inputs:** The named questions and authoritative source locators.
- **Files:** None; read-only research.
- **Authority:** Read the named sources; perform no repository or external writes.
- **Isolation:** Read-only worker context with no write-capable tools.
- **Definition of done:** Findings cite the source and state remaining uncertainty.
- **Model:** fast — bounded factual discovery.
- **Verify:** Coordinator checks every source and conclusion.
- **Return:** Concise findings, source links, and unresolved conflicts; no raw browsing transcript.
- **Checkpoint:** Return after the source set is complete.
```

The packet contains non-empty `Locked decisions`, `Escalate`, and `Rounds` sections and at least one `Worker:` subsection.

Each worker subsection contains these non-empty fields:

- **Deliverable:** one bounded outcome;
- **Inputs:** source artifacts, locators, conventions, and decisions the cold worker needs;
- **Files:** the exact file or external-system boundary, including `None` for read-only research;
- **Authority:** allowed actions and prohibited side effects;
- **Isolation:** the runtime-neutral sandbox or worktree boundary;
- **Definition of done:** a pass/fail outcome;
- **Model:** an explicit model-purpose choice resolved through `ki-tokenomics` when active;
- **Verify:** the check the coordinator will apply;
- **Return:** the concise result and evidence format;
- **Checkpoint:** the condition at which the worker stops and returns control.

## Authority and isolation

Grant the least authority and tool access that can complete the lane. The worker brief may narrow inherited runtime permissions but never expands the work record’s authority. State external effects explicitly; filesystem scope alone does not govern network calls, messages, deployments, or other systems.

Choose the strongest practical isolation for the lane: read-only for research, an exclusive non-overlapping write boundary in a shared worktree, or an isolated worktree or sandbox when writes could interfere. If the runtime cannot enforce the required boundary, reduce the lane to a safer read-only task or keep it with the coordinator.

When a worker will run Git write commands in a shared worktree, its brief also names a unique temporary Git index path. The worker passes it explicitly on every Git write command, for example `GIT_INDEX_FILE=<worker-index> git add -- <paths>`. The path is a worker-local staging boundary, not authority to commit concurrently; `ki-git` owns the matching shared-`HEAD` serialization rule.

The rounds record genuine ordering and dependency boundaries; no two workers may be assigned overlapping write scope in the same round. They are not a batch barrier: once the coordinator verifies and integrates a completed worker result, it should assign that worker the next independent bounded lane without waiting for every worker named in the current round.

## Rolling worker utilisation

Independent delegation uses a rolling worker pool. Dispatch the currently safe non-overlapping lanes up to available capacity, then replenish a freed worker immediately with the next independent lane after its result has been reviewed and integrated. This matters especially when capacity is small, such as three worker slots: do not leave a slot idle while an independent lane is ready. Report each completion, verification result, and atomic commit as it lands.

Use a later round only when one lane genuinely depends on another's result or would otherwise overlap its write scope. Do not use rounds to make independent work wait for a nominal batch to finish.

`ki-batch` is different: it coordinates an explicitly authorised, synergistic set of separate Ready work records. A delegation packet may support an individual member's implementation, but ordinary replenishment of a worker slot does not create or require a `ki-batch` batch.

## Quality bar

The packet must be cold-agent ready: a worker with no hidden conversation context can begin from the brief, knows what is fixed, and knows when to stop.

Choose the minimum viable model for each worker; stronger reasoning responds to decision risk, not habit or retained context.

Split a task that mixes research, judgment, and mechanical implementation when the split makes ownership and gates clearer. Keep the next independent lane ready so a completed worker can be replenished without reopening a completed boundary.

The coordinator reviews every result and the stated verification before integrating or committing it.

## Mechanical boundary

The native rubric checks only the opt-in marker, exact required headings, and non-empty labelled worker fields.

It cannot decide whether coordinator-first is suitable, a model is sufficient, a split is sensible, authority is appropriately narrow, isolation is enforceable, a decision is truly locked, or a verification gate is adequate; those are judgment review.

CONFORM does not rewrite authored packet content.

It never supplies semantic packet content.
