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
      'Driveway cleaning plus front walks, entries, sidewalk sections, and HOA notice requests.',
  },
  {
    slug: 'orange-city',
    name: 'Orange City',
    description:
      'Cleaning for compact entries, shaded walks, driveways, and move or sale preparation.',
  },
  {
    slug: 'debary',
    name: 'DeBary',
    description:
      'Driveway and walkway cleaning for shaded surfaces, compact entries, and connected front concrete.',
  },
  {
    slug: 'deland',
    name: 'DeLand',
    description:
      'Cleaning for older concrete, front walks, driveways, entries, and listing or event preparation.',
  },
  {
    slug: 'sanford',
    name: 'Sanford',
    description:
      'Cleaning for driveways and entries where concrete meets brick, pavers, curbs, or tight access.',
  },
  {
    slug: 'lake-mary',
    name: 'Lake Mary',
    description:
      'Driveway and entry cleaning with guidance for gates, shared parking, and decorative concrete.',
  },
]
