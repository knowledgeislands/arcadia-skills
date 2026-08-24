---
id: KI-HARNESS-OPS-006
title: Acquire Granola meetings
area: OPS
theme: operations
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Give Knowledge Islands a governed, repeatable way to acquire every historical and future Granola meeting faithfully into `kit-principal` before later triage routes durable material to its canonical island.

## Context

[ADR-KI-ARCADIA-001](https://github.com/knowledgeislands/ki-arcadia-principal/blob/main/Admin/Governance/Decisions/ADR-KI-ARCADIA-001-provider-neutral-knowledge-acquisition.md) defines provider-neutral acquisition as discover, acquire, stage, harvest, durable knowledge, then separate source archive or deletion. [ADR-KI-HARNESS-SKILLS-007](../decisions/ADR-KI-HARNESS-SKILLS-007-provider-neutral-ai-session-acquisition-and-adapter-pairing.md) places reusable provider skills and read-only adapter contracts in the Harness, while [KI-HARNESS-OPS-005](KI-HARNESS-OPS-005-acquire-ai-sessions.md) applies that boundary to AI-session providers. Granola is the first communication-source provider and therefore needs its own work record rather than widening the AI-session item.

The current `tools-ki` implementation has two related public surfaces. `ki acquire chatgpt import <capture> --output <kep>` creates a standalone deterministic KEP from a prepared capture, while `ki space acquire chatgpt import <capture>` resolves the current repository and stages a content-addressed package beneath its Harbour. The KEP implementation is currently ChatGPT-specific in its connector identity, metadata parser, source system, relationship vocabulary, and `+/_ACQUIRE/chatgpt/` stage path.

Legacy Granola activities in `kit-legal` and `kit-principal` prove useful source operations and routing evidence: `list_meeting_folders`, folder-scoped and unfiltered `list_meetings`, `get_meetings`, stable meeting IDs, generated summaries, participants, and unfoldered-meeting detection. They also expose limitations this work must replace: recent or today-only windows, one-folder ownership, one-meeting-at-a-time human classification, note creation before faithful staging, and source tag mutation. The activities disagree on raw-transcript availability, so transcript entitlement is unproven rather than assumed.

## Boundary

This item owns the reusable Granola acquisition skill and provider contract, the cross-repository delivery plan, and bounded trade preparations. It does not create a Granola adapter repository, implement receiver-owned changes directly, contact Granola during planning, classify meetings into final islands, harvest durable knowledge, mutate Granola folders or tags, automate a browser, archive a meeting, or delete source material.

The first acquisition target is always `kit-principal/+/_ACQUIRE/granola/`. Folder, tag, and participant metadata remains routing evidence only. Canonical routing occurs later through governed harvesting and `ki-trades`; direct cross-repository filesystem moves are outside the design.

## Current state

Arcadia's lifecycle and the existing provider skills establish a common `discover`, `list`, `read`, and `checkpoint` vocabulary with content-minimised discovery separated from faithful source reads. No reusable `ki-housekeeping-granola` skill, dedicated Granola source adapter, provider-neutral KEP capture interface, Granola KEP profile, or `kit-principal` acquisition ledger exists.

The currently evidenced Claude-connected Granola surface is remote and account-tier dependent. Local configuration records a previously connected `claude.ai Granola` integration, but there is no local Granola adapter checkout. This planning pass has not invoked that integration or established its pagination, history, media, transcript, tag-read, archive, or deletion capabilities.

## Steps

- [ ] Author `ki-housekeeping-granola` with the provider-neutral lifecycle, read-only source boundary, fidelity requirements, explicit omissions, completeness reconciliation, checkpoint semantics, and separate retirement gate.
- [ ] Define the Granola provider contract as `discover`, `list`, `read`, and `checkpoint`, including complete folder and unfoldered pagination, stable identity, canonical content hashes, raw source payloads, folder and tag evidence, participants, notes, transcript, media, and omissions.
- [ ] Prove the available Granola API or MCP capabilities against authoritative documentation and a separately approved read-only test, recording unsupported or account-tier-restricted fields without inventing fallbacks.
- [ ] Reconcile the public CLI contract by retaining `ki acquire granola import` for standalone KEP construction and `ki space acquire granola import` for repository-context Harbour staging; update the governing `tools-ki` specification before implementation.
- [ ] Generalise the `tools-ki` KEP core from its ChatGPT-specific capture model into a provider-neutral package builder with a Granola profile and per-meeting immutable package boundary.
- [ ] Implement complete incremental acquisition into `kit-principal/+/_ACQUIRE/granola/<payload-sha256>/`, updating a receiver-owned ledger only after each package passes KEP verification.
- [ ] Reconcile complete unique meeting counts across every live folder plus unfoldered results, deduplicating stable identities and failing on conflicting duplicate representations.
- [ ] Preserve original provider payloads, generated notes, raw transcripts, participants, folders, tags, URLs, timestamps, asset references, available bytes, hashes, and explicit omissions without interpretation during staging.
- [ ] Make interrupted imports resumable: publish each KEP atomically, never advance the ledger before verification, and repeat acquisition until it reports no unexplained new, changed, missing, or failed meetings.
- [ ] Add fixtures for multi-page history, new, unchanged, changed and missing meetings, duplicate identities, unfoldered meetings, unsafe paths, unavailable transcript or media, interrupted writes, corrupted existing stages, and repeatable checkpoints.
- [ ] Prepare receiver-owned work trades for `tools-ki` and `kit-principal`, a knowledge trade for Arcadia, and a provider-repository bootstrap proposal; submit none until each route and payload receives explicit approval.
- [ ] Define a future release-manifest contract that can prove the nine retirement gates without adding a source-mutation tool to the acquisition provider.

## Files touched

Harness-owned expected files:

- `skills/environment/ki-housekeeping-granola/`
- `.ki-config.toml` only when the new skill and approved trade routes are ready to declare
- this roadmap record and approved outbound records under `-/_TRADES/`
- ADR-KI-HARNESS-SKILLS-007 only if implementation proves the reusable adapter-pairing decision must extend beyond AI sessions; otherwise retain its current narrower title and scope

Receiver-owned expected surfaces, changed only through accepted local work:

- a separately approved `mcp-housekeeping-granola` repository or another explicitly selected read-only adapter home
- `tools-ki` acquisition commands, KEP core, specifications, manual, changelog, and CLI fixtures
- Arcadia's `KI-ARCADIA-MOD-006` lifecycle record and future portable acquisition specification
- `kit-principal` Harbour configuration, acquisition ledger, Granola triage activity, and reciprocal `ki-trades` declarations

## Verify

Harness planning and contract gates:

```bash
ki repo audit --skill ki-work-roadmap --repo .
ki repo audit --skill ki-delegation --repo .
ki repo audit --skill ki-trades --repo .
ki repo audit --skill ki-housekeeping-granola --repo .
ki repo audit --skill ki-skills --repo .
bun run test
bunx tsc --noEmit
```

Receiver delivery must additionally prove:

- pagination consumes every page for every live folder and the unfiltered history, with a reconciled unique-meeting count;
- one unchanged repeat produces no new package or ledger delta, while a changed meeting produces one new immutable KEP version linked to the same source identity;
- duplicate IDs with conflicting provider payloads fail closed rather than overwrite evidence;
- each staged package passes checksum and KEP manifest verification before ledger advancement;
- missing transcript, attachment, audio, recording, tag, folder, URL, or timestamp data appears as an explicit omission rather than fabricated content;
- an interrupted run resumes from verified packages without losing or duplicating meetings;
- no acquisition test or runtime path invokes a Granola mutation, browser automation, direct cross-repository write, archive, or delete operation.

## Dependencies / blocks

Harness-local skill and contract work can begin from the evidence already available. Live capability proof requires separately approved read-only Granola access and must stop if complete pagination or stable meeting identity cannot be established.

The `tools-ki` route is already declared from the Harness, but receiver priority and implementation remain with `tools-ki`. Arcadia currently accepts knowledge from the Harness and already owns `KI-ARCADIA-MOD-006`. `kit-principal` does not yet declare `ki-trades`, so its route requires separate receiver consent and reciprocal configuration before a work trade can be received. A Granola adapter repository does not exist and must not be created until separately approved.

## Delegation

### Locked decisions

- `kit-principal` receives every initial Granola acquisition beneath `+/_ACQUIRE/granola/`.
- Acquisition covers complete historical and future meetings across every folder and unfoldered results; recent windows and one-folder importers are insufficient.
- Acquisition is incremental, idempotent, content-addressed, changed-meeting aware, and faithful before interpretation.
- Folder, tag, and participant data is routing evidence, not canonical classification.
- Later routing uses governed harvesting and `ki-trades`, never direct cross-repository filesystem moves.
- The provider and MCP surface is read-only with respect to Granola.
- Import success never authorises source archive or deletion.
- No delegated worker may delete, archive, tag, move, or otherwise mutate a Granola record.
- A missing provider field or byte payload is recorded as an explicit omission.

### Escalate

- Escalate before selecting or creating a Granola adapter repository, changing a sibling repository, submitting a trade, or activating a new trade route.
- Escalate if authoritative and read-only evidence cannot prove complete pagination, stable meeting identity, changed-meeting detection, or faithful source reads.
- Escalate before credentials, live Granola access, network mutation, browser automation, source archive, deletion, or any write outside the authorised Harness paths.
- Escalate if the current CLI reconciliation would require replacing either public command, changing ADR-KI-ARCADIA-001, or introducing a third acquisition syntax.
- Escalate if Granola returns conflicting duplicate identities, unavailable required source material without an omission channel, or a KEP change incompatible with the governing package specification.
- Escalate any retirement proposal before a deletion manifest is generated and again immediately before any future source mutation.

### Worker: granola-provider-contract

- **Deliverable:** A reviewable `ki-housekeeping-granola` skill and provider capability contract, plus draft receiver-specific trade payloads that preserve this record's ownership boundaries.
- **Inputs:** ADR-KI-ARCADIA-001, ADR-KI-HARNESS-SKILLS-007, KI-HARNESS-OPS-005, this record, the three existing provider skills, the current `tools-ki` acquisition specification and KEP core, and the named legacy Granola activities.
- **Scope:** Harness skill files and explicitly approved Harness outbound trade preparations only; no sibling-repository writes, provider-repository creation, live Granola calls, or source mutation.
- **Authority:** Read the named local evidence and author the bounded Harness contract. Do not infer unavailable provider fields, submit trades, contact external systems, or grant receiver implementation authority.
- **Isolation:** Use an isolated worktree or exclusive Harness file boundary. Any Git staging uses a worker-specific temporary index; the coordinator serialises commits.
- **Verify:** The coordinator reviews every claimed Granola capability against cited evidence and runs focused `ki-skills`, `ki-trades`, `ki-delegation`, and `ki-work-roadmap` audits plus Harness tests and TypeScript.
- **Return:** Concise changed-file summary, capability matrix with proven and unresolved fields, exact audit results, proposed trades, and any escalation; no raw meeting content or browsing transcript.
- **Checkpoint:** Return after the Harness contract and draft trades are reviewable, before trade submission, route activation, repository creation, or any sibling write.

### Worker: granola-retirement-gate

- **Deliverable:** A provider-neutral future release-manifest contract demonstrating the nine retirement gates and the manual-release fallback when no safe API exists.
- **Inputs:** This record's locked decisions, Arcadia's lifecycle, verified KEP and checkpoint contracts, receiver receipt semantics from `ki-trades`, and documented Granola archive/delete capabilities if later approved for read-only research.
- **Scope:** Design and fixtures only within approved Harness files; no deletion implementation, live manifest generation, browser automation, or source access.
- **Authority:** Specify evidence and fail-closed checks. Do not weaken a gate, infer a receipt, select meetings for deletion, or authorise source mutation.
- **Isolation:** Read-only evidence lane with no write-capable external tools; any proposed Harness text returns as a patch for coordinator review.
- **Verify:** The coordinator checks that all nine gates are independently evidenced, every manifest entry has exact source identity and hash, and absence of a safe API yields a manual-release manifest only.
- **Return:** Gate-by-gate contract, unresolved provider dependencies, fixture scenarios, and explicit statement that no source mutation was performed or authorised.
- **Checkpoint:** Return once the contract can reject every missing-gate fixture; stop before implementing or invoking archive or deletion.

## Documentation impact

### Decision Records

ADR-KI-ARCADIA-001 remains the lifecycle authority. ADR-KI-HARNESS-SKILLS-007 remains the AI-session pairing authority unless implementation establishes a genuinely shared non-AI adapter decision; do not broaden it merely to mention Granola.

### Specifications

`tools-ki` must extend its as-built acquisition specification before shipping Granola, including the two-layer CLI grammar, provider-neutral KEP fields, per-meeting package boundary, checkpoint ledger, interruption semantics, and verification rules. Arcadia may promote a portable acquisition specification after Granola proves the second source mechanism.

### Guides

Add an operator guide only after end-to-end acquisition is verified. It must explain complete-history reconciliation, explicit omissions, repeat runs, later triage, and the fact that import never authorises retirement.

### Roadmap

This record is separate from OPS-005 because it governs the first communication-source provider and a different receiving-island workflow. Receiver repositories retain their own prioritisation, planning, implementation, review, and acceptance records through approved trades.

## Discussion

### Proposed architecture

The Granola adapter supplies read-only source mechanics. `discover` reports the authenticated source, available operations, folder inventory, entitlement boundaries, and pagination capabilities without meeting content. `list` walks every page of the unfiltered history and every live folder, deduplicates stable identities, and preserves folder membership evidence. `read` returns one faithful source payload and separately available transcript or media bytes. `checkpoint` returns content-minimised stable identities, source update evidence, canonical content hashes, and explicit omissions.

`tools-ki` converts each meeting read into one immutable KEP. The package retains the raw provider payload under `source/originals/`, a faithful non-canonical record rendering under `source/records/`, available media under `assets/`, native relationships for folders, tags, participants, transcript, and media under `relationships/`, and hashes plus omissions in its manifest. One package per meeting version keeps changes and interrupted recovery local; a changed meeting receives a new payload hash while the acquisition ledger retains the stable Granola identity and observed version history.

`kit-principal` stages verified packages at `+/_ACQUIRE/granola/<payload-sha256>/`. Its ledger advances only after package verification and records meeting identity, latest observed source hash, every acquired package, acquisition time, omissions, and later triage or trade disposition. The ledger is evidence for incrementality, not authority to classify, harvest, archive, or delete.

### CLI reconciliation

The existing commands represent two different layers and should remain explicit. `ki acquire granola import` constructs a standalone KEP at a caller-selected output and does not discover repository context. `ki space acquire granola import`, run inside `kit-principal`, resolves the receiving island and stages the package in its Harbour, matching ADR-KI-ARCADIA-001. Granola introduces neither a third syntax nor a silent redefinition of top-level `ki acquire`. The `tools-ki` specification must record this distinction before implementation, and both commands must share the same provider-neutral package builder.

### Complete and incremental acquisition

“All meetings” is a reconciled set, not one API response. The adapter enumerates every live folder with complete pagination, enumerates complete unfiltered history, unions results by stable meeting identity, identifies unfoldered meetings as identities absent from every folder result, and compares all counts. A duplicate identity with compatible folder memberships merges routing evidence; conflicting title, timestamp, source URL, or payload versions fails closed for review.

Checkpoint selection compares stable identity plus source update evidence and canonical content hash. New and changed meetings are read and packaged; unchanged meetings are skipped only when the existing KEP verifies; missing source identities are reported as a delta and never interpreted as deletion. A successful repeat produces no unexplained delta. Interrupted runs leave verified immutable packages recoverable and never claim ledger completion for an unverified write.

### Acquisition fidelity

The adapter preserves stable identity, Granola URL, title, creation and update times, folder identity and name, tags, participants, generated notes or summary, raw transcript, and attachment, audio, or recording references and bytes wherever the selected source can faithfully provide them. It records separate hashes for source payloads and available assets. Account-tier or API limitations become explicit omissions; summaries do not masquerade as transcripts, references do not masquerade as media bytes, and canonical renderings do not replace original provider payloads.

### Repository responsibilities and trades

- **Harness:** Own `ki-housekeeping-granola`, the reusable four-operation contract, fidelity and retirement safety standards, and outbound trade preparations.
- **Granola adapter:** Own authentication, pagination, rate-limit handling, source schemas, faithful reads, content-minimised checkpoints, and the no-mutation tool surface. Repository creation and ownership require separate approval.
- **tools-ki:** Own the reconciled public CLI, provider-neutral KEP builder, Granola profile, atomic Harbour staging, checkpoint/ledger mechanics, and KEP verification. Delivery requires an approved work trade with receiver-controlled planning and acceptance.
- **Arcadia:** Remain authority for the provider-neutral lifecycle and decide when Granola evidence is sufficient to shape a portable acquisition specification. Delivery is a knowledge trade linked to `KI-ARCADIA-MOD-006`, not a Harness edit to Arcadia.
- **kit-principal:** Own `+/_ACQUIRE/granola/`, its acquisition ledger, operator configuration, later triage and harvest process, reciprocal trade participation, and any receiver-local work record. Delivery requires route activation and an approved work trade.

### Unresolved Granola capabilities

- Whether the available API or MCP supports cursor or page-token pagination over complete historical unfiltered and folder-scoped meetings.
- Whether stable meeting URLs, creation timestamps, update timestamps, folder IDs and names, tags, participant identities, and source version identifiers are returned consistently.
- Whether `get_meetings` exposes a raw provider payload suitable for faithful preservation or only a generated summary projection.
- Whether raw transcript access exists for this account tier; local legacy records conflict, and the current scheduled activity says it is unavailable.
- Whether attachments, audio, or recordings are available as references, downloadable bytes, expiring URLs, or not exposed at all.
- Whether pagination order is stable, rate limits and retry tokens are documented, and historical queries can be partitioned without omissions.
- Whether Granola offers a supported recoverable export, archive operation, deletion API, or deletion manifest facility. No such capability is assumed.

### Legacy-use-case treatment

The legacy activities contribute source vocabulary, stable IDs, folder evidence, participant and summary use, unfoldered detection, and the principle that source remains in Granola. Their direct note creation, one-folder scoping, recent windows, one-meeting picker, processed/skipped tags, and source mutation are not compatibility requirements. The new workflow acquires first, then lets `kit-principal` triage and trade material under current Knowledge Islands governance.

### Future retirement safety gate

Granola retirement is a separate future operation and remains unavailable until all of these are evidenced for an exact proposed manifest:

1. Complete acquisition-count reconciliation across every folder and unfoldered history.
2. Stable source identities and hashes for every meeting version in scope.
3. A repeat acquisition with no unexplained new, changed, missing, failed, or unverifiable meeting.
4. Successful KEP checksum and manifest verification for every acquired package.
5. A recorded harvest, retention, or routing disposition for every meeting.
6. Confirmed `ki-trades` receipts for material routed to other islands.
7. A recoverable provider export or archive where Granola supports one.
8. An exact deletion manifest naming every source identity and reviewed hash.
9. Explicit human approval of that exact manifest immediately before mutation.

If Granola exposes no safe archive or delete API, the system emits a verified manual-release manifest and stops. Browser automation is not an acceptable substitute.
