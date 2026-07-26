<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-authoring

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [MD — Markdown authoring](#md--markdown-authoring)
- [OWN — owned authoring configuration](#own--owned-authoring-configuration)
- [TOML — TOML formatting](#toml--toml-formatting)
- [SYNC — convention synchronisation](#sync--convention-synchronisation)

## MD — Markdown authoring

- **MD-mech [FAIL · INSPECT] — Markdown mechanical gate passes**
- **MD-table [J] — wide tables are reshaped**
  > Are wide or prose-heavy tables reshaped according to the Markdown convention?
- **MD-footnote [J] — table footnotes use the house marker series**
  > Do table footnotes use the documented marker series and paragraph layout?
- **MD-link [J] — house-file links are descriptive and portable**
  > Are the links descriptive, relative Markdown links where this convention applies?
- **MD-cell-prose [J] — tables avoid descriptive prose in cells**
  > Do table cells avoid long descriptive prose?
- **MD-callout [J] — callouts use a supported GitHub alert deliberately**
  > Are callouts supported GitHub alerts, concise, and reserved for genuine contextual asides?

## OWN — owned authoring configuration

- **OWN-1 [WARN · INSPECT] — owned authoring configuration matches the house templates**

## TOML — TOML formatting

- **TOML-keys [J] — TOML keys are concise lowercase nouns**
  > Are TOML keys concise lowercase nouns, using snake_case for multiple words?
- **TOML-values [J] — TOML values use the house formatting**
  > Do TOML strings and short lists follow the house formatting?
- **TOML-tables [J] — TOML uses one table per skill**
  > Does the TOML use one table per skill with nested subtables where appropriate?
- **TOML-comments [J] — non-obvious TOML keys explain their rationale**
  > Do non-obvious TOML keys carry a preceding rationale comment?

## SYNC — convention synchronisation

- **SYNC-1 [J] — conventions, rubric, and source record agree**
  > Do the convention references, rubric publication, and source record agree?
