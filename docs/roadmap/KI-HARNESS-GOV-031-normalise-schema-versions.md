---
id: KI-HARNESS-GOV-031
title: Normalise schema versions
area: GOV
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked_by: []
baseline_ref: ba91c843419820f6c37679abd8691c665bed951d
---

## Goal

Make every active schema describe the current contract as V1, eliminating legacy version lineage before external adoption.

## Context

The estate has made breaking current-state changes while remaining privately controlled. A V2 label would imply a compatibility history that the operating contract deliberately does not carry; V1 should mean the present pre-release candidate, not an obsolete predecessor.

## Boundary

Do not preserve V1/V2 aliases, add compatibility parsers, rewrite historical trade or roadmap evidence, or renumber a schema without proving every active producer, consumer, fixture, and documentation surface moves together.

## Shaping

### Intended approach

Inventory active schemas, protocol versions, fixtures, validation logic, and generated publications. Classify each version marker as active contract, external-standard reference, or historical evidence. For active internal schemas, make the current shape V1 in one mechanical cutover and let any missed consumer fail loudly.

### Promotion conditions

Promote when the inventory identifies every active versioned contract, each consumer owner, and the exact boundary between internal normalisation and an external protocol version that must retain its source-defined label.

## Current state

No estate-wide active-schema inventory currently distinguishes internal contract markers from external protocol references and historical evidence. A blind global rename would risk changing an external standard or leaving an active producer and consumer on different labels.

## Steps

- [x] Define the inventory fields: schema or protocol surface, repository, active producer, active consumer, validator or fixture, rendered documentation, version marker, and classification.
- [x] Search the estate for versioned schemas, protocol records, fixtures, validators, and generated publications; classify each hit as active internal contract, external-standard reference, or historical evidence.
- [x] For each active internal contract, establish a complete producer-consumer-fixture-documentation migration map to the present V1 shape, with the receiving repository owner and verification gate.
- [x] Record separately owned cutover work only where the full map is proven; retain unknown or external markers as explicit exclusions rather than renumbering them.
- [x] Reconcile the inventory with the raw search results and review that no V1/V2 compatibility alias, historical rewrite, or partial migration is proposed.

## Files touched

This roadmap item only, containing the active-schema inventory, classifications, and receiver-owned migration map. No schema, consumer, fixture, documentation, or peer repository is changed in this audit.

## Verify

- Every active internal version marker has a producer, consumer, fixture or validator, documentation surface, owner, and named gate—or is reported as incomplete rather than changed.
- External-standard and historical markers are explicitly excluded with their source or evidence boundary.
- Every proposed V1 cutover is receiver-owned and remains unimplemented in this item.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This inventory and migration-map phase is read-only. It does not authorise a cross-repository cutover; each proven map routes to separately confirmed receiving work.

## Delegation

### Locked decisions

- Only this roadmap item may be written; no schema, protocol, fixture, parser, generated publication, or peer repository may be changed.
- External-standard references and historical evidence remain exclusions unless current internal producer, consumer, fixture or validator, documentation, and receiver ownership are proven.

### Escalate

- An inaccessible declared member or incomplete search surface that prevents an honest estate reconciliation.
- Any unclear version axis, unknown active consumer, incomplete generated target, or request to renumber a contract, preserve an alias, or alter a peer record.

### Rounds

- Round 1: `active-schema-version-inventory`.

### Worker: active-schema-version-inventory

- **Deliverable:** Complete active-schema inventory, classifications, receiver-owned V1 migration maps, explicit exclusions, incomplete findings, and raw-search reconciliation in this item.
- **Files:** Write only `docs/roadmap/KI-HARNESS-GOV-031-normalise-schema-versions.md`; read estate schema, protocol, fixture, validator, generated-publication, and documentation evidence.
- **Definition of done:** Every proposed internal V1 cutover names a producer, consumer, fixture or validator, documentation surface, receiver, and verification gate; all other markers are explicitly excluded or incomplete.
- **Model:** reasoning — version-axis and producer-consumer classification requires evidence-led judgment.
- **Verify:** Orchestrator samples every proposed cutover and exclusion, confirms no schema or peer changed, then runs the item's roadmap and authoring audits.
- **Checkpoint:** Return with the completed record and all unknown consumers, external references, and required receiver decisions; use `GIT_INDEX_FILE=/private/tmp/ki-harness-batch-001-gov031.index` for any Git staging and do not commit.

