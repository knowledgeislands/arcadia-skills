---
id: KI-HARNESS-GOV-046
title: Audit KI configuration structure
area: GOV
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked_by: []
baseline_ref: 081922e8bf0651dfa44f8995df414c23a8b1ab29
---

## Goal

Establish an estate-wide approach that keeps `.ki-config.toml` files expressive, concise, consistently ordered, and easy to navigate as they grow.

## Context

KI configuration files are accumulating more declared skills and larger relationship datasets. That growth is valid, but the files currently provide little shared guidance about ordering, conceptual grouping, section boundaries, or when repeated configuration has become unnecessarily verbose.

The Harness illustrates the navigation problem. Repository identity and structure declarations such as `skills.ki-repo` and `skills.ki-repo-harness` are foundational and should be easy to find near the front, while operational relationship data such as trade routes and Agora homes and memberships may read more clearly toward the end under recognisable sections.

## Boundary

Audit before standardising. This delivery reads the registered estate and records an evidence-backed recommendation in this item; it does not change any `.ki-config.toml`, add a checker, impose comment headings, split files, rename tables, or change configuration semantics. Any standard, checker, or multi-repository conformance becomes separately reviewed follow-up work after the recommendation is accepted.

## Current state

The current registered estate contains 27 repositories. Fifteen are under the `knowledgeislands` workspace, but the registry also includes personal configuration, Knowledge Bases, websites, harnesses, and other Projects elsewhere. The audit therefore uses the registered estate selected by `ki repo --estate`, re-resolved at execution time, rather than assuming one filesystem parent or organisation is complete.

The initial direction is intentionally provisional. Repository identity and structural skills such as `skills.ki-repo` and `skills.ki-repo-harness` appear to belong near the front, while data-heavy relationship sections such as trade routes and Agora homes and memberships may belong toward the end under recognisable boundaries. The audit must test that direction across repository kinds before it becomes a convention.

The existing `ki-repo` contract fixes one shared root `.ki-config.toml`, `[repo]` plus the `[skills]` namespace, one owner table per skill, explicit root markers, and validate-down / ignore-across ownership. Ordering and navigational section comments are not currently semantic. The audit may recommend presentation and checkable ordering rules, but it cannot weaken those ownership boundaries or make comments meaningful to consumers.

## Steps

- [x] Re-resolve the registered estate with `ki repo --estate`, record the exact in-scope roots and missing or unreadable configurations, and keep those access findings distinct from configuration-structure findings.
- [x] Parse every accessible root `.ki-config.toml` and record line and byte size, root-table order, declared skill-root order, nested-table placement, comment boundaries, and the line share occupied by large repeated structures such as routes and memberships.
- [x] Classify each repository by its declared `ki-repo` kind and structural markers, then compare Harness, Knowledge Base, website, MCP, tools, personal-configuration, and ordinary Project profiles without forcing every profile to contain the same groups.
- [x] Test the provisional ordering against representative configurations: `[repo]`, `skills.ki-repo`, repository-kind and structural declarations, general governance and runtime declarations, change-management declarations, then data-heavy relationship sections such as `ki-trades` and `ki-agora` toward the end.
- [x] Compare no headings, stable comment boundaries, and any file-splitting alternative against navigation, diff quality, TOML validity, consumer compatibility, and the one-file / one-owner-table contract.
- [x] Identify values that appear duplicated or derivable, but route each semantic simplification to its owning skill rather than proposing a cross-owner rewrite from `ki-repo`.
- [x] Record in this item the inventory summary, representative examples, rejected alternatives, recommended ordering and optional section vocabulary, and the boundary between judgment guidance and deterministic checks.
- [x] Propose separately scoped follow-up records for any accepted standard change, checker implementation, owner-specific schema simplification, or estate rollout; do not implement them in this delivery.

## Implementation evidence

### Estate selection and access

The execution-time selection was `ki repo --estate diag` on 2026-08-18. It returned 27 registered repositories: all 27 roots existed, all 27 root `.ki-config.toml` files were readable, and all 27 parsed successfully with Python 3 `tomllib`. There were no missing, unreadable, or invalid configurations. Diagnostic projection status was deliberately excluded from the structure findings: all 27 repositories were reported as repairable, but projection health is not evidence about configuration navigation.

