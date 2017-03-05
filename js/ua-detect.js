(() => {
    var ua = window.navigator.userAgent;

    window.detectUserAgent = window.detectUserAgent || function() {
        var ua = window.navigator.userAgent;

        var rFirefox    = (/(firefox)\/([\w.]+)/i).exec(ua); // Firefox
        var rSafari     = (/version\/([\w.]+).*(safari)/i).exec(ua); // Safari
        var rOpera      = (/(opera).+version\/([\w.]+)/i).exec(ua); // Opera (Presto)
        var rOperaNew   = (/(opr)\/(.+)/i).exec(ua); // Opera (Webkit)
        var rMsie       = (/(msie\s|trident\/7)([\w.]+)/i).exec(ua); // IE 7-
        var rTrident    = (/(trident)\/([\w.]+)/i).exec(ua); // IE 8+
        var rEdge       = (/(edge)\/([\w.]+)/i).exec(ua); // Edge
        var rUcweb      = (/(ucbrowser\/|ucweb)([\w.]+)/i).exec(ua); // UC Browser
        var rChrome     = (/(chrome)\/([\w.]+)/i).exec(ua); // Chrome

        var bFirefox    = (rFirefox != null); //&& (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera));
        var bSafari     = (rSafari  != null); //&& (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera));
        var bOpera      = (rOpera   != null); //&& (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera));
        var bOperaNew   = (rOperaNew!= null); //&& (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera));
        var bEdge       = (rEdge    != null); //&& (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera));
        var bUcweb      = (rUcweb   != null); //&& (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera));
        var bChrome     = (rChrome  != null) && (!bOperaNew); //&& (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera));
        var bMsie       = (rMsie    != null);
        var bTrident    = (rTrident != null);

        var browser = 'Unknown browser';
        var version = 'Unknown version';

        if (bFirefox) {
            browser = 'Firefox';
            version = rFirefox[2];
        }
        if (bSafari) {
            browser = 'Safari';
            version = rSafari[1];
        }
        if (bChrome) {
            browser = 'Chrome';
            version = rChrome[2];
        }
        if (bOpera || bOperaNew) {
            browser = 'Opera';
            version = bOpera ? rOpera[2] : rOperaNew[2];
        }
        if (bEdge) {
            browser = 'Edge';
            version = rEdge[2];
        }
        if (bUcweb) {
            browser = 'UC Browser';
            version = rUcweb[2];
        }
        if (bMsie) {
            browser = 'Internet Explorer';
            if (bTrident) {
                switch(rTrident[2]) {
                case '4.0':
                    version = '8.0';
                    break;
                case '5.0':
                    version = '9.0';
                    break;
                case '6.0':
                    version = '10.0';
                    break;
                case '7.0':
                    version = '11.0';
                    break;
                }
            } else {
                version = rMsie[2];
            }
        }

        return {
            browser: browser,
            version: version,
        };
    };
})();
