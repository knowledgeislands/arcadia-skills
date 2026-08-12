# `ki-agora` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 3 remediation is authorised

## Dependency and ownership

`ki-agora` owns portable home and member declarations. `ki` owns registry resolution and reciprocity, while environment owners retain client projection. This narrow split avoids peer writes and makes the registry-versus-consent distinction clear.

The live read-only list, show, and roots commands resolve the configured home, but their output does not expose reciprocal-consent status. No outcome result proves refusal for missing declarations, identity mismatch, role mismatch, duplicate identity, or non-reciprocal projection.

## Mechanical trace and limits

The hosted audit, generated publication, and six focused tests pass. Local checks cover owner identity, purpose, members, roles, membership shape, symlink safety, and no automatic declaration repair.

Material gaps remain:

- GDR-006 requires permitted target-policy categories, while the standard's closed schema allows only homes and memberships and the checker warns on target-policy fields.
- Unknown keys produce warnings even though the contract describes a closed schema.
- Host-side reciprocity, registered owner identity, global uniqueness, malformed peers, duplicate homes, and projection refusal lack end-to-end fixtures.
- Local shape success cannot establish bilateral consent.

## Candidate improvements

1. Reconcile the target-policy field set across GDR, standard, examples, catalogue, publication, checker, and migration evidence.
2. Add disposable multi-repository host fixtures for every agreement and non-agreement state.
3. After schema ownership is settled, make unknown-field handling match the promised closed contract.

## Carry-forward criteria

Decision, schema, examples, inspector, publication, and fixtures must use one exact field set. Bilateral capabilities need host evidence for both agreement and refusal, and output must distinguish registry inventory, approved membership, reciprocal consent, and client projection.

## Local evidence

- `skills/governance/ki-agora/SKILL.md`
- `skills/governance/ki-agora/references/standards-agora.md`
- `skills/governance/ki-agora/references/sources.md`
- `skills/governance/ki-agora/scripts/rubric/contexts/agora.ts`
- `skills/governance/ki-agora/scripts/rubric/contexts/agora.test.ts`
- `docs/decisions/GDR-KI-HARNESS-006-reciprocal-agora-membership.md`
