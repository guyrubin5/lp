import { compose, withState } from 'recompose'
import { React, styled, mq, Image } from 'x'
import { H2 } from 'components/common'

import PlayArrow from 'static/svg/play.svg'

const VideoContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
      circle at center,
      rgba(0, 0, 0, 0.2) 50%,
      transparent 140%
    ),
    url(${props => props.poster}) center;
  background-size: cover;
`

const VideoPlayArrow = styled(PlayArrow)`
  color: ${props => props.theme.primary};
`

const PlayButton = styled.div`
  border-radius: ${props => (props.small ? '45px' : '60px')};
  width: ${props => (props.small ? '90px' : '120px')};
  height: ${props => (props.small ? '90px' : '120px')};
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  ${mq.below('lg')} {
    border-radius: ${props => (props.small ? '35px' : '50px')};
    width: ${props => (props.small ? '70px' : '100px')};
    height: ${props => (props.small ? '70px' : '100px')};
  }
  ${mq.below('md')} {
    border-radius: ${props => (props.small ? '30px' : '40px')};
    width: ${props => (props.small ? '60px' : '80px')};
    height: ${props => (props.small ? '60px' : '80px')};
  }
  ${mq.below('sm')} {
    border-radius: ${props => (props.small ? '30px' : '30px')};
    width: ${props => (props.small ? '60px' : '60px')};
    height: ${props => (props.small ? '60px' : '60px')};
  }

  &:hover {
    background: ${props => props.theme.primary};
    transform: scale(1.05);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.37);

    ${VideoPlayArrow} {
      color: #fff;
    }
  }
`

const Video = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  iframe,
  embed,
  object {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const HeadlineWrapper = styled.div`
  position: absolute;
`

const Headline = styled(H2)`
  color: #fff;
  text-align: center;
  padding: 0 50px;
  font-size: ${props => (props.small ? '24px' : '50px')};
  line-height: ${props => (props.small ? '24px' : '50px')};
  font-weight: ${props => (props.small ? '600' : '700')};
  position: relative;
  transform: translateY(-50%);
  margin: 0;
  bottom: ${props => (props.small ? '75px' : '90px')};

  ${mq.below('lg')} {
    font-size: ${props => (props.small ? '24px' : '28px')};
    bottom: ${props => (props.small ? '70px' : '80px')};
  }
  ${mq.below('md')} {
    font-size: ${props => (props.small ? '22px' : '24px')};
    bottom: ${props => (props.small ? '65px' : '70px')};
  }
  ${mq.below('sm')} {
    font-size: ${props => (props.small ? '18px' : '18px')};
    bottom: ${props => (props.small ? '55px' : '40px')};
    font-weight: ${props => (props.small ? '600' : '500')};
  }
`

const enhance = compose(withState('play', 'setPlay', false))

// TODO video loader (load iframe above loader, so it hides)
const VideoHolder = props => {
  return (
    <VideoContent>
      {props.poster && (
        <Image
          fixed={props.poster}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: 'auto'
          }}
        />
      )}
      {!props.play && (
        <>
          {props.headline && (
            <HeadlineWrapper>
              <Headline small={props.small}>{props.headline}</Headline>
            </HeadlineWrapper>
          )}
          <PlayButton onClick={() => props.setPlay(true)} small={props.small}>
            <VideoPlayArrow
              width={props.small ? 35 : 40}
              height={props.small ? 35 : 40}
            />
          </PlayButton>
        </>
      )}
      {props.play && (
        <Video
          dangerouslySetInnerHTML={{
            __html: props.video.replace(
              /feature=oembed/,
              'feature=oembed&autoplay=true&rel=0'
            )
          }}
        />
      )}
    </VideoContent>
  )
}

export default enhance(VideoHolder)
