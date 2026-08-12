# `ki-change-management-github-issues` effectiveness review

- **Position:** 9 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `28ca93c80e74cc9b59e0f2b4596ef474e183190d` plus current official-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the small safety and configuration boundary, but describe it honestly as non-operational and resolve identity, metadata, dependency, and execution semantics before grading.

## Sources and mechanics

The source record contains no official GitHub locator or review date. That is inappropriate for volatile external-platform claims. Current official documentation confirms native [issue dependencies](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies), [sub-issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues), [issue fields](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-fields-in-your-organization), [closure](https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/closing-an-issue), [transfer](https://docs.github.com/en/issues/tracking-your-work-with-issues/administering-issues/transferring-an-issue-to-another-repository), and REST operations. The REST Issues surface can also return pull requests, so a future executor must distinguish them.

The generated rubric is in sync and the repository-wide `ki-skills` audit passes. A focused repository audit is not applicable here because this Harness selects and declares only the roadmap adapter; attempting to select this undeclared skill correctly fails before execution. The adapter has no focused tests, eval scenario, matrix row, or result evidence.

Its sole criterion checks that the base selects `github-issues`, the namespace superficially matches `owner/repository`, and no extra local key exists. It performs no GitHub lookup and validates no lifecycle mapping.

## Selection and outcome effectiveness

The description has clear GitHub Issues triggers and useful off-ramps. The no-local-mirror rule, exact remote-write authority, pre-write reread, refusal to infer readiness from open state, refusal to infer acceptance from a merged pull request, and retention of closed Issues are strong safety boundaries.

The skill is not presently an executable adapter. `ki-next`, `ki-plan`, `ki-implement`, and `ki-accept` still resolve local roadmap or Streams records and have no authorised GitHub execution path. Existing `KI-HARNESS-FND-014` already records this gap. The description's claim that the skill maps those processes therefore overstates current availability.

## Instruction economy and architecture

The 36-line entrypoint and 25-line standard are proportionate. Precision and tested composition are needed, not more standing procedure.

The configured namespace alone cannot express the required lifecycle mapping. Labels are repository-scoped; issue fields and Project fields have different scope and conflict possibilities. The adapter must identify the exact metadata plane and owner for queue placement, readiness, review, and done, including an intentional unused mapping where appropriate.

GitHub supplies both hierarchy and dependency relations. The adapter must state whether native dependency edges map to KI blockers and whether sub-issues are hierarchy only, rather than conflate them.

## Executability and safety

The current local-only audit and CONFORM behavior is safe. Remote mutation remains unimplemented and explicitly authority-gated.

The claimed stable `<owner>/<repository>#<number>` reference is only stable while the Issue remains in that repository. GitHub permits an explicitly confirmed transfer to another repository, which changes its namespace and number while redirecting the old URL. The standard permits transfers but defines no migration, re-resolution, alias retention, or prohibition rule. That is an identity and authority conflict.

## Evidence and gaps

There are no fixtures for selection, namespace identity, metadata mapping, transfer, Issue-versus-pull-request filtering, authentication, stale reads, permissions, conflicts, or no-write behavior. There is no assisted-versus-baseline outcome evidence.

## Proposed remediation

These proposals are not approved implementation:

1. Add dated official sources for identity, transfer, closure, hierarchy, dependencies, fields, permissions, and API behavior.
2. Decide whether canonical work Issues may transfer; if allowed, define an authority-gated re-address and alias-evidence procedure.
3. Require an explicit inspectable lifecycle metadata mapping and conflict owner.
4. Define dependency versus hierarchy semantics without silently equating native features.
5. Route remote execution, stale-read, permission, filtering, and no-write fixtures through existing `KI-HARNESS-FND-014`; until delivered, narrow the description to the actual configuration and guidance capability.

No new skill, agent, or hook is proposed. Existing `KI-HARNESS-FND-014` is the appropriate remediation owner.

## Applied changes

**State:** applied in `76173ee7`.

Reframed displayed issue locators as mutable addresses, retained old locators as aliases, made transfers authority-gated, and added explicit lifecycle metadata, dependency-versus-hierarchy, closure, and permission guidance. A local mapping criterion and negative fixtures were added. Remote reads and writes remain unavailable and fail closed pending `KI-HARNESS-FND-014`.
