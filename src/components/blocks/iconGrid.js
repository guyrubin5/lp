import { compose, pure } from 'recompose'
import { Content, H2 } from 'components/common'
import { React, styled, mq } from 'x'

import AddressBook from 'static/icons/address.svg'
import AvatarBlue from 'static/icons/avatar_blue.svg'
import AvatarYellow from 'static/icons/avatar_yellow.svg'
import BookExam from 'static/icons/book_exam.svg'
import BusinessAnalyst from 'static/icons/business_analyst.svg'
import Chat from 'static/icons/chat.svg'
import Creditcard from 'static/icons/creditcard.svg'
import CV from 'static/icons/cv.svg'
import CyberSecurity from 'static/icons/cyber_security.svg'
import DatabaseAdmin from 'static/icons/database_admin.svg'
import Diploma from 'static/icons/diploma.svg'
import Discount from 'static/icons/discount.svg'
import Download from 'static/icons/download.svg'
import Exam from 'static/icons/exam.svg'
import FAQ from 'static/icons/faq.svg'
import Graduation from 'static/icons/graduation.svg'
import Hacking from 'static/icons/hacking.svg'
import ITSupport from 'static/icons/it_support.svg'
import Laptop from 'static/icons/laptop.svg'
import Location from 'static/icons/location.svg'
import Mail from 'static/icons/mail.svg'
import Minus from 'static/icons/minus.svg'
import Money from 'static/icons/money.svg'
import NetworkEngineer from 'static/icons/network_engineer.svg'
import OnlineCourses from 'static/icons/online_courses.svg'
import OnlineMarketeer from 'static/icons/online_marketeer.svg'
import Online from 'static/icons/online.svg'
import Phone from 'static/icons/phone.svg'
import Phone2 from 'static/icons/phone_2.svg'
import Plus from 'static/icons/plus.svg'
import Print from 'static/icons/print.svg'
import Programming from 'static/icons/programming.svg'
import ProjectManagement from 'static/icons/project_management.svg'
import Search from 'static/icons/search.svg'
import Share from 'static/icons/share.svg'
import Speed from 'static/icons/speed.svg'
import StandoutCrowd from 'static/icons/standout_crowd.svg'
import Star from 'static/icons/star.svg'
import Support from 'static/icons/support.svg'
import Time from 'static/icons/time.svg'
import Upload from 'static/icons/upload.svg'
import Video from 'static/icons/video.svg'
import Webdesign from 'static/icons/webdesign.svg'

// New icons 12-06-2020
import Aims from 'static/icons/aims.svg'
import Benchmarking from 'static/icons/benchmarking.svg'
import Blog from 'static/icons/blog.svg'
import BrandPromiseAgile from 'static/icons/brand_promise_agile.svg'
import BrandPromiseDemystify from 'static/icons/brand_promise_demystify.svg'
import BrandPromiseExcite from 'static/icons/brand_promise_excite.svg'
import BrandPromiseNavigate from 'static/icons/brand_promise_navigate.svg'
import Clap from 'static/icons/clap.svg'
import CloudComputing from 'static/icons/cloud-computing.svg'
import Code from 'static/icons/code.svg'
import Company from 'static/icons/company.svg'
import DeskFront from 'static/icons/desk-front.svg'
import Event from 'static/icons/event.svg'
import Frameworks from 'static/icons/frameworks.svg'
import Globe from 'static/icons/globe.svg'
import Hired from 'static/icons/hired.svg'
import IdeaLightbulb from 'static/icons/idea_lightbulb.svg'
import Information from 'static/icons/information.svg'
import Interview from 'static/icons/interview.svg'
import JobRoles from 'static/icons/job-roles.svg'
import JobSecurity from 'static/icons/job-security.svg'
import MobileStudy from 'static/icons/mobile-study.svg'
import PracticeLabs from 'static/icons/practice-labs.svg'
import Python from 'static/icons/python.svg'
import RecruiterIcon from 'static/icons/recruiter-icon.svg'
import RisingDemand from 'static/icons/rising-demand.svg'
import SoftSkills from 'static/icons/soft-skills.svg'
import Studentcare from 'static/icons/studentcare.svg'
import StudentVideo from 'static/icons/student-video.svg'
import TechWorker from 'static/icons/tech-worker.svg'
import Think from 'static/icons/think.svg'
import UX from 'static/icons/ux.svg'

// New icons 12-08-2020
import ReferFriend from 'static/icons/refer-a-friend-stamp.svg'
import GiftcardUK from 'static/icons/reward-icon-uk.svg'
import GiftcardAU from 'static/icons/reward-icon-au.svg'
import EmailFriend from 'static/icons/email-friend.svg'

// New icons 23-11-2020
import CareerServices from 'static/icons/career-services.svg'
import AlumniLogo from 'static/icons/lp-alumni-logo.svg'

const { below } = mq.createBreakpoints({
  iconRowXL: '1310px',
})

