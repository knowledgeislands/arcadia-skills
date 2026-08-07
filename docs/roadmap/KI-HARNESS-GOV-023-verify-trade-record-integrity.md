---
id: KI-HARNESS-GOV-023
title: Verify trade record integrity
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked-by: [KI-HARNESS-GOV-022]
baseline-ref: 8023f16ce3cedf7505871dbaae0eb33b96bd39e1
---

## Goal

Replace the formatter-exclusion approach to trade-record immutability with a real `ki-trades` criterion that compares a received copy against the sender's copy insensitively to formatting, so integrity is verified rather than merely undisturbed.

## Context

The immutability of a submitted trade record is currently protected by nothing more than a pair of tool exclusions: `+/_TRADES/*/*/TRD-*.md` and `-/_TRADES/*/*/TRD-*.md` appear in `.prettierignore` and in the `ignores` array of `.markdownlint-cli2.jsonc`, both asserted by the `ki-authoring` OWN-1 criterion in `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts`.

That mechanism has two defects. It only avoids touching the files and never verifies them, so a record altered by any other means — a hand edit, a bad merge, a scripted rewrite, an editor's save hook — passes silently, and the guarantee the standard states is entirely unenforced. And its coverage is incomplete: the exclusions cover Prettier and markdownlint but not Biome, so one of the three formatters in this repository's toolchain has no exclusion at all and the protection is partial even on its own terms.

The correct mechanism is a positive check. `ki-trades` already states that audit derives the inbound sender projection by removing only recognised single-line receiver-local fields and compares the remaining raw bytes with the outbound record. That rule needs to become an executed criterion rather than prose, and it needs to be insensitive to formatting so that a difference in wrapping, spacing, or quote style between two honest copies is not reported as tampering while a difference in meaning always is. Once the check exists and passes, the OWN-1 exclusions become redundant defensive clutter and can be removed, because a formatter run that changed a record would then be caught rather than prevented.

Formatting insensitivity must not become a licence to re-conform. A receiver must never rewrite a sender-owned record to satisfy its own local style, so the criterion compares insensitively but never proposes or applies a normalising change to either copy.

## Boundary

This item does not change the trade record format, the phase vocabulary, or the routes. It grants no new cross-repository authority and no write authority anywhere: the rubric already resolves registered peer roots from the local registry to validate routes, and this criterion reads the sender's outbound copy through that same existing path. Where the peer is unregistered or its copy is gone, the result is reported as unavailable. It does not add a conformable write to `ki-trades`, whose only conformable write remains the local owned README scaffold. It does not permit re-conforming, reformatting, or normalising a sender-owned record under any circumstance, and it does not add a Biome exclusion as a substitute for the check.

## Current state

`ki-authoring` OWN-1 asserts the two `_TRADES` glob exclusions in `.prettierignore` and `.markdownlint-cli2.jsonc`, with `SUBMITTED_TRADE_PATHS` and a matching path predicate defined in `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts`. No Biome exclusion exists. `ki-trades` carries rubric families `ADOPTION`, `AUTH`, `CONFIG`, `RECORD`, `RELEASE`, `ROUTE`, `SCAFFOLD`, and `STATUS`; the byte-comparison rule is described in `references/standards-trades.md` under copy and write authority but has no executing criterion. Seven inbound copies exist locally and three outbound copies live in `tools-ki`, so only three trades — `TRD-094f7987`, `TRD-961f5d5a`, and `TRD-aacc8a12` — hold both sides anywhere in the estate. The remaining four inbound copies have no surviving sender copy, their senders having released, so the criterion must report those as unavailable rather than failing them: a released sender is the normal end of a trade's life, not an integrity defect. The comparison also has to normalise `phase` out of both projections once `KI-HARNESS-GOV-022` lands, since a sender copy reading `submitted` and a receiver copy reading `received` are correctly divergent on that field alone.

## Steps

