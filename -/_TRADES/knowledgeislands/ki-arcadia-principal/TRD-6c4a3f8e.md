---
id: TRD-6c4a3f8e
title: 'Provider-neutral knowledge acquisition architecture'
created_at: 2026-08-23T05:09:18Z
sender: knowledgeislands/ki-agentic-harness
receiver: knowledgeislands/ki-arcadia-principal
kind: knowledge
source_ref: ADR-KI-HARNESS-SKILLS-007
observation: receipt
phase: submitted
---

# TRD-6c4a3f8e: Provider-neutral knowledge acquisition architecture

## Context

The Harness initially recorded the acquisition lifecycle while implementing Claude and Codex provider adapters. The lifecycle applies to every external knowledge source and therefore belongs to Arcadia's Knowledge Islands architecture.

## Submission

Arcadia should retain the provider-neutral acquisition lifecycle and its source, staging, provenance, incremental checkpoint, harvesting, and safe source-retirement boundaries as an architecture decision. The Harness retains only the paired skills and provider-adapter surface that implements that decision.

## Constraints

The retained decision must cover AI sessions, ChatGPT and Granola exports, Slack, email, documents, and future sources without making an MCP the architectural abstraction. It must require faithful capture of available original content and media, declared omissions, and a later verified checkpoint before source archive or deletion.
