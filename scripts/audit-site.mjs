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
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.svg',
  '.txt',
  '.webmanifest',
  '.xml',
])
const publicTurnstileSiteKey =
  process.env.PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? ''
const ga4MeasurementId = process.env.PUBLIC_GA4_MEASUREMENT_ID?.trim() ?? ''
const secretPatterns = [
  {
    label: 'Resend API key',
    pattern: /re_[A-Za-z0-9]{10,}/,
  },
  {
    label: 'Resend API key variable assignment',
    pattern: /RESEND_API_KEY\s*=/,
  },
  {
    label: 'Turnstile secret key variable assignment',
    pattern: /TURNSTILE_SECRET_KEY\s*=/,
  },
  {
    label: 'Bearer credential',
    pattern: /Bearer\s+[A-Za-z0-9._-]{10,}/,
  },
]
const routeContentExpectations = {
  '/service-areas/orange-city': {
    snippets: [
      'Graves Avenue',
      'Rhode Island',
      '/images/city-context/orange-city-town-hall-640.jpg 640w',
      '/images/city-context/orange-city-town-hall-1280.jpg 1280w',
      'Orange City Town Hall framed by trees and lawn under a clear sky.',
      'Photo: Connor J. Williams, CC BY 3.0, via Wikimedia Commons. Resized for web delivery.',
    ],
  },
  '/service-areas/debary': {
    snippets: [
      'DeBary Main Street',
      'SunRail',
      '/images/city-context/debary-hall-640.jpg 640w',
      '/images/city-context/debary-hall-1280.jpg 1280w',
      'DeBary Hall, a white historic building with wraparound porches and palm trees.',
      'Photo: Ebyabe (John Bradley), CC BY-SA 3.0, via Wikimedia Commons. Resized for web delivery.',
    ],
  },
  '/service-areas/deland': {
    snippets: [
      'downtown historic district',
      'school-link sidewalks',
      '/images/city-context/deland-athens-theatre-640.jpg 640w',
      '/images/city-context/deland-athens-theatre-1280.jpg 1280w',
      'The Athens Theatre facade in downtown DeLand with the marquee visible.',
      'Photo: Ebyabe (John Bradley), CC BY 2.5, via Wikimedia Commons. Resized for web delivery.',
    ],
  },
  '/service-areas/sanford': {
    snippets: [
      'Georgetown',
      'Park Avenue corridor',
      '/images/city-context/sanford-city-hall-640.jpg 640w',
      '/images/city-context/sanford-city-hall-1280.jpg 1280w',
      'Sanford City Hall with a curved facade, flags, and palm trees near the entrance.',
      'Photo: Connor Williams, CC BY 2.0, via Wikimedia Commons. Resized for web delivery.',
    ],
  },
  '/service-areas/lake-mary': {
    snippets: [
      'Soldiers Creek',
      'Rinehart Road',
      '/images/city-context/lake-mary-city-hall-640.jpg 640w',
      '/images/city-context/lake-mary-city-hall-1280.jpg 1280w',
      'Lake Mary City Hall sign in front of a low brick wall and trees.',
      'Photo: Wikisteveb4, CC BY 4.0, via Wikimedia Commons. Resized for web delivery.',
    ],
  },
}

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
  return findMetaContents(html, metaName)[0] ?? ''
}

function findMetaContents(html, metaName) {
  const contents = []

  for (const tag of getTags(html, 'meta')) {
    const attributes = parseAttributes(tag)

    if (attributes.name?.toLowerCase() === metaName) {
      contents.push(attributes.content ?? '')
    }
  }

  return contents
}

function findMetaPropertyContent(html, propertyName) {
  return findMetaPropertyContents(html, propertyName)[0] ?? ''
}

function findMetaPropertyContents(html, propertyName) {
  const contents = []

  for (const tag of getTags(html, 'meta')) {
    const attributes = parseAttributes(tag)

    if (attributes.property?.toLowerCase() === propertyName) {
      contents.push(attributes.content ?? '')
    }
  }

  return contents
}

function findCanonicalHref(html) {
  return findCanonicalHrefs(html)[0] ?? ''
}

function findCanonicalHrefs(html) {
  const hrefs = []

  for (const tag of getTags(html, 'link')) {
    const attributes = parseAttributes(tag)
    const relValue = attributes.rel?.toLowerCase().split(/\s+/) ?? []

    if (relValue.includes('canonical')) {
      hrefs.push(attributes.href ?? '')
    }
  }

  return hrefs
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

function listAnchorAttributes(html) {
  return getTags(html, 'a').map((tag) => parseAttributes(tag))
}

function countOccurrences(value, search) {
  if (search === '') {
    return 0
  }

  return value.split(search).length - 1
}

function findTitle(html) {
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)
  return titleMatch?.[1].replace(/\s+/g, ' ').trim() ?? ''
}

