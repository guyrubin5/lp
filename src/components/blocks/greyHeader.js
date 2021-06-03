import { React, styled, mq } from 'x'
import { Content, H1, ButtonYellow, ButtonYellowA } from 'components/common'
import { iconMap } from './iconGrid'

import Arrow from 'static/svg/arrow.svg'

const Block = styled.div`
  padding: 130px 0;
  background-color: #f9f9f9;
  ${mq.below('md')} {
    padding: 60px 0;
  }
`

const StyledH1 = styled(H1)`
  width: auto;
`

const Summary = styled.div`
  margin: 0;
  font-size: 34px;
  ${mq.below('lg')} {
    font-size: 27px;
  }
  ${mq.below('md')} {
    font-size: 22px;
  }
  ${mq.below('sm')} {
    font-size: 20px;
  }
  color: #2b2e55;
  font-weight: 600;
  .highlight {
    color: #e4b76e;
  }
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`

const TwoColumn = styled.div`
  display: flex;
  ${mq.below('md')} {
    flex-direction: column;
    align-items: center;
  }
`

const LeftColumn = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;

  ${mq.below('md')} {
    order: 1;
  }
`

const RightColumn = styled.div`
  margin-left: 13%;
  width: 31%;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-direction: column;
  ${mq.below('md')} {
    order: 0;
    margin-left: 0;
    width: 80%;
    max-width: 350px;
    margin-bottom: 30px;
  }
`

const ButtonContainer = styled.div`
  margin-top: 60px;
  display: ${(props) => (props.mobileOnly ? 'none' : 'flex')};
  ${mq.below('md')} {
    display: flex;
    justify-content: center;
  }
`

const GreyHeader = (props) => {
  const SvgIcon = iconMap?.[props.data.icon] ?? iconMap['time']
  const buttonAttrs = {}
  if (props.data.ctaUrl.substr(0, 1) === '#') {
    buttonAttrs.onClick = (event) => {
      event.preventDefault()
      const el = document.getElementById(props.data.ctaUrl.substr(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  } else {
    buttonAttrs.to = props.data.ctaUrl
  }

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h1'
  return (
    <Block>
      <Content>
        <TwoColumn>
          <LeftColumn>
            <StyledH1 as={titleElement}>{props.data.title}</StyledH1>
            <Summary
              as="h2"
              dangerouslySetInnerHTML={{ __html: props.data.subtitle }}
            />
          </LeftColumn>
          <RightColumn>
            <SvgIcon width={'100%'} />
          </RightColumn>
        </TwoColumn>

        <ButtonContainer mobileOnly={props.data.ctaMobileOnly}>
          <ButtonYellow as="a" {...buttonAttrs}>
            {props.data.ctaLabel}
            <Arrow className="circle" />
          </ButtonYellow>
        </ButtonContainer>
      </Content>
    </Block>
  )
}

export default GreyHeader
