---
id: KI-HARNESS-FND-005
title: Review the Cloudflare agent-setup prompt
theme: foundation-tooling
horizon: next
status: acceptance
blocks: []
blocked-by: []
baseline-ref: 31cc6e4ba6d1454175626c8d3b27a4667a198fca
---

## Context

Review Cloudflare's [agent-setup prompt](https://developers.cloudflare.com/agent-setup/prompt.md) as a tracked source for the Cloudflare skill.

## Boundary

Adopt only parts that improve current safe Cloudflare work; retain Knowledge Islands ownership and judgment rather than following the prompt wholesale.

Do not install Cloudflare plugins, skills, MCP servers, OAuth configuration, or any user-level tool automatically.

Do not turn Cloudflare's agent-specific setup instructions into a universal KI runtime contract.

## Current state

The current [Cloudflare agent-setup prompt](https://developers.cloudflare.com/agent-setup/prompt.md) recommends global skills installation and several remote MCP endpoints, with distinct instructions for Claude Code, Codex, and other agents.

It also instructs an agent to execute setup itself rather than asking the user, which conflicts with KI's authority and external-change boundaries.

`ki-website-cloudflare` governs only static-site Workers hosting; its current source list contains the Workers platform sources needed for that standard and no generic agent-environment source.

## Steps

1. [x] Read the current prompt and classify each directive by concern: hosting convention, general Cloudflare capability, agent-local skill installation, MCP registration, OAuth or external coordination, and completion/reporting language.
2. [x] Compare every potentially useful directive with the existing `ki-website-cloudflare`, `ki-binding`, `ki-mcp`, `ki-bootstrap`, and runtime-specific binding boundaries.
3. [x] Record the adoption decision in the narrowest appropriate canonical source: retain only source material that improves an existing KI-owned standard; explicitly record non-adoption where the prompt is agent-specific, requires external authority, or falls outside static-site hosting.
4. [x] If a current Cloudflare hosting rule gains material evidence, update its source list and normative wording together; otherwise leave the hosting standard unchanged and record the rationale in the item acceptance evidence.
5. [x] Update only the relevant public guidance or off-ramp when the review exposes a misleading ownership boundary.
6. [x] Run the applicable skill, authoring, and link checks, then present the evidence and adoption decision for acceptance.

## Files touched

- `skills/websites/ki-website-cloudflare/references/sources.md` only if the prompt becomes a material tracked source
- `skills/websites/ki-website-cloudflare/` only for an evidence-backed hosting-boundary change
- `skills/environment/ki-binding/`, `skills/agentic-systems/ki-mcp/`, or `skills/keystone/ki-bootstrap/` only when the review identifies a concrete owner-aligned correction
- relevant public guidance only when an existing statement misroutes Cloudflare setup work

## Verify

- Every reviewed prompt directive is classified as adopted, explicitly not adopted, or routed to a named owner.
- No user-level plugin, remote MCP, OAuth, or external setup occurs during the review.
- Any normative harness change is supported by the official prompt and remains within the receiving skill's boundary.
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- relevant generated rubric publication verification when a structured catalogue changes.

## Dependencies / blocks

This item is independent of FND-003.

It needs only the current public Cloudflare prompt and existing canonical skill boundaries; no Cloudflare account, deployment, or runtime installation is required.

## Delegation

Use a bounded research pass to classify the official prompt against the named ownership boundaries.

The orchestrator makes the adoption judgment, reviews any source or standard change, and verifies that no setup action escaped the review boundary.

## Acceptance

### Delivered

Reviewed the current Cloudflare agent-setup prompt and classified every directive against the existing KI ownership boundaries.

### Summary of changes

No canonical skill, source-list, binding, MCP, bootstrap, or public-guidance file changed.

The prompt is agent-local provisioning guidance, not evidence for the Workers + Static Assets hosting standard.

### Verification

- Re-fetched the official prompt on 2026-07-29.
- Confirmed `ki-website-cloudflare` governs only static-site Workers hosting and tracks only Assets, Wrangler configuration, and Pages-to-Workers platform sources.
- Confirmed `ki-binding` owns canonical MCP inventory while runtime adapters own native configuration writes; `ki-mcp` governs server code, not client registration.
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`

### Outstanding concerns

No change is warranted.

Any future Cloudflare skill or MCP adoption needs a separate explicit user-scope and trust decision through `ki-binding` and the relevant runtime adapter.

### Mini recap

The prompt’s instruction to self-execute, third-party global skill installation, remote MCP registration, OAuth/login, runtime restart, and completion box are all non-adopted.

No setup action occurred.

## Discussion

### Adoption threshold

Only guidance supported by the current Cloudflare platform contract and compatible with the existing skill boundary should graduate into the canonical source set.

### Readiness rationale

The source is public and its immediate authority hazards are already clear: broad agent-local installation, remote MCP registration, OAuth, and an instruction to self-execute.

The implementation can therefore be a bounded review with an explicit no-action default, rather than an exploratory setup exercise.

### Adoption decision

Reviewed the Cloudflare agent-setup prompt on 2026-07-29.

It provides agent-local skill and MCP provisioning only, not evidence for Workers + Static Assets hosting.

No directive is adopted.
