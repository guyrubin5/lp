import { compose, pure, lifecycle } from 'recompose'
import { Content, H2 } from 'components/common'
import { React, styled, mq } from 'x'

import SupplierLogo from './supplierLogo'

// import Chips3 from 'static/artifacts/chips-3.svg'
// import CrossDark from 'static/artifacts/cross-dark.svg'
// import LinesBlue from 'static/artifacts/lines-blue.svg'

const enhance = compose(
  pure,
  lifecycle({
    componentDidMount() {
      const re = new RegExp(/<script[^>]*src=["']([^'"]+)["'][^>]*>/g)
      const target = this.props.data.content
      let match
      window.loadedScriptUrls = window.loadedScriptUrls || {}
      while ((match = re.exec(target)) !== null) {
        const url = match[1]
        if (typeof window.loadedScriptUrls[url] === 'undefined') {
          window.loadedScriptUrls[url] = false
          let script = document.createElement('script')
          script.src = url
          script.onload = () => (window.loadedScriptUrls[url] = true)
          document.body.appendChild(script)
        } else if (window.loadedScriptUrls[url] === true) {
          // Script already loaded, trigger correct API
          if (url.indexOf('instagram.com') !== -1) {
            window.instgrm.Embeds.process()
          } else if (url.indexOf('twitter.com') !== -1) {
            window.twttr.widgets.load()
          }
        }
      }
    },
  })
)

const Container = styled.div`
  padding: 70px 0;

  ${mq.below('sm')} {
    padding: 60px 0;
  }
`

const Title = styled(H2)`
  max-width: 650px;
  text-align: ${(props) => props.align};
  margin: 0 auto;
`

const Block = styled.div`
  max-width: 650px;
  margin: 60px auto 0;
  color: ${(props) => props.theme.primary};
  line-height: 2;
  text-align: ${(props) => props.align};
  > img {
    max-width: 621px;
  }
`

// const ArtifactA = styled.div`
//   position: absolute;
//   left: -180px;
//   margin-top: 60px;
//   z-index: 1;

//   ${ mq.below('xl') } {
//     display: none;
//   }
// `

// const ArtifactB = styled.div`
//   position: absolute;
//   right: 10%;
//   margin-top: 16%;
//   z-index: 1;

//   ${ mq.below('xl') } {
//     display: none;
//   }
// `

// const ArtifactC = styled.div`
//   position: absolute;
//   left: 140px;
//   margin-top: -13%;
//   z-index: 1;

//   ${ mq.below('xl') } {
//     display: none;
//   }
// `

const GenericContent = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'
  return (
    <Container>
      <SupplierLogo {...props} />
      {/* <ArtifactA><Chips3 width={360} /></ArtifactA>
      <ArtifactB><CrossDark width={180} /></ArtifactB> */}
      <Content>
        <Title as={titleElement} align={props.data.align || 'left'}>
          {props.data.title}
        </Title>
        {props.data.content && (
          <Block
            align={props.data.align || 'left'}
            dangerouslySetInnerHTML={{ __html: props.data.content }}
          />
        )}
      </Content>
      {/* <ArtifactC><LinesBlue width={140} /></ArtifactC> */}
    </Container>
  )
}

export default enhance(GenericContent)
