---
id: KI-HARNESS-FND-009
title: Add tool configuration skills
area: FND
theme: foundation-tooling
horizon: soon
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

`tools-ki` is the initial implementation reference, not an authority to copy wholesale. The skills must remain compatible with the established tool-workspace boundary: project-local configuration may compose repositories and declared stores, but it must not redefine canonical repository identity, stores, or local-user configuration.

### Decisions still needed

Confirm the initial default set and the exact tracked files for each tool, including whether every proposed default is safe across KI repositories. Decide the skill names and placement after reviewing the reference implementation and the current skill taxonomy.

### Promotion conditions

Promote when each tool's project-local contract, safe defaults, ownership boundary, and activation path are reviewable; the two skills have a clear shared-versus-tool-specific split; and a representative repository can validate their configuration without requiring either tool to be installed for unrelated work.

## Discussion

### Optional adoption

Project-local tool configuration is useful only when a repository chooses the corresponding tool. The inclusion boundary keeps the defaults discoverable and repeatable for adopters while preserving a neutral harness for repositories that use another editor or no editor-specific configuration.

### Tool-workspace boundary

VS Code and Zed configuration can express a project view, but it must remain a consumer of the repository's declared structure. Canonical repository identity, portable metadata, user preferences, and machine paths remain outside these skills.
