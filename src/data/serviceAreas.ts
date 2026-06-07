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
      'Concrete-focused curb appeal cleaning for Orange City homes and entry areas.',
  },
  {
    slug: 'debary',
    name: 'DeBary',
    description:
      'Driveway, walkway, sidewalk, and concrete cleaning for DeBary residential properties.',
  },
]
