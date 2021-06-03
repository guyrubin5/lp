import { compose } from 'recompose'
import { React, styled } from 'x'
import FeatureList from 'components/blocks/featureList'

const enhance = compose(

)

const WhyJoinUs = props => {
  const {
    wjuTitle,
    wjuCtaUrl,
    wjuCtaLabel,
    wjuItems,
  } = props.globalData

  const items = wjuItems.map(({ item }) => ({
    icon: true,
    title: item,
  }))

  return (
    <FeatureList
      globalData={ props.globalData }
      data={{
        items,
        title: wjuTitle,
        ctaLabel: wjuCtaLabel,
        ctaUrl: wjuCtaUrl,
      }}
    />
  )
}

export default enhance(WhyJoinUs)
