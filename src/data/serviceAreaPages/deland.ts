import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const delandPage = {
  slug: 'deland',
  seoTitle: 'Pressure Washing in DeLand, FL | CFL Wash Co.',
  seoDescription:
    'Request driveway, walkway, sidewalk, and concrete cleaning in DeLand, Florida from CFL Wash Co.',
  heroDescription:
    'CFL Wash Co. serves DeLand homeowners with concrete-focused cleaning for driveways, front walks, entries, sidewalks, and curb appeal.',
  heroMedia: publicMedia.serviceWalkway,
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
    {
      question: 'What photos are useful for older or mixed-material entries?',
      answer:
        'Send a full approach photo plus close views where concrete meets brick, pavers, stairs, coatings, cracks, or decorative sections.',
    },
    {
      question: 'Can patio or backyard concrete be included?',
      answer:
        'Include it in the same request with access notes and photos. The surface type and complete proposed scope will be reviewed first.',
    },
  ],
  nearbySlugs: ['orange-city', 'deltona', 'debary'],
} satisfies ServiceAreaPageContent
