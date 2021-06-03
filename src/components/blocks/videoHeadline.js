import { compose, pure } from 'recompose'
import { React, styled, mq } from 'x'
import { Content } from 'components/common'
import VideoHolder from 'components/video'

const Container = styled.div`
  padding: 100px 20px;
  ${mq.below('lg')} {
    padding: 70px 20px;
  }
  ${mq.below('md')} {
    padding: 50px 20px;
  }
  ${mq.below('sm')} {
    padding: 30px 20px;
  }
`

const VideoBlock = styled.div`
  width: 100%;
  padding-bottom: 56.3%;
  position: relative;
`

const enhance = compose(pure)

const VideoHeadline = props => {
  return (
    <Container>
      <Content noPadding={true}>
        <VideoBlock>
          <VideoHolder
            poster={props.data.video.acf.image.file.sharp.fixed}
            video={props.data.video.acf.embed}
            headline={props.data.video.acf.headline}
          />
        </VideoBlock>
      </Content>
    </Container>
  )
}

export default enhance(VideoHeadline)
