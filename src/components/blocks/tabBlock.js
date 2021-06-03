import { compose, pure, withState } from 'recompose'
import { React, Image, Link, styled, mq } from 'x'
import { Content, H2, H3, ButtonYellow } from 'components/common'

import FeatureList from 'components/blocks/featureList'

const Container = styled.div`
  background-color: #f9f9f9;
  padding-bottom: 100px;
  position: relative;
  overflow: hidden;

  ${mq.below('sm')} {
    padding-bottom: 60px;
  }
`

const TabLinkContainer = styled.div`
  display: flex;
`

const TabLink = styled.span`
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 1.2px;
  display: flex;
  flex: 1 0;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? `${props.theme.primary} !important` : '#eaeaea'};
  color: ${(props) => (props.active ? '#FFF' : props.theme.primary)};
  text-align: center;
  padding: 25px 0;
  text-transform: uppercase;
  border-left: ${(props) =>
    props.index !== 3 ? `1px solid ${props.theme.primaryRGBA(0.12)}` : 'none'};
  border-right: ${(props) =>
    props.index !== 1 ? `1px solid ${props.theme.primaryRGBA(0.12)}` : 'none'};
  border-bottom: 1px solid ${(props) => props.theme.primaryRGBA(0.12)};

  ${mq.below('md')} {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.7px;
  }

  &:hover {
    /*
    background-color: ${(props) =>
      props.theme.primary};
    color: #FFF;
    */
    background-color: #f9f9f9;
    font-weight: 600;
  }
`

const Tabs = styled.div`
  padding: 0 6%;
`

const Tab = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
`

const enhance = compose(pure, withState('activeTab', 'setTab', 0))

const TabBlock = (props) => {
  return (
    <Container>
      <TabLinkContainer>
        <TabLink
          index={0}
          active={props.activeTab === 0}
          onClick={() => props.setTab(0)}
        >
          {props.data.tabOneLabel}
        </TabLink>
        <TabLink
          index={1}
          active={props.activeTab === 1}
          onClick={() => props.setTab(1)}
        >
          {props.data.tabTwoLabel}
        </TabLink>
        <TabLink
          index={2}
          active={props.activeTab === 2}
          onClick={() => props.setTab(2)}
        >
          {props.data.tabThreeLabel}
        </TabLink>
      </TabLinkContainer>
      <Tabs>
        <Tab active={props.activeTab === 0}>
          <FeatureList
            globalData={props.globalData}
            noContainer={true}
            containerPadding={true}
            align={props.data.tabOneText ? 'left' : 'center'}
            data={{
              title: props.data.tabOneTitle,
              titleElement: props.data.tabOneTitleElement,
              subtitle: props.data.tabOneSubtitle,
              subtitleElement: props.data.tabOneSubtitleElement,
              text: props.data.tabOneText,
              items: props.data.tabOneItems,
              ctaLabel: props.data.tabOneCtaLabel,
              ctaUrl: props.data.tabOneCtaUrl,
            }}
          />
        </Tab>
        <Tab active={props.activeTab === 1}>
          <FeatureList
            globalData={props.globalData}
            noContainer={true}
            containerPadding={true}
            align={props.data.tabTwoText ? 'left' : 'center'}
            data={{
              title: props.data.tabTwoTitle,
              titleElement: props.data.tabTwoTitleElement,
              subtitle: props.data.tabTwoSubtitle,
              subtitleElement: props.data.tabTwoSubtitleElement,
              text: props.data.tabTwoText,
              items: props.data.tabTwoItems,
              ctaLabel: props.data.tabTwoCtaLabel,
              ctaUrl: props.data.tabTwoCtaUrl,
            }}
          />
        </Tab>
        <Tab active={props.activeTab === 2}>
          <FeatureList
            globalData={props.globalData}
            noContainer={true}
            containerPadding={true}
            align={props.data.tabThreeText ? 'left' : 'center'}
            data={{
              title: props.data.tabThreeTitle,
              titleElement: props.data.tabThreeTitleElement,
              subtitle: props.data.tabThreeSubtitle,
              subtitleElement: props.data.tabThreeSubtitleElement,
              text: props.data.tabThreeText,
              items: props.data.tabThreeItems,
              ctaLabel: props.data.tabThreeCtaLabel,
              ctaUrl: props.data.tabThreeCtaUrl,
            }}
          />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default enhance(TabBlock)
