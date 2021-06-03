import { compose, lifecycle, withState } from 'recompose'
import { Content, H1, H2 } from 'components/common'
import { React, Image, Link, styled, mq } from 'x'

const accessToken =
  'pk.eyJ1IjoiaW5uby10ZWNoIiwiYSI6ImNqb2EwZXc3ZzE3Nmwza29kNmx0ZGs4aW4ifQ.xxRxQYfBSKDLKDQt4Pw9kw'

/*
const buildMap =
  typeof window === 'undefined'
    ? () => () => <span />
    : require('react-mapbox-gl').Map

const Map = buildMap({
  accessToken
})
*/

const Container = styled.div`
  padding: 100px 0;
`

const Title = styled(H1)`
  text-align: center;
  width: auto;
  margin: 0;
`

const Subtitle = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.primary};
  text-align: center;
  padding: 0px 60px 20px 60px;
  margin: 16px 0;
  font-weight: normal;
`

const TwoColumns = styled.div`
  display: flex;
  flex-direction: row;

  ${mq.below('md')} {
    flex-wrap: wrap;
  }
`

const Placeholder = styled.div`
  width: 100%;
  height: 500px;
`

const PhoneLink = styled.a`
  color: ${(props) => props.theme.primary};
  font-size: 24px;
  font-weight: 600;
  display: block;
  line-height: 32px;
`

const InformationBlock = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.primary};
`

const InformationTitle = styled.div`
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  border-top: 1px solid #ccc;
  padding-top: 10px;
`

const Information = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 40px;
  line-height: 20px;

  ${PhoneLink}:first-child {
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }

  ${PhoneLink}:last-of-type {
    padding-bottom: 10px;
  }

  ${InformationBlock}:last-child {
    border-bottom: 1px solid #ccc;
  }

  ${mq.below('md')} {
    width: 100%;
    padding: 40px 0px;
  }
`

const enhance = compose(
  withState('mapContainer', 'setMapContainer'),
  lifecycle({
    async componentWillUnmount() {
      this?.map?.remove()
    },

    async componentDidMount() {
      await import('mapbox-gl/dist/mapbox-gl.css')

      const { default: MapboxGL } = await import('mapbox-gl')

      const {
        data: { lat, long, zoom, minZoom, maxZoom, markers },
      } = this.props

      Object.assign(MapboxGL, {
        accessToken,
      })

      this.map = new MapboxGL.Map({
        accessToken,
        container: this.props.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [long, lat],
        zoom: parseInt(zoom),
        minZoom: parseInt(minZoom),
        maxZoom: parseInt(maxZoom),
      })

      markers?.map((marker) => {
        const popup = new MapboxGL.Popup({ offset: 25 }).setHTML(
          `<h3>${marker.title}</h3><p>${marker.description}</p>`
        )

        new MapboxGL.Marker()
          .setLngLat([marker.long, marker.lat])
          .setPopup(popup)
          .addTo(this.map)
      })
    },
  })
)

const Contact = (props) => {
  const {
    primaryPhoneHref,
    primaryPhoneNumber,
    secondaryPhoneHref,
    secondaryPhoneNumber,
  } = props.globalData

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h1'
  const subtitleElement =
    props.data.subtitleElement && props.data.subtitleElement !== 'default'
      ? props.data.subtitleElement
      : 'p'
  return (
    <Container>
      <Title as={titleElement}>{props.data.title}</Title>
      <Subtitle as={subtitleElement}>{props.data.subtitle}</Subtitle>
      <Content>
        <TwoColumns>
          <Placeholder ref={props.setMapContainer} />
          <Information>
            <PhoneLink href={primaryPhoneHref}>{primaryPhoneNumber}</PhoneLink>
            <PhoneLink href={secondaryPhoneHref}>
              {secondaryPhoneNumber}
            </PhoneLink>
            {props.data.informationBlocks.map((info, index) => {
              return (
                <InformationBlock key={'info-' + index}>
                  <InformationTitle>{info.title}</InformationTitle>
                  <div dangerouslySetInnerHTML={{ __html: info.content }} />
                </InformationBlock>
              )
            })}
          </Information>
        </TwoColumns>
      </Content>
    </Container>
  )
}

export default enhance(Contact)
