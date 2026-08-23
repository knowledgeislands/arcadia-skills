---
id: KI-HARNESS-GOV-047
title: Classify open trade routes
area: GOV
theme: governance-consistency
horizon: future
status: draft
candidate: true
blocks: []
blocked_by: []
baseline_ref: null
---

# KI-HARNESS-GOV-047: Classify open trade routes

## Goal

Let a trade route state which kinds and subtypes it is willing to exchange, including a bounded open policy, without requiring placeholder trade records or weakening the authority of an actual submission.

## Context

The current route and record model distinguishes only `work` and `knowledge`. Those top-level kinds correctly carry different lifecycle semantics, but they are too coarse for a repository that wants to accept only selected material from another authority. Both kinds may need a subtype: knowledge could distinguish an operating practice, configuration pattern, research finding, or publication candidate; work could distinguish implementation, documentation, migration, or review. These are examples to test the model, not an approved closed vocabulary.

A standalone source repository should remain authoritative for its own subject while a principal, publication persona, or public website selectively consumes suitable material. The route should express that standing eligibility. An individual trade record should still identify the particular submission, provenance, constraints, receipt, and receiver disposition.

## Boundary

Retain `work` and `knowledge` as the top-level lifecycle kinds unless evidence shows their lifecycle distinction is wrong. A subtype must not silently change observation, release, direct-application, adoption, or retention rules.

An open route means the sender may prepare or submit an eligible subtype without first changing route configuration. It does not mean automatic transfer, peer writes, receipt, review, acceptance, retention, implementation, publication, or priority. Reciprocal route activation and receiver authority remain mandatory.

Do not make every repository adopt one universal content taxonomy merely to participate. Any wildcard or open expression must be bounded by kind, explicit, mechanically unambiguous, compatible with default-deny routes, and safe to remove while records depend on it.

## Discussion

### Questions to resolve

- Decide whether every record requires a subtype, whether routes select subtypes per top-level kind, and whether subtype identifiers are a shared vocabulary, repository-qualified vocabulary, or a combination.
- Define how exact subtype grants, bounded wildcards, and fully open grants compose without ambiguous precedence or accidental cross-kind permission.
- Establish whether route discovery can explain why a proposed record is eligible before preparation or submission.
- Preserve compatibility for existing `export = ["work", "knowledge"]` and `import = [...]` declarations and existing records that have no subtype.
- Decide how a receiver records that retained knowledge became a private synthesis, public approach, persona-specific publication, or another canonical local form without giving the sender publication authority.

### Required examples

Before promotion, model at least:

- a configuration repository exporting selected operating practices to a private principal;
- the same source offering publication candidates to a public persona or website while withholding unrelated private knowledge;
- a work route accepting documentation or review but not implementation or migration;
- an open knowledge route that still requires one explicit trade submission and receiver disposition per exchanged item.

### Contract and implementation surfaces

The shaped outcome must identify the required changes to `GDR-KI-HARNESS-005`, the `ki-trades` standard, record schema, route configuration, rubric, fixtures, migration guidance, and capability documentation. Harness owns the portable contract; any `tools-ki` parsing, discovery, or execution change remains separately bounded receiver-owned implementation work rather than being smuggled into this record.

### Promotion conditions

Promote only when the subtype ownership model, open-route semantics, compatibility rule, removal safety, and at least one default-deny representation are concrete enough to test without inventing receiver authority or automatic transport.
