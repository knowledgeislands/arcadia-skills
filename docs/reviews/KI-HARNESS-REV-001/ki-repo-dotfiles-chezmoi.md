# `ki-repo-dotfiles-chezmoi` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 4 remediation is authorised
- **Identity:** position 40 of 50; governance; depends on `ki-authoring` at position 2; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-dotfiles-chezmoi` correctly composes `ki-authoring` and owns chezmoi source-state conventions, while generic Git/repository and renderer-specific binding concerns remain elsewhere. The source-versus-target discipline, fragment ownership, secret-sensitive diff guidance, and create-only bounded conform proposal are valuable.

Current sources support chezmoi attributes, templates, modify scripts, target effects, and editor-preserving libraries, but the registry is overdue and most broad operational judgments remain based on one estate.

## Mechanical trace and limits

Seven tests, publication sync, and the representative dotfiles audit pass. That proves `.chezmoiignore`, physical template-support directories, selected direct `bin/` prefixes, and Git lock-path presence only. The session has no applicability state despite the entrypoint claiming structural detection, so any selected physical repository is audited. Declaration selection and structure detection are currently conflated.

The catalogue publishes `SHELL-J1`, but the host subject omits the `SHELL` family, so the criterion can never appear or count. Template-support directories are only a proxy because templates can use built-in or other data sources. Root prefixes are advertised but not inspected, and the recognized prefix list omits documented compositions. Tests do not cover rendered targets, modify errors, source-to-target resolution, secret-safe previews, apply, reload, or applicability. There is no exact eval or outcome result.

## Candidate improvements

1. Define one selected-versus-not-applicable contract across declaration, structural detection, session, host, publication, and negative fixtures.
2. Give every published rubric family, including `SHELL`, a host-visible execution path or remove/reclassify it.
3. Narrow template and prefix checks to explicit house conventions or validate real source-to-target dependencies and the current attribute surface.
4. Add contained no-write rendered-target fixtures for malformed, missing, symlinked, concurrent, idempotent, and secret-safe paths; keep reload behavior platform-scoped.

## Carry-forward criteria

Applicability, structure detection, host selection, publication, and negative fixtures must express one contract. Source-shape success cannot imply rendered correctness, secret safety, script safety, or application reload.

## Local evidence

- `skills/repo-structure/ki-repo-dotfiles-chezmoi/SKILL.md`
- `skills/repo-structure/ki-repo-dotfiles-chezmoi/references/standards-chezmoi-dotfiles.md`
- `skills/repo-structure/ki-repo-dotfiles-chezmoi/references/sources.md`
- `skills/repo-structure/ki-repo-dotfiles-chezmoi/scripts/rubric/contexts/chezmoi.ts`
- `skills/repo-structure/ki-repo-dotfiles-chezmoi/scripts/rubric/items/shell.ts`
- `skills/repo-structure/ki-repo-dotfiles-chezmoi/scripts/rubric/items/index.test.ts`
