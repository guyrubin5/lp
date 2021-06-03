import { React, styled, mq } from 'x'
import { compose, lifecycle, withState, withHandlers } from 'recompose'

const Container = styled.div`
  padding: 60px 0;
`

const Widget = styled.div`
  margin-left: 100px;
  background-color: #F9F9F9;
  position: relative;
  overflow: auto;

  @media(max-width: 620px) {
    margin-left: 0;
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background: #E9EAEE;
    content: '';
    z-index: 1;

    @media(max-width: 520px) {
      display: none;
    }

  }

  iframe {
    margin: 60px 10px 60px 0;
    position: relative;
    z-index: 2;
  }

  ${ mq.below('sm') } {
    margin-left: 0px;
  }
`

const loadTrustpilot = () => {
  const script = document.createElement('script')

  script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js'
  script.type = 'text/javascript'
  script.async = 'true'

  document.head.appendChild(script)
}

const enhance = compose(
  withHandlers(() => {
    let script
    return {
      setRef: props => ref => {
        if (!ref) {
          return
        } else if (typeof window.Trustpilot === 'undefined') {
          loadTrustpilot()
        } else {
          window.Trustpilot.loadFromElement(ref)
        }
      }
    }
  })
)

const Trustpilot = props => {
  return (
    <Container>
      <Widget
        ref={ props.setRef }
        data-locale={ props.globalData.language.hreflang }
        className="trustpilot-widget"
        data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id="5191032b00006400052baeea"
        data-style-height="140px"
        data-style-width="100%"
        data-theme="light"
        data-stars="4,5"
      />
    </Container>
  )
}


export default enhance(Trustpilot)
