import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const lakeMaryPage = {
  slug: 'lake-mary',
  seoTitle: 'Pressure Washing in Lake Mary, FL | CFL Wash Co.',
  seoDescription:
    'Request Lake Mary driveway, walkway, sidewalk, and concrete cleaning for gated properties, townhome entries, and decorative surfaces.',
  heroDescription:
    'Request cleaning for a Lake Mary driveway, front walk, townhome entry, sidewalk, patio, or other residential concrete.',
  heroMedia: publicMedia.serviceConcrete,
  localHeading: 'Access and finishes',
  localBody:
    'A gated property, shared driveway, or compact townhome entry is easier to quote when access is clear. Decorative, sealed, widened, or paver-adjacent concrete also needs close photos.',
  localNote:
    'Share gate instructions, guest or shared parking limits, vehicle locations, and the finish on every requested surface.',
  reasons: [
    {
      title: 'HOA notice or visible front concrete',
      description:
        'Attach the notice and identify the driveway, walk, curb, or entry area named in it.',
    },
    {
      title: 'Decorative or expanded hardscape',
      description:
        'Identify sealed, decorative, widened, or paver-adjacent areas before cleaning expectations are set.',
    },
    {
      title: 'Townhome or compact-entry cleaning',
      description:
        'Group the front walk, entry pad, sidewalk section, and garage apron in one clear request.',
    },
  ],
  faqs: [
    {
      question: 'Which Lake Mary concrete surfaces can I request?',
      answer:
        'Request driveways, sidewalks, walkways, entry pads, patios, aprons, curbs, and other residential concrete.',
    },
    {
      question: 'What if my driveway is sealed or decorative?',
      answer:
        'Mention the finish and send close photos. Sealed, painted, decorative, exposed-aggregate, and paver-adjacent areas should not be treated like standard poured concrete by default.',
    },
    {
      question: 'How do an HOA notice and gate access fit the request?',
      answer:
        'Attach the notice wording and deadline, then add gate instructions, parking limits, and photos of the named surface.',
    },
    {
      question: 'Can a townhome entry or smaller driveway be included?',
      answer:
        'Yes. List the apron, front walk, entry pad, sidewalk section, or patio together and show how shared parking or nearby units affect access.',
    },
  ],
  nearbySlugs: ['sanford'],
} satisfies ServiceAreaPageContent
