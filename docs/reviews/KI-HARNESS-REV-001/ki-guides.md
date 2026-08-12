# `ki-guides` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 3 remediation is authorised
- **Identity:** position 20 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-guides` independently owns `docs/guides/`, its entry index, guide shape, and retired-root guard. It correctly routes rationale, behavioural contracts, and forward work to Decision Records, Specifications, and change management. GDR-004 establishes the four-document split.

The standing surface is economical and its concrete selection triggers are useful. The harness demonstrates a navigable developer-guide area, but it has no assisted-versus-baseline, task-completion, or reader-success evidence.

## Mechanical trace and limits

The catalogue publishes rubric-integrity, guide, and routing families. The inspector rejects a symlinked guide root and recursively checks regular Markdown files for one H1. Focused tests, the hosted audit, and generated-rubric parity pass.

That structural success is narrower than the skill's intended outcome:

- The checker proves that `README.md` exists, not that it describes scope, links guide areas, or supports a usable procedure, verification, recovery, or current command.
- The focused context test does not cover missing or unsafe roots and indexes, nested symlinks, duplicate H1s, every retired root, or host-visible outcomes.
- `ROUTE-1` treats any `docs/logs` path as a retired generic root, although the standard permits a specialised operational owner. Path presence alone cannot prove the semantic classification “generic”.

## Current corpus and authority

The corpus gives two canonical-looking development activation forms: `ki dev on <path>` and `ki dev local set` followed by `ki dev local on`. Current local CLI help confirms both are executable. The conflict is therefore not unsupported syntax; it is that `ki-bootstrap` calls the one-command form the only route while a guide presents the two-step form. Command authority and the relationship between supported forms need one source of truth, and the guides rubric cannot validate command currency.

The standard and rubric also retain obsolete “Feature Definition” terminology after the documentation map adopted Specifications. Existing ready work, `KI-HARNESS-GOV-016`, already owns the unresolved non-KB topology decision; this review does not choose that policy independently.

The registered sources are current house authorities last reviewed on 2026-08-02. [Write the Docs](https://www.writethedocs.org/guide/writing/beginners-guide-to-docs/), [Docs as Code](https://www.writethedocs.org/guide/docs-as-code/), and [Diátaxis](https://diataxis.fr/) support audience-appropriate, actionable documentation but do not establish the KI topology. They remain supporting discovery unless deliberately adopted.

## Candidate improvements

1. Complete `KI-HARNESS-GOV-016`: align this skill with the chosen topology owner, remove Feature Definition terminology, and route stable-behaviour dependencies to an existing Specification or an explicit gap.
2. Keep deterministic structure in the checker but retain discoverability, actionability, recovery, and currency as visible judgment criteria; add host-visible negative fixtures.
3. Stop inferring “generic log” solely from path presence.
4. Reconcile supported development-command forms under `ki-bootstrap`, then ground guide commands against that authority.

## Carry-forward criteria

The later `ki-bootstrap` review must reconcile actual CLI grammar with its “only `ki dev on`” wording and establish command-source currentness. Topology reviews must preserve specialist ownership and distinguish mechanically observable paths from semantic content classifications.

## Local evidence

- `skills/governance/ki-guides/SKILL.md`
- `skills/governance/ki-guides/references/standards-guides.md`
- `skills/governance/ki-guides/references/sources.md`
- `skills/governance/ki-guides/scripts/rubric/contexts/guides.ts`
- `skills/governance/ki-guides/scripts/rubric/contexts/guides.test.ts`
- `skills/governance/ki-guides/scripts/rubric/items/index.ts`
- `skills/governance/ki-guides/scripts/rubric/items/routing.ts`
- `docs/guides/README.md`
- `docs/guides/developer/README.md`
- `docs/guides/developer/generated-write-boundaries.md`
- `docs/guides/developer/local-harness-development.md`
- `docs/decisions/GDR-KI-HARNESS-004-four-doc-repository-documentation-ownership.md`
- `docs/docs.md`
- `docs/roadmap/KI-HARNESS-GOV-016-govern-documentation-topology.md`
- `skills/keystone/ki-bootstrap/SKILL.md`
