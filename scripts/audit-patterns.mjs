import console from 'node:console'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import process from 'node:process'

const root = process.cwd()
const patternsDir = join(root, 'src/components/patterns')
const designSystemPath = join(root, 'docs/design/DESIGN_SYSTEM.md')

const requiredComponents = [
  'HeroSection.astro',
  'SplitFeature.astro',
  'ProcessSteps.astro',
  'LinkGrid.astro',
  'CTASection.astro',
  'FAQList.astro',
]

const implementedPatternNames = requiredComponents.map((file) =>
  file.replace('.astro', ''),
)

const pagePatternImports = new Map(
  implementedPatternNames.map((name) => [name, []]),
)

function walkAstroFiles(directory) {
  const entries = []

  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      entries.push(...walkAstroFiles(fullPath))
      continue
    }

    if (entry.endsWith('.astro')) {
      entries.push(fullPath)
    }
  }

  return entries
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

  for (const name of implementedPatternNames) {
    if (!new RegExp(`^#### ${name}$`, 'm').test(designSystem)) {
      failures.push(
        `Design system documentation is missing the component heading for: ${name}`,
      )
    }
  }
}

for (const pagePath of walkAstroFiles(join(root, 'src/pages'))) {
  const source = readFileSync(pagePath, 'utf8')

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

console.log('Pattern usage report:')
for (const name of implementedPatternNames) {
  const pages = pagePatternImports.get(name) ?? []
  const report = pages.length
    ? pages.map(({ page, specifier }) => `${page} (${specifier})`).join(', ')
    : 'no current page imports'

  console.log(`- ${name}: ${report}`)
}

if (failures.length > 0) {
  console.error('Pattern audit failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Pattern audit passed.')
