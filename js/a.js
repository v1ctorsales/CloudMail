(function(window, undefined) {

    function Adblocked() {
        this.scriptFile = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        this.scriptFile1 = "//content.adriver.ru/plugins/autoUpdate.adriver.js";
    }

    Adblocked.prototype.isAdblocked = function() {
        if (typeof(window.adsbygoogle) === "undefined" ) {
            return true;
        }
        else {
            return false;
        }
    }

    Adblocked.prototype.done = function(ctx) {
        /*ctx = (typeof(ctx) === "undefined") ? this : ctx;
        if (ctx.isAdblocked())  {
            window.adblocked.result = true;
        } else {
            window.adblocked.result = false;
        }*/
        window.a.result =  ctx;
        var error = null;
        window.a.userCallback(error, window.a.result);
    }

    Adblocked.prototype.insert = function() {
        var body = document.getElementsByTagName('body')[0];
        var ad = document.createElement("div");
        ad.style.display = "none";
        var adScript = document.createElement("script");
        adScript.setAttribute("type","text/javascript");
        adScript.setAttribute("src",this.scriptFile);

        var that = this;
        // adScript.onload = function() {that.done(that)};
        // adScript.onerror = adScript.onload;
        adScript.onload = function() {
            that.done(false);
        };
        adScript.onerror = function() {
            that.done(true);
            // var adScript1 = document.createElement("script");
            // adScript1.setAttribute("type", "text/javascript");
            // adScript1.setAttribute("src", that.scriptFile1);
            // adScript1.onload = function() {
            //     that.done(false)
            // };
            // adScript1.onerror = function() {
            //     that.done(true)
            // };
            // body.appendChild(ad).appendChild(adScript1);
        };
        body.appendChild(ad).appendChild(adScript);
        return this
    }

    var checkAds = function(userCallback) {
        if (typeof(userCallback) !== "undefined") {
            window.a.userCallback = userCallback;
        }
        var a = new Adblocked();
        // if it appears that ads are blocked already
        //if (a.isAdblocked()) {
            a.insert(); // attempt to load ads
        //}
        // if ads have already loaded
        //else {
        //    a.done();
        //}
    }

    window.a = {
        check : checkAds,
        userCallback : function() {},
        result : "unknown"
    }

})(window);