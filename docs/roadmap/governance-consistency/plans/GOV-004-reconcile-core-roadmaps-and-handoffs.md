---
id: 'GOV-004'
title: Reconcile core repository roadmaps and handoffs
status: in-progress
roadmap: governance-consistency/reconcile-core-repository-roadmaps-and-handoffs
blocks: —
blocked-by: —
baseline-ref: b0eae309c49e08f2cca835c5c7a1fa7e06f9ba1c
---

## Context

The five core Knowledge Islands repositories divide responsibility across philosophy and KB operations, reusable agentic capabilities, CLI implementation, formal specifications, and public publication. Their roadmaps and working handoffs have evolved independently during the CLI cutover. Several already-consumed handoffs remain in recipient inboxes, some recipient-owned work remains embedded in a sender's plan, and some repositories cannot currently produce a clean roadmap view.

Working handoff files are temporary transfer material, not a historical archive. A receiving repository needs a durable local roadmap item and, where the handoff carries useful execution detail, a governed plan. Preserving that detail must not falsely promote the recipient's priority.

The standalone `ki-handoffs` skill currently uses handoff terminology for a different concern: preparing a plan or proposal for execution by a cheaper or cold agent. Cross-repository transfer and agent delegation need distinct names and owners.

## Current state

- The harness and `tools-ki` retain inbound CLI-004/FND-004 handoffs after both completed plans were pruned.
- The harness retains historical acquisition proposals. KAF has durable successors in KIS-0002 and `ki acquire chatgpt import`; KBEP and KBIP have no recipient-owned roadmap items.
- `tools-ki` CLI-006 still includes a Website-owned redirect step and has no outbound Website handoff.
- The Website declares the retired `ki-repo-roadmap` capability and retains the retired generated `docs/roadmap/README.md`.
- KI Specifications has an empty thematic portfolio whose root projection has drifted.
- Arcadia Principal is a KB and correctly uses Streams rather than a repository roadmap, but its sole handoff is stale and misplaced inside a Stream; its Stream indexes and several proposal lifecycle fields have drifted.
- The roadmap standard permits plans only for Blocking and Next, so it cannot currently preserve a detailed received handoff as a durable open plan at its honest lower-priority horizon.
- `ki-handoffs` overlaps `ki-delegate` and overloads `handoff: true`, while cross-repository transfer is already divided between `ki-repo`, `ki-roadmap`, `ki-recap`, `ki-next`, and `ki-plan`.

## Steps

1. ✓ Amend the shared roadmap and repository-working-area contracts so an open plan with a non-empty `transferred-from` origin may link to any honest horizon, while `ready`, execution, acceptance, and done remain restricted to Blocking or Next. Require transferred material to name its origin and disposition, and remove working handoff copies once adopted, declined, superseded, or durably materialised.
2. ✓ Assimilate `ki-handoffs` along its actual ownership boundaries: cross-repository transfer joins the `ki-recap` → `ki-next` → `ki-plan` lifecycle governed by `ki-roadmap` and `ki-repo`; delegation readiness joins `ki-delegate` and the optional `## Delegation` sections governed by `ki-roadmap` or `ki-kb-streams`. Retire the standalone skill, configuration root, catalogue, and superseded documentation without a compatibility path.
3. ✓ Make `ki-next` inspect `+/_HANDOFFS/` automatically during grounding. Present unreviewed or due material for adopt, park, clarify, decline, or supersede; materialise adopted work at its honest horizon without promoting it; retain parked material only with a receiving owner and named review trigger; and remove resolved inbox material. Update the `ki-roadmap` catalogue, contexts, tests, generated rubric publication, and `ki-plan` lifecycle wording for the transferred-plan exception; verify that ordinary non-near plans still fail.
4. Reconcile the harness inbox: remove consumed or superseded CLI/package/KAF material, and retain KBEP/KBIP detail only until matching KI Specifications items and open transferred plans are committed.
5. Reconcile KI Specifications by establishing recipient-owned KBEP and KBIP roadmap items and open transferred plans, then regenerate and audit its portfolio.
6. Reconcile `tools-ki` and the Website: remove the consumed CLI-004 inbox item; separate tools-owned release completion from Website-owned redirect work; materialise the redirect in the Website at its honest dependency horizon; migrate the Website roadmap capability and retire its obsolete generated index; route any remaining guide-documentation changes to their receiving repositories.
7. Reconcile Arcadia Principal through its KB model: remove the stale misplaced handoff, preserve any live instruction in the parent proposal, and repair Stream indexes and proposal lifecycle fields without adding a repository roadmap.
8. Run focused roadmap, repository, delegation, and KB Stream audits in every affected repository; record the final sender-to-recipient disposition matrix and commit each repository's coherent changes independently.

## Files touched

- Harness: `skills/governance/ki-roadmap/`, `skills/process/ki-plan/`, `skills/process/ki-next/`, `skills/process/ki-delegate/`, retired `skills/governance/ki-handoffs/` surfaces, `skills/keystone/ki-repo/`, user guides and maps, roadmap files, and `+/_HANDOFFS/`
- KI Specifications: `.ki-config.toml`, `ROADMAP.md`, and `docs/roadmap/`
- `tools-ki`: CLI roadmap/plan files and working handoffs
- KI Website: `.ki-config.toml`, roadmap/plan files, and retired generated roadmap index
- Arcadia Principal: the Tooling Rollout proposal, stale handoff, Stream indexes, and affected proposal frontmatter

## Verify

1. `ki repo audit --skill ki-roadmap` passes in the harness, `tools-ki`, KI Specifications, and the KI Website.
2. `ki repo audit --skill ki-kb-streams` passes in Arcadia Principal.
3. Catalogue tests prove that only an open plan with a non-empty `transferred-from` origin may remain outside Blocking or Next and that it cannot transition to ready or execute there.
4. No standalone `ki-handoffs` capability, declaration, catalogue, or compatibility path remains; delegation-ready execution is covered by `ki-delegate` and the host artifact's optional `## Delegation` contract.
5. Every active working handoff has an unresolved receiving decision or named review trigger; every adopted or superseded transfer has left the working area.
6. `ki-next` automatically documents and exercises the adopt, park, clarify, decline, and supersede workflow without silently prioritising adopted work.
7. Every repository is clean after its own explicit-path commit, with pre-existing unpushed commits preserved.

## Dependencies / blocks

The portfolio reconciliation does not depend on publishing the first verified `ki` release. The Website installer redirect itself remains waiting on that release evidence; only its ownership and durable recipient planning are established here.

## Delegation

- Round 1 — research, Terra High: inventory Arcadia Principal; files: read-only Streams, handoffs, configuration, and indexes; gate: evidence-backed lifecycle and ownership report.
- Round 1 — research, Terra High: inventory `tools-ki`; files: read-only roadmap, plans, and handoffs; gate: evidence-backed lifecycle and ownership report.
- Round 1 — research, Terra High: inventory KI Specifications and the KI Website; files: read-only roadmaps, plans, configuration, and handoffs; gate: evidence-backed lifecycle and ownership report.
- Round 2 — judgment, Sol High: settle and implement the shared transferred-plan exception and `ki-handoffs` assimilation; files: harness governance and process contracts, catalogues, tests, publications, and maps; gate: orchestrator review plus focused tests and audits before recipient edits.
- Round 3 — mechanical, Terra High: apply the settled recipient-specific reconciliations in exclusive repository scopes; gate: orchestrator diff review and the repository's focused audit before each commit.
- Orchestrator: own the cross-repository disposition matrix, review every worker diff, run final verification, preserve unrelated and pre-existing commits, and commit only gated units.
