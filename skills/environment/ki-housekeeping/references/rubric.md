<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-housekeeping

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [SELF — Repository-local companion](#self--repository-local-companion)
- [IDX — Index/file agreement](#idx--indexfile-agreement)
- [FM — Frontmatter](#fm--frontmatter)
- [LINK — Explicitly not checked](#link--explicitly-not-checked)
- [DOC — Content doctrine](#doc--content-doctrine)

## SELF — Repository-local companion

- **SELF-1 [WARN · INSPECT] — Repository-local ki-self payloads**
- **SELF-2 [FAIL · INSPECT] — ki-self payload name**
- **SELF-3 [FAIL · INSPECT] — Runtime payload parity**
- **SELF-4 [J] — Local-concerns contract**
  > The local skill gives its repository an intelligible local-concerns contract: regular work has a repeatable check or procedure; semi-regular human review has a ledger such as `HOUSEKEEPING.md`; one-off work remains on the roadmap; cross-repository patterns graduate to a named shared skill.

## IDX — Index/file agreement

- **IDX-1 [FAIL · INSPECT] — Memory index exists**
- **IDX-2 [FAIL · INSPECT] — Index entries resolve**
- **IDX-3 [WARN · INSPECT] — Memory files are indexed**
- **IDX-4 [WARN · INSPECT] — Index line length**
- **IDX-5 [WARN · INSPECT] — Headroom block markers**
- **IDX-6 [WARN · INSPECT] — Headroom learned entries are local**

## FM — Frontmatter

- **FM-1 [FAIL · INSPECT] — Frontmatter is present**
- **FM-2 [FAIL · INSPECT] — Frontmatter name matches filename**
- **FM-3 [FAIL · INSPECT] — Frontmatter description is present**
- **FM-4 [FAIL · INSPECT] — Frontmatter type is valid**
- **FM-5 [FAIL · INSPECT] — Frontmatter names are unique**

## LINK — Explicitly not checked

- **LINK-1 [WARN · INSPECT] — Unresolved wikilinks are informational**

## DOC — Content doctrine

- **DOC-1 [J] — Content doctrine**
  > `feedback` and `project` memories carry the rule/fact, then a **Why:** line and a **How to apply:** line — not just a bare assertion.
- **DOC-2 [J] — Content doctrine**
  > `project` memories use absolute dates, not relative ones ("2026-03-05", not "Thursday").
- **DOC-3 [J] — Content doctrine**
  > No memory duplicates content that belongs in a `CLAUDE.md` (codebase conventions, file layout, architecture, anything derivable from the repo or git history). Flag promotion candidates instead of leaving them to drift from the code.
- **DOC-4 [J] — Content doctrine**
  > `user`-type memories describe role/preferences/knowledge neutrally — no content that reads as a negative judgment of the user.
- **DOC-5 [J] — Content doctrine**
  > No memory is stale — a `project` memory whose fact or decision has visibly been superseded by current repo state (check against `git log`/current files, not the memory’s own text).
- **DOC-6 [J] — Semantic index ordering**
  > `MEMORY.md` entries are organized semantically by topic, not chronologically.
