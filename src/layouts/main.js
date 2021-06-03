import { Normalize } from 'styled-normalize'
import { React, styled } from 'x'
import { ParallaxProvider } from 'react-scroll-parallax'
import { default as Cookies } from 'js-cookie'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { compose, lifecycle, withState } from 'recompose'
import { clearAllBodyScrollLocks } from 'body-scroll-lock'

import Header from '../components/header'
import Footer from '../components/footer'
import Search from '../components/search'
import GetInTouch from '../components/getInTouch'
import CookieConsent from '../components/cookieConsent'

import 'typeface-source-sans-pro'

const store = {
  isMenuOpen: false,
  isSearchShown: false,
  isContactShown: false,

  listeners: [],
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Source Sans Pro", sans-serif;
    padding: 0;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: ${(props) => props.theme.secondary};
    text-decoration: none;
  }

  .active-page {
    font-weight: 600;
  }

  img.alignright {float:right; margin:0 0 1em 1em}
  img.alignleft {float:left; margin:0 1em 1em 0}
  img.aligncenter {display: block; margin-left: auto; margin-right: auto}
  a img.alignright {float:right; margin:0 0 1em 1em}
  a img.alignleft {float:left; margin:0 1em 1em 0}
  a img.aligncenter {display: block; margin-left: auto; margin-right: auto}
`

const defaultTheme = {
  primary: '#2A2D58',
  primaryRGBA: (alpha) => `rgba(42, 45, 88, ${alpha})`,
  secondary: '#F1B860',
  secondaryRGBA: (alpha) => `rgba(241, 184, 96, ${alpha})`,
}

const usedSearchParams = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'gclid',
  'campaign_id',
]

const storeUrlParams = () => {
  const queryString = decodeURIComponent(window.location.search.substring(1))

  if (!queryString.length) {
    return
  }

  const variables = queryString.split('&').forEach((variable) => {
    const parts = variable.split('=')

    if (usedSearchParams.includes(parts[0])) {
      Cookies.set(parts[0], parts[1])
    }
  })
}

const enhance = compose(
  withState('isCookieOverlayShown', 'changeCookieOverlayShown', false),
  lifecycle({
    componentDidMount(...args) {
      storeUrlParams()

      if (Cookies.get('consent') !== 'yes') {
        this.props.changeCookieOverlayShown(true)
      }
    },

    componentWillUnmount(...args) {
      store.isSearchShown = false
      clearAllBodyScrollLocks()
    },
  })
)

const Main = styled.main`
  @media (max-width: 960px) {
    & {
      padding-top: ${(props) => (props.isOffersPage ? '0px' : '60px')};
    }
  }
`

const Layout = ({ children, ...props }) => {
  const theme = {
    ...defaultTheme,
    mode:
      props?.data?.post?.acf?.blocks?.[0]?.__typename ===
      'WordPressAcf_hero_header'
        ? 'transparent'
        : 'light',
  }

  const isOffersPage = props.data.post.layout === 'offers'

  return (
    <ThemeProvider theme={theme}>
      <ParallaxProvider>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${props.data.globalData.googleTagManagerId}`}
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
        <Normalize />
        <GlobalStyle />
        <Header
          store={store}
          globalData={props.data.globalData}
          menus={props.menus}
          isOffersPage={isOffersPage}
          language={props.pageContext.language}
        />
        <Search store={store} globalData={props.data.globalData} />
        <GetInTouch
          store={store}
          globalData={props.data.globalData}
          isCookieOverlayShown={props.isCookieOverlayShown}
          isOffersPage={isOffersPage}
          language={props.pageContext.language}
          post={props.data.post}
        />
        <Main isOffersPage={isOffersPage}>{children}</Main>
        <Footer
          post={props.data.post}
          footerMenu={props.data.footerMenu.menus[0].menu}
          globalData={props.data.globalData}
          isOffersPage={isOffersPage}
        />
        {props.isCookieOverlayShown && (
          <CookieConsent
            globalData={props.data.globalData}
            isCookieOverlayShown={props.isCookieOverlayShown}
            changeCookieOverlayShown={props.changeCookieOverlayShown}
          />
        )}
      </ParallaxProvider>
    </ThemeProvider>
  )
}

export default enhance(Layout)
