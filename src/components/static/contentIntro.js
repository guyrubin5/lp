import { React, styled } from 'x'
import { Content, H1 } from 'components/common'

const Container = styled.div`
  padding: 100px 0;
`

const Title = styled(H1)`
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: 940px;
`

const Text = styled.div`
  width: 100%;
  max-width: 940px;
  font-size: 26px;
  line-height: 36px;
  text-align: center;
  margin: 70px auto 0;
  color: ${props => props.theme.primary};
`

const ContentIntro = props => {
  return (
    <Container>
      <Content>
        <Title>{ props.post.title }</Title>
        <Text dangerouslySetInnerHTML={ { __html: props.post.content } }/>
      </Content>
    </Container>
  )
}

export default ContentIntro