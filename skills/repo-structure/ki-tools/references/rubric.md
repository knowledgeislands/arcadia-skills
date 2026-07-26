<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-tools

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [TOOL — tool repository](#tool--tool-repository)
- [SHELL — shell capabilities](#shell--shell-capabilities)
- [LANG — language capabilities](#lang--language-capabilities)
- [CONFIG — configuration](#config--configuration)

## TOOL — tool repository

- **TOOL-BIN [FAIL · INSPECT] — Tool executable**
- **TOOL-EXEC [FAIL · INSPECT] — Executable bit**
- **TOOL-SCOPE [J] — One command**
  > The repository contains genuinely one tool rather than distinct commands.
- **TOOL-XDG [J] — XDG storage**
  > The tool follows the XDG Base Directory specification for config, state, and cache.
- **TOOL-INSTALL [WARN · INSPECT] — Installer executable**
- **TOOL-INSTALL-QUALITY [J] — Installer quality**
  > The installer is POSIX-ish, honours overrides, verifies downloads, and is idempotent.
- **TOOL-VERSION [WARN · INSPECT] — Version flag**
- **TOOL-VERSION-SOURCE [J] — Version source**
  > The version marker has one source of truth aligned with the latest tag and changelog.
- **TOOL-CHANGELOG [WARN · INSPECT] — Changelog presence**
- **TOOL-CHANGELOG-FORMAT [J] — Changelog format**
  > The changelog follows Keep a Changelog and semantic versioning.
- **TOOL-CI [WARN · INSPECT] — CI workflow**
- **TOOL-TAP [J] — Companion formula**
  > A companion Homebrew formula exists in the governed tap.
- **TOOL-TESTS [WARN · INSPECT] — Test directory**
- **TOOL-ENGINEERING [J] — Engineering declaration**
  > A package.json-bearing repository declares ki-engineering.
- **TOOL-LANGUAGE [J] — Other-language toolchain**
  > A non-shell, non-JavaScript tool wires its own lint and test toolchain into CI.
- **TOOL-RELEASE-CHECK [J] — Release alignment**
  > Version markers, tags, releases, and changelog entries agree.

## SHELL — shell capabilities

- **SHELL-LINT [WARN · INSPECT] — Shell lint CI**
- **SHELL-TEST [WARN · INSPECT] — Shell test CI**

## LANG — language capabilities

- **LANG-DEFER [WARN · INSPECT] — JavaScript toolchain deferral**

## CONFIG — configuration

- **CONFIG-1 [WARN · INSPECT] — Opt-in marker and keys**
