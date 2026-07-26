import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createWebsiteCloudflareContext, type WebsiteCloudflareContext } from './contexts/website-cloudflare.ts'
import { KI_WEBSITE_CLOUDFLARE_RUBRIC } from './items/index.ts'

type NativeWebsiteCloudflareContext = WebsiteCloudflareContext & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<WebsiteCloudflareContext>[]
}

const catalogue = KI_WEBSITE_CLOUDFLARE_RUBRIC.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<WebsiteCloudflareContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeWebsiteCloudflareContext) => definition.audit.run(context)
  }
}

const judgment = (item: RubricItem<WebsiteCloudflareContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeItem = (item: RubricItem<WebsiteCloudflareContext>) => (item.mechanical ? mechanical(item) : judgment(item))

// The host may inspect a site's local configuration but cannot infer a Worker
// name, domain routes, account bindings, or a deploy target. Those decisions
// and all Wrangler/Cloudflare operations remain explicitly reported work.
export default {
  contract: 1,
  skill: 'ki-website-cloudflare',
  createContext: ({ repository }: { readonly repository: string }): NativeWebsiteCloudflareContext => ({
    repository,
    ...createWebsiteCloudflareContext(repository)
  }),
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
