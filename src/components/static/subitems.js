import { iconMap } from '../blocks/iconGrid'
import { makeParallax } from 'library/parallax'
import { default as Fade } from 'react-reveal/Fade'
import { Content, H4, TextButton } from 'components/common'
import { React, Link, Image, styled, Filters, mq } from 'x'

import Arrow from 'static/svg/arrow.svg'
import Chips2 from 'static/artifacts/chips-2.svg'
import BlobBlue from 'static/artifacts/blob-blue.svg'
import LinesSmallYellow from 'static/artifacts/lines-small-yellow.svg'
import LinesAltDark from 'static/artifacts/lines-alt-dark.svg'

const { below } = mq.createBreakpoints({
  itemsMD: '915px',
  itemsLG: '970px',
})

const Container = styled.div`
  background-color: #e9eaee;
  padding: 60px 0;
  position: relative;
  overflow: hidden;

  ${mq.below('lg')} {
    padding: 50px 0;
  }
  ${mq.below('md')} {
    padding: 50px 0;
  }
  ${mq.below('sm')} {
    padding: 40px 0 40px 0;
  }
`

const ItemContent = styled(Content)`
  overflow: hidden;
  position: relative;
  z-index: 2;
  margin-top: 35px;
  ${below('itemsMD')} {
    padding: 0;
  }
`

const Title = styled(H4)`
  margin-top: 0px;
  margin-bottom: 70px;
  ${mq.below('lg')} {
    margin-bottom: 60px;
  }
  ${mq.below('md')} {
    margin-bottom: 50px;
  }
  ${mq.below('sm')} {
    margin-bottom: 40px;
  }

  ${below('itemsMD')} {
    margin-left: 5%;
  }
`

const ItemContainer = styled.div`
  width: calc(100% + 35px);
  display: flex;
  flex-wrap: wrap;
  ${below('itemsMD')} {
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    &:after {
      content: '';
      flex: 0 0 1px;
    }
  }
`

const IconWrapper = styled.div`
  margin-bottom: 25px;
  text-align: left;
`

const Item = styled.div`
  background: #fff;
  box-sizing: border-box;

  /* Bottom includes ItemTextButton which is absolute */
  padding: ${(props) =>
    props.isProspectus ? '10px 10px 25px 10px' : '52px 38px 92px 38px'};

  width: 364px;
  margin: 0 35px 35px 0;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 10px;
  z-index: 2;
  height: calc(100% - 50px);

  ${below('itemsLG')} {
    margin: 0 48px 48px 0;
    width: 300px;
  }
  ${below('itemsMD')} {
    flex: 0 0 80%;
    margin-left: ${(props) => (props.isFirst ? '5%' : 0)};
  }
`

const ItemIndex = styled.small`
  display: block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 20px;
  padding-bottom: 35px;
  margin-bottom: 35px;
  position: relative;
  color: ${(props) => props.theme.primary};
  &:after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: ${(props) => props.theme.secondary};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

const ItemHeader = styled.div`
  position: relative;
`

const HeaderImage = styled(Link)`
  position: relative;
  display: block;
  box-sizing: border-box;
  height: 55px;
  max-width: 50%;
  right: 0;
  top: 0;
  margin-bottom: 20px;
`

const HeaderThumb = styled(Link)`
  height: 55px;
  margin-bottom: 25px;
  display: block;
`

const ItemTitle = styled(Link)`
  display: block;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;
  margin-bottom: 16px;

  /*
  ::after {
    content: "";
  }
  &:hover ::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: rgba(255, 255, 255, 1) 0 0 3px 3px;
  }
  */
`

const ItemSummary = styled.div`
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => props.theme.primary};
  margin: 16px 0 42px 0;

  b,
  strong {
    font-weight: 600;
  }

  a {
    color: ${(props) => props.theme.primary};
    text-decoration: underline;
  }
`

const ItemTextButton = styled(TextButton)`
  position: absolute;
  bottom: 42px;
  padding: 10px 28px 10px 0;
  color: ${(props) => props.theme.secondary};
  & > .arrow {
    fill: ${(props) => props.theme.secondary};
    top: 15px;
  }
  &:hover {
    color: #eda331;
  }
`

const ArtifactA = makeParallax(styled.div`
  position: absolute;
  right: 20px;
  top: 430px;
  z-index: 1;

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactB = makeParallax(styled.div`
  position: absolute;
  left: -20px;
  top: 720px;
  z-index: 1;

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactC = styled.div`
  position: absolute;
  left: 20%;
  top: -60px;
  z-index: 1;
  transform: rotate(35deg);

  ${mq.below('xl')} {
    display: none;
  }
`

const BackgroundHeader = styled.div`
  height: 150px;
  position: relative;
  width: 100%;
  padding: 0px 38px 0px 38px;
  margin-left: -38px;
  margin-top: -62px;
  margin-bottom: 35px;
  /*
  padding: 30px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  */
`

const BackgroundHeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const BackgroundHeaderGradient = styled(Link)`
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 140%
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`

const BackgroundIndex = styled.small`
  display: block;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.2px;
  position: absolute;
  padding: 30px;
  top: 0;
  left: 0;
  color: #fff;
  z-index: 3;
  &:after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: ${(props) => props.theme.secondary};
    position: absolute;
    bottom: 0;
    left: 30px;
  }
