import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const orangeCityPage = {
  slug: 'orange-city',
  seoTitle: 'Pressure Washing in Orange City, FL | CFL Wash Co.',
  seoDescription:
    'Request Orange City driveway, walkway, sidewalk, and concrete cleaning for shaded walks, compact entries, and front approaches.',
  heroDescription:
    'Request cleaning for an Orange City driveway, shaded front walk, entry slab, sidewalk section, or connected residential concrete.',
  heroMedia: publicMedia.serviceWalkway,
  localHeading: 'Entry layout',
  localBody:
    'A smaller front approach may combine a driveway edge, short walk, entry slab, and curb in a tight area. Tree cover can also leave shaded walks and borders looking darker than the open driveway.',
  localNote:
    'Use one wide photo to show how the driveway, entry walk, and sidewalk connect. Move planters, bins, or furniture only after the quote identifies the requested areas.',
  reasons: [
    {
      title: 'Shaded walks and entry concrete',
      description:
        'Damp, shaded edges can collect leaf marks and organic buildup around the route to the door.',
    },
    {
      title: 'Driveway and entry refresh',
      description:
        'Include the visible approach when the driveway and front walk both look dull or uneven.',
    },
    {
      title: 'Move-in or sale preparation',
      description:
        'Request a focused cleanup before listing photos, showings, hosting, or moving day.',
    },
  ],
  faqs: [
    {
      question: 'Which Orange City surfaces can I include?',
      answer:
        'Request driveways, sidewalks, walkways, entries, patios, pads, aprons, curbs, and other residential concrete.',
    },
    {
      question: 'What if shade causes the buildup to return?',
      answer:
        'Recurring shade does not prevent you from requesting a quote. Show the darkest edges and note where leaves, irrigation, or moisture regularly affect the concrete.',
    },
    {
      question: 'Can I include an HOA notice?',
      answer:
        'Yes. Send the notice wording, deadline, named surface, and current photos with the quote request.',
    },
    {
      question: 'Do I need measurements before I request a quote?',
      answer:
        'No. Start with the address, a surface list, and clear photos. Mention sealed, painted, decorative, or paver-adjacent areas so they are identified from the beginning.',
    },
  ],
  nearbySlugs: ['deltona', 'debary', 'deland'],
} satisfies ServiceAreaPageContent
