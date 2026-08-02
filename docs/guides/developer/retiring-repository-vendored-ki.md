# Retire repository-vendored KI

Use this repository-local maintainer guide to move one existing Knowledge Islands repository from a generated `.ki/` or `.ki-meta/` executor and copied runtime skills to verified installed-harness, managed discovery links, and native `ki` operations.

This is deliberately a guide, not a `ki` migration command.

The remaining repositories are maintainer-controlled, known, and can be reviewed individually; a broad automatic remover would have a larger failure surface than the migration itself.

Do not use this guide to recreate a repository executor, to make a native command fall back to a wrapper, or to delete unfamiliar state.

## Preconditions

Complete these checks before changing the repository:

1. `ki bootstrap` has installed the canonical harness and the repository's `.ki-config.toml` declares the skills that native maintenance must select.
2. `ki repo educate --repo .`, `ki repo audit --repo .`, and `ki repo conform --repo . --dry-run` resolve the repository through the installed or explicit development canonical harness.
3. Every audit failure is either conformed safely or explicitly classified as a repository-content finding; a failing native audit is not proof that legacy state can be removed.
4. The repository has a role map for every `.ki/` or `.ki-meta/` consumer: aggregate commands, package scripts, CI, pre-commit, bootstrap fixtures, guide suites, generated manifests, and runtime skill copies.
5. No declared native rubric still reads, writes, validates, or restores the repository executor. In particular, `ki-engineering` must use the native current-state command model before its old aliases are removed.
6. The working tree is clean apart from the deliberate migration change, and the legacy footprint is wholly recognised generated state.
7. `["knowledgeislands/ki-agentic-harness:ki-repo"].supported_runtimes` honestly names the runtimes whose repository discovery locations will be reconciled.

Stop if any condition is false.

Record the blocker in the repository's plan rather than adding a compatibility wrapper or deleting only the convenient portion of `.ki/`.

## Align declared capability names

Before interpreting an unresolved-skill error as an installation problem, compare `.ki-config.toml` with the current harness capability names.

The clean-end-state renames used by the current harness are:

| Retired declaration     | Current declaration     |
| ----------------------- | ----------------------- |
| `ki-repo-roadmap`       | `ki-roadmap`            |
| `ki-11ty-websites`      | `ki-website`            |
| `ki-cloudflare-hosting` | `ki-website-cloudflare` |

When the existing runtime entries are already managed links, remove the retired declaration and add the current capability through the CLI so both the configuration and links converge:

```sh
ki skill repo remove <retired-skill> --repo .
ki skill repo add <current-skill> --repo .
```

