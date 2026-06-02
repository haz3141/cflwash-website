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
      'Remove buildup, surface grime, and everyday staining from concrete driveways.',
    summary: 'Driveway cleaning for cleaner curb appeal and better first impressions.',
  },
  {
    slug: 'sidewalk-walkway-cleaning',
    name: 'Sidewalk and Walkway Cleaning',
    description:
      'Clean sidewalks, walkways, and entry paths with a simple, controlled process.',
    summary: 'Routine cleaning for pedestrian paths, entries, and HOA-friendly upkeep.',
  },
  {
    slug: 'concrete-cleaning',
    name: 'Concrete Cleaning',
    description:
      'Refresh concrete surfaces with a straightforward wash focused on utility and clarity.',
    summary: 'A broad service for patios, pads, aprons, and other concrete surfaces.',
  },
]
