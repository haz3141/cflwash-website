import { publicMedia } from './publicMedia'
import type { ServiceDetailPageContent } from './serviceDetailPageTypes'

export const serviceDetailPages = {
  driveway: {
    slug: 'driveway-pressure-washing',
    seoTitle: 'Driveway Pressure Washing in Central Florida | CFL Wash Co.',
    seoDescription:
      'Concrete driveway pressure washing for visible buildup, tire marks, and curb appeal in Central Florida. Share photos and request a quote from CFL Wash Co.',
    hero: {
      eyebrow: 'Driveway pressure washing',
      title: 'Driveway pressure washing for a cleaner front approach.',
      description:
        'Everyday grime, organic buildup, tire marks, and irrigation stains can make the front of a home look overlooked. CFL Wash Co. cleans concrete driveways across Central Florida to help the approach look better cared for.',
      media: publicMedia.serviceDriveway,
    },
    scope: {
      eyebrow: 'Driveway service',
      title: 'Focused on the concrete that frames your home',
      description:
        'The driveway is the priority. Aprons, accessible edges, and connected entry concrete can be included when you list them in the request.',
      items: [
        'Concrete driveways with visible dirt, organic buildup, tire marks, and discoloration',
        'Driveway aprons and accessible edges included with the main area',
        'Connected entry concrete identified in the request',
        'A clear list of the concrete areas included in the visit',
      ],
    },
    guidance: {
      eyebrow: 'What affects the work',
      title: 'What shapes the driveway cleaning approach',
      description:
        'Age, finish, slope, access, and the type of staining influence how the driveway is approached and what improvement is realistic.',
      items: [
        {
          title: 'Condition and finish',
          description:
            'Cracks, patches, paint, coatings, and older concrete can respond differently and may not clean evenly.',
        },
        {
          title: 'Water flow',
          description:
            'Slope, low spots, nearby drains, and landscape beds affect how water can move across the work area.',
        },
        {
          title: 'Room to work',
          description:
            'Vehicles, gates, tight side yards, and hose access determine how much of the driveway is reachable.',
        },
        {
          title: 'Set-in stains',
          description:
            'Oil, rust, irrigation marks, tire marks, and older discoloration may remain visible after cleaning.',
        },
      ],
    },
    preparation: {
      title: 'Get the driveway ready',
      description:
        'A few practical steps keep the agreed concrete open and accessible.',
      items: [
        'Move vehicles off the driveway before the visit.',
        'Clear toys, planters, mats, trash bins, and other loose items.',
        'Point out damaged edges, cracks, coatings, drainage concerns, or priority stains.',
        'Keep pets and people away from the active work area.',
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'From driveway photos to a clear plan',
      description:
        'Send the essentials once so the driveway and any connected concrete can be understood before a visit is arranged.',
      steps: [
        {
          title: 'Show us the driveway',
          description:
            'Share the city or address, a wide photo, close photos of priority areas, and any HOA wording that applies.',
        },
        {
          title: 'Confirm the details',
          description:
            'CFL Wash Co. confirms the surface, access, connected areas, and visible staining before arranging the visit.',
        },
        {
          title: 'Clean the included concrete',
          description:
            'The visit stays centered on the driveway and any connected concrete listed in the quote.',
        },
      ],
    },
    related: {
      eyebrow: 'Plan the whole approach',
      title: 'Handle the front approach in one request',
      description:
        'Add the sidewalk or entry walk when those surfaces support the same curb-appeal goal.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Driveway pressure washing questions',
      items: [
        {
          question: 'Will every driveway stain come out?',
          answer:
            'No. Cleaning can improve everyday grime and surface buildup, but deep oil, rust, irrigation staining, tire marks, and older discoloration may remain visible.',
        },
        {
          question: 'What if the driveway has pavers, sealer, or paint?',
          answer:
            'Send close photos and identify the finish. The current service centers on concrete driveways, and specialty surfaces must be confirmed before they are included.',
        },
        {
          question: 'Can this help with an HOA notice?',
          answer:
            'It can help when the notice names driveway or concrete cleaning. Include the exact wording, deadline, and current photos with the request.',
        },
      ],
    },
    cta: {
      title: 'Ready to refresh the driveway?',
      description:
        'Send the service address, a wide photo, close photos of priority areas, and any HOA wording that applies.',
    },
  },
  walkway: {
    slug: 'sidewalk-walkway-cleaning',
    seoTitle: 'Sidewalk and Walkway Cleaning in Central Florida | CFL Wash Co.',
    seoDescription:
      'Sidewalk, walkway, and entry-path cleaning for Central Florida homes. See where the service fits, what to send, and how to request a quote.',
    hero: {
      eyebrow: 'Sidewalk and walkway cleaning',
      title: 'Sidewalk and walkway cleaning for a better first impression.',
      description:
        'Front walks, entry paths, and sidewalk panels shape the approach from the street to the door. CFL Wash Co. cleans residential concrete walking areas across Central Florida to help that route look better cared for.',
      media: publicMedia.serviceWalkway,
    },
    scope: {
      eyebrow: 'Walking surfaces',
      title: 'Clean the path people see and use',
      description:
        'Start with the route to the door, a side path, or the sidewalk panels that need attention, then identify any connected walking areas.',
      items: [
        'Concrete front walks and entry paths',
        'Reachable sidewalk panels identified in the request',
        'Connected side paths and pedestrian concrete',
        'Edges and transitions included with the walking area',
      ],
    },
    guidance: {
      eyebrow: 'What affects the work',
      title: 'Details around the path matter',
      description:
        'Panel layout, nearby doors and landscape beds, water flow, access, and older marks all influence the cleaning approach.',
      items: [
        {
          title: 'Panels and transitions',
          description:
            'Different pours, seams, slopes, and edges can respond differently across one walking route.',
        },
        {
          title: 'Doors and landscape edges',
          description:
            'Thresholds, porch steps, lawns, planters, curbs, and low areas need to be visible in the photos.',
        },
        {
          title: 'Access',
          description:
            'Furniture, vehicles, gates, and narrow side paths can limit the concrete that is reachable.',
        },
        {
          title: 'Older marks',
          description:
            'Organic buildup and everyday grime can improve, while rust, irrigation marks, and deeper discoloration may remain.',
        },
      ],
    },
    preparation: {
      title: 'Clear the walking areas',
      description:
        'Open paths make it easier to reach the concrete included in the visit.',
      items: [
        'Move mats, planters, chairs, toys, and loose decor away from the path.',
        'Unlock gates when side walkways or rear paths are included.',
        'Point out thresholds, damaged edges, loose materials, or areas to avoid.',
        'Keep people and pets clear of the active work area.',
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'A simple path from photos to cleaning',
      description:
        'Show the full route once, then identify the panels and paths that matter most.',
      steps: [
        {
          title: 'Show us the path',
          description:
            'Share the city or address, wide and close photos, and the sidewalk, walkway, or entry areas you want included.',
        },
        {
          title: 'Confirm the walking areas',
          description:
            'CFL Wash Co. confirms the concrete, access, nearby edges, and priority marks before arranging the visit.',
        },
        {
          title: 'Clean the agreed concrete',
          description:
            'The visit stays focused on the reachable panels and paths included in the quote.',
        },
      ],
    },
    related: {
      eyebrow: 'Plan the whole approach',
      title: 'Connect the walk with the front approach',
      description:
        'Add the driveway or nearby entry concrete when those areas are part of the same property cleanup.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Sidewalk and walkway cleaning questions',
      items: [
        {
          question:
            'Can sidewalk panels and the front walkway be included together?',
          answer:
            'They can be considered together when the concrete is reachable and fits the current service. Mark the exact panels and paths in the photos so they can be confirmed.',
        },
        {
          question: 'Will black or green buildup disappear?',
          answer:
            'Cleaning can improve visible organic buildup and everyday grime, but deeper marks, older discoloration, and some irrigation staining may remain.',
        },
        {
          question: 'Do I need to be home for the visit?',
          answer:
            'That depends on access and the property details. Share gate, pet, and entry-area notes so arrival needs can be confirmed before a visit is arranged.',
        },
      ],
    },
    cta: {
      title: 'Ready for cleaner-looking paths and walks?',
      description:
        'Send the service address, photos of the full route, and the panels or entry areas you want included.',
    },
  },
  concrete: {
    slug: 'concrete-cleaning',
    seoTitle: 'Concrete Cleaning in Central Florida | CFL Wash Co.',
    seoDescription:
      'Concrete cleaning for patios, pads, aprons, curbs, and entry areas across Central Florida. Share the surface and request a quote from CFL Wash Co.',
    hero: {
      eyebrow: 'Concrete cleaning',
      title: 'Concrete cleaning for the spaces beyond the driveway.',
      description:
        'Patios, pads, aprons, curbs, and entry slabs collect the same everyday buildup but do not always fit a driveway or walkway request. This service gives those residential concrete areas a clear place to start.',
      media: publicMedia.serviceConcrete,
    },
    scope: {
      eyebrow: 'Where it fits',
      title: 'A practical fit for other concrete areas',
      description:
        'Use this service when the surface is concrete but the driveway or walking route is not the main focus.',
      items: [
        'Concrete patios and porch-adjacent slabs',
        'Driveway aprons, curb edges, and front entry concrete',
        'Trash-bin pads, utility pads, and similar residential areas',
        'Connected concrete included with the main area',
      ],
    },
    guidance: {
      eyebrow: 'What affects the work',
      title: 'Match the approach to the concrete',
      description:
        'Finish, age, water flow, access, and the type of buildup determine how each concrete area should be approached.',
      items: [
        {
          title: 'Finish and age',
          description:
            'Patches, cracks, paint, coatings, exposed aggregate, and older concrete can change what cleaning is suitable.',
        },
        {
          title: 'Water flow',
          description:
            'Low spots, drains, slope, doors, landscape beds, and neighboring surfaces shape how water can move.',
        },
        {
          title: 'Access',
          description:
            'Rear patios, side yards, gates, fences, and stored items determine which areas are reachable.',
        },
        {
          title: 'Staining',
          description:
            'Everyday grime and surface buildup can improve, while oil, rust, irrigation marks, and deep discoloration may remain.',
        },
      ],
    },
    preparation: {
      title: 'Open up the work area',
      description:
        'Clear access and a few useful notes help keep the visit focused on the right concrete.',
      items: [
        'Move furniture, grills, bins, planters, mats, and loose items off the concrete.',
        'Share gate, hose-access, drainage, and pet details.',
        'Point out coatings, painted areas, cracks, fragile edges, or places to avoid.',
        'Identify priority stains in the close photos.',
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'Start with the surface in front of you',
      description:
        'A few clear details make it easier to identify the concrete and the areas that belong together.',
      steps: [
        {
          title: 'Describe the concrete',
          description:
            'Share the city or address, surface location, approximate size, photos, access, and visible condition.',
        },
        {
          title: 'Confirm the included areas',
          description:
            'CFL Wash Co. confirms that the surface fits the concrete-cleaning offer and identifies the areas for the visit.',
        },
        {
          title: 'Clean the agreed concrete',
          description:
            'The work stays focused on the concrete areas included in the quote, with expectations tied to their condition.',
        },
      ],
    },
    related: {
      eyebrow: 'Find the closest fit',
      title: 'Use a more specific page when it fits',
      description:
        'Start with the driveway or walkway page when one of those surfaces is the clear priority.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Concrete cleaning questions',
      items: [
        {
          question: 'Which concrete areas can I include?',
          answer:
            'Current services can include concrete driveways, sidewalks, walkways, patios, pads, aprons, curbs, entry areas, and similar residential surfaces.',
        },
        {
          question: 'Does this include sealing, repair, or restoration?',
          answer:
            'No. CFL Wash Co. is offering cleaning, not sealing, repair, resurfacing, or concrete restoration.',
        },
        {
          question: 'Can concrete cleaning help curb appeal?',
          answer:
            'It can improve the look of visible concrete when everyday grime or surface buildup is the concern. The result still depends on finish, age, wear, and staining.',
        },
      ],
    },
    cta: {
      title: 'Have another concrete area in mind?',
      description:
        'Send the service address, surface location, wide and close photos, and any access details that matter.',
    },
  },
} satisfies Record<
  'driveway' | 'walkway' | 'concrete',
  ServiceDetailPageContent
>
