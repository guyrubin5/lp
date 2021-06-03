import { React, Link, Filters, styled, Image, mq } from 'x'
import { Content } from 'components/common'
import { compose, pure } from 'recompose'

import FacebookF from 'static/svg/FaFacebookF.svg'
import Twitter from 'static/svg/FaTwitter.svg'
import Linkedin from 'static/svg/FaLinkedin.svg'
import Instagram from 'static/svg/FaInstagram.svg'
import Youtube from 'static/svg/FaYoutube.svg'

import TenSVG from 'static/svg/ten.svg'
import Logo from 'static/svg/logo.svg'
import FlagUK from 'static/flags/uk.svg'
import FlagAU from 'static/flags/au.svg'
import FlagIE from 'static/flags/ie.svg'
import Arrow from 'static/svg/arrow.svg'

const flagMap = {
  en: FlagUK,
  au: FlagAU
}

const Container = styled.div`
  background: #e9eaee;
`

const LearningPeople = styled(Link)`
  display: flex;
  justify-content: center;
  fill: ${props => props.theme.primary};
  max-width: 100%;
  margin: 0 20px 0 0;
`

const LearningPeopleFooter = styled(LearningPeople)`
  ${mq.below('lg')} {
    display: none;
  }
`

const Languages = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 20px 0 0;

  ${mq.below('lg')} {
    justify-content: start;
    margin-top: 40px;
  }
`

const FlagLink = styled(Link)`
  margin-right: 10px;
`

const Bottom = styled.div`
  background: ${props => props.theme.primary};
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;

    & > a {
      color: #fff;
      font-size: 16px;
      display: inline-block;
      padding: 10px 15px;
      text-align: center;
    }

    & > span {
      opacity: 0.8;
      display: inline-block;
      font-size: 12px;
      padding: 0 10px 10px 10px;
      text-align: center;
    }
  }

  ${mq.below('lg')} {
    & > div {
      display: block;
      & > a {
        display: block;
      }
      & > span {
        display: block;
      }
    }
  }
`

const ColumnHeader = styled.div`
  display: block;
  color: ${props => props.theme.primary};
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid rgba(74, 74, 74, 0.2);
  padding-bottom: 5px;
  text-transform: uppercase;
  margin-bottom: 5px;
`

const ColumnLink = styled(Link)`
  padding: 3px 0;
  display: block;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: ${props => props.theme.primary};
  text-decoration: none;

  &:hover {
    font-weight: 600;
  }
`

const Columns = styled.div`
  display: flex;
  padding: 30px 0 70px;

  ${mq.below('lg')} {
    display: block;
    padding: 0px 0 0px;
  }
`

const Column = styled.div`
  box-sizing: border-box;
  width: 20%;
  padding: 20px;

  & ${ColumnHeader}:not(:first-child) {
    margin-top: 30px;
  }

  ${mq.below('lg')} {
    margin-bottom: 30px;
    padding: 0px;
    width: 100%;
  }
`

const Links = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  ${Column} {
    width: 33%;
  }
  @media (min-width: 960px) and (max-width: 1200px) {
    ${Column} {
      width: 50%;
      padding: 20px 30px;
      flex: 0 0 50%;
    }
  }
  ${mq.below('lg')} {
    width: 100%;
    ${Column} {
      width: 100%;
    }
  }
`

const InformationContent = styled.div`
  color: ${props => props.theme.primary};
  font-size: 14px;
  line-height: 20px;

  > b,
  strong {
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
  }
`

const FooterContent = styled(Content)`
  display: flex;
  flex-direction: column;
`

const Social = styled.div`
  margin: 20px 0 30px 0;
  display: flex;
`

const IconLink = styled.a`
  margin-right: 30px;
`

const IconFacebook = styled(FacebookF)`
  color: ${props => props.theme.primary};
`

const IconTwitter = styled(Twitter)`
  color: ${props => props.theme.primary};
`

const IconLinkedin = styled(Linkedin)`
  color: ${props => props.theme.primary};
`

const IconInstagram = styled(Instagram)`
  color: ${props => props.theme.primary};
`

const IconYoutube = styled(Youtube)`
  color: ${props => props.theme.primary};
`

const BackToTop = styled.div`
  margin: 30px auto 0;
  border: 2px solid ${props => props.theme.primaryRGBA(0.9)};
  border-radius: 25px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-out;

  &:hover {
    transform: translateY(-10px);
  }
`

const RotatedArrow = styled(Arrow)`
  transform: rotate(-90deg);
  fill: ${props => props.theme.primaryRGBA(0.9)};
`

