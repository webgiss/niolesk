window.config_analytic_providers = {
    matomo_js: {
        type: 'js',
        content: `
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="{1}";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '{2}']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `,
    },
    matomo_image: {
        type: 'html',
        content: `
          <!-- Matomo Image Tracker-->
          <img referrerpolicy="no-referrer-when-downgrade" src="{1}matomo.php?idsite={2}&amp;rec=1" style="border:0" alt="" />
          <!-- End Matomo -->
        `,
    },
};