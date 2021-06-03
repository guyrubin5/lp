import MapToComponents from 'react-map-to-components'

import { React } from 'x'
import { compose, pure } from 'recompose'

import Unknown from './unknown'
import GenericBlock from './genericBlock'
import HeroHeader from './heroHeader'
import IconGrid from './iconGrid'
import IconRow from './iconRow'
import FeatureList from './featureList'
import UnorderedList from './unorderedList'
import FeatureListVideo from './featureListVideo'
import FeatureListImage from './featureListImage'
import CourseCategories from './courseCategories'
import TabBlock from './tabBlock'
import ImageBlockRepeater from './imageBlockRepeater'
import FAQBlock from './faqBlock'
import SalaryIndicator from './salaryIndicator'
import TwoColumnVideoBlock from './twoColumnVideoBlock'
import CenteredImageTextBlock from './centeredImageTextBlock'
import Contact from './contact'
import Videos from './videos'
import GenericContent from './genericContent'
import RelatedCourses from './relatedCourses'
import VideoHeadline from './videoHeadline'
import Map from './map'
import LatestNews from './latestNews'
import Managers from './managers'
import Testimonials from './testimonials'
import FourOFour from './404'
import CourseCollection from './courseCollection'
import GenericItemGrid from './genericItemGrid'
import ProspectusBlock from './prospectusBlock'
import SupplierLogo from './supplierLogo'
import CareerPath from './careerPath'
import KnomaButton from './knomaButton'
import GreyHeader from './greyHeader'
import NumberedList from './numberedList'
import ReferForm from './referForm'

import OfferIconRow from './offerIconRow'
import OfferText from './offerText'
import OfferTestimonial from './offerTestimonial'
import OfferFeatureList from './offerFeatureList'

import Trustpilot from 'components/static/trustpilot'
import References from 'components/static/references'
import WhyJoinUs from 'components/static/whyJoinUs'
import AccreditedBy from 'components/static/accreditedBy'
import TrustedBy from 'components/static/trustedBy'
import LogoList from 'components/static/logoList'
import AccreditorHeroHeader from 'components/static/accreditorHeroHeader'
import Subitems from 'components/static/subitems'
// import ContentIntro from 'components/static/contentIntro'

const mapping = {
  unknown: Unknown,
  '404_block': FourOFour,
  generic_block: GenericBlock,
  custom_generic_block: GenericBlock,
  unordered_list: UnorderedList,
  hero_header: HeroHeader,
  feature_list_video_block: FeatureListVideo,
  feature_list_image_block: FeatureListImage,
  feature_list: FeatureList,
  salary_indicator: SalaryIndicator,
  salary_graph: SalaryIndicator,
  icon_grid: IconGrid,
  icon_row: IconRow,
  course_categories: CourseCategories,
  tab_block: TabBlock,
  image_block_repeater: ImageBlockRepeater,
  two_column_video_block: TwoColumnVideoBlock,
  faq_block: FAQBlock,
  centered_image_text_block: CenteredImageTextBlock,
  contact: Contact,
  videos: Videos,
  managers: Managers,
  generic_content: GenericContent,
  related_courses: RelatedCourses,
  video_headline: VideoHeadline,
  map: Map,
  all_subitems: Subitems,
  latest_news: LatestNews,
  trustpilot: Trustpilot,
  references: References,
  why_join_us: WhyJoinUs,
  logo_list: LogoList,
  trusted_by: TrustedBy,
  accredited_by: AccreditedBy,
  testimonials: Testimonials,
  accreditor_hero_header: AccreditorHeroHeader,
  course_collection: CourseCollection,
  generic_item_grid: GenericItemGrid,
  // content_intro: ContentIntro,
  prospectus_block: ProspectusBlock,
  offer_icon_row_block: OfferIconRow,
  offer_text_block: OfferText,
  offer_testimonial_block: OfferTestimonial,
  offer_feature_list_block: OfferFeatureList,
  supplier_logo: SupplierLogo,
  career_path: CareerPath,
  knoma_button: KnomaButton,
  grey_header: GreyHeader,
  numbered_list: NumberedList,
  refer_form: ReferForm
}

const getKey = x => {
  const key = x.id

  return key ? key : Math.random()
}

const getType = x => {
  const typeName = x.__typename.replace('WordPressAcf_', '')

  return typeName in mapping ? typeName : 'unknown'
}

const mapDataToProps = x => {
  return x.data
}

export default compose(pure)(props => {
  const { blocks, extra, post, globalData } = props

  const list = Array.isArray(blocks) ? blocks : []
  const firstBlock = list.length ? list[0] : null

  return (
    <MapToComponents
      list={list}
      getKey={getKey}
      getType={getType}
      map={mapping}
      defaultMapDataToProps={p => ({
        data: p.data,
        post,
        extra,
        firstBlock,
        globalData,
        list
      })}
    />
  )
})
