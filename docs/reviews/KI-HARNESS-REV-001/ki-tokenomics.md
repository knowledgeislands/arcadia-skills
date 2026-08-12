# `ki-tokenomics` effectiveness review

- **Review state:** complete; grade `F` approved on 2026-08-12
- **Disposition:** revise
- **Change state:** approved Phase 5 remediation applied in `a28cf057`; current evals applied in `18033a58`
- **Identity:** position 46 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-tokenomics` retains a sound portable-policy and runtime-adapter split: purpose, taxonomy, and config live here; measured surfaces, attribution, and effective models belong to adapters. Current primary sources support finite curated context and progressive disclosure, but not the house `chars / 4`, fixed budgets, four tiers, warning policy, or Headroom choices.

## Mechanical trace and limits

Five tests, publication sync, type-checking, and focused audit pass. The portable host safely validates selected configuration without reading runtime state, user files, or secrets.

Non-table `budgets` and `model_tier_bindings` silently normalize to empty objects and pass, contradicting required table shape. More fundamentally, `POL-1`, `POL-2`, and `POL-3` unconditionally pass claims about budget policy, model taxonomy, and routing without receiving counts, surfaces, adapters, attribution, overages, or an effective model. Those are policy declarations, not observed outcomes.

All three evals encode retired Claude/Headroom, `claude-api`, and `--no-user` behavior. Existing tests omit malformed nested tables, unknown keys, arithmetic, adapter absence, attribution, privacy, and assisted value. Numeric guide-rails have no calibration evidence.

## Candidate improvements

1. Fail closed when nested configuration values are not tables, with scalar, array, unknown-key, and valid fixtures.
2. Relabel results as declared policy or explicit adapter-required/unavailable evidence; retain measurement and attribution in adapters.
3. Replace retired evals with portable config and adapter-routing cases, adding adapter outcome/privacy scenarios only after review.
4. Reconcile stale decision references and label numeric budgets and character conversion as provisional house guide-rails.

## Applied changes

Malformed nested policy tables now fail closed. Policy outcomes are informational declarations rather than passes for measurement, effective model, or attribution. The shared evals now exercise schema failure, declared-versus-observed evidence, and runtime privacy boundaries instead of retired Claude and Headroom behavior.

## Carry-forward criteria

A portable policy validator may pass only declared configuration and publication evidence. Measurement, budget status, attribution, ownership routing, and effective model require observed adapter evidence; absence is unavailable, not pass.

## Local evidence

- `skills/environment/ki-tokenomics/SKILL.md`
- `skills/environment/ki-tokenomics/references/standards-tokenomics.md`
- `skills/environment/ki-tokenomics/scripts/rubric/contexts/tokenomics.ts`
- `skills/environment/ki-tokenomics/scripts/rubric/items/index.test.ts`
- `evals/scenarios/ki-tokenomics.ts`
- `docs/decisions/ADR-KI-HARNESS-009-portable-model-types-not-vendor-model-names-in-governance-config.md`
