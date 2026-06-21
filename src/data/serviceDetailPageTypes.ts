import type { PublicMediaAsset } from './publicMedia'

export type ServiceDetailSlug =
  | 'driveway-pressure-washing'
  | 'sidewalk-walkway-cleaning'
  | 'concrete-cleaning'

export type GuidanceItem = {
  title: string
  description: string
}

export type ProcessStep = {
  title: string
  description: string
}

export type FAQItem = {
  question: string
  answer: string
}

export type ServiceDetailPageContent = {
  slug: ServiceDetailSlug
  seoTitle: string
  seoDescription: string
  hero: {
    eyebrow: string
    title: string
    description: string
    media: PublicMediaAsset
  }
  scope: {
    eyebrow: string
    title: string
    description: string
    items: string[]
  }
  guidance: {
    eyebrow: string
    title: string
    description: string
    items: GuidanceItem[]
  }
  preparation: {
    title: string
    description: string
    items: string[]
  }
  process: {
    eyebrow: string
    title: string
    description: string
    steps: ProcessStep[]
  }
  related: {
    eyebrow: string
    title: string
    description: string
  }
  faq: {
    eyebrow: string
    title: string
    items: FAQItem[]
  }
  cta: {
    title: string
    description: string
  }
}
