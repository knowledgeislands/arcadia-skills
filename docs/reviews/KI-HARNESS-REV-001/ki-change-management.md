# `ki-change-management` effectiveness review

- **Position:** 7 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `3bf21c23b79a64ffdfcde0d504a352978af6d27b` plus current-source discovery on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the small selector and adapter-neutral interface; verify that the selected adapter is declared and resolvable, and clarify abstract versus concrete lifecycle ownership before grading.

## Sources and mechanics

The source record deliberately identifies an on-change, Harness-owned contract and contains no external claim to re-fetch. Current official discovery confirms that the supported trackers have adapter-specific semantics rather than a portable shared implementation: GitHub Issues exposes issue dependencies, sub-issues, fields, labels, and remote operations, while [Linear workflows](https://linear.app/docs/configuring-workflows) are team-specific. These are later adapter-review concerns, not authorities for the selector itself.

`ki repo audit --skill ki-change-management --repo .` passed with `FAIL=0 WARN=0`; the selected `ki-change-management-roadmap` audit also passed. The base skill has no focused test or eval scenario. Its sole mechanical criterion accepts the local table when it has no unknown keys and `adapter` is one of four literals.

## Selection and outcome effectiveness

One explicitly selected source of forward work, no implicit fallback, and one adapter-owned canonical record remove the real ambiguity of parallel local and remote queues. The description clearly routes concrete work to the four adapter owners and CONFORM correctly refuses to invent a selection.

The adapter-neutral interface—capture, queue placement, readiness, delivery and review evidence, closure, and selected pruning—is useful to shared process skills. There is no assisted-versus-baseline evidence for this base skill, but its compact fail-closed selection rule is a defensible house contract.

The current audit overstates assurance. It reports the selector clean after validating only a recognised string; it does not confirm that the named adapter skill is declared, resolvable, applicable, or clean, despite the entrypoint directing the user to perform that check separately.

## Instruction economy and architecture

The 42-line entrypoint and 22-line standard are proportionate. The base should remain a selector and interface, not become a third tracker or absorb adapter procedures.

No new hard dependency or review-order change is warranted. `ki-repo` owns configuration-table semantics, the selector owns the chosen adapter identity and abstract interface, and each adapter owns record identity, storage, authority, conflict behavior, and its concrete lifecycle mapping. The base phrase “shared lifecycle vocabulary” should be clarified as an abstract interface so it does not imply ownership of the roadmap adapter's concrete five-status model.

## Executability and safety

Missing, unknown, or deliberately unselected adapters fail closed; CONFORM creates no tracker or work record; and remote writes remain adapter- and user-authority-bound. The resolution gap creates false assurance rather than an unsafe mutation path.

## Evidence and gaps

There is no focused base test, eval scenario, or historical matrix row. The clean audit proves a literal and table shape only. Missing evidence includes selected-adapter declaration and resolution, applicability, adapter-audit composition, false selection between repository kinds, and assisted-versus-baseline outcome value.

## Proposed remediation

These proposals are not approved implementation:

1. Add a pure selector-resolution helper and focused tests that prove the chosen adapter is declared and resolvable before the selector reports clean; leave adapter-table interpretation to the adapter.
2. Clarify that the base owns an abstract lifecycle interface while each adapter owns its concrete state mapping and record semantics.
3. Add scenarios for absent, unknown, undeclared, inapplicable, and valid adapter selections, including remote alternatives.
4. Preserve the existing order and review each concrete adapter before the shared process skills that claim to consume this selector.

No new skill, agent, or hook is proposed. A small selector-resolution helper within the existing skill is the preferred automation shape.

## Round 5 implications

The next reviews can proceed in the established order. `ki-change-management-roadmap` must test concrete lifecycle ownership rather than attributing it to the base. GitHub Issues must assess its current issue dependency, sub-issue, metadata, and remote-operation surfaces. Linear has a material source-authority issue: [moving an issue between teams creates a new identifier and URL, while old identifiers redirect and remain searchable](https://linear.app/docs/editing-issues). The Linear review must reconcile that behavior with its current stable team-scoped identity claim.
