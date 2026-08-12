# `ki-bootstrap` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 6 remediation is authorised

## Dependency and ownership

`ki-bootstrap` retains useful concise guidance for the non-obvious distinction among installation, activation, repository declaration, and user scope, while correctly leaving execution to `tools-ki`.

Its authority is house-owned host behavior. The source dates and all operational surfaces are stale against current `ki` 0.2.20.

## Mechanical trace and limits

The entrypoint, standard, examples, and all three evals prescribe absent commands: `ki skill user`, `ki skill repo`, `ki dev on/off`, and top-level `ki doctor`/`ki diag`. Current grammar uses `ki skill add/remove`, `ki repo skill add/remove`, `ki dev local set` plus `local on/off`, and `ki manage doctor/diag`. The process is therefore not executable as written.

Current read-only host output reports installed Harnesses, capabilities, core user skills, and runtime projections. It also reports local development mode active with this mutable checkout as the operation source. That explains the symlinked payload from the aggregate review and contradicts unqualified verified-installed authority. Inventory and doctor state do not prove archive integrity, loaded runtime capability, or outcome value.

There is no rubric or focused test, which is acceptable for guidance only if live examples are verified. The advisory eval run had call errors on all obsolete scenarios and no treatment difference.

## Candidate improvements

1. Reconcile every command in entrypoint, standard, examples, and evals against the installed host and add read-only CLI grammar fixtures.
2. Surface verified archive versus explicit local-development source as distinct activation and provenance states.
3. Add host integrity evidence for payload path type, manifest/archive, activation target, and capability resolution before reporting health.
4. Replace call-error evals with current grammar and separate configuration, installed payload, activation, and loaded-runtime outcomes.

## Carry-forward criteria

Guidance must be tested against the installed executable. CLI grammar, verified payload, development source, activation links, repository declaration, and usable runtime capability are separate claims; inventory or doctor state cannot bridge them.

## Local evidence

- `skills/keystone/ki-bootstrap/SKILL.md`
- `skills/keystone/ki-bootstrap/references/standards-bootstrap.md`
- `skills/keystone/ki-bootstrap/references/sources.md`
- `evals/scenarios/ki-bootstrap.ts`
- `docs/reviews/KI-HARNESS-REV-001/ki-repo-harness.md`
