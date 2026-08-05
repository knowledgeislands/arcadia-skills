# Governance boundary matrix

Reference companion to [GDR-KI-FUNDAMENTALS-001](../GDR-KI-FUNDAMENTALS-001-knowledge-islands-ecosystem-fundamentals.md), [SDR-KI-HARNESS-001](../SDR-KI-HARNESS-001-purpose-and-scope-of-the-agentic-harness.md), [SDR-KI-HARNESS-002](../SDR-KI-HARNESS-002-runtime-portable-contracts-and-executor-positioning.md), and [ADR-KI-HARNESS-SKILLS-006](../ADR-KI-HARNESS-SKILLS-006-concern-first-skill-taxonomy-and-implication-graph.md).

This is an inspection aid, not a new standard or policy layer.

It makes the existing boundaries testable before a proposed skill, decision, or implementation creates duplicate ownership.

| Class | Canonical owner | Representative surface | Boundary test |
| --- | --- | --- | --- |
| Portable contract | `ki-specifications` | KIS documents, schemas, conformance rules, and reference examples | Does it constrain every implementation claiming conformance, regardless of runtime or repository? If so, Specifications owns the normative contract; the harness and `tools-ki` supply evidence and implementations. |
| Knowledge Islands estate policy | `ki-arcadia-principal` | Philosophy and conceptual model; shared cross-repository governance where all primary repositories must agree | Does it set the estate's purpose, authority, or cross-repository direction rather than a reusable capability? If so, Arcadia owns the policy; a shared record carries only the agreed cross-repository statement. |
| Reusable harness mechanic | `ki-agentic-harness` | Skills, governed rubric definitions, compatible-harness payload, and capability semantics | Does it define or implement a reusable agentic capability without defining a normative portable contract or a vendor configuration? If so, the harness owns it; `tools-ki` owns generic host execution. |
| Runtime-specific binding | The matching `ki-<concern>-<runtime>` adapter in `ki-agentic-harness` | Claude JSON, Codex TOML, runtime hooks, or runtime-specific projections | Does it name a vendor runtime, native configuration format, or runtime lifecycle? If so, the adapter owns the delta; its portable root remains the source of any runtime-neutral declaration. |

## Review result

The reviewed sources show no duplicate owner that requires a standard split or a new policy layer.

The intentional hand-offs are: Specifications constrains implementations; Arcadia informs the estate; the harness publishes reusable capability semantics; `tools-ki` hosts their generic execution; and runtime adapters translate portable roots into vendor-native surfaces.

An apparent overlap is a conflict only when two classes both claim the same authoritative rule or write target.

Otherwise, a link, conformance dependency, implementation evidence, or generated projection is an intentional boundary crossing and remains with its named owner.
