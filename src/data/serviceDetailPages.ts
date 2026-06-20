import { publicMedia } from './publicMedia'
import type { ServiceDetailPageContent } from './serviceDetailPageTypes'

export const serviceDetailPages = {
  driveway: {
    slug: 'driveway-pressure-washing',
    seoTitle: 'Driveway Pressure Washing in Central Florida | CFL Wash Co.',
    seoDescription:
      'Request a quote for concrete driveway pressure washing in Central Florida. CFL Wash Co. helps with curb appeal, surface grime, and HOA notice cleanup.',
    hero: {
      eyebrow: 'Service',
      title: 'Driveway pressure washing for cleaner curb appeal.',
      description:
        'CFL Wash Co. cleans concrete driveways affected by tire marks, organic buildup, irrigation staining, tracked-in dirt, and everyday grime. Surface condition and staining shape the quote and expected result.',
      media: publicMedia.serviceDriveway,
    },
    scope: {
      eyebrow: 'What is included',
      title: 'A focused driveway cleaning scope',
      description:
        'The quote stays centered on the concrete driveway and connected hard-surface details that affect the visible result.',
      items: [
        'Concrete driveway pressure washing focused on surface buildup, grime, and visible discoloration',
        'Attention to driveway edges, aprons, and entry-side transitions when they are part of the requested scope',
        'A pre-cleaning review of surface condition, drainage, nearby landscaping, and access',
        'Clear quote-first scope before work is scheduled',
      ],
    },
    guidance: {
      eyebrow: 'Quote considerations',
      title: 'Surface, drainage, access, and staining all matter.',
      description:
        'Driveway cleaning starts with the actual surface. The condition of the concrete, how water moves across the driveway, and what type of staining is present can affect both the process and the visible outcome.',
      items: [
        {
          title: 'Surface condition',
          description:
            'Older, cracked, patched, painted, or previously coated concrete may need a more careful approach and may not clean evenly.',
        },
        {
          title: 'Drainage and runoff',
          description:
            'Driveway slope, low spots, nearby drains, and surrounding landscape beds can affect how the work is approached.',
        },
        {
          title: 'Access',
          description:
            'Parked cars, gates, tight side yards, and hose access can change the available cleaning area and quote details.',
        },
        {
          title: 'Staining',
          description:
            'Results depend on the surface condition, age, staining, drainage, and prior treatment.',
        },
      ],
    },
    preparation: {
      title: 'Simple preparation for driveway cleaning',
      description:
        'A clear driveway helps the quote and cleaning visit stay focused.',
      items: [
        'Move vehicles off the driveway before the visit.',
        'Clear toys, planters, mats, trash bins, and loose items from the work area.',
        'Point out fragile edges, damaged concrete, known drainage issues, or stains that are a priority.',
        'Keep pets and people away from the active work area.',
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'Quote-first driveway cleaning',
      description:
        'Request a quote first, then confirm the scope before any work is scheduled.',
      steps: [
        {
          title: 'Request a quote',
          description:
            'Share your city, driveway size or layout, surface concerns, and any HOA notice details that matter.',
        },
        {
          title: 'Confirm the scope',
          description:
            'CFL Wash Co. reviews the surface, access, drainage, and staining notes before confirming the cleaning plan.',
        },
        {
          title: 'Clean the driveway',
          description:
            'The work stays focused on improving the appearance of appropriate concrete driveway surfaces.',
        },
      ],
    },
    related: {
      eyebrow: 'Related pages',
      title: 'Explore connected concrete cleaning options',
      description:
        'Pair driveway cleaning with nearby sidewalks, entry walks, or other appropriate concrete surfaces when the quote scope calls for it.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Driveway pressure washing questions',
      items: [
        {
          question: 'Can driveway pressure washing remove every stain?',
          answer:
            'No. Pressure washing can help with surface grime and many types of everyday buildup, but deep oil, rust, irrigation staining, tire marks, and older discoloration may remain visible.',
        },
        {
          question: 'Do you clean paver driveways or sealed surfaces?',
          answer:
            'This launch service is focused on appropriate concrete surfaces. Share the surface type in the quote request so CFL Wash Co. can confirm whether it fits the current service scope.',
        },
        {
          question: 'Is driveway cleaning useful for HOA notices?',
          answer:
            'It can help when the notice is about visible driveway or concrete buildup. Include the notice details in the quote request so the scope stays clear.',
        },
      ],
    },
    cta: {
      title: 'Request a driveway pressure washing quote.',
      description:
        'Share the driveway details, city, surface condition, and any HOA notice language so CFL Wash Co. can review the scope.',
    },
  },
  walkway: {
    slug: 'sidewalk-walkway-cleaning',
    seoTitle: 'Sidewalk and Walkway Cleaning in Central Florida | CFL Wash Co.',
    seoDescription:
      'Sidewalk, walkway, and entry path cleaning in Central Florida. Request a quote for concrete pedestrian areas, curb appeal cleanup, and HOA notice support.',
    hero: {
      eyebrow: 'Service',
      title: 'Sidewalk and walkway cleaning for a cleaner path to the door.',
      description:
        'CFL Wash Co. cleans front walks, entry paths, sidewalk panels, and connected pedestrian concrete. Surface condition, drainage, age, and staining shape the quote and expected result.',
      media: publicMedia.serviceWalkway,
    },
    scope: {
      eyebrow: 'What is included',
      title: 'Cleaning for concrete paths, walks, and entry areas',
      description:
        'This service is built around the pedestrian surfaces that shape curb appeal and daily use.',
      items: [
        'Cleaning for appropriate concrete sidewalk panels, front walks, entry paths, and connected pedestrian areas',
        'Attention to edges, corners, and transition areas where buildup is visible and reachable',
        'Review of drainage, nearby doors, landscape beds, and access before cleaning begins',
        'Quote-first scope for the paths and panels that need attention',
      ],
    },
    guidance: {
      eyebrow: 'Quote considerations',
      title: 'Walkway cleaning depends on layout and nearby conditions.',
      description:
        'Sidewalks and walks sit close to doors, lawns, beds, curbs, and driveways. The best quote starts with what needs cleaning, how the area drains, and whether staining is surface-level or more set in.',
      items: [
        {
          title: 'Pedestrian surfaces',
          description:
            'Sidewalks and walkways often have different panels, slopes, seams, and edges that can clean at different rates.',
        },
        {
          title: 'Drainage near entries',
          description:
            'Water movement around doors, garage entries, porch steps, and low walkway areas can affect the cleaning approach.',
        },
        {
          title: 'Access and obstructions',
          description:
            'Planters, furniture, parked vehicles, gates, and narrow side paths can limit reach or change the quoted scope.',
        },
        {
          title: 'Organic and irrigation staining',
          description:
            'Algae-like buildup, leaf staining, rust, and irrigation marks can improve, but older or deeper staining may remain.',
        },
      ],
    },
    preparation: {
      title: 'Preparation for sidewalk and walkway cleaning',
      description:
        'Small access details can make a meaningful difference for pedestrian-area cleaning.',
      items: [
        'Move porch mats, planters, patio chairs, toys, and loose decor away from the walking path.',
        'Unlock gates if side walkways or rear paths are included in the quote.',
        'Mention nearby door thresholds, damaged edges, loose pavers, or trip concerns before cleaning.',
        'Keep foot traffic off the active work area until the cleaning visit is complete.',
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'A clear path from quote to cleaning',
      description:
        'The quote comes first so the surface, access, and requested walking areas are understood before work begins.',
      steps: [
        {
          title: 'Share the path details',
          description:
            'Use the quote form to describe the sidewalk, front walk, entry path, or connected panels that need cleaning.',
        },
        {
          title: 'Review conditions',
          description:
            'CFL Wash Co. checks the surface type, drainage, staining, and access notes before confirming the scope.',
        },
        {
          title: 'Clean reachable areas',
          description:
            'The visit focuses on appropriate concrete walking surfaces included in the agreed quote.',
        },
      ],
    },
    related: {
      eyebrow: 'Related pages',
      title: 'Connect walkway cleaning with the rest of the concrete scope',
      description:
        'Many homes pair walkway cleaning with a driveway or other concrete area so visible front-of-home surfaces are addressed together.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Sidewalk and walkway cleaning questions',
      items: [
        {
          question:
            'Can you clean both public sidewalk panels and the front walkway?',
          answer:
            'The quote can include reachable concrete sidewalk panels and private walkways when they fit the current service scope. Share which areas need attention when requesting a quote.',
        },
        {
          question: 'Will cleaning remove black or green buildup on walkways?',
          answer:
            'Cleaning can help with visible organic buildup and everyday grime, but the final result depends on the surface condition, staining depth, drainage, and prior wear.',
        },
        {
          question: 'Do I need to be home for sidewalk or walkway cleaning?',
          answer:
            'The quote details and access needs should be confirmed first. If gates, pets, or entry areas are involved, include that information in the request.',
        },
      ],
    },
    cta: {
      title: 'Request a sidewalk or walkway cleaning quote.',
      description:
        'Tell CFL Wash Co. which paths, panels, entry areas, or connected concrete surfaces need attention.',
    },
  },
  concrete: {
    slug: 'concrete-cleaning',
    seoTitle: 'Concrete Cleaning in Central Florida | CFL Wash Co.',
    seoDescription:
      'Concrete cleaning for patios, pads, aprons, curbs, entry areas, and other appropriate hard surfaces in Central Florida. Request a quote from CFL Wash Co.',
    hero: {
      eyebrow: 'Service',
      title: 'Concrete cleaning for patios, pads, curbs, and entry areas.',
      description:
        'Use this service for appropriate concrete areas that are not primarily a driveway or walkway. The quote stays focused on cleaning, access, drainage, surface condition, and realistic expectations.',
      media: publicMedia.serviceConcrete,
    },
    scope: {
      eyebrow: 'Where it fits',
      title: 'Concrete surfaces that may be part of the quote',
      description:
        'Use this page when the area is concrete but does not fit neatly into a driveway, sidewalk, or front-walk request.',
      items: [
        'Concrete patios and porch-adjacent slabs',
        'Driveway aprons, curb edges, and front entry concrete',
        'Trash-bin pads, utility pads, and similar hard-surface areas',
        'Connected concrete areas that fit the current launch service scope',
      ],
    },
    guidance: {
      eyebrow: 'Quote considerations',
      title: 'Different concrete areas need different expectations.',
      description:
        'A patio slab, curb edge, driveway apron, and utility pad can all behave differently. The quote should account for surface condition, water flow, access, and the type of staining before work is planned.',
      items: [
        {
          title: 'Surface type and age',
          description:
            'Concrete finish, age, patching, cracks, previous coatings, paint, or exposed aggregate can affect what cleaning is appropriate.',
        },
        {
          title: 'Drainage and nearby areas',
          description:
            'Low spots, drains, slope, doors, landscape beds, and neighboring surfaces all influence the cleaning plan.',
        },
        {
          title: 'Access and layout',
          description:
            'Rear patios, side yards, gates, fences, and stored items can change the reachable area and the quote.',
        },
        {
          title: 'Staining and condition',
          description:
            'Everyday grime and surface buildup can often improve. Rust, oil, irrigation marks, deep organic staining, and worn concrete may not fully clear.',
        },
      ],
    },
    preparation: {
      title: 'Preparation for concrete cleaning',
      description:
        'The more clearly the area is described and cleared, the easier it is to quote the right cleaning scope.',
      items: [
        'Clear furniture, grills, storage bins, planters, mats, and loose items from the concrete area.',
        'Share gate, hose access, drainage, or pet details when requesting the quote.',
        'Point out fragile edges, previous coatings, painted concrete, cracks, or areas that should be avoided.',
        'Describe any priority stains so the quote can account for surface condition, age, staining, drainage, and prior treatment.',
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'Quote-first concrete cleaning',
      description:
        'The quote request clarifies whether the surface fits the current service scope before work is scheduled.',
      steps: [
        {
          title: 'Describe the concrete',
          description:
            'Use the quote form to explain the surface type, location, approximate size, access, and condition.',
        },
        {
          title: 'Define the scope',
          description:
            'CFL Wash Co. reviews whether the surface fits the current concrete-focused launch services.',
        },
        {
          title: 'Clean appropriate areas',
          description:
            'The work focuses on cleaner-looking concrete surfaces with expectations tied to the condition and staining involved.',
        },
      ],
    },
    related: {
      eyebrow: 'Related pages',
      title: 'Narrow the quote when the surface is more specific',
      description:
        'If the concrete area is primarily a driveway, sidewalk, or walkway, these service pages may be the better starting point.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Concrete cleaning questions',
      items: [
        {
          question: 'What concrete surfaces can be quoted?',
          answer:
            'Current launch services can include appropriate driveways, sidewalks, walkways, patios, pads, aprons, curbs, entry areas, and similar concrete surfaces.',
        },
        {
          question: 'Is this concrete restoration or sealing?',
          answer:
            'No. This is a cleaning service. CFL Wash Co. is not offering concrete repair, resurfacing, restoration, or sealing as part of the launch scope.',
        },
        {
          question: 'Can concrete cleaning help with curb appeal?',
          answer:
            'Yes, cleaning visible concrete can help curb appeal when the issue is surface buildup or grime. Results vary by surface condition and staining.',
        },
      ],
    },
    cta: {
      title: 'Request a concrete cleaning quote.',
      description:
        'Share the surface type, location, access details, and visible buildup so CFL Wash Co. can review whether it fits the launch services.',
    },
  },
} satisfies Record<
  'driveway' | 'walkway' | 'concrete',
  ServiceDetailPageContent
>
