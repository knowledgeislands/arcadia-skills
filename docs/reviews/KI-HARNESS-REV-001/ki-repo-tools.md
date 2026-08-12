# `ki-repo-tools` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 4 remediation is authorised

## Dependency and ownership

`ki-repo-tools` has a useful, economical scope for single-command tool repositories and correctly routes generic repository, tap, and engineering concerns to their owners. Its requirement that package-based tools activate `ki-engineering` is only an informational physical-file observation; whether the skill or host owns resolved cross-skill validation remains an unresolved ownership decision.

Current sources support the general ShellCheck, Bats, changelog, SemVer, XDG, and mandoc concepts, but several CI, installer, release, and one-tool requirements are house policy. The `tools-mgit` MAN-LINT watch-item is stale against current CI.

## Mechanical trace and limits

Nine tests, publication sync, type-checking, and focused audits of `tools-mgit` and `tools-ki` pass. Path and proposal boundaries are cautious. Every audit nevertheless executes target-owned `bin/<primary> --version`. A timeout and reduced environment do not prevent writes, network access, or surviving children, so this is not a read-only audit of an untrusted target.

`tools-ki` passes despite tag/package `0.2.20` and the top changelog entry being an in-progress `1.0.0`, directly contradicting the stated release-alignment contract. Primary binary selection falls back to the first entry instead of requiring `bin/<repo-name>`, and workflow checks use substrings that comments can satisfy. Tests do not cover mutating targets, child cleanup, missing engineering activation, release mismatch, wrong primary name, or workflow false positives. There is no exact eval or outcome evidence.

## Candidate improvements

1. Separate static audit from explicitly trusted, isolated, opt-in target execution, with mutation, timeout, child-process, and refusal fixtures.
2. Assign one owner for resolved package/engineering activation or narrow the public claim to judgment-only.
3. Define and mechanically enforce release-baseline alignment, failing closed when local or remote evidence is unavailable.
4. Refresh source attribution and current estate observations, and parse deterministic naming/workflow evidence rather than scanning text.

## Carry-forward criteria

Executing target-owned code is not read-only and requires authority or isolation. Structural success cannot imply release coherence, CI execution, toolchain activation, installability, or publication.

## Local evidence

- `skills/repo-structure/ki-repo-tools/SKILL.md`
- `skills/repo-structure/ki-repo-tools/references/standards-tool-repositories.md`
- `skills/repo-structure/ki-repo-tools/references/sources.md`
- `skills/repo-structure/ki-repo-tools/scripts/rubric/contexts/tools.ts`
- `skills/repo-structure/ki-repo-tools/scripts/rubric/contexts/tools.test.ts`
- `skills/repo-structure/ki-repo-tools/scripts/rubric/items/language.ts`
