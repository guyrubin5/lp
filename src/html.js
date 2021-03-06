import React from "react"
import PropTypes from "prop-types"

// content="width=device-width, initial-scale=1, shrink-to-fit=no"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          
          {/* <!-- Google Tag Manager Global (noscript) --> */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5FNVR9N"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden'}}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager Global (noscript) --> */}

          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
