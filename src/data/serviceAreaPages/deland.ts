import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const delandPage = {
  slug: 'deland',
  seoTitle: 'Pressure Washing in DeLand, FL | CFL Wash Co.',
  seoDescription:
    'Request DeLand driveway, walkway, sidewalk, and concrete cleaning for older surfaces, front entries, and connected approaches.',
  heroDescription:
    'Request cleaning for an older DeLand driveway, front walk, entry slab, sidewalk section, patio, or other residential concrete.',
  heroMedia: publicMedia.serviceWalkway,
  localHeading: 'Older concrete',
  localBody:
    'Older and newer concrete can sit side by side around the same home. Photos should separate worn sections, later additions, steps, coatings, and places where the concrete meets brick or pavers.',
  localNote:
    'Do not hide cracks or wear in the photos. Those details help set realistic expectations without treating age-related discoloration like surface buildup.',
  reasons: [
    {
      title: 'Older driveway appearance',
      description:
        'Everyday buildup can make an established driveway or entry look darker, even when age and wear will still remain.',
    },
    {
      title: 'Walkway and porch approach',
      description:
        'Include front walks, steps, and entry slabs with the driveway when they share the route to the door.',
    },
    {
      title: 'Curb appeal before an event or move',
      description:
        'Request a focused concrete cleanup before visitors, listing photos, showings, or moving day.',
    },
  ],
  faqs: [
    {
      question: 'Which DeLand concrete surfaces can I request?',
      answer:
        'Request driveways, sidewalks, walkways, entry slabs, steps, patios, aprons, curbs, and other residential concrete.',
    },
    {
      question: 'What should I expect from older concrete?',
      answer:
        'Cleaning can improve everyday buildup, but cracks, wear, older discoloration, rust, and set-in marks may remain. Send close photos before expectations are set.',
    },
    {
      question: 'Can I include an HOA notice?',
      answer:
        'Yes. Attach the notice wording, deadline, named surface, and current photos with the quote request.',
    },
    {
      question: 'Which photos help with mixed-age or mixed-material areas?',
      answer:
        'Send a full approach photo plus close views of older sections, later additions, stairs, cracks, coatings, and edges beside brick or pavers.',
    },
  ],
  nearbySlugs: ['orange-city', 'deltona', 'debary'],
} satisfies ServiceAreaPageContent
