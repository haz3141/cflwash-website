export type ServiceArea = {
  slug: string
  name: string
  description: string
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'deltona',
    name: 'Deltona',
    description:
      'Primary service coverage for residential pressure washing projects.',
  },
  {
    slug: 'orange-city',
    name: 'Orange City',
    description:
      'Local service for homes and properties needing exterior cleaning.',
  },
  {
    slug: 'debary',
    name: 'DeBary',
    description:
      'Service coverage for driveway, sidewalk, and concrete cleaning.',
  },
]
