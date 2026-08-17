---
id: KI-HARNESS-FND-009
title: Add tool configuration skills
area: FND
theme: foundation-tooling
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Let a repository opt into focused skills for project-local developer tools, beginning with VS Code and Zed. Including one of these skills should give that repository sensible, tool-specific configuration defaults without making the tool mandatory for every KI repository.

## Context

Some developer tools carry useful configuration with the project, while their user-level preferences and machine-specific state must remain local. `tools-ki` already provides a useful project-local example for VS Code and Zed workspace configuration, and its emerging tool-workspace boundary keeps tool targeting separate from canonical repository identity and portable `ki-repo` metadata.

The harness needs a repeatable way to package such guidance as optional skills: a repository explicitly includes the applicable tool skill, then receives a small, safe set of defaults for that tool's tracked project configuration.

## Boundary

This item does not make VS Code, Zed, or any later tool a universal repository requirement; install or manage user-level editor settings; capture machine-specific paths or workspace state; or move tool configuration into the portable `ki-repo` contract. It also does not implement `tools-ki` editor-target commands.

## Shaping

### Intended approach

Study the existing `tools-ki` VS Code and Zed configuration as a reference, then extract two narrowly scoped reusable skills with clear ownership of their respective project-local configuration. Each skill should describe its defaults, apply only safe tracked configuration, and leave repository activation explicit through the normal skill-inclusion mechanism.

Keep shared guidance in a common place only where the tools genuinely have the same concern. Tool-specific defaults, file conventions, and validation remain with the corresponding skill so later tool integrations can be added without turning one broad skill into an editor catalogue.

### Known dependencies

The initial scope is limited to the two reference tools, VS Code and Zed. `tools-ki` is evidence for their current tracked files, not an authority to copy its settings wholesale or to choose the reusable contract. The Harness owns any resulting skill content and semantics; `tools-ki` owns its host commands and its own project configuration.

The skills must remain compatible with the established tool-workspace boundary: project-local configuration may consume a repository's declared structure, but it must not redefine canonical repository identity, declared stores, or local-user configuration. If the selected contract needs a `ki` command or host activation behaviour, capture a separate receiver-owned `tools-ki` work item through `ki-trades`; this item does not authorise that change.

### Decisions still needed

Confirm the canonical names and placement, whether each skill owns a closed settings file or a declared key-level merge, and the exact initial keys. Decide whether formatter integration is conditional on `ki-engineering`, how unavailable extensions or community-maintained formatter support are represented, and which `.editorconfig`-owned behaviours must be omitted as duplication.

The next planning review should compare two explicit options:

- `ki-vscode` and `ki-zed` under `skills/environment/`, each governing one project settings file and preserving unrelated keys through an exact key-level contract.
- `ki-editor-vscode` and `ki-editor-zed` under the same concern, making the editor relationship more explicit at the cost of longer names.

For either option, user preferences, extension installation, global settings, formatter selection without a declared compatible toolchain, and machine paths remain excluded. Selecting either naming option is a Harness decision; it must not be inferred from the two `tools-ki` reference files.

### Promotion conditions

Promote when the names, key-level versus whole-file ownership, conditional `ki-engineering` relationship, exact defaults, and extension-availability behaviour are selected; the two skills have a clear shared-versus-tool-specific split; and fixtures validate their configuration without requiring either editor to be installed.

## Current state

`tools-ki` provides the reference project-local VS Code and Zed configuration, but the Harness has not yet classified every tracked setting as portable, tool-specific, user-local, or machine-local. No reusable tool-configuration skill currently owns the shared or per-tool defaults.

The reference files are only `.vscode/settings.json` and `.zed/settings.json`, and they are not a coherent policy: VS Code selects Biome for JavaScript, TypeScript, and JSON, while Zed selects Prettier globally. Current primary editor documentation confirms project/workspace settings and the file-hygiene keys, but Zed's Biome support requires a community extension and its `.editorconfig` support already owns line endings. The plan must therefore choose whether these skills provide only non-duplicative editor behaviour or conditionally compose with `ki-engineering`; it cannot copy the two reference files wholesale.

The evidence establishes the source boundary but leaves three implementation decisions unresolved: exact initial keys, whole-file versus key-level ownership, and the formatter/extension policy. Until they are selected together, neither a skill name nor a verification fixture is reviewable enough for Ready.

