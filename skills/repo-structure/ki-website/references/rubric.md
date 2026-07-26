<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-website

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [WEB — Eleventy website standard](#web--eleventy-website-standard)

## WEB — Eleventy website standard

- **WEB-1 [FAIL · INSPECT] — Eleventy dependency**
- **WEB-2 [WARN · INSPECT] — Eleventy rather than SPA stack**
- **WEB-3 [WARN · INSPECT] — native TypeScript runner**
- **WEB-4 [J] — Nunjucks template engine**
  > Does the configuration use Nunjucks and keep content and template logic in their intended forms?
- **WEB-5 [J] — Lucide icon source**
  > Is Lucide the icon source and is it wired through the intended passthrough/client pattern?
- **WEB-6 [FAIL · INSPECT] — site workspace configuration**
- **WEB-7 [WARN · INSPECT] — roadmap**
- **WEB-8 [J] — workspace declaration**
  > Does the root workspace declaration include `site`?
- **WEB-9 [FAIL · INSPECT] — source layout**
- **WEB-10 [J] — site script prefix**
  > Do site scripts carry the required `site:` prefix?
- **WEB-11 [J] — typed structure data**
  > Does typed `_data` own navigation and ordering rather than repeated template literals?
- **WEB-12 [FAIL · INSPECT] — portable URL transform**
- **WEB-13 [WARN · INSPECT] — TypeScript data extension**
- **WEB-14 [WARN · INSPECT] — JSON5 data extension**
- **WEB-15 [WARN · INSPECT] — Tailwind lifecycle hook**
- **WEB-16 [WARN · INSPECT] — CSS watch target**
- **WEB-17 [J] — configuration helpers**
  > Where the content needs them, do filters and ordered collections use the documented patterns?
- **WEB-18 [FAIL · INSPECT] — config-less Tailwind**
- **WEB-19 [WARN · INSPECT] — Tailwind import pair**
- **WEB-20 [WARN · INSPECT] — token utility exposure**
- **WEB-21 [J] — semantic design tokens**
  > Do semantic tokens and self-hosted fonts follow the standard rather than embedding arbitrary presentation values?
- **WEB-22 [J] — template token use**
  > Do templates consume semantic tokens without hard-coded hex colours?
- **WEB-23 [J] — Markdown content**
  > Are pages Markdown with YAML front matter and grouped into sensible content folders?
- **WEB-24 [J] — folder data cascade**
  > Do cascade data files own repeated folder-level front matter?
- **WEB-25 [J] — JSON5 validation**
  > Where structured JSON5 exists, is it validated during the build and does invalid data stop the build?
- **WEB-26 [WARN · INSPECT] — SEO metadata partial**
- **WEB-27 [J] — site-wide SEO metadata**
  > Does base.njk include seo-meta so all pages receive canonical, Open Graph, and Twitter metadata?
- **WEB-28 [J] — noindex metadata**
  > Does noindex front matter emit robots metadata on intentionally non-indexed pages?
- **WEB-29 [J] — public site discovery assets**
  > Where the site is public, does it ship and scope the required discovery and application assets?
- **WEB-30 [WARN · INSPECT] — site build and development scripts**
- **WEB-31 [WARN · INSPECT] — development script fan-out**
- **WEB-32 [WARN · INSPECT] — site cleanup script**
- **WEB-33 [FAIL · INSPECT] — dist ignore**
- **WEB-34 [J] — portable generated links**
  > Does the built HTML actually contain portable relative internal links?
- **WEB-35 [J] — generated dist boundary**
  > Is dist treated as fully generated build output and never hand-edited?
- **WEB-36 [WARN · INSPECT] — hosting assets directory seam**
- **WEB-37 [J] — volatile facts have one home**
  > Do volatile facts live in package metadata or the standard rather than being scattered through implementation?
- **WEB-38 [J] — current standard**
  > Has Mode REFRESH confirmed the cited sources and updated the review record recently enough?
- **WEB-39 [FAIL · INSPECT] — parseable package manifest**
- **WEB-40 [WARN · INSPECT] — Tailwind CLI dependency**
- **WEB-41 [WARN · INSPECT] — website opt-in**
- **WEB-42 [WARN · INSPECT] — website opt-in validation**
