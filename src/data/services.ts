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
      'Concrete driveway pressure washing for visible buildup, tire marks, everyday grime, and curb appeal.',
    summary:
      'Focused cleaning for the driveway and front approach, with room to include connected entry concrete.',
  },
  {
    slug: 'sidewalk-walkway-cleaning',
    name: 'Sidewalk and Walkway Cleaning',
    description:
      'Sidewalk, walkway, and entry-path cleaning for the concrete route around the home.',
    summary:
      'Cleaning for front walks, entry paths, sidewalk panels, and connected pedestrian concrete.',
  },
  {
    slug: 'concrete-cleaning',
    name: 'Concrete Cleaning',
    description:
      'Concrete cleaning for patios, pads, aprons, curbs, entry slabs, and similar residential areas.',
    summary:
      'A flexible option for concrete areas that are not primarily a driveway or walkway.',
  },
]
