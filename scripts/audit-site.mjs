import console from 'node:console'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { URL, fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const distDir = path.join(repoRoot, 'dist')
const productionOrigin = 'https://cflwash.com'
const bannedCanonicalHost = 'cflwash-website.pages.dev'
const sitemapIndexUrl = `${productionOrigin}/sitemap-index.xml`
const bannedClaimPhrases = [
  '5-star',
  'fully insured',
  'licensed',
  'same-day',
  'instant booking',
  'online scheduling',
  'online payment',
  'satisfaction guaranteed',
  'guaranteed response',
]
const forbiddenPublicTerms = [
  'MVP',
  'placeholder',
  'future form workflow',
  'no form is implemented',
  'static confirmation route',
  'future quote flow',
]
const assetExtensions = new Set([
  '.avif',
  '.css',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.map',
  '.pdf',
  '.png',
  '.svg',
  '.txt',
  '.webmanifest',
  '.webp',
  '.woff',
  '.woff2',
  '.xml',
])

async function walkFiles(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name
    const absolutePath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolutePath, relativePath)))
      continue
    }

    if (entry.isFile()) {
      files.push(relativePath)
    }
  }

  return files.sort((left, right) => left.localeCompare(right))
}

async function readText(relativePath) {
  return readFile(path.join(distDir, relativePath), 'utf8')
}

function parseAttributes(tag) {
  const attributes = {}
  const tagName = tag.match(/^<([^\s/>]+)/i)?.[1]?.toLowerCase()
  const attributePattern =
    /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

  for (const match of tag.matchAll(attributePattern)) {
    const [, rawName, doubleQuoted, singleQuoted, bareValue] = match
    const name = rawName.toLowerCase()

    if (name === tagName) {
      continue
    }

    attributes[name] = doubleQuoted ?? singleQuoted ?? bareValue ?? ''
  }

  return attributes
}

function getTags(html, tagName) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, 'gi')
  return [...html.matchAll(pattern)].map((match) => match[0])
}

function getRouteFromHtmlFile(relativePath) {
  if (relativePath === 'index.html') {
    return '/'
  }

  if (relativePath.endsWith('/index.html')) {
    const route = relativePath.slice(0, -'/index.html'.length)
    return `/${route}`
  }

  return `/${relativePath.slice(0, -'.html'.length)}`
}

function normalizeRoute(route) {
  if (route === '/') {
    return route
  }

  return route.endsWith('/') ? route.slice(0, -1) : route
}

function findMetaContent(html, metaName) {
  for (const tag of getTags(html, 'meta')) {
    const attributes = parseAttributes(tag)

    if (attributes.name?.toLowerCase() === metaName) {
      return attributes.content ?? ''
    }
  }

  return ''
}

function findCanonicalHref(html) {
  for (const tag of getTags(html, 'link')) {
    const attributes = parseAttributes(tag)
    const relValue = attributes.rel?.toLowerCase().split(/\s+/) ?? []

    if (relValue.includes('canonical')) {
      return attributes.href ?? ''
    }
  }

  return ''
}

function listInternalHrefs(html) {
  const hrefPattern = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/gi
  const hrefs = []

  for (const match of html.matchAll(hrefPattern)) {
    const href = match[1] ?? match[2] ?? match[3] ?? ''

    if (!href.startsWith('/') || href.startsWith('//')) {
      continue
    }

    hrefs.push(href)
  }

  return hrefs
}

function isIndexablePage(html) {
  const robotsContent = findMetaContent(html, 'robots').toLowerCase()
  return !robotsContent.includes('noindex')
}

