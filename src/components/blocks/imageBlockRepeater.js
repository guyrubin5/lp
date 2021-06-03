import { compose, pure } from 'recompose'
import { Content, H2, ButtonYellow } from 'components/common'
import { React, Link, Image, styled, mq } from 'x'

import Arrow from 'static/svg/arrow.svg'

const Column = styled.div`
  max-width: 50%;
  flex: 1;
  position: relative;

  ${mq.below('lg')} {
    width: 100%;
    max-width: 100%;
    display: ${(props) => (props.isImage ? 'none' : 'block')};
  }
`

const Left = styled(Column)`
  padding: 0 40px 0 0;

  ${mq.below('lg')} {
    padding: 0;
  }
`

const Right = styled(Column)`
  padding: 0 0 0 40px;

  ${mq.below('lg')} {
    padding: 0;
  }
`

const Container = styled.div`
  padding: 40px 0 100px 0; // 100 - margin Block
  background-color: #f9f9f9;

  ${mq.below('sm')} {
    padding: 40px 0 80px 0;
  }
`

const Block = styled.div`
  display: flex;
  margin: 100px 0;
  align-items: center;

  ${mq.below('lg')} {
    flex-direction: column;
    margin: 70px 0;
  }

  ${mq.below('sm')} {
    margin: 30px 0;
  }
`

const ContentBlock = styled(Content)`
  ${mq.below('lg')} {
    & > div:nth-child(odd) {
      display: flex;
      flex-direction: column-reverse;
    }
  }
`

const TextContent = styled.div`
  padding: 0 40px;
`

const CtaTitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  text-align: center;
`

const Number = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.primaryRGBA(0.2)};
  font-size: 36px;
  font-weight: 700;
  color: ${(props) => props.theme.primary};

  ${mq.below('xl')} {
    font-size: 24px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  ${mq.below('sm')} {
    font-size: 20px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`

const Title = styled(H2)`
  ${mq.below('xl')} {
    font-size: 40px;
    line-height: 40px;
  }

  ${mq.below('lg')} {
    font-size: 36px;
    line-height: 36px;
  }

  ${mq.below('md')} {
    font-size: 32px;
    line-height: 32px;
  }
`

const Subtitle = styled.span`
  font-size: 16px;
  line-height: 28px;
  margin: 0;
  font-weight: normal;

  ${mq.below('lg')} {
    display: block;
    padding-bottom: 30px;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  padding-bottom: 78%;
  overflow: hidden;
  position: relative;
`

const Centered = styled.div`
  margin-top: 100px;
  text-align: center;

  ${mq.below('sm')} {
    margin-top: 30px;
  }
`

const enhance = compose(pure)

const ImageBlockRepeater = (props) => {
  return (
    <Container>
      <ContentBlock>
        {props.data.images?.length &&
          props.data.images.map((item, index) => {
            const titleElement =
              item.titleElement && item.titleElement !== 'default'
                ? item.titleElement
                : 'h3'
            const subtitleElement =
              item.subtitleElement && item.subtitleElement !== 'default'
                ? item.subtitleElement
                : 'span'
            const textContent = (
              <TextContent>
                <Number>{index + 1}</Number>
                <Title as={titleElement}>{item.title}</Title>
                <Subtitle as={subtitleElement}>{item.subtitle}</Subtitle>
              </TextContent>
            )

            const imageContent = (
              <ImageWrapper>
                {item.image && (
                  <Image
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                    fixed={item.image.file.sharp.fixed}
                  />
                )}
              </ImageWrapper>
            )

            return (
              <Block key={'image-block-' + index}>
                <Left isImage={index % 2 === 0}>
                  {index % 2 !== 0 ? textContent : imageContent}
                </Left>
                <Right isImage={index % 2 !== 0}>
                  {index % 2 === 0 ? textContent : imageContent}
                </Right>
              </Block>
            )
          })}
        <div>
          <CtaTitle>{props.data.ctaTitle}</CtaTitle>
          <Centered>
            <ButtonYellow to={props.data.ctaUrl}>
              {props.data.ctaLabel}
              <Arrow className="circle" />
            </ButtonYellow>
          </Centered>
        </div>
      </ContentBlock>
    </Container>
  )
}

export default enhance(ImageBlockRepeater)
