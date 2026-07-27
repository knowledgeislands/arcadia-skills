# Command Line Interface

`ki` is the end-user Knowledge Islands command-line interface (CLI). It gives a person one stable command for KI work while keeping user-environment actions and repository actions visibly separate.

## Command groups

`[current]` means the command is implemented and appears in `ki help` and completion output. A `*` prefix marks a planned command: it is not executable yet and may change before release.

### Interface and diagnostics

```text
[current] ki
[current] ki help <command>
[current] ki --help
[current] ki --version
[current] ki version
[current] ki completions <bash|zsh>
[current] ki doctor [--json]
[current] ki paths [--json]
*ki docs
```

### Acquisition

```text
[current] ki acquire chatgpt import <capture-directory> --output <kep-directory> [--dry-run] [--json]
```

### Harness and capability management

```text
*ki list
*ki harness install <harness-id>
*ki harness uninstall <harness-id>
*ki harness list
*ki harness info <harness-id>
*ki missing
*ki outdated
*ki install <capability>
*ki reinstall <capability>
*ki uninstall <capability>
*ki update
*ki upgrade
*ki search
*ki cleanup
```

### Scoped capability activation

```text
*ki repo skill add <skill>
*ki repo skill remove <skill>
*ki user skill add <skill>
*ki user skill remove <skill>
```

### Repository maintenance

```text
[current] ki repo audit [--repo <path>] [--skill <skill>]
[current] ki repo conform [--repo <path>] [--skill <skill>] [--dry-run]
```

`ki`, `ki help`, and `ki --help` render the same root HELP and exit successfully. `-h` aliases `--help`; `-V` aliases `--version`; `ki version` is equivalent to `ki --version` and prints exactly `ki X.Y.Z` followed by one newline. `ki completions` writes Bash or Zsh completion source to standard output.

`ki paths` prints the invoked executable path and resolved XDG data, configuration, cache, and state paths without creating them. `ki doctor` prints the CLI version, whether it is a regular executable or a development link, and those resolved paths. `--json` on either command emits a versioned machine-readable result; `ki doctor --json` also reports the resolved repository when one is found. They exit `0` and do not change repository state, network state, or child processes.

> [!NOTE] `ki doctor` establishes only the local CLI and XDG baseline. Harness health, capability activation, and repository diagnostics are planned work.

## General commands [planned]

The following target commands do not yet appear in `ki help` or completion output, and use the `*` prefix in the `ki(1)` command map:

```text
*ki missing
*ki outdated
*ki install <capability>
*ki reinstall <capability>
*ki uninstall <capability>
*ki update
*ki upgrade
*ki list
*ki search
*ki cleanup
*ki docs
```

`ki list` will list installed harnesses and their capabilities, including user activation and, when the current working directory resolves to a KI repository, repository activation. Its status is therefore grounded in the invocation directory. Filtering and alternative output forms are later work.

`ki missing` will report declared capabilities that are absent from their selected activation scope. `ki outdated` will report installed harnesses or activated capabilities with a newer available latest release. `ki install`, `ki reinstall`, and `ki uninstall` are the future package-management forms for a named capability; their exact relationship to the explicit `ki repo skill add/remove` and `ki user skill add/remove` commands remains to be settled before implementation.

`ki update` will update the `ki` executable and refresh installed harnesses to their newest verified latest releases. `ki upgrade` will apply available newer capability releases to the resolved repository context, without changing unrelated user or repository activation. Neither command exists in the seed release.

## Harness installation

The `ki harness` group manages the verified, user-installed set of KI-compatible harnesses:

```text
ki harness install <harness-id>
ki harness uninstall <harness-id>
ki harness list
ki harness info <harness-id>
```

A harness identifier is a stable, qualified name such as `knowledgeislands/ki-agentic-harness` or `hnr/hnr-harness`. `ki harness install` resolves it through configured immutable release evidence, verifies the archive, and installs its direct payload at `$KI_DATA_HOME/harnesses/<owner>/<repository>`. It never accepts a floating branch, arbitrary URL, local path, or nearby checkout as a substitute.

`knowledgeislands/ki-agentic-harness` is the mandatory base harness. `ki` ensures it is installed, and refuses to uninstall it. Additional harnesses make their registered skills available for explicit activation; installing a harness does not activate every skill in it.

