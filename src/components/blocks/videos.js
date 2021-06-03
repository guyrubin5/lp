import { compose, pure } from 'recompose'
import { Content } from 'components/common'
import { React, styled, mq } from 'x'
import VideoHolder from '../video'

const Container = styled.div`
  padding: 35px 0;
`

const VideosContent = styled(Content)`
  overflow: hidden;
`

const VideosContainer = styled.div`
  width: calc(100% + 35px);
  display: flex;
  flex-wrap: wrap;

  ${mq.below('xl')} {
    justify-content: center;
  }
`

const VideoBlock = styled.div`
  width: 548px;
  height: 328px;
  margin: 0 35px 35px 0;
  position: relative;
`

const enhance = compose(pure)

const Videos = props => {
  return (
    <Container>
      <VideosContent>
        <VideosContainer>
          {props.data.videos.map((item, index) => (
            <VideoBlock key={index}>
              <VideoHolder
                poster={item.video.acf.image.file.sharp.fixed}
                video={item.video.acf.embed}
                headline={item.video.acf.headline}
                small={true}
              />
            </VideoBlock>
          ))}
        </VideosContainer>
      </VideosContent>
    </Container>
  )
}

export default enhance(Videos)
