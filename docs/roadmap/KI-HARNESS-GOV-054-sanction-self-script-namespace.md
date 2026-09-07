---
id: KI-HARNESS-GOV-054
area: GOV
title: Sanction self script namespace
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 673a184611d1fefba7d3a419fad9899a1d662d37
---

## Goal

Recognise `self:` as the sanctioned namespace for repository-local package scripts in the `ki-engineering` script-naming convention, so that a script whose name is owned by the repository itself — not by the harness — declares that ownership in its name rather than through a `script_exclusions` entry.

## Context

The convention today distinguishes only two states: harness-standardised scripts under the `ki:` prefix, and everything else. Repository-local infrastructure scripts — vendoring, platform build entry points, local verify chains — carry unprefixed or ad-hoc names, and each one needs a `[skills.ki-engineering] script_exclusions` entry to pass audit. The exclusion list works, but it states ownership in a side file where a reader of `package.json` cannot see it, and it grows without bounding what it is for.

`5g-emerge/5g-emerge-ibc-2026` supplied the worked example in commit `b6b2e3e`: `cf:build`, `typecheck`, `vendor:clone` and `vendor:link` became `self:cf:build`, `self:typecheck`, `self:vendor:clone` and `self:vendor:link`, with the exclusion list renamed to match. The names now say what the exclusion list only implied — this script belongs to this repository — but the exclusions remain because the convention does not yet know the prefix.

Ecosystem-conventional names stay outside both namespaces: lifecycle scripts (`prepare` for Husky) and tool-expected names (`build`, `test`, `clean`) are contracts with external tooling, not claims of ownership, and renaming them would break the tools that call them.

## Boundary

This work may change the `ki-engineering` standard, its audit checks, examples, and repository-local `.ki.toml` files and `package.json` scripts across the registered estate. It must not rename scripts whose exact names are pinned by external systems without flagging the external change required — the worked example's `self:cf:build` is configured verbatim in a Cloudflare dashboard, and each such rename carries a manual platform step that the rollout procedure must surface, sequence, and confirm per repository. Each repository retains review and acceptance authority for its own rollout commit.

## Shaping

Retain the existing closed set of six bare lifecycle idioms, add `self:` as the explicit repository-owned namespace, and reserve `script_exclusions` for externally constrained bare exceptions. Land the harness contract and checker first; inventory and route repository-specific renames separately so each repository retains review and acceptance authority.

## Current state

The engineering standard accepts six bare lifecycle idioms or a capability-owned `ki:` name. Any other repository-local script requires an exact `script_exclusions` entry. The checker implements that two-way rule in `audit-evidence.ts`, while the 5G Emerge worked example has already adopted `self:` names but must still list them as exclusions because the prefix is not recognised.

## Steps

- [x] Amend the live toolchain decision and engineering standard to define `ki:` capability ownership, `self:` repository ownership, and the existing six bare lifecycle idioms.
- [x] Update script-name and exclusion validation so a well-formed `self:` name needs neither a capability claim nor an exclusion, while exclusions covering `self:` names are rejected as redundant.
- [x] Extend focused fixtures for accepted `self:` names, malformed or empty `self:` names, redundant exclusions, retained bare idioms, and externally constrained bare exceptions.
- [x] Refresh the generated engineering rubric and examples, then inventory registered repositories for rollout candidates without mutating another repository.
- [ ] Record repository-specific rename, cross-reference, and external-platform follow-ups through each repository's own accepted work route.
- [x] Resolve the content-website collision by deciding whether its bare local development names are exclusions, root capability names, or workspace-local artifact contract.
- [x] Amend the live toolchain decision and both owning standards with the selected root-versus-workspace boundary.
- [x] Make the content site's required workspace shape mechanically checkable and remove any implementation-private root script claims.
- [x] Add focused composition fixtures, refresh generated rubrics, and record current receiver evidence without mutating another repository.
- [x] Publish the four existing MCP auth and recording operations as `ki-repo-mcp` capability-owned root scripts before removing receiver exclusions.

## Files touched

