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

export const serviceAreaPages = {
  deltona: {
    slug: 'deltona',
    seoTitle: 'Pressure Washing in Deltona, FL | CFL Wash Co.',
    seoDescription:
      'Request driveway, sidewalk, walkway, and concrete cleaning in Deltona, Florida from CFL Wash Co.',
    heroDescription:
      'CFL Wash Co. provides concrete-focused pressure washing for Deltona driveways, sidewalks, walkways, entry areas, and curb appeal cleanup.',
    localHeading: 'Driveway-first residential layouts',
    localBody:
      'Homes across Deltona can have very different front approaches. Sidewalk coverage varies by neighborhood. Some include a driveway and entry walk only, while others add panels, aprons, curbs, or extra concrete near the garage.',
    localNote:
      'Send one wide photo of the front approach so the quote includes the surfaces that matter most from the street and entry.',
    reasons: [
      {
        title: 'Dark driveway buildup',
        description:
          'Visible grime and organic buildup can make the driveway look dull from the street.',
      },
      {
        title: 'HOA notice cleanup',
        description:
          'Share the notice wording, deadline, and photos of the concrete named in the notice.',
      },
      {
        title: 'Front-entry curb appeal',
        description:
          'Bundle the driveway, front walk, and entry concrete when they read as one connected area.',
      },
    ],
    faqs: [
      {
        question: 'What pressure washing services are available in Deltona?',
        answer:
          'Current services include driveway pressure washing, sidewalk and walkway cleaning, and concrete cleaning for appropriate residential hard surfaces.',
      },
      {
        question: 'Can I request driveway and walkway cleaning together?',
        answer:
          'Yes. Include both areas in one quote request and send a wide photo that shows how they connect.',
      },
      {
        question: 'Can you help with a Deltona HOA notice?',
        answer:
          'Yes. Send the exact wording, deadline, named surface, and current photos so the request stays tied to the notice.',
      },
      {
        question: 'What should I mention about the surface?',
        answer:
          'Call out pavers, sealed or painted concrete, decorative finishes, exposed aggregate, cracks, or previous coatings before the quote is reviewed.',
      },
    ],
    nearbySlugs: ['orange-city', 'debary', 'deland'],
  },
  'orange-city': {
    slug: 'orange-city',
    seoTitle: 'Pressure Washing in Orange City, FL | CFL Wash Co.',
    seoDescription:
      'Request driveway, walkway, sidewalk, and concrete cleaning in Orange City, Florida from CFL Wash Co.',
    heroDescription:
      'CFL Wash Co. helps Orange City homeowners clean driveways, front walks, entry concrete, sidewalk sections, and other appropriate hard surfaces.',
    localHeading: 'Established neighborhoods and compact front entries',
    localBody:
      'Orange City homes can range from compact front approaches near Graves Avenue and Rhode Island Avenue to wider driveways in surrounding neighborhoods. The right quote starts with the actual concrete at the property, not a one-size-fits-all package.',
    localNote:
      'Include photos of the driveway, entry walk, and any sidewalk sections you want considered together.',
    reasons: [
      {
        title: 'Driveway and entry refresh',
        description:
          'Clean the visible approach to the home when the driveway and front walk have collected everyday buildup.',
      },
      {
        title: 'Leaf and shade-related buildup',
        description:
          'Tree cover and damp areas can leave darker patches around walks, edges, and entry concrete.',
      },
      {
        title: 'Move-in or sale preparation',
        description:
          'A concrete cleanup can improve the first impression before photos, showings, or moving day.',
      },
    ],
    faqs: [
      {
        question: 'What can CFL Wash Co. clean in Orange City?',
        answer:
          'The current offer covers driveways, sidewalks, walkways, entry concrete, patios, pads, aprons, curbs, and similar appropriate hard surfaces.',
      },
      {
        question: 'Do I need to know the square footage before requesting a quote?',
        answer:
          'No. A rough description and clear photos are enough to start. Measurements can be confirmed during the quote review.',
      },
      {
        question: 'Can I include an HOA notice with my request?',
        answer:
          'Yes. Add the notice wording, due date, named surface, and photos so the requested cleanup is clear.',
      },
      {
        question: 'What if the concrete is sealed, painted, or decorative?',
        answer:
          'Mention it before the quote is reviewed. Specialty and previously coated surfaces need to be identified up front.',
      },
    ],
    nearbySlugs: ['deltona', 'debary', 'deland'],
  },
  debary: {
    slug: 'debary',
    seoTitle: 'Pressure Washing in DeBary, FL | CFL Wash Co.',
    seoDescription:
      'Request driveway, walkway, sidewalk, and concrete cleaning in DeBary, Florida from CFL Wash Co.',
    heroDescription:
      'CFL Wash Co. provides driveway, walkway, sidewalk, and concrete cleaning for DeBary homeowners who want a cleaner front approach.',
    localHeading: 'Wooded streets and varied concrete layouts',
    localBody:
      'DeBary properties can combine mature tree cover, shaded walks, wider driveways, and compact entries around DeBary Main Street or the SunRail area. Photos help show where buildup collects and which surfaces should be quoted together.',
    localNote:
      'Show the full path from the street to the entry, including gates, parked vehicles, shared access, or narrow walkways.',
    reasons: [
      {
        title: 'Shaded concrete buildup',
        description:
          'Walkways and driveway edges under trees can hold visible organic buildup and leaf marks.',
      },
      {
        title: 'Driveway and front-walk bundle',
        description:
          'Request connected surfaces together when they form the main arrival path to the home.',
      },
      {
        title: 'HOA-facing concrete cleanup',
        description:
          'Send any notice details and photos of the exact driveway, walk, curb, or entry area involved.',
      },
    ],
    faqs: [
      {
        question: 'Which DeBary surfaces can I include in a quote?',
        answer:
          'You can request driveways, front walks, sidewalk sections, entry pads, patios, aprons, curbs, and similar residential concrete.',
      },
      {
        question: 'Why should I send a wide photo of the property?',
        answer:
          'A wide photo shows the approach, nearby surfaces, access limits, and how the driveway and walk connect.',
      },
      {
        question: 'Can smaller entry areas still be quoted?',
        answer:
          'Yes. Describe the surfaces you want cleaned and include photos so the complete scope can be reviewed.',
      },
      {
        question: 'What surface details should I disclose?',
        answer:
          'Mention decorative, sealed, painted, coated, exposed-aggregate, or paver-adjacent surfaces before expectations are set.',
      },
    ],
    nearbySlugs: ['deltona', 'orange-city', 'deland'],
  },
  deland: {
    slug: 'deland',
    seoTitle: 'Pressure Washing in DeLand, FL | CFL Wash Co.',
    seoDescription:
      'Request driveway, walkway, sidewalk, and concrete cleaning in DeLand, Florida from CFL Wash Co.',
    heroDescription:
      'CFL Wash Co. serves DeLand homeowners with concrete-focused cleaning for driveways, front walks, entries, sidewalks, and curb appeal.',
    localHeading: 'Mature trees and mixed-age concrete',
    localBody:
      'DeLand includes established neighborhoods, newer communities, the downtown historic district, and homes near school-link sidewalks. The quote should still reflect the actual material, condition, and access at the property.',
    localNote:
      'Include close photos of older sections, coatings, cracks, decorative finishes, and places where concrete meets brick or pavers.',
    reasons: [
      {
        title: 'Older driveway appearance',
        description:
          'Routine buildup can make an established driveway or entry look darker and less cared for.',
      },
      {
        title: 'Walkway and porch approach',
        description:
          'Front walks, steps, and entry slabs can be quoted with the driveway when they share the same arrival path.',
      },
      {
        title: 'Curb appeal before an event or move',
        description:
          'Request a focused concrete cleanup before visitors, listing photos, showings, or moving day.',
      },
    ],
    faqs: [
      {
        question: 'What pressure washing services are available in DeLand?',
        answer:
          'CFL Wash Co. currently offers driveway pressure washing, sidewalk and walkway cleaning, and concrete cleaning for residential hard surfaces.',
      },
      {
        question: 'Can older concrete be included in a quote?',
        answer:
          'Yes, but send close photos and mention age, wear, cracks, coatings, or decorative finishes before the surface is reviewed.',
      },
      {
        question: 'Can I request several small concrete areas together?',
        answer:
          'Yes. List the driveway, walk, entry slab, steps, patio, or other areas and show how they relate in one wide photo.',
      },
      {
        question: 'Can you help with an HOA notice in DeLand?',
        answer:
          'Yes. Send the exact wording, deadline, named surface, and current photos with the quote request.',
      },
    ],
    nearbySlugs: ['orange-city', 'deltona', 'debary'],
  },
  sanford: {
    slug: 'sanford',
    seoTitle: 'Pressure Washing in Sanford, FL | CFL Wash Co.',
    seoDescription:
      'Request driveway, walkway, sidewalk, and concrete cleaning in Sanford, Florida from CFL Wash Co.',
    heroDescription:
      'CFL Wash Co. provides residential pressure washing in Sanford for driveways, walkways, entry concrete, sidewalks, and other appropriate hard surfaces.',
    localHeading: 'Older neighborhoods and newer communities',
    localBody:
      'Sanford homes can include older front walks in Georgetown, brick-adjacent concrete near the Park Avenue corridor, alley or curbside access, and newer neighborhood driveways. Clear photos help separate the surfaces to be cleaned from nearby materials.',
    localNote:
      'Show where concrete meets brick, pavers, painted edges, curbs, drains, gates, or parked vehicles.',
    reasons: [
      {
        title: 'Driveway and entry buildup',
        description:
          'Clean the visible approach when dark buildup has collected across the driveway, walk, or entry pad.',
      },
      {
        title: 'Mixed-material front areas',
        description:
          'Photos help identify concrete next to brick, pavers, painted sections, or decorative finishes.',
      },
      {
        title: 'Property-maintenance cleanup',
        description:
          'Use the quote form for a specific notice, move-in cleanup, sale preparation, or routine curb appeal.',
      },
    ],
    faqs: [
      {
        question: 'What residential surfaces can be quoted in Sanford?',
        answer:
          'Current services cover driveways, sidewalks, walkways, entry pads, patios, aprons, curbs, and similar appropriate concrete surfaces.',
      },
      {
        question: 'What if the concrete is next to brick or pavers?',
        answer:
          'Include close photos and identify the surrounding materials so the surface boundaries are clear before the quote is reviewed.',
      },
      {
        question: 'Should I mention alley, gate, or curbside access?',
        answer:
          'Yes. Access details help clarify how the requested surfaces can be reached and whether vehicles or gates need to be moved.',
      },
      {
        question: 'Can I send a property-maintenance or HOA notice?',
        answer:
          'Yes. Include the exact wording, due date, named surface, and photos of the cited area.',
      },
    ],
    nearbySlugs: ['lake-mary'],
  },
  'lake-mary': {
    slug: 'lake-mary',
    seoTitle: 'Pressure Washing in Lake Mary, FL | CFL Wash Co.',
    seoDescription:
      'Request driveway, walkway, sidewalk, and concrete cleaning in Lake Mary, Florida from CFL Wash Co.',
    heroDescription:
      'CFL Wash Co. helps Lake Mary homeowners clean driveways, front walks, entries, sidewalks, patios, and other appropriate concrete surfaces.',
    localHeading: 'Planned-community and townhome layouts',
    localBody:
      'Lake Mary properties can include gated access, shared drives, compact townhome entries, and larger driveways near Rinehart Road or Soldiers Creek. The quote should account for access and surface type without making the process complicated.',
    localNote:
      'Mention gate instructions, parking limits, shared access, decorative finishes, sealed concrete, or nearby pavers.',
    reasons: [
      {
        title: 'HOA-visible driveway cleanup',
        description:
          'Clean the driveway, front walk, or entry concrete that shapes the view from the street or community approach.',
      },
      {
        title: 'Decorative or expanded hardscape',
        description:
          'Identify sealed, decorative, widened, or paver-adjacent areas before the quote is reviewed.',
      },
      {
        title: 'Townhome or compact-entry cleaning',
        description:
          'Smaller front walks, entry pads, and garage aprons can be grouped into one clear request.',
      },
    ],
    faqs: [
      {
        question: 'Can you quote homes in Lake Mary planned communities?',
        answer:
          'Yes. Include the actual service address, requested surfaces, and any gate, parking, or access instructions.',
      },
      {
        question: 'What if my driveway is sealed or decorative?',
        answer:
          'Mention the finish and send close photos before the quote is reviewed. Specialty surfaces should not be treated like standard poured concrete by default.',
      },
      {
        question: 'Can a townhome entry or smaller driveway be included?',
        answer:
          'Yes. Describe the complete group of surfaces, such as the apron, front walk, entry pad, or sidewalk section.',
      },
      {
        question: 'Can CFL Wash Co. help with an HOA notice?',
        answer:
          'Yes. Send the exact notice wording, deadline, named surface, and current photos with the request.',
      },
    ],
    nearbySlugs: ['sanford'],
  },
} satisfies Record<string, ServiceAreaPageContent>
