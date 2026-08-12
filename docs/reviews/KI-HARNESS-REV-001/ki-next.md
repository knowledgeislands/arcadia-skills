# `ki-next` effectiveness review

- **Position:** 13 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `bc6208ab9cc328487361e70c69a24a2f50f5f5e5` plus current runtime-source checks on 2026-08-12.
- **Kind / dependencies:** process / none; it consumes roadmap, Streams, housekeeping, trades, and runtime compaction contracts.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain its selection and authority discipline, but resolve the configured adapter and housekeeping state machine and add direct outcome evidence before grading.

## Sources and mechanics

The skill has no source list. Most rules are stable house authority, but its volatile compaction claim needs current runtime evidence. Current official OpenAI documentation exposes manual [`/compact`](https://learn.chatgpt.com/docs/developer-commands?surface=cli) and automatic compaction, contrary to the procedure's “Codex compacts only automatically” statement. Anthropic also documents manual and automatic compaction. This runtime detail should be sourced once through the runtime boundary rather than duplicated with `ki-recap`.

The repository-wide `ki-skills` audit and TypeScript passed. A focused repository audit is unavailable by design for a global process skill. The skill has no native rubric, focused test, eval scenario, or result evidence; full-suite coverage of adjacent auditors is not behavioral evidence for `ki-next`.

## Selection and outcome effectiveness

The skill adds useful discipline beyond ordinary queue advice: it re-grounds current records, ranks only dependency-ready candidates, keeps promotion and deferral confirmation explicit, rejects similarity-only batching, separates direct application from adopted work, and never treats a trade receipt as receiver authority.

The relationship map clearly separates selection/capture, plan shaping, delivery, closure, and batch coordination. These are defensible retained values.

## Instruction economy and architecture

The 78-line entrypoint and 154-line procedure are proportionate for a high-authority selection and trade boundary. Runtime compaction prose is duplicated and should move to one sourced runtime owner.

The largest architecture gap is adapter bypass. For every non-KB repository, `ki-next` hardcodes a `ki-change-management-roadmap` audit and `docs/roadmap/` scan rather than resolving `[skills.ki-change-management].adapter`. GitHub Issues and Linear therefore cannot use this process despite adapter descriptions saying they can. Existing `KI-HARNESS-FND-014` already owns remote process execution.

## Executability and safety

Deferral, batch screening, trade application, and pruning boundaries are conservative. The process refuses silent deletion, material direct application, or similarity-based batch authority.

Housekeeping spawning is internally contradictory. `ki-next` says the spawn transaction updates both `last-run` and `active-run`, while the governing housekeeping standard says `last-run` changes only after accepted completion and `active-run` is then cleared. A draft creation must not be recorded as the last successful run. Automatic spawn behavior is not safe to enable until the cross-skill state machine and failure recovery are reconciled.

The process also relies on the roadmap hosted audit, whose current `PROFILE-1` and dependency-code mismatches can hide material failures. A clean local audit is not sufficient transition evidence until those defects are repaired.

## Evidence and gaps

Missing direct evidence includes configured-adapter resolution, no-write refusal for unsupported remote adapters, horizon promotion/deferral, stale dependencies, manual/due/overdue housekeeping, duplicate prevention, direct-apply versus adopted trades, selection compaction, and `next`-to-`plan` identity continuity. No assisted-versus-baseline evaluation exists.

## Proposed remediation

These proposals are not approved implementation:

1. Extend existing `KI-HARNESS-FND-014` with one selected-adapter resolver for shared processes; fail closed and honestly for unsupported remote execution.
2. Reconcile housekeeping spawn and completion ownership across housekeeping, `ki-next`, and `ki-accept`, with cross-skill fixtures before automatic spawning.
3. Remove or relocate duplicated runtime compaction assertions and distinguish user-invocable controls from agent authority.
4. Add focused pure decision fixtures for ranking, promotion, deferral, batching, trade application, housekeeping, adapter refusal, and identity continuity.
5. Do not treat the roadmap audit as transition assurance until its confirmed finding-publication defects are fixed.

No new skill, agent, or hook is proposed. Existing `KI-HARNESS-FND-014` is the remote-execution owner; the housekeeping conflict requires a separately confirmed cross-skill amendment.

## Applied changes

**State:** applied in `a1483153`.

Added pure selected-adapter decisions for local roadmap and KB Streams roots, with no filesystem-shape fallback and explicit remote refusal. Housekeeping spawn now sets only `active-run`; runtime compaction assertions were removed. Fixtures cover ranking, promotion, deferral, trade disposition, housekeeping policy, duplicate active runs, and adapter refusal.

## Later-process implications

`ki-plan`, `ki-implement`, and `ki-accept` must resolve the base-selected adapter and fail closed for unavailable remote execution. `ki-accept` must explicitly own or reject successful housekeeping completion updates rather than leaving the current cross-skill promise unimplemented.
