export type ServiceAreaFAQ = {
  question: string
  answer: string
}

export type ServiceAreaReason = {
  title: string
  description: string
}

export type ServiceAreaPageContent = {
  slug: string
  seoTitle: string
  seoDescription: string
  heroDescription: string
  localHeading: string
  localBody: string
  localNote: string
  reasons: ServiceAreaReason[]
  faqs: ServiceAreaFAQ[]
  nearbySlugs: string[]
}