## Review

### Delivered

The record now contains the complete observed estate inventory and classifications, one proven receiver-owned compatibility-cleanup map, four incomplete mappings with explicit parks, and the raw-search reconciliation. No schema, protocol, fixture, parser, publication, peer repository, or other Harness file was changed. The mapped cleanup remains unimplemented and requires human acceptance and scheduling.

### Summary of changes

Recorded thirteen active internal families already on V1, one complete Harness V1-only compatibility-cleanup map, four incomplete internal mappings, eight external or vendor exclusions, three historical exclusions, and one uncommitted peer-contract exclusion. No internal V2 contract, alias, or partial cutover was accepted.

### Verification

The immutable baseline is `ba91c843419820f6c37679abd8691c665bed951d`; the integrated batch result is `8cb15618ff1e9d0da5441d5c9e701f73a94984a8`.

- `git diff --check -- docs/roadmap/KI-HARNESS-GOV-031-normalise-schema-versions.md` passed.
- `ki repo audit --skill ki-change-management-roadmap --repo .` passed with `FAIL=0 WARN=0`.
- `ki repo audit --skill ki-authoring --repo .` passed with `FAIL=0 WARN=0`.

No peer-repository test was run because this audit changed no peer contract or implementation. Evidence from peer repositories was read-only. The observed uncommitted `tools-ki` managed-artifact work remains excluded, and the independently modified Harness `KI-HARNESS-GOV-002` and `KI-HARNESS-GOV-028` records are outside this delivery.

### Outstanding concerns

No version was renumbered, no protocol was changed, no compatibility alias was added, and no receiver acceptance was inferred. A human must decide whether to schedule the Harness plan-provenance plaintext-input removal. The dotfiles configuration-fragment marker, ChatGPT local-capture metadata, Knowledge Export Package format, and Techne root-manifest version remain parked with their named owners until their missing contract evidence is supplied.

### Post-change review

The delivery stayed within the read-only boundary: no schema, protocol, alias, fixture, publication, peer record, or receiving state changed. The planned V1 compatibility cleanup remains a separately selected Harness change, and every incomplete map remains receiver-owned.

### Mini recap

The inventory establishes a V1 baseline without fabricating lineage: fourteen internal families are already or cleanly become V1, while four incomplete contracts and every non-internal version axis remain explicitly parked or excluded.

## Done

Accepted by the repository owner on 2026-08-10 after review of the evidence packet. This closes the evidence inventory only: the proven Harness compatibility cleanup requires a separately selected local work record, and the four incomplete mappings remain parked with their named owners. No record is pruned.

## Discussion

### Version meaning

V1 is the first externally credible current contract. It must not coexist with a retained internal V2 merely to preserve local change history.

### Inventory method and coverage

Each inventory entry records the surface, repository, current marker, producer, consumer, fixture or validator, documentation, receiving owner, verification gate, classification, and disposition. A cutover is proposed only when every field is evidenced; a missing field makes the entry incomplete and parked.

The `ki-all` home declares fifteen members in `.ki-config.toml`; the Harness owner is the sixteenth participant. All sixteen reciprocal local repositories were accessible: the fifteen checkouts under the Knowledge Islands workspace plus the `krisb/dotfiles` Chezmoi source at `/Users/krisbrown/.local/share/chezmoi`. Searches covered tracked and unignored text for version-bearing schema, protocol, format, manifest, validator, fixture, generated-publication, and documentation markers while excluding Git internals, dependencies, build output, coverage, runtime caches, lockfiles, and ordinary package-release metadata.

The inventory contains eighteen active internal marker families: thirteen are already on a fully evidenced V1 shape, one has a fully evidenced V1-only compatibility cleanup, and four remain incomplete. Raw-search exclusions comprise eight external-standard or vendor-owned families, three historical-evidence families, and one uncommitted prospective peer contract. No active internally owned V2 schema was found.

### Active internal contracts already at V1

