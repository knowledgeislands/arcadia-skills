# `ki-git` effectiveness review

- **Position:** 3 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `e15fb4f390e51d3e7f69cf285fceb3385bed5dbf` plus current-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain portable Git governance; make judgment-only audit evidence and outcome evaluation explicit before grading.
- **Change state:** applied in `ba4bd18a`.

## Sources and mechanics

`ki repo audit --skill ki-git --repo .` passed with `FAIL=0 WARN=0`. Its focused catalogue test passed 3 tests and 38 assertions. The generated publication is exact, but COMMIT, BRANCH, HYGIENE, and LOCK are judgment-only; the pass does not mean those policies were assessed.

[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) still supports the portable message grammar but does not prescribe the Knowledge Islands type list or branch policy. Current [Git documentation](https://git-scm.com/docs/git) is 2.55.0; [gitworkflows](https://git-scm.com/docs/gitworkflows) is unchanged through that release and explicitly presents its workflow as contextual rather than universal. The [worktree documentation](https://git-scm.com/docs/git-worktree) remains the primary source for distinct worktree indexes and administration metadata. The local GDR and standard, not those upstream sources, own Knowledge Islands policy.

## Selection and outcome effectiveness

The description has concrete commit, branch, hygiene, lock, and ownership triggers with off-ramps for GitHub settings, hook installation, and runtime configuration. Selection boundaries are clear.

Residual value over default model behavior is material: the skill supplies the local type vocabulary, direct-main versus branch decision, shared-worktree index and shared-`HEAD` serialization protocol, dash-prefixed path handling, and bounded stale-lock recovery. These are safety-relevant and repository-specific enough to justify a skill.

## Instruction economy and architecture

The 59-line body routes detail to a 73-line standard. Repeating the compact `GIT_INDEX_FILE` protocol in the entrypoint is justified because it is an immediate concurrent-write safety rule. Portable semantics, hook payload, repository configuration, and runtime registration have distinct owners.

The main cost is evidentiary rather than textual: reviewers can be asked to assess four judgment families without receiving prepared branch, history, worktree, or dirty-state evidence.

## Executability and safety

The standard prohibits destructive recovery without authority and distinguishes separate indexes from shared-`HEAD` serialization. The lock guard is fail-safe outside repositories, on inconclusive process evidence, and for symlinks or non-regular files. Its run-based suite covers hostile paths, active processes, linked worktrees, submodules, and containment rechecks. The same-UID race limitation remains documented rather than hidden.

## Evidence and gaps

The native session resolves a repository and publishes judgment subjects but does not prepare Git state evidence. A focused audit can therefore terminate cleanly without assessing the four policy dimensions. The output is mechanically correct yet easy to overread as a policy pass.

There is no exact-name behavioural eval or baseline result. No current evidence tests whether skill guidance improves branch choice, dirty/shared-worktree handling, dash-prefixed pathspecs, or uncertain stale-lock decisions.

## Proposed remediation

These proposals are not approved implementation:

1. Make judgment-only audit output visibly unassessed and prepare the minimum read-only Git evidence needed for model review without adding a private executor.
2. Add assisted-versus-baseline scenarios for shared dirty state, branch choice, dash-prefixed paths, and inconclusive lock recovery.
3. Classify Conventional Commits as authority only for its grammar, Git documentation as primary factual context, and the GDR/local standard as the KI policy owner.
4. Track `git-worktree` directly for linked-worktree safety claims.

No new skill, script, agent, or hook is proposed.

## Applied changes

**State:** applied in `ba4bd18a`.

Made judgment-only status explicit, required focused read-only Git evidence in review prompts, classified upstream authority narrowly, and added `git-worktree` as a direct safety source. Rubric wording and focused tests were refreshed. Assisted-versus-baseline outcome grading remains future evidence.
