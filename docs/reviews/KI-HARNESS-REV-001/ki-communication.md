# `ki-communication` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** retire
- **Change state:** review only; no Phase 3 remediation is authorised

## Dependency and ownership

`ki-communication` declares governance modes but contains only a short `SKILL.md`. It has no configuration activation, references, sources, rubric, checker, publication, tests, fixtures, eval, or results. The host therefore refuses a focused audit and reports no rubric catalogue; those are unavailable operations, not clean evidence.

The concise-writing concern is useful, but transient requests such as “be more concise” should not activate durable governance work. Phase 0 already found no missing capability requiring another standing skill and retired the similarly empty `ki-self` indirection.

## Authority and safety gaps

- Claimed AUDIT, CONFORM, EDUCATE, and REFRESH modes have no native operations, conflicting with the uniform governance-mode decision.
- Its unqualified precedence order makes current-thread input supreme and omits immutable platform/runtime authority.
- “Every stated runtime” is unverifiable because none are stated.
- CONFORM's confirmation promise has no host operation enforcing it.
- Existing instruction, authoring, and runtime owners are not clearly off-ramped.

Current OpenAI guidance supports concise, non-repeated instructions but not this taxonomy. Current Claude guidance demonstrates materially different managed-policy and instruction-loading behavior, so the asserted order is not portable authority.

## Candidate disposition

Retire the orphan governance surface rather than create a guidance-only exception. A future capability should first establish a distinct owner, source-backed runtime boundary, executable modes, negative-path tests, and measured outcome value.

If any precedence guidance survives elsewhere, it must distinguish immutable platform/runtime hierarchy from the narrower ordering among user-controlled personal, repository, and thread guidance.

## Carry-forward criteria

A governance label requires activation, host-visible operations, negative tests, and sources. Transient preferences must not select durable governance. Cross-runtime precedence claims must be scoped below immutable platform authority.

## Local evidence

- `skills/agentic-systems/ki-communication/SKILL.md`
- `docs/decisions/ADR-KI-HARNESS-007-uniform-skill-modes-bare-mode-scripts-and-a-coverage-scoped-aggregate-gate.md`
- `docs/roadmap/KI-HARNESS-REV-001-review-skill-effectiveness.md`
