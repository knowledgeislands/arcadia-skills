---
id: KI-HARNESS-RTP-003
title: Route multi-machine harness state through durable homes
theme: runtime-portability
horizon: future
status: draft
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Put each kind of harness state in the durable home that matches how it must be shared, protected, and recovered.

## Context

Produce a finite routing table or decision record assigning each state class to repository tracking, knowledge-base content, synchronized personal configuration, or intentionally disposable machine-local storage.

## Boundary

Cover project memory, runtime settings and hooks, learned patterns, and caches; create follow-up migrations only for state proven to be in the wrong home.

## Discussion

### Routing test

Each state class needs an explicit durability, sharing, sensitivity, and ownership rationale before the work proposes moving it.

### State inventory

Start from concrete state rather than runtime names: repository source and generated projections; user configuration and installed harness metadata; runtime-local memory, sessions, caches, and logs; personal learned preferences; and durable knowledge-base material. A state class may have more than one representation, but each representation needs one declared canonical home.

### Routing criteria

For each class, assess whether it must survive machine replacement, be shared with collaborators, remain private to one user, be regenerated safely, or contain secrets. Repository tracking is for project-owned source; synchronised personal configuration is for durable user choice; a knowledge base is for maintained knowledge; disposable local storage is for recoverable runtime cache and session state.

### Evidence for promotion

Promotion needs a finite first inventory, an identified contradictory duplicate or misplaced state class, and a decision on whether the outcome is a routing table or a Decision Record. Do not start a broad migration merely because multiple copies exist.
