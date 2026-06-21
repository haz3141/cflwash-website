import console from 'node:console'
import { Buffer } from 'node:buffer'
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
const siteDataPath = 'src/data/site.ts'
const serviceAreasPath = 'src/data/serviceAreas.ts'
const pageInventoryPath = 'docs/product/PAGE_INVENTORY.md'
const sixCityInventoryPath = 'docs/seo/six-city-inventory.yaml'
const imageRightsManifestPath = 'docs/seo/image-rights-manifest.yaml'
const premiumMediaSystemPath = 'docs/design/PREMIUM_MEDIA_SYSTEM.md'
const publicMediaRegistryPath = 'src/data/publicMedia.ts'
const serviceIllustrations = [
  {
    route: '/driveway-pressure-washing',
    id: 'service-driveway',
    stem: 'driveway-cleaning',
    alt: 'Illustrative Florida-style home with a broad concrete driveway and landscaped front approach.',
  },
  {
    route: '/sidewalk-walkway-cleaning',
    id: 'service-walkway',
    stem: 'walkway-cleaning',
    alt: 'Illustrative Florida-style home with a curved concrete walkway, sidewalk, and landscaped entry.',
  },
  {
    route: '/concrete-cleaning',
    id: 'service-concrete',
    stem: 'concrete-cleaning',
    alt: 'Illustrative Florida-style home with concrete patio, entry, and curb surfaces.',
  },
]
const serviceDetailRoutes = [
  '/driveway-pressure-washing',
  '/sidewalk-walkway-cleaning',
  '/concrete-cleaning',
]
const expectedCityPages = [
  {
    city: 'Deltona',
    slug: 'deltona',
    route: '/service-areas/deltona',
    imageSrc: '/images/city-context/deltona-city-hall-1280.jpg',
    imageSources: [
      '/images/city-context/deltona-city-hall-640.jpg 640w',
      '/images/city-context/deltona-city-hall-1280.jpg 1280w',
    ],
    alt: 'Deltona City Hall with flags and landscaping beneath a broad blue sky.',
    attribution:
      'Photo: Connor J. Williams, CC BY 3.0, via Wikimedia Commons. Resized for web delivery.',
    snippets: ['Sidewalk coverage varies', 'Deltona City Hall civic context.'],
  },
  {
    city: 'Orange City',
    slug: 'orange-city',
    route: '/service-areas/orange-city',
    imageSrc: '/images/city-context/orange-city-town-hall-1280.jpg',
    imageSources: [
      '/images/city-context/orange-city-town-hall-640.jpg 640w',
      '/images/city-context/orange-city-town-hall-1280.jpg 1280w',
    ],
    alt: 'Orange City Town Hall framed by trees and lawn under a clear sky.',
    attribution:
      'Photo: Connor J. Williams, CC BY 3.0, via Wikimedia Commons. Resized for web delivery.',
    snippets: ['Graves Avenue', 'Rhode Island'],
  },
  {
    city: 'DeBary',
    slug: 'debary',
    route: '/service-areas/debary',
    imageSrc: '/images/city-context/debary-hall-1280.jpg',
    imageSources: [
      '/images/city-context/debary-hall-640.jpg 640w',
      '/images/city-context/debary-hall-1280.jpg 1280w',
    ],
    alt: 'DeBary Hall, a white historic building with wraparound porches and palm trees.',
    attribution:
      'Photo: Ebyabe (John Bradley), CC BY-SA 3.0, via Wikimedia Commons. Resized for web delivery.',
    snippets: ['DeBary Main Street', 'SunRail'],
  },
  {
    city: 'DeLand',
    slug: 'deland',
    route: '/service-areas/deland',
    imageSrc: '/images/city-context/deland-athens-theatre-1280.jpg',
    imageSources: [
      '/images/city-context/deland-athens-theatre-640.jpg 640w',
      '/images/city-context/deland-athens-theatre-1280.jpg 1280w',
    ],
    alt: 'The Athens Theatre facade in downtown DeLand with the marquee visible.',
    attribution:
      'Photo: Ebyabe (John Bradley), CC BY 2.5, via Wikimedia Commons. Resized for web delivery.',
    snippets: ['downtown historic district', 'school-link sidewalks'],
  },
  {
    city: 'Sanford',
    slug: 'sanford',
    route: '/service-areas/sanford',
    imageSrc: '/images/city-context/sanford-city-hall-1280.jpg',
    imageSources: [
      '/images/city-context/sanford-city-hall-640.jpg 640w',
      '/images/city-context/sanford-city-hall-1280.jpg 1280w',
    ],
    alt: 'Sanford City Hall with a curved facade, flags, and palm trees near the entrance.',
    attribution:
      'Photo: Connor Williams, CC BY 2.0, via Wikimedia Commons. Resized for web delivery.',
    snippets: ['Georgetown', 'Park Avenue corridor'],
  },
  {
    city: 'Lake Mary',
    slug: 'lake-mary',
    route: '/service-areas/lake-mary',
    imageSrc: '/images/city-context/lake-mary-city-hall-1280.jpg',
    imageSources: [
      '/images/city-context/lake-mary-city-hall-640.jpg 640w',
      '/images/city-context/lake-mary-city-hall-1280.jpg 1280w',
    ],
    alt: 'Lake Mary City Hall sign in front of a low brick wall and trees.',
    attribution:
      'Photo: Wikisteveb4, CC BY 4.0, via Wikimedia Commons. Resized for web delivery.',
    snippets: ['Soldiers Creek', 'Rinehart Road'],
  },
]
const expectedCityRoutes = new Set(expectedCityPages.map(({ route }) => route))
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
const routeContentExpectations = Object.fromEntries(
  expectedCityPages.map(
    ({ route, snippets, imageSources, alt, attribution }) => [
      route,
      {
        snippets: [...snippets, ...imageSources, alt, attribution],
      },
    ],
  ),
)

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

async function readRepoText(relativePath) {
  return readFile(path.join(repoRoot, relativePath), 'utf8')
}

