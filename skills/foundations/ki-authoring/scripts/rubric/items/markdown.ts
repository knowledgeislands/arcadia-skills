import type { AuditOutcome, RubricItem, RubricOutcomes } from '../../shared/rubric.ts'
import type { AuthoringRubricContext } from '../contexts/authoring.ts'

const markdownAudit = (context: AuthoringRubricContext): RubricOutcomes<AuditOutcome> => {
  if (!context.exists) return [{ status: 'VIOLATION', message: 'audit target is missing or does not exist', subject: context.target }]
  const result = context.markdownAudit()
  return result.clean
    ? [{ status: 'PASS', message: 'Prettier + markdownlint clean', subject: context.target }]
    : [
        {
          status: 'VIOLATION',
          message: `Markdown mechanical check failed — run "bun run ki:authoring:conform" to fix${result.detail ? `\n    ${result.detail}` : ''}`,
          subject: context.target
        }
      ]
}

export const MD_MECH: RubricItem<AuthoringRubricContext> = {
  code: 'MD-mech',
  title: 'Markdown mechanical gate passes',
  description:
    '`ki:authoring:audit` passes: prose is unwrapped; bullet and quote characters, heading hierarchy, a single H1, spacing, table alignment, resolved links and references, no bare URLs, and descriptive link text satisfy Prettier and markdownlint-cli2, which run directly inside the audit.',
  sources: ['standards/markdown.md'],
  mechanical: {
    level: 'FAIL',
    overrideLevels: ['WARN'],
    audit: { phase: 'INSPECT', run: markdownAudit }
  }
}

export const MD_TABLE: RubricItem<AuthoringRubricContext> = {
  code: 'MD-table',
  title: 'wide tables are reshaped',
  description:
    'A table with rows that would exceed `printWidth` (140 chars) is reshaped into subheadings or a bulleted definition list; genuinely tabular data with one long column keeps the table and moves that column to footnotes below it.',
  sources: ['standards/markdown.md'],
  judgment: { prompt: 'Are wide or prose-heavy tables reshaped according to the Markdown convention?' }
}

export const MD_FOOTNOTE: RubricItem<AuthoringRubricContext> = {
  code: 'MD-footnote',
  title: 'table footnotes use the house marker series',
  description:
    'Footnotes use the marker series `† ‡ § ¶ ‖` (then doubled), reset per table, with a distinct second series `※ ❡ ¤ ¥` where needed; each footnote is a separate paragraph.',
  sources: ['standards/markdown.md'],
  judgment: { prompt: 'Do table footnotes use the documented marker series and paragraph layout?' }
}

export const MD_LINK: RubricItem<AuthoringRubricContext> = {
  code: 'MD-link',
  title: 'house-file links are descriptive and portable',
  description:
    'House-file links are descriptive relative Markdown links rather than wikilinks; paths with spaces use angle brackets. KB note content and agent prompts remain explicitly scoped exceptions.',
  sources: ['standards/markdown.md'],
  judgment: { prompt: 'Are the links descriptive, relative Markdown links where this convention applies?' }
}

export const MD_CELL_PROSE: RubricItem<AuthoringRubricContext> = {
  code: 'MD-cell-prose',
  title: 'tables avoid descriptive prose in cells',
  description: 'Tables avoid long descriptive prose in cells — that is the footnote’s job.',
  sources: ['standards/markdown.md'],
  judgment: { prompt: 'Do table cells avoid long descriptive prose?' }
}

export const MD_CALLOUT: RubricItem<AuthoringRubricContext> = {
  code: 'MD-callout',
  title: 'callouts use a supported GitHub alert deliberately',
  description:
    'A callout uses the concise GitHub alert form with one supported label (`NOTE`, `TIP`, `IMPORTANT`, `WARNING`, or `CAUTION`) and only for a contextual aside, not ordinary prose or a required instruction.',
  sources: ['standards/markdown.md'],
  judgment: { prompt: 'Are callouts supported GitHub alerts, concise, and reserved for genuine contextual asides?' }
}

export const MARKDOWN = [MD_MECH, MD_TABLE, MD_FOOTNOTE, MD_LINK, MD_CELL_PROSE, MD_CALLOUT] as const