## Decision gate

Recommended disposition: do not create editor-configuration skills now. The available VS Code and Zed settings are either user preference, duplicated `.editorconfig` policy, or require an extension/formatter selection outside a reusable skill's authority. This is a justified boundary, not missing implementation.

An alternative implementation requires explicit approval of one real portable setting set, named-key ownership only, a no-extension-installation boundary, and one tool at a time. Whole-file ownership and formatter integration remain out of scope.

## Steps

- [ ] Inventory the tracked VS Code and Zed configuration in `tools-ki`, classifying each setting by ownership, portability, native-editor validation, and the source that supports retaining or excluding it.
- [ ] Select and record the exact safe defaults, tracked files, skill names, and placement for each tool; decide whole-file versus key-level ownership, formatter/extension treatment, and `.editorconfig` exclusions together. Reject user preferences, machine paths, and repository-identity claims from the reusable contract.
- [ ] Create the two optional tool-configuration skills, keeping common guidance minimal and each tool's defaults, file conventions, and validation in its own skill.
- [ ] Add a representative repository fixture or equivalent file-level evidence that proves explicit activation is safe while an unrelated repository remains unaffected without either editor installed.
- [ ] Audit the new skill roots, record every excluded setting and its owner, and create a `ki-trades` submission only if the selected contract identifies receiver-owned `tools-ki` command work.

## Files touched

- The two selected tool-configuration skill roots and their scoped references, rubric material, and tests
- A fixture or equivalent file-level evidence that represents explicit activation without an installed editor
- This work item

No user-level editor configuration, machine-local state, portable `ki-repo` metadata, or `tools-ki` implementation changes are in scope. A receiver-owned `tools-ki` record may be submitted only after this item identifies a necessary host change; it remains outside this item's implementation.

## Verify

- Each retained or excluded reference setting has an explicit tracked-file, owner, portability, and evidence classification.
- A repository that activates either skill receives only the declared project-local configuration; one that does not activate it receives no editor-specific requirement.
- The fixture parses the selected configuration format and proves repeated application is preserving and idempotent without either editor installed.
- The selected native, file-level, and skill checks are named before implementation; `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

`tools-ki` configuration is evidence, not a dependency that grants copying authority. The immediate blocker is the unresolved selection of exact safe defaults, tracked-file ownership, names, formatter/extension treatment, and verification fixture. Do not mark this item Ready until those choices are recorded and reviewable.

No durable delegation packet is appropriate while this record remains Draft: no implementation is approved and no worker has authority to select the unresolved policy. A later Ready item may add a packet only if its selected implementation needs a durable high-risk hand-off.

## Documentation impact

### Decision Records

No new decision record is needed until the proposed editor-skill boundary is selected; this record preserves that choice rather than deciding it implicitly.

### Specifications

No behaviour-level product contract changes; any future editor configuration remains a tool-specific concern.

### Guides

If promoted, the selected project-local configuration needs concise contributor guidance, including the opt-in boundary and excluded user-level preferences. Any host command is documented by `tools-ki` only after its owner accepts a separate work item.

### Roadmap

The locked tool-policy decision remains in this record. Any receiver-owned `tools-ki` command work is a separately coded trade and roadmap item, not a hidden dependency.

## Discussion

### Source evidence

Current [VS Code workspace-settings documentation](https://code.visualstudio.com/docs/configure/settings) confirms that project settings live under the workspace and may be language-specific. Current [Zed settings documentation](https://zed.dev/docs/reference/all-settings) confirms its project keys and that `.editorconfig` overrides line-ending settings, while [Zed's Biome documentation](https://zed.dev/docs/languages/biome) identifies Biome support as a community-maintained extension. These sources support the ownership questions; they do not select the KI defaults.

### Optional adoption

Project-local tool configuration is useful only when a repository chooses the corresponding tool. The inclusion boundary keeps the defaults discoverable and repeatable for adopters while preserving a neutral harness for repositories that use another editor or no editor-specific configuration.

### Tool-workspace boundary

VS Code and Zed configuration can express a project view, but it must remain a consumer of the repository's declared structure. Canonical repository identity, portable metadata, user preferences, and machine paths remain outside these skills.
