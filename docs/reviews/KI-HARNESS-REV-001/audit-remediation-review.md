# Audit remediation review

This is the dated remediation follow-through from `KI-HARNESS-REV-001`, implemented by `KI-HARNESS-GOV-009`. It asks one question of every mechanical criterion: is the desired state fully derivable, locally owned, and safely publishable with containment, preservation, dry-run, repeat idempotence, and clean re-audit evidence?

The source-loaded inventory is `skills/keystone/ki-skills/scripts/internal/remediation-inventory.ts`. Its focused test loads every structured catalogue, rejects invalid remediation combinations, and proves that every current report-only criterion is either one of the four deferred candidates below or part of the exhaustive justified-boundary complement. This avoids maintaining a second hand-copied list of 347 criterion identities.

## Dated coverage

| Measure | 2026-08-14 baseline | 2026-08-15 result |
| --- | ---: | ---: |
| Structured catalogues | 45 | 45 |
| Criteria | 633 | 633 |
| Mechanical | 435 | 435 |
| Judgment | 233 | 233 |
| Hybrid | 35 | 35 |
| Automatic | 86 | 88 |
| Diagnostic | 336 | 334 |
| Guarded | 13 | 13 |
| Automatic coverage | 19.8% | 20.2% |

The catalogue count corrects the original roadmap prose from 44 to 45; both the immutable baseline and current source contain 45 catalogues. No criterion or evidence aspect disappeared to improve the rate.

## Candidate dispositions

| Criterion | Disposition | Reason |
| --- | --- | --- |
| `ki-repo/RUNTIMES-2` | Promoted | Exact runtime mapping; native host proposal owns activation. |
| `ki-skills/NAME-1` | Promoted | Valid physical source derives `name` from its directory. |
| `ki-decision-records/FM-3` | GOV-043† | Metadata authority is unresolved. |
| `ki-decision-records/FM-4` | GOV-043† | Metadata authority is unresolved. |
| `ki-decision-records/INDEX-4` | GOV-043† | Needs a preserving owner-specific parser. |
| `ki-engineering/GEN-1` | GOV-044‡ | Needs preserving multi-format parsers. |

† [GOV-043](../../roadmap/KI-HARNESS-GOV-043-conform-decision-record-normalisation.md) waits for GOV-040 before normalising Decision Record metadata and owns the related index parser.

‡ [GOV-044](../../roadmap/KI-HARNESS-GOV-044-conform-generated-surface-exclusions.md) owns the Engineering configuration preservation work.

## Report-only disposition

| Current class | Count | Review outcome |
| --- | ---: | --- |
| Diagnostic candidate | 4 | Deferred above; retained visibly as automation debt. |
| Diagnostic boundary | 330 | Repair needs authorship, policy, external state, or unavailable owner capability. |
| Guarded boundary | 13 | Repair requires explicit human judgment or authority and remains hybrid. |

Every one of the 343 justified boundaries retains non-empty guidance for its actual authorship, ambiguity, safety, external-state, or ownership boundary. The 40 `ki-skills` diagnostics that previously shared a generic sentence now carry criterion-specific guidance. Guarded criteria remain judgment-bearing and expose no conform action.

The two promotions retain the same mechanical evaluation. `NAME-1` writes only a valid physical `SKILL.md`, preserves unrelated bytes, refuses symbolic sources, and becomes a no-op after repair. `RUNTIMES-2` only derives and requests the exact capability names; it cannot write sibling configuration, create links, choose providers, invoke a subprocess, or alter user settings. Host activation and post-CONFORM proof remain receiver-owned.
