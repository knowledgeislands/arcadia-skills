---
id: KI-HARNESS-GOV-014
title: Add trade operations
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked-by: []
baseline-ref: a30b91707f7460a7bbcc8d5f4ee608594f8824aa
---

## Goal

Make declared cross-repository trade routes usable through a local, confirmation-led process without weakening the receiver's authority or adding peer transport.

## Context

`ki-trades` defines routes, record shape, immutable sender payload, receiver-only decisions, and release observation. `ki` already provides local `new`, `receive`, `list`, `show`, `release`, `prune`, and route-management commands, but the initial surface conflates receipt with acceptance, receives every matching record by default, lacks a mutable preparation and observation phase, and permits formatters to alter immutable copies.

The recent intake from `tools-ki` and `tools-mgit` shows three distinct sender needs: make an evolving proposal visible without asking the receiver to act, publish an immutable submission without waiting for a response, or wait for receipt, a decision, or the outcome of linked local work. Receiver review likewise needs a proportional local-work rule: a bounded, independently verifiable local correction may be directly applied, while material work becomes a separately prioritised roadmap item.

## Boundary

Do not add network transport, peer-checkout writes, preparation acknowledgement, automatic receiver decisions, roadmap prioritisation, implementation authority, deadlines, response guarantees, background cleanup, or a cross-repository dialogue log.

Do not make `ki-trades` CONFORM create records. Its existing governance modes remain limited to their safe owned scaffold and validation responsibilities.

## Shaping

### Lifecycle model

Trade state has independent publication, delivery, decision, and observation facts rather than one linear status:

- A sender-local preparation is mutable and visible only when committed under `-/_TRADES/_PREPARATIONS/<receiver-owner>/<receiver-repository>/`. It has its final `TRD-<eight-hex>` identity, `phase: preparing`, and an observation policy. It is not receivable and creates no receiver copy, acknowledgement, or decision.
- `submitted` means the sender has atomically moved that identity to the canonical outbound path, removed `phase`, and frozen the envelope and body.
- `awaiting receipt` means an immutable outbound exists without a matching inbound copy; `received` means both copies exist. `released` is a receiver-side observation that the terminal or receipt-eligible outbound is gone.
- The receiver alone uses `unconsidered`, `in_progress`, `parked`, `clarify`, `adopted`, `retained`, `declined`, or `superseded`. Add work-only `applied`, requiring a full verified local commit ID for a direct local update.

There is no generic trade `completed` status. An adopted work trade points to its local roadmap item, which owns completion. `applied` is the only trade decision that itself proves completed direct work.

### Observation and retention

Each preparation and submitted record declares one sender observation policy: `unattended`, `receipt`, `decision`, or `completion`. It expresses only what the sender chooses to observe; it grants no deadline, priority, service commitment, or receiver authority.

- `unattended` and `receipt` allow release after receipt. Unattended does not mean immediate deletion: the submission remains available until a receipt is observable.
- `decision` allows release after a terminal receiver decision.
- `completion` waits through a terminal decision and, for adopted work, the linked local item becoming `done`; `applied` and `retained` satisfy it directly, while declined or superseded resolve it without completion.

Preparations use Git rather than a trade-maintained history. `ki trade observe <TRD>` resolves one registered sender root and compares its current committed preparation with a host-local last-observed full commit reference. It displays a diff when history is comparable, otherwise the current record verbatim and the reason comparison is unavailable. Observation neither creates receiver state nor tells the sender that the preparation was viewed.

### CLI and route surface

Keep the existing `ki trade routes add`, `remove`, `list`, and `check` grammar, and make it report both a sender-declared observation route and an active reciprocal receipt route. Route add or removal writes only the selected local configuration; removal must refuse while a local preparation, submitted outbound, or retained inbound depends on that typed route.

Replace `ki trade new` with `prepare`, `observe`, `submit`, and `abandon`. `prepare` requires a declared export, may remain pending reciprocity, and writes only the sender-local preparation. `observe` reads committed preparation content from one registered sender root and updates only disclosed host-local observation state. `submit` freezes a preparation into the canonical outbound record. `receive` requires an active reciprocal route, defaults to one explicit ID, and requires `--all` for a previewed bulk receive. Existing `list`, `show`, `release`, and `prune` remain, with explicit `--eligible` cleanup previews where appropriate.

