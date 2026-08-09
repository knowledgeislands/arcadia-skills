/**
 * Eval scenarios for the `ki-engineering` skill — the common toolchain
 * + enforcement framework.
 *
 * Design note: a capable model already knows generic TS/Bun hygiene (lint, test,
 * tsconfig strictness), so testing those shows "no difference". These scenarios target
 * house-ARBITRARY specifics a baseline cannot derive: the native repository operation surface,
 * direct tool execution and config-gated Vitest posture, the cli-chmod rule, and the
 * common-vs-artifact composition that defines how a repo is audited.
 */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-engineering',
    id: 'eng-governed-entrypoints',
    prompt:
      'In our Knowledge Islands TypeScript/Bun repos, which native commands run the complete and engineering-scoped audit/conform operations, where do the code tools run, and when does the Vitest profile apply?',
    assertions: [
      {
        name: 'native audit/conform',
        re: /ki repo audit[^.\n]{0,80}ki repo conform|ki repo conform[^.\n]{0,80}ki repo audit/
      },
      { name: 'skill-scoped engineering', re: /--skill\s+ki-engineering/ },
      { name: 'no package aliases', re: /(no|not|without)[^.\n]{0,50}(package|script|alias)/i },
      {
        name: 'code tools internal',
        re: /(Biome|TypeScript|tsc)[^.\n]{0,80}(inside|internal|direct)|inside[^.\n]{0,80}(Biome|TypeScript|tsc)/i
      },
      { name: 'runner-neutral test', re: /(bare|runner-neutral)[^.\n]{0,30}`?test`?/i },
      { name: 'Vitest config-gated', re: /vitest\.config[^.\n]{0,50}(gate|select|present|carry|when)/i }
    ],
    rubric:
      'House rule: `ki repo audit` and `ki repo conform` host the complete declared governance set; `--skill ki-engineering` narrows either operation. Package aliases and skill-owned wrappers are absent. Biome, TypeScript, syncpack, and knip run directly inside the engineering rubric; Markdown tools run inside authoring. Tests use the runner-neutral bare `test` idiom. The canonical Vitest scripts, globals, and 100% coverage profile apply only when `vitest.config.*` selects Vitest. A correct answer covers the native commands, direct code tools, test entrypoint, and Vitest conditional.'
  },
  {
    skill: 'ki-engineering',
    id: 'eng-cli-chmod',
    prompt:
      'In our repos that compile to dist/, what is the rule for what the `build` script chmods +x — and what must it NOT chmod?',
    assertions: [
      { name: 'chmod dist/cli/cli.js', re: /dist\/cli\/cli\.js/ },
      { name: 'iff src/cli exists', re: /(iff|only if|when)[^.\n]{0,30}src\/cli|src\/cli[^.\n]{0,30}(exist|present)/i },
      {
        name: 'never the server/mcp-server bin',
        re: /(not|never|no)[^.\n]{0,40}(server|mcp-server)[^.\n]{0,12}bin|(server|mcp-server)[^.\n]{0,20}(not|never|no) chmod/i
      }
    ],
    rubric:
      'House rule (a deliberate decision): the `build` script chmods `dist/cli/cli.js` **iff** `src/cli/` exists, and chmods NOTHING ELSE — in particular not the server / `dist/mcp-server/index.js` bin (package managers set +x on bin at install, and launchers run via `node`). A correct answer states chmod dist/cli/cli.js only when src/cli/ exists, and that the mcp-server/server bin must NOT be chmodded.'
  },
  {
    skill: 'ki-engineering',
    id: 'eng-composition',
    prompt:
      'How does `ki repo audit` fully audit a workspace MCP repository — which declared capabilities run, what does each own, and how do they compose?',
    assertions: [
      {
        name: 'engineering common layer',
        re: /ki-engineering[^.\n]{0,50}(common|toolchain)|engineering[^.\n]{0,40}(common|toolchain)/i
      },
      { name: 'mcp delta', re: /ki-repo-mcp[^.\n]{0,50}(delta|MCP)|MCP delta/i },
      {
        name: 'declared native composition',
        re: /(declared|\.ki-config)[^.\n]{0,80}(both|sequence|compose)|(?:both|sequence|compose)[^.\n]{0,80}(declared|\.ki-config)/i
      }
    ],
    rubric:
      'House architecture: `ki-engineering` owns the common toolchain (native audit wiring, direct code-tool checks, the `bun test` trap, tsconfig/biome, config-gated Vitest, .env, and the cli-chmod rule); `ki-repo-mcp` owns only the MCP delta (src/ layout, bin/exports, tool naming, and conditional coverage exclusions). `.ki-config.toml` declares both capabilities, and the native `ki repo audit` composes their registered rubrics in dependency order. The repo is clean only when both pass. A correct answer identifies the two layers and native declared composition.'
  }
]
