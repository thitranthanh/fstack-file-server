var InspiniaCommonUtil = function() {
    
    var TEMPLATES = undefined;
    
    return {
        getDomObjById : function(id, parent) {
            var ret = undefined;
            if(parent != undefined) {
                ret = parent.find("#"+id);
            } else {
                ret = $("#"+id);
            }
            return ret;
        },
        setVisibleControl : function(control, isVisible) {
            if(isVisible) {
                control.show();
            } else {
                control.hide();
            }
        },
        loadCommonTemplates : function() {
            var dfd = jQuery.Deferred();
            if(TEMPLATES != undefined) {
                dfd.resolve(TEMPLATES);
            } else {
                RequireJSUtils.loadCommonTemplates([
                     "breadcrumb.htm"], 
                     function(breadcrumbTpl) {
                         TEMPLATES = {
                             breadcrumbTpl : breadcrumbTpl,
                         };
                         dfd.resolve(TEMPLATES);
                     }
                );
            }
            return dfd.promise();
        },
        renderBreadcrumb : function(header, list) {
            this.loadCommonTemplates().done(function(templates) {
                var html = _.template(templates["breadcrumbTpl"], {
                    header : header,
                    list : list
                });
                $("div#breadcrumb").html(html);
            });
        },
        handleLogout : function() {
//            DialogUtil.confirm('Do you really want to logout?', function() {
                window.location = 'j_spring_security_logout';
//            });
        },
        getMessage : function(key) {
            return MessageMapping[key] || "Not found message with key '" + key + "'";
        },
        formatMessage : function(msg, params) {
            if (typeof params != 'undefined') {
                for ( var i = 0, n = params.length; i < n; i++) {
                    msg = msg.replace("{" + i + "}", params[i]);
                }
            }
            return msg;
        },
        showResponses : function(result) {
            var status = result["status"];
            var respCodes = result["respCodes"];
            var respParams = result["params"];
            if(respParams !== undefined) {
                params = respParams;
            }
            var msg = "";
            for (var i = 0, n = respCodes.length; i < n; i++) {
                if(i != 0) {
                    msg += "<br/>";
                }
                var subMessage = this.getMessage(respCodes[i]);
                if(params != undefined) {
                    var subParams = params[i];
                    msg += this.formatMessage(subMessage, subParams);
                } else {
                    msg += subMessage;
                }
            }
            return InspiniaNotificationUtil.showNotification(status, msg);
        },
        blockUI : function() {
            $.blockUI({
                css : {
                    border : 'none',
                    padding : '15px',
                    backgroundColor : '#000',
                    '-webkit-border-radius' : '10px',
                    '-moz-border-radius' : '10px',
                    opacity : .5,
                    color : '#fff'
                }
            });
        },
        unblockUI : function() {
            $.unblockUI();
        },
        showFormError : function(target, msg) {
            target.addClass("error");
            var error = target.parent().find("label.error");
            error.html(msg);
            error.show();
        },
        hideFormError : function(target) {
            target.removeClass("error");
            var error = target.parent().find("label.error");
            error.hide();
        },
        showFormRequiredError : function(target) {
            this.showFormError(target, "This field is required.");
        },
        randomInt : function(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        sortArr : function(arr, key) {
            var ret = [];
            var sortByKey = function(a, b){
                return a[key] > b[key] ? 1 : -1;
            };
            var temp = $(arr).sort(sortByKey);
            for(var i=0; i<temp.length; i++) {
                ret.push(temp[i]);
            }
            return ret;
        },
    };
}();
//
//var InspiniaLayoutUtil = function() {
//    return {
//        sampleFunction : function() {
//        },
//    };
//}();
//
var InspiniaFormUtil = function() {
    return {
        setSelect2 : function(data, targetSelect, options) {
            // options
            var defaultOptions = {
                "data-key" : "id",
                "data-text" : "name",
                "has-place-holder" : false,
                "place-holder" : "Select data",
                "selected-key" : "",
                "extra-option-params" : []
            };
            options = $.extend({}, defaultOptions, options);
            
            var htmlOptions = "";
            var hasPlaceHolder = options["has-place-holder"]; 
            if(hasPlaceHolder === true) {
                htmlOptions += "<option></option>";
            }
            targetSelect.empty();
            
            var extraOptionParams = options["extra-option-params"];
            
            for(var i=0; i<data.length; i++) {
                var item = data[i];
                var key = item[options["data-key"]];
                var text = item[options["data-text"]];
                var extraOptionParamsHtml = "";
                try {
                    for(var j=0; j<extraOptionParams.length; j++) {
                        var extraParamKey = extraOptionParams[j];
                        var extraParamValue = item[extraParamKey];
                        if(extraParamKey != undefined && extraParamValue != undefined) {
                            extraOptionParamsHtml += " " + extraParamKey + "='" + extraParamValue +"' ";
                        }
                    }
                } catch(ex) {
                    console.log(ex);
                    extraOptionParamsHtml = "";
                }
                htmlOptions += "<option value='" + key + "' " + extraOptionParamsHtml +">" + text + "</option>";
            }
            targetSelect.append(htmlOptions);
            
            var select2Options = {};
            if(hasPlaceHolder === true) {
            }
            
            var selectedKey = options["selected-key"];
            var placeHolder = options["place-holder"];
            if(hasPlaceHolder === true) {
                select2Options["placeholder"] = placeHolder;
            }
            if(selectedKey != undefined && selectedKey != "") {
                targetSelect.select2(select2Options).select2("val", selectedKey);
            } else {
                targetSelect.select2(select2Options);
            }
        },
        sampleFunction : function() {
            
        },
    };
}();

var InspiniaDataTableUtil = function() {
    return {
        sampleFunction : function() {
        }
    };
}();

var InspiniaTabUtil = function() {
    
    var commonUtil = InspiniaCommonUtil;
    
    return {
        showTabById : function(id, container) {
//            console.log("[InspiniaTabUtil][showTabById]:: " + id);
            var target = commonUtil.getDomObjById(id, container);
            this.showTab(target);
        },
        showTab : function(targetTab) {
//            console.log("[InspiniaTabUtil][showTab]");
            targetTab.tab("show");
        },
        showFirstTab : function(container) {
//            console.log("[InspiniaTabUtil][showFirstTab]");
            var target = container.find(".nav-tabs a:first");
            this.showTab(target);
        },
        showLastTab : function(container) {
//            console.log("[InspiniaTabUtil][showLastTab]");
            var target = container.find(".nav-tabs a:last");
            this.showTab(target);
        },
        showTabByIndex : function(container, idx) {
//            console.log("[InspiniaTabUtil][showTabByIndex]");
            var target = container.find(".nav-tabs li:eq("+idx+") a");
            this.showTab(target);
        }
    };
}();

var InspiniaNotificationUtil = function() {
    
    var STATUS_SUCCESS = 1;
    var STATUS_WARNING = 0;
    var STATUS_ERROR = -1;
    var STATUS_CONFIRM = -2;
    
    var defaultOptions = {
        "closeButton" : false,
        "debug" : false,
        "progressBar" : false,
        "preventDuplicates" : false,
        "positionClass" : "toast-top-center",
        "onclick" : null,
        "showDuration" : "400",
        "hideDuration" : "1000",
        "timeOut" : "2000",
        "extendedTimeOut" : "1000",
        "showEasing" : "swing",
        "hideEasing" : "linear",
        "showMethod" : "fadeIn",
        "hideMethod" : "fadeOut"
    };
    return {
        showNotification : function(status, msg) {
            var result = false;
            if(status == STATUS_SUCCESS) {
                result = true;
                this.success(msg);
            } else if(status == STATUS_WARNING) {
                this.warning(msg);
            } else if(status == STATUS_ERROR) {
                this.error(msg);
            } else {
                console.warn("status['"+status+"'] is not supported");
            }
            return result;
        },
        success : function(msg) {
            toastr.options = defaultOptions;
            toastr.success(msg);
        },
        isSuccess : function(status) {
            return status == STATUS_SUCCESS;
        },
        warning : function(msg) {
            toastr.options = defaultOptions;
            toastr.warning(msg);
        },
        error : function(msg) {
            toastr.options = defaultOptions;
            toastr.error(msg);
        }
    }
}();

var InspiniaDialogUtil = function() {
    return {
        confirm : function(msg, okCallback, cancelCallback) {
            bootbox.confirm({
                buttons : {
                    cancel : {
                        label : "Cancel",
                    }, 
                    confirm : {
                        label : "OK",
                    }
                },
                callback : function(result) {
                    if (result == true) {
                        okCallback();
                    } else {
                        if (typeof cancelCallback != 'undefined') {
                            cancelCallback();
                        }
                    }
                },
                message : msg
            });
        },
        showDialog : function(title, htmlContent, buttons) {
            return bootbox.dialog({
                message : htmlContent,
                title : title,
                closeButton : false,
                buttons : buttons
            });
        },
    };
}();