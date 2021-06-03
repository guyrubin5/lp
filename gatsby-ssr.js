import React from 'react';
import { stripIndent } from 'common-tags';

const COMPONENT_KEY = 'plugin-google-marketing-platform-optimize';

const facebookIds = {
  uk: '407399579903644',
  au: '149260662365766',
}

class Optimize {

  constructor({ id = null, gtmId = null, analyticsId = null, facebookId = null, timeout = 500 } = {}) {
    this.id = id;
    this.gtmId = gtmId;
    this.analyticsId = analyticsId;
    this.facebookId = facebookId;
    this.timeout = timeout;
  }

  asyncHide() {

    if ( !this.id ) return null;
    if ( !this.gtmId ) return null;
    if ( !this.analyticsId ) return null;

    return (
      <React.Fragment key={`${COMPONENT_KEY}-asynchide`}>
        <style
          key={`${COMPONENT_KEY}-asyncHide-style`}
          dangerouslySetInnerHTML={{
            __html: stripIndent`
            .async-hide { opacity: 0 !important }
          `,
          }} />
        <script
          key={`${COMPONENT_KEY}-asyncHide-script`}
          dangerouslySetInnerHTML={{
            __html: stripIndent`
              window.dataLayer = window.dataLayer || [{
                gaPropertyId: '${this.analyticsId}'
              }]

              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());

              gtag('config', '${this.analyticsId}', {"optimize_id":"${this.id}"});

              (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
              h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
              (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
              })(window,document.documentElement,'async-hide','dataLayer',${this.timeout},{'${this.gtmId}':true});

              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${this.gtmId}');
            `,
          }}
        />
      </React.Fragment>
    );
  }
}

export const onRenderBody = ({
  pathname,
  setHeadComponents,
  setPreBodyComponents,
}) => {
  let gtmId = 'GTM-MFQN825'
  let analyticsId = 'UA-16152333-1'
  let facebookId = facebookIds.uk

  if (pathname && pathname.match(/^\/(au|AU)/)) {
    gtmId = 'GTM-52Z55LN'
    analyticsId = 'UA-109760041-1'
    facebookId = facebookIds.au
  }

  const optimize = new Optimize({
    id: 'GTM-TQTD572',
    gtmId,
    analyticsId,
    timeout: 1500,
  });

  setHeadComponents([
    optimize.asyncHide(),
  ])

  /*
  // ——— GA4 Global
  <script
    key={`${COMPONENT_KEY}-asyncHide-script`}
    dangerouslySetInnerHTML={{
      __html: stripIndent`
        <!-- Google Tag Manager Global (noscript) -->
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5FNVR9N"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
          </noscript>
        <!-- End Google Tag Manager Global (noscript) -->
      `
    }}
  />
  */
}