The exact selected roots are:

- E01: `/Users/krisbrown/workspaces/hnr/5g-emerge/5g-emerge-ibc-2026`
- E02: `/Users/krisbrown/.local/share/chezmoi`
- E03: `/Users/krisbrown/workspaces/kit/equalremedy/dafacts-website`
- E04: `/Users/krisbrown/workspaces/kit/equalremedy/er-research`
- E05: `/Users/krisbrown/workspaces/hnr/kis/hnr-agentic-harness`
- E06: `/Users/krisbrown/workspaces/kit/knowledgeislands/homebrew-tap`
- E07: `/Users/krisbrown/workspaces/kit/knowledgeislands/ki-agentic-harness`
- E08: `/Users/krisbrown/workspaces/kit/knowledgeislands/ki-arcadia-principal`
- E09: `/Users/krisbrown/workspaces/kit/knowledgeislands/ki-plugins`
- E10: `/Users/krisbrown/workspaces/kit/knowledgeislands/ki-specifications`
- E11: `/Users/krisbrown/workspaces/kit/knowledgeislands/ki-techne-principal`
- E12: `/Users/krisbrown/workspaces/kit/knowledgeislands/ki-website`
- E13: `/Users/krisbrown/workspaces/hnr/kis/kit-hnr`
- E14: `/Users/krisbrown/workspaces/kit/legal/kit-legal`
- E15: `/Users/krisbrown/workspaces/kit/personal/kit-midnight.ninja`
- E16: `/Users/krisbrown/workspaces/kit/personal/kit-principal`
- E17: `/Users/krisbrown/workspaces/kit/techmedix/kit-techmedix`
- E18: `/Users/krisbrown/workspaces/kit/knowledgeislands/mcp-claude-housekeeping`
- E19: `/Users/krisbrown/workspaces/kit/knowledgeislands/mcp-git-audit`
- E20: `/Users/krisbrown/workspaces/kit/knowledgeislands/mcp-gsuite`
- E21: `/Users/krisbrown/workspaces/kit/knowledgeislands/mcp-ki-kb-fs`
- E22: `/Users/krisbrown/workspaces/kit/knowledgeislands/mcp-ki-kb-notion-mirror`
- E23: `/Users/krisbrown/workspaces/kit/knowledgeislands/mcp-m365`
- E24: `/Users/krisbrown/workspaces/kit/knowledgeislands/tools-ki`
- E25: `/Users/krisbrown/workspaces/kit/knowledgeislands/tools-mgit`
- E26: `/Users/krisbrown/workspaces/kit/vallearmonia/vallearmonia-principal`
- E27: `/Users/krisbrown/workspaces/kit/vallearmonia/vallearmonia-website`

The inventory measurements are below. `Relationship lines` is the complete line span owned by `ki-trades` and `ki-agora`, including their nested tables; it is zero where neither owner is declared.

| ID | Bytes | Lines | Profile | Relationship lines |
| --- | ---: | ---: | --- | ---: |
| E01 | 791 | 38 | Website | 0 |
| E02 | 1,589 | 67 | Personal configuration | 17 |
| E03 | 679 | 31 | Other Project | 5 |
| E04 | 1,199 | 49 | Knowledge Base | 8 |
| E05 | 832 | 43 | Harness | 0 |
| E06 | 996 | 43 | Other Project | 13 |
| E07 | 5,514 | 172 | Harness | 93 |
| E08 | 1,855 | 75 | Knowledge Base | 25 |
| E09 | 1,137 | 42 | Other Project | 11 |
| E10 | 1,429 | 61 | Other Project | 21 |
| E11 | 2,053 | 83 | Knowledge Base | 32 |
| E12 | 1,698 | 73 | Website | 23 |
| E13 | 1,186 | 56 | Knowledge Base | 9 |
| E14 | 2,062 | 79 | Knowledge Base | 9 |
| E15 | 969 | 48 | Website | 5 |
| E16 | 977 | 41 | Knowledge Base | 8 |
| E17 | 943 | 45 | Knowledge Base | 6 |
| E18 | 1,229 | 55 | MCP | 14 |
| E19 | 1,205 | 55 | MCP | 14 |
| E20 | 1,251 | 55 | MCP | 14 |
| E21 | 1,184 | 55 | MCP | 14 |
| E22 | 1,237 | 54 | MCP | 14 |
| E23 | 1,192 | 55 | MCP | 14 |
| E24 | 1,603 | 73 | Tools | 28 |
| E25 | 1,696 | 72 | Tools | 29 |
| E26 | 1,231 | 52 | Knowledge Base | 8 |
| E27 | 1,160 | 61 | Website | 5 |

