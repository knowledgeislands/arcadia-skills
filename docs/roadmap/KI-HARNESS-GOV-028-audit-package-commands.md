---
id: KI-HARNESS-GOV-028
title: Audit package commands
area: GOV
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: ba91c843419820f6c37679abd8691c665bed951d
---

## Goal

Make every `bun run` command in the estate intentional, correctly named, and aligned with the current direct-CLI governance contract.

## Context

Package scripts can become stale wrappers, duplicate native commands, hide destructive behaviour, or name a verification scope inaccurately. The estate has moved several responsibilities to `ki` and direct tools, so its script keys need one evidence-led inventory rather than ad hoc cleanup.

## Boundary

Do not remove or rename a script merely because it looks redundant, restore retired wrappers for compatibility, or use a script inventory to change a repository's toolchain without its owner and verification boundary.

## Shaping

### Intended approach

Inventory every declared `scripts` key, its caller, underlying command, side effects, and current standard owner. Classify each as a necessary public entrypoint, a useful local alias, stale compatibility surface, or a candidate for repository-owned follow-up.

### Promotion conditions

Promote when the inventory format, estate scope, treatment of scripts outside Bun repositories, and receiver-owned path for any non-trivial repair are agreed.

## Current state

The estate has no current complete script inventory after the move to direct `ki` commands. Existing package keys therefore cannot yet be distinguished reliably between stable entrypoints, useful local aliases, stale wrappers, and unsafe or misleading operations.

## Steps

- [x] Define the inventory fields: repository, package-manager applicability, script key, command, caller or documented purpose, side-effect class, current governing owner, and disposition.
- [x] Inventory every estate repository with a regular `package.json`; record repositories without Bun/package scripts as not applicable rather than treating their absence as drift.
- [x] Compare every `ki:*` key with the current direct-CLI contract and classify each script without changing, restoring, or renaming any package key.
- [x] Record evidence-backed receiver-owned follow-ups for stale, ambiguous, destructive, or unowned scripts; retain a PASS disposition for intentional public entrypoints and local aliases.
- [x] Reconcile inventory totals against the inspected manifests and review the report for false claims of ownership or side effects.

## Files touched

This roadmap item only, as the durable inventory and receiver-routing evidence. No peer `package.json`, lockfile, workflow, or script is changed in this audit.

## Verify

- Every regular estate `package.json` appears once, with an explicit not-applicable result where it has no scripts.
- Every declared script key is represented once in the inventory, and totals reconcile to the source manifests.
- Every proposed change names a receiving repository and remains unimplemented in this item.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This is read-only estate evidence work. Individual repairs belong to their repository owners and do not block the audit record from reaching review.

## Delegation

### Locked decisions

- Only this roadmap item may be written; no package script, lockfile, workflow, or peer repository configuration may change.
- The estate scope is the Harness plus declared `ki-all` members; a repository without a regular `package.json` receives an explicit not-applicable disposition.

### Escalate

- An inaccessible declared member or uncertain manifest scope that prevents an honest reconciliation.
- Any script whose purpose, owner, caller, or side effects cannot be evidenced, and any request to run or alter a script, manifest, lockfile, workflow, or peer record.

### Rounds

- Round 1: `package-command-estate-inventory`.

### Worker: package-command-estate-inventory

- **Deliverable:** Complete package-command inventory, explicit not-applicable results, current-contract classifications, receiver-owned follow-ups, and reconciled totals in this item.
- **Files:** Write only `docs/roadmap/KI-HARNESS-GOV-028-audit-package-commands.md`; read regular estate `package.json` files and their governing standards or caller evidence.
- **Definition of done:** Every in-scope manifest and declared script key appears exactly once with the required fields, and every proposed repair remains receiver-owned and unimplemented.
- **Model:** reasoning — broad but bounded side-effect and ownership classification.
- **Verify:** Orchestrator samples manifest totals and side-effect classifications, confirms no script ran or peer changed, then runs the item's roadmap and authoring audits.
- **Checkpoint:** Return with the completed record and all ambiguous, destructive, stale, or unowned scripts routed as follow-ups; use `GIT_INDEX_FILE=/private/tmp/ki-harness-batch-001-gov028.index` for any Git staging and do not commit.