`

const PdfBlock = styled.div`
  max-width: 315px;
  padding: 10px;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0 4px 10px 0px rgba(0, 0, 0, 0.57);
  transition: transform 0.2s ease-out;

  &:hover {
    transform: scale(1.05);
  }
`

const renderIcon = (name) => {
  const Icon = iconMap?.[name] ?? iconMap['time']
  return (
    <IconWrapper>
      <Icon width={70} />
    </IconWrapper>
  )
}

const Empty = styled.div``

export default (props) => {
  const globalData = props.globalData
  const relationId = props.post.id
  const title = props.data.title
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h4'
  const formatLink = props.globalData.formatLink

  const extraKey = do {
    if (props.post.layout === 'accreditors') 'courses'
    else if (props.post.layout === 'categories') 'accreditors'
    else if (
      props.post.layout === 'page' &&
      props.post.acf.pageLayout === 'content'
    )
      'pages'
    else if (
      props.post.layout === 'page' &&
      props.post.acf.pageLayout === 'career_overview'
    )
      'careers'
    else if (
      props.post.layout === 'page' &&
      props.post.acf.pageLayout === 'courses'
    )
      'courseCategories'
    else if (
      props.post.layout === 'page' &&
      props.post.acf.pageLayout === 'offer_overview'
    )
      'offerCategories'
    else if (props.post.layout === 'offer_categories') 'offers'
    else if (
      props.post.layout === 'page' &&
      props.post.acf.pageLayout === 'prospectuses_overview'
    )
      'prospectuses'
  }

  const nodes = props.extra[extraKey]

  const isSmall = typeof window !== 'undefined' && window.innerWidth <= 544

  // c onsole.log('title Element', titleElement)

  return (
    <Container>
      <ItemContent>
        {title && (
          <Title as={titleElement} line={true}>
            {title}
          </Title>
        )}
        <ItemContainer>
          {nodes.map((node, index) => {
            const Fader = isSmall && index < 2 ? Empty : Fade

            return (
              <Fader key={node.id} delay={(index % 3) * 200}>
                <Item
                  key={'item-' + node.id}
                  isFirst={index === 0}
                  isLast={index === nodes.length - 1}
                  isProspectus={extraKey === 'prospectuses'}
                >
                  {node.acf && node.acf.image?.file?.sharp ? (
                    <BackgroundHeader>
                      <Image
                        fixed={node.acf.image.file.sharp.fixed}
                        style={{
                          height: 'auto',
                          width: '100%',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                        }}
                      />
                      <BackgroundHeaderGradient
                        to={props.globalData.formatLink(node.link)}
                      />
                    </BackgroundHeader>
                  ) : node.acf && node.acf.icon ? (
                    renderIcon(node.acf.icon)
                  ) : extraKey === 'prospectuses' ? (
                    <a href={node.acf.pdf} target="_blank">
                      {node.acf.thumb?.file?.sharp && (
                        <Image fixed={node.acf.thumb.file.sharp.fixed} />
                      )}
                    </a>
                  ) : node.acf.thumb ? (
                    <BackgroundHeader>
                      <Image
                        fixed={node.acf.thumb.file.sharp.fixed}
                        style={{
                          height: 'auto',
                          width: '100%',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                        }}
                      />
                      <BackgroundHeaderGradient
                        to={props.globalData.formatLink(node.link)}
                      />
                    </BackgroundHeader>
                  ) : (
                    <ItemHeader>
                      {node.acf && node.acf.thumbnail?.file?.sharp && (
                        <HeaderImage
                          to={props.globalData.formatLink(node.link)}
                          style={{
                            height: '55px',
                          }}
                        >
                          <Image
                            fixed={node.acf.thumbnail.file.sharp.fixed}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                            imgStyle={{
                              objectFit: 'contain',
                              objectPosition: 'left top',
                            }}
                            objectFit="contain"
                            objectPosition="left top"
                          />
                        </HeaderImage>
                      )}
                    </ItemHeader>
                  )}
                  {extraKey !== 'prospectuses' && (
                    <>
                      <ItemTitle to={props.globalData.formatLink(node.link)}>
                        {node.title}
                      </ItemTitle>
                      {node.acf && node.acf.summary && (
                        <ItemSummary
                          dangerouslySetInnerHTML={{ __html: node.acf.summary }}
                        />
                      )}
                      <ItemTextButton to={formatLink(node.link)}>
                        {props.globalData.stringFindOutMore}
                        <Arrow className="arrow" />
                      </ItemTextButton>
                    </>
                  )}
                </Item>
              </Fader>
            )
          })}
        </ItemContainer>
      </ItemContent>
      <ArtifactA offset={120}>
        <Chips2 width={230} />
      </ArtifactA>
      <ArtifactB offset={80}>
        <LinesAltDark width={160} />
      </ArtifactB>
      <ArtifactC>
        <BlobBlue width={160} />
      </ArtifactC>
    </Container>
  )
}
