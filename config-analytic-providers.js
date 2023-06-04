window.config_analytic_providers = {
    matomo_js: [
        {
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
    ],
    matomo_image: [
        {
            type: 'html',
            content: `
                <!-- Matomo Image Tracker-->
                <img referrerpolicy="no-referrer-when-downgrade" src="{1}matomo.php?idsite={2}&amp;rec=1" style="border:0" alt="" />
                <!-- End Matomo -->
            `,
        },
    ],
    google_ga4: [
        {
            type: 'js',
            content: 'https://www.googletagmanager.com/gtag/js?id={1}'
        },
        {
            type: 'js',
            content: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '{1}');
            `,
        },
    ],
    google_tag: [
        {
            type: 'js',
            content: `
                (function(w,d,s,l,i){
                    w[l]=w[l]||[];
                    w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                    var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),
                        dl=l!='dataLayer'?'&l='+l:'';
                    j.async=true;
                    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','{1}')
            `,
        },
    ]
};