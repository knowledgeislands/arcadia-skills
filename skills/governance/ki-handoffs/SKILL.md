---
name: ki-handoffs
ki-depends-on: []
ki-shared-dependencies: [ki-skills:rubric]
contributes: ['.ki-config.toml']
owns: ['+/_HANDOFFS/README.md', '-/_HANDOFFS/README.md']
description: >
  Governs cross-repository handoff submissions between locally registered Knowledge Islands repositories: canonical owner/repo identities, reciprocal peer routes, HND UUID-shaped record identity, immutable sender payload, receiver-only disposition, and release-observed pruning. Use when submitting work to another repository, reviewing inbound handoffs, auditing handoff routes or records, or resolving adoption, parking, clarification, decline, or supersession. Triggers: "submit a cross-repo handoff", "review inbound handoffs", "audit handoff routes", "adopt this handoff", "can I prune this handoff". A route grants visibility only; ki-roadmap and the receiving repository retain priority and acceptance authority.
argument-hint: 'audit <repo> | conform <repo> | educate <repo> | help | refresh'
---

# Knowledge Islands cross-repository handoffs

This governance skill defines safe **submission**, not transfer: a sender may make a proposal visible to a willing peer, while the receiver alone decides its disposition and any local follow-on work. Read [the handoff standard](references/standards-handoffs.md) before creating or reviewing records; [the generated rubric](references/rubric.md) publishes the mechanical and judgment criteria, and [the source list](references/sources.md) records the contract's provenance.

## What this skill owns

1. **Declared participation** — a repository opts in with its own `ki-handoffs` table, containing one canonical lower-case `owner/repo` `identity` and a lexically ordered, duplicate-free `peers` list. The skill validates only this table.
2. **Reciprocal routes** — a peer route is active only when both repositories are present in the local KI repository registry, their declared identities match, and each names the other. Missing, malformed, mismatched, ambiguous, or one-sided declarations are findings, never implicit trust.
3. **Handoff identity and placement** — every record uses `HND-<lower-case UUID-shaped identifier>` and the two-level peer layout under the local `+/_HANDOFFS/` or `-/_HANDOFFS/` area. Filenames are validated but never treated as sufficient identity evidence.
4. **Authority boundaries** — the sender writes only its outbound record. The receiver creates and updates only its inbound copy. Sender provenance and body payload remain byte-stable; only receiver-local status, review/disposition rationale, and local adoption or supersession linkage may differ.
5. **Lifecycle** — an inbound copy starts `received`, then the receiver may set `adopted`, `parked`, `clarify`, `declined`, or `superseded`. Adoption does not create, prioritize, implement, or accept a roadmap item.
6. **Release observation** — the sender may remove its outbound copy only after `adopted`, `declined`, or `superseded`. The receiver may prune inbound only after that release is observable. `parked` and `clarify` retain the sender copy.
7. **Owned scaffold** — when the skill is declared, it owns the two `_HANDOFFS` directories and their README files. `ki-repo` continues to own the generic `+` and `-` directories and README files whether or not this capability is declared.

## Operating modes

The skill carries the universal **AUDIT · CONFORM · EDUCATE · REFRESH** modes. Invoked as `help` / `-h` / `?`, it emits generated HELP and stops. With no recognised mode, it emits the same HELP and, only in an interactive session, offers the mode choice and prompts for the target shown in `argument-hint`.

### Mode AUDIT

Run `ki repo audit --skill ki-handoffs --repo <repo>`. The structured catalogue validates the local configuration, reciprocal routes through the registered-repository inventory, owned scaffold, record identity and shape, sender/receiver authority boundary, allowed status, immutable-copy agreement, and release/pruning observation. Then review whether any proposed local adoption preserves the receiver's independent roadmap, priority, implementation, and acceptance authority.

### Mode CONFORM

Run AUDIT first. `ki repo conform --skill ki-handoffs --repo <repo> --dry-run` may restore only the owned `_HANDOFFS` README scaffold when the generic `+` and `-` areas are safe physical directories. It never creates a route, record, receiver copy, disposition, roadmap item, or cross-repository write. Apply authored record and configuration corrections locally, then re-run AUDIT.

### Mode EDUCATE

Run `ki repo educate --skill ki-handoffs --repo <repo>` to render the concern and rubric. To participate, declare the repository's own identity and peer list in `.ki-config.toml`, ensure the generic working areas exist through `ki-repo`, and scaffold only this skill's `_HANDOFFS` README files. EDUCATE grants no peer authority and creates no handoff record.

### Mode REFRESH

REFRESH writes only this skill's canonical files in `ki-agentic-harness`. When invoked from an installed copy, stop and redirect to the harness. Reconcile the standard, structured catalogue, generated rubric, sources, and GDR-KI-HARNESS-005 when the contract changes; confirm before changing the authority or lifecycle model.

## Notes

- `ki-next` may present an inbound record for exact human-confirmed disposition, but cannot infer a disposition or roadmap transition.
- `ki-roadmap` supplies read-only structural and review guidance; it does not write handoff records or gain cross-repository priority authority.
- The checker reads only registered repository roots and their public `ki-handoffs` declarations and records. It never scans for repositories or writes a peer checkout.
- The `ki` host owns execution, findings, publication, and post-conform verification; judgment aspects remain explicitly unevaluated until reviewed.
