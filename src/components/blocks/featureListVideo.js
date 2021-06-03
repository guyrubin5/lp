import { compose, pure } from 'recompose'
import { React, styled, mq } from 'x'
import { Content, H2, VideoSubtitle } from 'components/common'
import { makeParallax, makeSpinParallax } from 'library/parallax'

import FeatureList from 'components/blocks/featureList'
import VideoHolder from 'components/video'

import LinesBlue from 'static/artifacts/lines-blue.svg'
import LinesAltDark from 'static/artifacts/lines-alt-dark.svg'
import CrossYellow from 'static/artifacts/cross-yellow.svg'
import CrossBlue from 'static/artifacts/cross-blue.svg'
import CircleBlue from 'static/artifacts/circle-blue.svg'
import CircleYellow from 'static/artifacts/circle-yellow.svg'

const Container = styled.div`
  padding: 100px 0;
  background-color: #f9f9f9;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  ${mq.below('sm')} {
    padding: 60px 0;
  }
`

const Title = styled(H2)`
  margin-top: 0;
`

const FeatureListVideoContent = styled(Content)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  z-index: 1;
`

const LeftWrapper = styled.div`
  flex: 1 0 auto;
  max-width: 46%;
  margin-right: 8%;

  ${mq.below('lg')} {
    width: 100%;
    max-width: 100%;
    margin-bottom: 12%;
  }
`

const VideoWrapper = styled.div`
  max-width: 46%;
  flex: 1 1 auto;
  position: relative;

  ${mq.below('lg')} {
    width: 100%;
    max-width: 100%;
  }
  ${mq.below('sm')} {
    padding: 25px 0 0 0;
  }
`

const VideoBlock = styled.div`
  width: 100%;
  padding-bottom: 56.3%;
  position: relative;
  z-index: 2;
  overflow: hidden;
`

const ArtifactA = makeParallax(styled.div`
  position: absolute;
  left: -80px;
  top: 320px;
  z-index: 1;

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactB = makeParallax(styled.div`
  position: absolute;
  right: -100px;
  margin-top: -120px;
  z-index: 1;

  ${mq.below('xl')} {
    display: none;
  }
`)

const SpinningCross = makeSpinParallax(CrossYellow)

const ArtifactC = makeParallax(styled.div`
  position: absolute;
  left: -70px;
  top: -30px;
  z-index: 1;
  transform: rotate(25deg);

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactD = makeParallax(styled.div`
  position: absolute;
  right: -50px;
  bottom: 150px;

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactE = makeParallax(styled.div`
  position: absolute;
  right: 100px;
  top: 250px;

  ${mq.below('lg')} {
    display: none;
  }
`)

const enhance = compose(pure)

const FeatureListVideo = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'

  return (
    <Container>
      <ArtifactA offset={70}>
        <LinesAltDark width={180} />
      </ArtifactA>
      <FeatureListVideoContent>
        <LeftWrapper>
          <Title as={titleElement}>{props.data.title}</Title>
          <FeatureList
            globalData={props.globalData}
            noContainer={true}
            compact={true}
            align="left"
            data={{
              subtitle: props.data.featureList.subtitle,
              items: props.data.featureList.items,
              ctaLabel: props.data.featureList.ctaLabel,
              ctaUrl: props.data.featureList.ctaUrl,
            }}
          />
        </LeftWrapper>
        <VideoWrapper>
          <VideoBlock>
            <VideoHolder
              poster={props.data.video.acf.image.file.sharp.fixed}
              video={props.data.video.acf.embed}
              small={true}
            />
          </VideoBlock>
          <ArtifactB offset={37}>
            <CircleYellow width={200} />
          </ArtifactB>
          <ArtifactC offset={100}>
            <CrossBlue width={100} />
          </ArtifactC>
          <VideoSubtitle>{props.data.videoSubtitle}</VideoSubtitle>
        </VideoWrapper>
      </FeatureListVideoContent>
      <ArtifactE offset={60}>
        <SpinningCross
          width={160}
          style={{
            transformOrigin: '80px 80px',
          }}
        />
      </ArtifactE>
      <ArtifactD offset={30}>
        <LinesBlue width={200} />
      </ArtifactD>
    </Container>
  )
}

export default enhance(FeatureListVideo)
