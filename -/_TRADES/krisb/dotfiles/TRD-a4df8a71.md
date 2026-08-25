---
id: TRD-a4df8a71
title: Register official Granola MCP
created_at: 2026-08-25T18:41:35Z
sender: knowledgeislands/ki-agentic-harness
receiver: krisb/dotfiles
kind: work
source_ref: KI-HARNESS-OPS-006
observation: decision
phase: submitted
---

# TRD-a4df8a71: Register official Granola MCP

## Context

Granola publishes an official Streamable HTTP MCP endpoint at `https://mcp.granola.ai/mcp` with browser OAuth and read-only meeting tools. The installed mcporter supports that transport, OAuth, schema inspection, generated clients, and CLI calls. `KI-HARNESS-OPS-006` selects the official endpoint as the first capability candidate for governed Granola acquisition, but the mcporter target is rendered from the `krisb/dotfiles` chezmoi source and must be changed by its owning repository rather than hand-edited from Harness.

The official documentation currently names `query_granola_meetings`, `list_meeting_folders`, `list_meetings`, `get_meetings`, `get_meeting_transcript`, and `get_account_info`. Access varies by Granola plan and active workspace, so registration alone does not prove complete-history acquisition fidelity.

## Submission

Register the official Granola MCP in the canonical chezmoi-managed KI binding source, targeting mcporter, and render it into the managed mcporter configuration. Keep OAuth credentials in mcporter's credential store rather than chezmoi data or templates. Authenticate interactively, inspect the live tool schemas, and prove read-only calls for account identity, folders, meetings, meeting details, and transcripts where entitled.

Record whether the live surface provides complete pagination, unfoldered discovery, stable meeting identity, source URLs, creation and update timestamps, folder and participant evidence, generated notes, raw transcripts, attachment or media references and bytes, and reliable changed-meeting indicators. Return the capability findings to `KI-HARNESS-OPS-006`; do not create a local Granola MCP wrapper unless an evidenced normalization or checkpoint gap requires one.

Inventory other Granola MCP definitions visible to chezmoi or imported by mcporter. Make the official mcporter binding the canonical CLI path, remove only exact duplicate definitions owned by the chezmoi repository, and report external connectors or application-managed integrations for explicit manual disablement rather than mutating them indirectly.

## Constraints

Do not hand-edit `~/.mcporter/mcporter.json`; change its chezmoi source and review `chezmoi diff` before applying. Store no bearer token, OAuth credential, meeting content, transcript, or other secret in Git. Do not call any Granola mutation operation, change a folder, tag, note, or meeting, archive or delete source material, automate browser interaction, create a sibling repository, or alter a non-chezmoi integration without separate authority.

Verify the binding with the declared `ki-binding`, `ki-binding-chezmoi`, and `ki-repo-dotfiles-chezmoi` audits, then confirm `mcporter list granola --schema --json` and representative read-only calls. Treat plan restrictions, incomplete pagination, missing fields, rate limits, OAuth/workspace ambiguity, or any unexpected mutation-capable tool as explicit findings rather than silently broadening authority.
