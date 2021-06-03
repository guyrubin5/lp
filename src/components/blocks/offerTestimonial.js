import { compose, pure } from 'recompose'
import { Button, H1, H2 } from 'components/common'
import { React, Image, styled, mq } from 'x'

import OfferFormFactory from 'components/offerForm'

import TrustPilot from 'static/svg/trust-pilot.svg'
import TrustPilotStars from 'static/svg/trust-pilot-stars.svg'

const Container = styled.div`
  background: #333;
  position: relative;
`

const Title = styled.div`
  text-align: center;
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 0;
  font-weight: bold;
`

const Quote = styled.div`
  text-align: center;
  color: white;
  font-size: 20px;
  margin-bottom: 25px;
`

const Person = styled.div`
  text-align: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
`

const Content = styled.div`
  padding: 100px 30px;
  position: relative;
  box-sizing: border-box;
  z-index: 2;
  max-width: 500px;
  margin: 0 auto;
  font-size: 25px;
  line-height: 1.2;
`

const Logo = styled.div`
  max-width: 300px;
  margin: 0 auto 25px auto;
`

const Stars = styled.div`
  max-width: 200px;
  margin: 0 auto 25px auto;

  & > svg {
    fill: #1bb57c;
  }
`

const enhance = compose(pure)

const OfferTestimonial = (props) => {
  const OfferForm = OfferFormFactory()

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'div'
  return (
    <Container>
      <Image
        fluid={props.data.background.file.sharp.fluid}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
      <Content>
        <Logo>
          <TrustPilot />
        </Logo>
        <Stars>
          <TrustPilotStars />
        </Stars>
        <Title as={titleElement}>{props.data.title}</Title>
        <Quote>"{props.data.selected.acf.quote}"</Quote>
        <Person>{props.data.selected.acf.person}</Person>
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

export default enhance(OfferTestimonial)