const Menu = ({ item }) => {
  return (
    <>
      <ColumnHeader as={Link} to={item.url}>
        {item.title}
      </ColumnHeader>
      {item.items?.map(({ title, url }, index) => (
        <ColumnLink to={url} key={'item-' + index}>
          {title}
        </ColumnLink>
      ))}
    </>
  )
}

const buildFormatter = formatLink =>
  function format(items) {
    items.map(item => {
      item.url = formatLink(item.url)
      if (Array.isArray(item.items)) format(item.items)
    })
  }

const TenYear = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  padding-right: 20px;
  ${mq.below('lg')} {
    display: none;
  }
`

const TenText = styled.span`
  font-size: 12px;
  margin-left: 8px;
  color: ${props => props.theme.primary};
`

const Footer = compose(pure)(props => {
  const { globalData, footerMenu } = props

  const formatter = buildFormatter(props.globalData.formatLink)
  formatter(footerMenu.items)
  const {
    footerInformation: information,
    footerSecondaryLinks: secondaryLinks,
    footerRegulationItems: regulationItems,
    footerInformationHeader: informationHeader,
    footerSocialHeader: socialHeader,
    footerTwitterUrl: twitterUrl,
    footerFacebookUrl: facebookUrl,
    footerLinkedinUrl: linkedinUrl,
    footerInstagramUrl: instagramUrl,
    footerYoutubeUrl: youtubeUrl
  } = globalData

  const cols = footerMenu.items.reduce(
    (result, item, index) => {
      return result[index % 3].push(item), result
    },
    [[], [], []]
  )

  return false && props.isOffersPage ? (
    <div
      style={{
        padding: '30px'
      }}
    >
      <LearningPeople as="div">
        <Logo />
      </LearningPeople>
    </div>
  ) : (
    <Container className="gta-footer">
      <FooterContent>
        <BackToTop
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          id={ 'back-to-top' }
        >
          <RotatedArrow />
        </BackToTop>
        <Columns>
          <Column>
            <LearningPeopleFooter
              to={`/${props.globalData.language.prefix}`}
              title="LearningPeople"
            >
              <Logo />
            </LearningPeopleFooter>
            <TenYear>
              <TenSVG width={'40%'} />
              <TenText>
                Celebrating
                <br />
                ten years
              </TenText>
            </TenYear>
            <Languages>
              {Object.keys(props.post.alternate).map((key, index) => {
                const code = key === 'en' ? 'uk' : key
                const hreflang = props.post.alternate[key].hreflang
                const Flag = flagMap[key]
                let titleAttr = 'United Kingdom'
                if (code === 'au') {
                  titleAttr = 'Australia'
                }
                return (
                  <FlagLink
                    to={`/${code}`}
                    key={'flag-' + index}
                    title={titleAttr}
                  >
                    <Flag width={30} height={25} />
                  </FlagLink>
                )
              })}
              {
                <FlagLink to={`/uk`} key={'flag-99'} title="Ireland">
                  <FlagIE width={30} height={25} />
                </FlagLink>
              }
            </Languages>
          </Column>
          <Links>
            <Column>
              {cols[0].map((item, index) => (
                <Menu to={item.url} key={'col-1-' + index} item={item} />
              ))}
            </Column>
            <Column>
              {cols[1].map((item, index) => (
                <Menu to={item.url} key={'col-2-' + index} item={item} />
              ))}
            </Column>
            <Column>
              {cols[2].map((item, index) => (
                <Menu to={item.url} key={'col-3-' + index} item={item} />
              ))}
            </Column>
          </Links>
          <Column>
            <ColumnHeader>{socialHeader}</ColumnHeader>

            <Social>
              <IconLink href={facebookUrl} target="_blank">
                <IconFacebook height={16} />
              </IconLink>
              <IconLink href={twitterUrl} target="_blank">
                <IconTwitter height={16} />
              </IconLink>
              <IconLink href={linkedinUrl} target="_blank">
                <IconLinkedin height={16} />
              </IconLink>
              <IconLink href={instagramUrl} target="_blank">
                <IconInstagram height={16} />
              </IconLink>
              <IconLink href={youtubeUrl} target="_blank">
                <IconYoutube height={16} />
              </IconLink>
            </Social>
            <ColumnHeader>{informationHeader}</ColumnHeader>
            <InformationContent
              dangerouslySetInnerHTML={{ __html: information }}
            />
          </Column>
        </Columns>
      </FooterContent>
      <Bottom>
        <div>
          {secondaryLinks.map(({ label, url }, index) => (
            <Link to={url} key={'secondary-' + index}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          {regulationItems.map(({ item }, index) => (
            <span key={'regulation-' + index}>{item}</span>
          ))}
        </div>
      </Bottom>
    </Container>
  )
})

export default Footer
