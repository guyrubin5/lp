import { compose, pure } from 'recompose'
import { Button, H1, H2 } from 'components/common'
import { React, Image, styled, mq } from 'x'
import { iconMap } from './iconGrid'

import OfferFormFactory from 'components/offerForm'

import Check from 'static/svg/check.svg'

const Container = styled.div`
  background: #fff;
  position: relative;
`

const Title = styled.div`
  text-align: center;
  color: #333;
  line-height: 1.2;
  margin: 0 auto 20px 0 !important;
  font-size: 33px;
`

const Content = styled.div`
  padding: 30px 30px 60px 30px;
  position: relative;
  z-index: 2;
  box-sizing: border-box;
  max-width: 950px;
  margin: 0 auto;
  font-size: 25px;
  line-height: 1.2;
`

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  ${mq.below('md')} {
    flex-direction: column;
  }
`

const Icon = styled.div`
  box-sizing: border-box;
  width: 33%;
  padding: 20px;

  ${mq.below('md')} {
    width: 100%;
  }
`

const IconWrapper = styled.div`
  text-align: center;
  padding-bottom: 15px;

  & > svg {
    max-width: 100px;
    max-height: 80px;
    height: 80px;
  }
`

const IconTitle = styled.div`
  text-align: center;
  color: #333;
  line-height: 1.2;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 20px;
`

const IconSubtitle = styled.div`
  text-align: center;
  color: #333;
  line-height: 1.2;
  font-size: 17px;
`

const enhance = compose(pure)

const OfferIconRow = (props) => {
  const OfferForm = OfferFormFactory()
  return (
    <Container>
      <Content>
        <Title dangerouslySetInnerHTML={{ __html: props.data.text }} />
        <IconContainer>
          {props.data?.icons?.map((icon, index) => {
            const SvgIcon = iconMap[icon.symbol]
            return (
              <Icon key={'icon-' + index}>
                <IconWrapper>
                  <SvgIcon height={'100%'} />
                </IconWrapper>
                <IconTitle>{icon.title}</IconTitle>
                <IconSubtitle>{icon.subtitle}</IconSubtitle>
              </Icon>
            )
          })}
        </IconContainer>
        <OfferForm
          globalData={props.globalData}
          zohoFormId={props.post.acf.zohoFormId}
          zohoSalesIq={props.post.acf.zohoSalesIq}
          post={props.post}
        />
      </Content>
    </Container>
  )
}

export default enhance(OfferIconRow)
