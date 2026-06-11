export type CityContextResponsiveSource = {
  src: string
  width: number
}

export type CityContextImage = {
  city: string
  slug: string
  subject: string
  alt: string
  caption: string
  attribution: string
  sourceUrl: string
  sourcePath: string
  image: {
    src: string
    width: number
    height: number
    sources: CityContextResponsiveSource[]
  }
}

export const cityContextImages: Record<string, CityContextImage> = {
  deltona: {
    city: 'Deltona',
    slug: 'deltona',
    subject: 'Deltona City Hall',
    alt: 'Deltona City Hall with flags and landscaping beneath a broad blue sky.',
    caption: 'Deltona City Hall civic context.',
    attribution:
      'Photo: Connor J. Williams, CC BY 3.0, via Wikimedia Commons. Resized for web delivery.',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Deltona_city_hall_deltona_florida.jpg',
    sourcePath: '/images/city-context/deltona-city-hall-1280.jpg',
    image: {
      src: '/images/city-context/deltona-city-hall-1280.jpg',
      width: 1280,
      height: 960,
      sources: [
        { src: '/images/city-context/deltona-city-hall-640.jpg', width: 640 },
        { src: '/images/city-context/deltona-city-hall-1280.jpg', width: 1280 },
      ],
    },
  },
  'orange-city': {
    city: 'Orange City',
    slug: 'orange-city',
    subject: 'Orange City Town Hall',
    alt: 'Orange City Town Hall framed by trees and lawn under a clear sky.',
    caption: 'Orange City Town Hall civic context.',
    attribution:
      'Photo: Connor J. Williams, CC BY 3.0, via Wikimedia Commons. Resized for web delivery.',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Orange_city_town_hall_orange_city_florida.jpg',
    sourcePath: '/images/city-context/orange-city-town-hall-1280.jpg',
    image: {
      src: '/images/city-context/orange-city-town-hall-1280.jpg',
      width: 1280,
      height: 960,
      sources: [
        {
          src: '/images/city-context/orange-city-town-hall-640.jpg',
          width: 640,
        },
        {
          src: '/images/city-context/orange-city-town-hall-1280.jpg',
          width: 1280,
        },
      ],
    },
  },
  debary: {
    city: 'DeBary',
    slug: 'debary',
    subject: 'DeBary Hall',
    alt: 'DeBary Hall, a white historic building with wraparound porches and palm trees.',
    caption: 'DeBary Hall historic civic context.',
    attribution:
      'Photo: Ebyabe (John Bradley), CC BY-SA 3.0, via Wikimedia Commons. Resized for web delivery.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:DeBary_Hall1.jpg',
    sourcePath: '/images/city-context/debary-hall-1280.jpg',
    image: {
      src: '/images/city-context/debary-hall-1280.jpg',
      width: 1280,
      height: 960,
      sources: [
        { src: '/images/city-context/debary-hall-640.jpg', width: 640 },
        { src: '/images/city-context/debary-hall-1280.jpg', width: 1280 },
      ],
    },
  },
  deland: {
    city: 'DeLand',
    slug: 'deland',
    subject: 'Athens Theatre',
    alt: 'The Athens Theatre facade in downtown DeLand with the marquee visible.',
    caption: 'Athens Theatre downtown DeLand civic context.',
    attribution:
      'Photo: Ebyabe (John Bradley), CC BY 2.5, via Wikimedia Commons. Resized for web delivery.',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Downtown_DeLand_Hist_Dist_-_Athens_Theatre.jpg',
    sourcePath: '/images/city-context/deland-athens-theatre-1280.jpg',
    image: {
      src: '/images/city-context/deland-athens-theatre-1280.jpg',
      width: 1280,
      height: 960,
      sources: [
        {
          src: '/images/city-context/deland-athens-theatre-640.jpg',
          width: 640,
        },
        {
          src: '/images/city-context/deland-athens-theatre-1280.jpg',
          width: 1280,
        },
      ],
    },
  },
  sanford: {
    city: 'Sanford',
    slug: 'sanford',
    subject: 'Sanford City Hall',
    alt: 'Sanford City Hall with a curved facade, flags, and palm trees near the entrance.',
    caption: 'Sanford City Hall civic context.',
    attribution:
      'Photo: Connor Williams, CC BY 2.0, via Wikimedia Commons. Resized for web delivery.',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Sanford_City_Hall_FL.jpg',
    sourcePath: '/images/city-context/sanford-city-hall-1280.jpg',
    image: {
      src: '/images/city-context/sanford-city-hall-1280.jpg',
      width: 1280,
      height: 960,
      sources: [
        { src: '/images/city-context/sanford-city-hall-640.jpg', width: 640 },
        { src: '/images/city-context/sanford-city-hall-1280.jpg', width: 1280 },
      ],
    },
  },
  'lake-mary': {
    city: 'Lake Mary',
    slug: 'lake-mary',
    subject: 'Lake Mary City Hall',
    alt: 'Lake Mary City Hall sign in front of a low brick wall and trees.',
    caption: 'Lake Mary City Hall civic context.',
    attribution:
      'Photo: Wikisteveb4, CC BY 4.0, via Wikimedia Commons. Resized for web delivery.',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:LakeMaryCityHall2026.jpg',
    sourcePath: '/images/city-context/lake-mary-city-hall-1280.jpg',
    image: {
      src: '/images/city-context/lake-mary-city-hall-1280.jpg',
      width: 1280,
      height: 960,
      sources: [
        { src: '/images/city-context/lake-mary-city-hall-640.jpg', width: 640 },
        {
          src: '/images/city-context/lake-mary-city-hall-1280.jpg',
          width: 1280,
        },
      ],
    },
  },
}

export const cityContextImageList = Object.values(cityContextImages)
