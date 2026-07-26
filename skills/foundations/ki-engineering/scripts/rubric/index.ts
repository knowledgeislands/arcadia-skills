import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createEngineeringContextFactory, type EngineeringRubricContext } from './contexts/engineering.ts'
import { KI_ENGINEERING_RUBRIC } from './items/index.ts'

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<EngineeringRubricContext>[]
}

type NativeEngineeringContext = Omit<EngineeringRubricContext, 'target' | 'dryRun' | 'repair'> & {
  readonly repository: string
  readonly documents: ReadonlyMap<string, string>
  readonly checkers: readonly string[]
}

const catalogue = KI_ENGINEERING_RUBRIC.families as unknown as readonly LegacyFamily[]
const requiredDev = ['@biomejs/biome', 'knip', 'prettier', 'husky', 'lint-staged', 'markdownlint-cli2', 'syncpack', 'typescript']
const versions: Record<string, string> = {
  '@biomejs/biome': '^1.9.4',
  knip: '^5.44.0',
  prettier: '^3.4.2',
  husky: '^9.1.7',
  'lint-staged': '^15.3.0',
  'markdownlint-cli2': '^0.15.0',
  syncpack: '^13.0.0',
  typescript: '^5.7.2'
}
const canonicalScripts: Record<string, string> = {
  'ki:audit': 'bun .ki/bin/aggregate.ts audit',
  'ki:conform': 'bun .ki/bin/aggregate.ts conform',
  'ki:educate': 'bun .ki/bin/aggregate.ts educate',
  'ki:help': 'bun .ki/bin/aggregate.ts help'
}
const lintStaged = {
  '*.{ts,tsx,js,jsx,json}': ['bunx @biomejs/biome check --write --no-errors-on-unmatched'],
  '*.md': ['bunx prettier --write', 'bunx markdownlint-cli2 --no-globs']
}
const defaults: Record<string, string> = {
  'mise.toml': `[tools]\nnode = "22"\nbun = "1.3.0"\n`,
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
    "verbatimModuleSyntax": true,
    "noUnusedLocals": true
  },
  "include": ["src/**/*.ts"]
}
`,
  'biome.json': `{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "files": {
    "includes": ["**", "!**/.ki/bootstrap", "!**/.ki/bin"]
  },
  "formatter": {
    "enabled": true,
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
      "recommended": true,
      "suspicious": { "noExplicitAny": "off" }
    }
  },
  "organizeImports": { "enabled": true }
}
`,
  'knip.json': `{
  "$schema": "https://unpkg.com/knip@5/schema.json",
  "entry": ["src/index.ts"],
  "project": ["src/**/*.ts"]
}
`
}

const mechanical = (item: RubricItem<EngineeringRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeEngineeringContext) => definition.audit.run(context as unknown as EngineeringRubricContext)
  }
}

const judgment = (item: RubricItem<EngineeringRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const retired = (key: string): boolean =>
  /^ki:(lint|deps):/.test(key) || key === 'ki:knip' || key === 'ki:verify' || /^ki:[a-z-]+:lint$/.test(key)

const packageWrite = (context: NativeEngineeringContext) => {
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
  packageJson.packageManager = 'bun@1.3.0'
  packageJson.engines = { ...((packageJson.engines as Record<string, string> | undefined) ?? {}), node: '>=22' }
  const devDependencies = { ...((packageJson.devDependencies as Record<string, string> | undefined) ?? {}) }
  for (const dependency of requiredDev) devDependencies[dependency] ??= versions[dependency] as string
  packageJson.devDependencies = devDependencies
  packageJson['lint-staged'] = lintStaged
  const scripts = { ...((packageJson.scripts as Record<string, string> | undefined) ?? {}) }
  Object.assign(scripts, canonicalScripts)
  for (const key of Object.keys(scripts)) if (retired(key)) delete scripts[key]
  for (const skill of context.checkers) {
    const suffix = skill.replace(/^ki-/, '')
    scripts[`ki:${suffix}:audit`] = `bun .ki/bin/aggregate.ts audit --skill ${skill}`
    scripts[`ki:${suffix}:conform`] = `bun .ki/bin/aggregate.ts conform --skill ${skill}`
  }
  scripts.clean ??= 'rm -rf dist node_modules'
  if (!scripts.clean.includes('node_modules')) scripts.clean = 'rm -rf dist node_modules'
  scripts.prepare = 'husky'
  packageJson.scripts = scripts
  const content = `${JSON.stringify(packageJson, null, 2)}\n`
  return content === source ? { writes: [] } : { writes: [{ path: 'package.json', content }] }
}

const scaffold = (context: NativeEngineeringContext, name: keyof typeof defaults) =>
  context.documents.has(name) ? { writes: [] } : { writes: [{ path: name, content: defaults[name], create: true }] }

const engineeringMarker = (context: NativeEngineeringContext) => {
  const source = context.documents.get('.ki-config.toml')
  if (source === undefined) return { writes: [{ path: '.ki-config.toml', content: '[ki-engineering]\n', create: true }] }
  if (/^\[ki-engineering\]/m.test(source)) return { writes: [] }
  return { writes: [{ path: '.ki-config.toml', content: `${source.replace(/\n*$/, '\n\n')}[ki-engineering]\n` }] }
}

const commands = (commands: ReadonlyArray<{ readonly program: string; readonly arguments: readonly string[] }>) => ({
  writes: [],
  commands
})

const nativeItem = (item: RubricItem<EngineeringRubricContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  switch (item.code) {
    case 'PKG-1':
    case 'PKG-2':
    case 'PKG-3':
    case 'PKG-5':
    case 'PKG-6':
    case 'SCR-2':
    case 'SCR-3':
    case 'SCR-4':
    case 'SCR-5':
      return { ...native, repair: packageWrite }
    case 'MISE-1':
      return { ...native, repair: (context: NativeEngineeringContext) => scaffold(context, 'mise.toml') }
    case 'TSC-2':
      return { ...native, repair: (context: NativeEngineeringContext) => scaffold(context, 'tsconfig.json') }
    case 'BIO-1':
      return {
        ...native,
        repair: () =>
          commands([
            { program: 'bunx', arguments: ['@biomejs/biome', 'check', '--write', '--unsafe'] },
            { program: 'bunx', arguments: ['@biomejs/biome', 'format', '--write'] }
          ])
      }
    case 'BIO-2':
      return { ...native, repair: (context: NativeEngineeringContext) => scaffold(context, 'biome.json') }
    case 'KNIP-1':
      return { ...native, repair: (context: NativeEngineeringContext) => scaffold(context, 'knip.json') }
    case 'KNIP-2':
      return { ...native, repair: () => commands([{ program: 'bunx', arguments: ['knip', '--fix', '--no-config-hints'] }]) }
    case 'SYNC-1':
      return { ...native, repair: () => commands([{ program: 'bunx', arguments: ['syncpack', 'format'] }]) }
    case 'DEPS-1':
      return {
        ...native,
        repair: () =>
          commands([
            { program: 'bun', arguments: ['update', '--latest'] },
            { program: 'bun', arguments: ['install'] }
          ])
      }
    case 'TOML-1':
      return { ...native, repair: engineeringMarker }
    default:
      return native
  }
}

const documents = (repository: string): ReadonlyMap<string, string> =>
  new Map(
    ['package.json', '.ki-config.toml', 'mise.toml', 'tsconfig.json', 'biome.json', 'knip.json'].flatMap((name) => {
      const path = join(repository, name)
      return existsSync(path) ? [[name, readFileSync(path, 'utf8')] as const] : []
    })
  )

const checkers = (repository: string): readonly string[] => {
  const directory = join(repository, '.ki', 'bootstrap', 'checkers')
  if (!existsSync(directory)) return []
  return readdirSync(directory)
    .filter((name) => statSync(join(directory, name)).isDirectory())
    .sort()
}

export default {
  contract: 1,
  skill: 'ki-engineering',
  createContext: ({ repository }: { readonly repository: string }): NativeEngineeringContext => {
    const {
      target: _target,
      dryRun: _dryRun,
      repair: _repair,
      ...evidence
    } = createEngineeringContextFactory({ target: repository, dryRun: true })()
    return { repository, ...evidence, documents: documents(repository), checkers: checkers(repository) }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
