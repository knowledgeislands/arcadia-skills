# Sources — where the standard comes from

**Refresh:** external-spec · monthly

The authoritative and community sources behind the [Workspace MCP Standard](standards-mcp-servers.md) and [Audit Rubric](rubric.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the standard, rubric, and [`scripts/rubric/items/index.ts`](../scripts/rubric/items/index.ts), then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below (what changed is recorded in the commit, not a changelog). This is the skill's memory of where the standard comes from—keep it current.

Two layers feed the standard: the **official MCP specification** (what every conformant server must do) and the **in-house workspace convention** (the opinionated shape the six sibling repos share on top of the spec). A finding is only "spec-driven" if it traces to the Authoritative table; everything else is house style and should be labelled as such so it is not mistaken for a protocol requirement.

## Authoritative (official MCP spec)

The spec is versioned by date. Track the **latest released** version and note the current one here.

| Tag       | Source                                 | Governs | Last reviewed |
| --------- | -------------------------------------- | ------- | ------------- |
| SPEC      | [MCP spec — versioning / latest][spec] | ※       | 2026-07-29    |
| CHANGELOG | [2026-07-28 changelog][changelog]      | †       | 2026-07-29    |
| TOOLS     | [Server → Tools][tools]                | ‡       | 2026-06-21    |
| SEC       | [Security Best Practices][sec]         | §       | 2026-06-21    |
| AUTH      | [Authorization][auth]                  | ¶       | 2026-06-21    |

† What changed since 2025-11-25 (stateless core, `server/discover`, required `resultType`, Multi Round-Trip Requests, tasks moved to an extension, transport-session and SSE-resumability removals).

‡ Tool shape, `inputSchema`/`outputSchema`, `structuredContent`, annotations, `isError` vs protocol errors, tool-name charset/length, `icons`, `execution.taskSupport`.

§ Confused deputy, token passthrough, SSRF, session hijacking, scope minimization, local-server compromise.

¶ OAuth 2.1 framework, token audience, PKCE, dynamic client registration — relevant to the gmail / m365 auth-servers.

※ Which dated revision is current (latest released: **2026-07-28**; implementation target **2025-11-25**, the newest the TypeScript SDK supports).

## Community

| Tag       | Source                                                        | Governs | Last reviewed |
| --------- | ------------------------------------------------------------- | ------- | ------------- |
| COMMUNITY | [Tool Annotations as Risk Vocabulary (MCP blog)][annotations] | †       | 2026-06-21    |
| COMMUNITY | [NSA/CISA — MCP security CSI][csi]                            | ‡       | 2026-06-21    |

† What the `*Hint` annotations can and can't do — anchors the annotation-driven gate.

‡ External restatement of MCP server hardening (least privilege, allowlists, logging).

## In-house (the workspace convention)

The standard is defined as the **majority shape** across the six sibling repos under `knowledgeislands/`. These are the living source of truth for house style; when they diverge from each other, the majority wins and the outlier is a finding unless documented.

| Tag    | Source                      | Governs                                                       | Last reviewed |
| ------ | --------------------------- | ------------------------------------------------------------- | ------------- |
| REPOS  | The six sibling repos †     | Layout, config, tool naming, shared `utils/`, the toolchain ‡ | 2026-06-21    |
| CLAUDE | Each repo's own `CLAUDE.md` | Per-repo invariants ※                                         | 2026-06-21    |

† `mcp-git-audit`, `mcp-ki-kb-fs`, `mcp-gsuite`, `mcp-m365`, `mcp-claude-housekeeping`, `mcp-ki-kb-notion-mirror`.

‡ Layout, config injection, tool naming, the shared `utils/` helpers, the package/tsconfig/vitest/biome toolchain.

※ The per-repo statement of its own invariants — the standard tracks these and flags drift.

## Last review

REFRESH last run **2026-07-29**. Latest released spec revision: **2026-07-28** (published 2026-07-28, confirmed live). Implementation target: **2025-11-25** — the newest revision the TypeScript SDK supports.

**The staged re-anchor fired.** The live spec index (SPEC) now names **2026-07-28** as `(latest)`, so the watch-item carried since 2026-07-04 is resolved and retired. The RC shipped on its target date.

**Confirmed changed** — the 2026-07-28 changelog (CHANGELOG) lands the staged set and more: MCP becomes stateless (the `initialize` / `notifications/initialized` handshake removed, SEP-2575); protocol sessions and `Mcp-Session-Id` removed from Streamable HTTP (SEP-2567); a new `server/discover` RPC that servers **MUST** implement to advertise protocol versions, capabilities, and identity; **every result now carries a required `resultType`** (`"complete"`, or `"input_required"` for Multi Round-Trip interim results, SEP-2322), which replaces server-initiated `roots/list` / `sampling/createMessage` / `elicitation/create`; `ping`, `logging/setLevel`, and `notifications/roots/list_changed` removed; Tasks moved out of core into an official extension (SEP-2663); SSE resumability and message redelivery removed; an `extensions` field on client and server capabilities; and cacheable list/read results.

**Why the standard does not re-anchor §12–13 to it yet** — the TypeScript SDK has not shipped 2026-07-28 support. Verified directly against the published artifacts rather than release notes: `LATEST_PROTOCOL_VERSION` is `'2025-11-25'` in both `@modelcontextprotocol/sdk` **1.29.0** (what the repos declare) and **1.30.0** (current `latest`), and the registry exposes no prerelease implementing the new revision — `dist-tags` is `latest: 1.30.0` alone, its only prerelease an unrelated `1.23.0-beta.0`. The 2026-07-04 note that TypeScript beta SDKs for the RC were published is therefore **not confirmed** on this package. Every sibling server correctly targets the newest revision its SDK supports, so §12–13 stay anchored to 2025-11-25 and the conformance work below is blocked upstream, not merely unscheduled. The release also brings a 12-month deprecation-lifecycle policy (SEP-2596), so nothing is switched off in the interim.

TOOLS/SEC/AUTH and the Community/In-house rows were not re-fetched this pass (fixed dated artifacts, verbatim-confirmed 2026-06-21); their `last reviewed` cells are unchanged. Only SPEC and CHANGELOG were re-verified live and bumped to 2026-07-29.

**Open watch-items:**

- **Re-anchor §12–13 + §4 to 2026-07-28 when the TypeScript SDK ships support.** Re-check `LATEST_PROTOCOL_VERSION` in the published package each pass; that constant, not the spec date, gates the work. Two changes reach into the house standard when it lands: the required `resultType` on every result touches the shared `jsonResult` / `errorResult` envelope helpers in each repo's `utils/`, and `server/discover` is a new per-server MUST. For the auth repos, RFC 9207 `iss` + DCR `application_type`.
- Rate-limiting is a spec MUST kept lower-priority for local stdio servers (revisit if one goes remote).
- **Structured output is now partly adopted, unevenly.** `mcp-git-audit`, `mcp-gsuite`, `mcp-m365`, `mcp-ki-kb-notion-mirror`, and `mcp-claude-housekeeping` declare `outputSchema`; **`mcp-ki-kb-fs` declares none while its shared `jsonResult` emits `structuredContent` for every tool**, which is the WARN condition in §12. (Supersedes the retired "no repo yet declares `outputSchema`" item.)
- Five proposed annotation SEPs (`unsafeOutputHint`, `secretHint`, `trustedHint`, trust/sensitivity, governance/UX) still Draft — gate's four-hint vocabulary stable, no action; watch for any landing in a released spec.

(What past reviews changed in the standard / checklist / native rubric — structured output, the OAuth security invariants, tool-name charset bounds, output sanitization, the relaxed tool-name regex — is in git.)

[spec]: https://modelcontextprotocol.io/specification
[changelog]: https://modelcontextprotocol.io/specification/2026-07-28/changelog
[tools]: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
[sec]: https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices
[auth]: https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
[annotations]: https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/
[csi]: https://www.nsa.gov/Portals/75/documents/Cybersecurity/CSI_MCP_SECURITY.pdf
