# Sources — where the standard comes from

**Refresh:** external-spec · monthly

The authoritative and community sources behind the [Workspace MCP Standard](standards-mcp-servers.md) and [Audit Rubric](rubric.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the standard, rubric, and [`scripts/rubric/items/index.ts`](../scripts/rubric/items/index.ts), then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below (what changed is recorded in the commit, not a changelog). This is the skill's memory of where the standard comes from—keep it current.

Two layers feed the standard: the **official MCP specification** (what every conformant server must do) and the **in-house workspace convention** (the opinionated shape the six sibling repos share on top of the spec). A finding is only "spec-driven" if it traces to the Authoritative table; everything else is house style and should be labelled as such so it is not mistaken for a protocol requirement.

## Authoritative (official MCP spec)

The spec is versioned by date. Track the **latest released** version and note the current one here.

| Tag       | Source                                 | Governs | Last reviewed |
| --------- | -------------------------------------- | ------- | ------------- |
| SPEC      | [MCP spec — versioning / latest][spec] | ※       | 2026-08-31    |
| CHANGELOG | [2026-07-28 changelog][changelog]      | †       | 2026-08-31    |
| SDK       | [TypeScript SDK releases][sdk]         | ※       | 2026-08-31    |
| TOOLS     | [Server → Tools][tools]                | ‡       | 2026-08-31    |
| SEC       | [Security Best Practices][sec]         | §       | 2026-08-31    |
| AUTH      | [Authorization][auth]                  | ¶       | 2026-08-31    |

† What changed since 2025-11-25 (stateless core, `server/discover`, required `resultType`, Multi Round-Trip Requests, tasks moved to an extension, transport-session and SSE-resumability removals).

‡ Tool shape, `inputSchema`/`outputSchema`, `structuredContent`, annotations, `isError` vs protocol errors, tool-name charset/length, `icons`, `execution.taskSupport`.

§ Confused deputy, token passthrough, SSRF, session hijacking, scope minimization, local-server compromise. New (confirmed 2026-08-31): OAuth authorization URL validation (javascript:/shell-injection risks for clients); stdio transport proxy security (XSS + proxy escalation). Both are client-focused; §6 server invariants unchanged.

¶ OAuth 2.1 framework, token audience, PKCE, dynamic client registration, Client ID Metadata Documents — relevant to the gmail / m365 auth-servers. DCR now retained for backwards compatibility only; Client ID Metadata Documents (`draft-ietf-oauth-client-id-metadata-document-00`) is the preferred mechanism.

※ Which dated revision is current and whether a released SDK supports it. SDK v2 now ships three packages: `@modelcontextprotocol/client@2.0.0`, `@modelcontextprotocol/server@2.0.0`, `@modelcontextprotocol/core@2.0.0`; `sdk@1.30.0` is the v1 maintenance release. The six sibling repositories remain on the 1.x package and therefore still deliver 2025-11-25 while their v2 migration is planned.

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

† `mcp-git-audit`, `mcp-ki-repo-kb-fs`, `mcp-gsuite`, `mcp-m365`, `mcp-housekeeping-claude`, `mcp-ki-repo-kb-notion-mirror`.

‡ Layout, config injection, tool naming, the shared `utils/` helpers, the package/tsconfig/vitest/biome toolchain.

※ The per-repo statement of its own invariants — the standard tracks these and flags drift.

## Last review

REFRESH last ran **2026-08-31**. Latest released spec revision: **2026-07-28** (confirmed still current; no new revision). SDK v2 packages are now split: `@modelcontextprotocol/client@2.0.0`, `@modelcontextprotocol/server@2.0.0`, `@modelcontextprotocol/core@2.0.0`; `@modelcontextprotocol/sdk@1.30.0` is the v1 maintenance release (Zod 3.25 compatibility, SSE keep-alive). The six sibling repositories remain on the 1.x package and therefore still deliver 2025-11-25 pending the governed migration decision.

**TOOLS re-fetched.** Tool shape stable: `inputSchema`, `outputSchema`, `structuredContent`, annotations, `isError`, tool-name charset/length (1–128 chars, A-Z/a-z/0-9/_/-/.), `icons`, `execution.taskSupport` all match the current standard. No new fields.

**SEC re-fetched.** Two new sections confirmed: "OAuth Authorization URL Validation" (javascript:/shell-injection risks when clients open auth URLs) and "stdio Transport Security in Proxy Scenarios" (XSS + proxy escalation path). Both are client-focused concerns; the §6 server-side security invariants (token passthrough, SSRF, session hijacking, scope minimization, local-server compromise) are unchanged.

**AUTH re-fetched.** Client ID Metadata Documents (`draft-ietf-oauth-client-id-metadata-document-00`) is now the preferred registration mechanism; DCR (RFC7591) is retained for backwards compatibility only. RFC 9207 `iss` parameter validation and DCR `application_type` are formally documented. Confirms the active watch-item for the auth repos.

Community and In-house rows not re-fetched this pass (fixed dated artifacts; private repos unavailable); their `last reviewed` cells are unchanged.

**Open watch-items:**

- **Re-anchor §12–13 + §4 to 2026-07-28 through a v2 migration pilot.** SDK v2 packages are now stable. The required `resultType` touches each repo's shared `jsonResult`/`errorResult` helpers; `server/discover` changes the stdio entry point. For auth repos, assess RFC 9207 `iss` + Client ID Metadata Documents preference under the selected rollout profile.
- Rate-limiting is a spec MUST kept lower-priority for local stdio servers (revisit if one goes remote).
- **Structured output unevenly adopted.** `mcp-ki-repo-kb-fs` declares no `outputSchema` while its shared `jsonResult` emits `structuredContent` for every tool — the WARN condition in §12.
- Five annotation SEPs (`unsafeOutputHint`, `secretHint`, `trustedHint`, trust/sensitivity, governance/UX) still Draft — gate vocabulary stable; watch for any landing in a released spec.

[spec]: https://modelcontextprotocol.io/specification
[changelog]: https://modelcontextprotocol.io/specification/2026-07-28/changelog
[sdk]: https://github.com/modelcontextprotocol/typescript-sdk/releases
[tools]: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
[sec]: https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices
[auth]: https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization
[annotations]: https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/
[csi]: https://www.nsa.gov/Portals/75/documents/Cybersecurity/CSI_MCP_SECURITY.pdf