export const iconMap = {
  '7_support': Support,
  address_book: AddressBook,
  avatar: AvatarBlue,
  avatar_yellow: AvatarYellow,
  book_exam: BookExam,
  business_analyst: BusinessAnalyst,
  chat: Chat,
  creditcard: Creditcard,
  cv: CV,
  cyber_security: CyberSecurity,
  database_admin: DatabaseAdmin,
  diploma: Diploma,
  download: Download,
  exam: Exam,
  faq: FAQ,
  graduation: Graduation,
  hacking: Hacking,
  it_support: ITSupport,
  laptop: Laptop,
  location: Location,
  mail: Mail,
  manager: ProjectManagement,
  minus: Minus,
  money: Money,
  network_engineer: NetworkEngineer,
  online_courses: OnlineCourses,
  online_marketeer: OnlineMarketeer,
  online: Online,
  phone: Phone,
  phone2: Phone2,
  plus: Plus,
  print: Print,
  programming: Programming,
  project_management: ProjectManagement,
  search: Search,
  share: Share,
  share_2: Share,
  special_offer: Discount,
  standout_crowd: StandoutCrowd,
  speed: Speed,
  speed_time: Speed,
  star_rating: Star,
  time: Time,
  upload: Upload,
  video: Video,
  webdesigner: Webdesign,
  // new icons 12-06-2020
  aims: Aims,
  benchmarking: Benchmarking,
  blog: Blog,
  brand_promise_agile: BrandPromiseAgile,
  brand_promise_demystify: BrandPromiseDemystify,
  brand_promise_excite: BrandPromiseExcite,
  brand_promise_navigate: BrandPromiseNavigate,
  clap: Clap,
  cloud_computing: CloudComputing,
  code: Code,
  company: Company,
  desk_front: DeskFront,
  event: Event,
  frameworks: Frameworks,
  globe: Globe,
  hired: Hired,
  idea_lightbulb: IdeaLightbulb,
  information: Information,
  interview: Interview,
  job_roles: JobRoles,
  job_security: JobSecurity,
  mobile_study: MobileStudy,
  practice_labs: PracticeLabs,
  python: Python,
  recruiter_icon: RecruiterIcon,
  rising_demand: RisingDemand,
  soft_skills: SoftSkills,
  studentcare: Studentcare,
  student_video: StudentVideo,
  tech_worker: TechWorker,
  think: Think,
  ux: UX,
  // new icons 12-08-2020
  email_friend: EmailFriend,
  giftcard_uk: GiftcardUK,
  giftcard_au: GiftcardAU,
  refer_friend: ReferFriend,

  // new icons 23-11-2020
  career_services: CareerServices,
  alumni_logo: AlumniLogo,
}
const Container = styled.div`
  padding: 70px 0 20px 0;
  ${mq.below('lg')} {
    padding: 60px 0 20px 0;
  }
  ${mq.below('sm')} {
    padding: 50px 0 20px 0;
  }
`

const Title = styled(H2)`
  max-width: 550px;
  text-align: center;
  margin: 0 auto 30px;
`

const Subtitle = styled.div`
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  font-weight: normal;
  margin: 0;
`

const Icons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: calc(100% + 50px);
  margin-top: 120px;
  ${mq.below('lg')} {
    margin-top: 100px;
  }
  ${mq.below('md')} {
    margin-top: 50px;
  }
  ${mq.below('sm')} {
    margin-top: 30px;
  }
`

const IconWrapper = styled.div`
  width: 254px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: start;
  margin: 0 50px 70px 0;
  ${mq.below('lg')} {
    margin-bottom: 50px;
  }
  ${mq.below('md')} {
    margin-bottom: 40px;
  }
  ${mq.below('sm')} {
    margin-bottom: 30px;
    width: 100%;
  }
`

const Icon = styled.div`
  border: 1px solid ${(props) => props.theme.primaryRGBA(0.2)};
  height: 110px;
  width: 110px;
  position: relative;
  border-radius: 95px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mq.below('sm')} {
    margin-bottom: 10px;
  }
`

const IconTitle = styled.p`
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
  text-align: center;
  ${mq.below('sm')} {
    margin-bottom: 10px;
  }
`

const IconText = styled.p`
  font-size: 16px;
  line-height: 28px;
  text-align: center;
`

const enhance = compose(pure)

const IconGrid = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'
  const subtitleElement =
    props.data.subtitleElement && props.data.subtitleElement !== 'default'
      ? props.data.subtitleElement
      : 'div'
  return (
    <Container>
      <Content>
        {props.data.title && (
          <Title as={titleElement}>{props.data.title}</Title>
        )}
        {props.data.subtitle && (
          <Subtitle as={subtitleElement}>{props.data.subtitle}</Subtitle>
        )}
        <Icons>
          {props.data.icons.map((icon, index) => {
            const SvgIcon = iconMap?.[icon.symbol] ?? iconMap['time']
            return (
              <IconWrapper key={'icon-wrapper-' + index}>
                <Icon>
                  <SvgIcon width={40} />
                </Icon>
                <IconTitle>{icon.title}</IconTitle>
                {icon.text && <IconText>{icon.text}</IconText>}
              </IconWrapper>
            )
          })}
        </Icons>
      </Content>
    </Container>
  )
}

export default enhance(IconGrid)
