import { compose, pure } from 'recompose'
import { React, styled, mq } from 'x'
import { default as VideoHolder } from 'components/video'
import { makeParallax, makeSpinParallax } from 'library/parallax'
import { Content, H1, H4, ButtonYellow, VideoSubtitle } from 'components/common'

import Arrow from 'static/svg/arrow.svg'

import LinesBlue from 'static/artifacts/lines-blue.svg'
import CrossGrey from 'static/artifacts/cross-grey.svg'
import CrossYellow from 'static/artifacts/cross-yellow.svg'
import CircleYellow from 'static/artifacts/circle-yellow.svg'

const Container = styled.div`
  background-color: #f9f9f9;
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  ${mq.below('sm')} {
    padding: 30px 0;
  }
`

const StyledContent = styled(Content)`
  z-index: 1;
`

const Pretitle = styled(H4)``

const Title = styled(H1)`
  text-align: left;
  margin: 0 0 30px 0;
  font-size: 50px;
  line-height: 50px;
  width: auto;
`

const Text = styled.div`
  font-weight: 400;
  color: ${(props) => props.theme.primary};
  margin-bottom: 40px;
  font-size: 16px;
  line-height: 1.7em;
  > p:first-child {
    margin-top: 0;
  }
`

const ColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`

const VideoColumn = styled.div`
  flex: 1 0 auto;
  max-width: 40%;
  margin-right: ${(props) => (props.align === 'left' ? '8%' : '0')};
  margin-left: ${(props) => (props.align === 'right' ? '8%' : '0')};

  ${mq.below('lg')} {
    width: 100%;
    max-width: 100%;
    margin-bottom: ${(props) => (props.align === 'left' ? '12%' : '0')};
    margin-top: ${(props) => (props.align === 'right' ? '12%' : '0')};
    margin-left: 0;
    margin-right: 0;
  }
`

const TextColumn = styled.div`
  max-width: 52%;
  margin-right: 0;
  flex: 1 1 auto;
  position: relative;
  z-index: 1;

  ${mq.below('lg')} {
    width: 100%;
    max-width: 100%;
  }
`

const VideoBlock = styled.div`
  padding-bottom: 56.3%;
  position: relative;
  z-index: 2;
`

const SpinningCross = makeSpinParallax(CrossYellow)

const ArtifactA = makeParallax(styled.div`
  position: absolute;
  left: -90px;
  top: 30px;
  z-index: 1;

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactB = makeParallax(styled.div`
  position: absolute;
  right: 50px;
  top: 120px;
  z-index: 1;

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactC = makeParallax(styled.div`
  position: absolute;
  left: 0;
  top: 380px;

  ${mq.below('xl')} {
    display: none;
  }
`)

const ArtifactD = makeParallax(styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  transform: translateX(-110px);

  ${mq.below('lg')} {
    display: none;
  }
`)

const enhance = compose(pure)

const TwoColumnVideoBlock = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h1'
  const VideoCol = (
    <VideoColumn align={props.data.videoSide} key={'video'}>
      <VideoBlock>
        <VideoHolder
          poster={props.data.video.acf?.image?.file?.sharp?.fixed}
          video={props.data.video.acf.embed}
          small={true}
        />
      </VideoBlock>
      <ArtifactD offset={300}>
        <SpinningCross
          width={160}
          style={{
            transformOrigin: '80px 80px',
          }}
        />
      </ArtifactD>
      <ArtifactB offset={120}>
        <CircleYellow width={200} />
      </ArtifactB>
      <ArtifactC offset={170}>
        <CrossGrey width={200} />
      </ArtifactC>
      <VideoSubtitle>{props.data.videoSubtitle}</VideoSubtitle>
    </VideoColumn>
  )

  const TextCol = (
    <TextColumn key={'text'}>
      {props.data.pretitle && (
        <Pretitle line={true}>{props.data.pretitle}</Pretitle>
      )}
      {props.data.title && (
        <Title as={titleElement} line={false}>
          {props.data.title}
        </Title>
      )}
      <Text dangerouslySetInnerHTML={{ __html: props.data.text }} />
      {props.data.ctaLabel && (
        <ButtonYellow to={props.data.ctaUrl}>
          {props.data.ctaLabel}
          <Arrow className="circle" />
        </ButtonYellow>
      )}
    </TextColumn>
  )

  return (
    <Container>
      <ArtifactA offset={50}>
        <LinesBlue width={180} />
      </ArtifactA>
      <StyledContent>
        <ColumnContainer>
          {props.data.videoSide === 'left'
            ? [VideoCol, TextCol]
            : [TextCol, VideoCol]}
        </ColumnContainer>
      </StyledContent>
    </Container>
  )
}

export default enhance(TwoColumnVideoBlock)
