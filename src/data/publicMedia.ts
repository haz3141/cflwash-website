export type PublicMediaRole =
  | 'decorative'
  | 'brand-artwork'
  | 'service-illustration'
  | 'city-context'
  | 'verified-project-proof'

export type PublicMediaProofStatus =
  | 'not-proof'
  | 'context-only'
  | 'verified-proof'

export type PublicMediaResponsiveSource = {
  src: string
  width: number
}

export type PublicMediaAsset = {
  id: string
  role: PublicMediaRole
  proofStatus: PublicMediaProofStatus
  sourceType:
    | 'brand-artwork'
    | 'generated-illustration'
    | 'licensed-context'
    | 'owner-provided-proof'
  alt: string
  caption: string
  attribution?: string
  image: {
    src: string
    width: number
    height: number
    sources: PublicMediaResponsiveSource[]
  }
}

const serviceIllustrationCaption =
  'Illustrative service image. Not completed project photography.'

const serviceIllustration = (
  id: string,
  stem: string,
  alt: string,
): PublicMediaAsset => ({
  id,
  role: 'service-illustration',
  proofStatus: 'not-proof',
  sourceType: 'generated-illustration',
  alt,
  caption: serviceIllustrationCaption,
  image: {
    src: `/images/service-illustrations/${stem}-1280.webp`,
    width: 1280,
    height: 853,
    sources: [480, 768, 1024, 1280].map((width) => ({
      src: `/images/service-illustrations/${stem}-${width}.webp`,
      width,
    })),
  },
})

export const publicMedia = {
  brandResidentialContext: {
    id: 'brand-residential-context',
    role: 'brand-artwork',
    proofStatus: 'not-proof',
    sourceType: 'brand-artwork',
    alt: 'Illustrative Florida-style home exterior with driveway, walkway, palms, and residential landscaping.',
    caption: 'Decorative brand artwork. Not completed project photography.',
    image: {
      src: '/images/brand/responsive/hero-homepage-1280.webp',
      width: 1280,
      height: 675,
      sources: [480, 768, 1024, 1280].map((width) => ({
        src: `/images/brand/responsive/hero-homepage-${width}.webp`,
        width,
      })),
    },
  },
  serviceDriveway: serviceIllustration(
    'service-driveway',
    'driveway-cleaning',
    'Illustrative Florida-style home with a broad concrete driveway and landscaped front approach.',
  ),
  serviceWalkway: serviceIllustration(
    'service-walkway',
    'walkway-cleaning',
    'Illustrative Florida-style home with a curved concrete walkway, sidewalk, and landscaped entry.',
  ),
  serviceConcrete: serviceIllustration(
    'service-concrete',
    'concrete-cleaning',
    'Illustrative Florida-style home with concrete patio, entry, and curb surfaces.',
  ),
} satisfies Record<string, PublicMediaAsset>
