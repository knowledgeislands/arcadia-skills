export type AuditOutcome = {
  status: 'PASS' | 'VIOLATION' | 'NOT_APPLICABLE'
  message: string
  subject?: string
}

export type DelegationRubricContext = {
  packets: {
    outcomes: readonly AuditOutcome[]
    normaliseLegacyEscalation?: () => void
  }
}

export type RubricContextOptions = {
  mode: 'audit' | 'conform'
  repository: string
}

export type RubricSession<Context> = {
  subjects: readonly { families: readonly string[]; context: () => Context }[]
  proposal: () => { writes: readonly { path: string; content: string }[] }
}

export type RubricFamily<Context extends DelegationRubricContext> = {
  code: string
  title: string
  description: string
  standard: string
  selectContext: (context: Context) => Context['packets']
  items: readonly {
    code: string
    title: string
    description: string
    sources: readonly string[]
    mechanical: {
      level: 'FAIL'
      audit: { phase: 'INSPECT'; run: (context: Context['packets']) => readonly AuditOutcome[] }
      conform?: { phase: 'NORMALISE'; run: (context: Context['packets']) => void }
    }
    judgment?: { prompt: string }
  }[]
}

export type SkillRubricDefinition<Context extends DelegationRubricContext> = {
  contract: 1
  name: string
  concern: string
  createSession: (options: RubricContextOptions) => RubricSession<Context>
  families: readonly RubricFamily<Context>[]
}
