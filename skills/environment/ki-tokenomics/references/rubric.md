<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-tokenomics

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [COMP — Composition and attribution](#comp--composition-and-attribution)
- [SURF — Standing-surface inventory](#surf--standing-surface-inventory)
- [MCP — MCP tool surface](#mcp--mcp-tool-surface)
- [BUDG — Budgets](#budg--budgets)
- [RUN — Runtime levers](#run--runtime-levers)
- [TOOL — Compression tooling](#tool--compression-tooling)
- [CFG — Configuration table](#cfg--configuration-table)

## COMP — Composition and attribution

- **COMP-1 [WARN · INSPECT] — Layers are read and reported**
- **COMP-2 [WARN · INSPECT] — Costs are attributed**
- **COMP-3 [J] — Recommendations land in the right layer**
  > Does each recommendation account for where the cost lives?

## SURF — Standing-surface inventory

- **SURF-1 [FAIL · INSPECT] — Instruction files and imports are measured**
- **SURF-2 [WARN · INSPECT] — Memory indices are measured**
- **SURF-3 [WARN · INSPECT] — Skill descriptions are measured**
- **SURF-4 [J] — Standing instruction earns its cost**
  > Does each large instruction or memory entry earn its standing token cost?

## MCP — MCP tool surface

- **MCP-1 [WARN · INSPECT] — MCP servers are enumerated**
- **MCP-2 [J] — MCP servers are used**
  > Is each configured server used by the work done here?
- **MCP-3 [J] — MCP tool sets are minimal**
  > Are broad server tool sets curated or dynamically discovered?

## BUDG — Budgets

- **BUDG-1 [WARN · INSPECT] — Component budgets are compared**
- **BUDG-2 [WARN · INSPECT] — Total budget is compared**
- **BUDG-3 [J] — Overages are deliberate**
  > Is a sustained overage fixed or deliberately recorded?

## RUN — Runtime levers

- **RUN-1 [J] — Prompt caching is effective**
  > Is the stable prefix cacheable and being hit?
- **RUN-2 [J] — Model type matches work value**
  > Does the declared model type match the work value?
- **RUN-3 [J] — Conversation growth is controlled**
  > Are compaction and sub-agent fan-out proportionate?
- **RUN-4 [J] — Tool verbosity is controlled**
  > Are raw tool results prevented from bloating context?
- **RUN-5 [WARN · INSPECT] — Pinned model is reported**

## TOOL — Compression tooling

- **TOOL-1 [WARN · INSPECT] — Compression tooling is detected**
- **TOOL-2 [FAIL · INSPECT] — Compression expectation is honoured**
- **TOOL-3 [J] — Compression setup is optimal**
  > Where present, is the compression setup optimal?
- **TOOL-4 [WARN · INSPECT] — Learned captures are local**
- **TOOL-5 [WARN · INSPECT] — Proxy traffic is attributed**

## CFG — Configuration table

- **CFG-1 [FAIL · INSPECT] — Config validates down**
- **CFG-2 [WARN · INSPECT] — Education emits defaults**
- **CFG-3 [J] — Configuration is warranted**
  > Are budgets and expectations warranted for this environment?
- **CFG-4 [FAIL · INSPECT] — Portable model type is declared**
- **CFG-5 [FAIL · INSPECT] — Model bindings are valid**
