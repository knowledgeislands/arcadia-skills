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
