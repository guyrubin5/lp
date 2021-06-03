import { React, Component, Helmet } from 'x'

export default props => {
  const ctx = props.pageContext
  const post = props.data.post
  const site = props.data.site
  const yoast = post.yoast

  const url = props.location.href
  const canonical = yoast?.canonical || url

  const siteTitle = site.siteMetadata.title
  const pageTitle = yoast.title ? yoast.title : post.title
  const metaDescription = yoast.metaDescription

  const openGraphTitle = yoast?.yoast_wpseo_og_title || pageTitle
  const openGraphDescription = yoast?.yoast_wpseo_og_description || metaDescription

  const openGraphImage =
    yoast?.yoast_wpseo_og_image?.url?.file.sharp.fixed.src
    && `https://www.learningpeople.com${ yoast?.yoast_wpseo_og_image?.url?.file.sharp.fixed.src }`
    ||
    props.data.globalData.defaultFacebookImage.url

  const twitterTitle = yoast?.yoast_wpseo_twitter_title || pageTitle
  const twitterDescription = yoast?.yoast_wpseo_twitter_description || metaDescription

  const twitterImage =
    yoast?.yoast_wpseo_twitter_image?.url?.file.sharp.fixed.src
    && `https://www.learningpeople.com${ yoast?.yoast_wpseo_twitter_image?.url?.file.sharp.fixed.src }`
    ||
    props.data.globalData.defaultFacebookImage.url

  const hreflang = post.language.hreflang

  // console.log('yoast:', yoast)
  // console.log('url:', url)
  // console.log('canonical:', canonical)
  // console.log('siteTitle:', siteTitle)
  // console.log('pageTitle:', pageTitle)
  // console.log('metaDescription:', metaDescription)
  // console.log('openGraphTitle:', openGraphTitle)
  // console.log('openGraphDescription:', openGraphDescription)
  // console.log('openGraphImage:', openGraphImage)
  // console.log('twitterTitle:', twitterTitle)
  // console.log('twitterDescription:', twitterDescription)
  // console.log('twitterImage:', twitterImage)
  // console.log('hreflang:', hreflang)

  const locales = ctx.locales

  const schema = {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    'name': 'The Learning People',
    'url': 'http://www.learningpeople.com',
    'sameAs': [
      'https://www.facebook.com/thelearningpeople',
      'https://twitter.com/tlp_tweets',
      'http://instagram.com/learningpeople',
      'https://plus.google.com/+learningpeoplecouk',
      'https://www.linkedin.com/company/the-learning-people'
    ]
  }

  const structured = post?.acf?.structuredContentTitle
    ? {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': post.acf.structuredContentTitle,
      // 'description': 'Introductory CS course laying out the basics.',
      // 'provider': {
      //   'sameAs': 'http://www.ut-eureka.edu'
      // }
    }
    : null

  if (structured && post?.acf?.structuredContentDescription) {
    Object.assign(structured, {
      description: post.acf.structuredContentDescription
    })
  }

  if (structured && post?.acf?.structuredContentProviderName) {
    Object.assign(structured, {
      provider: {
        '@type': 'Organization',
        'name': post.acf.structuredContentProviderName,
      }
    })

    if (structured && post?.acf?.structuredContentProviderUrl) {
      Object.assign(structured.provider, {
        'sameAs': post.acf.structuredContentProviderUrl,
      })
    }
  }

  /*
  title
  redirect
  canonical
  metaDescription: metadesc
  metaRobotsNoindex: meta_robots_noindex
  metaRobotsNofollow: meta_robots_nofollow
  metaRobotsAdvanced: meta_robots_adv

  openGraphTitle: opengraph_title
  openGraphDescription: opengraph_description
  openGraphImage: opengraph_image
  twitterTitle: twitter_title
  twitterDescription: twitter_description
  twitterImage: twitter_image
  */

  return (
    <Helmet>
      <html lang={ hreflang } />
      <meta charSet="utf-8" />

      <title>{ `${ pageTitle }` }</title>
      <meta name="description" content={ metaDescription } />

      <link rel="canonical" href={ canonical } />

      {
        yoast.robots.index === 'noindex' && (
          <meta name="robots" content="noindex" />
        )
      }


      {/* <!-- Google Tag Manager Global --> */}
      <script>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-5FNVR9N');`}
      </script>
      {/* <!-- End Google Tag Manager Global --> */}

      {/*      <script>*/}
      {/*        {*/}
      {/*          `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':*/}
      {/*new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],*/}
      {/*j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=*/}
      {/*'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);*/}
      {/*})(window,document,'script','dataLayer','${ props.data.globalData.googleTagManagerId }');`*/}
      {/*        }*/}
      {/*      </script>*/}
      <script>
        {
            /*
            `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${ props.data.globalData.googleTagManagerId }');`
            */
        }
      </script>
      {
        locales.map((locale, index) => (
          <link
            key={ 'locale-' + index }
            rel="alternate"
            href={ `${ locale.path }` }
            hreflang={ locale.hreflang }
          />
        ))
      }

      <link
        rel="alternate"
        href={ canonical }
        hreflang={ hreflang }
      />

      <script type="application/ld+json">{ JSON.stringify(schema) }</script>

      {
        structured && <script type="application/ld+json">
          { JSON.stringify(structured) }
        </script>
      }


      { ''
          /*
          <meta property="og:url" content={ url } />
          <meta property="og:title" content={ pageTitle } />
          <meta property="og:description" content={ metaDescription } />
          <meta property="og:image" content={ props.data.globalData.defaultFacebookImage.url } />
          const openGraphTitle = yoast?.yoast_wpseo_og_title
          const openGraphDescription = yoast?.yoast_wpseo_og_description
          // const openGraphImage = yoast?.yoast_wpseo_og_image

          const twitterTitle = yoast?.yoast_wpseo_twitter_title
          const twitterDescription = yoast?.yoast_wpseo_twitter_description
          // const twitterImage = yoast?.yoast_wpseo_twitter_image
          */
      }

      <meta property="og:url" content={ canonical } />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ openGraphTitle } />
      <meta property="og:description" content={ openGraphDescription } />
      <meta property="og:image" content={ openGraphImage } />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="learningpeople.com" />
      <meta property="twitter:url" content={ canonical } />

      <meta name="twitter:title" content={ twitterTitle } />
      <meta name="twitter:description" content={ twitterDescription } />
      <meta name="twitter:image" content={ twitterImage } />

      <meta name="facebook-domain-verification" content="9ram513gbhxi38433p8zddaw88bwbg" />

      {/* Start Webtrends */ }
      <script type="text/javascript" src="//c.webtrends-optimize.com/acs/accounts/79eb1642-e14e-47bd-b222-139aa17d1807/js/wt.js">
      </script>
      {/* End Webtrends */ }

      {/* Start VWO Async SmartCode * /}
        <script type='text/javascript'>
        {`
          window._vwo_code = window._vwo_code || (function(){
          var account_id=554904,
          settings_tolerance=2000,
          library_tolerance=2500,
          use_existing_jquery=false,
          is_spa=1,
          hide_element='body',

          f=false,d=document,code={use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){
        window.settings_timer=setTimeout(function () {_vwo_code.finish() },settings_tolerance);var a=d.createElement('style'),b=hide_element?hide_element+'{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}':'',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+(+is_spa)+'&r='+Math.random());return settings_timer; }};window._vwo_settings_timer = code.init(); return code; }());
        `}
        </script>
      {/* End VWO Async SmartCode */}
    </Helmet>
  )
}
