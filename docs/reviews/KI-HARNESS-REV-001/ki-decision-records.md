# `ki-decision-records` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 3 remediation is authorised
- **Identity:** position 18 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

The skill owns Decision Record format, prefix and serial conventions, the collection index, and its rubric. It declares no direct skill dependency and explicitly leaves Knowledge Base structure and frontmatter to `ki-repo-kb`.

That boundary is currently violated. The Decision Record standard requires a prefix-derived human-readable `type` plus `type_url`, while the declared KB-wide frontmatter owner requires `type: admin/governance/decision` with `decision_type`. The Decision Record standard also assigns or infers `repo_type` outside `[skills.ki-repo]`, despite `ki-repo` owning that key exclusively. This review records the collision without choosing a policy; the later `ki-repo-kb` review is a mandatory reconciliation gate.

## Effectiveness and outcome evidence

The unified nine-prefix collection, readable identifiers, and curated index are useful outcomes, and this harness contains an established 41-record collection. The focused host audit is clean. There is no measured evidence that the additional `type` and `type_url` metadata or mandatory contiguous renumbering improve retrieval or decision quality. The living-record model is an intentional house convention rather than a result established by the cited ADR sources.

## Mechanical trace

The catalogue connects rubric-integrity, filename, root, frontmatter, type-fit, body, and index families to the host. Focused verification passed with 12 tests and 50 expectations, a clean hosted audit, and a current generated rubric publication.

Material gaps remain:

- Invalid Markdown records without a parseable H1 or ID are skipped and can evade later checks.
- Missing or malformed configuration defaults to code mode instead of reporting an unresolved repository-kind contract.
- The standard requires ordered index links while CONFORM appends unordered bullets, and a test preserves that divergence.
- Index checks validate listed IDs but not link targets.
- `decision_depends_on`, References restrictions and ordering, cross-repository byte identity, and citation sweeps after reclassification are stated but not mechanically checked.
- The eval scenario asserts obsolete KB-only metadata and consists of static source assertions rather than an executed outcome result.

## Source authority

The registered sources were last reviewed on 2026-07-04. Current checks of [Michael Nygard's original ADR format](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) and [the ADR community site](https://adr.github.io/) support recording one significant decision with its context, rationale, trade-offs, and historical status. They do not establish the KI nine-prefix taxonomy, public `type_url` surface, or living-rewrite policy. Those remain house conventions and need house-owned evidence. The claimed public type URL targets could not be verified through current primary discovery.

## Candidate improvements

1. Reconcile Decision Record and KB metadata under one declared owner, and use only `[skills.ki-repo].repo_type`; align the standard, checker, publication, fixtures, and eval after that decision.
2. Make discovery total: report every decision-looking Markdown file that cannot parse and fail safely when selected configuration is invalid.
3. Validate index link targets and preserve the standard's ordered-list grammar during CONFORM.
4. Replace the stale KB scenario with a current-contract fixture and record an executed host-level outcome evaluation.
5. Publish and verify the house type URL targets, or classify them as internal, non-authoritative metadata.

## Carry-forward criterion

The `ki-repo-kb` review must establish one configuration owner, one KB `type` contract, and one aligned rubric/eval representation. It must also distinguish claims a local checker can prove from cross-repository or history-dependent claims.

## Local evidence

- `skills/governance/ki-decision-records/SKILL.md`
- `skills/governance/ki-decision-records/references/standards-decision-records.md`
- `skills/governance/ki-decision-records/references/sources.md`
- `skills/governance/ki-decision-records/scripts/rubric/contexts/decision-records.ts`
- `skills/governance/ki-decision-records/scripts/rubric/contexts/decision-records.test.ts`
- `skills/governance/ki-decision-records/scripts/rubric/items/index.ts`
- `skills/governance/ki-decision-records/scripts/rubric/items/index.test.ts`
- `skills/repo-structure/ki-repo-kb/SKILL.md`
- `skills/repo-structure/ki-repo-kb/references/standards-frontmatter.md`
- `skills/keystone/ki-repo/references/standards-configuration.md`
- `evals/scenarios/ki-decision-records.ts`
