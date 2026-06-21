import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const sanfordPage = {
  slug: 'sanford',
  seoTitle: 'Pressure Washing in Sanford, FL | CFL Wash Co.',
  seoDescription:
    'Request Sanford driveway, walkway, sidewalk, and concrete cleaning for mixed-material entries, curbs, and access-sensitive areas.',
  heroDescription:
    'Request cleaning for a Sanford driveway, front walk, entry pad, sidewalk, curb, or residential concrete beside brick or pavers.',
  heroMedia: publicMedia.serviceConcrete,
  localHeading: 'Mixed materials',
  localBody:
    'A clear Sanford request should show where concrete meets brick, pavers, painted edges, curbs, or decorative sections. Alley or curbside access also belongs in the photos when it affects the approach.',
  localNote:
    'Include one wide photo of the route to the concrete, then add close views of material changes, drains, gates, and parked vehicles.',
  reasons: [
    {
      title: 'Driveway and entry buildup',
      description:
        'Request the visible approach when dark buildup has collected across the driveway, walk, or entry pad.',
    },
    {
      title: 'Mixed-material front areas',
      description:
        'Close photos identify the concrete beside brick, pavers, painted sections, or decorative finishes.',
    },
    {
      title: 'Access-sensitive concrete',
      description:
        'Show gates, parked vehicles, alley approaches, or curbside limits that affect the requested area.',
    },
  ],
  faqs: [
    {
      question: 'Which Sanford concrete surfaces can I request?',
      answer:
        'Request driveways, sidewalks, walkways, entry pads, patios, aprons, curbs, and other residential concrete.',
    },
    {
      question: 'What if the concrete is next to brick or pavers?',
      answer:
        'Include close photos and identify every surrounding material. Concrete, brick, pavers, coatings, and painted edges should not be treated as one surface by default.',
    },
    {
      question: 'Can I send an HOA or property-maintenance notice?',
      answer:
        'Yes. Attach the exact notice wording, deadline, named surface, and current photos.',
    },
    {
      question: 'Which access details should I include?',
      answer:
        'Mention alley or curbside access, gates, narrow paths, parked vehicles, drains, and anything that must be cleared to reach the concrete.',
    },
  ],
  nearbySlugs: ['lake-mary'],
} satisfies ServiceAreaPageContent
