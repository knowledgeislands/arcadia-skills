---
id: KI-HARNESS-GOV-033
title: Define Agora membership
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 8769800ab502a0f357933465bb105e89a1defee8
---

## Goal

Define one portable, reciprocal Agora-membership contract that repositories can declare and local tooling can verify. An Agora must express its purpose and approved members without encoding any person's machine paths or editor state.

## Context

Existing `.ki-agora` profiles are user-local Zed collections of absolute paths. They cannot express an Agora's portable home, member consent, or target policy. This blocks the `tools-ki` resolver and validator in [CLI-018](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/KI-TOOL-CLI-018-decouple-agora-editor-targets.md), and the user-environment projections planned by [DOTFILES-UE-005](https://github.com/krisb/dotfiles/blob/main/docs/roadmap/DOTFILES-UE-005-use-source-rooted-codex-projects.md).

The membership contract is cross-repository governance. It belongs in the Harness rather than in a CLI-local schema: an Agora home must approve a member, and the member must independently consent with the same home identity and role. `tools-ki` will resolve registered canonical repository identities to physical roots and validate that agreement after this contract is accepted.

## Boundary

Do not change any peer repository configuration, local `tools-ki` resolver, Dotfiles projection, legacy `.ki-agora` profile, target application database, or editor workspace in this item. Those are separately owned follow-on changes after the contract is accepted and the user has approved the initial Agora vocabulary and membership set.

## Current state

No Harness skill owns Agora membership. The current portable `ki-repo` contract defines repository identity and Knowledge Base store roles, but deliberately does not define cross-repository collection membership. Current local profiles cover only path-based Zed projects; the Dotfiles comparison identifies 25 distinct existing repository paths alongside independently managed source stores.

## Steps

- [ ] Define a dedicated `ki-agora` governance capability, including its ownership boundary, configuration vocabulary, standard, rubric, and generated publication.
- [ ] Specify the Agora-home declaration: stable Agora ID, purpose, target-policy categories, and approved canonical repository members with their roles.
- [ ] Specify the member declaration: Agora ID, canonical home repository identity, and role; permit a repository to belong to multiple Agoras.
- [ ] Define reciprocal validation: canonical HTTPS identities, duplicate and collision handling, agreement rules, and the diagnostic boundary between portable contract validation and tools-ki local path resolution.
- [ ] Define target-policy categories for Zed multi-root projection, VS Code workspace projection, source-root trust by supported client, and no projection; do not choose the initial Agora set or memberships in the portable standard.
- [ ] Add contract fixtures and verification to the Harness, then prepare the contract for explicit acceptance before any consumer or peer migration begins.
- [ ] After acceptance, hand off the local resolver and validator to CLI-018, the machine-local projections to DOTFILES-UE-005, and each approved member declaration to its owning repository for incremental delivery.

## Files touched

- A new Harness-owned `ki-agora` capability and its standard, rubric, fixtures, and generated publication.
- This roadmap item, including the accepted handoff and migration evidence.

No other repository is changed by this item.

## Verify

- The published contract distinguishes a portable canonical repository identity from a user-local physical path and target application state.
- A home/member pair can be validated as reciprocal; missing, conflicting, duplicate, or non-canonical declarations fail clearly.
- A member can declare more than one Agora without an exclusivity rule.
- The standard assigns local registered-path resolution and portable-declaration validation to their respective owners without overlap.
- Harness contract tests, TypeScript, formatting, and the relevant `ki` governance audits pass.

## Dependencies / blocks

The portable repository identity and Knowledge Base store-role contract is already accepted. This item needs user approval of its ready plan before implementation, then explicit acceptance before CLI-018, DOTFILES-UE-005, or a peer repository changes configuration.

## Discussion

### Registry and the full local estate

The local registry remains the authoritative inventory of every registered canonical KI repository: canonical HTTPS identity, local repository key, and physical root. It is not itself a portable Agora membership declaration.

`tools-ki` may expose one protected, system-managed estate projection derived from that full registry, so a user can select every registered local repository without manually maintaining a path list. Named Agoras remain portable, reciprocal selections over that inventory; they are not required to include every registered repository, and external source stores never become registry members merely because a target opens them alongside a Knowledge Base.

### Ownership sequence

Harness defines and accepts the portable contract first. `tools-ki` then consumes it for local resolution and reciprocal validation. Dotfiles consumes verified results only for supported target projections. Each member repository changes its own declaration incrementally after the contract, vocabulary, home, role, and migration scope are approved.

### Target policy

The portable contract records the target-policy categories that an Agora permits; it does not write any target application's internal state. A user-local projection owner decides how to render the supported policy for Zed, VS Code, and source-root trust, and preserves any app-owned state outside that boundary.
