<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-kb

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [ZONE — zone layout](#zone--zone-layout)
- [CONFIG — KB configuration](#config--kb-configuration)
- [ADMIN — Admin zone](#admin--admin-zone)
- [ROUTE — routing and placement](#route--routing-and-placement)
- [NOTE — note conventions](#note--note-conventions)
- [MEM — memory cascade](#mem--memory-cascade)
- [LINK — base linking](#link--base-linking)

## ZONE — zone layout

- **ZONE-1 [FAIL · INSPECT] — required zone layout**
- **ZONE-2 [WARN · INSPECT] — same-name zone indexes**
- **ZONE-3 [FAIL · INSPECT] — root memory index**
- **ZONE-4 [WARN · INSPECT] — staging areas are not zones**
- **ZONE-5 [FAIL · INSPECT] — produced outputs use outbound staging**

## CONFIG — KB configuration

- **CONFIG-1 [WARN · INSPECT] — known scalar configuration keys**
- **CONFIG-2 [WARN · INSPECT] — non-redundant zone aliases**
- **CONFIG-3 [WARN · INSPECT] — canonical zone alias keys**
- **CONFIG-4 [WARN · INSPECT] — KB configuration boundary**
- **CONFIG-5 [WARN · INSPECT] — declared preflight paths**

## ADMIN — Admin zone

- **ADMIN-1 [WARN · INSPECT] — optional Admin subdivisions**
- **ADMIN-2 [WARN · INSPECT] — governance charter**
- **ADMIN-3 [WARN · INSPECT] — governance conformance record**

## ROUTE — routing and placement

- **ROUTE-1 [J] — notes follow the routing test**
  > Does each sampled note sit in the zone selected by the routing test?

## NOTE — note conventions

- **NOTE-1 [FAIL · INSPECT] — declared required frontmatter**
- **NOTE-1a [FAIL · INSPECT] — well-formed frontmatter fences**
- **NOTE-1b [WARN · INSPECT] — snake_case frontmatter keys**
- **NOTE-2 [J] — note naming convention**
  > Do note names follow the base-specific naming convention?
- **NOTE-3 [J] — source and analysis distinction**
  > Are facts sourced and analysis labelled according to the base convention?

## MEM — memory cascade

- **MEM-1 [J] — active-Pillar memory accuracy**
  > Does the memory index accurately list active Pillars?
- **MEM-2 [WARN · INSPECT] — always-loaded memory cascade anchor**

## LINK — base linking

- **LINK-1 [J] — Obsidian note linking**
  > Do sampled base notes use the prescribed Obsidian wikilink convention?
