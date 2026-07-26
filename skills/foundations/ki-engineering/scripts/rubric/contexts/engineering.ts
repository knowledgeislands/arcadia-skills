import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { collectAuditEvidence, type EngineeringEvidenceFinding } from './audit-evidence.ts'

export type EngineeringRepairWrite = {
  readonly path: string
  readonly content: string
  readonly create?: boolean
}

export type EngineeringRepairCommand = {
  readonly program: string
  readonly arguments: readonly string[]
}

export type EngineeringRepairProposal = {
  readonly writes: readonly EngineeringRepairWrite[]
  readonly commands?: readonly EngineeringRepairCommand[]
}

export type EngineeringRubricContext = {
  readonly repository: string
  readonly documents: ReadonlyMap<string, string>
  readonly audit: (code: string) => readonly EngineeringEvidenceFinding[]
  readonly repair: (code: string) => EngineeringRepairProposal
}

const requiredDev = ['@biomejs/biome', 'knip', 'prettier', 'husky', 'lint-staged', 'markdownlint-cli2', 'syncpack', 'typescript']
const versions: Record<string, string> = {
  '@biomejs/biome': '^2.5.4',
  knip: '^6.27.0',
  prettier: '^3.9.5',
  husky: '^9.1.7',
  'lint-staged': '^17.1.0',
  'markdownlint-cli2': '^0.23.1',
  syncpack: '^15.3.2',
  typescript: '^7.0.2'
}
const lintStaged = {
  '*.{ts,tsx,js,jsx,json,jsonc}': ['bunx @biomejs/biome check --write --no-errors-on-unmatched'],
  '*.md': ['bunx prettier --write', 'bunx markdownlint-cli2 --no-globs']
}
const defaults: Record<string, string> = {
  'mise.toml': `[tools]\nnode = "22"\nbun = "1.3.14"\n`,
  'tsconfig.json': `{
  "compilerOptions": {
    "target": "es2024",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "noUnusedLocals": true
  },
  "include": ["src/**/*.ts"]
}
`,
  'biome.json': `{
  "$schema": "https://biomejs.dev/schemas/2.5.4/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "includes": ["**", "!src/generated", "!.claude/skills", "!.claude/agents", "!.agents/skills"],
    "ignoreUnknown": true
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "lineWidth": 140,
    "indentWidth": 2
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "asNeeded",
      "trailingCommas": "none"
    }
  },
  "linter": {
    "enabled": true,
    "rules": {
      "preset": "recommended",
      "suspicious": { "noExplicitAny": "off" }
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": { "organizeImports": "on" }
    }
  }
}
`,
  'knip.json': `{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "entry": ["src/index.ts"],
  "project": ["src/**/*.ts"],
  "ignoreExportsUsedInFile": true
}
`
}

const legacyAggregateScript = (key: string): boolean =>
  key === 'ki:audit' || key === 'ki:conform' || key === 'ki:educate' || key === 'ki:help'

const legacyToolScript = (key: string): boolean =>
  /^ki:(lint|deps):/.test(key) || key === 'ki:knip' || key === 'ki:verify' || /^ki:[a-z-]+:lint$/.test(key)

const legacySkillModeScript = (key: string): boolean => /^ki:[a-z-]+:(audit|conform|educate|help)$/.test(key)

const legacyRuntimeOnlyScript = (value: string): boolean =>
  /^\s*(?:bun|node)\s+\S*(?:\.ki\/(?:bin|bootstrap)\/|scripts\/(?:govern|educate)\.ts|scripts\/rubric\/index\.ts|scripts\/vendored\/).*$/.test(
    value
  )