## Review

### Delivered

A read-only inventory of all 16 repositories in the Harness-owned `ki-all` Agora: 11 regular manifests, including the scriptless `ki-website/site/package.json`, 108 declared script instances, and six repositories with no `package.json` anywhere in their checkout.

### Summary of changes

The inventory classifies 105 scripts as necessary public entrypoints, two as useful local aliases, and one as a receiver-owned follow-up. It records exact commands through the command catalogue, identifies current callers or documented purposes, distinguishes local deletion, generated writes, long-running processes, dependency mutation, hook installation, and external effects, and reconciles all counts to the inspected manifests. No package command was executed and no manifest, lockfile, workflow, peer record, or other Harness file was changed.

### Verification

- Integrated batch result: `8cb15618ff1e9d0da5441d5c9e701f73a94984a8`.
- `ki repo audit --skill ki-change-management-roadmap --repo .` — PASS.
- `ki repo audit --skill ki-authoring --repo .` — PASS.
- Manifest reconciliation using `rg --files ... -g package.json` plus `jq` over every accessible in-scope manifest — 11 regular manifests, 108 scripts, and 59 `ki:*` scripts; the per-manifest counts sum exactly to the inventory.
- Direct-CLI scan over all 108 commands — zero commands invoke `ki repo audit`, `ki repo conform`, `ki repo educate`, `.ki` runtimes, or retired governance wrappers.
- Scoped review with `git diff --name-only -- docs/roadmap/KI-HARNESS-GOV-028-audit-package-commands.md` — only the authorized work-item path is in this lane's diff. A concurrent batch lane added an unrelated `docs/roadmap/KI-HARNESS-GOV-002-deploy-specifications-fleetwide.md` working-tree change after this lane began; it was not read, edited, staged, or included here. The optional temporary Git index was not needed; nothing was staged or committed.

### Outstanding concerns

The `ki-website` receiver must decide whether `ki:site:upload` remains an intentional operational entrypoint. Its remote effect is clear, but current site/hosting standards do not specify it and no checked-in caller was found. Any repair remains unimplemented and receiver-owned.

### Post-change review

The report keeps current behaviour separate from proposed future naming. In particular, it does not adopt the replacement keys proposed by GOV-007, does not treat clearly governed destructive lifecycle commands as defects merely because they delete generated or dependency state, and does not claim ownership where only a broad mechanical namespace admission exists.

### Mini recap

The estate has a reconciled present-tense baseline: 107 intentional scripts and one ambiguous remote-upload entrypoint routed to `ki-website`; all implementation and naming changes remain outside this audit.

## Discussion

### Direct commands

The aim is clarity, not a blanket ban on package scripts. A script remains legitimate when it expresses a stable repository operation better than an undocumented command line.

### Inventory model

Each manifest subsection supplies the repository and package-manager applicability. Every row supplies the script key, an exact command reference, caller or documented purpose, side-effect class, current governing owner, and disposition. A row represents one declared script instance only.

Evidence codes are: `ENG` for `skills/governance/ki-engineering/references/standards-engineering.md`; `BIND` for `skills/environment/ki-binding-claude/SKILL.md` and `skills/repo-structure/ki-repo-plugins/SKILL.md`; `HAR` for `evals/README.md` and the current `ki-engineering` script-owner map; `WEB` for `skills/repo-structure/ki-repo-website/references/standards-eleventy-site.md`; `CF` for `skills/repo-structure/ki-repo-website-cloudflare/references/standards-cloudflare-hosting.md`; `MCP` for `skills/repo-structure/ki-repo-mcp/references/standards-mcp-servers.md`; and `TOOLS` for the `ki-repo-tools` manual rubric and `tools-ki/.github/workflows/ci.yml`.