Receiver disposition remains with `ki-next`. It decides `applied` only when the work trade has one bounded local outcome, clear authority, no material design decision, dependency, migration, public-contract change, or cross-repository write, and an existing targeted verification gate. Otherwise it proposes one or more local roadmap items. Knowledge does not use the direct-work path; it is retained only in a named canonical knowledge artifact.

### Promotion conditions

Promote when the lifecycle, observation policies, route guards, raw-byte copy rule, direct-update threshold, and command grammar have end-to-end fixtures for both work and knowledge trades, including a no-history observation fallback.

## Current state

The Harness contract, process guidance, route guards, formatter boundary, and roadmap integration are implemented and verified. `observation` is mandatory: active records were migrated in matched sender and receiver copies, while terminal release-eligible records followed normal sender release and receiver pruning. `tools-ki` now implements and documents the host lifecycle with end-to-end CLI fixtures.

## Steps

- [x] Amend the GDR and `ki-trades` contract for preparation, submission, delivery, decision, observation policy, receipt-eligible release, and direct `applied` work.
- [x] Replace parsed copy comparison with raw sender-projection equality; record `received_from_ref` locally when available; and add the immutable-record formatter and lint boundary.
- [x] Add the `ki-trade` process skill, `ki-next` disposition rules, and roadmap `waiting-on-trades` field without extending local work-item dependency arrays.
- [x] Specify host `prepare`, `observe`, `submit`, `abandon`, exact `receive`, release, prune, and route commands, with local observation cursors and no peer write.
- [x] Submit one bounded work trade to `tools-ki` for host implementation, including route mutation guards, committed-ref observation, command migration, byte preservation, and fixtures.
- [x] Prove preparation observation, receipt, each observation policy, terminal disposition, sender release, receiver pruning, direct application, no-history fallback, and every no-write route failure.

## Files touched

- `skills/change-management/` companion trade-process skill and its references
- `skills/governance/ki-trades/` cross-references and, if needed, contract clarifications
- `skills/change-management/ki-next/` and `skills/change-management/ki-roadmap/` trade disposition and waiting integration
- `skills/governance/ki-authoring/` and `skills/governance/ki-engineering/` immutable-record formatting boundary
- `docs/decisions/GDR-KI-HARNESS-005-cross-repository-trade-routes.md`
- `tools-ki` host command, validation, help, and fixtures through a separately accepted local work item
- This roadmap item

## Verify

- Focused `ki-trade`, `ki-trades`, `ki-next`, `ki-roadmap`, authoring, and engineering fixture coverage
- `ki repo audit --skill ki-trades --repo .`
- `ki repo audit --skill ki-delegation --repo .`
- `ki repo audit --skill ki-skills --repo .`
- Harness focused tests, `bun run test`, and `bunx tsc --noEmit`
- Host fixtures prove committed-ref-only observation, no peer write, byte-stable inbound payloads, exact-receive defaults, explicit bulk preview, and clean post-write audits.

## Dependencies / blocks

This item is independently shapeable. A `tools-ki` implementation item is required before host-command changes; the Harness retains ownership of the contract, process skill, and cross-skill references. A completion-observation trade retains its linked adopted record until sender release is observable, so roadmap pruning must refuse to remove an unresolved completion reference.

## Delegation

### Locked decisions

- Preparations have no receiver copy, acknowledgement, conversation, or separately maintained history; Git is their only revision history.
- Observation is local to the receiver and is not sender-visible.
- `unattended` means no requested response, not immediate deletion before receipt.
- Completion remains local-roadmap truth for adopted work; it is not a generic trade status.

### Escalate

- Stop if a proposed field requires nested roadmap frontmatter or a peer-side write.
- Stop if legacy trade migration cannot preserve current `decision`-equivalent release behaviour.
- Stop if formatter exclusions cannot preserve raw submitted bytes without exempting mutable preparation files.

### Rounds

- Round 1: `trade-contract` and `host-surface` produce independently reviewed contract and host packets.
- Round 2: `integration-boundaries` follows the Round 1 gate and reconciles roadmap, formatter, and process implications.

