# `ki-repo-website` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** approved Phase 4 remediation applied
- **Identity:** position 35 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-website` selects its narrow Eleventy/Tailwind build stack well and off-ramps general engineering and hosting work. The canonical site matches its marker, `site/` workspace, `site/dist`, and expected scripts. The monthly source record is overdue, although current Eleventy, Tailwind, and Node documentation continues to support the core APIs.

The parent nevertheless inspects the Cloudflare Worker `assets.directory` in `WEB-36` after routing serving and Wrangler ownership to `ki-repo-website-cloudflare`, whose `WCF-4` owns the same seam. One mechanical owner is required.

## Mechanical trace and limits

The 42-item publication, focused audit, dry-run conform, and eight tests pass. Conform safely limits writes and refuses symlinked governed paths. It deliberately does not build, so clean state does not prove the build, generated links, stale-output cleanup, or deployable output.

The standard and checker require `site/` from day one with `site/dist`, while the eval teaches a conformant flat-root site and later `../dist` migration. The SKILL/eval say native Bun, the standard permits modern Node, and the live estate uses Node with `--experimental-strip-types`; `WEB-3` merely rejects `tsx`. `WEB-1` claims Eleventy `^3.x` but tests presence only, and no criterion checks the required direct `tailwindcss` dependency.

## Candidate improvements

1. Reconcile one layout and output rule across entrypoint, standard, checker, fixtures, evals, canonical estate, and hosting child.
2. Assign `assets.directory` to one parent/child owner and compose the other layer's evidence without duplicate validation.
3. Select one portable runtime policy with `ki-engineering`, align the estate, and test accepted and refused runners.
4. Enforce stated versions/dependencies or narrow the published criteria, and add explicit build/generated-output evidence.

## Applied changes

Repository declaration now controls applicability, the source contract permits modern Node, and static checks use exact Eleventy 3 declaration evidence. Cloudflare hosting configuration is routed to its adapter rather than duplicated here.

## Carry-forward criteria

A parent/child seam needs one mechanical owner. Prescribed layouts, runtimes, and paths must agree across every contract surface and current estate; static audit cannot imply build correctness.

## Local evidence

- `skills/repo-structure/ki-repo-website/SKILL.md`
- `skills/repo-structure/ki-repo-website/references/standards-eleventy-site.md`
- `skills/repo-structure/ki-repo-website/references/sources.md`
- `skills/repo-structure/ki-repo-website/scripts/rubric/items/web.ts`
- `skills/repo-structure/ki-repo-website/scripts/rubric/contexts/website.test.ts`
- `evals/scenarios/ki-repo-website.ts`
