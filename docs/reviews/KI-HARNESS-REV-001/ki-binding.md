# `ki-binding` effectiveness review

- **Review state:** complete; grade `F` approved on 2026-08-12
- **Disposition:** revise
- **Change state:** approved Phase 5 remediation applied in `e75590e6`; current canonical inventory fails the stricter schema
- **Identity:** position 41 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-binding` usefully owns one runtime-neutral XDG `mcp-servers.yaml` inventory and client-target intent, while Claude, Codex, and chezmoi adapters own native projections. MCP itself does not define a cross-client source, so this is clearly house-owned policy.

The live source contains seven servers, six targeting mcporter; their names match the active command's six reported names without inspecting sensitive values. This is name-level evidence only.

## Mechanical trace and limits

Six tests, publication sync, and focused audit pass. The root is safely report-only and requires a physical source file. `BIND-1`, however, hard-codes legacy `~/.mcporter/mcporter.json`, compares only names, and treats absent or unreadable targets as informational. Current mcporter supports XDG/project JSONC, imports, merging, and explicit overrides, so the inspected file may not represent active state.

`BIND-2` keeps only name, clients, command, and URL; it silently drops args, environment, headers, unknown or malformed values, permits empty command/URL, and does not validate transport shape. The eval still uses obsolete client tokens and says the root audits Claude projections and Cowork gating, contradicting the current root/adapter split. Tests omit merged target resolution, definition equality, malformed fields, unavailable-target severity, and token regressions.

## Candidate improvements

1. Resolve or explicitly mark unavailable the authoritative active mcporter target and compare full canonical targeted definitions, not legacy name sets.
2. Define supported portable fields and transports, diagnosing malformed or unsupported values instead of silently discarding them.
3. Reconcile root and adapter tokens, boundaries, fixtures, and evals without moving projection ownership into the root.
4. Register current MCP and mcporter primary sources and distinguish protocol requirements from house schema.

## Applied changes

The portable source now has one closed, shared parser and source resolver. URL entries require a supported transport for every targeted client; full non-secret definitions replace name-only comparison; absent targets are unavailable rather than clean. The current seventh canonical entry now fails because its client transport mapping is incomplete, which is a truthful external-source finding rather than a reason to weaken the rubric. Current evals replace the retired client-token cases.

## Carry-forward criteria

Canonical inventory validity, generated projection parity, and active runtime availability are separate evidence classes. Name equality against a legacy file proves neither definition equivalence nor live exposure.

## Local evidence

- `skills/environment/ki-binding/SKILL.md`
- `skills/environment/ki-binding/references/standards-cross-surface-binding.md`
- `skills/environment/ki-binding/references/sources.md`
- `skills/environment/ki-binding/scripts/rubric/contexts/binding.ts`
- `skills/environment/ki-binding/scripts/rubric/items/bind.ts`
- `evals/scenarios/ki-binding.ts`