const packageWrite = (context: EngineeringRubricContext): EngineeringRepairProposal => {
  const source = context.documents.get('package.json')
  if (!source) return { writes: [] }
  let value: Record<string, unknown>
  try {
    value = JSON.parse(source) as Record<string, unknown>
  } catch {
    return { writes: [] }
  }
  const packageJson = structuredClone(value)
  packageJson.type = 'module'
  packageJson.packageManager = 'bun@1.3.14'
  packageJson.engines = { ...((packageJson.engines as Record<string, string> | undefined) ?? {}), node: '>=22' }
  const devDependencies = { ...((packageJson.devDependencies as Record<string, string> | undefined) ?? {}) }
  for (const dependency of requiredDev) devDependencies[dependency] ??= versions[dependency] as string
  packageJson.devDependencies = devDependencies
  packageJson['lint-staged'] = lintStaged
  const scripts = { ...((packageJson.scripts as Record<string, string> | undefined) ?? {}) }
  for (const key of Object.keys(scripts)) {
    if (
      legacyAggregateScript(key) ||
      legacyToolScript(key) ||
      legacySkillModeScript(key) ||
      legacyRuntimeOnlyScript(scripts[key] ?? '')
    )
      delete scripts[key]
  }
  scripts.clean = scripts.clean?.includes('node_modules') ? scripts.clean : 'rm -rf dist node_modules'
  scripts.prepare = 'husky'
  packageJson.scripts = scripts
  const content = `${JSON.stringify(packageJson, null, 2)}\n`
  return content === source ? { writes: [] } : { writes: [{ path: 'package.json', content }] }
}

const scaffold = (context: EngineeringRubricContext, name: keyof typeof defaults): EngineeringRepairProposal =>
  context.documents.has(name) ? { writes: [] } : { writes: [{ path: name, content: defaults[name], create: true }] }

const engineeringMarker = (context: EngineeringRubricContext): EngineeringRepairProposal => {
  const source = context.documents.get('.ki-config.toml')
  if (source === undefined) return { writes: [{ path: '.ki-config.toml', content: '[ki-engineering]\n', create: true }] }
  if (/^\[ki-engineering\]/m.test(source)) return { writes: [] }
  return { writes: [{ path: '.ki-config.toml', content: `${source.replace(/\n*$/, '\n\n')}[ki-engineering]\n` }] }
}

const commands = (value: readonly EngineeringRepairCommand[]): EngineeringRepairProposal => ({ writes: [], commands: value })

const repair = (code: string, context: EngineeringRubricContext): EngineeringRepairProposal => {
  switch (code) {
    case 'PKG-1':
    case 'PKG-2':
    case 'PKG-3':
    case 'PKG-5':
    case 'PKG-6':
    case 'SCR-2':
    case 'SCR-3':
    case 'SCR-4':
    case 'SCR-5':
      return packageWrite(context)
    case 'MISE-1':
      return scaffold(context, 'mise.toml')
    case 'TSC-2':
      return scaffold(context, 'tsconfig.json')
    case 'BIO-1':
      return commands([
        { program: 'bunx', arguments: ['@biomejs/biome', 'check', '--write', '--unsafe'] },
        { program: 'bunx', arguments: ['@biomejs/biome', 'format', '--write'] }
      ])
    case 'BIO-2':
      return scaffold(context, 'biome.json')
    case 'KNIP-1':
      return scaffold(context, 'knip.json')
    case 'KNIP-2':
      return commands([{ program: 'bunx', arguments: ['knip', '--fix', '--no-config-hints'] }])
    case 'SYNC-1':
      return commands([{ program: 'bunx', arguments: ['syncpack', 'format'] }])
    case 'DEPS-1':
      return commands([
        { program: 'bun', arguments: ['update', '--latest'] },
        { program: 'bun', arguments: ['install'] }
      ])
    case 'TOML-1':
      return engineeringMarker(context)
    default:
      return { writes: [] }
  }
}

const readDocuments = (repository: string): ReadonlyMap<string, string> =>
  new Map(
    ['package.json', '.ki-config.toml', 'mise.toml', 'tsconfig.json', 'biome.json', 'knip.json'].flatMap((name) => {
      const path = join(repository, name)
      return existsSync(path) ? [[name, readFileSync(path, 'utf8')] as const] : []
    })
  )

export const createEngineeringContext = ({ repository }: { readonly repository: string }): EngineeringRubricContext => {
  const absoluteRepository = resolve(repository)
  const context: EngineeringRubricContext = {
    repository: absoluteRepository,
    documents: readDocuments(absoluteRepository),
    audit: (code) => collectAuditEvidence(absoluteRepository, code),
    repair: (code) => repair(code, context)
  }
  return context
}
