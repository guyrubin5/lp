import { Content, H2, H4 } from 'components/common'
import { Image, React, styled, mq } from 'x'
import { makeParallax, makeSpinParallax } from 'library/parallax'

const Container = styled.div`
  padding: 100px 0;
  background-color: #fcfcfc;

  ${mq.below('lg')} {
    margin-top: 0;
    padding: 100px 0;
  }
  ${mq.below('md')} {
    padding: 70px 0;
  }
  ${mq.below('sm')} {
    padding: 30px 0;
  }
`

const AccreditorHeroHeaderContent = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq.below('lg')} {
    flex-flow: wrap-reverse;
  }
`

const Titles = styled.div`
  max-width: 800px;
  padding-right: 30px;
  box-sizing: border-box;
  ${mq.below('lg')} {
    padding-right: 0;
  }
`

const Subtitle = styled(H4)`
  margin-top: 0;
  margin-bottom: 50px;
  color: ${props => props.theme.primary};
  ${mq.below('lg')} {
    margin-top: 30px;
  }
  ${mq.below('sm')} {
    margin-bottom: 30px;
  }
`

const Title = styled(H2)`
  margin: 0;
`

const Logo = styled.div`
  height: 200px;
  width: 320px;
  min-width: 200px;
  position: relative;
`

const AccreditorHeroHeader = props => {
  return (
    <Container>
      <AccreditorHeroHeaderContent>
        <Titles>
          {props.post.acf && props.post.acf.accreditorSubtitle && (
            <Subtitle line={true}>{props.post.acf.accreditorSubtitle}</Subtitle>
          )}
          <Title>
            {props.post.acf.accreditorTitle
              ? props.post.acf.accreditorTitle
              : props.post.title}
          </Title>
        </Titles>
        {props.post.acf && props.post.acf.accreditorThumbnail && (
          <Logo>
            <Image
              fixed={props.post.acf.accreditorThumbnail.file.sharp.fixed}
              style={{
                height: '100%',
                width: '100%'
              }}
              imgStyle={{
                objectFit: 'contain'
              }}
            />
          </Logo>
        )}
      </AccreditorHeroHeaderContent>
    </Container>
  )
}

export default AccreditorHeroHeader
