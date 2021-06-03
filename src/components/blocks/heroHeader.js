import { Parallax } from 'react-scroll-parallax'
import { Content, Button, H1 } from 'components/common'
import { React, Image, styled, mq } from 'x'
import { compose, pure, lifecycle, withState } from 'recompose'
import SurveyButton from 'components/surveyButton'

import Wave from 'static/svg/wave.svg'
import Arrow from 'static/svg/arrow.svg'

const StyledWave = styled(Wave)`
  fill: ${props => props.fill};

  // IE11 Fix
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    height: 131px;
    left: 0;
  }
`

const AnimatedButton = styled(Button)`
  & svg {
    transition: transform 0.3s;
  }
  &:hover {
    & svg {
      transform: translateX(10px);
    }
  }
`

const Lower = styled.div`
  width: 100%;
  z-index: 2;
`

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  margin-right: 7px;
  cursor: pointer;
  border: 2px solid
    ${props => (props.isActive ? '#fff' : 'rgba(255, 255, 255, .5)')};
  background: ${props =>
    props.isActive ? 'rgba(255, 255, 255, .37)' : 'transparent'};

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`

const Dots = styled.div`
  display: flex;
  margin-top: 20px;
  align-self: flex-start;
  padding-bottom: 10px;

  /*
  ${mq.above('lg')} {
    padding-left: 100px;
  }
  ${mq.below('lg')} {
    padding-left: 80px;
  }
  ${mq.below('md')} {
    padding-left: 60px;
  }
  ${mq.below('sm')} {
    padding-left: 40px;
  }
  */
`

const Spacing = styled.div`
  width: 100%;
  padding-bottom: 7%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  justify-content: space-between;

  ${mq.below('lg')} {
    padding-top: 60px;
  }

  ${mq.above('lg')} {
    min-height: 737px;
  }

  ${mq.below('lg')} {
    min-height: 540px;
  }

  ${mq.below('md')} {
    min-height: 420px;
  }

  ${mq.below('sm')} {
    min-height: 390px;
  }

  @media (min-width: 960px) {
    padding-top: 142px;
  }

  @media (max-width: 960px) {
    padding-top: 60px;
  }

  // IE11 Fix
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    min-height: auto;
    padding-top: 250px;
    padding-bottom: 150px;
  }

  ${StyledWave} {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
`

const Title = styled(H1)`
  max-width: 100%;
  color: #fff;
  text-shadow: 1px 1px black;
  width: 520px;
  margin-bottom: 30px;
`

const Subtitle = styled.p`
  font-size: 18px;
  line-height: 30px;
  color: #fff;
  max-width: 500px;
  text-shadow: 1px 1px black;
  margin: 30px 0;
  font-weight: 600;
`

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  box-sizing: border-box;

  ${mq.below('lg')} {
    padding: 50px 80px;
  }
  ${mq.below('md')} {
    padding: 40px 60px;
  }
  ${mq.below('sm')} {
    padding: 30px 40px;
  }
`

const ContentWrapper = styled.div`
  max-width: none;
  width: ${props => 100 / props.numSlides}%;
  opacity: ${props => (props.isActive ? 1 : 0)};
  transition: opacity 0.5s ease-out;
`

const Slider = styled.div`
  width: 100%;
`

const Inner = styled.div`
  width: ${props => props.numSlides * 100}%;
  display: flex;
  min-height: 100%;
  position: relative;
  transform: translateX(-${props => props.index * (100 / props.numSlides)}%);
  transition: transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
`

const enhance = compose(
  pure,
  withState('index', 'setIndex', 0),
  withState('timeout', 'setTimeout', 0),
  lifecycle({
    componentDidMount() {
      if (this.props.data.slider && this.props.data.autoloop) {
        const startTimer = () =>
          this.props.setTimeout(
            setTimeout(() => {
              const numSlides = this.props.data.slider.length

              if (this.props.index + 1 > numSlides - 1) {
                this.props.setIndex(0)
              } else {
                this.props.setIndex(this.props.index + 1)
              }

              startTimer()
            }, parseInt(this.props.data.duration, 10))
          )

        startTimer()
      }
    },

    componentWillUnmount() {
      clearTimeout(this.props.timeout)
    }
  })
)

const isSmall = typeof window !== 'undefined' && window.innerWidth <= 960
const Empty = styled.div``
const Parallaxer = isSmall ? Empty : Parallax

const HeroHeader = props => {
  const slides = props.data.slider
    ? props.data.slider
    : [
        {
          image: props.data.image,
          title: props.data.title,
          subtitle: props.data.subtitle,
          ctaLabel: props.data.ctaLabel,
          ctaUrl: props.data.ctaUrl
        }
      ]

  const numSlides = slides.length

  const nextType = props?.list?.[1]?.__typename

  const backgroundColor = do {
    if (nextType === 'WordPressAcf_tab_block') '#F9F9F9'
    else if (nextType === 'WordPressAcf_two_column_video_block') '#F9F9F9'
    else if (nextType === 'WordPressAcf_feature_list_video_block') '#F9F9F9'
    else if (nextType === 'WordPressAcf_unordered_list') '#E9EAEE'
    else if (nextType === 'WordPressAcf_contact') '#F5F5F3'
    else if (nextType === 'WordPressAcf_related_courses') '#F9F9F9'
    else if (nextType === 'WordPressAcf_image_block_repeater') '#F9F9F9'
    else if (nextType === 'WordPressAcf_all_subitems') '#E9EAEE'
    else if (nextType === 'WordPressAcf_logo_list') '#F6F6F6'
    else if (nextType === 'WordPressAcf_testimonials') '#2A2D58'
    else if (nextType === 'WordPressAcf_course_collection') '#E9EAEE'
    else '#FFFFFF'
  }

  return (
    <>
      <Container>
        {props.data?.image?.file?.sharp?.fluid && (
          <Parallaxer
            slowerScrollRate
            offsetYMin={-120}
            offsetYMax={120}
            styleOuter={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}
            styleInner={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }}
          >
            <Image
              fluid={props.data.image.file.sharp.fluid}
              style={{
                position: 'absolute',
                top: '-120px',
                right: 0,
                bottom: '-120px',
                left: 0
              }}
            />
          </Parallaxer>
        )}
        <div />
        <Slider>
          <Inner index={props.index} numSlides={numSlides}>
            {slides.map((slide, index) => (
              <ContentWrapper
                numSlides={numSlides}
                key={'slide-' + index}
                isActive={props.index === index}
              >
                <StyledContent numSlides={numSlides}>
                  <div>
                    <Title>{slide.title}</Title>
                    {slide.subtitle && <Subtitle>{slide.subtitle}</Subtitle>}
                    {slide.ctaLabel && (
                      <AnimatedButton to={slide.ctaUrl}>
                        <span>{slide.ctaLabel}</span>
                        <Arrow className="circle" />
                      </AnimatedButton>
                    )}
                    {/* { props.post.slug === 'thanks-for-contacting-us' && (<SurveyButton />)} */}
                  </div>
                </StyledContent>
              </ContentWrapper>
            ))}
          </Inner>
        </Slider>
        <Lower>
          {numSlides > 1 && (
            <StyledContent>
              <Dots>
                {slides.map((slide, index) => (
                  <Dot
                    key={'dot-' + index}
                    isActive={props.index === index}
                    onClick={() => props.setIndex(index)}
                  />
                ))}
              </Dots>
            </StyledContent>
          )}
          <Spacing />
        </Lower>
        <StyledWave fill={backgroundColor} />
      </Container>
    </>
  )
}

export default enhance(HeroHeader)
