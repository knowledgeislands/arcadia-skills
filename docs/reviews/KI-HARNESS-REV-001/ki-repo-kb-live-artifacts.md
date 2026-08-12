# `ki-repo-kb-live-artifacts` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 4 remediation is authorised

## Dependency and ownership

`ki-repo-kb-live-artifacts` provides a distinct source-and-render pairing model with cautious no-render and no-delete behavior. It currently has no real source/render pair or demonstrated outcome in the estate; Arcadia supplies only an index-level reference.

The child schema conflicts with the parent KB-wide `type` contract, and the child writes relative Markdown links while the parent requires base-note wikilinks. These are aggregate ownership decisions, not local exceptions a child audit can settle.

## Mechanical trace and limits

The checker protects proposal and symlink boundaries, but silently falls back to default configuration after parse errors, uses handwritten frontmatter parsing, and examines only direct children. Structural tests and recall-oriented evals do not exercise a real source/render lifecycle.

The current evidence therefore establishes conservative mechanics, not usefulness or end-to-end artifact integrity.

## Candidate improvements

1. Reconcile identity, frontmatter, link form, and zone rules with the aggregate KB owner, followed by a current-estate migration.
2. Fail closed on invalid configuration and replace handwritten semantic parsing with format-aware validation.
3. Add a real source/render pair baseline covering creation, drift, unsafe links, nested paths, and no-delete behavior.

## Carry-forward criteria

An artifact-pair capability needs at least one real pair and lifecycle outcome. Invalid configuration must not activate defaults, and aggregate link or identity policy must have one owner.

## Local evidence

- `skills/repo-structure/ki-repo-kb-live-artifacts/SKILL.md`
- `skills/repo-structure/ki-repo-kb-live-artifacts/references/standards-live-artifacts.md`
- `skills/repo-structure/ki-repo-kb-live-artifacts/scripts/rubric/contexts/live-artifacts.ts`
- `skills/repo-structure/ki-repo-kb-live-artifacts/scripts/rubric/items/index.test.ts`
- `skills/repo-structure/ki-repo-kb/references/standards-frontmatter.md`
