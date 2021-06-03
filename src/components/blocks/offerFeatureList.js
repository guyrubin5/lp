import { compose, pure } from 'recompose'
import { Button, H1, H2 } from 'components/common'
import { React, Image, styled, mq } from 'x'

import OfferFormFactory from 'components/offerForm'

import Check from 'static/svg/check.svg'

const Container = styled.div`
  background: #333;
  position: relative;
`

const Title = styled(H1)`
  text-align: left;
  color: white;
  line-height: 1.2;
  font-weight: bold;
  margin: 0 auto 40px 0 !important;
  text-shadow: 1px 1px black;
  max-width: 100%;
`

const Subtitle = styled(H2)`
  text-align: center;
  color: white;
  line-height: 1.4;
  font-weight: normal;
  font-size: 30px;
  margin: 0;
`

const Text = styled.div`
  text-align: left;
  color: white;
`

const Content = styled.div`
  padding: 100px 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  max-width: 450px;
  margin: 0 auto;
  font-size: 25px;
  line-height: 1.2;
`

const ListItem = styled.div`
  font-size: 22px;
  line-height: 22px;
  font-weight: 600;
  color: white;
  margin: 0 0 20px 0;
  text-align: left;

  & > svg {
    fill: white;
  }

  ${mq.below('lg')} {
    font-size: ${(props) => (props.compact ? '14px' : '18px')};
  }
`

const ListItemTitle = styled.div`
  margin-left: 41px;
`

const enhance = compose(pure)

const OfferFeatureList = (props) => {
  const OfferForm = OfferFormFactory()
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h1'
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
        <Title as={titleElement}>{props.data.title}</Title>
        {props.data.items.map((item, index) => {
          return (
            <ListItem key={'item-' + index}>
              <Check
                style={{ float: 'left', position: 'relative', top: '5px' }}
              />
              <ListItemTitle>{item.text}</ListItemTitle>
            </ListItem>
          )
        })}
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

export default enhance(OfferFeatureList)
