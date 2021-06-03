import { iconMap } from './iconGrid'
import { compose } from 'recompose'
import { Content, H2 } from 'components/common'
import { default as Fade } from 'react-reveal/Fade'
import { makeSpinParallax } from 'library/parallax'
import { React, styled, mq } from 'x'

import CrossBlue from 'static/artifacts/cross-blue.svg'
import CrossYellow from 'static/artifacts/cross-yellow.svg'
import CircleYellow from 'static/artifacts/circle-yellow.svg'
import CircleBlue from 'static/artifacts/circle-blue.svg'

const { below } = mq.createBreakpoints({
  iconRowXL: '1310px',
})

const Container = styled.div`
  background-color: #fff;
  padding: 100px 0;
  position: relative;

  ${mq.below('lg')} {
    padding: 70px 0;
  }
  ${mq.below('sm')} {
    padding: 50px 0;
  }
`

const Title = styled(H2)`
  text-align: center;
  margin: 0 auto 30px;
`

const Subtitle = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  max-width: 620px;
  margin: 0 auto 65px auto;

  ${mq.below('lg')} {
    font-size: 20px;
  }

  ${mq.below('sm')} {
    margin-bottom: 40px;
  }
`

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const IconWrapper = styled.div`
  margin: 20px 75px;
  width: 220px;
  text-align: center;

  ${below('iconRowXL')} {
    margin: 20px 40px;
  }

  ${mq.below('lg')} {
    width: 200px;
    margin: 20px 20px;
  }

  ${mq.below('sm')} {
    width: 100%;
    margin: 20px 0;
  }
`

const Icon = styled.div`
  border: 1px solid ${(props) => props.theme.primaryRGBA(0.2)};
  height: 160px;
  width: 160px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 95px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.below('lg')} {
    width: 120px;
    height: 120px;
  }

  ${mq.below('sm')} {
    margin-bottom: 20px;
  }
`

const IconTitle = styled.p`
  font-size: 18px;
  line-height: 30px;
  color: ${(props) => props.theme.primary};
`

const IrArtifact1 = makeSpinParallax(styled.div`
  ${'' /* position: absolute;
  left: 50px;
  margin-top: 190px; */}

  ${mq.below('xl')} {
    display: none;
  }
`)

const IrArtifact2 = styled.div`
  position: absolute;
  left: 160px;
  top: 140px;

  ${mq.below('xl')} {
    display: none;
  }
`

const RotatingArtifactHolder = styled.div`
  ${mq.below('xl')} {
    display: none;
  }
`

const enhance = compose()

const RotatingArtifact = makeSpinParallax(CrossYellow)

const IconRow = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'
  const subtitleElement =
    props.data.subtitleElement && props.data.subtitleElement !== 'default'
      ? props.data.subtitleElement
      : 'p'
  return (
    <Container>
      {/* <IrArtifact1> */}
      <div
        style={{
          position: 'relative',
        }}
      >
        <RotatingArtifactHolder>
          <RotatingArtifact
            width={160}
            style={{
              transformOrigin: '80px 80px',
            }}
          />
        </RotatingArtifactHolder>
      </div>
      {/* </IrArtifact1> */}
      <IrArtifact2>
        <CircleBlue width={40} />
      </IrArtifact2>
      <Content>
        {props.data.title && (
          <Title as={titleElement}>{props.data.title}</Title>
        )}
        {props.data.subtitle && (
          <Subtitle as={subtitleElement}>{props.data.subtitle}</Subtitle>
        )}
        <IconContainer>
          {props.data.icons?.map((icon, index) => {
            const SvgIcon = iconMap?.[icon.symbol] ?? iconMap['time']

            return (
              <Fade key={'icon-wrapper-' + index} delay={(index % 3) * 200}>
                <IconWrapper>
                  <Icon>
                    <SvgIcon width={'35%'} />
                  </Icon>
                  <IconTitle>{icon.title}</IconTitle>
                </IconWrapper>
              </Fade>
            )
          })}
        </IconContainer>
      </Content>
    </Container>
  )
}

export default enhance(IconRow)
