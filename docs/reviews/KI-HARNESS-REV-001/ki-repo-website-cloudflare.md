# `ki-repo-website-cloudflare` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** approved Phase 4 remediation applied
- **Identity:** position 36 of 50; governance; depends on `ki-repo-website` at position 35; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-website-cloudflare` is appropriately downstream of `ki-repo-website` and scoped to Workers Static Assets serving. Current official Cloudflare sources still support the core configuration, migration, observability, build, and command claims, but the monthly registry is overdue and its Wrangler version trails the canonical site.

The current estate has one assets-only `site/wrangler.jsonc`, build-before-preview scripts, custom-domain routes, and observability. There is no deployed account, preview, or result evidence. The child also duplicates the parent's `assets.directory` check, requiring one owner and composed evidence.

## Mechanical trace and limits

The 14-item publication, parent-plus-child focused audit, dry-run conform, and six tests pass. The host makes no Cloudflare calls or file writes and tests symlink refusal, unrelated-repo applicability, and non-execution of scripts.

The standard requires an assets site Worker with no `main`, but every config containing `assets` is classified as a site config regardless of `main`; assets-plus-main therefore passes. Wrangler inspection uses regex rather than parsing JSONC, JSON, or TOML, so malformed files and field-like comments can appear conformant. `WCF-4` accepts any path ending in `dist` without normalization, containment, existence, or proof it is the parent's output. Exact path policy remains blocked by the parent layout conflict.

## Candidate improvements

1. Enforce the stated assets-without-main boundary with a pure negative fixture and host-visible finding.
2. Parse every supported configuration format and test malformed and deceptive-text inputs.
3. After parent layout reconciliation, require a normalized, contained, exact build-output path with traversal and mismatch negatives.
4. Refresh sources and keep deployed environment evidence distinct from local no-write inspection.

## Applied changes

Wrangler JSONC and TOML are parsed rather than searched. Assets-plus-main, malformed or comment-only evidence, traversal, and non-exact parent output paths now fail closed. Build and deployment outcomes remain unavailable dynamic evidence.

## Carry-forward criteria

Classification rules need explicit conflict-marker negatives. Remote configuration must be parsed before conformance, and lexical suffix matching cannot prove a build-to-hosting seam.

## Local evidence

- `skills/repo-structure/ki-repo-website-cloudflare/SKILL.md`
- `skills/repo-structure/ki-repo-website-cloudflare/references/standards-cloudflare-hosting.md`
- `skills/repo-structure/ki-repo-website-cloudflare/references/sources.md`
- `skills/repo-structure/ki-repo-website-cloudflare/scripts/rubric/contexts/website-cloudflare.ts`
- `skills/repo-structure/ki-repo-website-cloudflare/scripts/rubric/items/wcf.ts`
- `skills/repo-structure/ki-repo-website-cloudflare/scripts/rubric/contexts/website-cloudflare.test.ts`
- `evals/scenarios/ki-repo-website-cloudflare.ts`
