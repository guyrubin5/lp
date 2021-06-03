import { Content } from 'components/common'
import { compose, pure } from 'recompose'
import { React, styled, mq } from 'x'

import FeatureList from 'components/blocks/featureList'

const Container = styled.div`
  padding: 100px 0;
`

const FeatureListImageContent = styled(Content)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const Image = styled.div`
  background: url(${props => props.url}) center;
  background-size: cover;
  flex: 1 0 auto;
  max-width: 46%;
  margin-right: 8%;

  ${ mq.below('md') } {
    width:100%;
    max-width: 100%;
    margin-bottom: 12%;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 84%;
  }
`

const FeatureListWrapper = styled.div`
  max-width: 46%;
  flex: 1 1 auto;
  position: relative;

  ${ mq.below('md') } {
    width:100%;
    max-width: 100%;
  }
`

const enhance = compose(
  pure
)

const FeatureListImage = props => {
  return (
    <Container>
      <FeatureListImageContent>
        <Image url={ props.data.image.url }/>
        <FeatureListWrapper>
          <FeatureList
            globalData={ props.globalData }
            noContainer={ true }
            compact={ true }
            align="left"
            data={ {
              subtitle: props.data.featureList.subtitle,
              items: props.data.featureList.items,
              ctaLabel: props.data.featureList.ctaLabel,
              ctaUrl: props.data.featureList.ctaUrl
            } }
          />
        </FeatureListWrapper>
      </FeatureListImageContent>
    </Container>
  )
}

export default enhance(FeatureListImage)
