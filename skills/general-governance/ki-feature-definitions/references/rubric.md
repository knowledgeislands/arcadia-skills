<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-feature-definitions

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [INDEX — Feature index](#index--feature-index)
- [AREA — Area registration](#area--area-registration)
- [ID — Requirement identity](#id--requirement-identity)
- [REQ — Normative requirement shape](#req--normative-requirement-shape)
- [VERIFY — Verification hooks](#verify--verification-hooks)
- [BEHAVIOUR — Behavioural altitude](#behaviour--behavioural-altitude)
- [AS-BUILT — As-built truth](#as-built--as-built-truth)
- [SPLIT — Requirement focus](#split--requirement-focus)
- [DR-LINK — Decision traceability](#dr-link--decision-traceability)
- [AREA-FIT — Area fit](#area-fit--area-fit)

## INDEX — Feature index

- **INDEX-1 [FAIL · INSPECT] — docs/features/index.md exists**
- **INDEX-2 [FAIL · INSPECT] — index.md contains a populated areas table**

## AREA — Area registration

- **AREA-1 [WARN · INSPECT] — every file named in an areas table exists**
- **AREA-2 [WARN · INSPECT] — every area file is registered**

## ID — Requirement identity

- **ID-1 [FAIL · INSPECT] — requirement headings use canonical IDs**
- **ID-2 [FAIL · INSPECT] — requirement prefixes are registered to their file**
- **ID-3 [WARN · INSPECT] — requirement IDs are unique across the corpus**

## REQ — Normative requirement shape

- **REQ-1 [FAIL · INSPECT] — requirements carry an RFC-2119 keyword**

## VERIFY — Verification hooks

- **VERIFY-1 [WARN · INSPECT] — requirements carry a Verify hook**
- **VERIFY-2 [J] — Verify hooks are concrete and checkable**
  > The `_Verify:_` hook is concrete and checkable — a built-output assertion, a named test, or a linked source symbol — not a restatement of the requirement.

## BEHAVIOUR — Behavioural altitude

- **BEHAVIOUR-1 [J] — requirements describe behaviour**
  > The statement describes behaviour, not rationale (that is a DR) or procedure (that is a guide). A requirement that explains why should move the reasoning to a Decision Record and cite it.

## AS-BUILT — As-built truth

- **AS-BUILT-1 [J] — numbered requirements describe the system today**
  > The numbered requirement is true of the system today. Aspirational or not-yet-built behaviour belongs in `## Gaps`, not in the numbered contract.

## SPLIT — Requirement focus

- **SPLIT-1 [J] — unrelated behaviours use separate IDs**
  > A heading that bundles several unrelated behaviours should split into separate IDs so each verifies independently.

## DR-LINK — Decision traceability

- **DR-LINK-1 [J] — governed requirements cite their Decision Record**
  > A requirement that follows from a recorded decision cites its DR. Absence is not a mechanical failure, but a governed behaviour with no link is a gap in the audit trail from why to what.

## AREA-FIT — Area fit

- **AREA-FIT-1 [J] — requirements fit their area file**
  > Each requirement sits in the area file its prefix belongs to; a requirement that has drifted to the wrong area should move (and, if its behaviour changed area, take a new ID in the right prefix rather than moving the number).
