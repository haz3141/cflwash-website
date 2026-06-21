import console from 'node:console'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'

const root = process.cwd()
const patternsDir = join(root, 'src/components/patterns')
const heroSectionPath = join(patternsDir, 'HeroSection.astro')
const designSystemPath = join(root, 'docs/design/DESIGN_SYSTEM.md')
const tokensPath = join(root, 'src/styles/tokens.css')
const scanRoots = [
  join(root, 'src/components'),
  join(root, 'src/layouts'),
  join(root, 'src/pages'),
  join(root, 'src/styles'),
]

const requiredComponents = [
  'HeroSection.astro',
  'MediaFrame.astro',
  'ServiceDetailPage.astro',
  'ServiceMenu.astro',
  'SplitFeature.astro',
  'ProcessSteps.astro',
  'LinkGrid.astro',
  'CTASection.astro',
  'FAQList.astro',
  'ServiceAreaPage.astro',
]

const implementedPatternNames = requiredComponents.map((file) =>
  file.replace('.astro', ''),
)

const pagePatternImports = new Map(
  implementedPatternNames.map((name) => [name, []]),
)
const publicPageThemeDriftPatterns = [
  {
    label: 'raw hex color',
    pattern: /#[0-9A-Fa-f]{3,8}/,
  },
  {
    label: 'raw rgb/rgba color',
    pattern: /\brgba?\(/,
  },
  {
    label: 'important background override',
    pattern: /!bg-/,
  },
  {
    label: 'inline style attribute',
    pattern: /\bstyle=/,
  },
  {
    label: 'public page style block',
    pattern: /<style(?:\s|>)/,
  },
  {
    label: 'ad hoc numeric shadow utility',
    pattern: /shadow-\[[^\]]*\d/,
  },
]
const legacyColorUtilityPrefixes =
  'bg|text|border|from|via|to|ring|divide|outline|decoration|placeholder|accent|caret|fill|stroke'
const themeDriftPatterns = [
  ...publicPageThemeDriftPatterns.filter(
    ({ label }) => label !== 'public page style block',
  ),
  {
    label: 'legacy Tailwind color utility',
    pattern: new RegExp(
      `\\b(?:${legacyColorUtilityPrefixes})-(?:slate|blue|gray)-[0-9]{2,3}(?:\\/[0-9]{1,3})?\\b`,
    ),
  },
  {
    label: 'raw Tailwind white opacity utility',
    pattern: new RegExp(
      `\\b(?:${legacyColorUtilityPrefixes})-white(?:\\/[0-9]{1,3})?\\b`,
    ),
  },
  {
    label: 'ad hoc Tailwind shadow utility',
    pattern: /(?<!theme-)shadow-(?:sm|md|lg|xl|2xl)\b|shadow-\[/,
  },
  {
    label: 'one-off gradient utility',
    pattern: /\b(?:bg-gradient|from-|via-|to-)/,
  },
  {
    label: 'duplicated action text-link treatment',
    pattern:
      /font-semibold\s+text-\[var\(--color-action\)\]\s+underline|underline\s+decoration-\[var\(--color-border\)\]/,
  },
]

const approvedThemeDriftContexts = [
  {
    path: join('src', 'styles', 'tokens.css'),
    reason: 'brand primitive and semantic token source of truth',
  },
  {
    path: join('src', 'styles', 'global.css'),
    reason: 'documented shared utilities and base styles',
  },
]
const approvedDevOnlyPageContext = {
  path: join('src', 'pages', 'dev'),
  reason: 'dev-only QA route excluded from public theme enforcement',
}
const approvedThemeDriftFiles = new Set(
  approvedThemeDriftContexts.map(({ path }) => path),
)
const quoteButtonVariantPolicy = new Map([
  [join('src', 'components', 'home', 'HomeHero.astro'), ['primary']],
  [join('src', 'components', 'site', 'Header.astro'), ['accent', 'accent']],
  [join('src', 'components', 'site', 'Footer.astro'), ['accent']],
  [join('src', 'components', 'site', 'MobileStickyCTA.astro'), ['accent']],
  [
    join('src', 'components', 'patterns', 'ServiceDetailPage.astro'),
    ['primary', 'light'],
  ],
  [
    join('src', 'components', 'patterns', 'ServiceAreaPage.astro'),
    ['primary', 'light'],
  ],
  [join('src', 'pages', 'index.astro'), ['primary']],
  [join('src', 'pages', 'services.astro'), ['primary', 'light']],
  [join('src', 'pages', 'service-areas.astro'), ['primary', 'light']],
])
const buttonColorOverridePatterns = [
  /\bbg-\[/,
  /\bborder-\[/,
  /\bfrom-\[/,
  /\bvia-\[/,
  /\bto-\[/,
  /\bfill-\[/,
  /\bstroke-\[/,
  /\baccent-\[/,
  /\bcaret-\[/,
  /\bplaceholder-\[/,
  /\bdecoration-\[/,
  /\boutline-\[/,
  /\btext-\[(?:var\(--color|#|rgb|hsl)/,
  new RegExp(
    `\\b(?:bg|text|border|from|via|to|outline|decoration|placeholder|accent|caret|fill|stroke)-(?:white|black|slate|gray|blue|green|red|orange|amber|yellow|neutral|stone|zinc)-[0-9]{2,3}(?:\\/[0-9]{1,3})?\\b`,
  ),
]

function walkFiles(directory, extensions) {
  const entries = []

  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      entries.push(...walkFiles(fullPath, extensions))
      continue
    }

    if (extensions.some((extension) => entry.endsWith(extension))) {
      entries.push(fullPath)
    }
  }

  return entries
}

function walkAstroFiles(directory) {
  return walkFiles(directory, ['.astro'])
}

function isDevOnlyPage(relativePath) {
  return relativePath.startsWith(join('src', 'pages', 'dev'))
}

function isApprovedThemeContext(relativePath) {
  return (
    approvedThemeDriftFiles.has(relativePath) || isDevOnlyPage(relativePath)
  )
}

function findPatternMatches(source, patterns) {
  return source
    .split('\n')
    .flatMap((line, index) =>
      patterns
        .filter(({ pattern }) => pattern.test(line))
        .map(({ label }) => ({ label, lineNumber: index + 1 })),
    )
}

function listComponentTags(source, componentName) {
  const tags = []
  const tagRegex = new RegExp(`<${componentName}\\b[\\s\\S]*?>`, 'g')

  for (const match of source.matchAll(tagRegex)) {
    const tag = match[0]
    const index = match.index ?? 0
    const lineNumber = source.slice(0, index).split('\n').length
    tags.push({ tag, index, lineNumber })
  }

  return tags
}

function parseTagAttributes(tag) {
  const attributes = {}
  const attributeRegex = /([:@\w-]+)(?:=(?:"([^"]*)"|\{([^}]*)\}))?/g

  for (const match of tag.matchAll(attributeRegex)) {
    const [, name, quotedValue, expressionValue] = match

    if (name === 'Button') {
      continue
    }

    attributes[name] = quotedValue ?? expressionValue ?? true
  }

  return attributes
}

function extractPatternImports(source, pagePath) {
  const imports = []
  const importRegex = /^\s*import\s+([^'";]+?)\s+from\s+['"]([^'"]+)['"]/gm

  for (const match of source.matchAll(importRegex)) {
    const specifier = match[1].trim()
    const importPath = match[2].trim()

    if (!importPath.includes('/components/patterns/')) {
      continue
    }

    const modulePath = resolve(dirname(pagePath), importPath)
    imports.push({ specifier, importPath, modulePath })
  }

  return imports
}

const failures = []

for (const component of requiredComponents) {
  const file = join(patternsDir, component)

  if (!existsSync(file)) {
    failures.push(`Missing required pattern component: ${relative(root, file)}`)
  }
}

if (existsSync(heroSectionPath)) {
  const heroSection = readFileSync(heroSectionPath, 'utf8')
  const minWidthResetCount = heroSection.match(/\bmin-w-0\b/g)?.length ?? 0

  if (minWidthResetCount < 3) {
    failures.push(
      `HeroSection.astro has ${minWidthResetCount} min-w-0 reset(s); the split grid, content child, and media wrapper each require one so intrinsic media cannot expand the mobile layout.`,
    )
  }

  if (!heroSection.includes('gap-[var(--layout-gap)]')) {
    failures.push(
      'HeroSection.astro must consume gap-[var(--layout-gap)] so major split compositions share the semantic layout rhythm.',
    )
  }
}

if (!existsSync(tokensPath)) {
  failures.push(`Missing design tokens: ${relative(root, tokensPath)}`)
} else {
  const tokens = readFileSync(tokensPath, 'utf8')

  if (!tokens.includes('--layout-gap: clamp(2rem, 4vw, 4rem);')) {
    failures.push(
      'Design tokens must include the exact definition "--layout-gap: clamp(2rem, 4vw, 4rem);" for the shared major-split rhythm.',
    )
  }
}

if (!existsSync(designSystemPath)) {
  failures.push(
    `Missing design system documentation: ${relative(root, designSystemPath)}`,
  )
} else {
  const designSystem = readFileSync(designSystemPath, 'utf8')

  if (!/^### Page Pattern Components$/m.test(designSystem)) {
    failures.push(
      'Design system documentation is missing the Page Pattern Components section heading',
    )
  }

  if (!designSystem.includes('`--layout-gap`')) {
    failures.push(
      'Design system documentation is missing `--layout-gap`; document the semantic shared-layout gap token used to keep interior hero rhythm consistent.',
    )
  }

  for (const name of implementedPatternNames) {
    if (!new RegExp(`^#### ${name}$`, 'm').test(designSystem)) {
      failures.push(
        `Design system documentation is missing the component heading for: ${name}`,
      )
    }
  }

  if (!/^#### Semantic quote CTA policy$/m.test(designSystem)) {
    failures.push(
      'Design system documentation is missing the "Semantic quote CTA policy" heading under Button usage.',
    )
  }

  for (const policyLine of [
    'Light page surfaces: quote CTA = `primary`; secondary action = `secondary`.',
    'Branded or inverse CTA panels: quote CTA = `light`; secondary action = `inverseGhost`.',
    'Persistent global chrome: quote CTA = `accent`.',
  ]) {
    if (!designSystem.includes(policyLine)) {
      failures.push(
        `Design system documentation must include the semantic quote CTA rule: ${policyLine}`,
      )
    }
  }

  if (designSystem.includes('`--color-secondary`')) {
    failures.push(
      'Design system documentation must not document `--color-secondary`; the unused green alias is misleading next to the Button `secondary` variant.',
    )
  }
}

for (const pagePath of walkAstroFiles(join(root, 'src/pages'))) {
  const source = readFileSync(pagePath, 'utf8')
  const relativePagePath = relative(root, pagePath)

  if (!isDevOnlyPage(relativePagePath)) {
    for (const { label, lineNumber } of findPatternMatches(
      source,
      publicPageThemeDriftPatterns,
    )) {
      failures.push(
        `Public page ${relativePagePath}:${lineNumber} contains ${label}; use a token, primitive variant, pattern prop, or shared utility instead.`,
      )
    }
  }

  for (const { specifier, modulePath } of extractPatternImports(
    source,
    pagePath,
  )) {
    const patternName = implementedPatternNames.find(
      (name) =>
        relative(root, modulePath) ===
        join('src/components/patterns', `${name}.astro`),
    )

    if (!patternName) {
      continue
    }

    pagePatternImports.get(patternName)?.push({
      page: relative(root, pagePath),
      specifier,
    })
  }
}

const scanFiles = scanRoots.flatMap((directory) =>
  walkFiles(directory, ['.astro', '.css']),
)

for (const filePath of scanFiles) {
  const source = readFileSync(filePath, 'utf8')
  const relativePath = relative(root, filePath)

  if (isApprovedThemeContext(relativePath)) {
    continue
  }

  for (const { label, lineNumber } of findPatternMatches(
    source,
    themeDriftPatterns,
  )) {
    failures.push(
      `${relativePath}:${lineNumber} contains ${label}; use src/styles/tokens.css, a semantic utility, a primitive variant, or a pattern prop instead.`,
    )
  }

  if (!relativePath.endsWith('.astro')) {
    continue
  }

  const buttonTags = listComponentTags(source, 'Button').map((entry) => ({
    ...entry,
    attributes: parseTagAttributes(entry.tag),
  }))

  const expectedQuoteVariants = quoteButtonVariantPolicy.get(relativePath)

  if (expectedQuoteVariants) {
    const actualQuoteVariants = buttonTags
      .filter(({ attributes }) => attributes['data-cta'] === 'quote')
      .map(({ attributes }) => attributes.variant || 'primary')

    if (
      actualQuoteVariants.length !== expectedQuoteVariants.length ||
      actualQuoteVariants.some(
        (variant, index) => variant !== expectedQuoteVariants[index],
      )
    ) {
      failures.push(
        `${relativePath} must keep quote CTA variants ${expectedQuoteVariants.join(', ')} in source order; found ${actualQuoteVariants.join(', ') || 'none'}.`,
      )
    }
  }

  for (const { attributes, lineNumber } of buttonTags) {
    if (typeof attributes.class !== 'string') {
      continue
    }

    if (
      buttonColorOverridePatterns.some((pattern) =>
        pattern.test(attributes.class),
      )
    ) {
      failures.push(
        `${relativePath}:${lineNumber} applies color-bearing Button class overrides; move the color decision into Button variants, tokens, or a documented pattern instead.`,
      )
    }
  }
}

console.log('Direct page-pattern import report:')
for (const name of implementedPatternNames) {
  const pages = pagePatternImports.get(name) ?? []
  const report = pages.length
    ? pages.map(({ page, specifier }) => `${page} (${specifier})`).join(', ')
    : 'no direct page imports'

  console.log(`- ${name}: ${report}`)
}
console.log('Nested pattern use is owned by shared page-pattern components.')

console.log('Approved theme-drift scan exclusions:')
for (const { path, reason } of approvedThemeDriftContexts) {
  console.log(`- ${path}: ${reason}`)
}
console.log(
  `- ${approvedDevOnlyPageContext.path}/**: ${approvedDevOnlyPageContext.reason}`,
)

if (failures.length > 0) {
  console.error('Pattern audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Pattern audit passed.')