Side-effect classes are: `R` read-only validation or advisory output apart from temporary test state; `D` deliberate local deletion; `W` repository, generated-output, cache, or coverage writes; `H` Git-hook installation; `U` dependency, manifest, lockfile, and install-state mutation; `L` long-running local process; and `X` external service, quota, or remote-state effect. Combined codes mean combined effects.

Dispositions are: `P` PASS, necessary public entrypoint; `L` PASS, useful local alias; and `F` candidate receiver-owned follow-up. A PASS says the observed operation is intentional under the current contract; it is not permission to run the command during this audit.

### Estate coverage and reconciliation

| Repository | Regular manifests | Scripts | `ki:*` | Applicability |
| --- | ---: | ---: | ---: | --- |
| `ki-agentic-harness` | 1 | 6 | 3 | Bun 1.3.14 root |
| `dotfiles` | 0 | 0 | 0 | N/A: no `package.json` |
| `homebrew-tap` | 0 | 0 | 0 | N/A: no `package.json` |
| `ki-arcadia-principal` | 1 | 3 | 1 | Bun 1.3.14 root |
| `ki-plugins` | 0 | 0 | 0 | N/A: no `package.json` |
| `ki-specifications` | 0 | 0 | 0 | N/A: no `package.json` |
| `ki-techne-principal` | 0 | 0 | 0 | N/A: no `package.json` |
| `ki-website` | 2 | 11 | 9 | Bun 1.3.14 root plus scriptless workspace manifest |
| `mcp-claude-housekeeping` | 1 | 12 | 6 | Bun 1.3.14 root |
| `mcp-git-audit` | 1 | 12 | 6 | Bun 1.3.14 root |
| `mcp-gsuite` | 1 | 16 | 10 | Bun 1.3.14 root |
| `mcp-ki-kb-fs` | 1 | 12 | 6 | Bun 1.3.14 root |
| `mcp-ki-kb-notion-mirror` | 1 | 12 | 6 | Bun 1.3.14 root |
| `mcp-m365` | 1 | 16 | 10 | Bun 1.3.14 root |
| `tools-ki` | 1 | 8 | 2 | Bun 1.3.14 root |
| `tools-mgit` | 0 | 0 | 0 | N/A: no `package.json` |
| **Total** | **11** | **108** | **59** | **16 repositories** |

All declared members were accessible. The `dotfiles` identity was resolved at `/Users/krisbrown/.local/share/chezmoi` from its canonical Git remote and `.ki-config.toml`; the other 15 repositories were inspected under `/Users/krisbrown/workspaces/kit/knowledgeislands/`. Ten manifests declare `bun@1.3.14`; the scriptless `ki-website/site/package.json` inherits the root workspace toolchain and declares no package manager.

### Exact command catalogue