- **Harness build-plugin execution manifest:** `schemaVersion: 1` is produced and consumed within `skills/environment/ki-binding-claude/scripts/build-plugin.ts`, exercised by `build-plugin.test.ts`, and projected verbatim into `ki-plugins/knowledge-islands/skills/ki-binding-claude/`. Documentation is `skills/environment/ki-binding-claude/SKILL.md`; owner is the Harness; gate is the focused build-plugin test plus the Harness TypeScript gate. Classification: active internal, current V1; no cutover.
- **Claude plugin payload scope:** the skills-and-agents-only V1 projection is produced by the same build-plugin generator, consumed by `ki-plugins/knowledge-islands/`, checked by `skills/repo-structure/ki-repo-plugins/scripts/rubric/contexts/plugins.test.ts` and the build-plugin tests, and documented in `skills/repo-structure/ki-repo-plugins/SKILL.md` and `references/standards-plugin-marketplace.md`. Owner is the Harness with `ki-plugins` as publication receiver; gate is the focused generator and plugin-rubric tests. Classification: active internal, current V1; no cutover.
- **Structured rubric catalogue:** the strict V1 remediation and review shape is produced by the Harness catalogues under `skills/*/*/scripts/rubric/items/`, consumed by `tools-ki/src/core/rubric.ts`, fixture-checked by the catalogue `index.test.ts` files and `tools-ki/src/tests/cli/skill/rubric*.test.ts`, and rendered into each `references/rubric.md`. Owner is the Harness for catalogue content and `tools-ki` for hosting; gates are `bun run test`, `bunx tsc --noEmit`, and `ki repo audit --skill ki-skills --repo .`. Classification: active internal, current V1; no compatibility metadata or V2 host path was found.
- **Recap repository-evidence marker:** `ki-change-management-recap-repository-evidence/v1` is produced and consumed by `skills/change-management/ki-recap/scripts/recap-grounding.ts`, fixture-checked by `recap-grounding.test.ts`, documented in `references/standards-session-recap.md`, and projected into `ki-plugins`. Owner is the Harness; gate is the focused recap-grounding test. Classification: active internal, current V1; no cutover.
- **KI user configuration:** `schema = 1` is produced and consumed by `tools-ki/src/agents/configuration.ts`, covered across bootstrap, lifecycle, diagnostic, repair, skill, and harness CLI fixtures under `tools-ki/src/tests/cli/`, and oriented by the configuration and bootstrap material in `tools-ki/README.md` and the manual. Owner is `tools-ki`; gate is its CLI test suite and TypeScript check. Classification: active internal, current V1; future-schema fixtures fail closed.
- **KI local repository registry:** `schema = 1` is produced and consumed by `tools-ki/src/core/local-registry.ts`, exercised by `src/tests/cli/registry/registry.test.ts` and trade/Agora/repository fixtures, and documented in `tools-ki/README.md` and `man/ki.1`. Owner is `tools-ki`; gate is the registry CLI test. Classification: active internal, current V1; no cutover.
- **KI installer receipt:** `schema = 1` is produced by `tools-ki/install.sh`, consumed by `tools-ki/src/core/installation.ts`, exercised by `src/tests/install/install.test.ts` and `src/tests/cli/manage/update.test.ts`, and documented by `README.md`, `man/ki.1`, and `docs/specs/management.md`. Owner is `tools-ki`; gates are the installer and manage-update tests. Classification: active internal, current V1; schema-two fixtures are rejection evidence only.
- **KI release checksum envelope:** `format=ki-release-checksums-v1` is produced by `tools-ki/.github/workflows/release.yml`, consumed by `tools-ki/install.sh`, and fixture-checked by `src/tests/install/_helper.ts` and `install.test.ts`. Release-management documentation names the signed checksum manifest; owner is `tools-ki`; gates are the installer test and release workflow verification job. Classification: active internal, current V1; no cutover.
- **mGit workspace manifest:** `schema = 1` is produced and consumed by `tools-mgit/bin/mgit`, exercised throughout `tools-mgit/tests/mgit.bats`, documented in `docs/guides/user/repository-sets.md`, `docs/guides/user/worktrees.md`, and `man/mgit.1`, and materialised in the Knowledge Islands workspace plus Chezmoi-managed workspace fixtures. Owner is `tools-mgit`; gate is `bats tests/mgit.bats`. Classification: active internal, current V1; no alias or alternate schema was found.
- **mGit repository-leaf configuration:** `version = 1` is produced and consumed by `tools-mgit/bin/mgit`, fixture-checked by `tools-mgit/tests/mgit.bats`, documented in `README.md` and `man/mgit.1`, and materialised in two Chezmoi-managed leaf configurations. Owner is `tools-mgit`; gate is `bats tests/mgit.bats`. Classification: active internal, current V1; no cutover.
- **M365 routing-rule DSL:** `rules v1` is produced by repository or caller-authored rule notes, consumed and fail-closed by `mcp-m365/src/main/triage/parser.ts`, exercised by the triage parser, lint, matcher, and run tests plus `fixtures/routing/example-rules.md`, and documented in `mcp-m365/README.md` and the MCP tool description. Owner is `mcp-m365`; gate is its triage test set. Classification: active internal, current V1; the V2 occurrence is a negative rejection fixture.
- **KIS-0001 Knowledge Package manifest:** `specVersion: 1.0.0` and the versioned schema `$id` are produced by `ki-specifications/schemas/knowledge-package.schema.json`, consumed through the documented AJV Draft 2020-12 validation command, exercised by schema examples, package examples, and three templates, and documented throughout `specifications/KIS-0001-knowledge-package/`, `docs/versioning.md`, and `tooling/README.md`. Owner is `ki-specifications`; gate is AJV validation of every tracked example and template. Classification: active internal, current V1. Package `version` fields remain artifact versions, not schema versions.
- **Agora roots encoding:** the newline and NUL encodings are declared as the V1 compatibility contract in `tools-ki/docs/specs/agoras.md`, produced by the Agora roots command, consumed by shell and `mgit --agora`, and fixture-checked by `tools-ki/src/tests/cli/agora/agora.test.ts` and `tools-mgit/tests/mgit.bats`. Owner is `tools-ki`; gates are those two focused tests. Classification: active internal, current V1; no alternate encoding alias exists.