function extractJsonLdBlocks(html) {
  const pattern =
    /<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi

  return [...html.matchAll(pattern)].map((match) => match[1]?.trim() ?? '')
}

function parseSitemapUrls(xml) {
  const urls = []

  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
    urls.push(match[1]?.trim() ?? '')
  }

  return urls
}

function hasSanitizedGa4PageLocation(html) {
  return (
    html.includes('page_location') &&
    html.includes('window.location.origin') &&
    html.includes('window.location.pathname')
  )
}

function hasForbiddenGa4LocationTerm(html) {
  return (
    html.includes('window.location.href') ||
    html.includes('window.location.search') ||
    html.includes('window.location.hash') ||
    html.includes('send_page_view:false') ||
    /send_page_view\s*:\s*false/.test(html)
  )
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
    'privacy.html',
    'robots.txt',
    'request-quote.html',
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

  const ga4ConfiguredHtml = htmlContents.filter(({ html }) =>
    html.includes("gtag('config'"),
  )

  if (ga4ConfiguredHtml.length > 0) {
    for (const { file, html } of ga4ConfiguredHtml) {
      if (!hasSanitizedGa4PageLocation(html)) {
        failures.push(
          `Built HTML with GA4 configured must override \`page_location\` using \`window.location.origin\` plus \`window.location.pathname\` in \`dist/${file}\`.`,
        )
      }

      if (hasForbiddenGa4LocationTerm(html)) {
        failures.push(
          `Built HTML with GA4 configured must not use full URLs, query strings, fragments, or disabled page views in \`dist/${file}\`.`,
        )
      }
    }

    const ctaTrackingTerms = [
      'quote_click',
      'email_click',
      'call_click',
      'cta_location',
      'page_path',
    ]
    const ctaTrackingSelectorTerms = [
      "closest('[data-cta]')",
      'closest("[data-cta]")',
    ]
    const ctaTrackingHtml = htmlContents.find(
      ({ html }) =>
        ctaTrackingTerms.every((term) => html.includes(term)) &&
        ctaTrackingSelectorTerms.some((term) => html.includes(term)),
    )

    if (!ctaTrackingHtml) {
      failures.push(
        'Built HTML with GA4 configured must include delegated CTA click tracking for `quote_click`, `email_click`, and `call_click` with `cta_location` and `page_path` parameters.',
      )
    }
  }

  const thankYouPage = htmlContents.find(
    ({ file }) => file === 'thank-you.html',
  )
  const privacyPage = htmlContents.find(({ file }) => file === 'privacy.html')
  const quotePage = htmlContents.find(
    ({ file }) => file === 'request-quote.html',
  )

  if (
    !thankYouPage ||
    !/noindex\s*,\s*follow/i.test(findMetaContent(thankYouPage.html, 'robots'))
  ) {
    failures.push(
      '`dist/thank-you.html` must include a `noindex, follow` robots meta tag.',
    )
  }

  if (!privacyPage) {
    failures.push('`dist/privacy.html` must exist for the privacy notice.')
  }

  if (!quotePage) {
    failures.push('`dist/request-quote.html` must exist for quote requests.')
  } else {
    if (!quotePage.html.includes('mailto:')) {
      failures.push(
        '`dist/request-quote.html` must include an email fallback for quote requests.',
      )
    }

    if (!quotePage.html.includes('href="/privacy"')) {
      failures.push(
        '`dist/request-quote.html` must link to the privacy notice.',
      )
    }

    const turnstileScriptCount = countOccurrences(
      quotePage.html,
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit',
    )

    if (turnstileScriptCount > 1) {
      failures.push(
        '`dist/request-quote.html` must not include duplicate Turnstile client scripts.',
      )
    }

    if (publicTurnstileSiteKey) {
      if (!quotePage.html.includes('data-quote-form')) {
        failures.push(
          '`dist/request-quote.html` must render the quote form when `PUBLIC_TURNSTILE_SITE_KEY` is configured.',
        )
      }

      if (!quotePage.html.includes("fetch('/api/quote'")) {
        failures.push(
          '`dist/request-quote.html` must reference `POST /api/quote` when `PUBLIC_TURNSTILE_SITE_KEY` is configured.',
        )
      }

      if (turnstileScriptCount !== 1) {
        failures.push(
          '`dist/request-quote.html` must include exactly one Turnstile client script when `PUBLIC_TURNSTILE_SITE_KEY` is configured.',
        )
      }
    } else {
      if (quotePage.html.includes('data-quote-form')) {
        failures.push(
          '`dist/request-quote.html` must not render a functional quote form when `PUBLIC_TURNSTILE_SITE_KEY` is absent.',
        )
      }

      if (turnstileScriptCount !== 0) {
        failures.push(
          '`dist/request-quote.html` must not include the Turnstile client script when `PUBLIC_TURNSTILE_SITE_KEY` is absent.',
        )
      }
    }
  }

  if (
    thankYouPage &&
    !thankYouPage.html.includes('href="/privacy"') &&
    !thankYouPage.html.includes('href=/privacy')
  ) {
    failures.push('`dist/thank-you.html` must link to the privacy notice.')
  }

  const ga4ScriptHtml = htmlContents.filter(({ html }) =>
    html.includes('googletagmanager.com/gtag/js'),
  )

  if (!ga4MeasurementId && ga4ScriptHtml.length > 0) {
    failures.push(
      'Built HTML must not include Google Analytics scripts when `PUBLIC_GA4_MEASUREMENT_ID` is absent.',
    )
  }

  const textDistFiles = distFiles.filter((file) =>
    textExtensions.has(path.posix.extname(file).toLowerCase()),
  )
  const textDistContents = await Promise.all(
    textDistFiles.map(async (file) => ({
      file,
      content: await readText(file),
    })),
  )

  for (const { file, content } of textDistContents) {
    for (const { label, pattern } of secretPatterns) {
      if (pattern.test(content)) {
        failures.push(
          `Potential ${label} leaked into built output: \`dist/${file}\`.`,
        )
      }
    }
  }

  for (const { file, route, html } of htmlContents) {
    const normalizedHtml = html.toLowerCase()
    const title = findTitle(html)
    const description = findMetaContent(html, 'description').trim()
    const robotsContents = findMetaContents(html, 'robots')
    const canonicalHrefs = findCanonicalHrefs(html)
    const jsonLdBlocks = extractJsonLdBlocks(html)

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

    if (robotsContents.length !== 1) {
      failures.push(
        `Page \`${route}\` must include exactly one \`<meta name="robots">\` tag in \`dist/${file}\`.`,
      )
    }

    if (canonicalHrefs.length !== 1) {
      failures.push(
        `Page \`${route}\` must include exactly one canonical link in \`dist/${file}\`.`,
      )
    }

    for (const [index, block] of jsonLdBlocks.entries()) {
      if (!block) {
        failures.push(
          `JSON-LD script ${index + 1} in \`dist/${file}\` must not be empty.`,
        )
        continue
      }

      try {
        JSON.parse(block)
      } catch {
        failures.push(
          `JSON-LD script ${index + 1} in \`dist/${file}\` must contain valid JSON.`,
        )
      }
    }

    if (isIndexablePage(html)) {
      const canonicalHref = findCanonicalHref(html).trim()
      const ogUrl = findMetaPropertyContent(html, 'og:url').trim()
      const ogTitle = findMetaPropertyContent(html, 'og:title').trim()
      const ogDescription = findMetaPropertyContent(
        html,
        'og:description',
      ).trim()
      const ogImage = findMetaPropertyContent(html, 'og:image').trim()
      const ogImageAlt = findMetaPropertyContent(html, 'og:image:alt').trim()
      const twitterTitle = findMetaContent(html, 'twitter:title').trim()
      const twitterDescription = findMetaContent(
        html,
        'twitter:description',
      ).trim()
      const twitterImage = findMetaContent(html, 'twitter:image').trim()
      const twitterImageAlt = findMetaContent(html, 'twitter:image:alt').trim()

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

          if (normalizeRoute(canonicalUrl.pathname) !== route) {
            failures.push(
              `Canonical URL for \`${route}\` must self-reference the route path, found \`${canonicalHref}\`.`,
            )
          }
        } catch {
          failures.push(
            `Canonical URL for \`${route}\` must be a valid absolute URL, found \`${canonicalHref}\`.`,
          )
        }
      }

      if (!ogUrl) {
        failures.push(
          `Indexable page \`${route}\` is missing \`og:url\` in \`dist/${file}\`.`,
        )
      } else if (canonicalHref && ogUrl !== canonicalHref) {
        failures.push(
          `Indexable page \`${route}\` must keep \`og:url\` aligned with the canonical URL in \`dist/${file}\`.`,
        )
      }

      if (!ogTitle || !ogDescription) {
        failures.push(
          `Indexable page \`${route}\` must include \`og:title\` and \`og:description\` in \`dist/${file}\`.`,
        )
      }

      if (!twitterTitle || !twitterDescription) {
        failures.push(
          `Indexable page \`${route}\` must include \`twitter:title\` and \`twitter:description\` in \`dist/${file}\`.`,
        )
      }

      if (ogImage && !ogImageAlt) {
        failures.push(
          `Indexable page \`${route}\` must include \`og:image:alt\` when \`og:image\` is present in \`dist/${file}\`.`,
        )
      }

      if (twitterImage && !twitterImageAlt) {
        failures.push(
          `Indexable page \`${route}\` must include \`twitter:image:alt\` when \`twitter:image\` is present in \`dist/${file}\`.`,
        )
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

    for (const attributes of listAnchorAttributes(html)) {
      const href = attributes.href ?? ''
      const cta = attributes['data-cta'] ?? ''
      const ctaLocation = attributes['data-cta-location'] ?? ''

      if (href.startsWith('mailto:')) {
        if (cta !== 'email' || !ctaLocation.trim()) {
          failures.push(
            `Email contact link \`${href}\` in \`dist/${file}\` must include \`data-cta="email"\` and a non-empty \`data-cta-location\`.`,
          )
        }
      }

      if (href.startsWith('tel:')) {
        if (cta !== 'call' || !ctaLocation.trim()) {
          failures.push(
            `Phone contact link \`${href}\` in \`dist/${file}\` must include \`data-cta="call"\` and a non-empty \`data-cta-location\`.`,
          )
        }
      }

      if (cta === 'quote') {
        if (!ctaLocation.trim()) {
          failures.push(
            `Quote CTA \`${href}\` in \`dist/${file}\` must include a non-empty \`data-cta-location\`.`,
          )
        }

        const ctaUrl = new URL(href, productionOrigin)

        if (normalizeRoute(ctaUrl.pathname) !== '/request-quote') {
          failures.push(
            `Quote CTA \`${href}\` in \`dist/${file}\` must link to \`/request-quote\`.`,
          )
        }
      }
    }

    const routeExpectation = routeContentExpectations[route]

    if (routeExpectation) {
      for (const snippet of routeExpectation.snippets) {
        if (!html.includes(snippet)) {
          failures.push(
            `Route \`${route}\` is missing required city-page content snippet \`${snippet}\` in \`dist/${file}\`.`,
          )
        }
      }
    }
  }

  const indexablePages = htmlContents.filter(({ html }) =>
    isIndexablePage(html),
  )
  for (const route of Object.keys(routeContentExpectations)) {
    if (!routeSet.has(route)) {
      failures.push(
        `Expected city-page route \`${route}\` is missing from the generated site output.`,
      )
    }
  }

  const titleToRoutes = new Map()
  const descriptionToRoutes = new Map()

  for (const { route, html } of indexablePages) {
    const title = findTitle(html)
    const description = findMetaContent(html, 'description').trim()

    if (title) {
      const routes = titleToRoutes.get(title) ?? []
      routes.push(route)
      titleToRoutes.set(title, routes)
    }

    if (description) {
      const routes = descriptionToRoutes.get(description) ?? []
      routes.push(route)
      descriptionToRoutes.set(description, routes)
    }
  }

  for (const [title, routes] of titleToRoutes) {
    if (routes.length > 1) {
      failures.push(
        `Indexable pages must not share duplicate titles. \`${title}\` appears on: ${routes.join(', ')}.`,
      )
    }
  }

  for (const [description, routes] of descriptionToRoutes) {
    if (routes.length > 1) {
      failures.push(
        `Indexable pages must not share duplicate meta descriptions. \`${description}\` appears on: ${routes.join(', ')}.`,
      )
    }
  }

  const sitemapRoutes = new Set()

  for (const { file, content } of urlsetFiles) {
    for (const urlString of parseSitemapUrls(content)) {
      let url

      try {
        url = new URL(urlString)
      } catch {
        failures.push(
          `Sitemap URL in \`dist/${file}\` must be a valid absolute URL, found \`${urlString}\`.`,
        )
        continue
      }

      if (url.origin !== productionOrigin) {
        failures.push(
          `Sitemap URL in \`dist/${file}\` must use \`${productionOrigin}\`, found \`${urlString}\`.`,
        )
        continue
      }

      sitemapRoutes.add(normalizeRoute(url.pathname))
    }
  }

  const indexableRoutes = new Set(indexablePages.map(({ route }) => route))

  for (const route of indexableRoutes) {
    if (!sitemapRoutes.has(route)) {
      failures.push(
        `Indexable route \`${route}\` is missing from sitemap output.`,
      )
    }
  }

  for (const route of sitemapRoutes) {
    if (!indexableRoutes.has(route)) {
      failures.push(
        `Sitemap output includes non-indexable or unknown route \`${route}\`.`,
      )
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