function getExistingAssetCandidates(routePath) {
  const withoutLeadingSlash = routePath.replace(/^\//, '')
  const ext = path.posix.extname(withoutLeadingSlash)
  const candidates = new Set([withoutLeadingSlash])

  if (!ext) {
    candidates.add(`${withoutLeadingSlash}.html`)
    candidates.add(path.posix.join(withoutLeadingSlash, 'index.html'))
    return candidates
  }

  if (assetExtensions.has(ext)) {
    return candidates
  }

  candidates.add(`${withoutLeadingSlash}.html`)
  return candidates
}

async function main() {
  const failures = []

  let distFiles

  try {
    distFiles = await walkFiles(distDir)
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      failures.push(
        'Missing `dist/`. Run `pnpm build` before `pnpm audit:site` so the production output can be inspected.',
      )
      reportAndExit(failures)
      return
    }

    throw error
  }

  const fileSet = new Set(distFiles)
  const htmlFiles = distFiles.filter((file) => file.endsWith('.html'))
  const xmlFiles = distFiles.filter((file) => file.endsWith('.xml'))
  const sitemapFiles = xmlFiles.filter((file) =>
    path.posix.basename(file).includes('sitemap'),
  )
  const routeSet = new Set(
    htmlFiles.flatMap((file) => {
      const route = normalizeRoute(getRouteFromHtmlFile(file))
      return route === '/' ? ['/'] : [route, `${route}/`]
    }),
  )

  for (const requiredFile of [
    'favicon.ico',
    'favicon.svg',
    'index.html',
    'robots.txt',
    'site.webmanifest',
    'sitemap-index.xml',
    'thank-you.html',
  ]) {
    if (!fileSet.has(requiredFile)) {
      failures.push(
        `Missing required build artifact: \`dist/${requiredFile}\`.`,
      )
    }
  }

  if (failures.length > 0) {
    reportAndExit(failures)
    return
  }

  const robotsText = await readText('robots.txt')

  if (!robotsText.includes(sitemapIndexUrl)) {
    failures.push(`\`dist/robots.txt\` must reference \`${sitemapIndexUrl}\`.`)
  }

  const sitemapContents = await Promise.all(
    sitemapFiles.map(async (file) => ({
      file,
      content: await readText(file),
    })),
  )
  const urlsetFiles = sitemapContents.filter(({ content, file }) => {
    return file !== 'sitemap-index.xml' && /<urlset\b/i.test(content)
  })

  if (urlsetFiles.length === 0) {
    failures.push(
      'Expected at least one sitemap URL set file in `dist/` besides `sitemap-index.xml`.',
    )
  }

  for (const { file, content } of sitemapContents) {
    if (content.includes('/thank-you')) {
      failures.push(
        `Sitemap output must not include \`/thank-you\`, but it was found in \`dist/${file}\`.`,
      )
    }
  }

  const htmlContents = await Promise.all(
    htmlFiles.map(async (file) => ({
      file,
      route: normalizeRoute(getRouteFromHtmlFile(file)),
      html: await readText(file),
    })),
  )

  const thankYouPage = htmlContents.find(
    ({ file }) => file === 'thank-you.html',
  )

  if (
    !thankYouPage ||
    !/noindex\s*,\s*follow/i.test(findMetaContent(thankYouPage.html, 'robots'))
  ) {
    failures.push(
      '`dist/thank-you.html` must include a `noindex, follow` robots meta tag.',
    )
  }

  for (const { file, route, html } of htmlContents) {
    const normalizedHtml = html.toLowerCase()

    for (const phrase of bannedClaimPhrases) {
      if (normalizedHtml.includes(phrase)) {
        failures.push(
          `Banned claim phrase \`${phrase}\` found in \`dist/${file}\`.`,
        )
      }
    }

    for (const term of forbiddenPublicTerms) {
      const pattern = new RegExp(term.replaceAll(' ', '\\s+'), 'i')

      if (pattern.test(html)) {
        failures.push(
          `Forbidden public term \`${term}\` found in \`dist/${file}\`.`,
        )
      }
    }

    if (isIndexablePage(html)) {
      const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
      const title = titleMatch?.[1].replace(/\s+/g, ' ').trim() ?? ''
      const description = findMetaContent(html, 'description').trim()
      const canonicalHref = findCanonicalHref(html).trim()

      if (!title) {
        failures.push(
          `Indexable page \`${route}\` is missing a <title> in \`dist/${file}\`.`,
        )
      }

      if (!description) {
        failures.push(
          `Indexable page \`${route}\` is missing \`<meta name="description">\` in \`dist/${file}\`.`,
        )
      }

      if (!canonicalHref) {
        failures.push(
          `Indexable page \`${route}\` is missing a canonical link in \`dist/${file}\`.`,
        )
      } else {
        try {
          const canonicalUrl = new URL(canonicalHref)

          if (canonicalUrl.origin !== productionOrigin) {
            failures.push(
              `Canonical URL for \`${route}\` must use \`${productionOrigin}\`, found \`${canonicalHref}\`.`,
            )
          }

          if (canonicalUrl.hostname === bannedCanonicalHost) {
            failures.push(
              `Canonical URL for \`${route}\` must not use \`${bannedCanonicalHost}\`, found \`${canonicalHref}\`.`,
            )
          }
        } catch {
          failures.push(
            `Canonical URL for \`${route}\` must be a valid absolute URL, found \`${canonicalHref}\`.`,
          )
        }
      }
    }

    for (const href of listInternalHrefs(html)) {
      const url = new URL(href, productionOrigin)
      const routePath = normalizeRoute(url.pathname)
      const assetCandidates = getExistingAssetCandidates(routePath)
      const resolvesToRoute = routeSet.has(routePath)
      const resolvesToFile = [...assetCandidates].some((candidate) =>
        fileSet.has(candidate),
      )

      if (!resolvesToRoute && !resolvesToFile) {
        failures.push(
          `Internal href \`${href}\` in \`dist/${file}\` does not match a generated route or known asset.`,
        )
      }
    }
  }

  reportAndExit(failures)
}

function reportAndExit(failures) {
  if (failures.length === 0) {
    console.log('Site audit passed.')
    return
  }

  console.error('Site audit failed:')

  for (const [index, failure] of failures.entries()) {
    console.error(`${index + 1}. ${failure}`)
  }

  process.exitCode = 1
}

await main()
