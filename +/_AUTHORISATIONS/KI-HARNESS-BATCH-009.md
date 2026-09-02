---
id: KI-HARNESS-BATCH-009
repository: https://github.com/knowledgeislands/ki-agentic-harness
approved: true
approved_at: 2026-09-02T00:40:15Z
authority_mode: outcome
authority_evidence: User explicitly instructed the agent to use its autonomy and progress most roadmap items as quickly as possible.
approved_payload_sha256: 7543d7b834932f72df9c3d0571e4b2ce62ee93ef2579a2ec318c55b979c00d01
run_id: KI-HARNESS-BATCH-009-RUN-001
timebox_ends_at: 2026-09-02T03:40:15Z
item_ids: [KI-HARNESS-GOV-006, KI-HARNESS-FND-022]
completion_target: done
mandatory_stops: [material-scope-expansion, destructive-or-irreversible-work, external-coordination, verification-failure, unapproved-public-contract-decision, push-or-release]
closure_item_ids: [KI-HARNESS-GOV-006, KI-HARNESS-FND-022]
---

# KI-HARNESS-BATCH-009 — Progress roadmap delivery

## Outcome authority

Deliver the highest-throughput non-contentious Harness roadmap work to stable, verified outcomes. Keep public-contract choices not already settled by a Ready record, external systems, destructive actions, peer-repository writes, pushes, and releases outside the run.

## Selected plans

1. `KI-HARNESS-GOV-006` — reanchor the MCP standard to package-derived legacy and modern protocol profiles, generate and test the rubric, prove both profiles against read-only sibling evidence, and capture receiver-owned migration work without writing peers.
2. `KI-HARNESS-FND-022` — replace checkout-relative recap dependencies with the portable name-based composition contract and make flattened plugin generation validate declared dependencies.

The items are independent. They share the Harness skill, TypeScript, publication, authoring, and roadmap verification gates, so one final repository pass reduces setup and validation cost without merging their lifecycles.

## Excluded candidates

- `KI-HARNESS-FND-014` — requires an explicitly authorised GitHub repository and live Issue mutation.
- `KI-HARNESS-GOV-047` — requires approval of five material standing-intake policy choices.
- `KI-HARNESS-GOV-052` — still has unresolved public Agora reference-shape and local-association decisions.
- `KI-HARNESS-OPS-001`, `KI-HARNESS-OPS-002`, and `KI-HARNESS-RTP-002` — retain named external waiting conditions.
- `KI-HARNESS-OPS-005` and `KI-HARNESS-OPS-006` — are already in progress across receiver-owned repositories and are not Ready local batch candidates.
- `KI-HARNESS-OPS-003`, `KI-HARNESS-RTP-003`, `KI-HARNESS-RTP-004`, and `KI-HARNESS-RTP-010` — lack their stated promotion evidence or return trigger.

## Repositories and files in scope

- This Harness repository only.
- The exact canonical roadmap records named above.
- `skills/repo-structure/ki-repo-mcp/` and its generated rubric publication.
- `skills/change-management/ki-recap/`.
- `skills/environment/ki-binding-claude/scripts/build-plugin.ts` and focused tests.
- Generated Harness catalogue publications directly affected by the admitted changes.

## Required verification

- Focused `ki-repo-mcp` rubric and `ki-binding-claude` plugin-builder tests.
- `ki dev skill rubric ki-repo-mcp --write` followed by publication parity.
- Read-only `ki-repo-mcp` audits against the accepted v2 pilot and one legacy v1 sibling, plus a six-repository fleet pass where locally available.
- `ki repo audit --skill ki-work-roadmap --repo .`.
- `ki repo audit --skill ki-authoring --repo .`.
- `ki repo audit --skill ki-skills --repo .`.
- `bun run test`.
- `bunx tsc --noEmit`.

## Allowed decisions and delegation

Apply the locked package-derived protocol profile in `KI-HARNESS-GOV-006` and the existing name-based cross-skill portability rule in `KI-HARNESS-FND-022`. No runtime subagent delegation is authorised because neither Ready plan defines a durable delegation lane.

## Completion and remedial policy

Each item must pass through its own `in-progress` and `awaiting-review` states with immutable baseline and complete review packet. The batch may close exactly the two named items through `ki-accept` after rechecking their evidence. Non-blocking improvement opportunities become separate receiver-owned roadmap records; they do not keep viable verified delivery open.

## Run ledger

<!-- ki-batch-run: KI-HARNESS-BATCH-009-RUN-001 7543d7b834932f72df9c3d0571e4b2ce62ee93ef2579a2ec318c55b979c00d01 -->

### `KI-HARNESS-GOV-006` — done

- Starting state: Ready at baseline `6bf45f2b30fdcde36f4f65ee8b698955a7aa2bbd`.
- Result: Awaiting review at `d3ceb2068f0b3110747df8c90fa534ab3486eba5`, then accepted through `ki-accept` under this record's exact closure authority.
- Verification: 16 focused protocol/publication tests; modern pilot and five legacy profile audits; full Harness test suite; TypeScript; `ki-work-roadmap`, `ki-authoring`, `ki-skills`, `ki-binding-claude`, and `ki-engineering` audits.
- Decisions: applied the Ready record's package-derived dual-profile contract; retained SDK-owned discovery and receiver-owned migrations. No delegation was used.
- Receiver evidence: `0ba72a2`, `e3336af`, `c763a52`, `620a213`, and `1b334ab` independently capture the five migrations.

### `KI-HARNESS-FND-022` — done

- Starting state: Ready at baseline `b897954d640e00412cbad81e6da7376e2916ec61`.
- Result: Awaiting review at `d3ceb2068f0b3110747df8c90fa534ab3486eba5`, then accepted through `ki-accept` under this record's exact closure authority.
- Verification: 15 focused plugin-builder tests; generated projection assertions; active symlink inspection; full Harness test suite; TypeScript; relevant repository audits.
- Decisions: formalised the existing name-based cross-skill composition seam and made plugin dependency validation general. No delegation was used.

### Batch recap

Both admitted items reached stable verified outcomes and were accepted. No mandatory stop occurred, no push or release was performed, and no item was parked. The remaining roadmap records retain their named external, public-contract, or promotion boundaries. No new learning route is proposed because both durable lessons were applied directly to their owning standards and executable checks.
