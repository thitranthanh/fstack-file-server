var AjaxUtils = function() {
    
    var HTTP_GET = "GET";
    var HTTP_POST = "POST";
    var HTTP_PUT = "PUT";
    var HTTP_DELETE = "DELETE";
    
    var DATA_TYPE = 'json';
    var CONTENT_TYPE = "application/json; charset=utf-8";
    var LOADING_TIMEOUT = 500;
    
    var defaultOptions = {
            dataType : DATA_TYPE,
            contentType : CONTENT_TYPE,
            cache : false,
            error : function(xhr, textStatus, errorThrown) {
                if (xhr.status == 901) {
                    DialogUtil.alertResultError("Your session is expired. Please re-login!", function() {
                        window.location.href = EmsUtil.getCurrentUrl() + "login";
                    });
                }
            },
            complete : function(xhr) {
//                var startTime = xhr.startTime;
//                if(startTime != undefined) {
//                    var elapsed = new Date().getTime() - startTime;
//                    console.log("elapsed " + elapsed);
//                    if (elapsed < LOADING_TIMEOUT) {
//                        setTimeout(function() {
//                            InspiniaCommonUtil.unblockUI();
//                        }, LOADING_TIMEOUT - elapsed);
//                    } else {
//                        InspiniaCommonUtil.unblockUI();
//                    }
//                }
            },
        };
    
    return {
        addAjaxProperty : function(ajaxObj, propertyName, propertyValue) {
            if (propertyValue != '') {
                ajaxObj[propertyName] = propertyValue;
            }
            return ajaxObj;
        },
        getSimpleAjaxObj : function(type, url, onsuccess, options) {
            // var ajaxObj = JSON.parse(JSON.stringify(simpleAjaxObj));
            var ajaxObj = $.extend({}, defaultOptions, options);
            this.addAjaxProperty(ajaxObj, "type", type);
            this.addAjaxProperty(ajaxObj, "url", url);
            // addAjaxProperty(ajaxObj, "data", data);
            this.addAjaxProperty(ajaxObj, "success", onsuccess);
            return ajaxObj;
        },
        doGet : function(url, onsuccess, options) {
            var ajaxObj = this.getSimpleAjaxObj(HTTP_GET, url, onsuccess, options);
            return $.ajax(ajaxObj);
        },
        doPost : function(url, onsuccess, options) {
            var ajaxObj = this.getSimpleAjaxObj(HTTP_POST, url, onsuccess, options);
            return $.ajax(ajaxObj);
        },
        doPut : function(url, onsuccess, options) {
            var ajaxObj = this.getSimpleAjaxObj(HTTP_PUT, url, onsuccess, options);
            return $.ajax(ajaxObj);
        },
        doDelete : function(url, onsuccess, options) {
            var ajaxObj = this.getSimpleAjaxObj(HTTP_DELETE, url, onsuccess, options);
            return $.ajax(ajaxObj);
        },
        onBeforeSendAjax : function(fnBeforeSend) {
            return {
                beforeSend : function(xhr) {
                    xhr.startTime = new Date().getTime();
//                    InspiniaCommonUtil.blockUI();
                    if(fnBeforeSend != undefined) {
                        fnBeforeSend();
                    }
                },
            };
        },
        getRemainingTime : function(startTime, totalTime) {
            var elapsed = new Date().getTime() - startTime;
            if(elapsed < totalTime) {
                return totalTime - elapsed;
            } else {
                return 0;
            }
        },
        onCompleteAjax : function(fnComplete) {
            return {
                complete : function(xhr) {
                    var startTime = xhr.startTime;
                    if (startTime != undefined) {
                        var remainingTime = AjaxUtils.getRemainingTime(startTime, LOADING_TIMEOUT);
                        setTimeout(function() {
                            if(fnComplete != undefined) {
                                fnComplete();
                            }
                        }, remainingTime);
                    }
                },
            };
        },
        showLoadingAjax : function(fnBeforeSend, fnComplete) {
            return $.extend({}, this.onBeforeSendAjax(fnBeforeSend), this.onCompleteAjax(fnComplete));
        },
        loadingButtonAjax : function(targetButton) {
            var btnLoading = targetButton.ladda();
            return this.showLoadingAjax(function() {
                btnLoading.ladda("start");
            }, function() {
                btnLoading.ladda("stop");
            });
        },
        blockUILoadingAjax : function(fnBeforeSend, fnComplete) {
            return this.showLoadingAjax(function() {
                InspiniaCommonUtil.blockUI();
            }, function() {
                InspiniaCommonUtil.unblockUI();
            });
        },
    };
}();