Together the configurations contain 38,897 bytes and 1,633 lines. The median file is 1,205 bytes and 55 lines; the ranges are 679–5,514 bytes and 31–172 lines. The declared kind and structural markers produce eight Knowledge Bases, four websites, two Harnesses, six MCP Projects, two tools Projects, one personal-configuration Project, and four other Projects. Every selected repository therefore has one primary profile and every profile has a representative below.

### Structural findings

All 27 configurations put `[repo]` first and `[skills.ki-repo]` first in the skills namespace. This is the strongest estate-wide convention already present. Exact skill-root order after those foundations varies substantially even within a profile: runtime declarations occur near the front in E15 and E26, but toward the end in E08 and E18–E23; change-management tables likewise occur before relationships in some files and after them in others.

Nested owner tables are contiguous with their root owner in 25 configurations. E07 splits both `ki-trades` and `ki-agora`: the bare roots occur together at lines 48–50, trade routes occupy lines 52–95, and Agora homes resume at line 128. E09 reopens `skills.ki-repo.checks` at line 25 after `ki-trades`. These are valid TOML and consumers parse them correctly, but the split owner blocks make scanning and owner-bounded diffs harder. Nested tables appearing before an explicit root marker are not a general pattern in the estate.

Only eight configurations contain any comments, with 14 comment lines in total. Most explain a non-obvious value or override, as the existing TOML convention requires; they are not navigational headings. Nineteen files have no comments. E07, the largest file, has one inline explanatory comment but no section boundaries, so its 172 lines expose the navigation problem most clearly. Making headings mandatory everywhere would add noise to the median 55-line file without evidence of benefit.

Relationship data occurs in 25 configurations and occupies 439 lines, 26.9% of all configuration lines. Its concentration matters more than the estate-wide share: E07 devotes 93 of 172 lines (54.1%) to routes and Agora data, E11 32 of 83 (38.6%), E24 28 of 73 (38.4%), and E25 29 of 72 (40.3%). The six MCP configurations share a stable 54–55-line shape in which relationships occupy 14 lines and already finish with the Agora block. Small relationship blocks do not by themselves justify headings.

Representative profile comparisons support a flexible group model rather than one exhaustive template:

- Harness: E07 needs clear structural, capability, change-management, runtime, and relationship neighbourhoods; E05 is only 43 lines and has no relationship data, so the same headings would be excessive.
- Knowledge Base: E08 keeps the `ki-repo-kb*` structural family together near the front and Agora last; E11 separates some KB structural declarations around trade and runtime blocks, demonstrating the scan cost of order drift.
- Website: E12 keeps website structure near the front but places its Cloudflare structural marker later; E27 keeps all website markers together and leaves Agora last.
- MCP: E18–E23 use almost identical sequences, demonstrating that stable profile-local order improves comparison and review without requiring absent groups.
- Tools: E24 and E25 group the tools structure near the front and relationship data later, but differ on the placement of `ki-specs`; this difference has no semantic consequence and is better handled as judgment guidance.
- Personal configuration: E02 has owner-specific binding and dotfiles structure plus two relationship families; forcing it into a software-project template would obscure those distinguishing declarations.
- Other Project: E06, E09, and E10 contain specialised structural markers and relationship data, while E03 is a compact Project with Agora only. Their useful commonality is foundations first and owner blocks kept together, not identical membership.

### Tested order and navigation examples

The provisional sequence works when interpreted as optional neighbourhoods:

