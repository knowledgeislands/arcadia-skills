# `ki-repo-homebrew-tap` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 4 remediation is authorised

## Dependency and ownership

`ki-repo-homebrew-tap` adds a useful tap-specific delta beyond `ki-repo`, with a clear distinction between specification and repository shape and a byte-match guard before inspecting a workspace clone. `ki-repo-tools` remains the shipped-tool owner. The Homebrew source registry is within cadence, though Tap Trust is material new safety authority.

The skill says it has seven required parts while naming eight. Its decision record says unavailable Homebrew becomes not applicable, while the implementation emits a warning; no semantics were selected in this review.

## Mechanical trace and limits

Ten tests and publication sync pass. The representative tap passes the structural criteria but reports two environment-induced `TAP-7` warnings because Homebrew could not write fallback cache/API state. `TAP-7` unconditionally invokes Homebrew and permits dependency provisioning; disabling auto-update does not make this externally read-only, and non-official taps can execute Ruby with user privileges.

The checker does not prove filename-to-class identity, executable formula DSL placement, immutable release URLs, README table registration, installation, or `brew test`. It accepts version/help smoke tests as meaningful although current Homebrew guidance calls those poor tests. Current CI does not provide a successful `brew test-bot` backstop, and there is no exact eval or result evidence.

## Candidate improvements

1. Disclose and authorize Homebrew execution, isolate writable/network side effects, and distinguish environment failure from tap conformance.
2. Align meaningful-test guidance and fixtures with a basic functional assertion or narrow the claim.
3. Replace text signatures with structured evidence for class identity, DSL, immutable release coordinates, and README registration.
4. Reconcile unavailable-Homebrew semantics, correct the part count, and add Tap Trust to current primary sources.

## Carry-forward criteria

Package-manager and installer audits need explicit authority, isolation, and separate environment diagnostics. Text shape cannot prove executable package semantics, source immutability, installability, or runtime validation.

## Local evidence

- `skills/repo-structure/ki-repo-homebrew-tap/SKILL.md`
- `skills/repo-structure/ki-repo-homebrew-tap/references/standards-homebrew-tap.md`
- `skills/repo-structure/ki-repo-homebrew-tap/references/sources.md`
- `skills/repo-structure/ki-repo-homebrew-tap/scripts/rubric/contexts/homebrew-tap.ts`
- `skills/repo-structure/ki-repo-homebrew-tap/scripts/rubric/items/tap.ts`
- `skills/repo-structure/ki-repo-homebrew-tap/scripts/rubric/contexts/homebrew-tap.test.ts`
- `docs/decisions/ADR-KI-HARNESS-SKILLS-009-two-repo-structure-skills-for-standalone-tools-and-their-homebrew-tap.md`