- `docs/decisions/ADR-KI-HARNESS-TOOLCHAIN-001-bun-biome-and-knip-standard-toolchain.md`
- `skills/governance/ki-engineering/SKILL.md`
- `skills/governance/ki-engineering/references/standards-engineering.md`
- `skills/governance/ki-engineering/references/exemplars.md`
- `skills/governance/ki-engineering/references/rubric.md`
- `skills/governance/ki-engineering/scripts/rubric/contexts/audit-evidence.ts`
- `skills/governance/ki-engineering/scripts/rubric/items/index.test.ts`
- `skills/repo-structure/ki-repo-website/references/standards-website.md`
- `skills/repo-structure/ki-repo-website/scripts/rubric/items/index.ts`
- `skills/repo-structure/ki-repo-website/scripts/rubric/items/index.test.ts`
- `skills/repo-structure/ki-repo-website-content/SKILL.md`
- `skills/repo-structure/ki-repo-website-content/references/standards-eleventy-site.md`
- `skills/repo-structure/ki-repo-website-content/references/rubric.md`
- `skills/repo-structure/ki-repo-website-content/scripts/rubric/contexts/website.ts`
- `skills/repo-structure/ki-repo-website-content/scripts/rubric/contexts/website.test.ts`
- `skills/repo-structure/ki-repo-website-content/scripts/rubric/items/web.ts`
- `skills/keystone/ki-skills/scripts/internal/remediation-inventory.test.ts`
- `skills/repo-structure/ki-repo-mcp/scripts/rubric/items/index.ts`
- `skills/repo-structure/ki-repo-mcp/scripts/rubric/items/index.test.ts`
- This roadmap record

## Delegation

### Locked decisions

- Receiver work remains receiver-owned, uses its selected local roadmap adapter and its own commit boundary, and stops at `awaiting-review`.
- `mcp-gsuite` and `mcp-m365` remove only the four obsolete exclusions for capability-owned `ki:server:auth:dev`, `ki:server:auth:start`, `ki:test:record`, and `ki:test:replay`; their package script names and bodies do not change.
- `5g-emerge-ibc-2026` removes only the four obsolete exclusions for its existing `self:` scripts; package scripts and Cloudflare commands do not change.
- `kit-midnight.ninja` uses `self:tower:import`, `self:tower:pull`, and `self:tower:refresh`; declares `site-root = "site"`; keeps only the public `ki:site:*` root aliases; and moves private build and development fan-out to bare package-local scripts in `site/package.json`.
- `kit-midnight.ninja` retains its pre-existing `WCF-26` failure for the missing `docs/guides/cloudflare.md` as an explicit out-of-scope baseline finding; this rollout must introduce no other Cloudflare finding.
- No worker pushes, deploys, starts auth servers, records live integrations, runs Tower data ingestion, modifies external platform settings, closes a work item, or prunes a record.

### Escalate

- Return to the coordinator on a new dirty or staged path, a reference outside the named scope, a required public command-name change, an external-platform change, an unavailable local adapter, or failed required verification.
- Do not infer ownership for another unsupported `ki:` script or broaden a receiver item to unrelated audit findings.

### Worker: mcp-receivers

- **Deliverable:** Two independently committed receiver changes removing obsolete MCP exclusions, each with its own ready-to-`awaiting-review` record and outcome-authority batch evidence.
- **Inputs:** Harness commits `9869d4ac` and `de881b6d`; receiver baselines `18a99edd8651573e97b3a10a58676d930d8dd86c` and `67a63b98cd45cd329bf508e7c3ee3c4cd6713e1e`; `MCP-GSUITE-FND-005`, `MCP-M365-FND-004`, `MCP-GSUITE-BATCH-001`, and `MCP-M365-BATCH-001`.
- **Scope:** In each named MCP repository, `.ki.toml`, `docs/roadmap/_ISSUES.md`, the named new roadmap record, and the named new file under `+/_AUTHORISATIONS/`; no other path.
- **Authority:** Create and bind the two receiver-local outcome authorisations, shape and deliver the two named records, remove only `script_exclusions`, verify, and commit each repository separately; no external writes or pushes.
- **Isolation:** Work in one receiver at a time; retain a touched-path set; use explicit-path staging and a serialized shared-`HEAD` commit window.
- **Verify:** Coordinator checks each diff and commit; worker runs focused `ki-engineering`, focused `ki-repo-mcp`, TypeScript, tests, roadmap audit, and `git diff --check` as applicable.
- **Return:** Per repository, commit, changed paths, exact audit outcomes, pre-existing warnings, and unresolved concerns.
- **Checkpoint:** Return after both clean receiver trees have committed changes or immediately at the first escalation condition.

