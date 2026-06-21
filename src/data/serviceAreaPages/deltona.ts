import type { ServiceAreaPageContent } from '../serviceAreaPageTypes'
import { publicMedia } from '../publicMedia'

export const deltonaPage = {
  slug: 'deltona',
  seoTitle: 'Pressure Washing in Deltona, FL | CFL Wash Co.',
  seoDescription:
    'Request Deltona driveway, sidewalk, walkway, and concrete cleaning with guidance for connected front surfaces and HOA notices.',
  heroDescription:
    'Request cleaning for a dark driveway, front walk, entry concrete, sidewalk panels, or other residential concrete at a Deltona home.',
  heroMedia: publicMedia.serviceDriveway,
  localHeading: 'Front approach',
  localBody:
    'A Deltona quote can start with the driveway and front walk, then add the entry pad, sidewalk panels, apron, curb, or extra concrete near the garage when those areas need attention too.',
  localNote:
    'Send one wide photo from the street and label the exact sections you want included. Add close photos of stains, cracks, coatings, or decorative finishes.',
  reasons: [
    {
      title: 'Dark driveway buildup',
      description:
        'Everyday grime and organic buildup can leave the main driveway looking dark from the street.',
    },
    {
      title: 'HOA notice cleanup',
      description:
        'Attach the notice, deadline, and current photos so the request stays focused on the cited concrete.',
    },
    {
      title: 'One connected arrival path',
      description:
        'Include the driveway, front walk, and entry concrete together when they form the route to the door.',
    },
  ],
  faqs: [
    {
      question: 'Which Deltona concrete surfaces can I request?',
      answer:
        'Request driveways, sidewalks, walkways, entry pads, patios, aprons, curbs, and other residential concrete.',
    },
    {
      question: 'How does an HOA notice fit the quote?',
      answer:
        'Attach the exact notice wording, deadline, and photos of the named surface. The quote can stay limited to that area or include other concrete you identify.',
    },
    {
      question: 'Will pressure washing remove every driveway stain?',
      answer:
        'Not always. Everyday buildup can improve, while oil, rust, irrigation marks, wear, and deeper discoloration may remain.',
    },
    {
      question: 'What should I send with the Deltona quote request?',
      answer:
        'Send the address, a list of surfaces, one wide photo, close views of problem areas, and notes about access, pavers, paint, sealers, or decorative finishes.',
    },
  ],
  nearbySlugs: ['orange-city', 'debary', 'deland'],
} satisfies ServiceAreaPageContent