- `C01`: `rm -rf node_modules`
- `C02`: `bun skills/environment/ki-binding-claude/scripts/build-plugin.ts`
- `C03`: `bun update --latest`
- `C04`: `bun evals/harness.ts`
- `C05`: `husky`
- `C06`: `bun test --isolate --max-concurrency=1 ./skills ./hooks`
- `C07`: `rm -rf {node_modules,site/dist}`
- `C08`: `cd site && node --experimental-strip-types ../node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.ts`
- `C09`: `rm -rf site/dist site/.wrangler`
- `C10`: `cd site && bunx wrangler deploy`
- `C11`: `concurrently --kill-others-on-fail --names css,11ty --prefix-colors cyan,yellow "bun run ki:site:dev:css" "bun run ki:site:dev:serve"`
- `C12`: `cd site && bunx tailwindcss -i src/assets/css/main.css -o dist/assets/css/main.css --watch`
- `C13`: `cd site && node --experimental-strip-types ../node_modules/@11ty/eleventy/cmd.cjs --config=eleventy.config.ts --serve --port 3000`
- `C14`: `bun run ki:site:build && cd site && bunx wrangler dev`
- `C15`: `cd site && bunx wrangler versions upload`
- `C16`: `tsc -p tsconfig.build.json`
- `C17`: `rm -rf {dist,node_modules}`
- `C18`: `mcporter emit-ts kit-mcp-claude-housekeeping --mode client --out src/generated/client.ts --types-out src/generated/types.d.ts && printf '// @ts-nocheck\n' | cat - src/generated/client.ts > /tmp/gen-tmp.ts && mv /tmp/gen-tmp.ts src/generated/client.ts`
- `C19`: `NODE_ENV=development bun --watch src/mcp-server/index.ts`
- `C20`: `NODE_ENV=development bunx @modelcontextprotocol/inspector bun src/mcp-server/index.ts`
- `C21`: `bun run build && node dist/mcp-server/index.js`
- `C22`: `bun run build && bun scripts/smoke.ts`
- `C23`: `vitest run`
- `C24`: `vitest run --coverage`
- `C25`: `vitest`
- `C26`: `mcporter emit-ts kit-mcp-git-audit --mode client --out src/generated/client.ts --types-out src/generated/types.d.ts && printf '// @ts-nocheck\n' | cat - src/generated/client.ts > /tmp/gen-tmp.ts && mv /tmp/gen-tmp.ts src/generated/client.ts`
- `C27`: `mcporter emit-ts kit-mcp-gsuite --mode client --out src/generated/client.ts --types-out src/generated/types.d.ts && printf '// @ts-nocheck\n' | cat - src/generated/client.ts > /tmp/gen-tmp.ts && mv /tmp/gen-tmp.ts src/generated/client.ts`
- `C28`: `NODE_ENV=development bun --watch src/auth-server/index.ts`
- `C29`: `bun run build && node dist/auth-server/index.js`
- `C30`: `mcporter record gsuite-integration --server kit-mcp-gsuite -- bun scripts/integration.ts && cp ~/.mcporter/recordings/gsuite-integration.ndjson fixtures/recordings/gsuite-integration.ndjson`
- `C31`: `cp fixtures/recordings/gsuite-integration.ndjson ~/.mcporter/recordings/gsuite-integration.ndjson && mcporter replay gsuite-integration -- bun scripts/integration.ts`
- `C32`: `mcporter emit-ts mcp-ki-kb-mcp-ki-kb-fs --mode client --out src/generated/client.ts --types-out src/generated/types.d.ts && printf '// @ts-nocheck\n' | cat - src/generated/client.ts > /tmp/gen-tmp.ts && mv /tmp/gen-tmp.ts src/generated/client.ts`
- `C33`: `tsc -p tsconfig.build.json && chmod +x dist/cli/cli.js`
- `C34`: `mcporter emit-ts hnr-mcp-ki-kb-notion-mirror --mode client --out src/generated/client.ts --types-out src/generated/types.d.ts && printf '// @ts-nocheck\n' | cat - src/generated/client.ts > /tmp/gen-tmp.ts && mv /tmp/gen-tmp.ts src/generated/client.ts`
- `C35`: `mcporter emit-ts hnr-mcp-m365 --mode client --out src/generated/client.ts --types-out src/generated/types.d.ts && printf '// @ts-nocheck\n' | cat - src/generated/client.ts > /tmp/gen-tmp.ts && mv /tmp/gen-tmp.ts src/generated/client.ts`
- `C36`: `mcporter record m365-integration --server hnr-mcp-m365 -- bun scripts/integration.ts && cp ~/.mcporter/recordings/m365-integration.ndjson fixtures/recordings/m365-integration.ndjson`
- `C37`: `cp fixtures/recordings/m365-integration.ndjson ~/.mcporter/recordings/m365-integration.ndjson && mcporter replay m365-integration -- bun scripts/integration.ts`
- `C38`: `bun build --compile --outfile dist/ki src/main.ts`
- `C39`: `rm -rf dist node_modules`
- `C40`: `mandoc -T lint man/ki.1`

### Manifest inventory

#### `ki-agentic-harness/package.json`

