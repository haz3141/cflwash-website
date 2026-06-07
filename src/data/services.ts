export type Service = {
  slug: string
  name: string
  description: string
  summary: string
}

export const services: Service[] = [
  {
    slug: 'driveway-pressure-washing',
    name: 'Driveway Pressure Washing',
    description:
      'Concrete driveway pressure washing for surface grime, everyday buildup, and curb appeal cleanup.',
    summary:
      'Focused driveway cleaning for visible concrete buildup, HOA notice support, and a cleaner first impression.',
  },
  {
    slug: 'sidewalk-walkway-cleaning',
    name: 'Sidewalk and Walkway Cleaning',
    description:
      'Sidewalk, walkway, and entry path cleaning for cleaner pedestrian areas around the home.',
    summary:
      'Routine cleaning for front walks, entry paths, sidewalk panels, and HOA-friendly upkeep.',
  },
  {
    slug: 'concrete-cleaning',
    name: 'Concrete Cleaning',
    description:
      'Concrete cleaning for patios, pads, aprons, curbs, entry areas, and other appropriate hard surfaces.',
    summary:
      'A broad concrete cleaning option for patios, pads, aprons, curbs, entry areas, and similar surfaces.',
  },
]