### Worker: trade-contract

- **Deliverable:** GDR and `ki-trades` lifecycle, field, raw-byte, and release contract proposal with fixture matrix.
- **Files:** `docs/decisions/`, `skills/governance/ki-trades/` only.
- **Definition of done:** Every phase and observation policy has a precise authority and release rule.
- **Model:** reasoning — lifecycle and authority decisions are interdependent.
- **Verify:** Orchestrator checks the proposal against all six consolidated submissions and the current rubric.
- **Checkpoint:** Stop before editing generated publications.

### Worker: host-surface

- **Deliverable:** A bounded `tools-ki` work-trade packet for the command grammar, local observation cursor, route guards, and fixtures.
- **Files:** No local Harness source changes; inspect `tools-ki` only.
- **Definition of done:** Each mutating command has one local write scope, an exact preview or confirmation boundary, and a no-write failure matrix.
- **Model:** reasoning — command and state transitions must align with the contract.
- **Verify:** Orchestrator compares it with the approved GDR packet before submission.
- **Checkpoint:** Return before submitting a trade.

### Worker: integration-boundaries

- **Deliverable:** Cross-skill implementation order for `ki-trade`, `ki-next`, `ki-roadmap`, authoring, and engineering.
- **Files:** `skills/change-management/`, `skills/governance/ki-authoring/`, and `skills/governance/ki-engineering/` only.
- **Definition of done:** The plan distinguishes immutable submitted records from mutable preparations and preserves receiver authority.
- **Model:** reasoning — the work crosses standards and toolchain ownership.
- **Verify:** Orchestrator runs focused audits and checks every named owner.
- **Checkpoint:** Stop before writing any shared standard.

## Review

### Governance and operation split

The existing host commands expose the usability gap but do not change its authority boundary. `ki-trades` continues to govern records and routes, `ki-trade` orchestrates only confirmed local record operations, and `ki-next` alone records receiver disposition and direct-versus-roadmap choice.

### Locality and receiver authority

The sender creates and later releases only its outbound copy. The receiver creates and changes only its inbound copy. The process may inspect registered peer records to validate the relationship, but it must never write outside its selected repository or infer a receiver decision from record presence.

### Observation without dialogue

A committed preparation is visible to a willing receiver through its registered sender root, but no observed view is transmitted back. The receiver's single local Git cursor supports useful change inspection without a duplicate revision log, inbound draft copy, or conversation protocol. A shallow, rewritten, or first-view history falls back honestly to the current committed text.

### Lifecycle boundary

Receipt means only that an inbound copy exists; it does not mean review, adoption, retention, or completion. `ki-next` records human-confirmed receiver disposition. Any adopted work follows the local roadmap lifecycle, while `applied` preserves a verified direct local update without inventing a roadmap item.

### Delivery review

### Delivered

The strict observation contract, immutable-record boundary, local trade process, and `tools-ki` host lifecycle are delivered across every participating repository.

### Summary of changes

`observation` is mandatory for every submitted record. Active submissions were migrated with their matched receiver copies and committed receipt references. Resolved submissions were released by their senders then pruned by their receivers. The host now implements preparation, observation, submission, exact receipt, policy-aware release and prune, route guards, and public command guidance.

### Verification

- Harness: `bun run test` (286 passing), `bunx tsc --noEmit`, and `ki repo audit --skill ki-trades --repo .`
- tools-ki: `bun run test` (495 passing), TypeScript, trade and Feature Definitions audits, and public command inventory fixtures
- Fleet: `ki repo audit --skill ki-trades` passes for Harness, tools-ki, tools-mgit, and ki-website

### Outstanding concerns

None for this bounded lifecycle rollout. Future trade work can use the strict mandatory-observation contract directly.

### Post-change review

Ready for explicit user acceptance.

### Mini recap

The migration confirmed that release and receiver pruning are the correct path for terminal immutable submissions; no persistent compatibility rule is required.

## Discussion

### Consolidated submissions

The six retained knowledge submissions were incorporated into the contract and process guidance, then released and pruned through the lifecycle once their sender observation condition was satisfied.
