# Compatible harness contract

Reference companion to [ADR-KI-HARNESS-012](../ADR-KI-HARNESS-012-compatible-harness-publication-and-governed-rubric-boundary.md).

This is a harness-publication contract, not a CLI decision. It defines the artefacts a compatible harness publishes; `tools-ki` defines how it registers, installs, selects, and executes them.

## Harness identity and payload

A compatible harness is a verified regular-file payload rooted at one directory. Its identity derives from the installed `<owner>/<repository>` path, not from a manifest within the payload.

The baseline harness identifier is `knowledgeislands/ki-agentic-harness`.

Harness identifiers use lowercase owner and name segments separated by one `/`; neither segment is empty, `.` or `..`, and an identifier is not a filesystem path.

The current payload contains only `skills/`, `subagents/`, and `hooks/`. The host verifies immutable archive evidence before extraction, rejects escaping or unsafe paths, and discovers capabilities only from the resulting physical payload.

## Capability inventory and identity

The current recognised capability kind is `skill`. A skill's local name and contained source root derive from its `SKILL.md` frontmatter and directory. Other capability kinds reserve a qualified identity shape until the host supports them.

A skill's qualified identity is `<harness-id>:<skill-name>`, for example `knowledgeislands/ki-agentic-harness:ki-repo`.

Other kinds reserve `<harness-id>:<kind>/<name>`, for example `example/operations:mcp-server/catalogue`.

An installed skill's source and frontmatter are authoritative. A file or module cannot become executable merely because it appears beneath the harness root.

## Governed rubric definitions

A governed skill publishes its contained rubric definition, evidence/context builders, and declared safe repairs. The definition is data and domain logic for the generic host runtime, not a self-contained runner or an alternative CLI.

The host loads a recognised rubric definition in process only after it has validated the harness and inventory. It never shells out to a capability script, imports an unrecognised module, or treats a repository-vendored runner as an alternative implementation.

The definition receives a host-owned immutable context containing the physical repository root when applicable, the selected capability identity, parsed declared configuration, and the verified harness identity.

AUDIT is read-only. CONFORM declares its intended safe repairs to a transaction interface that validates the complete write set before the first write, honours dry-run, and re-audits after commit. The host owns integrity, resolution, compatibility, generic rubric execution, transaction, and reporting infrastructure; a capability owns its governed rubric and domain findings.

## Activation and future versioning

A runtime projection is separate from an installed harness source. The current host writes managed links to verified installed sources and refuses altered, unfamiliar, or escaping state. A copied projection and a version-selection model are future work; neither may change existing qualified capability identities or make a nearby checkout a source of truth.
