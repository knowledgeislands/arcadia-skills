<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-decision-records

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [FILENAME — file and naming checks](#filename--file-and-naming-checks)
- [ROOT — collection-root checks](#root--collection-root-checks)
- [FM — frontmatter checks](#fm--frontmatter-checks)
- [TYPE-FIT — decision classification](#type-fit--decision-classification)
- [BODY — body structure checks](#body--body-structure-checks)
- [INDEX — index checks](#index--index-checks)

## FILENAME — file and naming checks

- **FILENAME-1 [FAIL · INSPECT] — Canonical decision-record filename**
- **FILENAME-2 [WARN · INSPECT] — Unique serial within prefix and scope**
- **FILENAME-3 [WARN · INSPECT] — Contiguous serial series**

## ROOT — collection-root checks

- **ROOT-1 [FAIL · PREPARE] — Adoption root for a new collection**

## FM — frontmatter checks

- **FM-0 [FAIL · INSPECT] — Decision-record frontmatter**
- **FM-3 [FAIL · INSPECT] — Human-readable record type**
- **FM-4 [FAIL · INSPECT] — Decision type metadata**
- **FM-5 [FAIL · INSPECT] — Prefix and decision type alignment**
- **FM-6 [FAIL · INSPECT] — Core decision metadata**

## TYPE-FIT — decision classification

- **TYPE-FIT-1 [J] — Semantic decision classification**
  > Assess whether the filename prefix accurately categorises the decision itself without a stretch fit and whether the body makes the type obvious. Resolve a mismatch with a human, never by mechanically overwriting either side.

## BODY — body structure checks

- **BODY-1 [FAIL · INSPECT] — Canonical heading**
- **BODY-3 [WARN · INSPECT] — No legacy date line**
- **BODY-4 [FAIL · INSPECT] — Required decision sections**
- **BODY-5 [J] — Value-neutral context**
  > Assess whether Context states value-neutral forces rather than advocacy.
- **BODY-6 [J] — Active-voice decision**
  > Assess whether Decision uses active voice.
- **BODY-7 [J] — Substantive sections**
  > Assess whether every required section contains real, non-placeholder substance.
- **BODY-8 [J] — Focused length**
  > Assess whether the body is a focused one to two pages, roughly 200–500 words.
- **BODY-9 [J] — Noun-phrase title**
  > Assess whether the title is a short noun phrase rather than a question or full sentence.
- **BODY-10 [J] — Present-state record**
  > Assess whether the record states the present decision without historic, superseding, forward-looking, parked, or not-yet-started narration.

## INDEX — index checks

- **INDEX-1 [FAIL · PREPARE] — Decision index exists**
- **INDEX-2 [FAIL · DERIVED] — Exactly one index entry per record**
- **INDEX-3 [FAIL · DERIVED] — No stale index entries**
- **INDEX-6 [J] — Reveal order**
  > Assess whether index entries form a sensible from-scratch reveal order with roots before dependents.
- **INDEX-7 [J] — Index gloss alignment**
  > Compare every index gloss with its decision record's heading title, excluding the ID prefix.
- **INDEX-8 [WARN · DERIVED] — Ascending serial reveal order**