- [x] Specify the comparison in `references/standards-trades.md`: which receiver-local fields are stripped, what formatting insensitivity covers, and that the result is a report, never a repair.
- [x] Add a `ki-trades` rubric criterion in the appropriate family that derives the sender projection from a local inbound copy, compares it against the corresponding outbound copy when one is present locally, and reports a clear unavailable outcome when it is not.
- [x] State explicitly in the criterion's remediation guidance that no receiver-local re-conforming of a sender-owned record is ever the fix, and that a mismatch is escalated rather than normalised.
- [x] Regenerate the `ki-trades` rubric publication and confirm the new criterion appears.
- [x] Run the criterion against the seven local inbound copies and record any pre-existing mismatch as evidence before changing anything.
- [x] Remove the two `_TRADES` glob exclusions from `.prettierignore` and `.markdownlint-cli2.jsonc`, and remove `SUBMITTED_TRADE_PATHS`, its assertions, and its path predicate from the `ki-authoring` OWN-1 criterion and its context module.
- [x] Re-run the full formatter and lint pass plus the new criterion together, proving that formatters now touching the records do not change them in a way the criterion reports.

## Files touched

- `skills/governance/ki-trades/references/standards-trades.md` and `references/rubric.md` — the comparison rule and its regenerated publication.
- `skills/governance/ki-trades/scripts/rubric/items/` — the new criterion.
- `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts` — removal of `SUBMITTED_TRADE_PATHS`, the OWN-1 assertions, and the path predicate.
- `.prettierignore` and `.markdownlint-cli2.jsonc` — removal of the two `_TRADES` glob entries.

## Verify

- `ki repo audit --skill ki-trades` executes the new criterion against the seven local inbound copies and passes clean.
- `ki repo audit --skill ki-authoring` passes clean with no `_TRADES` exclusion asserted anywhere.
- A deliberate meaning-changing edit to a local inbound record's sender projection, made in a scratch working copy, is reported as a mismatch; a whitespace-only difference is not.
- No `_TRADES` glob remains in `.prettierignore`, `.markdownlint-cli2.jsonc`, or the `ki-authoring` context module.
- `bun run test` and `bunx tsc --noEmit` pass.

## Dependencies / blocks

This item is blocked by `KI-HARNESS-GOV-022`. That item migrates ten existing records by adding a phase line to copies whose sender projection is nominally frozen — a sanctioned one-off rewrite. Landing the integrity criterion first would either fail on that migration or force the migration to be exempted, so the criterion is written against the post-migration shape and runs on records already carrying their phase.

Within this item, the criterion blocks the removal of the OWN-1 exclusions: the exclusions come out only after the replacement check exists, executes, and passes, so no window exists in which neither mechanism protects the records.

## Review

The comparison was proven against live records rather than fixtures alone: a whitespace-only edit to an inbound copy is not reported, and a one-word edit to the same copy fails `AUTH-1`. After the exclusions came out, the four inbound copies were formatted for the first time while their `tools-ki` sender copies stayed unformatted, and `ki repo audit --skill ki-trades` still passes — which is the property that made removing the exclusions safe.

Two premises in this item turned out to be wrong and were corrected in place. The byte comparison was already executed, not merely described, so the work was to change how it compares rather than to add a criterion. And the rubric already resolves registered peer roots to validate routes, so reading the sender's copy needed no new cross-repository authority.

`PKG-6` in `ki-engineering` also required the exclusions and was updated with them; it was not named in this item.

## Done

`bun run test` 313 pass, `bunx tsc --noEmit` clean, `ki repo audit` `FAIL=0 WARN=0`.

## Discussion

### Why avoidance is not verification

The current mechanism answers "did our tools touch these files" when the standard's claim is "these bytes are what the sender sent". Those are different assertions and only the second is the one the trade system depends on. An exclusion list is also open-ended in a way a check is not: every new tool added to the toolchain needs its own exclusion, and the missing Biome entry shows how that maintenance fails in practice.

### Formatting insensitivity without normalisation

Insensitivity is a property of the comparison, not of the files. The check tolerates a difference in wrapping or spacing between two honest copies because such a difference carries no meaning; it never resolves that difference by rewriting either copy. A receiver mutating a sender-owned record to satisfy receiver-local lint would destroy exactly the evidence the check exists to prove, which is why the remediation guidance must foreclose it in words rather than leaving it to judgment.

### When the sender copy is absent

Most receivers hold only the inbound copy. The criterion must distinguish "compared and matched" from "no local counterpart to compare against" and never let the second masquerade as the first, since a silent pass on an uncomparable record would reintroduce the defect this item removes.
