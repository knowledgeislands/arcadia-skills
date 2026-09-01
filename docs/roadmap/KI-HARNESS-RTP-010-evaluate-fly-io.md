---
id: KI-HARNESS-RTP-010
title: Evaluate Fly.io hosting
area: RTP
theme: runtime-portability
horizon: future
status: draft
candidate: true
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Evaluate whether Fly.io offers a useful execution or hosting surface for Knowledge Islands workloads.

## Context

[Fly.io](https://fly.io/) now presents both general-purpose Machines and agent-focused Sprites, including durable filesystem, checkpoint, connector, private-networking, routing, and monitoring capabilities. These are provider claims to investigate rather than an adoption decision.

## Boundary

Do not create an account, provision infrastructure, incur spend, or introduce a Fly.io dependency while this remains an investigation. Keep general service hosting, ephemeral agent execution, durable agent workspaces, and remote-development needs distinct.

## Discussion

### Evaluation questions

Determine which concrete KI workload, if any, Fly.io would improve over current local, personal-server, or existing cloud patterns. Examine isolation, state persistence and recovery, credential and egress controls, regional placement, deployment and automation surfaces, observability, pricing, operational burden, and portability away from provider-specific services.

### Promotion evidence

Before promoting beyond Future, name one bounded workload and its current constraint, the Fly.io product surface proposed for it, a comparison baseline, an acceptable cost and trust boundary, and a reversible proof with explicit pass, fail, and cleanup criteria.
