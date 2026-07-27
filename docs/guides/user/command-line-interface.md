# Command Line Interface

`ki` is the end-user Knowledge Islands command-line interface. It installs compatible harnesses, activates their skills in explicit scopes, and hosts native repository operations.

## Current command groups

```text
ki bootstrap [--refresh]
ki completions <bash|zsh>
ki dev on <path>
ki dev off
ki diag
ki doctor
ki harness install <harness-id>
ki harness uninstall <harness-id>
ki harness list
ki harness info <harness-id>
ki skill user add <skill>
ki skill user remove <skill>
ki skill repo add <skill> [--repo <path>]
ki skill repo remove <skill> [--repo <path>]
ki skill rubric <skill> [--write]
ki repo educate [--repo <path>] [--skill <skill>]
ki repo audit [--repo <path>] [--skill <skill>]
ki repo conform [--repo <path>] [--skill <skill>] [--dry-run]
ki acquire chatgpt import <capture-directory> --output <kep-directory> [--dry-run] [--json]
ki version
```

`ki`, `ki help`, and `ki --help` render root help. `-h` aliases `--help`; `-V` aliases `--version`. `ki completions` writes Bash or Zsh completion source to standard output.

## Bootstrap and diagnostics

`ki bootstrap` detects supported local agent runtimes, creates the KI configuration if absent, installs the verified canonical harness, and activates the core user skills. It does not declare repository governance.

`ki bootstrap --refresh` redetects agents and reconciles the recorded harness and managed user-skill inventory with installed state.

`ki diag` reports the invoked executable, installation mode, paths, and configuration. `ki doctor` checks configuration, agents, harnesses, and user skills, then gives recovery guidance for failures.

## Harness installation

The `ki harness` group manages the verified installed compatible-harness set:

```text
ki harness install <harness-id>
ki harness uninstall <harness-id>
ki harness list
ki harness info <harness-id>
```

A harness identifier is a qualified name such as `knowledgeislands/ki-agentic-harness` or `hnr/hnr-harness`.

The canonical `knowledgeislands/ki-agentic-harness` is installed by `ki bootstrap` and cannot be uninstalled. Additional harnesses make registered capabilities available for explicit activation; installation does not activate every skill.

`ki harness list` shows installed identities and capability counts. `ki harness info <harness-id>` shows one installed record.

## Skill activation

The skill commands make activation scope explicit:

```text
ki skill user add <skill>
ki skill user remove <skill>
ki skill repo add <skill> [--repo <path>]
ki skill repo remove <skill> [--repo <path>]
```

A fully qualified skill name is `<harness-id>:<skill-name>`:

```text
ki skill repo add knowledgeislands/ki-agentic-harness:ki-roadmap
ki skill user add hnr/hnr-harness:hnr-engineering
```

`<skill-name>` is the exact `name:` in the installed skill's `SKILL.md`. A bare name is accepted only when exactly one installed harness provides it.

- `ki skill user add` creates managed discovery links in configured user agent spaces and records the selected provider.
- `ki skill user remove` removes only KI-managed user links and the corresponding configuration.
- `ki skill repo add` updates the selected repository's `.ki-config.toml` and creates managed repository-runtime links.
- `ki skill repo remove` removes only the selected declaration and KI-managed repository links; it does not uninstall a harness or change user activation.

Every activation requires a valid installed provider. An unavailable or ambiguous skill fails with recovery guidance instead of downloading or replacing a harness automatically.

## Repository operations

Each `ki repo` command accepts `--repo <path>`. With that option, the path must resolve physically to a Git worktree root containing a regular `.ki-config.toml`. Without it, `ki` selects the nearest qualifying ancestor of the physical current directory.

```text
ki repo educate [--repo <path>] [--skill <skill>]
ki repo audit [--repo <path>] [--skill <skill>]
ki repo conform [--repo <path>] [--skill <skill>] [--dry-run]
```

- `ki repo educate` renders maintenance guidance for the declared rubrics.
- `ki repo audit` runs the registered read-only operations for declared skills.
- `ki repo conform` applies registered safe mechanical changes; `--dry-run` validates and reports without writing.
- `--skill <skill>` narrows the operation to one declared resolved capability.

The host resolves operations only from verified installed harnesses. It does not execute repository-local wrappers, copied rubric runners, package aliases, or arbitrary skill scripts.

`bun run test` remains this harness's maintainer self-test; the public contract deliberately defines no `ki repo test` leaf.

## Rubric publication

`ki skill rubric <skill>` verifies that the generated `references/rubric.md` publication agrees with the installed skill's structured catalogue. `--write` refreshes that publication in the selected development source when the command's ownership checks permit it. The `ki-skills` exemplar also reports missing or stale publication as `KI-CHECKER-6` through `ki repo audit --skill ki-skills`; `ki repo conform --skill ki-skills` schedules the same guarded derived write.

## Local harness development

Harness contributors can select a validated local canonical checkout explicitly:

```text
ki dev on <path>
ki dev off
```

`ki dev on` replaces the installed canonical payload with managed links to the checkout and refreshes configured user skills. `ki dev off` restores the verified canonical archive. Nearby checkouts are never implicit operation sources.

## Acquisition

```text
ki acquire chatgpt import <capture-directory> --output <kep-directory> [--dry-run] [--json]
```

The command imports only locally user-provided capture material into a deterministic Knowledge Export Package. It does not control a browser, contact ChatGPT, read credentials or browser profiles, discover a repository, extract reusable knowledge, or govern Knowledge Base ingress.

## Installation and XDG locations

Install the released CLI with:

```bash
brew install knowledgeislands/tap/ki
```

KI data, configuration, cache, and state use `KI_DATA_HOME`, `KI_CONFIG_HOME`, `KI_CACHE_HOME`, and `KI_STATE_HOME` when set, then the corresponding XDG location, then the standard home-directory default. Installed harnesses live beneath the resolved data directory.

## Planned commands

The following names are design candidates, not current executable commands:

```text
ki missing
ki outdated
ki install <capability>
ki reinstall <capability>
ki uninstall <capability>
ki update
ki upgrade
ki list
ki search
ki cleanup
ki docs
```

Use `ki help` and shell completion as the authority for the delivered grammar.

## Errors and recovery

Help, version, completion, and normal reports use standard output. Grammar errors use standard error, exit `2`, and name the nearest help path.

Commands refuse unknown options, ambiguous capabilities, unsafe paths, and unfamiliar managed state. Follow the named recovery route rather than manually replacing or deleting KI-managed files.