Applicability: Bun 1.3.14 root manifest; six scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `clean` | C01 | Dependency cleanup [ENG] | D | `ki-engineering` | P |
| `ki:binding:build-plugin` | C02 | Build Cowork plugin projection [BIND] | W | `ki-binding-claude` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:eval` | C04 | Run advisory skill evaluations [HAR] | X | `ki-repo-harness` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C06 | Complete Harness test entrypoint [ENG] | R | `ki-engineering` | P |

#### `ki-arcadia-principal/package.json`

Applicability: Bun 1.3.14 root manifest; three scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `clean` | C01 | Dependency cleanup [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |

#### `ki-website/package.json`

Applicability: Bun 1.3.14 root monorepo manifest; 11 scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `clean` | C07 | Root dependency and output cleanup [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:site:build` | C08 | Generate site output; CI caller [WEB] | W | `ki-repo-website` | P |
| `ki:site:clean` | C09 | Delete generated site and Wrangler state [WEB, CF] | D | `ki-repo-website` | P |
| `ki:site:deploy` | C10 | Deploy Worker and assets [CF] | W+X | `ki-repo-website-cloudflare` | P |
| `ki:site:dev` | C11 | Run CSS and Eleventy development processes [WEB] | W+L | `ki-repo-website` | P |
| `ki:site:dev:css` | C12 | CSS watcher called by `ki:site:dev` [WEB] | W+L | `ki-repo-website` | L |
| `ki:site:dev:serve` | C13 | Eleventy server called by `ki:site:dev` [WEB] | W+L | `ki-repo-website` | L |
| `ki:site:preview` | C14 | Build then preview in Worker runtime [CF] | W+L | `ki-repo-website-cloudflare` | P |
| `ki:site:upload` | C15 | Upload a Cloudflare version; no caller found | W+X | none evidenced | F |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |

#### `ki-website/site/package.json`

Applicability: regular workspace manifest with package manager inherited from the Bun 1.3.14 root; no `scripts` object. Disposition: explicit N/A, zero script instances.

#### `mcp-claude-housekeeping/package.json`

