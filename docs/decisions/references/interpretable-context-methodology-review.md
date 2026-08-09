# Interpretable Context Methodology review

This reference records a bounded review of Interpretable Context Methodology (ICM) against the harness as it stands on 2026-07-29.

It is evidence for a roadmap review, not an adoption decision or a new workflow contract.

## Primary sources reviewed

- [Interpretable Context Methodology: Folder Structure as Agentic Architecture](https://arxiv.org/abs/2603.16021) — the paper's stated scope and Model Workspace Protocol (MWP) claim.
- [Model Workspace Protocol](https://github.com/RinDig/Model-Workspace-Protocol-MWP-) — the authors' canonical implementation material, including its five context layers and stage-contract shape.

The sources describe MWP for sequential, reviewable workflows: numbered directories encode stages; Markdown files carry scoped context; each stage has explicit inputs, process, and outputs; and people can inspect or edit an intermediate file before the next stage.

They explicitly distinguish that use case from dynamic multi-agent collaboration, high-concurrency systems, and complex automatic branching.

## Comparison

| Dimension | Source evidence | Current KI surface | KI inference and outcome |
| --- | --- | --- | --- |
| Durable structure | MWP makes stages, prompts, references, and intermediate artifacts ordinary files. | `docs/roadmap/` work items, SKILL.md files, references, and Git commits are ordinary, reviewable files. | **Aligned.** Keep durable evidence in repository files rather than introducing a hidden orchestration store. |
| Scoped context | MWP stage contracts name the exact input files and sections needed for one stage. | Runtime subagent delegation uses a cold-agent-ready brief with bounded scope, locked/escalate decisions, and a verification gate; optional `ki-delegation` governs durable packets. | **Aligned, with a potential refinement.** The delegation standard may consider an explicit source-artifact locator in its worker-brief template; it is not required to implement this review. |
| Stage contracts | MWP gives each stage declared inputs, process, and outputs. | `ki-plan`, `ki-implement`, and `ki-accept` use a controlled work-item lifecycle with Steps, Files touched, Verify, Acceptance evidence, and human closure. | **Deliberate difference.** KI governs independently deliverable roadmap work, not one repeated content-production pipeline, so it should retain flat work items rather than numbered stage directories. |
| Human gates | MWP makes an output file editable at a stage boundary. | Ready, acceptance, done, and pruning are separate lifecycle boundaries; `ki-batch` cannot infer acceptance or prune. | **Aligned, stronger in KI.** Preserve explicit authority records and do not replace them with an implied file-presence gate. |
| Mechanical work | MWP delegates deterministic work to local scripts rather than an agent. | `ki` owns deterministic audit/conform execution; skills publish governed domain definitions. | **Aligned.** Keep deterministic verification and safe repairs in the host boundary. |
| Orchestration | MWP uses a filesystem protocol instead of a framework for a sequential workflow. | KI intentionally has no workflow runtime: process skills coordinate file-backed lifecycle procedures, while runtimes supply their own mechanics. | **Deliberate difference.** Do not adopt MWP folders, a new runner, or a filesystem workflow architecture. |
| Runtime portability | MWP is local-first and file-based. | The runtime feature coverage matrix separates portable KI artifacts from runtime-native mechanics. | **Aligned.** File-backed contracts remain the portable layer; runtime hooks, agents, and compaction remain separately evidenced. |

## Result

The review identifies no need for a new runtime framework, numbered-stage filesystem layout, or ICM-specific configuration in this harness.

The only potential improvement is to decide whether a worker brief should consistently name the durable source artifacts a cold worker must read.

That is a KI inference from ICM's explicit-input contract, not an adopted ICM rule, and requires a separately scoped change if pursued.

## Local evidence considered

- Runtime subagent delegation and `ki-delegation` — durable, bounded worker briefs and an orchestrator integration gate.
- `ki-recap` — durable carry-forward digest only at a safe boundary before runtime-native compaction.
- `ki-batch` — independently authorised work-item cycles with mandatory stop conditions and a retained ledger.
- `ki-change-management-roadmap`, `ki-plan`, `ki-implement`, and `ki-accept` — file-backed lifecycle and explicit human acceptance.
- `docs/decisions/references/runtime-feature-coverage.md` — portable KI artifacts are distinct from runtime-native features.

## Review record

Reviewed 2026-07-29.

No external methodology was adopted.