### Worker: ibc2026-receiver

- **Deliverable:** One receiver-owned exclusion cleanup committed with `IBC2026-DBD-022` at `awaiting-review` and `IBC2026-BATCH-001` run evidence.
- **Inputs:** Harness commit `9869d4ac`; receiver baseline `7bc2b0f8fc904678dfffb628e9d68c6bd6f966f3`; the repository's `AGENTS.md` and `GDR-IBC2026-002` single-writer rules.
- **Scope:** `.ki.toml`, `docs/roadmap/_ISSUES.md`, `docs/roadmap/IBC2026-DBD-022-remove-redundant-script-exclusions.md`, and `+/_AUTHORISATIONS/IBC2026-BATCH-001.md` only.
- **Authority:** Create and bind the receiver-local outcome authorisation, shape and deliver the named record, remove only four redundant `self:` exclusions, verify, and commit; do not change package scripts, Cloudflare settings, or registry state.
- **Isolation:** Sole writer in the receiver checkout while active; retain a touched-path set; explicit-path staging; coordinator makes no receiver write until return.
- **Verify:** Focused `ki-engineering`, full repository audit, roadmap audit, TOML parse, and `git diff --check`; coordinator reviews the diff and commit.
- **Return:** Commit, changed paths, exact audit outcomes, registry caveat, and unresolved concerns.
- **Checkpoint:** Return after the clean receiver commit or immediately at the first escalation condition.

### Worker: midnight-receiver

- **Deliverable:** Receiver-owned Tower namespace and site-workspace alignment, independently reviewable as `MIDNIGHT-TOWER-007` and `MIDNIGHT-SITE-001`, committed with `MIDNIGHT-BATCH-001` run evidence.
- **Inputs:** Harness commits `9869d4ac` and `de881b6d`; receiver baseline `ad47a749d880d5b1434c925cc05cd73e684f5d12`; the locked names and workspace split above.
- **Scope:** `.ki.toml`; root and `site/package.json`; `docs/roadmap/_ISSUES.md`; `docs/roadmap/MIDNIGHT-TOWER-007-adopt-self-owned-tower-scripts.md`; `docs/roadmap/MIDNIGHT-SITE-001-align-site-workspace-scripts.md`; `docs/roadmap/MIDNIGHT-TOWER-002-dissonance-build-configs.md`; `docs/roadmap/MIDNIGHT-TOWER-003-progression-from-runs.md`; `+/_AUTHORISATIONS/MIDNIGHT-BATCH-001.md`; `site/src/_data/tower.ts`; `site/src/experiments/tower/CLAUDE.md`; `site/src/experiments/tower/notes/Data Pipeline.md`; `site/src/experiments/tower/pipeline/import.ts`; and `site/src/experiments/tower/index.njk` only.
- **Authority:** Create and bind one receiver-local outcome authorisation, shape and deliver the two ordered records, apply the locked script naming and workspace split, update live local references, verify, and commit; no deployment, Tower execution, source-store write, dashboard change, or other external effect.
- **Isolation:** Sole writer in the receiver checkout while active; retain a touched-path set; explicit-path staging and one serialized commit window per coherent receiver change.
- **Verify:** Focused `ki-engineering` and website core/content audits pass; focused Cloudflare audit introduces no finding beyond retained baseline `WCF-26`; `bun run ki:site:build`, full repository and roadmap audits, stale-reference search, and `git diff --check` provide recorded evidence; coordinator reviews every diff and commit.
- **Return:** Commits by item, changed paths, audit/build outcomes, retained warnings, and any external dashboard uncertainty.
- **Checkpoint:** Return after both items reach `awaiting-review` and their commits are clean, or immediately at the first escalation condition.

## Verify

