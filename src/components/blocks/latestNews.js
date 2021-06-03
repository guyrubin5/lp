import { Content, H2, H3, H4 } from 'components/common'
import { React, styled, mq } from 'x'
import { compose, lifecycle, withState } from 'recompose'

const { below } = mq.createBreakpoints({
  lnLG: '1100px',
})

const Container = styled.div`
  padding: 70px 0;
`

const Title = styled(H2)`
  margin-top: 0px;
  margin-bottom: 40px;
`

const BigContainer = styled.div`
  display: flex;
  ${mq.below('lg')} {
    flex-flow: column;
  }
`

const BigPost = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  ${mq.below('lg')} {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  ${mq.below('sm')} {
    flex-flow: column;
    align-items: start;
  }
`

const BigImage = styled.div`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: 50%;
  max-width: 70%;
  width: 100%;
  &:after {
    content: '';
    display: block;
    padding-bottom: 70%;
  }

  ${mq.below('lg')} {
    max-width: 300px;
  }
`

const Meta = styled.div`
  padding: 0 40px;
  max-width: 200px;
  min-width: 30%;
  ${mq.below('sm')} {
    max-width: 100%;
    padding: 0;
    margin-top: 20px;
    margin-bottom: 30px;
  }
`

const MetaTitle = styled(H3)`
  font-size: 20px;
  margin: 5px 0;
  display: block;

  ${below('lnLG')} {
    line-height: 22px;
  }
`

// const FormattedDate = styled(H4)`
//   color: ${props => props.theme.secondary};
//   font-size: 15px;
//   margin: 5px 0;
// `

const Topics = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Topic = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.secondary};
  margin-right: 10px;
  &:last-child {
    margin-left: 0;
  }
`

const SmallContainer = styled.div`
  display: flex;
  margin-top: 60px;
  ${mq.below('lg')} {
    margin-top: 20px;
    flex-wrap: wrap;
  }
  ${mq.below('lg')} {
    display: none;
  }
`

const SmallPost = styled.div`
  width: 25%;
  box-sizing: border-box;
  padding-right: 40px;
  ${mq.below('lg')} {
    width: 52%;
    margin-bottom: 20px;
  }
`

const enhance = compose(
  withState('posts', 'setPosts', []),
  lifecycle({
    componentWillUnmount() {
      this.mounted = false
    },

    async componentDidMount() {
      this.mounted = true

      const result = await fetch(
        `${this.props.globalData.hubspotProxyUrl}/api/public/posts/${this.props.globalData.language.code}`
      )
      const posts = await result.json()

      posts.forEach((post) => {
        let date = new Date()
        date.setTime(post.publish_date)
        post.niceDate = date.toLocaleDateString(
          this.props.post.language.hreflang,
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        )
      })

      if (this.mounted) {
        this.props.setPosts(posts)
      }
    },
  })
)

const LatestNews = (props) => {
  const bigPosts = props.posts.splice(0, 2)

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'
  return (
    <Container>
      <Content>
        <Title as={titleElement}>{props.data.title}</Title>
        <BigContainer>
          {bigPosts.map((post, index) => (
            <BigPost key={index}>
              <BigImage background={post.featured_image} />
              <Meta>
                <MetaTitle as="a" href={post.absolute_url} target="_blank">
                  {post.title}
                </MetaTitle>
                <Topics>
                  {post.formatted_topics.map((topic, index) => (
                    <Topic
                      target="_blank"
                      href={`https://blog.learningpeople.com/topic/${topic.slug}`}
                      key={index}
                    >
                      {topic.name}
                    </Topic>
                  ))}
                </Topics>
              </Meta>
            </BigPost>
          ))}
        </BigContainer>
        <SmallContainer>
          {props.posts.map((post, index) => (
            <SmallPost key={index}>
              <MetaTitle as="a" href={post.absolute_url} target="_blank">
                {post.title}
              </MetaTitle>
              <Topics>
                {post.formatted_topics.map((topic, index) => (
                  <Topic
                    target="_blank"
                    href={`https://blog.learningpeople.com/topic/${topic.slug}`}
                    key={index}
                  >
                    {topic.name}
                  </Topic>
                ))}
              </Topics>
            </SmallPost>
          ))}
        </SmallContainer>
      </Content>
    </Container>
  )
}

export default enhance(LatestNews)
