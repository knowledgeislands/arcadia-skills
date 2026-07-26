---
name: ki-bootstrap
description: >
  Explains first-time Knowledge Islands activation through the `ki` CLI: bootstrap a user, select a verified canonical harness, and distinguish user skills from repository-declared governance. Use for guidance on `ki bootstrap`, `ki harness`, `ki skill user`, and `ki skill repo`; the CLI itself owns all mechanics. Triggers: "set up KI", "what does ki bootstrap do", "activate a KI skill", "why won't ki repo audit run". For repository coverage use `ki-repo`; for command behaviour use `ki help`.
argument-hint: 'help | refresh'
---

# Knowledge Islands Bootstrap

`ki-bootstrap` governs the transition to installed compatible harnesses and native repository operations.

Its normative contract is [ADR-KI-HARNESS-012](../../../docs/decisions/ADR-KI-HARNESS-012-compatible-harness-publication-and-governed-rubric-boundary.md) and [the bootstrap standard](references/standards.md).

## Current delivery status

The target surface belongs to `tools-ki` and is not yet implemented.

Do not present `ki harness install`, `ki repo skill add`, `ki user skill add`, `ki repo audit`, `ki repo conform`, or repository migration as working commands until a released `ki` version provides them.

The existing bootstrap engine, `.ki/bootstrap/`, `.ki/bin/`, manifests, and source-owned lifecycle scripts are legacy implementation material.

They are useful for inventorying and testing a migration, but are not a supported repository executor and must never become a fallback when a verified harness or an operation is unavailable.

## The compatible-harness model

Knowledge Islands has a verified XDG-managed set of compatible harnesses for a user. The canonical `knowledgeislands/ki-agentic-harness` is always included; additional compatible harnesses are registered explicitly.

The normal XDG defaults apply when a variable is unset: `~/.local/share`, `~/.config`, `~/.cache`, and `~/.local/state` for data, configuration, cache, and mutable state respectively.

There is no KI-specific home variable.

The installed `ki` release acquires or atomically replaces a selected harness from immutable release evidence it verifies.

Verified installed harnesses are authoritative for capability discovery and operation resolution; a harness checkout, a nearby source tree, and repository-local copies are not alternative sources.

## Repository coverage and native operations

`.ki-config.toml` remains the declarative repository contract.

Its explicit `[ki-<skill>]` roots select the skills whose native operations may run; `ki-repo` owns which roots are appropriate and the file-level configuration contract.

`ki` is the operation host.

Each governance skill registers compatible in-process metadata and mechanical AUDIT/CONFORM implementations, and native repository maintenance will resolve the physically selected repository, read its declarations, validate explicit dependencies, and run the registered operations in dependency order through one shared finding and reporting model.

Missing, incompatible, undeclared, or untrusted skills must fail before an operation writes.

Native execution never shells out to legacy `govern.ts` scripts, `.ki/bin` wrappers, a harness checkout, or any ad-hoc child-process substitute.

## Explicit runtime activation

Installing a harness does not activate every capability globally.

The planned `ki repo skill add <skill>` and `ki user skill add <skill>` operations activate one installed skill explicitly:

- Repository scope updates only the selected repository's declaration and creates only its managed runtime-discovery links.
- User scope creates only the managed links in the selected user runtime.

Runtime activation is explicit, runtime-aware, idempotent, and managed.

It requires ownership markers and containment checks, supports dry-run, and refuses altered or unfamiliar material rather than replacing or deleting it.

It keeps user and repository state separate: a repository operation does not alter user activation, and a user operation does not alter repository coverage.

## Legacy migration boundary

Repository vendoring has ended.

An existing `.ki/` runner or manifest is migration input only, inspected through the maintainer [retirement guide](../../../docs/guides/developer/retiring-repository-vendored-ki.md).

Migration must prove complete ownership before removing any generated legacy state; altered, partial, unfamiliar, linked, or concurrently changed material is preserved and reported as a fail-closed blocker.

The migration does not execute legacy runners, does not silently remove state, and does not infer that a verified installed harness is available.

Until the guide's preconditions are met, retain legacy state for assessment rather than manually deleting it or trying to recreate it from a checkout.

## Operating modes

### Mode AUDIT — assess the declared native contract

Read `.ki-config.toml`, the available installed harnesses, and runtime activation ownership as separate facts.

Once released, native `ki repo audit` is the mechanical repository audit.

Before then, this skill's existing checker may assess the legacy bootstrap material as migration evidence, but its result is not proof that a repository has native governance.

Route coverage questions to `ki-repo`; route command availability to the installed `ki` release.

### Mode CONFORM — prepare safe activation

First identify the selected repository or user scope and the intended runtime.

When the native surface is available, use its explicit activation and repository-conform operations only after verifying harness integrity and declared coverage.

Do not repair native absence by creating `.ki/bin` wrappers, copying checker scripts, or linking to a harness checkout.

Re-audit after any safe mechanical change.

### Mode EDUCATE — establish the target model

Explain compatible harnesses, explicit activation, declarative coverage, and native operation boundaries.

For a clean user, the eventual sequence is: install verified harnesses, explicitly activate only needed skills, declare repository coverage, then invoke native repository operations.

This is a contract description, not an instruction to run unreleased commands.

### Mode HELP — explain the boundary

Invoked as `help` / `-h` / `?`, explain this skill's current delivery status, target contract, and off-ramps, then stop without changing files.

With no mode in an interactive session, explain the same boundary before offering the available modes.

### Mode REFRESH — re-anchor the contract

**Precondition:** REFRESH writes only this skill's canonical files in `ki-agentic-harness`.

When invoked from a vendored repository, stop and redirect to the harness; for a recurring cross-base pattern, route it through `ki-kb`'s IMPROVE mode.

Refresh this skill when the native registry, XDG collection layout, activation semantics, migration safety rules, or `tools-ki` delivery status changes.

Read ADR-KI-HARNESS-012, [the CLI guide](../../../docs/guides/user/command-line-interface.md), and the bootstrap standard before proposing changes.

## Composition

- `ki-repo` owns `.ki-config.toml` coverage and configuration semantics; this skill does not choose a repository's declared skills.
- `ki-tokenomics` owns the standing-cost rationale for selective runtime activation.
- `tools-ki` owns native CLI implementation, release evidence, command grammar, registry loading, reporting, activation, and migration execution.

## Safety boundary

Never conflate a checked-out harness, installed harnesses, repository declarations, or runtime discovery links.

Each has different ownership and trust evidence.

When evidence is incomplete, fail closed, make no broad cleanup, and name the missing harness, declaration, ownership proof, or implementation rather than inventing a compatibility path.