### Proven receiver-owned V1 cutover map

- **Harness plan provenance state:** `hooks/plan-stamp.sh` produces exact JSON V1 with `version`, `session_id`, `plan_file`, and `cwd`; `hooks/plan-sync.sh` consumes and validates it; `hooks/plan-stamp.test.ts` and `hooks/plan-sync.test.ts` are the fixtures; `hooks/README.md` is the rendered documentation; and `docs/specs/harness.md` names the pair and gate. The consumer still accepts one legacy plaintext absolute-path record at `hooks/plan-sync.sh:117`, with matching compatibility fixtures at `hooks/plan-sync.test.ts:358` and documentation in `hooks/README.md:7`. Receiver and owner are the Harness. The separately approved cutover would remove the plaintext branch, its positive legacy fixtures, and the temporary-compatibility documentation in one change while leaving JSON V1 unchanged and failing non-JSON state closed. Gate: `bun hooks/plan-stamp.test.ts && bun hooks/plan-sync.test.ts`, followed by `bun run test` and `bunx tsc --noEmit`. This item does not implement or authorise that cutover; a human must accept and schedule it.

### Incomplete internal mappings and parks

- **Dotfiles configuration-fragment inventory:** `/Users/krisbrown/.local/share/chezmoi/.chezmoidata/config-fragments.yaml` declares `version: 1`, and `bin/executable_chezmoi_fragments` consumes its `bindings`, but the consumer does not inspect the version and no version-specific fixture or gate was found. The operational guide is `docs/guides/agents/config-fragments.md`. Classification: active internal, incomplete. Park for `krisb/dotfiles` to decide whether the marker is enforceable schema or descriptive metadata before any migration is proposed.
- **ChatGPT local-capture metadata:** `format_version = "0.1.0"` is consumed fail-closed by `tools-ki/src/core/kep.ts`, covered by `src/tests/cli/acquire/acquire.test.ts`, and documented by `ki-website/site/src/guidance/cli/chatgpt-local-capture.md`; however, no canonical producer beyond helper/test construction and user-authored capture metadata was found. Classification: active internal, incomplete. Park jointly for `tools-ki` and `ki-website` to identify the producer and receiver ownership before deciding whether `0.1.0` is renamed to V1.
- **Knowledge Export Package:** `format_version = "0.1.0"` is produced by `tools-ki/src/core/kep.ts`, represented by `ki-specifications/examples/kep-v0-minimal/kep.toml`, and documented by the draft `specifications/KIS-0002-knowledge-export-package/`; no active package consumer or validator was found. Classification: active internal, incomplete. Park for `ki-specifications` and `tools-ki` to confirm the draft contract, consumer, fixture set, and acceptance gate before any V1 cutover.
- **Techne root manifest:** `ki-techne-principal/manifest.yaml` carries `version: 0.1`, but no producer, parser, validator, fixture, or documentation defining whether this is schema, package, or content version was found. Classification: unclear internal version axis, incomplete. Park for `ki-techne-principal` to classify the field; do not renumber it from this inventory.