async function readOptionalRepoText(relativePath) {
  try {
    return await readRepoText(relativePath)
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return ''
    }

    throw error
  }
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

function extractFlatListByDataAttribute(html, attributeName) {
  const openingPattern = new RegExp(
    `<ul\\b(?=[^>]*\\b${attributeName}(?:\\s|=|>))[^>]*>`,
    'i',
  )
  const openingMatch = openingPattern.exec(html)

  if (!openingMatch) {
    return ''
  }

  const listStart = openingMatch.index
  const contentStart = listStart + openingMatch[0].length
  const remainingHtml = html.slice(contentStart)
  const closingMatch = /<\/ul\s*>/i.exec(remainingHtml)

  if (!closingMatch) {
    return ''
  }

  const listContent = remainingHtml.slice(0, closingMatch.index)

  if (/<ul\b/i.test(listContent)) {
    return ''
  }

  return html.slice(
    listStart,
    contentStart + closingMatch.index + closingMatch[0].length,
  )
}

function extractFlatListItems(html) {
  const items = []
  const tokenPattern = /<li\b[^>]*>|<\/li\s*>/gi
  let depth = 0
  let itemStart = -1
  let openingTag = ''
  let hasNestedItem = false

  for (const match of html.matchAll(tokenPattern)) {
    if (/^<li\b/i.test(match[0])) {
      if (depth === 0) {
        itemStart = match.index
        openingTag = match[0]
        hasNestedItem = false
      } else {
        hasNestedItem = true
      }

      depth += 1
      continue
    }

    if (depth === 0) {
      continue
    }

    depth -= 1

    if (depth === 0) {
      if (!hasNestedItem) {
        items.push({
          html: html.slice(itemStart, match.index + match[0].length),
          openingTag,
          attributes: parseAttributes(openingTag),
        })
      }

      itemStart = -1
      openingTag = ''
      hasNestedItem = false
    }
  }

  return items
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

function parseSingleQuotedSiteDataValue(source, field) {
  const match = source.match(
    new RegExp(`^\\s*${field}:\\s*'([^']*)',?\\s*$`, 'm'),
  )

  return match ? match[1] : null
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

function stripHtml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function findHeading(html, level) {
  const headingMatch = html.match(
    new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'i'),
  )

  return headingMatch ? stripHtml(headingMatch[1]) : ''
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

function parseStructuredData(html) {
  const values = []

  for (const block of extractJsonLdBlocks(html)) {
    try {
      const value = JSON.parse(block)

      if (Array.isArray(value)) {
        values.push(...value)
        continue
      }

      if (
        value &&
        typeof value === 'object' &&
        '@graph' in value &&
        Array.isArray(value['@graph'])
      ) {
        values.push(...value['@graph'])
        continue
      }

      values.push(value)
    } catch {
      continue
    }
  }

  return values
}

function parseServiceAreas(source) {
  return [
    ...source.matchAll(/\{\s*slug:\s*'([^']+)'\s*,\s*name:\s*'([^']+)'/g),
  ].map(([, slug, name]) => ({ slug, name }))
}

function normalizeYamlScalar(value) {
  const trimmed = value.trim()

  if (trimmed === 'null') {
    return ''
  }

  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseYamlCityBlocks(source, sectionName) {
  const marker = `${sectionName}:\n`
  const startIndex = source.indexOf(marker)

  if (startIndex === -1) {
    return []
  }

  const section = source.slice(startIndex + marker.length)
  return section
    .split(/\n(?= {2}- city: )/g)
    .filter((block) => block.trimStart().startsWith('- city:'))
}

function readYamlScalar(block, field) {
  const match = block.match(
    new RegExp(`^\\s*(?:-\\s*)?${field}:\\s*(.+)$`, 'm'),
  )
  return match ? normalizeYamlScalar(match[1]) : ''
}

function parseSixCityInventory(source) {
  return parseYamlCityBlocks(source, 'cities').map((block) => ({
    city: readYamlScalar(block, 'city'),
    slug: readYamlScalar(block, 'slug'),
    operationalPriority: readYamlScalar(block, 'operational_priority'),
    currentPageQualityStatus: readYamlScalar(
      block,
      'current_page_quality_status',
    ),
    currentRouteStatus: readYamlScalar(block, 'current_route_status'),
    indexStatus: readYamlScalar(block, 'index_status'),
    sitemapStatus: readYamlScalar(block, 'sitemap_status'),
    navigationStatus: readYamlScalar(block, 'navigation_status'),
    imageStatus: readYamlScalar(block, 'image_status'),
    imageRightsStatus: readYamlScalar(block, 'image_rights_status'),
  }))
}

function parseImageRightsManifest(source) {
  return parseYamlCityBlocks(source, 'city_image_records').map((block) => ({
    city: readYamlScalar(block, 'city'),
    intendedPage: readYamlScalar(block, 'intended_page'),
    approvalStatus: readYamlScalar(block, 'approval_status'),
    attributionText: readYamlScalar(block, 'attribution_text'),
  }))
}

function parsePageInventoryRoutes(source) {
  return [...source.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map(([, route]) =>
    route.trim(),
  )
}

function getUniqueValueRoutes(records, getValue) {
  const valueToRoutes = new Map()

  for (const record of records) {
    const value = getValue(record)

    if (!value) {
      continue
    }

    const routes = valueToRoutes.get(value) ?? []
    routes.push(record.route)
    valueToRoutes.set(value, routes)
  }

  return valueToRoutes
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
  const htmlByRoute = new Map(
    htmlContents.map((record) => [record.route, record]),
  )
  const siteDataSource = await readRepoText(siteDataPath)
  const configuredPhoneHref = parseSingleQuotedSiteDataValue(
    siteDataSource,
    'phoneHref',
  )
  const configuredEmail = parseSingleQuotedSiteDataValue(
    siteDataSource,
    'email',
  )
  const hasParsedSiteContact =
    configuredPhoneHref !== null && configuredEmail !== null
  const hasConfiguredPhone = Boolean(configuredPhoneHref)
  const configuredEmailHref =
    configuredEmail === null ? null : `mailto:${configuredEmail}`

  if (configuredPhoneHref === null) {
    failures.push(
      `Could not parse single-quoted \`phoneHref\` from \`${siteDataPath}\`; service-detail CTA targets cannot be audited.`,
    )
  }

  if (configuredEmail === null) {
    failures.push(
      `Could not parse single-quoted \`email\` from \`${siteDataPath}\`; service-detail CTA fallbacks cannot be audited.`,
    )
  }

  for (const route of serviceDetailRoutes) {
    const record = htmlByRoute.get(route)

    if (!record) {
      failures.push(`Expected service-detail route \`${route}\` is missing.`)
      continue
    }

    for (const marker of [
      'data-service-detail-page',
      'data-service-scope',
      'data-service-guidance',
      'data-service-preparation',
    ]) {
      const markerCount = countOccurrences(record.html, marker)

      if (markerCount !== 1) {
        failures.push(
          `Service-detail route \`${route}\` must render exactly one \`${marker}\` structure; found ${markerCount}.`,
        )
      }
    }

    const slug = route.slice(1)
    const anchors = listAnchorAttributes(record.html)

    for (const location of [`service-${slug}`, `service-${slug}-final`]) {
      const locationAnchors = anchors.filter(
        (attributes) => attributes['data-cta-location'] === location,
      )
      const quoteCtas = locationAnchors.filter(
        (attributes) =>
          attributes['data-cta'] === 'quote' &&
          attributes.href === '/request-quote',
      )

      if (quoteCtas.length !== 1) {
        failures.push(
          `Service-detail route \`${route}\` CTA location \`${location}\` must include exactly one quote anchor to \`/request-quote\`; found ${quoteCtas.length}.`,
        )
      }

      const secondaryCtas = locationAnchors.filter(({ ['data-cta']: cta }) =>
        ['call', 'email'].includes(cta ?? ''),
      )
      const callCtas = secondaryCtas.filter(
        ({ ['data-cta']: cta }) => cta === 'call',
      )
      const emailCtas = secondaryCtas.filter(
        ({ ['data-cta']: cta }) => cta === 'email',
      )
      const canonicalCallCtas = callCtas.filter(
        ({ href = '' }) => href === configuredPhoneHref,
      )
      const canonicalEmailCtas = emailCtas.filter(
        ({ href = '' }) => href === configuredEmailHref,
      )

      if (secondaryCtas.length !== 1) {
        failures.push(
          `Service-detail route \`${route}\` CTA location \`${location}\` must include exactly one secondary call or email anchor; found ${secondaryCtas.length}.`,
        )
      }

      if (
        hasParsedSiteContact &&
        hasConfiguredPhone &&
        (canonicalCallCtas.length !== 1 || emailCtas.length !== 0)
      ) {
        failures.push(
          `Service-detail route \`${route}\` CTA location \`${location}\` must use exactly one \`data-cta="call"\` anchor with the configured \`phoneHref\` \`${configuredPhoneHref}\` and no email fallback; found ${canonicalCallCtas.length} canonical call anchor(s) and ${emailCtas.length} email fallback(s).`,
        )
      }

      if (
        hasParsedSiteContact &&
        !hasConfiguredPhone &&
        (canonicalEmailCtas.length !== 1 || callCtas.length !== 0)
      ) {
        failures.push(
          `Service-detail route \`${route}\` CTA location \`${location}\` must use exactly one \`data-cta="email"\` anchor with the configured email href \`${configuredEmailHref}\` and no call action when \`phoneHref\` is empty; found ${canonicalEmailCtas.length} canonical email anchor(s) and ${callCtas.length} call action(s).`,
        )
      }
    }

    if (!record.html.includes('data-proof-status="not-proof"')) {
      failures.push(
        `Service-detail route \`${route}\` must prerender explicit media marked as not project proof.`,
      )
    }
  }

  for (const { route, id, stem, alt } of serviceIllustrations) {
    const record = htmlByRoute.get(route)

    if (!record) continue

    if (!record.html.includes(`data-media-id="${id}"`)) {
      failures.push(
        `Service-detail route \`${route}\` must render registered media \`${id}\`.`,
      )
    }

    if (!record.html.includes('data-media-role="service-illustration"')) {
      failures.push(
        `Service-detail route \`${route}\` must identify hero media as a service illustration.`,
      )
    }

    if (
      !record.html.includes(
        'Illustrative service image. Not completed project photography.',
      )
    ) {
      failures.push(
        `Service-detail route \`${route}\` must render the proof-safety caption for illustrative media.`,
      )
    }

    const imageTag = getTags(record.html, 'img')
      .map((tag) => parseAttributes(tag))
      .find(
        (attributes) =>
          attributes.src === `/images/service-illustrations/${stem}-1280.webp`,
      )

    if (!imageTag) {
      failures.push(
        `Service-detail route \`${route}\` must render the registered responsive service illustration.`,
      )
    } else {
      if ((imageTag.alt ?? '').trim() !== alt) {
        failures.push(
          `Service-detail route \`${route}\` must render accurate registered service-illustration alt text.`,
        )
      }

      if (imageTag.width !== '1280' || imageTag.height !== '853') {
        failures.push(
          `Service-detail route \`${route}\` must reserve the registered service-illustration dimensions.`,
        )
      }

      if (!(imageTag.sizes ?? '').trim()) {
        failures.push(
          `Service-detail route \`${route}\` must render a responsive \`sizes\` attribute.`,
        )
      }
    }

    for (const width of [480, 768, 1024, 1280]) {
      const asset = `images/service-illustrations/${stem}-${width}.webp`

      if (!fileSet.has(asset)) {
        failures.push(
          `Missing responsive service illustration: \`dist/${asset}\`.`,
        )
      }

      if (imageTag && !imageTag.srcset?.includes(`/${asset} ${width}w`)) {
        failures.push(
          `Service-detail route \`${route}\` must include responsive image source \`/${asset} ${width}w\`.`,
        )
      }

      if (fileSet.has(asset)) {
        const assetBuffer = await readFile(path.join(distDir, asset))
        const hasExif = assetBuffer.includes(Buffer.from('Exif\u0000\u0000'))
        const hasXmp = assetBuffer.includes(
          Buffer.from('http://ns.adobe.com/xap/1.0/'),
        )

        if (hasExif || hasXmp) {
          failures.push(
            `Service illustration \`dist/${asset}\` must not retain EXIF, GPS, or XMP metadata.`,
          )
        }
      }
    }
  }

  const homepage = htmlByRoute.get('/')?.html ?? ''
  const homepageHero =
    homepage.match(
      /<section\b[^>]*data-home-hero[^>]*>[\s\S]*?<\/section>/i,
    )?.[0] ?? ''
  const expectedHeroHeading =
    'Driveway and Concrete Cleaning in Central Florida'
  const heroImages = getTags(homepageHero, 'img').map((tag) =>
    parseAttributes(tag),
  )

  if (!homepageHero) {
    failures.push('Homepage must render the responsive service-led hero.')
  }

  if (getTags(homepageHero, 'h1').length !== 1) {
    failures.push('Homepage hero must render exactly one H1.')
  }

  if (findHeading(homepageHero, 1) !== expectedHeroHeading) {
    failures.push('Homepage hero must render the approved service-led H1.')
  }

  const heroText = stripHtml(homepageHero)
  if (!heroText.includes('Request a Quote') || !heroText.includes('Call')) {
    failures.push(
      'Homepage hero must render the approved quote and call actions.',
    )
  }

  if (homepageHero.includes('/images/brand/badge-illustrated.png')) {
    failures.push(
      'Homepage hero must not render the white-background illustrated badge.',
    )
  }

  if (
    !homepage.includes('data-mobile-sticky-cta') ||
    !homepage.includes('data-visible="false"')
  ) {
    failures.push(
      'Homepage mobile sticky CTA must start hidden so it does not compete with visible hero actions.',
    )
  }

  for (const { id, stem, alt } of serviceIllustrations) {
    if (countOccurrences(homepageHero, `data-media-id="${id}"`) !== 1) {
      failures.push(
        `Homepage hero must render registered service media \`${id}\` exactly once.`,
      )
    }

    const imageSrc = `/images/service-illustrations/${stem}-1280.webp`
    const imageTags = heroImages.filter(({ src }) => src === imageSrc)

    if (imageTags.length !== 1) {
      failures.push(
        `Homepage hero must render responsive service image \`${imageSrc}\` exactly once.`,
      )
      continue
    }

    const [imageTag] = imageTags

    if ((imageTag.alt ?? '').trim() !== alt) {
      failures.push(
        `Homepage hero service media \`${id}\` must use its registered alt text.`,
      )
    }

    if (imageTag.width !== '1280' || imageTag.height !== '853') {
      failures.push(
        `Homepage hero service media \`${id}\` must reserve its registered dimensions.`,
      )
    }

    if (!(imageTag.sizes ?? '').trim()) {
      failures.push(
        `Homepage hero service media \`${id}\` must render a responsive \`sizes\` attribute.`,
      )
    }

    for (const width of [480, 768, 1024, 1280]) {
      const source = `/images/service-illustrations/${stem}-${width}.webp ${width}w`

      if (!imageTag.srcset?.includes(source)) {
        failures.push(
          `Homepage hero service media \`${id}\` must include responsive source \`${source}\`.`,
        )
      }
    }
  }

  if (
    countOccurrences(homepageHero, 'data-media-role="service-illustration"') !==
      3 ||
    countOccurrences(homepageHero, 'data-proof-status="not-proof"') !== 3
  ) {
    failures.push(
      'Homepage hero must identify all three mosaic images as proof-safe service illustrations.',
    )
  }

  const heroSealTags = heroImages.filter(
    ({ src }) => src === '/images/brand/logo-mark-transparent.png',
  )

  if (heroSealTags.length !== 1) {
    failures.push(
      'Homepage hero must render the transparent brand seal exactly once.',
    )
  } else {
    const [heroSeal] = heroSealTags

    if ((heroSeal.alt ?? '') !== '') {
      failures.push('Homepage hero transparent brand seal must be decorative.')
    }

    if (heroSeal.width !== '640' || heroSeal.height !== '640') {
      failures.push(
        'Homepage hero transparent brand seal must reserve its intrinsic dimensions.',
      )
    }
  }

  const homepageServiceMediaIds = new Set(
    getTags(homepage, 'article')
      .map((tag) => parseAttributes(tag))
      .filter(
        (attributes) =>
          attributes['data-media-role'] === 'service-illustration',
      )
      .map((attributes) => attributes['data-media-id'])
      .filter(Boolean),
  )

  if (homepageServiceMediaIds.size < 3) {
    failures.push(
      'Homepage service cards must use at least three distinct registered service illustrations.',
    )
  }

  const serviceAreaHub = htmlByRoute.get('/service-areas')?.html ?? ''
  if (serviceAreaHub.includes('/images/city-context/')) {
    failures.push(
      'The service-area hub must not use civic photography as primary city-selection media.',
    )
  }

  if (!serviceAreaHub.includes('data-media-role="brand-artwork"')) {
    failures.push(
      'The service-area hub must use registered residential brand artwork as its primary supporting media.',
    )
  }

  const servicesHub = htmlByRoute.get('/services')?.html ?? ''
  if (
    !servicesHub.includes('data-media-id="service-concrete"') ||
    !servicesHub.includes('data-media-role="service-illustration"')
  ) {
    failures.push(
      'The services hub must lead with registered service-illustration media.',
    )
  }

  const serviceMenuOpeningTags = getTags(servicesHub, 'ul').filter(
    (tag) => parseAttributes(tag)['data-service-menu'] !== undefined,
  )

  if (serviceMenuOpeningTags.length !== 1) {
    failures.push(
      `The \`/services\` hub must render exactly one \`<ul data-service-menu>\` opening tag; found ${serviceMenuOpeningTags.length}.`,
    )
  }

  const serviceMenu =
    serviceMenuOpeningTags.length === 1
      ? extractFlatListByDataAttribute(servicesHub, 'data-service-menu')
      : ''

  if (serviceMenuOpeningTags.length === 1 && !serviceMenu) {
    failures.push(
      'The `/services` hub service menu must be one complete, bounded `<ul>` with no nested `<ul>`.',
    )
  }

  if (serviceMenu) {
    const menuItemOpeningTags = getTags(serviceMenu, 'li').filter(
      (tag) => parseAttributes(tag)['data-service-menu-item'] !== undefined,
    )

    if (menuItemOpeningTags.length !== 3) {
      failures.push(
        `The \`/services\` hub service menu must render exactly three \`<li data-service-menu-item>\` opening tags; found ${menuItemOpeningTags.length}.`,
      )
    }

    const serviceMenuRows = extractFlatListItems(serviceMenu)

    if (serviceMenuRows.length !== 3) {
      failures.push(
        `The \`/services\` hub service menu must contain exactly three complete, non-nested \`<li>\` rows; found ${serviceMenuRows.length}.`,
      )
    }

    for (const [index, { attributes }] of serviceMenuRows.entries()) {
      if (attributes['data-service-menu-item'] === undefined) {
        failures.push(
          `The \`/services\` hub service menu row ${index + 1} must declare \`data-service-menu-item\` on its \`<li>\`.`,
        )
      }
    }

    for (const { id, stem, alt } of serviceIllustrations) {
      const matchingRows = serviceMenuRows.filter(
        ({ attributes }) => attributes['data-media-id'] === id,
      )

      if (matchingRows.length !== 1) {
        failures.push(
          `The \`/services\` hub service menu must render exactly one complete, non-nested item row for registered media \`${id}\`; found ${matchingRows.length}.`,
        )
        continue
      }

      const [row] = matchingRows
      const rowAttributes = row.attributes

      if (rowAttributes['data-service-menu-item'] === undefined) {
        failures.push(
          `The \`/services\` hub service menu row for \`${id}\` must declare \`data-service-menu-item\` on its \`<li>\`.`,
        )
      }

      if (rowAttributes['data-media-role'] !== 'service-illustration') {
        failures.push(
          `The \`/services\` hub service menu row for \`${id}\` must declare \`data-media-role="service-illustration"\` on its \`<li>\`.`,
        )
      }

      if (rowAttributes['data-proof-status'] !== 'not-proof') {
        failures.push(
          `The \`/services\` hub service menu row for \`${id}\` must declare \`data-proof-status="not-proof"\` on its \`<li>\`.`,
        )
      }

      const fitCount = countOccurrences(row.html, 'data-service-fit')

      if (fitCount !== 1) {
        failures.push(
          `The \`/services\` hub service menu row for \`${id}\` must render exactly one \`data-service-fit\` marker; found ${fitCount}.`,
        )
      }

      const imageSrc = `/images/service-illustrations/${stem}-1280.webp`
      const imageTags = getTags(row.html, 'img')
        .map((tag) => parseAttributes(tag))
        .filter((attributes) => attributes.src === imageSrc)

      if (imageTags.length !== 1) {
        failures.push(
          `The \`/services\` hub service menu row for \`${id}\` must render responsive image \`${imageSrc}\` exactly once; found ${imageTags.length}.`,
        )
      } else {
        const [imageTag] = imageTags

        if ((imageTag.alt ?? '').trim() !== alt) {
          failures.push(
            `The \`/services\` hub service menu row for \`${id}\` must use its exact registered alt text.`,
          )
        }

        if (imageTag.width !== '1280' || imageTag.height !== '853') {
          failures.push(
            `The \`/services\` hub service menu row for \`${id}\` must reserve its registered 1280x853 dimensions.`,
          )
        }

        if (!(imageTag.sizes ?? '').trim()) {
          failures.push(
            `The \`/services\` hub service menu row for \`${id}\` must render a non-empty responsive \`sizes\` attribute.`,
          )
        }

        for (const width of [480, 768, 1024, 1280]) {
          const source = `/images/service-illustrations/${stem}-${width}.webp ${width}w`

          if (!imageTag.srcset?.includes(source)) {
            failures.push(
              `The \`/services\` hub service menu row for \`${id}\` is missing responsive source \`${source}\`.`,
            )
          }
        }
      }

      const figcaptionTags = getTags(row.html, 'figcaption')
      const figcaptionMatch = row.html.match(
        /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption\s*>/i,
      )

      if (figcaptionTags.length !== 1 || !figcaptionMatch) {
        failures.push(
          `The \`/services\` hub service menu row for \`${id}\` must render exactly one complete \`<figcaption>\`; found ${figcaptionTags.length} opening tag(s).`,
        )
      } else {
        const figcaptionAttributes = parseAttributes(figcaptionTags[0])
        const isHidden =
          figcaptionAttributes.hidden !== undefined ||
          figcaptionAttributes['aria-hidden']?.toLowerCase() === 'true'

        if (isHidden) {
          failures.push(
            `The \`/services\` hub service menu row for \`${id}\` must keep its proof-safety \`<figcaption>\` visible.`,
          )
        }

        if (
          !stripHtml(figcaptionMatch[1]).includes(
            'Illustrative service image. Not completed project photography.',
          )
        ) {
          failures.push(
            `The \`/services\` hub service menu row for \`${id}\` must include the exact proof disclosure inside its \`<figcaption>\`.`,
          )
        }
      }
    }
  }

  const processRoutes = [
    ...serviceDetailRoutes,
    ...expectedCityPages.map(({ route }) => route),
  ]

  for (const route of processRoutes) {
    const record = htmlByRoute.get(route)

    if (!record) continue

    const processListTags = getTags(record.html, 'ol').filter(
      (tag) => parseAttributes(tag)['data-process-list'] !== undefined,
    )
    const processStepTags = getTags(record.html, 'li').filter(
      (tag) => parseAttributes(tag)['data-process-step'] !== undefined,
    )

    if (processListTags.length !== 1) {
      failures.push(
        `Route \`${route}\` must render exactly one explicit ordered process list.`,
      )
    }

    if (processStepTags.length !== 3) {
      failures.push(
        `Route \`${route}\` must render exactly three explicitly marked process steps.`,
      )
    }

    if (/\b(?:1|2|3)\.\s+(?:1|2|3)\b/.test(stripHtml(record.html))) {
      failures.push(
        `Route \`${route}\` must not render duplicated process numbering.`,
      )
    }
  }
  const [
    serviceAreasSource,
    pageInventorySource,
    sixCityInventorySource,
    imageRightsManifestSource,
    premiumMediaSystemSource,
    publicMediaRegistrySource,
  ] = await Promise.all([
    readRepoText(serviceAreasPath),
    readRepoText(pageInventoryPath),
    readRepoText(sixCityInventoryPath),
    readRepoText(imageRightsManifestPath),
    readOptionalRepoText(premiumMediaSystemPath),
    readOptionalRepoText(publicMediaRegistryPath),
  ])
  const serviceAreaEntries = parseServiceAreas(serviceAreasSource)
  const pageInventoryRoutes = parsePageInventoryRoutes(pageInventorySource)
  const sixCityInventoryEntries = parseSixCityInventory(sixCityInventorySource)
  const imageRightsEntries = parseImageRightsManifest(imageRightsManifestSource)
  const generatedCityRoutes = [...routeSet].filter(
    (route) => route.startsWith('/service-areas/') && !route.endsWith('/'),
  )
  const publicGeneratedRoutes = [...routeSet].filter(
    (route) =>
      route === '/' || (!route.startsWith('/dev/') && !route.endsWith('/')),
  )

  if (!premiumMediaSystemSource.includes('# Premium Proof-Safe Media System')) {
    failures.push(
      `\`${premiumMediaSystemPath}\` must document the premium proof-safe media system.`,
    )
  }

  for (const requiredSection of [
    '## Active media inventory',
    '## Proof-safety rules',
    '## Future verified project proof',
  ]) {
    if (!premiumMediaSystemSource.includes(requiredSection)) {
      failures.push(
        `\`${premiumMediaSystemPath}\` is missing required section \`${requiredSection}\`.`,
      )
    }
  }

  for (const requiredRegistryTerm of [
    'export type PublicMediaRole',
    'service-illustration',
    'brand-artwork',
    'city-context',
    'proofStatus',
    'publicMedia',
  ]) {
    if (!publicMediaRegistrySource.includes(requiredRegistryTerm)) {
      failures.push(
        `\`${publicMediaRegistryPath}\` must define \`${requiredRegistryTerm}\`.`,
      )
    }
  }

  if (!sixCityInventorySource.includes('integration_audit:')) {
    failures.push(
      `\`${sixCityInventoryPath}\` must record the six-city integration audit result.`,
    )
  }

  if (!sixCityInventorySource.includes("issue: '#62'")) {
    failures.push(
      `\`${sixCityInventoryPath}\` must link the integration-audit note to issue \`#62\`.`,
    )
  }

  if (
    !sixCityInventorySource.includes(
      'Final indexability review is completed in issue #63.',
    )
  ) {
    failures.push(
      `\`${sixCityInventoryPath}\` must note that final indexability review is completed in issue \`#63\`.`,
    )
  }

  if (!sixCityInventorySource.includes('final_indexability_gate:')) {
    failures.push(
      `\`${sixCityInventoryPath}\` must record the final indexability gate.`,
    )
  }

  if (!sixCityInventorySource.includes("issue: '#63'")) {
    failures.push(
      `\`${sixCityInventoryPath}\` must link the final indexability gate to issue \`#63\`.`,
    )
  }

  if (
    !sixCityInventorySource.includes(
      'decision_matrix_path: docs/seo/SIX_CITY_INDEXABILITY_DECISIONS.md',
    )
  ) {
    failures.push(
      `\`${sixCityInventoryPath}\` must link to the six-city indexability decision matrix.`,
    )
  }

  if (serviceAreaEntries.length !== expectedCityPages.length) {
    failures.push(
      `\`${serviceAreasPath}\` must contain exactly ${expectedCityPages.length} service-area entries, found ${serviceAreaEntries.length}.`,
    )
  }

  const serviceAreaSlugSet = new Set()
  const serviceAreaNameSet = new Set()
  const serviceAreaRouteSet = new Set()

  for (const { slug, name } of serviceAreaEntries) {
    if (serviceAreaSlugSet.has(slug)) {
      failures.push(
        `Duplicate city slug \`${slug}\` found in \`${serviceAreasPath}\`.`,
      )
    }

    if (serviceAreaNameSet.has(name)) {
      failures.push(
        `Duplicate city name \`${name}\` found in \`${serviceAreasPath}\`.`,
      )
    }

    serviceAreaSlugSet.add(slug)
    serviceAreaNameSet.add(name)
    serviceAreaRouteSet.add(`/service-areas/${slug}`)
  }

  for (const expectedCity of expectedCityPages) {
    if (!serviceAreaSlugSet.has(expectedCity.slug)) {
      failures.push(
        `\`${serviceAreasPath}\` is missing the approved city slug \`${expectedCity.slug}\`.`,
      )
    }

    if (!serviceAreaNameSet.has(expectedCity.city)) {
      failures.push(
        `\`${serviceAreasPath}\` is missing the approved city name \`${expectedCity.city}\`.`,
      )
    }
  }

  for (const route of serviceAreaRouteSet) {
    if (!expectedCityRoutes.has(route)) {
      failures.push(
        `\`${serviceAreasPath}\` includes unexpected active city route \`${route}\`.`,
      )
    }
  }

  for (const route of generatedCityRoutes) {
    if (!expectedCityRoutes.has(route)) {
      failures.push(
        `Generated output includes unexpected city route \`${route}\`.`,
      )
    }
  }

  for (const expectedRoute of expectedCityRoutes) {
    if (!serviceAreaRouteSet.has(expectedRoute)) {
      failures.push(
        `Approved city route \`${expectedRoute}\` is missing from \`${serviceAreasPath}\`.`,
      )
    }

    if (!generatedCityRoutes.includes(expectedRoute)) {
      failures.push(
        `Approved city route \`${expectedRoute}\` is missing from generated output.`,
      )
    }
  }

  const pageInventoryRouteSet = new Set(pageInventoryRoutes)
  const publicGeneratedRouteSet = new Set(publicGeneratedRoutes)

  for (const route of pageInventoryRouteSet) {
    if (!publicGeneratedRouteSet.has(route)) {
      failures.push(
        `Route inventory entry \`${route}\` in \`${pageInventoryPath}\` does not match a generated public route.`,
      )
    }
  }

  for (const route of publicGeneratedRouteSet) {
    if (!pageInventoryRouteSet.has(route)) {
      failures.push(
        `Generated public route \`${route}\` is missing from \`${pageInventoryPath}\`.`,
      )
    }
  }

  if (sixCityInventoryEntries.length !== expectedCityPages.length) {
    failures.push(
      `\`${sixCityInventoryPath}\` must contain exactly ${expectedCityPages.length} city records, found ${sixCityInventoryEntries.length}.`,
    )
  }

  const sixCityInventoryBySlug = new Map(
    sixCityInventoryEntries.map((entry) => [entry.slug, entry]),
  )

  for (const expectedCity of expectedCityPages) {
    const inventoryEntry = sixCityInventoryBySlug.get(expectedCity.slug)

    if (!inventoryEntry) {
      failures.push(
        `\`${sixCityInventoryPath}\` is missing the city record for \`${expectedCity.slug}\`.`,
      )
      continue
    }

    if (inventoryEntry.city !== expectedCity.city) {
      failures.push(
        `\`${sixCityInventoryPath}\` must name city \`${expectedCity.city}\` for slug \`${expectedCity.slug}\`, found \`${inventoryEntry.city}\`.`,
      )
    }

    if (inventoryEntry.currentRouteStatus !== 'live') {
      failures.push(
        `\`${sixCityInventoryPath}\` must mark \`${expectedCity.slug}\` as \`live\`, found \`${inventoryEntry.currentRouteStatus || 'missing'}\`.`,
      )
    }

    if (inventoryEntry.currentPageQualityStatus !== 'index-approved') {
      failures.push(
        `\`${sixCityInventoryPath}\` must mark \`${expectedCity.slug}\` page quality as \`index-approved\`, found \`${inventoryEntry.currentPageQualityStatus || 'missing'}\`.`,
      )
    }

    if (inventoryEntry.indexStatus !== 'index-approved') {
      failures.push(
        `\`${sixCityInventoryPath}\` must mark \`${expectedCity.slug}\` index status as \`index-approved\`, found \`${inventoryEntry.indexStatus || 'missing'}\`.`,
      )
    }

    if (inventoryEntry.operationalPriority === 'planned') {
      failures.push(
        `\`${sixCityInventoryPath}\` must not leave active city \`${expectedCity.slug}\` marked as \`planned\`.`,
      )
    }

    if (inventoryEntry.navigationStatus !== 'linked') {
      failures.push(
        `\`${sixCityInventoryPath}\` must mark \`${expectedCity.slug}\` as navigation-linked.`,
      )
    }

    if (inventoryEntry.sitemapStatus !== 'included') {
      failures.push(
        `\`${sixCityInventoryPath}\` must mark \`${expectedCity.slug}\` as included in the sitemap under the current architecture.`,
      )
    }

    if (inventoryEntry.imageStatus !== 'approved') {
      failures.push(
        `\`${sixCityInventoryPath}\` must mark \`${expectedCity.slug}\` image status as approved.`,
      )
    }

    if (inventoryEntry.imageRightsStatus !== 'approved') {
      failures.push(
        `\`${sixCityInventoryPath}\` must mark \`${expectedCity.slug}\` image-rights status as approved.`,
      )
    }
  }

  const manifestEntryByCity = new Map(
    imageRightsEntries.map((entry) => [entry.city, entry]),
  )

  for (const expectedCity of expectedCityPages) {
    const manifestEntry = manifestEntryByCity.get(expectedCity.city)

    if (!manifestEntry) {
      failures.push(
        `\`${imageRightsManifestPath}\` is missing the image-rights record for \`${expectedCity.city}\`.`,
      )
      continue
    }

    if (manifestEntry.intendedPage !== expectedCity.route) {
      failures.push(
        `\`${imageRightsManifestPath}\` must point \`${expectedCity.city}\` to \`${expectedCity.route}\`, found \`${manifestEntry.intendedPage || 'missing'}\`.`,
      )
    }

    if (manifestEntry.approvalStatus !== 'approved') {
      failures.push(
        `\`${imageRightsManifestPath}\` must mark \`${expectedCity.city}\` as \`approved\`, found \`${manifestEntry.approvalStatus || 'missing'}\`.`,
      )
    }

    if (manifestEntry.attributionText !== expectedCity.attribution) {
      failures.push(
        `\`${imageRightsManifestPath}\` attribution for \`${expectedCity.city}\` must match the approved city-page attribution text.`,
      )
    }
  }

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

      if (
        routePath.startsWith('/service-areas/') &&
        !expectedCityRoutes.has(routePath)
      ) {
        failures.push(
          `Internal city link \`${href}\` in \`dist/${file}\` points to a city route outside the approved six-city set.`,
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

  for (const route of routeSet) {
    if (
      /^\/(?:driveway-pressure-washing|sidewalk-walkway-cleaning|concrete-cleaning)\/[^/]+/.test(
        route,
      )
    ) {
      failures.push(
        `Generated output must not create service-by-city route matrix pages, found \`${route}\`.`,
      )
    }
  }

  const cityPageRecords = expectedCityPages
    .map((expectedCity) => {
      const record = htmlByRoute.get(expectedCity.route)

      if (!record) {
        return null
      }

      return { ...expectedCity, ...record }
    })
    .filter(Boolean)

  const cityH1ToRoutes = getUniqueValueRoutes(cityPageRecords, ({ html }) =>
    findHeading(html, 1),
  )
  const cityImageSrcToRoutes = getUniqueValueRoutes(
    cityPageRecords,
    ({ html, imageSrc }) => {
      const imageTag = getTags(html, 'img')
        .map((tag) => parseAttributes(tag))
        .find((attributes) => attributes.src === imageSrc)

      return imageTag?.src ?? ''
    },
  )

  for (const cityPage of cityPageRecords) {
    const h1 = findHeading(cityPage.html, 1)
    const robotsContent = findMetaContent(cityPage.html, 'robots')
      .trim()
      .toLowerCase()
    const imageTag = getTags(cityPage.html, 'img')
      .map((tag) => parseAttributes(tag))
      .find((attributes) => attributes.src === cityPage.imageSrc)
    const structuredData = parseStructuredData(cityPage.html)
    const breadcrumbSchema = structuredData.find(
      (value) =>
        value &&
        typeof value === 'object' &&
        value['@type'] === 'BreadcrumbList',
    )

    if (!cityPage.html.includes('data-media-role="brand-artwork"')) {
      failures.push(
        `City page \`${cityPage.route}\` must identify generic hero media as brand artwork.`,
      )
    }

    if (!cityPage.html.includes('data-media-role="city-context"')) {
      failures.push(
        `City page \`${cityPage.route}\` must identify civic photography as secondary city context.`,
      )
    }

    if (!h1) {
      failures.push(
        `City page \`${cityPage.route}\` must include a non-empty \`<h1>\`.`,
      )
    }

    if (!robotsContent.includes('index') || robotsContent.includes('noindex')) {
      failures.push(
        `City page \`${cityPage.route}\` must keep the issue #63 approved \`index, follow\` robots directive.`,
      )
    }

    if (!cityPage.html.includes('aria-label="Breadcrumb"')) {
      failures.push(
        `City page \`${cityPage.route}\` must render breadcrumb UI with \`aria-label="Breadcrumb"\`.`,
      )
    }

    if (!breadcrumbSchema || !Array.isArray(breadcrumbSchema.itemListElement)) {
      failures.push(
        `City page \`${cityPage.route}\` must include valid breadcrumb schema.`,
      )
    } else {
      const firstItem = breadcrumbSchema.itemListElement[0]
      const lastItem =
        breadcrumbSchema.itemListElement[
          breadcrumbSchema.itemListElement.length - 1
        ]

      if (firstItem?.name !== 'Home' || firstItem?.item !== productionOrigin) {
        failures.push(
          `City page \`${cityPage.route}\` breadcrumb schema must begin with Home at \`${productionOrigin}\`.`,
        )
      }

      if (
        lastItem?.name !== cityPage.city ||
        lastItem?.item !== `${productionOrigin}${cityPage.route}`
      ) {
        failures.push(
          `City page \`${cityPage.route}\` breadcrumb schema must end with \`${cityPage.city}\` at \`${productionOrigin}${cityPage.route}\`.`,
        )
      }
    }

    if (!imageTag) {
      failures.push(
        `City page \`${cityPage.route}\` must render its approved city-context image \`${cityPage.imageSrc}\`.`,
      )
    } else {
      if ((imageTag.alt ?? '').trim() !== cityPage.alt) {
        failures.push(
          `City page \`${cityPage.route}\` must render the approved city-image alt text.`,
        )
      }

      if (!imageTag.width || !imageTag.height) {
        failures.push(
          `City page \`${cityPage.route}\` must reserve width and height for its city-context image.`,
        )
      }

      const srcset = imageTag.srcset ?? ''
      for (const source of cityPage.imageSources) {
        if (!srcset.includes(source)) {
          failures.push(
            `City page \`${cityPage.route}\` must include responsive image source \`${source}\`.`,
          )
        }
      }

      if (!(imageTag.sizes ?? '').trim()) {
        failures.push(
          `City page \`${cityPage.route}\` must include a responsive \`sizes\` attribute for its city-context image.`,
        )
      }
    }

    if (!cityPage.html.includes(cityPage.attribution)) {
      failures.push(
        `City page \`${cityPage.route}\` must render the approved city-image attribution.`,
      )
    }

    for (const imageSource of new Set([
      ...cityPage.imageSources,
      cityPage.imageSrc,
    ])) {
      const distAssetPath = imageSource
        .replace(/\s+\d+w$/, '')
        .replace(/^\//, '')

      if (!fileSet.has(distAssetPath)) {
        failures.push(
          `City image asset \`${imageSource}\` for \`${cityPage.route}\` is missing from \`dist/\`.`,
        )
        continue
      }

      const assetBuffer = await readFile(path.join(distDir, distAssetPath))
      const hasExif = assetBuffer.includes(Buffer.from('Exif\u0000\u0000'))
      const hasXmp = assetBuffer.includes(
        Buffer.from('http://ns.adobe.com/xap/1.0/'),
      )

      if (hasExif || hasXmp) {
        failures.push(
          `City image asset \`dist/${distAssetPath}\` must not retain EXIF, GPS, or XMP metadata.`,
        )
      }
    }
  }

  for (const [h1, routes] of cityH1ToRoutes) {
    if (routes.length > 1) {
      failures.push(
        `City pages must not share duplicate H1s. \`${h1}\` appears on: ${routes.join(', ')}.`,
      )
    }
  }

  for (const [imageSrc, routes] of cityImageSrcToRoutes) {
    if (routes.length > 1) {
      failures.push(
        `City pages must not reuse the same city-context image asset. \`${imageSrc}\` appears on: ${routes.join(', ')}.`,
      )
    }
  }

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
