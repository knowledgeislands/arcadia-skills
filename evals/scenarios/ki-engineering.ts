/**
 * Outcome scenarios for `ki-engineering`.
 *
 * Each prompt supplies a concrete review situation. The assertions distinguish an
 * assisted answer that applies the house contract from a generic TS/Bun answer;
 * they are not recall questions about a single rule.
 */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-engineering',
    id: 'eng-refresh-separates-release-range-and-lock',
    prompt:
      'A refresh finds the harness manifest declares `rumdl: ^0.2.52`, its committed bun.lock resolves 0.2.52, and rumdl has released 0.2.54. We are only changing the engineering skill, not root package files. What should the source record say, what may this change do now, and who decides the version update?',
    assertions: [
      { name: 'range distinguished from resolution', re: /(range|declared)[^.\n]{0,70}\^0\.2\.52[^.\n]{0,90}(lock|resolved)[^.\n]{0,30}0\.2\.52/i },
      { name: 'upstream availability distinguished', re: /(upstream|release)[^.\n]{0,80}0\.2\.54/i },
      { name: 'no root manifest mutation', re: /(do not|cannot|not)[^.\n]{0,70}(package\.json|root manifest|lockfile)/i },
      { name: 'owner decides', re: /(root|manifest|integration)[^.\n]{0,80}(owner|decide|approval)/i }
    ],
    rubric:
      'A source refresh records three different facts: upstream 0.2.54 is available; package.json deliberately selects the compatible ^0.2.52 range; bun.lock resolves 0.2.52 today. With no root-config authority, update only the source evidence and make a precise owner-facing recommendation; do not silently edit package.json or bun.lock. A correct answer states that the root manifest/lock owner decides the normal dependency update.'
  },
  {
    skill: 'ki-engineering',
    id: 'eng-build-profile-audit-is-complete',
    prompt:
      'A compiled TypeScript repository has build `tsc -p tsconfig.build.json`, files ["dist"], and a tsconfig.build.json with extends, noEmit false, declaration true, outDir ./dist, noUncheckedIndexedAccess true, and test exclusion. It omits declarationMap, rootDir, and allowImportingTsExtensions false. State the audit outcome and the smallest safe repair; do not create package-script governance aliases.',
    assertions: [
      { name: 'build criterion surfaced', re: /BUILD-2|build TypeScript configuration/i },
      { name: 'declaration map required', re: /declarationMap[^.\n]{0,35}true/i },
      { name: 'root directory required', re: /rootDir[^.\n]{0,35}(\.\/src|src)/i },
      { name: 'imports extension setting required', re: /allowImportingTsExtensions[^.\n]{0,35}false/i },
      { name: 'native operations retained', re: /(no|not|without)[^.\n]{0,50}(package|script|alias)/i }
    ],
    rubric:
      'The compiled-build profile is incomplete and produces BUILD-2 diagnostic findings for declarationMap true, rootDir ./src, and allowImportingTsExtensions false. Repair only tsconfig.build.json and rerun the native engineering audit. A correct answer does not add ki:lint, ki:verify, or any package wrapper to work around the check.'
  },
  {
    skill: 'ki-engineering',
    id: 'eng-published-export-protected-before-knip-fix',
    prompt:
      'A package exports `./parse` as `./dist/main/email/parse.js`, but knip.json entry only covers `src/main/*/index.ts`. Knip reports the parse export as unused and someone proposes `knip --fix`. How should the engineering audit classify this, what evidence should be checked, and what is the safe next action?',
    assertions: [
      { name: 'published export criterion', re: /KNIP-3|published export|entry point/i },
      { name: 'maps dist to source', re: /src\/main\/email\/parse\.ts|dist\/main\/email\/parse\.js/i },
      { name: 'no destructive fix', re: /(do not|must not|avoid)[^.\n]{0,70}knip --fix/i },
      { name: 'human chooses entry correction', re: /(review|human|author)[^.\n]{0,90}(entry|glob|export)/i }
    ],
    rubric:
      'This is a KNIP-3 published-entry-point gap: map the built export to src/main/email/parse.ts and verify whether an intended entry glob reaches it. Do not run knip --fix while that public surface is unresolved because it can remove genuine API. Adding the correct entry glob or correcting the export is a human decision, so the audit is diagnostic rather than an automatic conform repair.'
  }
]
