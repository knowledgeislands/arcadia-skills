---
id: KI-HARNESS-GOV-045
area: GOV
title: Record Agora contract ownership
theme: governance-consistency
horizon: next
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: b6cc3df4c96872371f54afd8246a2a567fa7fae1
---

## Goal

Record and verify the portable Agora contract's ownership, reciprocal declaration boundary, and relationship to local resolution and user-environment projections.

## Context

`ki-agora` already defines portable homes and memberships, while `ki` resolves registered repository identities and a user-environment repository consumes only resolved local paths. The nine current Agoras resolve successfully, but no Harness roadmap item records this cross-repository delivery ownership.

## Boundary

Preserve the existing `ki-agora` declaration schema and reciprocal-consent model. Do not infer a peer membership, write a peer configuration, or make editor targets part of portable declarations.

## Current state

`ki agora list` currently reports nine declared Agoras and one separate system-managed `estate`. `ki-agentic-harness` owns the `ki-all`, `ki-fnd`, and `ki-mcps` homes; the Equal Remedy, HNR, Legal, Personal, Techmedix, and Vallearmonia repositories own the other six homes. All nine resolve their registered owner and member roots locally.

The portable ownership boundary is already normative in `GDR-KI-HARNESS-006`, the `ki-agora` skill, and its Agora standard: repositories own their declarations, the `ki` host owns registry resolution and reciprocal observation, and a user-environment owner may render target-specific state. What remains is to verify that the deployed declarations follow that boundary and retain the evidence in this item without treating the derived estate as a tenth declared Agora.

## Steps

- [x] Enumerate `equalremedy`, `hnr`, `ki-all`, `ki-fnd`, `ki-mcps`, `legal`, `personal`, `techmedix`, and `vallearmonia` with `ki agora show`, recording each registered home, resolved owner root, and resolved member count while keeping `estate` separate.
- [x] Audit `ki-agora` across each named Agora so every locally registered home and non-owner member declaration is checked in its owning repository.
- [x] Compare the observed declarations and resolver behaviour with `GDR-KI-HARNESS-006`, the `ki-agora` skill, and the Agora standard; record one owner each for portable declarations, local registry resolution and reciprocal observation, and target-specific user-environment projection.
- [x] Inspect the resolver's `list`, `show`, and `roots` outputs and the user-environment projection boundary read-only; record mismatches as findings rather than changing a peer declaration, opening a target, or writing application state.
- [x] Retain the audit and ownership evidence in this item's review packet, updating an existing Agora standard or guide only if the comparison exposes a genuine discoverability gap.

## Files touched

- This work item, including its review packet.
- `skills/governance/ki-agora/references/standards-agora.md` only if the audit exposes a missing normative ownership statement.
- An existing Agora-facing guide only if the normative boundary is correct but not discoverable to an operator.

## Verify

- `ki agora list` reports exactly the nine named declared Agoras plus the separate system-managed `estate`.
- `ki agora show <agora>` and `ki agora roots <agora>` succeed for each named Agora and agree on its resolved member count.
- `ki repo --agora <agora> audit --skill ki-agora --concise` passes for each named Agora.
- The retained evidence names repository-local `ki-agora` declarations, the `ki` host, and the user-environment owner as the respective owners of portable declaration, local resolution and reciprocal observation, and target-specific projection.
- `ki repo audit --skill ki-agora --repo .`, `ki repo audit --skill ki-change-management-roadmap --repo .`, and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The existing registered-repository inventory and all nine named home repositories must remain locally resolvable. This item has no roadmap blocker. It authorises read-only inspection of registered peers but no peer-repository mutation, target opening, or application-state write.

## Documentation impact

### Decision Records

No decision record is planned because `GDR-KI-HARNESS-006` already owns the authority choice. A new decision is required only if the audit exposes a real conflict that the existing decision cannot resolve.

### Specifications

The existing `ki-agora` standard remains the portable declaration specification.

### Guides

Update an existing guide only if the normative boundary is correct but not discoverable from the operator-facing capability documentation.

### Roadmap

This item supplies the retained cross-repository delivery evidence required before chezmoi can complete its separately governed local Agora-projection work. It creates no dependency edge because that work is owned outside this repository.

## Review

### Delivered

Against immutable baseline `b6cc3df4c96872371f54afd8246a2a567fa7fae1`, the delivery verified all nine named Agoras without changing a peer declaration, opening a target, or writing application state. `ki agora list` retained the separate protected `estate`; `ki agora show` and `ki agora roots` agreed for every named Agora.

The observed member counts were `equalremedy` 2, `hnr` 1, `ki-all` 16, `ki-fnd` 8, `ki-mcps` 7, `legal` 1, `personal` 2, `techmedix` 1, and `vallearmonia` 2. Overlap between the Knowledge Islands Agoras is intentional and does not duplicate consent.

### Summary of changes

Only this retained work item changed during implementation. The audit confirmed the existing three-owner boundary: each home and member repository owns its portable `ki-agora` declaration; the `ki` host owns registered identity resolution, reciprocal observation, and explicit target opening; chezmoi owns only the machine-local target projections it renders, while Codex Desktop and Claude Desktop retain their app-owned project state.

No Agora standard, guide, peer configuration, resolver source, or user-environment projection needed a change. `GDR-KI-HARNESS-006`, the `ki-agora` skill and standard, and chezmoi's `DOTFILES-UE-005` work item already make the boundary discoverable at their respective governance and operator layers.

### Verification

- `ki agora list` passed and reported nine declared Agoras plus the 27-member system `estate`.
- For every named Agora, `ki agora show <agora>` and `ki agora roots <agora>` passed with identical member counts.
- For every named Agora, `ki repo --agora <agora> audit --skill ki-agora --concise --progress never` passed for every selected repository with no warnings or failures.
- `ki repo audit --skill ki-agora --repo .`, `ki repo audit --skill ki-change-management-roadmap --repo .`, and `ki repo audit --skill ki-authoring --repo .` passed.

### Outstanding concerns

None within GOV-045. Chezmoi's target-specific projection work remains separately governed by `DOTFILES-UE-005` and requires its own lifecycle and acceptance.

### Post-change review

The evidence meets the goal and preserves the approved read-only boundary. The only repository change is the canonical work record, so regression risk is limited to roadmap shape; the Agora, roadmap, and authoring gates cover that risk. The item is ready for acceptance review.

### Mini recap

GOV-045 verified the nine reciprocal Agora declarations, distinguished them from the registry-derived estate, and retained the declaration, resolver, and projection ownership split. All specified gates passed with no concerns. No additional durable learning route is proposed because the existing decision, skill standard, and user-environment work item already own the reusable knowledge.

## Discussion

### Evidence boundary

This is a verification and ownership-recording delivery, not a new governance choice or resolver implementation. The durable evidence belongs in this retained work item and its review packet unless comparison with the existing standard exposes a concrete documentation gap.

The live inventory distinguishes nine intentional reciprocal Agoras from the protected registry-derived `estate`. Reporting ten entries without preserving that distinction would incorrectly turn registry inclusion into named Agora consent.
