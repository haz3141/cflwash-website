import { debaryPage } from './serviceAreaPages/debary'
import { delandPage } from './serviceAreaPages/deland'
import { deltonaPage } from './serviceAreaPages/deltona'
import { lakeMaryPage } from './serviceAreaPages/lakeMary'
import { orangeCityPage } from './serviceAreaPages/orangeCity'
import { sanfordPage } from './serviceAreaPages/sanford'
import type { ServiceAreaPageContent } from './serviceAreaPageTypes'

export type { ServiceAreaPageContent } from './serviceAreaPageTypes'

export const serviceAreaPages = {
  deltona: deltonaPage,
  'orange-city': orangeCityPage,
  debary: debaryPage,
  deland: delandPage,
  sanford: sanfordPage,
  'lake-mary': lakeMaryPage,
} satisfies Record<string, ServiceAreaPageContent>
