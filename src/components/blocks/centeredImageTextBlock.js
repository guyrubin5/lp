import { Content, H2, H3 } from 'components/common'
import { compose, pure } from 'recompose'
import { React, Image, styled, mq } from 'x'

const Container = styled.div`
  padding: 100px 0;
`

const Wrapper = styled.div`
  background: #e9eaee;
  height: ${(props) => props.height}px;
  ${mq.below('lg')} {
    height: auto;
    padding: 100px 0;
  }
`

const CenteredContent = styled(Content)`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${mq.below('lg')} {
    flex-direction: column-reverse;
  }
`
const CenteredImage = styled.div`
  width: 33%;
  height: ${(props) => props.height}px;
  margin-top: ${(props) => props.marginTop}px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    display: block;
  }

  ${mq.below('lg')} {
    display: none;
  }
`
const LeftColumn = styled.div`
  width: 33%;
  padding: 4% 8% 4% 0%;
  box-sizing: border-box;
  margin-top: -105px;

  ${mq.below('lg')} {
    width: 100%;
    margin-top: 0;
    padding: 0;
  }
`

const RightColumn = styled.div`
  width: 33%;
  padding: 0% 0% 4% 8%;
  box-sizing: border-box;

  ${mq.below('lg')} {
    width: 100%;
    margin-top: 0;
    padding: 0;
  }
`

const Subtitle = styled.p`
  color: ${(props) => props.theme.primary};
  font-size: 16px;
  line-height: 26px;
  margin-top: 0px;
`

const SectionTitle = styled.div`
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  padding-bottom: 20px;
  position: relative;

  &:after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: ${(props) => props.theme.secondary};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

export default compose(pure)((props) => {
  const { width, height } = props.data.image.file.sharp.fixed

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'

  const imageHeight = height || 650
  const wrapperHeight = imageHeight - 80 * 2

  // <CenteredImage
  //   url={ props.data.image.url }
  //   height={ imageHeight }
  //   marginTop={ -80 }
  // />

  return (
    <Container>
      <Wrapper height={wrapperHeight}>
        <CenteredContent>
          <LeftColumn>
            <H2 as={titleElement}>{props.data.title}</H2>
            <Subtitle>{props.data.subtitle}</Subtitle>
          </LeftColumn>
          <CenteredImage height={imageHeight} marginTop={-80}>
            <Image fixed={props.data.image.file.sharp.fixed} />
          </CenteredImage>
          <RightColumn>
            <SectionTitle>{props.data.sectionTitle}</SectionTitle>
            <H3>{props.data.quote}</H3>
          </RightColumn>
        </CenteredContent>
      </Wrapper>
    </Container>
  )
})
