import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const debaryPage = {
  slug: 'debary',
  seoTitle: 'Pressure Washing in DeBary, FL | CFL Wash Co.',
  seoDescription:
    'Request DeBary driveway, walkway, sidewalk, and concrete cleaning for shaded surfaces, compact entries, and connected front areas.',
  heroDescription:
    'Request cleaning for a shaded DeBary driveway, front walk, entry pad, sidewalk section, or other residential concrete around the home.',
  heroMedia: publicMedia.serviceDriveway,
  localHeading: 'Shade and access',
  localBody:
    'Tree cover can leave driveway edges, walks, and entries with different levels of buildup. A wide photo helps connect those areas while close views show the shaded sections that need the most attention.',
  localNote:
    'Mention a shared driveway, gate, parked vehicles, or a narrow path so access is clear before the quote is prepared.',
  reasons: [
    {
      title: 'Shaded concrete buildup',
      description:
        'Driveway edges and walks under trees can collect visible organic buildup and leaf marks.',
    },
    {
      title: 'A connected driveway and walk',
      description:
        'Request both areas together when they form the main route from the street to the entry.',
    },
    {
      title: 'Tight or shared access',
      description:
        'A shared drive, gate, or narrow walk belongs in the request so the quote reflects how the concrete can be reached.',
    },
  ],
  faqs: [
    {
      question: 'Which DeBary concrete surfaces can I request?',
      answer:
        'Request driveways, front walks, sidewalk sections, entry pads, patios, aprons, curbs, and other residential concrete.',
    },
    {
      question: 'What should I show when tree cover affects the concrete?',
      answer:
        'Send one wide photo of the approach and close views of shaded edges, leaf marks, recurring buildup, and nearby landscaping.',
    },
    {
      question: 'Can I send an HOA notice with the request?',
      answer:
        'Yes. Include the exact HOA notice wording, deadline, named surface, and current photos.',
    },
    {
      question: 'What access details matter for a DeBary quote?',
      answer:
        'Mention a shared driveway, gate, narrow path, parked vehicles, or anything else that affects reaching and clearing the requested concrete.',
    },
  ],
  nearbySlugs: ['deltona', 'orange-city', 'deland'],
} satisfies ServiceAreaPageContent
