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
      'Driveway, sidewalk, walkway, and concrete cleaning for Deltona homeowners.',
  },
  {
    slug: 'orange-city',
    name: 'Orange City',
    description:
      'Historic-core, driveway, and entry concrete cleaning for Orange City homeowners.',
  },
  {
    slug: 'debary',
    name: 'DeBary',
    description:
      'Driveway, walkway, and entry concrete cleaning for DeBary homeowners.',
  },
]
