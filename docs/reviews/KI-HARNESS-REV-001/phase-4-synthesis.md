# Phase 4 synthesis

Phase 4 reviewed all 14 repository-structure skills in dependency order. All approved local remediations are applied; unresolved metadata and identity choices remain owner-gated.

## Reconciled architecture

- Narrow structure deltas remain useful when they add a distinct repository role, build, packaging, serving, or source-state contract.
- Base structure, specialisation, aggregate, generated projection, hosting, and installed runtime are separate evidence layers.
- KB aggregation now excludes unresolved metadata and selected-adapter contracts from aggregate success.
- Website and Cloudflare serving, plugin projection and binding activation, tools and taps, and chezmoi source and rendered targets each need explicit producer-consumer evidence boundaries.

## Cross-cutting findings

1. A clean aggregate audit is not semantic reconciliation; dependency ordering alone cannot prove child schemas, adapters, or identities agree.
2. Generated-package shape, source freshness, installed activation, and runtime availability require separate evidence.
3. Static source or repository shape cannot imply build, deployment, release, installation, rendered-output, or security outcomes.
4. Parent and child skills must assign each deterministic seam to one mechanical owner and compose that result without duplicate or missing coverage.
5. Configuration claims require real parsing, normalized containment, conflict-marker negatives, and exact producer-to-consumer paths.
6. Executing target binaries, package managers, installers, or external validators is not read-only; it requires authority, isolation, and separate environment diagnostics.
7. Applicability declarations, structure detection, host selection, published families, and negative fixtures must expose the same selected-versus-not-applicable behavior.
8. Temporal stability and source freshness need dated longitudinal or current-primary evidence, not one clean present estate.

## Phase boundary decision

Phase 5 may proceed in the existing dependency order. Binding reviews must distinguish canonical inventory from generated client projections and installed runtime state. Tokenomics reviews must distinguish configured attribution from actual context loading and measurement. Phase 4 changes are committed in `13d99a33`, `e7a53a2c`, and `5affff38`.
