---
name: ki-bootstrap
ki-depends-on: []
description: >
  Explains first-time Knowledge Islands activation through the `ki` CLI: bootstrap a user, select a verified canonical harness, and distinguish user skills from repository-declared governance. Use for guidance on `ki bootstrap`, `ki harness`, `ki skill user`, and `ki skill repo`; the CLI itself owns all mechanics. Triggers: "set up KI", "what does ki bootstrap do", "activate a KI skill", "why won't ki repo audit run". For repository coverage use `ki-repo`; for command behaviour use `ki help`.
argument-hint: 'help | refresh'
---

# Knowledge Islands Bootstrap

The `ki` CLI owns installation, activation, and repository operations. This skill explains that command surface; it does not contain an alternative executor.

## First-time user setup

Run `ki bootstrap`.

KI detects supported local agent runtimes, creates `~/.config/ki/config.toml` if absent, installs the canonical `knowledgeislands/ki-agentic-harness`, and links the core user skills into each detected agent's user skill directory.

Run `ki bootstrap --refresh` to redetect agents and reconcile the recorded harnesses and user-level skills without overwriting an existing configuration.

The user configuration and installed harness payloads are separate from a repository's `.ki-config.toml`.

## Harnesses and skills

`ki harness list`, `ki harness info <id>`, `ki harness install <id>`, and `ki harness uninstall <id>` manage compatible installed harnesses. The canonical harness is always retained.

`ki skill user add <skill>` and `ki skill user remove <skill>` manage a skill in configured user agent spaces.

`ki skill repo add <skill>` and `ki skill repo remove <skill>` manage a skill's repository declaration and runtime link. They affect only the selected repository; they never alter user activation.

## Repository operations

`.ki-config.toml` declares the skills that govern a repository. `ki repo educate`, `ki repo audit`, and `ki repo conform` resolve only those declarations and their explicit dependencies from installed harnesses.

Missing, incompatible, undeclared, or ambiguous skills fail before an audit or conform operation runs. The CLI executes native rubric catalogues; it never uses repository-vendored runners or `.ki/bin` wrappers.

## Boundaries

An installed harness is the authoritative source of capabilities. A nearby checkout is used only through `ki dev on <path>` during development; `ki dev off` restores the installed canonical payload.

Do not create `.ki` wrappers or copy scripts into repositories. If a repository still carries one, follow the maintainer [retirement guide](../../../docs/guides/developer/retiring-repository-vendored-ki.md).

For command grammar, run `ki help`. For repository coverage, use `ki-repo`.