### External-standard and non-schema exclusions

- **MCP and JSON-RPC:** `protocolVersion: 2025-11-25`, JSON-RPC `2.0`, and SDK package-family V1/V2 references in MCP recordings, smoke clients, and the `ki-repo-mcp` source material are externally defined. The planned SDK/protocol migration remains owned by `KI-HARNESS-GOV-006`; this item neither renames nor duplicates it.
- **SaaS APIs:** Google Gmail `v1` and Calendar/Drive/Sheets `v3`/`v4`, Notion `2022-06-28`, and Microsoft Graph `v1.0` and OAuth `v2.0` markers are provider-defined protocol selectors in the MCP repositories. They retain their source labels.
- **GitHub:** Dependabot `version: 2` and action references such as `setup-bun@v2` are GitHub schema or action-release selectors. They are not KI schema lineage.
- **Vendor application state:** Claude Desktop/Cowork `installed_plugins.json` `version: 2` is read in `mcp-claude-housekeeping/src/main/claude-desktop/audit.ts` and fixture-recorded in its tests, but Claude owns the producer and schema. It remains an external exclusion.
- **File and wire formats:** JSON Schema Draft 2020-12, XML and plist `1.0`, MIME `1.0`, and Git porcelain V1 are source-defined format markers and remain unchanged.
- **Published standards:** SemVer 2.0.0, TOML 1.1.0, Conventional Commits 1.0.0, and tool-owned configuration `$schema` URLs are citations to external standards, not internal migration candidates.
- **Package and artifact identity:** package manifests, Claude plugin `version`, MCP `serverInfo.version`, Knowledge Package `version`, connector versions, executable versions, CI `KI_VERSION`, and release tags version the artifact rather than its schema. They are explicitly outside this work item's version axis.
- **Generated vendor surfaces:** shell completions, generated MCP client types, and vendored publication copies repeat upstream command, API, or package versions. They follow their producer and are not independently renumbered.

### Historical evidence and raw-search reconciliation

- Future or invalid versions in tests—`schema = 2` in `tools-ki`, capture `0.2.0`, and `rules v2` in `mcp-m365`—are negative rejection fixtures, not supported aliases.
- Prior roadmap and decision discussions, and `tools-ki/-/_LEGACY_HANDOFFS/`, preserve completed or superseded evidence. They are not rewrite targets.
- Current roadmap records such as `KI-HARNESS-GOV-006` intentionally discuss external MCP SDK V1/V2 lineage. Trade and roadmap evidence remains immutable except through its owning lifecycle.
- The raw scan also found an uncommitted `tools-ki/src/core/managed-artifacts.ts` schema-one surface and related uncommitted tests in a peer worktree with nineteen changed paths. Because it is not committed canonical evidence and its documentation remains roadmap-shaped, it is excluded from the active inventory and parked for the `tools-ki` owner. The other fifteen participant worktrees were clean at observation except the Harness, where another approved batch lane had modified `docs/roadmap/KI-HARNESS-GOV-002-deploy-specifications-fleetwide.md`.

The reconciliation found no active internal V2 producer, no proposal to preserve a V1/V2 alias, and no historical or external marker selected for renumbering. The sole cutover map removes an existing unversioned compatibility input while preserving the current V1 contract; every incomplete surface remains explicitly parked.
