import { Image, React, styled, mq, Filters } from 'x'
import { H3 } from 'components/common'
import referencesQuery from 'components/static/referencesQuery'

const { below } = mq.createBreakpoints({
  custom: '1200px'
})

const Container = styled.div`
  padding: 60px 0;
  ${mq.below('lg')} {
    padding: 50px 0;
    &:before {
      content: '${props => props.title}';
      font-weight: 700;
      font-size: 40px;
      color: ${props => (props.color ? props.color : props.theme.primary)};
      line-height: 50px;
      margin-bottom: 30px;
      display: block;
      margin-left: 5%;
    }
  }
  ${mq.below('md')} {
    padding: 40px 0;
    &:before {
      font-size: 35px;
    }
  }
  ${mq.below('sm')} {
    padding: 30px 0;
    &:before {
      font-size: 30px;
    }
  }
`

const Wrapper = styled.div`
  padding-left: 100px;
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  ${mq.below('lg')} {
    padding-left: 0;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
`

const Title = styled(H3)`
  font-size: 30px;
`

const LogoTitle = styled(H3)`
  margin: 0 0 40px 0;
`

const LogoSubtitle = styled.p`
  font-size: 16px;
  color: ${props => props.theme.primaryRGBA(0.4)};
  margin-bottom: 0;
`

const Block = styled.div`
  box-sizing: border-box;
  background-color: ${props => (props.dark ? '#E9EAEE' : '#F9F9F9')};
  padding: 30px 60px;
  border-right: 1px solid #e9eaee;
  flex: 0 0 auto;
  width: 25%;

  ${mq.above('xl')} {
    width: 20%;
  }

  ${below('custom')} {
    padding: 40px;
  }

  ${mq.below('lg')} {
    display: ${props => (props.dark ? 'none' : 'block')};
    width: 300px;
    max-width: 90%;
  }
`

const AccreditedBy = props => {
  const extract = node => ({
    id: node.id,
    title: node.title,
    subtitle: node.acf.subtitle,
    logo: node.acf.thumbnail.file.sharp.fixed,
    inCarousel: node.acf.inCarousel
  })

  const combined = []
    .concat(props.data.partners.map(extract))
    .concat(props.data.accreditors.map(extract))

  return (
    <Container title={props.globalData.stringAccceptedByAndPartneredWith}>
      <Wrapper>
        <Block dark={true}>
          <Title>{props.globalData.stringAccceptedByAndPartneredWith}</Title>
        </Block>
        {combined.map(item => (
          <Block key={item.id}>
            <LogoTitle>{item.title}</LogoTitle>
            <Image
              fixed={item.logo}
              style={{
                height: '106px',
                width: '70%'
              }}
              imgStyle={{
                objectFit: 'contain',
                objectPosition: 'left'
              }}
            />
            <LogoSubtitle>{item.subtitle}</LogoSubtitle>
          </Block>
        ))}
      </Wrapper>
    </Container>
  )
}

export default referencesQuery(AccreditedBy)
