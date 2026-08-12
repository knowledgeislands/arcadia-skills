# `ki-repo-harness` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 6 remediation is authorised
- **Identity:** position 49 of 50; governance; depends on `ki-skills` (1), `ki-subagents` (26), `ki-decision-records` (18), and `ki-change-management-roadmap` (8); baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-harness` usefully composes skill, subagent, decision, and roadmap concerns while retaining a distinct source-container versus installed-payload boundary. Agent Skills supports individual skill shape but not a multi-skill Harness; the five-part bundle is correctly labeled house policy.

The source estate physically contains the five shelves, and its README truthfully distinguishes populated and empty parts. The source registry has inconsistent row and narrative refresh dates.

## Mechanical trace and limits

Seven tests and publication sync pass. Focused aggregate audit has one dependency source-cadence warning but no layout fault. Tests cover grouped discovery, marker coalescing, and source symlink refusal.

The current installed Harness reports 50 capabilities, but installed `skills`, `subagents`, and `hooks` are symlinks into this checkout. The standard and decision require a verified regular-file payload and exclude the checkout, cache, or projection as operation source. Capability names therefore do not prove installed payload integrity.

The aggregate audits only source shelves, marker, and local skill names. It can pass while component transport, activation, adapter declaration, plugin freshness, and installed payload checks are unavailable or failed. Tests omit installed regularity, archive/manifest verification, source/install divergence, activation links, collisions, and propagation of component findings. No exact eval addresses that boundary.

## Candidate improvements

1. Have host and Harness owners require physical path/type and verified-manifest evidence at installation, activation, and audit before counting capabilities.
2. Add explicit evidence handoffs for each populated capability kind and component audit; source layout must not mask unavailable runtime projections.
3. Reconcile source dates and primary Agent Skills/runtime links.
4. Add negative fixtures for symlinked or stale payloads, checkout projections, missing members, cross-Harness collisions, and activation escapes.

## Carry-forward criteria

Source container, verified installed payload, runtime activation, and executed capability are distinct. Aggregate counts never substitute for physical integrity, component validity, or runtime availability.

## Local evidence

- `skills/repo-structure/ki-repo-harness/SKILL.md`
- `skills/repo-structure/ki-repo-harness/references/standards-compatible-harness.md`
- `skills/repo-structure/ki-repo-harness/references/sources.md`
- `skills/repo-structure/ki-repo-harness/scripts/rubric/contexts/harness.ts`
- `skills/repo-structure/ki-repo-harness/scripts/rubric/items/index.test.ts`
- `docs/decisions/ADR-KI-HARNESS-012-compatible-harness-publication-and-governed-rubric-boundary.md`
- `evals/README.md`