Applicability: Bun 1.3.14 root manifest; 12 scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `build` | C16 | Compile distributable output [ENG] | W | `ki-engineering` | P |
| `clean` | C17 | Delete build and dependency state [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:generate:client` | C18 | Regenerate committed typed client [MCP] | W | `ki-repo-mcp` | P |
| `ki:server:mcp:dev` | C19 | Watch MCP source server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:inspect` | C20 | Run MCP inspector [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:start` | C21 | Build and start Node server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:test:smoke` | C22 | Build and wire-test server; CI caller [MCP] | W+R | `ki-repo-mcp` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C23 | Complete Vitest entrypoint; CI caller [ENG] | R | `ki-engineering` | P |
| `test:coverage` | C24 | Coverage gate; CI caller [ENG] | W+R | `ki-engineering` | P |
| `test:watch` | C25 | Interactive Vitest watcher [ENG] | L | `ki-engineering` | P |

#### `mcp-git-audit/package.json`

Applicability: Bun 1.3.14 root manifest; 12 scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `build` | C16 | Compile distributable output [ENG] | W | `ki-engineering` | P |
| `clean` | C17 | Delete build and dependency state [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:generate:client` | C26 | Regenerate committed typed client [MCP] | W | `ki-repo-mcp` | P |
| `ki:server:mcp:dev` | C19 | Watch MCP source server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:inspect` | C20 | Run MCP inspector [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:start` | C21 | Build and start Node server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:test:smoke` | C22 | Build and wire-test server; CI caller [MCP] | W+R | `ki-repo-mcp` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C23 | Complete Vitest entrypoint; CI caller [ENG] | R | `ki-engineering` | P |
| `test:coverage` | C24 | Coverage gate; CI caller [ENG] | W+R | `ki-engineering` | P |
| `test:watch` | C25 | Interactive Vitest watcher [ENG] | L | `ki-engineering` | P |

#### `mcp-gsuite/package.json`

Applicability: Bun 1.3.14 root manifest; 16 scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `build` | C16 | Compile distributable output [ENG] | W | `ki-engineering` | P |
| `clean` | C17 | Delete build and dependency state [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:generate:client` | C27 | Regenerate committed typed client [MCP] | W | `ki-repo-mcp` | P |
| `ki:server:auth:dev` | C28 | Watch OAuth server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:auth:start` | C29 | Build and start OAuth server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:server:mcp:dev` | C19 | Watch MCP source server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:inspect` | C20 | Run MCP inspector [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:start` | C21 | Build and start Node server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:test:record` | C30 | Capture live integration fixture [MCP] | W+X | `ki-repo-mcp` | P |
| `ki:test:replay` | C31 | Replace local recording then replay fixture [MCP] | W+R | `ki-repo-mcp` | P |
| `ki:test:smoke` | C22 | Build and wire-test server; CI caller [MCP] | W+R | `ki-repo-mcp` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C23 | Complete Vitest entrypoint; CI caller [ENG] | R | `ki-engineering` | P |
| `test:coverage` | C24 | Coverage gate; CI caller [ENG] | W+R | `ki-engineering` | P |
| `test:watch` | C25 | Interactive Vitest watcher [ENG] | L | `ki-engineering` | P |

#### `mcp-ki-kb-fs/package.json`

Applicability: Bun 1.3.14 root manifest; 12 scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `build` | C16 | Compile distributable output [ENG] | W | `ki-engineering` | P |
| `clean` | C17 | Delete build and dependency state [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:generate:client` | C32 | Regenerate committed typed client [MCP] | W | `ki-repo-mcp` | P |
| `ki:server:mcp:dev` | C19 | Watch MCP source server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:inspect` | C20 | Run MCP inspector [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:start` | C21 | Build and start Node server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:test:smoke` | C22 | Build and wire-test server; CI caller [MCP] | W+R | `ki-repo-mcp` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C23 | Complete Vitest entrypoint; CI caller [ENG] | R | `ki-engineering` | P |
| `test:coverage` | C24 | Coverage gate; CI caller [ENG] | W+R | `ki-engineering` | P |
| `test:watch` | C25 | Interactive Vitest watcher [ENG] | L | `ki-engineering` | P |

#### `mcp-ki-kb-notion-mirror/package.json`

Applicability: Bun 1.3.14 root manifest; 12 scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `build` | C33 | Compile output and mark CLI executable [ENG] | W | `ki-engineering` | P |
| `clean` | C17 | Delete build and dependency state [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:generate:client` | C34 | Regenerate committed typed client [MCP] | W | `ki-repo-mcp` | P |
| `ki:server:mcp:dev` | C19 | Watch MCP source server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:inspect` | C20 | Run MCP inspector [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:start` | C21 | Build and start Node server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:test:smoke` | C22 | Build and wire-test server; CI caller [MCP] | W+R | `ki-repo-mcp` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C23 | Complete Vitest entrypoint; CI caller [ENG] | R | `ki-engineering` | P |
| `test:coverage` | C24 | Coverage gate; CI caller [ENG] | W+R | `ki-engineering` | P |
| `test:watch` | C25 | Interactive Vitest watcher [ENG] | L | `ki-engineering` | P |

#### `mcp-m365/package.json`

Applicability: Bun 1.3.14 root manifest; 16 scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `build` | C16 | Compile distributable output [ENG] | W | `ki-engineering` | P |
| `clean` | C17 | Delete build and dependency state [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:generate:client` | C35 | Regenerate committed typed client [MCP] | W | `ki-repo-mcp` | P |
| `ki:server:auth:dev` | C28 | Watch OAuth server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:auth:start` | C29 | Build and start OAuth server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:server:mcp:dev` | C19 | Watch MCP source server [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:inspect` | C20 | Run MCP inspector [MCP] | L | `ki-repo-mcp` | P |
| `ki:server:mcp:start` | C21 | Build and start Node server [MCP] | W+L | `ki-repo-mcp` | P |
| `ki:test:record` | C36 | Capture live integration fixture [MCP] | W+X | `ki-repo-mcp` | P |
| `ki:test:replay` | C37 | Replace local recording then replay fixture [MCP] | W+R | `ki-repo-mcp` | P |
| `ki:test:smoke` | C22 | Build and wire-test server; CI caller [MCP] | W+R | `ki-repo-mcp` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C23 | Complete Vitest entrypoint; CI caller [ENG] | R | `ki-engineering` | P |
| `test:coverage` | C24 | Coverage gate; CI caller [ENG] | W+R | `ki-engineering` | P |
| `test:watch` | C25 | Interactive Vitest watcher [ENG] | L | `ki-engineering` | P |

#### `tools-ki/package.json`

Applicability: Bun 1.3.14 root manifest; eight scripts.

| Key | Cmd | Purpose/caller | Effect | Owner | Disposition |
| --- | --- | --- | --- | --- | --- |
| `build` | C38 | Compile standalone CLI [ENG] | W | `ki-engineering` | P |
| `clean` | C39 | Delete build and dependency state [ENG] | D | `ki-engineering` | P |
| `ki:deps:update` | C03 | Dependency maintenance [ENG] | U | `ki-engineering` | P |
| `ki:tools:lint-man` | C40 | Validate manual; CI caller [TOOLS] | R | `ki-repo-tools` | P |
| `prepare` | C05 | Install Husky hooks [ENG] | H | `ki-engineering` | P |
| `test` | C23 | Complete Vitest entrypoint; CI/release caller [ENG] | R | `ki-engineering` | P |
| `test:coverage` | C24 | Coverage gate; CI caller [ENG] | W+R | `ki-engineering` | P |
| `test:watch` | C25 | Interactive Vitest watcher [ENG] | L | `ki-engineering` | P |

### Current direct-CLI classification

The 59 `ki:*` instances contain no current direct-governance wrapper: none invokes `ki repo audit`, `ki repo conform`, `ki repo educate`, a `.ki` runtime, `scripts/govern.ts`, `scripts/educate.ts`, or a vendored rubric runner. The bare lifecycle commands are the current `ki-engineering` idioms; artifact-specific commands are retained only where a declared current capability supplies the documented purpose above.

`ki:eval` and `ki:binding:build-plugin` are classified from present evidence: the current owner map admits them, and the checked-in eval and binding/plugin documentation describes their operations. GOV-007 proposes different future keys, but those names are not current manifest state and are not conclusions of this audit.

### Receiver-owned follow-up

`ki-website/package.json` declares `ki:site:upload` as `cd site && bunx wrangler versions upload`. Git history first added it in `64744124e036ebf90ebd78e387afbd994a1452f3` with the intent “Route Workers Builds through the site role.” The current `ki-repo-website-cloudflare` standard specifies deploy, preview, and clean, while the `ki-repo-website` standard specifies build, dev, its two dev helpers, and clean; neither specifies upload. A repository search found no checked-in caller beyond the manifest. The broad current `ki:site:*` mechanical admission therefore does not evidence an accountable command contract.

Receiver: `ki-website`. Required decision: identify the live Workers Builds caller and document an intentional owner and safety boundary, or remove the key in receiver-owned work. The command uploads remote state, so no audit or automated conform action should run it. If the decision requires a shared standard change, route that separate proposal back to the Harness; this item prescribes neither a replacement key nor a manifest edit.

### Explicit parks

- GOV-007 owns its proposed future script-claim model and prospective Harness key changes. This audit neither adopts those names nor creates compatibility aliases.
- All `clean`, plugin projection, dependency update, generated-client, coverage, build, record/replay, deploy, and upload effects remained unexecuted. The intentional governed operations stay PASS; the ambiguous upload stays parked for `ki-website` human review.
- No manifest or caller repair is implemented here. The inventory is complete without waiting for the receiver decision because the unresolved operation is represented exactly once and routed honestly.
