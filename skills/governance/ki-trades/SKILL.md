---
name: ki-trades
ki-kind: governance
ki-depends-on: []
ki-shared-dependencies: [ki-skills:rubric]
contributes: ['.ki-config.toml']
owns: ['+/_TRADES/README.md', '-/_TRADES/README.md']
description: >
  Governs typed, directional cross-repository trades between locally registered Knowledge Islands repositories: canonical GitHub repository homes, work and knowledge routes, TRD eight-hexadecimal record identities, immutable sender payload, receiver-only disposition, and release-observed pruning. Use when submitting work or knowledge to another repository, reviewing inbound trades, auditing trade routes or records, or resolving adoption, retention, parking, clarification, decline, or supersession. A route grants visibility only; ki-roadmap and the receiving repository retain priority and acceptance authority.
argument-hint: 'audit <repo> | conform <repo> | educate <repo> | help | refresh'
---

# Knowledge Islands cross-repository trades

This governance skill defines safe **trade submission**, not transfer: a sender may make work or knowledge visible to a willing peer, while the receiver alone decides its disposition and any local follow-on work or knowledge. Read [the trade standard](references/standards-trades.md) before creating or reviewing records; [the generated rubric](references/rubric.md) publishes the mechanical and judgment criteria, and [the source list](references/sources.md) records the contract's provenance.

## What this skill owns

1. **Declared participation** — a repository opts in with its own `ki-trades` table, declaring typed `exports_to` and `imports_from` routes. Its canonical HTTPS GitHub home comes from `ki-repo.repository`.
2. **Directional trade routes** — a route is active only when both repositories are present in the local KI repository registry, the sender exports a trade kind to the receiver, and the receiver imports that same kind from the sender. Missing, malformed, mismatched, ambiguous, or one-sided declarations are findings, never implicit trust.
3. **Trade record identity and placement** — every record uses `TRD-<eight lower-case hexadecimal characters>`, declares `kind: work | knowledge`, and uses the two-level peer layout under the local `+/_TRADES/` or `-/_TRADES/` area. Filenames are validated but never treated as sufficient identity evidence.
4. **Authority boundaries** — the sender writes only its outbound record. The receiver creates and updates only its inbound copy. Sender provenance and body payload remain byte-stable; only receiver-local status, review/disposition rationale, and local adoption, retention, or supersession linkage may differ.
5. **Lifecycle** — an inbound copy starts `received`; work may be `adopted`, while knowledge may be `retained`, and either may be `parked`, `clarify`, `declined`, or `superseded`.
6. **Release observation** — the sender may remove its outbound copy only after `adopted`, `retained`, `declined`, or `superseded`. The receiver may prune inbound only after that release is observable. `parked` and `clarify` retain the sender copy.
7. **Owned scaffold** — when the skill is declared, it owns the two `_TRADES` directories and their README files. `ki-repo` continues to own the generic `+` and `-` directories and README files whether or not this capability is declared.

## Operating modes

The skill carries the universal **AUDIT · CONFORM · EDUCATE · REFRESH** modes. Invoked as `help` / `-h` / `?`, it emits generated HELP and stops. With no recognised mode, it emits the same HELP and, only in an interactive session, offers the mode choice and prompts for the target shown in `argument-hint`.

### Mode AUDIT

Run `ki repo audit --skill ki-trades --repo <repo>`. The structured catalogue validates the local configuration, typed directional routes through the registered-repository inventory, owned scaffold, trade-record identity and shape, sender/receiver authority boundary, allowed status, immutable-copy agreement, and release/pruning observation. Then review whether any proposed local adoption or knowledge retention preserves the receiver's independent authority.

### Mode CONFORM

Run AUDIT first. `ki repo conform --skill ki-trades --repo <repo> --dry-run` may restore only the owned `_TRADES` README scaffold when the generic `+` and `-` areas are safe physical directories. It never creates a route, record, receiver copy, disposition, roadmap item, or cross-repository write. Apply authored record and configuration corrections locally, then re-run AUDIT.

### Mode EDUCATE

Run `ki repo educate --skill ki-trades --repo <repo>` to render the concern and rubric. To participate, declare `ki-repo.repository`, then typed routes in `.ki-config.toml`, ensure the generic working areas exist through `ki-repo`, and scaffold only this skill's `_TRADES` README files. EDUCATE grants no peer authority and creates no trade record.

### Mode REFRESH

REFRESH writes only this skill's canonical files in `ki-agentic-harness`. When invoked from an installed copy, stop and redirect to the harness. Reconcile the standard, structured catalogue, generated rubric, sources, and GDR-KI-HARNESS-005 when the contract changes; confirm before changing the authority or lifecycle model.

## Notes

- `ki-next` may present an inbound record for exact human-confirmed disposition, but cannot infer a disposition or roadmap transition.
- `ki-roadmap` supplies read-only structural and review guidance; it does not write trade records or gain cross-repository priority authority.
- The checker reads only registered repository roots and their public `ki-trades` declarations and records. It never scans for repositories or writes a peer checkout.
- The `ki` host owns execution, findings, publication, and post-conform verification; judgment aspects remain explicitly unevaluated until reviewed.