1. Foundation: `[repo]`, then `[skills.ki-repo]` and its nested tables.
2. Repository shape: the declared primary-kind marker and structural adapters such as Harness, Knowledge Base, website, MCP, tools, plugins, or specifications.
3. General governance and runtime: authoring, Git, engineering, decision/specification/guide capabilities, bindings, housekeeping, and tokenomics.
4. Change management: work, roadmap, delegation, and checkpoint declarations.
5. Relationships: `ki-trades` and `ki-agora`, each as one contiguous owner block, toward the end when they are data-heavy.

This is not a total sort and does not require a repository to declare every neighbourhood. Owner affinity wins over the category list: an adapter belongs beside the structural root it extends, and a nested table stays with its root even if one of its values could be described as change management. Within a neighbourhood, stable repository-local order is sufficient; alphabetic order would separate related adapters and would create high-churn rewrites without a navigation benefit.

A positive navigation example is E27's progression from foundation to Project and website structure, governance/runtime, change management, documentation, and a final Agora block. A before-and-after example for E07 would move the full trade-routes block and full Agora-homes block together to the end, retaining every byte within each owner block and adding optional `# Change management` and `# Relationships` boundaries only because the file is long. The consumer-visible TOML data remains identical; the improvement is that repository shape is visible before line 40 and all relationship data has one destination.

### Alternatives

- No headings and no ordering guidance preserves validity and produces the smallest diffs, but leaves the largest files dependent on memorised table locations and allows owner blocks to drift apart. It remains appropriate for compact files that already have a stable sequence.
- Stable comment boundaries improve navigation in long or heterogeneous files and are semantically inert to TOML consumers. They should be optional judgment guidance, used only when a file has multiple substantial neighbourhoods. Comments explaining values remain attached to the value or table they explain and must not be mistaken for section headings.
- Mandatory headings or a line-count threshold are rejected. Line count is only a proxy for navigation difficulty, headings would add low-value churn to compact files, and no consumer can treat a comment as semantic structure.
- Splitting `.ki-config.toml` is rejected. TOML has no portable include mechanism, existing consumers expect one root file, and splitting would weaken the one-file compliance marker and the one-owner-table review boundary.
- A global alphabetic sort is rejected. It is deterministic but separates structural roots from adapters and prioritises spelling over reader intent.
- A mandatory full category order is rejected. Repository profiles legitimately omit categories and some skills span descriptive categories; enforcing semantic classification would require cross-owner interpretation.

### Duplication and owner routes

The repeated runtime marker sets may look derivable from `supported_runtimes`, but they are explicit capability declarations with independent resolution semantics. Any reduction belongs to the owners of `ki-repo`, tokenomics, and runtime adapters; this audit does not recommend removing them.

Trade route partner identifiers and paths repeat across repositories, but route direction and repository-local authority prevent a cross-owner inference. A schema-simplification investigation belongs to `ki-trades`. Agora home, membership, role, and member data is intentionally reciprocal across independent repositories; any safe derivation belongs to `ki-agora`. Repeated roadmap areas and token-budget declarations belong respectively to their work and tokenomics owners. None is suitable for a `ki-repo` cross-table rewrite.

### Recommendation and ownership classification

Adopt the smallest useful convention through separately reviewed follow-up work:

- Judgment guidance (`ki-repo`): document the five optional neighbourhoods above, foundation first, data-heavy relationship blocks toward the end, stable local order within a neighbourhood, and owner affinity over category purity.
- Judgment guidance (`ki-authoring`): permit concise `# Foundation`, `# Repository shape`, `# Governance and runtime`, `# Change management`, and `# Relationships` headings when they materially improve a long or heterogeneous file. Use only the headings needed; do not require them, derive semantics from them, or detach explanatory comments from their values.
- Deterministic `ki-repo` check: require `[repo]` to be the first root table and `[skills.ki-repo]` to be the first skill-root table. Positive example: all 27 estate configurations. Negative example: `[skills.ki-authoring]` before `[repo]`, which hides repository identity even though TOML remains valid.
- Deterministic `ki-repo` check: require each owner's root and nested tables to form one contiguous block, with the exact root marker before its nested tables. Positive example: E24 keeps `skills.ki-trades` immediately followed by all five route tables. Negative example: E09 places `skills.ki-repo.checks` after a `ki-trades` block, reopening the `ki-repo` owner later in the file.
- No deterministic check: do not enforce category membership, order within a neighbourhood, headings, file length, relationship-table position, or alphabetic order. Those require intent or would generate churn without protecting the configuration contract.
- Owner-specific follow-up: investigate verbosity only in the owning skills named under Duplication and owner routes; preserve validate-down / ignore-across throughout.

