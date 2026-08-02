---
id: KI-HARNESS-OPS-001
title: Complete the approved Claude-state cleanup
theme: operations
horizon: waiting-for
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Safely remove the exact approved stale Claude state once the required housekeeping access is available.

## Context

When destructive housekeeping access is available, refresh the live inventory, review candidates, and prune only the approved stored sessions and telemetry.

## Boundary

Do not preserve stale counts as a target or broaden cleanup beyond the reviewed set.

## Discussion

### Return condition

Resume only when destructive housekeeping access is available and a refreshed inventory can be presented for exact approval before deletion.