The current CLI deliberately refuses to overwrite a regular runtime skill directory. When the old entry is a generated copy, first rename and review the configuration table, then prove and remove the copy through [the runtime-copy procedure](#replace-copied-runtime-skills). Run `ki skill repo add <current-skill> --repo .` only after the destination is absent.

When an existing managed link merely points at a different compatible harness source, use `--replace` to re-point it without discarding configuration.

Re-run `ki repo audit --repo .` immediately. Do not retain both names or add an alias: an unavailable declaration is migration work, not a compatibility requirement.

## Map the old roles

Use these replacements only once the preconditions hold:

| Legacy role                          | Native or retained role                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `.ki/bin` or `.ki-meta/bin` audit    | `ki repo audit --repo .`                                                                              |
| Aggregate conform                    | `ki repo conform --repo .`                                                                            |
| Aggregate rubric education           | `ki repo educate --repo .`                                                                            |
| Per-skill package alias              | The corresponding `ki repo` command with `--skill`, including declared dependencies                   |
| CI governance gate                   | Install verified `ki`, then run `ki repo audit --repo .`                                              |
| Pre-commit staged snapshot           | Native repository audit against the prepared snapshot, after its staged-snapshot semantics are proven |
| Graph, HELP, guide, or build fixture | Retain or rehome as a development/build concern; it is not repository-maintenance execution           |

`ki repo educate` renders a declared rubric catalogue.

It does not replace the old bootstrap/scaffolding operation; decide each remaining bootstrap fixture deliberately rather than relabelling it as education.

## Preserve a comparison baseline

The governed plan records the full known-good commit ID in `baseline-ref` when execution starts, so the before and after states remain directly comparable.

Resolve the immutable baseline directly:

```sh
git rev-parse HEAD
```

Compare the baseline with the current branch locally:

```sh
git diff --stat <baseline-ref>..HEAD
git diff <baseline-ref>..HEAD
git log --oneline <baseline-ref>..HEAD
```

GitHub accepts the immutable commit ID in the same comparison URL:

```text
https://github.com/<owner>/<repository>/compare/<baseline-ref>...main
```

A tag or release may still provide a convenient shared name, but neither is part of the clean-end-state cutover requirement.

## Replace copied runtime skills

The current state is one managed symbolic link per declared skill in every supported repository runtime. A regular directory in `.agents/skills/` or `.claude/skills/` is foreign to the current CLI until its legacy generated ownership has been proved.

For each regular runtime skill directory:

1. Require the legacy generator marker `.ki-generated-runtime-skill.json` or `.ki-meta/generated-runtime-skill.json`.
2. Validate its schema, skill name, source identity, and SHA-256 integrity value.
3. Independently recompute the legacy generator's sorted tree digest, excluding only the marker itself, and require an exact match.
4. Stop if the tree contains an unexpected link, special entry, changed byte, missing marker, invalid marker, or mismatched digest.
5. Remove the complete verified directory by its exact path, never by a wildcard or runtime-root deletion.
6. Run `ki skill repo add <current-skill> --repo .` for every current declaration.
7. Confirm each resulting runtime entry is a non-broken link into the selected installed or explicit development harness.

The committed `.agents/skills/ki-self/` directory is the repository-local source, not a generated copy. Preserve it. Its `.claude/skills/ki-self` projection remains a link to that source.

## Retire one repository

1. Create one migration commit boundary and preserve a before-state inventory:

   ```sh
   git status --short
   git ls-files '.ki/**' '.ki-meta/**'
   find .agents/skills .claude/skills -mindepth 1 -maxdepth 1 -print
   ki repo educate --repo .
   ki repo audit --repo .
   ki repo conform --repo . --dry-run
   ```

2. Replace package scripts, CI, and pre-commit one role at a time with the mapped native command.

   Run the focused replacement in the same commit and keep build-only helpers separate from governed maintenance.

3. Re-run native audit and dry-run conform after each role migration.

   Do not use the legacy runner as a fallback or as acceptance evidence.

4. Remove only the now-unreferenced, recognised generated executor files by explicit path.

   Do not use a broad recursive deletion.

5. Apply [the runtime-copy procedure](#replace-copied-runtime-skills), then re-run native audit and dry-run conform.

6. Run the repository's full test suite, the native audit, and the native dry-run conform.

   Commit each independently verified role migration, then make the final legacy-footprint deletion a separate commit.

7. Require a clean final inventory:

   ```sh
   git ls-files '.ki/**' '.ki-meta/**'
   git status --short
   ki repo audit --repo .
   ```

   A non-zero audit is acceptable only when every finding is an explicitly recorded repository-content issue and the operation itself resolved and executed.

## Deferred boundaries

This procedure may replace a tracked CI invocation with `ki repo audit --repo .`, but it does not prove a clean hosted runner can install the pinned CLI and verified harness. Verify that separately in the fleet-CI work; do not retain a legacy executor merely to bridge the interval.

Do not rename or expand environment capabilities such as housekeeping, tokenomics, or binding during this cutover. Runtime- and vendor-specific environment coverage belongs to RTP-002.

## Stop conditions

Leave the legacy footprint in place and record the blocker when any of these occur:

- A native command cannot resolve a declared skill from the canonical harness.
- A native audit reports an unresolved failure or conform proposes a write outside its declared scope.
- A legacy executor file or runtime skill copy is modified, unfamiliar, partial, unmarked, integrity-mismatched, or not covered by the role map.
- CI or pre-commit needs behaviour not yet proven through the native host.
- A native rubric still depends on repository-local executor paths or transitional vendored execution code.

The correct recovery is a focused native-contract or build-role change, followed by another guide pass.

It is never an automatic migration command or a restored vendored runner.
