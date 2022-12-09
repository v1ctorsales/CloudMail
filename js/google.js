var gTimer=null;
var gevents=[];

function gevent(event){
    if (typeof ga=="undefined"){
        gevents.push(event);
        if (gTimer==null){
            gTimer=window.setTimeout(rungEvents,500);
        }
        return false;
    }
    if (typeof event.category=='undefined') return false;
    if (typeof event.action=='undefined') return false;
    var obj={
        hitType: 'event',
        //event:'event',
        eventCategory:event.category,
        eventAction:event.action
    };
    if (typeof event.label!='undefined')obj['eventLabel']=event.label;
    if (typeof event.value!='undefined')obj['eventValue']=event.value;
    if (typeof event.callback!='undefined')obj['hitCallback']=createFunctionWithTimeout(event.callback);
    //if (typeof event.callback!='undefined')obj['hitCallback']=event.callback;
    console.log('Send google event', obj);
    ga('send',obj);
    //dataLayer.push(obj);
};

function rungEvents(){
    if (typeof ga=="undefined"){
        window.setTimeout(rungEvents,500);
        return false;
    }

    for(var i=0;i<gevents.length;i++){
        gevent(gevents[i])
    }
    gevents=[];
}

function createFunctionWithTimeout(callback, opt_timeout) {
    var called = false;
    var f=function() {
        if (!called) {
            called = true;
            callback();
        }
    }
    setTimeout(f, opt_timeout || 1000);
    return f;
};

