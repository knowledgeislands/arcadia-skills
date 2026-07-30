# Knowledge Islands tool-repository standard

The full, quotable standard behind the `ki-tools` skill. A `tools-*` repo holds **one** standalone command-line tool, distributed by a `curl | bash` installer and a companion Homebrew tap formula. This document governs the **container** and shared public interface conventions language-agnostically. The reference implementations are `tools-mgit` (Bash) and `tools-ki` (TypeScript/Bun). The line-by-line audit items are in [rubric.md](rubric.md); the tracked external specs and in-house references are in [sources.md](sources.md).

## Contents

- [Scope: container, not contents](#scope-container-not-contents)
- [Repository layout](#repository-layout)
- [The executable — `bin/<tool>`](#the-executable--bintool)
- [Versioning & releases](#versioning--releases)
- [The distribution contract](#the-distribution-contract)
- [Capability conditionals](#capability-conditionals)
- [Shared CLI conventions](#shared-cli-conventions)
- [Manual authoring](#manual-authoring)
- [The qualified `ki-tools` marker](#the-qualified-ki-tools-marker)
- [What other skills own](#what-other-skills-own)

## Scope: container, not contents

This standard judges the **container** (the repo's shape) and a small shared public interface — it does **not** judge the quality of tool-specific operations. A shell tool must be shellcheck-clean and carry a bats suite; this standard checks those are **wired into CI**, not what they report. Whether a tool's own operations are correct, well-factored, or fast is its author's concern.

Applicability is declaration or structure: `["knowledgeislands/ki-agentic-harness:ki-tools"]` in `.ki-config.toml` or a root `bin/` directory activates the complete audit. With neither, `ki repo audit --skill ki-tools` reports one `NA` and stops. A declared repository without `bin/` and an undeclared repository with `bin/` remain applicable; the former fails the executable-container requirement and the latter is audited for the missing declaration.

One tool per repo. A repo that would ship two distinct tools is two repos.

## Repository layout

```text
tools-<name>/
├── bin/<name>              # THE executable — required, chmod +x.
├── install.sh              # curl installer (the `curl | bash` contract). Expected.
├── tests/ or src/tests/    # executable test suite (a *.bats suite under tests/ for a shell tool). Expected.
├── .github/workflows/*.yml # CI: lint + test on every push. Expected.
├── man/<name>.1            # Optional manual source; when present, mandoc runs in CI.
├── CHANGELOG.md            # semver release history or current-release baseline. Expected.
├── README.md · LICENSE     # ki-repo's job.
└── .ki-config.toml         # qualified ki-repo + ki-tools declarations.
```

- **`bin/` with ≥1 executable file is the only hard requirement** — its absence is a FAIL, since without it there is no tool. Everything else is expected-but-optional (WARN when absent): a repo can be mid-scaffold.
- The **primary** bin file is the one whose name matches the repo's `<name>` (a `tools-mgit` repo → `bin/mgit`); the capability checks read its shebang.

## The executable — `bin/<tool>`

- Lives at `bin/<tool>` and carries the **executable bit**. Git tracks the exec bit, so `chmod +x bin/<tool>` is committed once and travels with the repo — a bin file without it is a FAIL (the curl installer and Homebrew formula both rely on it).
- Answers `--version` (and `-V` where the CLI convention allows), printing the tool name and version. The checker invokes the physical primary executable directly with `--version`, a five-second timeout, and a minimal environment; this is the machine-checkable contract behind the version marker below.
- Follows the XDG Base Directory spec for any config/state/cache it writes (`$XDG_CONFIG_HOME`, `$XDG_STATE_HOME`, `$XDG_CACHE_HOME` with the documented `$HOME`-relative fallbacks) rather than scattering dotfiles in `$HOME`.

## Versioning & releases

- The tool carries a **version marker** — for example `MGIT_VERSION=0.1.0` in a shell entrypoint or the package metadata of a TS/Bun tool — that `--version` prints. One source of truth; no second copy to drift.
- Releases are **`vX.Y.Z` git tags**, each with a **GitHub release**. The version marker, the tag, and the top `CHANGELOG.md` entry agree.
- `CHANGELOG.md` names the current semantic-versioned release. It may use [Keep a Changelog](https://keepachangelog.com/) sections (`Unreleased`, then dated version entries grouped by Added / Changed / Fixed / Removed), or establish a declared current-release baseline that inventories the shipped command surface. A baseline does not backfill older releases: their tags and commit history remain the record of that run-up.
- Tags and releases can't be seen from a checkout path — the checker hands this to the judgment pass (RELEASE, ADVISORY).

## The distribution contract

Two delivery channels, both required for a shipped tool:

1. **`install.sh` at the repo root** — the `curl | bash` installer:
   - POSIX-ish shell, runnable as `curl -fsSL <raw-url>/install.sh | bash`.
   - **Honours env overrides**: a target directory (e.g. `MGIT_INSTALL_DIR`, falling back to `$HOME/.local/bin`) and a version/ref to install (e.g. `MGIT_VERSION`, defaulting to the latest release).
   - **Verifies the download** (the fetch succeeds and lands a non-empty executable) before installing.
   - **Idempotent**: re-running installs/upgrades cleanly without corrupting an existing install.
   - Executable itself (`chmod +x install.sh`).
   - When a physical `man/<tool>.1` exists, honours a matching manual-target override (for example `MGIT_MAN_INSTALL_DIR`), installs the manual with a release, and makes `--link` link the manual source with the local executable.
2. **A companion Homebrew formula** — `Formula/<name>.rb` in the tap repo (`homebrew-<x>`), installable via `brew tap` + `brew install`. The **tap** and its formula are governed by the sibling `ki-homebrew-tap` skill, not here — this standard only requires that a tap formula exists as the second channel; it does not reproduce the formula rules.

## Capability conditionals

What the repo _is_ decides which checks apply — the same standard covers a bash tool and a TS tool without forking (mirrors `ki-engineering`'s capability-conditional pattern).

| Capability signal | Requirement it turns on |
| --- | --- |
| Primary bin has a `bash`/`sh` shebang (SHELL) | A CI workflow references **shellcheck** (the tool is shellcheck-clean); `tests/` holds a **`*.bats`** suite CI runs (references `bats`). |
| A `package.json` appears (TS/Bun tool) | The repo defers lint/test to **`ki-engineering`** and MUST also declare `["knowledgeislands/ki-agentic-harness:ki-engineering"]` in `.ki-config.toml`. Shell checks don't apply. |
| A physical `man/<tool>.1` page appears | CI runs `mandoc -T lint man/<tool>.1`, directly or through the repository's native task runner. The installer publishes it and `--link` links it alongside the executable. |
| Another language (Python, Go, …) | Defer to that language's own toolchain. The container checks (bin, install.sh, versioning, changelog, CI, tests) still apply. |

There is deliberately **no `ki-shell` skill**: shell is the reference language, and its two tool-specific gates (shellcheck, bats) live here as capability conditionals rather than a separate skill (YAGNI at n=1). If a second shell-specific concern emerges, revisit.

## Shared CLI conventions

These are Knowledge Islands house style, established by `tools-mgit` and `tools-ki`; they do not prescribe a tool's own command semantics.

- `--help` describes the currently available command surface and completes successfully. Successful commands exit 0; a normal operational error exits 1; invalid syntax the tool itself owns exits 2.
- A shell completion command is singular: `<tool> completion <shell>`. It writes the selected shell's completion definition to standard output.
- Syntax the tool itself owns reports `<tool>: error: …`, exits with status 2, and includes usage. Invalid owned syntax takes precedence over `--help`; arguments intentionally passed through to another program remain that program's concern.
- The active CLI help, a physical manual, the README's command overview, and the current-release changelog baseline describe the same public surface. A tool may give each a different level of detail, but none may advertise a retired command or omit a shipped user-facing command.

## Manual authoring

A physical `man/<tool>.1` is the installed command reference. It stays aligned with the CLI help surface and uses the same command-group vocabulary where the tool has grouped commands.

- Write portable, `mandoc`-compatible roff: `.TH` for the page header; `.SH` for main sections; `.SS` for command groups; `.TP` with `.B`, `.I`, `.BR`, or `.IR` for terms and their descriptions; and `.PP` for ordinary paragraphs. Use `.nf` / `.fi` only for literal preformatted examples.
- Put a literal `\&` line immediately after every `.SH` and `.SS`. This gives the rendered heading a clear visual separation from the content that follows without relying on renderer-specific blank-line behaviour.
- Keep SYNOPSIS short and executable: show the general forms first, then grouped commands as term/description pairs. Use the same names and ordering as help, and describe each command in a concise active sentence.
- Validate source with `mandoc -T lint man/<tool>.1`. For an authoring or layout change, also inspect the plain rendered form with `mandoc -Tutf8 man/<tool>.1 | col -b`; lint can validate roff syntax but cannot establish readable spacing.

## The qualified `ki-tools` marker

A `tools-*` repo opts in by declaring a **keyless** `["knowledgeislands/ki-agentic-harness:ki-tools"]` table in its `.ki-config.toml`. It is validated **down**: the checker reads only this table and warns on any unknown key inside it (there are none today), never reading another skill's table. `ki repo conform --skill ki-tools` adds it to an existing parseable configuration when it is safe to do so.

A language conditional is declared as its **own** table, not a key here: a TS/Bun tool carries both `ki-tools` and `ki-engineering` qualified declarations.

## What other skills own

- **`ki-repo`** — the local standard files (README, LICENSE, `.gitignore`, `.editorconfig`), GitHub settings (merge policy, branch protection, topics, visibility), and the `.ki-config.toml` contract itself. `ki-repo`'s coverage cascade detects an undeclared tool (a `bin/<exe>` + `install.sh` with no qualified `ki-tools` declaration) and WARNs, enforcing the one-structure-skill-per-repo invariant.
- **`ki-homebrew-tap`** — the tap repo, the `Formula/*.rb` shape, and the tap's own test-bot/CI.
- **`ki-engineering`** — the TS/Bun build/lint/test toolchain, only if the tool grows a `package.json`.
