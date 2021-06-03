import { Parallax } from 'react-scroll-parallax'
import { StaticQuery, graphql } from 'gatsby'
import { React, Image, styled, mq } from 'x'
import { Content, H2, H4, Button } from 'components/common'
import { compose, pure, lifecycle, withState, withHandlers } from 'recompose'

import Arrow from 'static/svg/arrow.svg'
import Motherboard from 'components/motherboard'
import Circuitboard from 'components/circuitboard'

// const Parallax = ({ children }) => <>{ children }</>

const Container = styled.div`
  background-color: ${(props) => props.theme.primary};
  text-align: ${(props) => (props.align ? props.align : 'center')};
  background-size: cover;
  position: relative;
  overflow: hidden;
`

const Darken = styled.div`
  background: ${(props) =>
    props.darken
      ? 'radial-gradient(circle at center, rgba(0,0,0,.15) 50%, transparent 140%)'
      : 'transparent'};

  z-index: 1;
  position: relative;
`

const GenericBlockContent = styled(Content)`
  padding-top: ${(props) => (props.prospectus ? 70 : 135)}px;
  padding-bottom: ${(props) => (props.prospectus ? 70 : 135)}px;

  z-index: 1;
  position: relative;

  ${mq.below('lg')} {
    padding-top: ${(props) => (props.prospectus ? 70 : 100)}px;
    padding-bottom: ${(props) => (props.prospectus ? 70 : 100)}px;
  }

  ${mq.below('sm')} {
    padding-top: ${(props) => (props.prospectus ? 20 : 50)}px;
    padding-bottom: ${(props) => (props.prospectus ? 50 : 50)}px;
  }
`

const Title = styled(H2)`
  margin-bottom: 30px;
  margin-top: 0;
  text-shadow: 1px 1px black;
  ${(props) => props.align === 'left' && `max-width: 600px;`}

  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  color: #fff;
`

const PreTitle = styled(H4)`
  color: #fff;
  padding-bottom: 35px;
  text-shadow: 1px 1px black;
  font-size: 16px;
  &:after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Subtitle = styled.p`
  font-size: 16px;
  text-shadow: 1px 1px black;
  line-height: 28px;
  color: #fff;
`

const GenericBlockButton = styled(Button)`
  margin-top: 35px;
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

const isSmall = typeof window !== 'undefined' && window.innerWidth <= 960
const Empty = styled.div``
const Parallaxer = isSmall ? Empty : Parallax

const GenericBlock = (props) => {
  const data = props.prospectus
    ? props.data
    : props.data.selected
    ? props.data.selected.acf
    : props.data

  // c onsole.log('data', props.data)

  const title = props.prospectus ? props.data.selected.title : data.title

  const background = do {
    if (data.style === 'image' && data?.backgroundImage?.file)
      data.backgroundImage.file
    else if (data.style === 'lines') props.linesBackground
    else if (data.style === 'circles') props.circlesBackground
    else if (data.style === 'motherboard') props.motherboardBackground
    else if (data.style === 'crisps') props.crispsBackground
    // Default to lines
    else props.linesBackground
  }

  const Animated = Circuitboard

  const titleElement = props.data.selected
    ? props.data.selected.acf.titleElement?.select &&
      props.data.selected.acf.titleElement.select !== 'default'
      ? props.data.selected.acf.titleElement.select
      : 'h2'
    : props.data.titleElement && props.data.titleElement !== 'default'
    ? props.data.titleElement
    : 'h2'

  const subtitleElement = props.data.selected
    ? props.data.selected.acf.subtitleElement?.select &&
      props.data.selected.acf.subtitleElement.select !== 'default'
      ? props.data.selected.acf.subtitleElement.select
      : 'h2'
    : props.data.subtitleElement && props.data.subtitleElement !== 'default'
    ? props.data.subtitleElement
    : 'h2'

  return (
    <Container align={data.align}>
      {data.style === 'circuit-board' ? (
        <Circuitboard />
      ) : data.style === 'motherboard-animated' ? (
        <Motherboard />
      ) : (
        <Parallaxer
          slowerScrollRate
          offsetYMin={-240}
          offsetYMax={240}
          styleOuter={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          styleInner={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <Image
            fluid={background.sharp.fluid}
            style={{
              position: 'absolute',
              top: '-240px',
              right: 0,
              bottom: '-240px',
              left: 0,
            }}
          />
        </Parallaxer>
      )}
      <Darken
        darken={
          data.style !== 'circuit-board' &&
          data.style !== 'motherboard-animated'
        }
      >
        <GenericBlockContent
          prospectus={props.prospectus}
          offsetLeft={data.align === 'left'}
        >
          {data.pretitle && <PreTitle>{data.pretitle}</PreTitle>}
          <Title
            as={titleElement}
            align={data.align}
            show={data.style !== 'AAAmotherboard-animated'}
          >
            {title}
          </Title>
          {data.subtitle && (
            <Subtitle as={subtitleElement}>{data.subtitle}</Subtitle>
          )}
          {props.prospectus && (
            <PdfBlock>
              <a href={props.data.selected.acf.pdf} target="_blank">
                <Image fluid={props.data.selected.acf.thumb.file.sharp.fluid} />
              </a>
            </PdfBlock>
          )}
          {data.ctaLabel && (
            <GenericBlockButton to={data.ctaUrl}>
              {data.ctaLabel}
              <Arrow className="circle" />
            </GenericBlockButton>
          )}
        </GenericBlockContent>
      </Darken>
    </Container>
  )
}

export default compose(pure)((props) => (
  <StaticQuery
    query={graphql`
      fragment BackgroundImage on File {
        sharp: childImageSharp {
          fluid(maxWidth: 2500, quality: 80) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      query {
        linesBackground: file(relativePath: { eq: "lines.png" }) {
          ...BackgroundImage
        }
        circlesBackground: file(relativePath: { eq: "circles.png" }) {
          ...BackgroundImage
        }
        motherboardBackground: file(relativePath: { eq: "motherboard.png" }) {
          ...BackgroundImage
        }
        crispsBackground: file(relativePath: { eq: "crisps.png" }) {
          ...BackgroundImage
        }
      }
    `}
    render={(data) => {
      return <GenericBlock {...props} {...data} />
    }}
  />
))
