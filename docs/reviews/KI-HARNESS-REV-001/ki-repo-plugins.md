# `ki-repo-plugins` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** approved local remediation applied; runtime, security, and freshness evidence remain separate
- **Identity:** position 37 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-plugins` usefully separates generated marketplace shape from generation and Claude/Cowork enablement, which `ki-binding-claude` owns. Its report-only session appropriately avoids cross-repository writes. Fixed names, one plugin, flat agents, mandatory manifest, and no MCP are house constraints rather than universal Claude plugin rules.

The current `ki-plugins` estate passes shape audit, and its version matches the Harness. That does not prove freshness, installation, marketplace registration, enabled state, or capability loading.

## Mechanical trace and limits

Eight tests and the publication pass, with strong physical-file and symlink refusal. The generator has meaningful staging, rollback, post-publication, and injected-failure tests, but that safety belongs to `ki-binding-claude`.

The standard says every Harness skill is copied and agents come from `agents/governance`; the generator actually uses `subagents/governance` and filters skills by Claude runtime eligibility. The estate therefore projects 48 of 50 skills. Native audit checks only counts and manifests, so stale or substituted bytes can pass. Freshness and reproducibility remain judgment-only, while three evals are static recall probes.

## Candidate improvements

1. Reconcile canonical source paths and runtime eligibility across the standard, generator, rubric, fixtures, and source registry.
2. Mechanically compare selected source manifests or hashes with the projection, or label freshness and reproducibility explicitly unverified.
3. Define a scoped evidence handoff between source projection and binding-owned registered, enabled, and loaded runtime state.
4. Refresh official platform rules and label one-plugin, MCP, and Cowork constraints as house/runtime-specific.

## Applied changes

Declaration now controls applicability and structural success is explicitly separate from generation freshness, byte identity, registration, enablement, and loaded runtime state. Negative fixtures protect undeclared and no-write behavior. Source selection and runtime projection remain adapter and binding concerns.

## Carry-forward criteria

Generated-package shape, source freshness, and installed runtime availability are separate claims. A passing shape audit cannot stand in for either freshness or activation.

## Local evidence

- `skills/repo-structure/ki-repo-plugins/SKILL.md`
- `skills/repo-structure/ki-repo-plugins/references/standards-plugin-marketplace.md`
- `skills/repo-structure/ki-repo-plugins/references/sources.md`
- `skills/repo-structure/ki-repo-plugins/scripts/rubric/contexts/plugins.ts`
- `skills/environment/ki-binding-claude/scripts/build-plugin.ts`
- `evals/scenarios/ki-repo-plugins.ts`
