import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const orangeCityPage = {
  slug: 'orange-city',
  seoTitle: 'Pressure Washing in Orange City, FL | CFL Wash Co.',
  seoDescription:
    'Request driveway, walkway, sidewalk, and concrete cleaning in Orange City, Florida from CFL Wash Co.',
  heroDescription:
    'CFL Wash Co. helps Orange City homeowners clean driveways, front walks, entry concrete, sidewalk sections, and other appropriate hard surfaces.',
  heroMedia: publicMedia.serviceWalkway,
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
      question:
        'Do I need to know the square footage before requesting a quote?',
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
    {
      question: 'Can I request several small front-entry areas together?',
      answer:
        'Yes. List the driveway approach, front walk, entry slab, curb edge, or other concrete sections and show them together in one wide photo.',
    },
    {
      question: 'What access details should I include?',
      answer:
        'Mention parked vehicles, gates, planters, porch furniture, bins, or narrow spaces that may affect access to the requested concrete.',
    },
  ],
  nearbySlugs: ['deltona', 'debary', 'deland'],
} satisfies ServiceAreaPageContent
