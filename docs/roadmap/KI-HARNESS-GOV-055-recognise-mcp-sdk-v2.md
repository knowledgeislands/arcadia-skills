---
id: KI-HARNESS-GOV-055
area: GOV
title: Recognise MCP SDK v2
theme: governance-consistency
horizon: future
status: draft
candidate: true
blocks: []
blocked_by: []
baseline_ref: null
---

# Recognise MCP SDK v2

## Goal

Discuss correcting repository governance so supported MCP SDK v2 servers are recognised as genuine `ki-repo-mcp` adopters.

## Context

The estate audit reported `COV-1` against `mcp-git-audit` because the coverage cascade recognises only the legacy `@modelcontextprotocol/sdk` package. The MCP server standard already supports the modern `@modelcontextprotocol/server` v2 profile, so the warning is a detector mismatch rather than a stale opt-in.

## Boundary

Do not migrate MCP implementations, alter protocol profiles, or weaken stale-adoption detection.

## Discussion

Confirm that the coverage detector and its documented evidence label should accept either supported package, then add focused fixtures proving legacy, modern, missing, and conflicting dependency cases.