The deterministic checks reason only about table identity and placement. They preserve `[repo]`, exact skill-root declarations, nested owner tables, and the one-file contract; they do not inspect sibling-owned keys. Comment headings remain semantically inert. Conformance should move whole owner blocks without modifying their contents and should be a separately approved estate rollout, not an automatic consequence of adopting guidance.

### Proposed follow-up records

1. Standard change: update the `ki-repo` configuration standard with optional neighbourhood guidance and the two deterministic placement rules; update `ki-authoring` with optional section-comment vocabulary and examples.
2. Checker implementation: add focused positive and negative fixtures for foundation order and contiguous owner blocks, then publish the resulting `ki-repo` rubric criteria.
3. Owner-specific simplification: create separate investigations for `ki-trades`, `ki-agora`, and runtime-capability declarations only if their owners judge the measured repetition costly enough to change their schemas.
4. Estate rollout: after the standard and checker are accepted, prepare repository-local changes with each repository retaining review and acceptance authority; prioritise E07 and E09, then the other files where relationship blocks exceed roughly one third of the file by observation, not as a permanent threshold.

No follow-up was created or implemented in this delivery.

## Files touched

- `docs/roadmap/KI-HARNESS-GOV-046-audit-and-structure-ki-configuration.md`

Registered estate `.ki-config.toml` files are read-only evidence. No skill standard, rubric, script, test, generated publication, or sibling repository changes in this delivery.

## Verify

- The recorded root count and identities reconcile with a fresh registered-estate selection, with every missing or unreadable config listed explicitly rather than silently omitted.
- Every accessible config parses before analysis; the recorded table sequence and size totals reconcile with the source files.
- The evidence includes at least one representative of every repository profile present in the selected estate and explains any profile with no representative.
- The recommended order preserves `[repo]`, exact skill-root declarations, nested owner tables, and validate-down / ignore-across semantics; comments remain semantically inert.
- The recommendation explicitly classifies each proposed rule as judgment guidance, a deterministic `ki-repo` check, or an owner-specific follow-up, with a positive and negative example for every proposed deterministic check.
- `ki repo audit --skill ki-work-roadmap --repo .` and the targeted Markdown check pass after the evidence and recommendation are recorded.

## Dependencies / blocks

This item has no prerequisite and blocks no current work. It depends only on read access to the registered estate; inaccessible repositories remain explicit inventory gaps and do not authorise filesystem or remote writes. Estate repositories are evidence sources only, and changing them requires separately confirmed repository-local authority.

## Delegation

### Locked decisions

- Estate means the repository registry selected by `ki repo --estate`, freshly resolved at execution time.
- This delivery writes only this work item and produces a recommendation; it does not alter configuration, standards, checkers, scripts, tests, publications, or peer repositories.

### Escalate

- Any inaccessible repository that prevents representative coverage, ambiguous repository identity or kind, need for a peer write, semantic configuration change, new checker, standard change, or recommendation that would weaken one-file or owner-table boundaries.

### Worker: configuration-audit