`ki harness list` is the focused harness inventory: installed identity and capability counts. `ki harness info <harness-id>` presents the corresponding record for one harness. There is no user-selectable harness or capability version yet.

## Skill activation

The skill commands make the activation scope explicit:

```text
ki skill repo add <skill>
ki skill repo remove <skill>
ki skill user add <skill>
ki skill user remove <skill>
```

A fully qualified skill name is `<harness-id>:<skill-name>`:

```text
ki skill repo add knowledgeislands/ki-agentic-harness:ki-roadmap
ki skill user add hnr/hnr-harness:hnr-engineering
```

`<skill-name>` is the exact `name:` in the installed skill's `SKILL.md`. A bare skill name is accepted only when exactly one installed harness provides it; `ki` stores the resolved qualified name in repository configuration and refuses an ambiguous name.

- `ki skill repo add` updates the selected repository's `.ki-config.toml` and creates only managed project-runtime discovery links.
- `ki skill repo remove` removes that repository declaration and its owned project-runtime links; it does not uninstall the harness or remove user activation.
- `ki skill user add` creates only managed discovery links in the selected user runtime.
- `ki skill user remove` removes only those owned user-runtime links.

Every activation first requires a valid installed harness and a registered matching skill. It fails with recovery guidance instead of downloading or replacing a harness automatically.

Current activation uses managed links to verified installed harness sources. It does not permit the retired `.ki/bin` executor or an arbitrary checkout to become an operation source.

## Repository maintenance commands

Each `ki repo` command accepts `--repo <path>`. With that option, `<path>` must resolve physically to the repository base and directly contain a regular `.ki-config.toml`; `ki` does not search its ancestors. Without it, `ki` resolves the physical current working directory and then each ancestor, selecting the nearest directory that directly contains a regular `.ki-config.toml` and is the Git worktree root. It never treats the user's home directory or filesystem root as a repository candidate.

The available repository-maintenance forms are:

```text
ki repo audit [--repo <path>]
ki repo conform [--repo <path>]
ki repo audit --skill <skill> [--repo <path>]
```

- `ki repo audit` resolves the selected repository, reads its `.ki-config.toml`, and runs the native audit operations registered by its declared skills.
- `ki repo conform` uses the same declared-skill resolution and applies only each registered operation's safe mechanical changes.
- `ki repo audit --skill <skill>` runs one declared skill's scoped audit.
- `bun run test` remains a maintainer self-test; the public contract deliberately defines no `ki repo test` leaf.

These commands do not execute vendored `.ki/bin` wrappers or arbitrary skill scripts. They resolve only the selected repository's declared capabilities from verified installed harnesses.

## Acquisition commands

```text
ki acquire chatgpt import <capture-directory> --output <kep-directory> [--dry-run] [--json]
```

The command imports only locally user-provided capture material into a deterministic Knowledge Export Package (KEP). It does not control a browser, contact ChatGPT, read credentials or browser profiles, discover a repository, extract reusable knowledge, or govern Knowledge Base ingress.

## Installation

The installer places the executable in a user command directory. Its default is `~/.local/bin`; set `KI_CLI_INSTALL_DIR` to choose another directory. `KI_CLI_VERSION` selects a tagged release instead of the installer's default stable version.

The installer verifies the selected payload before an atomic replacement. It installs the executable under the selected command directory and `ki(1)` under `$KI_MAN_INSTALL_DIR` or the corresponding sibling `share/man/man1` directory. If the command directory is not on `PATH`, it names the installed path and gives the exact directory to add; it does not edit shell profiles or environment configuration.

## XDG locations

Each KI path uses the first non-empty value: `KI_DATA_HOME`, then `$XDG_DATA_HOME/ki`, then `~/.local/share/ki`; the same pattern applies to `KI_CONFIG_HOME`, `KI_CACHE_HOME`, and `KI_STATE_HOME`. The user configuration is `$KI_CONFIG_HOME/config.toml`; installed harnesses live beneath `$KI_DATA_HOME/harnesses/`.

## Help, diagnostics, and recovery

Help, version, and completion are CLI-owned output and use standard output. Grammar errors use standard error, exit `2`, and name the nearest help path:

```text
ki: error: <specific problem>
ki: try 'ki help <nearest-command-path>'
```

No command abbreviation or unknown option is accepted. Options belong to the command that owns them; no ambient lifecycle options exist.

When a command needs recovery, its own help states the route. Installation recovery is adding the named command directory to `PATH`.
