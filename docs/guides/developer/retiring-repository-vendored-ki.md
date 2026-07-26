# Retire repository-vendored KI

Use this maintainer guide to move one existing Knowledge Islands repository from its generated `.ki/` executor to verified installed-harness and native `ki` operations.

This is deliberately a guide, not a `ki` migration command.

The remaining repositories are private, known, and can be reviewed individually; a broad automatic remover would have a larger failure surface than the migration itself.

Do not use this guide to recreate `.ki/`, to make a native command fall back to a wrapper, or to delete unfamiliar state.

## Preconditions

Complete these checks before changing the repository:

1. `ki bootstrap` has installed the canonical harness and the repository's `.ki-config.toml` declares the skills that native maintenance must select.
2. `ki repo educate --repo .`, `ki repo audit --repo .`, and `ki repo conform --repo . --dry-run` resolve the repository through the installed or explicit development canonical harness.
3. Every audit failure is either conformed safely or explicitly understood; a failing native audit is not proof that `.ki/` can be removed.
4. The repository has a role map for every `.ki/` consumer: aggregate commands, package scripts, CI, pre-commit, bootstrap fixtures, guide suites, and generated manifests.
5. No declared native rubric still reads, writes, validates, or restores `.ki/` state. In particular, `ki-engineering` must use the native current-state command model before its old aliases are removed.
6. The working tree is clean apart from the deliberate migration change, and the legacy footprint is wholly recognised generated state.

Stop if any condition is false.

Record the blocker in the repository's plan rather than adding a compatibility wrapper or deleting only the convenient portion of `.ki/`.

## Map the old roles

Use these replacements only once the preconditions hold:

| Legacy role | Native or retained role |
| --- | --- |
| `.ki/bin` aggregate audit | `ki repo audit --repo .` |
| `.ki/bin` aggregate conform | `ki repo conform --repo .` |
| Aggregate education about declared rubrics | `ki repo educate --repo .` |
| Per-skill package alias | The corresponding `ki repo` command with `--skill`, including declared dependencies |
| CI governance gate | Install verified `ki`, then run `ki repo audit --repo .` |
| Pre-commit staged snapshot | Native repository audit against the prepared snapshot, after its staged-snapshot semantics have a dedicated proof |
| Graph, HELP generation, guide suite, or harness build fixture | Retain or rehome as a development/build concern; it is not repository-maintenance execution |

`ki repo educate` renders a declared rubric catalogue.

It does not replace the old bootstrap/scaffolding operation; decide each remaining bootstrap fixture deliberately rather than relabelling it as education.

## Preserve a comparison baseline

Before a substantial clean-end-state cutover, record the known-good commit so the before and after states remain directly comparable.

Git history is normally sufficient; a release tag is useful when the comparison should be shared or revisited easily, not a requirement for every change.

```sh
git rev-parse HEAD
git tag -a pre-native-cli-cutover -m "Baseline before native CLI cutover"
git push origin pre-native-cli-cutover # Only when the tag should be shared.
```

Compare the baseline with the current branch locally:

```sh
git diff --stat pre-native-cli-cutover..HEAD
git diff pre-native-cli-cutover..HEAD
git log --oneline pre-native-cli-cutover..HEAD
```

After pushing the tag, GitHub provides the same visual comparison at:

```text
https://github.com/<owner>/<repository>/compare/pre-native-cli-cutover...main
```

Use the recorded commit SHA in place of the tag when no tag was created.

## Retire one repository

1. Create one migration commit boundary and preserve a before-state inventory:

   ```sh
   git status --short
   find .ki -type f -o -type l
   ki repo educate --repo .
   ki repo audit --repo .
   ki repo conform --repo . --dry-run
   ```

2. Replace package scripts, CI, and pre-commit one role at a time with the mapped native command.

   Run the focused replacement in the same commit and keep build-only helpers separate from governed maintenance.

3. Re-run native audit and dry-run conform after each role migration.

   Do not use the legacy runner as a fallback or as acceptance evidence.

4. Remove only the now-unreferenced, recognised generated files by explicit path.

   Do not use a broad recursive deletion.

   Retain the committed `.agents/skills/ki-self/` source and its derived Claude projection; it is not collateral cleanup.

5. Run the repository's full test suite, the native audit, and the native dry-run conform.

   Commit each independently verified role migration, then make the final legacy-footprint deletion a separate commit.

## Stop conditions

Leave the legacy footprint in place and record the blocker when any of these occur:

- A native command cannot resolve a declared skill from the canonical harness.
- A native audit reports an unresolved failure or conform proposes a write outside its declared scope.
- A legacy file is modified, unfamiliar, linked, partial, or not covered by the role map.
- CI or pre-commit needs behaviour not yet proven through the native host.
- A native rubric still depends on `.ki/` paths or transitional vendored execution code.

The correct recovery is a focused native-contract or build-role change, followed by another guide pass.

It is never an automatic migration command or a restored vendored runner.
