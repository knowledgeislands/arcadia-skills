import type { AuditOutcome, RubricItem, RubricOutcomes } from '../../shared/rubric.ts'
import { type BindingRubricContext, RECOGNISED } from '../contexts/binding.ts'

export const BIND_1: RubricItem<BindingRubricContext> = {
  code: 'BIND-1',
  title: 'file-editable surfaces agree with the source',
  description: 'Every rendered surface contains exactly the KI-governed servers that target it.',
  sources: ['standards.md'],
  mechanical: {
    level: 'WARN',
    audit: {
      phase: 'INSPECT',
      run: ({ sourceState, surfaces }) => {
        if (sourceState.kind !== 'valid')
          return [{ status: 'NOT_APPLICABLE', message: 'The source could not be read, so surfaces were not compared.' }]
        const universe = new Set(sourceState.entries.flatMap((entry) => (entry.name ? [entry.name] : [])))
        return surfaces.flatMap<AuditOutcome>(({ surface, serverKeys }): RubricOutcomes<AuditOutcome> => {
          if (serverKeys === null)
            return [
              {
                status: 'INFO' as const,
                message: `${surface.label} configuration is absent or unreadable; this surface was not compared.`,
                subject: surface.path
              }
            ]
          const expected = new Set(
            sourceState.entries.filter((entry) => entry.name && entry.clients?.includes(surface.token)).map((entry) => entry.name)
          )
          const present = new Set([...serverKeys].filter((name) => universe.has(name)))
          const missing = [...expected].filter((name) => !present.has(name)).sort()
          const stray = [...present].filter((name) => !expected.has(name)).sort()
          if (!missing.length && !stray.length)
            return [
              {
                status: 'PASS' as const,
                message: `${surface.label} agrees with the source (${expected.size} server(s)).`,
                subject: surface.path
              }
            ]
          return [
            ...(missing.length
              ? [
                  {
                    status: 'VIOLATION' as const,
                    message: `${surface.label} is missing ${missing.length} expected server(s): ${missing.join(', ')}.`,
                    subject: surface.path
                  }
                ]
              : []),
            ...(stray.length
              ? [
                  {
                    status: 'VIOLATION' as const,
                    message: `${surface.label} has ${stray.length} stray server(s): ${stray.join(', ')}.`,
                    subject: surface.path
                  }
                ]
              : [])
          ]
        })
      }
    }
  }
}

export const BIND_2: RubricItem<BindingRubricContext> = {
  code: 'BIND-2',
  title: 'single MCP source is valid',
  description: 'The source exists, parses, and names supported surfaces.',
  sources: ['standards.md'],
  mechanical: {
    level: 'FAIL',
    overrideLevels: ['WARN'],
    audit: {
      phase: 'PREPARE',
      run: ({ source, sourceState }) => {
        if (sourceState.kind === 'absent')
          return [{ status: 'VIOLATION', message: 'The single MCP source is absent; create it or pass --source.', subject: source }]
        if (sourceState.kind === 'invalid')
          return [{ status: 'VIOLATION', message: `The single MCP source cannot be parsed: ${sourceState.message}`, subject: source }]
        const findings = sourceState.entries.flatMap((entry, index) => {
          const location = entry.name ? `Server ${JSON.stringify(entry.name)}` : `Entry ${index + 1}`
          return [
            ...(!entry.name
              ? [{ status: 'VIOLATION' as const, level: 'WARN' as const, message: `${location} has no name.`, subject: source }]
              : []),
            ...((entry.clients ?? []).length === 0
              ? [{ status: 'VIOLATION' as const, level: 'WARN' as const, message: `${location} targets no surface.`, subject: source }]
              : []),
            ...(entry.clients ?? [])
              .filter((client) => !RECOGNISED.has(client))
              .map((client) => ({
                status: 'VIOLATION' as const,
                level: 'WARN' as const,
                message: `${location} names unrecognised surface ${JSON.stringify(client)}.`,
                subject: source
              }))
          ]
        })
        return findings.length
          ? (findings as never)
          : [{ status: 'PASS', message: `The source is valid with ${sourceState.entries.length} declared server(s).`, subject: source }]
      }
    }
  }
}

export const BIND_4: RubricItem<BindingRubricContext> = {
  code: 'BIND-4',
  title: 'Cowork plugin integrity',
  description: 'Cowork settings register and enable the KI plugin.',
  sources: ['standards.md'],
  mechanical: {
    level: 'WARN',
    audit: {
      phase: 'INSPECT',
      run: ({ cowork }) => {
        if (!cowork.files.length)
          return [
            {
              status: 'INFO',
              message: 'No Cowork settings were found; the Cowork surface is not present on this machine.',
              subject: cowork.base
            }
          ]
        const pending = cowork.files.filter((path) => cowork.status(path) !== 'already')
        return pending.length
          ? [
              {
                status: 'VIOLATION',
                message: `The Cowork plugin is not registered or enabled in ${pending.length}/${cowork.files.length} workspace(s); run CONFORM then relaunch Cowork.`
              }
            ]
          : [{ status: 'PASS', message: `The Cowork plugin is registered and enabled in all ${cowork.files.length} workspace(s).` }]
      }
    }
  }
}

export const BIND_5: RubricItem<BindingRubricContext> = {
  code: 'BIND-5',
  title: 'client targeting is right for project use',
  description: 'The clients set reflects intended surface use.',
  sources: ['standards.md'],
  judgment: { prompt: 'Does each server target the surfaces the project needs, without carrying surfaces it should not?' }
}

export const BIND = [BIND_1, BIND_2, BIND_4, BIND_5] as const
