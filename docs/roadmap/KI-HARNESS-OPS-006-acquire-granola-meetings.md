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

Give Knowledge Islands a governed, repeatable way to acquire every historical and future Granola meeting faithfully into one or more eligible receiving repositories, using `kit-principal` as the initial catch-all receiver while preserving later direct ingress to a better canonical island.

## Context

[ADR-KI-ARCADIA-001](https://github.com/knowledgeislands/ki-arcadia-principal/blob/main/Admin/Governance/Decisions/ADR-KI-ARCADIA-001-provider-neutral-knowledge-acquisition.md) defines provider-neutral discovery, acquisition, staging, harvesting, durable knowledge, and separate source retirement. [ADR-KI-HARNESS-SKILLS-007](../decisions/ADR-KI-HARNESS-SKILLS-007-provider-neutral-ai-session-acquisition-and-adapter-pairing.md) places reusable provider skills and read-only adapter contracts in Harness, while [KI-HARNESS-OPS-005](KI-HARNESS-OPS-005-acquire-ai-sessions.md) applies that boundary to AI-session providers. Granola is the first communication-source provider and therefore needs its own work record rather than widening the AI-session item.

The intended public command is `ki acquire <provider> import`. The additional `space` segment in earlier language was a transcription artefact, not a second architectural layer. The current `tools-ki` implementation nevertheless contains both `ki acquire chatgpt import <capture> --output <kep>` and `ki space acquire chatgpt import <capture>`, so the implementation and governing Arcadia language must be reconciled deliberately rather than silently diverging.

Legacy Granola activities in `kit-legal` and `kit-principal` prove useful source operations and routing evidence: folder listing, folder-scoped and unfiltered meeting listing, stable meeting IDs, generated summaries, participants, and unfoldered-meeting detection. They also expose limitations this work must replace: recent or today-only windows, one-folder ownership, one-meeting-at-a-time classification, note creation before faithful staging, and source tag mutation. The activities disagree on raw-transcript availability, so transcript entitlement remains unproven.

## Boundary

This item owns the reusable Granola acquisition skill and provider contract, receiver-selection semantics, reconciliation state model, cross-repository delivery plan, and bounded trade preparations. It does not create a Granola adapter repository, implement receiver-owned changes directly, contact Granola during planning, harvest durable knowledge, mutate Granola folders, tags, notes, or meetings, automate a browser, archive a meeting, or delete source material.

Any locally registered repository that declares and resolves the Granola skill may be a receiver. `kit-principal` is the initial catch-all because it is the primary personal knowledge base, not because the lifecycle requires one permanent receiving island. Folder mappings may later direct acquisition straight into the expected home. Material acquired into the wrong repository, or knowledge with wider applicability, is routed later through governed harvesting and `ki-trades`; direct cross-repository filesystem moves remain outside the design.

## Current state

Arcadia's lifecycle and the existing Claude, Codex, and ChatGPT provider skills establish a common `discover`, `list`, `read`, and `checkpoint` vocabulary with content-minimised discovery separated from faithful source reads. No reusable `ki-housekeeping-granola` skill, dedicated Granola source adapter, provider-neutral KEP capture interface, Granola KEP profile, federated acquisition-coverage report, or Granola acquisition ledger exists.

The currently evidenced Granola surface is a remote, account-tier-dependent Claude integration. Local configuration records a previously connected `claude.ai Granola` integration, but no local Granola adapter checkout. This planning pass has not invoked that integration or established pagination, history, media, transcript, note-update, tag-read, archive, or deletion capabilities.

## Steps

- [ ] Author `ki-housekeeping-granola` with the provider-neutral lifecycle, read-only source boundary, fidelity requirements, explicit omissions, receiver-selection semantics, completeness reconciliation, checkpoint semantics, and separate retirement gate.
- [ ] Define the Granola provider contract as `discover`, `list`, `read`, and `checkpoint`, including complete folder and unfoldered pagination, stable identity, canonical content hashes, raw source payloads, folder and tag evidence, participants, notes, transcript, media, and omissions.
- [ ] Prove available Granola API or MCP capabilities through authoritative documentation and a separately approved read-only test, recording unsupported or account-tier-restricted fields without inventing fallbacks.
- [ ] Reconcile the public CLI as one `ki acquire granola import` operation that resolves the current or explicitly selected repository and stages verified KEPs in its Harbour; migrate the current `ki space acquire` implementation and update the governing `tools-ki` and Arcadia contracts before implementation.
- [ ] Generalise the `tools-ki` KEP core from its ChatGPT-specific capture model into a provider-neutral package builder with a Granola profile and a per-meeting immutable package boundary.
- [ ] Define receiver-local selectors for Granola folder identities plus a first-class unfoldered selector and warning policy; make every inclusion, exclusion, overlap, and unmatched result visible in the acquisition report.
- [ ] Begin with `kit-principal` as the complete-history catch-all, then allow a governed folder-to-repository coverage plan to send future new or changed meetings directly to repositories that declare the skill and matching scope.
- [ ] Reconcile the union of all configured receiver scopes against complete Granola discovery, failing closed on unexplained coverage gaps or conflicting duplicate identities and warning when unfoldered meetings require human consideration.
- [ ] Stage packages under each receiving repository's `+/_ACQUIRE/granola/<payload-sha256>/`, advancing its local ledger only after KEP verification and retaining the stable Granola identity across versions and receivers.
- [ ] Preserve original provider payloads, generated notes, raw transcripts, participants, folders, tags, URLs, timestamps, asset references, available bytes, hashes, and explicit omissions without interpretation during staging.
- [ ] Model source amendments explicitly: note, summary, folder, tag, participant, transcript, or media changes create a new immutable observation; scope exit never implies source deletion or removal of an earlier KEP.
- [ ] Make interrupted imports resumable: publish each KEP atomically, never advance a ledger before verification, and repeat acquisition until it reports no unexplained new, changed, missing, failed, overlapping, or unmatched meetings.
- [ ] Add fixtures for multi-page history, new, unchanged and changed meetings, multiple-folder membership, folder reassignment, unmatched folders, duplicate identities, unfoldered meetings, unsafe paths, unavailable transcript or media, interrupted writes, corrupted existing stages, and repeatable checkpoints.
- [ ] Prepare receiver-owned work trades for `tools-ki` and `kit-principal`, a knowledge trade for Arcadia, and a provider-repository bootstrap proposal; submit none until each route and payload receives explicit approval.
- [ ] Define the future release-manifest contract and prove the retirement gates without adding a source-mutation tool to the acquisition provider.

## Files touched

Harness-owned expected files:

- `skills/environment/ki-housekeeping-granola/`
- `.ki-config.toml` only when the new skill is approved and trade routes are ready to declare
- this roadmap record and approved outbound records under `-/_TRADES/`
- ADR-KI-HARNESS-SKILLS-007 only if implementation proves that its adapter-pairing decision genuinely extends beyond AI sessions

Receiver-owned expected surfaces, changed only through accepted local work:

- a separately approved `mcp-housekeeping-granola` repository or another explicitly selected read-only adapter home
- `tools-ki` acquisition commands, KEP core, specifications, manual, changelog, and CLI fixtures
- Arcadia's ADR-KI-ARCADIA-001 command language, `KI-ARCADIA-MOD-006` lifecycle record, and future portable acquisition specification
- `kit-principal` Harbour configuration, initial catch-all scope, acquisition and coverage ledgers, Granola triage activity, and reciprocal `ki-trades` declarations
- later receiving repositories' Granola skill declarations, folder selectors, local ledgers, and triage records

## Verify

Harness planning contract gates:

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

- `ki acquire granola import` stages into the current or explicitly selected eligible repository without requiring a `space` segment;
- pagination consumes every page of unfiltered history and every live folder before reconciling the unique-meeting count;
- repository selectors include configured folders only, treat unfoldered as an explicit selector, and report unmatched, overlapping, and excluded meetings;
- the union of configured receiver scopes reconciles with the complete discovery snapshot, with `kit-principal` initially covering the residual set;
- an unchanged repeat produces no new package or ledger delta, while a changed meeting produces one new immutable KEP version linked to the same source identity;
- a folder reassignment may change the receiving repository for a later version without deleting or rewriting the prior receiver's package;
- duplicate IDs with conflicting provider payloads fail closed rather than overwriting evidence;
- each staged package passes checksum and KEP-manifest verification before ledger advancement;
- missing transcript, attachment, audio, recording, tag, folder, URL, or timestamp data appears as an explicit omission rather than fabricated content;
- an interrupted run resumes verified packages without losing or duplicating meetings;
- no acquisition test or runtime path invokes Granola mutation, browser automation, direct cross-repository writes, archive, or deletion.

## Dependencies / blocks

Harness-local skill-contract work can begin from the evidence already available. Live capability proof requires separately approved read-only Granola access and must stop if complete pagination, stable meeting identity, or changed-meeting detection cannot be established.

`tools-ki` already has a declared route from Harness, but receiver priority and implementation remain with `tools-ki`. Arcadia currently accepts knowledge from Harness and owns `KI-ARCADIA-MOD-006`; its command language needs an approved correction. `kit-principal` does not yet declare `ki-trades`, so its route requires separate receiver consent and reciprocal configuration before a work trade can be received. Later receiving repositories require their own skill activation and work authority. A Granola adapter repository does not exist and must not be created until separately approved.

The exact conflict policy for a meeting belonging to multiple mapped folders is not yet locked. Implementation must establish deterministic ownership or explicit duplication semantics before direct multi-repository ingress can ship.

## Delegation

### Locked decisions

- `ki acquire <provider> import` is the public acquisition grammar; the earlier `space` segment is not a second public architecture.
- Any eligible repository may acquire Granola meetings according to its declared selector; `kit-principal` is the initial catch-all and residual receiver, not the permanent exclusive destination.
- Acquisition covers complete historical and future meetings across folder and unfoldered results; recent windows and one-folder importers are insufficient.
- Unfoldered meetings are a first-class selection category and remain visible to human review even when a configured receiver includes them.
- Acquisition is incremental, idempotent, content-addressed, changed-meeting-aware, and faithful before interpretation.
- Folder, tag, and participant data is routing evidence, not canonical classification.
- Correct direct ingress should avoid unnecessary large trades; later routing uses governed harvesting and `ki-trades`, never direct cross-repository filesystem moves.
- The acquisition provider and MCP surface are read-only with respect to Granola.
- Import success never authorises source archive, deletion, tagging, folder movement, note editing, or any other mutation.
- Missing source material is preserved as an explicit omission.

### Escalate

- Escalate before selecting or creating a Granola adapter repository, changing a sibling repository, submitting a trade, or activating a new trade route.
- Escalate if authoritative read-only evidence cannot prove complete pagination, stable meeting identity, changed-meeting detection, or faithful source reads.
- Escalate before credentials, live Granola access, network mutation, browser automation, source archive, deletion, or any write outside authorised Harness paths.
- Escalate if replacing `ki space acquire` or changing current `ki acquire` semantics would break a supported workflow without an approved migration, or if Arcadia and `tools-ki` cannot converge on the single public grammar.
- Escalate when selector scopes overlap, leave an unexplained coverage gap, or cannot deterministically handle multiple-folder membership.
- Escalate if Granola returns conflicting duplicate identities, unavailable required source material without an omission channel, or a KEP change incompatible with the governing package specification.
- Escalate any retirement proposal before its deletion manifest is regenerated and approved immediately before any future source mutation.

### Worker: granola-provider-contract

- **Deliverable:** A reviewable `ki-housekeeping-granola` skill and provider-capability contract, plus draft receiver-specific trade payloads that preserve this record's ownership boundaries.
- **Inputs:** ADR-KI-ARCADIA-001, ADR-KI-HARNESS-SKILLS-007, KI-HARNESS-OPS-005, this record, the three existing provider skills, the current `tools-ki` acquisition specification and KEP core, and the named legacy Granola activities.
- **Scope:** Harness skill files and explicitly approved Harness outbound trade preparations only; no sibling-repository writes, provider-repository creation, live Granola calls, or source mutation.
- **Authority:** Read named local evidence and author the bounded Harness contract. Do not infer unavailable provider fields, submit trades, contact external systems, or grant receiver implementation authority.
- **Isolation:** Use an isolated worktree with an exclusive Harness file boundary. Any Git staging uses a worker-specific temporary index; the coordinator serialises commits.
- **Verify:** The coordinator reviews `ki-skills`, `ki-trades`, `ki-delegation`, `ki-work-roadmap`, TypeScript, and changed-file tests.
- **Return:** A concise patch summary, capability matrix, omissions, verification evidence, proposed trades, and unresolved decisions; no trade submission, route activation, repository creation, or sibling write.
- **Checkpoint:** Return when the Harness contract and receiver payload drafts are reviewable; stop before live provider access or receiver implementation.

### Worker: granola-routing-reconciliation

- **Deliverable:** A deterministic receiver-selection and reconciliation contract covering folder mappings, unfoldered meetings, residual ownership, overlap, scope changes, and provider-wide completeness.
- **Inputs:** This record's locked decisions, registered-repository model, local skill declarations, Granola folder evidence, KEP identity rules, and `ki-trades` receipt semantics.
- **Scope:** Design and fixtures within approved Harness files only; no receiver configuration writes, source access, trade submission, or cross-repository moves.
- **Authority:** Specify selectors, reports, invariants, and failure cases. Do not assign a real folder to a repository or resolve an overlap without owner approval.
- **Isolation:** Use an isolated worktree and an exclusive Harness fixture boundary; use a worker-specific Git index for any staging.
- **Verify:** The coordinator proves complete folder and unfoldered coverage, deterministic residual handling, visible overlaps, stable identity across receivers, and immutable handling of scope changes.
- **Return:** The state model, fixture matrix, unresolved ownership choices, and proposed receiver configuration schema.
- **Checkpoint:** Return when every discovered meeting is demonstrably selected once, explicitly duplicated, or reported for human resolution.

### Worker: granola-retirement-gate

- **Deliverable:** A provider-neutral future release-manifest contract demonstrating the retirement gates and manual-release fallback when no safe API exists.
- **Inputs:** This record's locked decisions, Arcadia's lifecycle, verified KEP and checkpoint contracts, provider-wide coverage evidence, receiver disposition and `ki-trades` receipt semantics, and documented Granola archive/delete capabilities from later approved read-only research.
- **Scope:** Design and fixtures only within approved Harness files; no deletion implementation, live manifest generation, browser automation, or source access.
- **Authority:** Specify evidence and fail-closed checks. Do not weaken a gate, infer a receipt, select meetings for deletion, or authorise source mutation.
- **Isolation:** Use a read-only evidence lane with no write-capable external tools; any proposed Harness text returns as a patch for coordinator review.
- **Verify:** The coordinator checks that every gate is independently evidenced, every manifest entry names an exact source identity and hash, any post-manifest amendment invalidates approval, and absence of a safe API yields a manual-release manifest only.
- **Return:** A gate-by-gate contract, unresolved provider dependencies, fixture scenarios, and an explicit statement that no source mutation was performed or authorised.
- **Checkpoint:** Return once the contract rejects every missing-gate or stale-manifest fixture; stop before implementing or invoking archive or deletion.

## Documentation impact

### Decision Records

ADR-KI-ARCADIA-001 remains the lifecycle authority but needs a receiver-neutral correction from `ki space acquire` to the single public `ki acquire` grammar. ADR-KI-HARNESS-SKILLS-007 remains the AI-session pairing authority unless implementation establishes a genuinely shared non-AI adapter decision; do not broaden it merely to mention Granola.

### Specifications

`tools-ki` must extend its as-built acquisition specification before shipping Granola, including the single public CLI grammar, repository resolution, receiver selectors, provider-neutral KEP fields, per-meeting package boundary, local and provider-wide ledgers, interruption semantics, amendment reconciliation, and verification rules. Arcadia may promote a portable acquisition specification after Granola proves the second source class.

### Guides

Add an operator guide only after end-to-end acquisition is verified. It must explain folder and unfoldered selection, residual handling, complete-history reconciliation, amendments, explicit omissions, immutable versions, human warnings, harvesting, trade receipts, indefinite source retention, and the separate retirement gate.

### Roadmap

Keep this work distinct from KI-HARNESS-OPS-005 because a communication source introduces multi-repository receiver selection, source-folder reconciliation, and ongoing mutable-record concerns. Receiver repositories retain their own prioritisation, planning, implementation, review, and acceptance records through approved trades.

## Discussion

### Proposed state flow

```text
Granola discovery snapshot
  -> reconcile every folder plus unfoldered meetings
  -> resolve repository selectors and residual ownership
  -> read faithful source state
  -> build immutable content-addressed KEP
  -> verify package and advance receiver ledger
  -> human or agentic triage
  -> retain, harvest locally, or route through ki-trades
  -> continue incremental reconciliation
  -> optionally become a separately approved retirement candidate
```

Acquisition establishes a faithful local observation; it is not harvesting and does not imply source retirement. Harvesting promotes durable knowledge and records a disposition. A meeting may remain in Granola indefinitely while recurring acquisition observes changes. Retirement is an optional later release operation, not the successful end state of every import.

### CLI reconciliation

The public operation is `ki acquire granola import`. It resolves the current repository by default, or an explicitly selected repository through the existing repository-selection convention, validates that the Granola skill and receiver scope are active, and stages verified packages in that repository's Harbour. KEP construction is an internal reusable capability of this operation rather than a reason for a second `space` command.

The existing ChatGPT `--output` behaviour and `ki space acquire` implementation are compatibility inputs to the `tools-ki` migration. They do not establish two permanent public layers. `tools-ki` and Arcadia must record the migration and compatibility treatment before code changes; Granola introduces no third syntax.

### Receiver selection and coverage

Each eligible repository declares the Granola folder identities it accepts and an explicit unfoldered policy. Unfoldered is not inferred from an empty folder name. Acquisition reports how many meetings were selected, excluded, unmatched, or selected by more than one receiver. Interactive runs may prompt for human consideration; unattended runs must emit durable warnings and follow only the configured policy rather than guessing.

The initial rollout gives `kit-principal` complete catch-all coverage. As mappings mature, a provider-wide coverage plan may assign named folders directly to the repositories expected to retain their knowledge. `kit-principal` can then retain Personal, unfoldered, and residual unmatched scopes. Correct direct ingress avoids large transfer trades while preserving a catch-all that prevents knowledge loss.

Complete acquisition is a property of the union of receiver scopes, not of any single repository. A provider-wide reconciliation snapshot must prove that every discovered stable identity is represented by an accepted receiver scope or is explicitly awaiting human resolution. Overlap is visible and never silently deduplicated across repositories. The multiple-folder precedence or intentional-duplication policy remains an implementation decision requiring owner approval.

### Complete incremental acquisition

The adapter paginates every live folder and the complete unfiltered meeting population, unions results by stable meeting identity, identifies unfoldered meetings as identities absent from every folder result, and compares the resulting counts. Compatible folder memberships merge as routing evidence; conflicting source representations fail closed for review.

Checkpoint selection compares the stable identity, source update evidence, and a canonical content hash. New or changed meetings are read and packaged; unchanged meetings are skipped only when the existing KEP verifies. A missing identity or exit from a repository's configured scope is reported as a delta and never interpreted as source deletion. A successful repeat produces no unexplained delta. Interrupted runs leave verified immutable packages recoverable and never claim ledger completion for an unverified write.

### Amendments and reconciliation

The acquisition key is the provider account plus stable Granola meeting identity. The acquired version is the hash of the faithfully captured source state and available assets. A change to notes, summary, folders, tags, participants, transcript, attachments, audio, or recording state creates a new immutable KEP linked to the same source identity; earlier packages are not rewritten.

A folder change can move a later version into a different receiver scope. The earlier repository retains its verified evidence and records scope exit or supersession, while the new receiver acquires the current version directly from Granola. The absence of a meeting from one local scope is not evidence that Granola deleted it. If prior harvested knowledge is affected, the changed version is flagged for triage and any cross-island correction uses a bounded trade with receipt evidence.

If source deletion is never enabled, this versioned reconciliation loop is the steady state: Granola remains mutable working state, Knowledge Islands retains immutable observations and durable harvested knowledge, and each repeat reports new, changed, missing, unmatched, or conflicting state. KI never writes its classification or reconciliation decisions back to Granola through this provider.

### Acquisition fidelity

The adapter preserves stable identity, Granola URL, title, creation and update times, folder identity and name, tags, participants, generated notes or summary, raw transcript, attachment, audio, and recording references and bytes wherever the selected source can faithfully provide them. It records separate hashes for source payloads and available assets. Account-tier or API limitations become explicit omissions; summaries do not masquerade as transcripts, references do not masquerade as media bytes, and canonical renderings do not replace original provider payloads.

### Repository responsibilities and trades

- **Harness:** Owns `ki-housekeeping-granola`, the reusable four-operation contract, receiver-selection and reconciliation semantics, fidelity requirements, retirement-safety standards, fixtures, and outbound trade preparations.
- **Granola adapter:** Owns authentication, pagination, rate-limit handling, source schemas, faithful reads, content-minimised checkpoints, and a no-mutation tool surface. Repository creation and ownership require separate approval.
- **tools-ki:** Owns the single public CLI, repository resolution, provider-neutral KEP builder, Granola profile, atomic Harbour staging, local and provider-wide checkpoint/ledger mechanics, coverage reporting, and KEP verification. Delivery requires an approved work trade and receiver-controlled planning and acceptance.
- **Arcadia:** Remains the authority for the provider-neutral lifecycle, corrects the public command language, and decides when Granola evidence is sufficient to shape a portable acquisition specification. Delivery is a knowledge trade linked to `KI-ARCADIA-MOD-006`, not a Harness edit to Arcadia.
- **kit-principal:** Owns its `+/_ACQUIRE/granola/`, initial catch-all and later Personal/unfoldered/residual selectors, local acquisition ledger, coverage coordination, and later triage and harvesting process. Delivery requires route activation and an approved work trade.
- **Other receiving repositories:** Own their skill activation, folder selectors, Harbour packages, local ledger, and triage. They receive work only through their own approved roadmap and trade routes.

Trades are not required when a meeting is acquired directly into the intended receiver. They remain appropriate when an acquisition was routed incorrectly, a changed meeting affects knowledge already promoted elsewhere, or harvested knowledge has wider applicability. Those trades should carry the bounded material and disposition evidence needed by the receiver rather than treating the original meeting corpus as one large transfer.

### Unresolved Granola capabilities

- Whether an available API or MCP supports cursor or page-token pagination over complete historical, unfiltered, and folder-scoped meetings.
- Whether stable meeting URLs, creation and update timestamps, folder IDs and names, tags, participant identities, and source-version indicators are returned consistently.
- Whether `get_meetings` exposes a raw provider payload suitable for faithful preservation or only a generated-summary projection.
- Whether note, folder, tag, participant, transcript, and media amendments reliably change an update indicator or require full re-hashing.
- Whether raw transcript access exists for the account tier; local legacy records conflict, and the current scheduled activity says it is unavailable.
- Whether attachments, audio, and recordings are available as references, downloadable bytes, expiring URLs, or not exposed at all.
- Whether pagination order is stable, rate limits and retry tokens are documented, and historical queries can be partitioned without omissions.
- Whether meeting deletion or folder removal is represented by a tombstone, disappearance, or another auditable source event.
- Whether Granola offers a supported recoverable export, archive operation, deletion API, or deletion-manifest facility. No such capability is assumed.

### Legacy-use-case treatment

The legacy activities contribute source vocabulary, stable IDs, folder evidence, participant and summary use, unfoldered detection, and the principle that the source remains in Granola. Direct note creation, one-folder scoping, recent windows, one-meeting pickers, processed or skipped tags, and source mutation are not compatibility requirements. The new workflow acquires first, preferably into the expected receiver, then triages or trades only the material that needs another home.

### Future retirement safety gate

Granola retirement is a separate future operation and remains unavailable until an exact proposed manifest proves:

1. Complete acquisition-count reconciliation across the union of receiver scopes, every folder, and unfoldered history.
2. Stable source identities and hashes for every meeting version in scope.
3. A repeat acquisition with no unexplained new, changed, missing, failed, overlapping, unmatched, or unverifiable meeting.
4. Successful KEP checksum and manifest verification for every acquired package.
5. A recorded harvest, retention, or routing disposition for every meeting.
6. Confirmed `ki-trades` receipts for material routed to other islands.
7. A recoverable provider export or archive where Granola supports one.
8. An exact deletion manifest naming every source identity and reviewed hash.
9. Explicit human approval of that exact manifest immediately before mutation.

Any source amendment after manifest generation invalidates the manifest and its approval. If Granola exposes no safe archive or delete API, the system emits a verified manual-release manifest and stops. Browser automation is not an acceptable substitute. Choosing never to delete is valid and leaves recurring incremental reconciliation as the permanent operating model.