Run the focused engineering and website rubric tests, `bunx tsc --noEmit`, and `bun run test`; verify the generated engineering, website-core, and website-content rubrics. Run focused harness audits for `ki-engineering`, `ki-decision-records`, `ki-skills`, `ki-work-roadmap`, and `ki-authoring`; exercise the two website skills through conforming receiver repositories that declare them. Confirm the estate inventory is read-only and names an owner-controlled route for every proposed external rename.

## Dependencies / blocks

No local work-item dependency blocks the harness contract. Repository rollouts depend on their own review authority, and any script name pinned in CI or an external platform requires an explicit coordinated update rather than an inferred rename.

## Documentation impact

### Decision Records

Edit `ADR-KI-HARNESS-TOOLCHAIN-001` in place because its live package-script decision currently owns the two-way naming model this work refines.

### Specifications

No separate behaviour specification is needed; the engineering standard and executable rubric jointly own this repository-governance contract.

### Guides

No guide change is planned. The naming rule belongs in the engineering standard and its examples rather than a task procedure.

### Roadmap

Keep repository-specific migrations outside this harness item unless the receiving repository explicitly authorises its own rollout; capture or trade those follow-ups in their owning repositories.

## Discussion

### Namespace model

`ki:` identifies a script claimed by exactly one resolved capability. `self:` identifies a script owned by the repository itself and requires a non-empty repository-defined suffix. Bare names remain limited to the existing universal lifecycle set: `build`, `prepare`, `test`, `test:coverage`, `test:watch`, and `clean`.

### Exclusion boundary

`script_exclusions` remains an exact-name escape hatch for a bare script whose spelling is externally constrained. It does not claim repository ownership and must not be used for `ki:` or `self:` names. This keeps the exception list narrow and makes ordinary local ownership visible in `package.json`.

### Rollout authority

The harness can publish the portable rule and report migration candidates, but it does not silently rename scripts in another repository. Each receiver owns its package, documentation, CI, platform configuration, verification, review, and acceptance commit.

### Estate rollout inventory

The read-only registered-repository inventory found five remaining receivers with exclusions affected by the `self:` clarification:

- `5g-emerge-ibc-2026` already uses four `self:` names and only needs their now-redundant exclusions removed.
- `infoschematics` has twelve excluded `ki:` names requiring owner classification: claim genuine capability operations or rename repository operations to `self:`.
- `kit-midnight.ninja` has three excluded `ki:` names requiring the same classification.
- `mcp-gsuite` and `mcp-m365` each have four excluded `ki:` names requiring the same classification.

The harness owns the portable contract only. No work-export route currently connects the harness to the receiver repositories (`mcp-gsuite` has a knowledge-only route). Repository-specific work records remain pending receiver-owned capture through an explicitly established work route; no sibling working tree was modified.

### Website composition evidence

`5g-emerge-testbed-website` now uses the `apps/site` workspace, has no `script_exclusions`, and passes both focused engineering and website-content audits for script ownership and workspace shape. `ki-website` provides a second conforming non-default workspace example at `site/`. The reported exclusion collision described the earlier flat layout rather than the current repository.

`kit-midnight.ninja` remains receiver-owned drift: it exposes implementation-private `ki:site:dev:css` and `ki:site:dev:serve` at the root and has no selected `apps/site/package.json`. Removing those unsupported root claims makes the existing mismatch explicit; this harness item does not rewrite the receiver.

### Earlier framing, resolved above

Amend the script-naming standard to define three namespaces: `ki:` for harness-standardised scripts, `self:` for repository-local scripts, and bare ecosystem-conventional names where an external tool expects them. A `self:`-prefixed script should pass the naming audit without an exclusion entry, narrowing `script_exclusions` to its residual purpose: bare names that are neither `ki:`, `self:`, nor recognisably ecosystem-conventional.

Decide whether the audit should maintain a small allow-list of ecosystem-conventional names (`build`, `test`, `clean`, `prepare`, `typecheck`, and peers) or treat all unprefixed names as exclusion-requiring. Then inventory the registered estate for current exclusion entries that are really `self:` candidates, and define the repository-by-repository rollout: rename, update cross-references (documentation, CI, platform dashboards), shrink the exclusion list, and commit under each repository's own review.
