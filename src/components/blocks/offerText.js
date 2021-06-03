import { compose, pure } from 'recompose'
import { Button, H1, H2 } from 'components/common'
import { React, Image, styled, mq } from 'x'

import OfferFormFactory from 'components/offerForm'

const Container = styled.div`
  background: #333;
  position: relative;
`

const Title = styled(H1)`
  text-align: center;
  color: white;
  line-height: 1.2;
  font-weight: bold;
  margin: 0 auto;
  max-width: 600px;
  width: auto;
  text-shadow: 1px 1px black;
`

const Subtitle = styled(H2)`
  text-align: center;
  color: white;
  line-height: 1.4;
  font-weight: normal;
  font-size: 40px;
  margin: 12px 0 0 0;
  text-shadow: 1px 1px black;
`

const Text = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  margin: 0 auto;
  text-shadow: 1px 1px black;
`

const Content = styled.div`
  padding: 100px 30px;
  position: relative;
  z-index: 2;
  max-width: 960px;
  box-sizing: border-box;
  margin: 0 auto;
  font-size: 25px;
  line-height: 1.2;
`

const enhance = compose(pure)

const OfferText = (props) => {
  const OfferForm = OfferFormFactory()

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h1'

  const subtitleElement =
    props.data.subtitleElement && props.data.subtitleElement !== 'default'
      ? props.data.subtitleElement
      : 'h2'
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
        {props.data?.logo && (
          <Image
            fixed={props.data.logo.file.sharp.fixed}
            style={{
              width: '185px',
              margin: '0 auto',
              display: 'block',
            }}
          />
        )}
        <Title as={titleElement}>{props.data.title}</Title>
        <Subtitle as={subtitleElement}>{props.data.subtitle}</Subtitle>
        <Text dangerouslySetInnerHTML={{ __html: props.data.text }} />
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

export default enhance(OfferText)