- **Deliverable:** A complete estate inventory, representative analysis, alternatives, ownership classification, and evidence-backed recommendation recorded in this work item.
- **Inputs:** This work item, the registered estate, the `ki-repo` configuration standard, the `ki-authoring` TOML conventions, and each accessible root `.ki-config.toml`.
- **Scope:** Read registered repository roots and their `.ki-config.toml` files; write only this work item. Do not change configuration, standards, source, tests, generated files, registry state, or external systems.
- **Authority:** Run read-only registry, filesystem, TOML parsing, and Git inspection commands; update the named work item only. Perform no Git write, network write, peer write, message, deployment, push, release, or destructive action.
- **Isolation:** Read-only estate access plus exclusive write access to this roadmap file in the shared worktree; no Git staging or commit commands.
- **Verify:** Coordinator reconciles the inventory with a fresh estate selection, samples every cited configuration class, reviews the recommendation against `ki-repo` and `ki-authoring`, and runs the work item's gates.
- **Return:** Concise inventory totals, representative findings, recommendation, proposed follow-ups, exact file changed, and verification result; no raw diagnostic transcript.
- **Checkpoint:** Return after the recommendation and required evidence are complete in the work item, or immediately on an escalation condition.

## Documentation impact

### Decision Records

No Decision Record changes in this delivery. Propose one as follow-up only if the accepted recommendation changes the durable one-file or ownership architecture rather than presentation guidance.

### Specifications

No product Specification change is expected.

### Guides

No guide changes in this delivery. Update guidance only through accepted follow-up work after the configuration convention and its examples are settled; do not publish the provisional Harness ordering as an estate rule.

### Roadmap

This item is the durable audit record. Create separately scoped implementation or rollout work if the accepted recommendation calls for standard changes, new checks, semantic simplification, file splitting, or multi-repository conformance.

## Review

### Delivered

Completed the approved read-only estate audit from baseline `081922e8bf0651dfa44f8995df414c23a8b1ab29`, with resulting evidence in `029ca173e1be0cd751a8cf66d6f77f26e8b01cf8`. No peer configuration was changed.

### Summary of changes

Recorded evidence from 27 readable, TOML-valid estate configurations and recommended five optional neighborhoods, optional semantic-inert headings where useful, foundation-first ordering, and contiguous root-plus-nested owner blocks. The audit rejects mandatory headings, configuration splitting, global alphabetic sorting, and cross-owner semantic simplification.

### Verification

The estate inventory covered 27 of 27 registered roots. Targeted rumdl, `git diff --check`, and the roadmap audit passed. The repository-wide authoring audit reports six pre-existing generated-anchor defects, and the full suite reports one unrelated aggregate-remediation review assertion; on 2026-08-18, the user explicitly accepted these unrelated failures as review exceptions.

### Outstanding concerns

The recommendation is audit evidence, not an adopted `ki-repo` contract. Four separately scoped follow-up proposals remain available for standards, deterministic checks, owner-specific simplification, and rollout. The unrelated repository maintenance failures remain unchanged.

### Post-change review

The evidence supports a deliberately small convention that improves navigation without turning judgment into brittle automation. The read-only boundary held, representative repository profiles were covered, and no configuration consumer was affected. The item is ready for human acceptance review.

### Mini recap

Audited the estate, quantified configuration growth and relationship density, and proposed optional neighborhoods with only two deterministic ordering checks. No peer files changed; unrelated repository-wide failures were accepted as exceptions.

## Done

Accepted by the user on 2026-08-18 against implementation commit `029ca173e1be0cd751a8cf66d6f77f26e8b01cf8` and review evidence commit `515d802179bf2a4f2078d033867b57b1a747f472`. The recommendation is accepted as audit evidence; its separately scoped follow-ups remain unselected.

## Discussion

### Candidate outcome

The audit should recommend the smallest useful convention: a documented ordering and grouping model, bounded section-comment guidance where it materially improves navigation, and checks only for rules that can be enforced without understanding user intent. It may conclude that some large data sections are already appropriately expressive and need only clearer placement.

### Evidence required

Any recommendation must include the estate inventory, representative configurations from materially different repository kinds, before-and-after navigation examples, compatibility implications for TOML consumers, and a distinction between safe mechanical conformance and changes requiring repository-owner judgment.

### Ownership boundary

`ki-repo` owns the shared file contract, cross-skill ordering guidance, and any check that reasons only about table identity and placement. `ki-authoring` owns TOML presentation, including whether comments communicate their purpose clearly. Each declared skill continues to own the contents and schema of its own table; suspected duplication or verbosity inside an owner table is evidence for that skill, not permission for a cross-owner conformer.
