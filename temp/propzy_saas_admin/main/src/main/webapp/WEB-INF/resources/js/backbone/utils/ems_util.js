var EmsUtil = function() {
 
    var sessionFirstName = "sessionFirstName";
    var sessionLastName = "sessionLastName";
    var sessionUserName = "sessionUserName";
    
    var isShowSyncSiteSession = true;
    
    var currentYear = new Date().getFullYear();
    var releaseDate = undefined;
    var reportTimeToGet = undefined;
    var reportNumOfData = {};
    var websocketUrl = "";
    
    var isNotifyEvent = true;
    
    var HOUR_MAPPING = {};
    var MINUTE_MAPPING = {};
    var SECOND_MAPPING = {};
    
    var intervalStatusTitle = 0;
    var title = '';
    
    var baseUrl = "";
    
    var domainPublicUrl ="";
    var logoCustomer = "";
    
    return {
        setFocus : function(id) {
            $("#"+id).focus();
        },
        bindEnterEvent : function(targets, callback) {
            targets.bind('keypress', function(e) {
                if (e.keyCode == 13) {
                    callback();
                    return false;
                }
            });
        },
        bindModalDialog : function(targets) {
            EmsUtil.bindEnterEvent(targets, function() {
                $(".submitModalBtn").trigger("click");
            });
        },
        bindModalDialogLev1 : function(targets) {
            EmsUtil.bindEnterEvent(targets, function() {
                $(".submitModalBtnLev1").trigger("click");
            });
        },
        
        bindNextTab : function(targets) {
            EmsUtil.bindEnterEvent(targets, function() {
                $(".nextBtn").trigger("click");
            });
        },
        bindSubmitForm : function(targets) {
            EmsUtil.bindEnterEvent(targets, function() {
                $(".submitBtn").trigger("click");
            });
        },
        bindSubmitFormTab : function(targets, btnSubmit) {
            EmsUtil.bindEnterEvent(targets, function() {
                btnSubmit.trigger("click");
            });
        },
        getUTCTime : function(timestamp) {
            timestamp = parseFloat(timestamp);
            var date = new Date(timestamp);
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth();
            var day = date.getUTCDate();
            var hours = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            var seconds = date.getUTCSeconds();
            var milliseconds = date.getMilliseconds();
            var utcDate = new Date(year, month, day, hours, minutes, seconds, milliseconds);
            return utcDate.getTime();
        },
        getLiveStamp : function(timestamp) {
            var ret = undefined;
            if(timestamp != undefined && timestamp !== "") {
                var utcTimestamp = EmsUtil.getUTCTime(timestamp);
                ret = utcTimestamp/1000;
            }
            return ret;
        },
        setSelectData : function(data, targetSelect, hasPlaceHolder) {
            var htmlOptions = "";
            if(hasPlaceHolder === true) {
                htmlOptions += "<option></option>";
            }
            targetSelect.empty();
            $.each(data, function(key, value) {
                if(key === "'") {
                    htmlOptions += "<option value=\"" + key + "\">" + value.text + "</option>";
                } else {
                    htmlOptions += "<option value='" + key + "'>" + value.text + "</option>";
                }
            });
            targetSelect.append(htmlOptions);
            targetSelect.select2();
        },
        setSelectDataCustom : function(data, targetSelect, options) {
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
            
            var hasPlaceHolder = options["has-place-holder"]; 
            var htmlOptions = "";
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
            
            var selectedKey = options["selected-key"];
            var placeHolder = options["place-holder"];
            if(hasPlaceHolder === true) {
                targetSelect.attr('placeholder', placeHolder);
//                targetSelect.attr("data-placeholder", placeHolder);
            }
            if(selectedKey != undefined && selectedKey != "") {
                targetSelect.select2().select2("val", selectedKey);
            } else {
                targetSelect.select2();
            }
        },
    	saveTitle : function() {
    		title = $('title').html();
    	},
    	updateTitleWhenAlarm : function(numOfAlarm) {
    		var targetTitle = $('title');
    		
    		var isNewMessage = true;
    		var titleNewMessage = "";
    		
    		if(intervalStatusTitle !== 0) {
                clearInterval(intervalStatusTitle);
    		}
    		if(numOfAlarm > 0) {
    		    titleNewMessage = 'New Alarm - ' + title;
    			intervalStatusTitle = setInterval(function() {
    				if(isNewMessage) {
    					targetTitle.html(titleNewMessage);
    					isNewMessage = false;
    				} else {
    					targetTitle.html('(' + numOfAlarm + ') ' + title);
    					isNewMessage = true;
    				}
    			}, 5000) ;
    		} else {
    		    titleNewMessage = "EMS - Index";
    		    targetTitle.html(titleNewMessage);
    		}
    		/*
    		var prefixNumber = '';
    		var isNew = false;
    		
    		if(intervalStatusTitle !== 0) {
                clearInterval(intervalStatusTitle);
    		}
    		if(numOfAlarm > 1) {
    			prefixNumber = '(' + numOfAlarm + ') ';
    			intervalStatusTitle = setInterval(function() {
    				if(isNew) {
    					title = 'New alarm ' + 
    				}
    			}, 10000) ;
    		}
    		
    		var arrTitle = title.split(')');
    		if(arrTitle.length > 1) {
    			targetTitle.html(prefixNumber + arrTitle[1]);
    		} else {
    			targetTitle.html(prefixNumber + title);
    		}
    		*/
    	},
    	// Start add by xuanluc.le | 17-10-2014
        getShowSyncSiteSession : function() {
            return isShowSyncSiteSession;
        },
        updateShowSyncSiteSession : function(isShowSyncSite){
            isShowSyncSiteSession = isShowSyncSite;
        },
        showErrorWebsocketConnection : function(websocketUrl) {
            var msg = "WebSocket connection to '" + websocketUrl + "' failed";
            EMSNoty.warning(msg);
        },
    	checkSyncSiteView : function(response) {
    	    setTimeout(function() {
    	        if(Backbone.history.fragment === ROUTER_SITE_LIST) {
                    return;
                }
                /*if(!response.status 
                        || response.clientStatus != DialogUtil.getStatusWarning() 
                        || response.clientStatus != DialogUtil.getStatusSuccess() ) {*/
                if(!response.status) {
                    return;
                }
                if(EmsUtil.getShowSyncSiteSession() !== true) {
                    return;
                };
                
	    		var msgConfirm = "<div class='checkbox'>";
		    		msgConfirm += "<strong>"+EmsUtil.formatMessage(EmsUtil.getMessage("20_0"), [])+"</strong>";
		    		msgConfirm += "<br/><br/>";
		    		msgConfirm += "<label class='checkbox-inline checkbox'>";
		    		msgConfirm += "<input type='checkbox' id='show-dialog-sync-site' class='uniform' style='float: none;' /> Do not show this message again (only for this session)";
		    		msgConfirm += "</label>";
	
	            bootbox.confirm({ 
	                buttons : { 
	                    cancel : {
	                        label : "Cancel",
	                        className : EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
	                    }, 
	                    confirm : {
	                        label : "Go to Site Management <i class='fa fa-long-arrow-right'></i>",
	                        className : EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
	                    }
	                },
	                callback : function(result) {
	                    var isChecked = $('input#show-dialog-sync-site').is(":checked");
	                    var isShowPopup = !isChecked;
	                    
	                    EmsUtil.updateShowSyncSiteSession(isShowPopup);
	                    BasicInfoService.updateShowSyncSiteSession(isShowPopup, function(result) {
//	                        console.log("update show popup syncsite:: " + isShowPopup); 
                        }, {});
	                    
	                    if (result == true) {
	    	    			router.navigate_to_site_list();
	                    }
	                },
	                message : msgConfirm
	            });
	            
	            $(".uniform").uniform();
            }, 2000);
    	},
    	handleLogout : function() {
			DialogUtil.confirm('Do you really want to logout?', function() {
				window.location = 'j_spring_security_logout';
			});
		},
    	// End add by xuanluc.le | 17-10-2014
        getHourMapping : function() {
            if(JsonUtil.isEmpty(HOUR_MAPPING)) {
//                HOUR_MAPPING['0'] = "00";
                HOUR_MAPPING['1'] = "01";
                for(var i = 2; i < 24; i++) {
                    var hour = "";
                    if(i < 10) {
                        hour += "0";
                    }
                    hour += i;
                    HOUR_MAPPING[i] = hour;
                }
            }
            return HOUR_MAPPING;
        },
        getMinuteMapping : function() {
            if(JsonUtil.isEmpty(MINUTE_MAPPING)) {
                MINUTE_MAPPING['0'] = "00";
                MINUTE_MAPPING['1'] = "01";
                for(var i = 2; i < 60; i++) {
                    var minute = "";
                    if(i < 10) {
                        minute += "0";
                    }
                    minute += i;
                    MINUTE_MAPPING[i] = minute;
                }
            }
            return MINUTE_MAPPING;
        },
        getSecondMapping : function() {
            if(JsonUtil.isEmpty(SECOND_MAPPING)) {
                SECOND_MAPPING['0'] = "00";
                SECOND_MAPPING['1'] = "01";
                for(var i = 2; i < 60; i++) {
                    var second = "";
                    if(i < 10) {
                        second += "0";
                    }
                    second += i;
                    SECOND_MAPPING[i] = second;
                }
            }
            return SECOND_MAPPING;
        },
        getCookieNotifyEvent : function() {
            return "notify-event-cookie-" + EmsUtil.getSessionUserName();
        },
        setNotifyEvent : function(status) {
            //dongthuc.nguyen modify start
//            if(status === undefined) {
//                // default is show
//                status = "true";
//            } 
//            $.cookie(EmsUtil.getCookieNotifyEvent(), status);
//            if(status === "true") {
//                isNotifyEvent = true;
//            } else {
//                isNotifyEvent = false;
//            }
            $.cookie(EmsUtil.getCookieNotifyEvent(), status+"");
            isNotifyEvent = status;
            //dongthuc.nguyen modify end
        },
        //dongthuc.nguyen modify start
//      getIsNotifyEvent : function() {
//          if(!UserType.isSuperAdmin()) {
//              return false;
//          } else {
//              return isNotifyEvent;
//          }
//      },
      getIsNotifyEvent : function() {
//          isNotifyEvent = true;
          return isNotifyEvent;
      },
      getIsNotifyEventFromCookie : function() {
          var cookieName = "notify-event-cookie-" + EmsUtil.getSessionUserName();
          var notifyEventStatus = $.cookie(cookieName);
          console.log("notifyEventStatus:: " + notifyEventStatus);
          isNotifyEvent = notifyEventStatus == "true";
      },
      //dongthuc.nguyen modify end
    	setReleaseDate : function (relDate) {
    		releaseDate = relDate;
    	},
    	getReleaseDate : function () {
    		return releaseDate;
    	},
    	setReportTimeToGet : function(time2Get) {
    		reportTimeToGet = time2Get;
    	},
    	getReportTimeToGet : function() {
    		return reportTimeToGet;
    	},
    	setReportNumOfData : function(nOfData) {
    		reportNumOfData = nOfData;
    	},
    	getReportNumOfData : function() {
    		return reportNumOfData;
    	},
    	//thanhuy.nguyen ADD START
    	getWebsocketUrl : function() {
            return websocketUrl;
        },
        setWebsocketUrl : function(url) {
        	websocketUrl = url;
        },
        //thanhuy.nguyen ADD END
        // vanchung.nguyen add start
        getDomainPublicUrl : function() {
            return domainPublicUrl;
        },
        setDomainPublicUrl : function(url) {
            domainPublicUrl = url;
        },
        setLogoCustomer : function(logoName) {
            logoCustomer = logoName;
        },
        getLogoCustomer : function() {
            return logoCustomer;
        },
        // vanchung.nguyen add end
        // minhnhut.pham ADD START
        getCurrentYear : function() {
            return currentYear;
        },
        setCurrentYear : function(year) {
           currentYear = year;
        },
        getCurrentYearRange : function(min, max) {
            return (currentYear - min) + ":" + (currentYear + max);
        },
        setSessionUserName : function(val) {
            sessionStorage.setItem(sessionUserName, val);
        },
        getSessionUserName : function() {
//            return sessionStorage.getItem(sessionUserName);
            return UserClientSession.getUserClientSession()["username"];
        },
//        setSessionUserFullnameEdit : function(val) {
//            sessionStorage.setItem(sessionUserFullnameEdit, val);
//        },
//        getSessionUserFullnameEdit : function() {
//            return sessionStorage.getItem(sessionUserFullnameEdit);
//        },
        getRandomInt : function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        getTotal : function(values){
            var total = 0;
            $.each(values, function(index, element) {
                total += element;
            });
            return EmsUtil.roundNumberDefault(total);
        },
        getCurrentSkin : function() {
            return EMS_CONSTS.SKINS.DEFAULT;
        },
        getSuperadminId : function() {
            return EMS_CONSTS.SUPERADMIN_ID;
        },
        getSiteNormalValue : function() {
        	return EMS_CONSTS.SITE_TYPE[0].value;
        },
        getSiteCloudValue : function() {
        	return EMS_CONSTS.SITE_TYPE[1].value;
        },
        renderBreadcrumb : function(list) {
            RequireJSUtils.loadBreadcrumbTemplate(function(tpl) {
                var breadcrumb_html = _.template(tpl, {
                    list : list
                });
                $("div#breadcrumb").html(breadcrumb_html);
            });
        },
        findItemList : function(item, list) {
            // for ( var i = 0; i < list.length; i++) {
            // if (list[i] == item) {
            // return i;
            // }
            // }
            // return -1;
            return list.indexOf(item);
        },
        isItemExisted : function(item, list) {
            return this.findItemList(item, list) != -1;
        },
        mergeListAdd : function(item, basicList, addList, removeList) {
            var basicIndex = this.findItemList(item, basicList);
            if (basicIndex != -1) {
                var removeIndex = this.findItemList(item, removeList);
                if (removeIndex != -1) {
                    removeList.splice(removeIndex, 1);
                }
            } else {
                var addIndex = this.findItemList(item, addList);
                if (addIndex == -1) {
                    addList.push(item);
                }
            }
        },
        mergeListRemove : function(item, basicList, addList, removeList) {
            var basicIndex = this.findItemList(item, basicList);
            if (basicIndex != -1) {
                var removeIndex = this.findItemList(item, removeList);
                if (removeIndex == -1) {
                    removeList.push(item);
                }
            } else {
                var addIndex = this.findItemList(item, addList);
                if (addIndex != -1) {
                    addList.splice(addIndex, 1);
                }
            }
        },
        secondIndexOf : function(Val, Str) {
            var Fst = Str.indexOf(Val);
            var Snd = Str.indexOf(Val, Fst + 1);
            return Snd;
        },
        updateBaseUrl : function() {
            AjaxUtils.doGet("basic/base-url", function(url) {
                baseUrl = url;
                console.log("base url " + baseUrl);
            }, {});
        },
        getBaseUrl : function() {
            return baseUrl;
        },
        getCurrentUrl : function() {
//            var pathname = location.pathname;
//            return location.origin + pathname.substring(0,
//                            this.secondIndexOf("/", pathname) + 1);
            return this.getBaseUrl() + "/";
        },
        logout : function() {
            window.location.href = this.getCurrentUrl() + 'j_spring_security_logout';
        },
        //thanhuy.nguyen ADD START
        moveHomePage : function() {
        	//window.location.href = this.getCurrentUrl() + 'index#dashboard';
//            window.location.href =  this.getCurrentUrl() + 'index#users';
            window.location.href =  this.getCurrentUrl();
        },
        sortDropDownListByText : function (selectId) {
            var foption = $('#'+ selectId + ' option:first');
            var soptions = $('#'+ selectId + ' option:not(:first)').sort(function(a, b) {
               return a.text == b.text ? 0 : a.text < b.text ? -1 : 1;
            });
            $('#' + selectId).html(soptions).prepend(foption);
        },
        removeArrItems : function(baseArr, removeArr) {
            try {
                for(var i=0, n=removeArr.length; i<n; i++) {
                    var item = removeArr[i];
                    var removeIdx = baseArr.indexOf(item);
                    if(removeIdx != -1) {
                        baseArr.splice(removeIdx, 1);
                    }
                }
            } catch(ex) {
                console.log(ex);
            }
        },
        //thanhuy.nguyen ADD END
        getById : function(id) {
            return $("#"+id);
        },
        setSelect2ReadOnly : function(obj, status) {
            obj.select2("readonly", status);
        },
        setDisableElement : function(obj, status) {
            obj.prop("disabled", status);
        },
        getViewStateAdd : function() {
            return EMS_CONSTS.VIEW_STATE.VIEW_STATE_ADD;
        },
        getViewStateEdit : function() {
            return EMS_CONSTS.VIEW_STATE.VIEW_STATE_EDIT;
        },
        getViewStateView : function() {
            return EMS_CONSTS.VIEW_STATE.VIEW_STATE_VIEW;
        },
        setResponseParams : function(response, params) {
            response.params = params;
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
        getStatusHtml : function(txt, labelClass) {
            return "<span class='label " + labelClass + "'>" + txt + "</span>";
        },
        getActivedStatusHtml : function(txt) {
            return this.getStatusHtml(txt, "label-success");
        },
        getLockedStatusHtml : function(txt) {
            return this.getStatusHtml(txt, "label-default");
        },
        getCheckBoxIconHtml : function(status) {
            var icon = status ? "fa-check-square-o" : "fa-square-o";
            return "<i class='fa " + icon + "'></i>";
        },
        isObject : function (obj) {
        	return $.isEmptyObject(obj);
        },
        isArray : function(obj) {
            return $.isArray(obj);
        },
        isArrayHasItem : function(obj) {
            return this.isArray(obj) && obj.length > 0;
        },
        roundNumber : function(value, places) {
            var multiplier = Math.pow(10, places);
            return (Math.round(value * multiplier) / multiplier);
        },
        roundNumberDefault : function(value) {
            return EmsUtil.roundNumber(value, 5);
        },
        roundListNumber : function(data) {
            for(var i=0; i<data.length; i++) {
                var val = EmsUtil.roundNumberDefault(data[i]);
                data[i] = val;
            }
            return data;
        },
        getAlarmNotificationLoading : function() {
            var html = "";
            html += "<div id=\"alarmLoading\" style=\"width:100%\" class=\"center remove-on-load\">";
            html += IconUtil.getLoadingIcon();
            html += "</div>";
            return html;
        },
        getMessageNotificationLoading : function() {
            var html = "";
            html += "<div id=\"messageLoading\" style=\"width:100%\" class=\"center remove-on-load\">";
            html += "<img src=\"" + "./resources/img/ajax-loaders/" + "ajax-loader-1.gif\" style=\"width:24px;height:24px\" >";
            html += "</div>";
            return html;
        },
        getAlarmNotificationTimeOut : function() {
            var html = "";
            html += "<div class=\"alert alert-block alert-warning fade in remove-on-load\" style=\"margin-bottom:0px\">";
            html += "<p><h4><i class=\"fa fa-exclamation-circle\"></i> Warning</h4> " + EmsUtil.getMessage("-1_0") + "</p>";
            html += "</div>";
            return html;
        },
        // minhnhut.pham ADD END

        // xuanluc.le ADD START
		getDivLoadingMsg : function () {
			return "<div id='loading' class='center'>loading...<div class='center'></div></div>";
		},
        // xuanluc.le ADD END
        //thanhuy.nguyen ADD START
		getDivExportingMsg : function () {
			return "<div id='loading' class='center'>exporting...<div class='center'></div></div>";
		},
        getAlertWarningMsg : function (msg) {
        	var alertMsg = "";
        	alertMsg += "<br/><div class='alert alert-block alert-warning fade in'>";
        	alertMsg += "<h4><i class='fa fa-exclamation-circle'></i> Warning</h4> ";
        	alertMsg += msg;
        	alertMsg += "</div>";
        	return alertMsg;
		},
		getAlertDangerMsg : function (msg) {
			var alertMsg = "";
			alertMsg += "<br/><div class='alert alert-block alert-danger fade in'>";
			alertMsg += "<h4><i class='fa fa-exclamation-circle'></i> Warning</h4> ";
			alertMsg += msg;
			alertMsg += "</div>";
			return alertMsg;
		},
		getAlertSuccessMsg : function (msg) {
			var alertMsg = "";
			alertMsg += "<br/><div class='alert alert-block alert-success fade in'>";
			alertMsg += "<h4><i class='fa fa-exclamation-circle'></i> Successfully</h4> ";
			alertMsg += msg;
			alertMsg += "</div>";
			return alertMsg;
		},
        //thanhuy.nguyen ADD END
		//thanhuy.nguyen dashboard-ktp ADD START
		getPopupContentHTMLMap : function (boiler) {
		    
		    var popupContentHTML = '<div class="row" style="padding: 0px; margin-top: -11px;">';
            popupContentHTML +='<label class="control-label col-md-12"><h4><strong>'+ boiler.name +'</strong>';
            popupContentHTML +='<span class="glyphicon glyphicon-remove pull-right close-icon-popup-map"  style=""></span>';
//            popupContentHTML +='<div class="col-md-4">';
//            popupContentHTML +='<p ></p>';
//            popupContentHTML +='</div>';
            popupContentHTML +='<h4></label></div>';
            
            popupContentHTML += '<div class="row" style="padding: 0px; ">';
            popupContentHTML +='<label class="control-label col-md-6">Steam flow:</label>';
            popupContentHTML +='<div class="col-md-3" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML +='<p style="text-align: right;">' + boiler.steamFlowCurrent + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='<div class="col-md-1" style="padding-left: 7px;">';
            popupContentHTML +='<p >' + boiler.steamFlowUnit + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='</div>';
            
            popupContentHTML += '<div class="row">';
            popupContentHTML +='<label class="control-label col-md-6">Steam total:</label>';
            popupContentHTML +='<div class="col-md-3" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML +='<p style="text-align: right;">' + boiler.steamTotalInDay + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='<div class="col-md-1" style="padding-left: 7px;">';
            popupContentHTML +='<p >' + boiler.steamTotalUnit + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='</div>';
            
            popupContentHTML += '<div class="row">';
            popupContentHTML +='<label class="control-label col-md-6">Steam pressure:</label>';
            popupContentHTML +='<div class="col-md-3" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML +='<p style="text-align: right;">' + boiler.steamPressureCurrent + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='<div class="col-md-1" style="padding-left: 7px;">';
            popupContentHTML +='<p >' + boiler.steamPressureUnit + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='</div>';
            
            popupContentHTML += '<div class="row">';
            popupContentHTML +='<label class="control-label col-md-6">Steam temperature:</label>';
            popupContentHTML +='<div class="col-md-3" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML +='<p style="text-align: right;">' + boiler.steamTemperatureCurrent + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='<div class="col-md-1" style="padding-left: 7px;">';
            popupContentHTML +='<p >' + boiler.steamTemperatureUnit + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='</div>';
            
            popupContentHTML += '<div class="row">';
            popupContentHTML +='<label class="control-label col-md-6">Alarm counts in day:</label>';
            popupContentHTML +='<div class="col-md-3" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML +='<p style="text-align: right;">' + boiler.alarmCount + '</p>';
            popupContentHTML +='</div>';
            popupContentHTML +='</div>';
            return popupContentHTML;
        },
        getPopupContentHTMLMapV2 : function (boiler) {
            if(boiler.steamTotalUnit === undefined){
                boiler['steamTotalUnit'] = '';
            }
            if (boiler.steamFlowAddress === undefined){
                boiler['steamFlowAddress'] = '';
            }
            if (boiler.steamFlowUnit === undefined){
                boiler['steamFlowUnit'] = '';
            }
            if ( boiler.steamPressureAddress === undefined){
                boiler['steamPressureAddress'] = '';
            }
            if ( boiler.steamPressureUnit === undefined){
                boiler['steamPressureUnit'] = '';
            }
            if ( boiler.steamTemperatureAddress === undefined){
                boiler['steamTemperatureAddress'] = '';
            }
            if ( boiler.steamTemperatureUnit === undefined){
                boiler['steamTemperatureUnit'] = '';
            }
            if ( boiler.steamFlowAddress === undefined){
                boiler['steamFlowAddress'] = '';
            }
            if ( boiler.steamFlowUnit === undefined){
                boiler['steamFlowUnit'] = '';
            } 
            var popupContentHTML = '<div id="'+boiler.deviceHost+'">';
            popupContentHTML += '<div class="form-horizontal col-md-12" style="padding: 0px; height: 25%;">';
            popupContentHTML +='<div class="col-md-12" style="text-align: left; height: 100%; padding-left: 8px; padding-right: 7px;"> <h4 class="format-font-helvetica-neue-bold" style="height: 10px;"><img class="format-img" src="resources/img/tree/node.png"><strong> &nbsp;'+ boiler.accountName +'</strong>';
            popupContentHTML +='</h4><span class="glyphicon glyphicon-remove pull-right close-icon-popup-map closePopupMap"  style="top: -25px;"></span>';
            popupContentHTML +='</div></div>';
            
            popupContentHTML += '<div style="clear: both;height: 10px;"></div>';
            
            popupContentHTML += '<div class="form-horizontal col-md-12" style="padding: 0px; height: 15%; top: -10px;">';
            popupContentHTML +='<div class="col-md-8 format-font-helvetica-neue-regular" style="text-align: left; height: 100%; padding-left: 8px;">';
            popupContentHTML +='<img class="format-img" src="resources/img/daviteq-icon/common/detail boiler-04.png"><strong>&nbsp;&nbsp;'+  boiler.name + '</strong>';
            popupContentHTML +='</div>';
            
            popupContentHTML +='<div class="col-md-4" style="text-align: left; height: 100%; padding-left: 30px;">';
            popupContentHTML +='<img class="format-img" src="resources/img/daviteq-icon/common/bell_16px.png">&nbsp;' + boiler.alarmCount;
            popupContentHTML +='</div>';
            popupContentHTML +='</div>';
            
            popupContentHTML += '<div class="form-horizontal col-md-12" style="padding: 0px 3px 0px 8px; height: 60%; margin-left: 0px; margin-right: 0px; top: -5px;">';
            // start area 1
            popupContentHTML += '<div class="col-md-3" style="height: 80%;padding-left: 0px;padding-right: 7px; margin-top: 0px;">';
            popupContentHTML += '<div class="col-md-12 popup-sub-area-value" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;">';
            popupContentHTML += 'Steam';
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;">';
            popupContentHTML += 'total';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div class="col-md-12 span12 pagination-centered">';
            popupContentHTML += '<div style="border-bottom: thin solid #d1d3d4;"></div>';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered format-value-dashboard-detail" style="text-align: center;margin: 0 auto; padding: 2px 10px 0px;">';
            popupContentHTML += boiler.steamTotalInDay;
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered format-sub-value-dashboard-detail" style="text-align: center;margin: 0 auto; padding: 0px 10px 4px;">';
            popupContentHTML += boiler.steamTotalUnit;
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            // end area 1
            // start area 2
            popupContentHTML += '<div class="col-md-3" style=" height: 80%; padding-left: 0px;padding-right: 7px; margin-top: 0px;">';
            popupContentHTML += '<div class="col-md-12 popup-sub-area-value" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;">';
            popupContentHTML += 'Steam';
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;">';
            popupContentHTML += 'flow';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div class="col-md-12 span12 pagination-centered">';
            popupContentHTML += '<div style="border-bottom: thin solid #d1d3d4;"></div>';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div id="'+boiler.steamFlowAddress+'" class="dashboard-popup-realtime-data row col-md-12 span12 pagination-centered format-value-dashboard-detail" style="text-align: center;margin: 0 auto; padding: 2px 10px 0px;">';
//            popupContentHTML += boiler.steamFlowCurrent;
            popupContentHTML += IconUtil.getLoadingIcon();
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered format-sub-value-dashboard-detail" style="text-align: center;margin: 0 auto; padding: 0px 10px 4px;">';
            popupContentHTML += boiler.steamFlowUnit;
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            // end area 2
            // start area 3
            popupContentHTML += '<div class="col-md-3" style="height: 80%; padding-left: 0px; padding-right: 7px; margin-top: 0px;">';
            popupContentHTML += '<div class="col-md-12 popup-sub-area-value" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;">';
            popupContentHTML += 'Steam';
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;">';
            popupContentHTML += 'pressure';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div class="col-md-12 span12 pagination-centered">';
            popupContentHTML += '<div style="border-bottom: thin solid #d1d3d4;"></div>';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div id="'+boiler.steamPressureAddress+'" class="dashboard-popup-realtime-data row col-md-12 span12 pagination-centered format-value-dashboard-detail" style="text-align: center;margin: 0 auto; padding: 2px 10px 0px;">';
//            popupContentHTML += boiler.steamPressureCurrent;
            popupContentHTML += IconUtil.getLoadingIcon();
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered format-sub-value-dashboard-detail" style="text-align: center;margin: 0 auto; padding: 0px 10px  4px;">';
            popupContentHTML += boiler.steamPressureUnit;
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            // end area 3
            // start area 4
            popupContentHTML += '<div class="col-md-3" style="height: 80%; padding-left: 0px;padding-right: 7px; margin-top: 0px">';
            popupContentHTML += '<div class="col-md-12 popup-sub-area-value" style="padding-left: 0px;padding-right: 0px;">';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;">';
            popupContentHTML += 'Steam';
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered" style="text-align: center;margin: 0 auto;padding: 0px 10px;">';
            popupContentHTML += 'temperature';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div class="col-md-12 span12 pagination-centered">';
            popupContentHTML += '<div style="border-bottom: thin solid #d1d3d4;"></div>';
            popupContentHTML += '</div>';
            
            popupContentHTML += '<div id="'+boiler.steamTemperatureAddress+'" class="dashboard-popup-realtime-data row col-md-12 span12 pagination-centered format-value-dashboard-detail" style="text-align: center; margin: 0 auto; padding: 2px 10px 0px;">';
//            popupContentHTML += boiler.steamTemperatureCurrent;
            popupContentHTML += IconUtil.getLoadingIcon();
            popupContentHTML += '</div>';
            popupContentHTML += '<div class="row col-md-12 span12 pagination-centered format-sub-value-dashboard-detail" style="text-align: center; margin: 0 auto; padding: 0px 10px 4px;">';
            popupContentHTML += boiler.steamTemperatureUnit;
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            // end area 4
            popupContentHTML += '</div>';
            popupContentHTML += '</div>';
            
            popupContentHTML += '</div>';
            return popupContentHTML;
        },
		//thanhuy.nguyen dashboard-ktp ADD END
        // vanchung.nguyen add start
        aboutSoftware : function() {
            AjaxUtils.doGet("authenticated/getAboutSoftware", function(softwareInfo) {
                RequireJSUtils.loadAboutSoftwareTemplate(function(tpl) {
//                    var sourceImg = "basic/static/logo_report_01.png";
                    var renderHtml = _.template(tpl, {
                        skin : EmsUtil.getCurrentSkin(),
                        softwareInfo : softwareInfo,
//                        sourceImg : sourceImg,
                    });
                    var header = "About";
                    DialogUtil.showDialogAboutSoftware(header, renderHtml,
                            "Close", function() {
                            });
                });
            }, {});
        },
        // vanchung.nguyen add start
        randomInt : function(min, max){
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        generateUniqueId : function(prefix) {
            var id = prefix+""+this.randomInt(1000000, 9999999);
            if ($("#" + id).length > 0) {
                id = prefix+""+this.randomInt(1000000, 9999999);
            }
            return id;
        },
    };
}();

//minhnhut.pham ADD START
var IconUtil = function() {
    var commonIconPath = "./resources/img/daviteq-icon/common/";
    var ajaxLoadersPath = "./resources/img/ajax-loaders/";
    var avatarPath = "./resources/img/avatar/";
    //thanhuy.nguyen ADD START
    var breadcrumbIconPath = "./resources/img/daviteq-icon/nav-bar/";
    //thanhuy.nguyen ADD END

    return {
        // common icon start
        getCommonIcon : function(iconName) {
            return "<img width=\"16px\" height=\"16px\" src=\"" + commonIconPath + iconName + "\">";
        },
        getCheckIcon : function() {
            return IconUtil.getCommonIcon("check.png");
        },
        getUncheckIcon : function() {
            return IconUtil.getCommonIcon("uncheck.png");
        },
        getAvailableIcon : function() {
            return IconUtil.getCommonIcon("available.png");
        },
        getUnavailableIcon : function() {
            return IconUtil.getCommonIcon("unavailable.png");
        },
        getSyncIcon : function() {
            return IconUtil.getCommonIcon("sync.png");
        },
        getUnsyncIcon : function() {
            return IconUtil.getCommonIcon("unsync.png");
        },
        getErrorIcon : function() {
            return IconUtil.getCommonIcon("error.png");
        },
        getChangePasswordImage : function() {
            return IconUtil.getCommonIcon("change_password.png");
        },
        getEditBreadScrumbIcon: function(){
            return IconUtil.getCommonIcon("edit.png");
        },
        getViewBreadScrumbIcon: function(){
            return IconUtil.getCommonIcon("view.png");
        },
        getAssignToAccountBreadScrumbIcon: function(){
            return IconUtil.getCommonIcon("assign to account-02.png");
        },
        getImportExportBreadScrumbIcon : function(){
            return IconUtil.getCommonIcon("sync.png");
        },
        getScheduleReportBreadScrumbIcon : function(){
            return IconUtil.getCommonIcon("sync.png");
        },
        //thanhuy.nguyen ADD START
        getMoveDownIcon : function() {
            return commonIconPath + "move_down.png";
        },
        getMoveUpIcon : function() {
            return commonIconPath + "move_up.png";
        },
        getRemoveIcon : function() {
            return commonIconPath + "remove.png";
        },
        getRestartDataEngineIcon : function() {
            return commonIconPath + "restart_data_engine.png";
        },
        getStartDataEngineIcon : function() {
            return commonIconPath + "start_data_engine.png";
        },
        getStopDataEngineIcon : function() {
            return commonIconPath + "stop_data_engine.png";
        },
        getDeleteIcon : function() {
            return commonIconPath + "delete.png";
        },
        getEditIcon : function() {
            return commonIconPath + "edit.png";
        },
        getListIcon : function() {
            return commonIconPath + "list_account.png";
        },
        getSyncSiteIcon : function() {
            return commonIconPath + "sync.png";
        },
        getLockIcon : function() {
            return commonIconPath + "lock.png";
        },
        getUnLockIcon : function() {
            return commonIconPath + "unlock-02.png";
        },
        getRenameIcon : function() {
            return commonIconPath + "rename.png";
        },
        getChangePasswordIcon : function() {
            return commonIconPath + "change_password.png";
        },
        getConfigurationDeviceCommonIcon : function() {
            return commonIconPath + "configuration_device.png";
        },
        getViewIcon : function() {
            return commonIconPath + "view.png";
        },
        getMapMarkerIcon :function(){
            return commonIconPath + "web-icon-device2.png";
        },
        getMapMarkerAlarmIcon :function(){
            return commonIconPath + "boiler alert.gif";
        },
        getaddAlarmConfigurationIcon : function() {
            return commonIconPath + "add alarm config-02.png";
        },
        getMapsIcon : function(){
            return commonIconPath + "map-04.png";
        },
        getSellReportIcon : function(){
            return commonIconPath + "sell report-04.png";
        },
        getDetailBoilerIcon : function(){
            return commonIconPath + "detail boiler-04.png";
        },
        getSiteIcon : function(){
            return commonIconPath + "site-04.png";
        },
        getMemoryMapIcon : function(){
            return commonIconPath + "memory map-04.png";
        },
        getModbusCommandIcon : function(){
            return commonIconPath + "modbud command-04.png";
        },
        getModbusConfigIcon : function(){
            return commonIconPath + "modbud config-04.png";
        },
        getAssignToGroupIcon : function(){
            return commonIconPath + "assign to group-04.png";
        },
        getRestoreIcon : function(){
            return commonIconPath + "restore-04.png";
        },
        getDetailIcon : function(){
            return commonIconPath + "detail-04.png";
        },
        getHistoryIcon : function(){
            return commonIconPath + "history-04.png";
        },
        getSummaryIcon : function(){
            return commonIconPath + "summary-04.png";
        },
        getAssignToUserIcon : function(){
            return commonIconPath + "assign to acc_white-02.png";
        },
        getConfigWhiteIcon : function(){
            return commonIconPath + "config_white-02.png";
        },
        getConnectWhiteIcon : function(){
            return commonIconPath + "connected_white-02.png";
        },
        getDisconnectWhiteIcon : function(){
            return commonIconPath + "disconnected_white-02.png";
        },
        getGeneralIcon : function(){
            return commonIconPath + "general-02.png";
        },
        getI12FlatFormIcon : function(){
            return commonIconPath + "i12-02.png";
        },
        getOthersIcon : function(){
            return commonIconPath + "history-04.png";
        },
        getHealthConfigurationIcon : function(){
            return commonIconPath + "health config-02.png";
        },
        getActionIcon : function(){
            return commonIconPath + "action.png";
        },
        getImportRowDataIcon : function(){
            return commonIconPath + "import_row_data.png";
        },
        getExportRowDataIcon : function(){
            return commonIconPath + "export_row_data.png";
        },
        // vanchung.nguyen add new-dashboard start
        getListParameterExtensionIcon : function(){
            return commonIconPath + "list_account.png";
        },
        // vanchung.nguyen add new-dashboard end
        getViewWhiteIcon : function(){
            return commonIconPath + "view_white_02.png";
        },
        getCheckSrcIcon : function(){
            return commonIconPath + "check.png";
        },
        getUncheckSrcIcon : function(){
            return commonIconPath + "uncheck.png";
        },
        //thanhuy.nguyen ADD END
        getCheckIconByStatus : function(status) {
            if(status === true || status === EMS_CONSTS.STATUS_STRING.ACT) {
                return IconUtil.getCheckIcon();
            } else if(status === false || status === EMS_CONSTS.STATUS_STRING.LCK){
                return IconUtil.getUncheckIcon();
            }
        },
        getAvailableIconByStatus : function(status) {
            if(status === true) {
                return IconUtil.getAvailableIcon();
            } else {
                return IconUtil.getUnavailableIcon();
            }
        },
        getSyncIconByStatus : function(status) {
            if(status === true) {
                return IconUtil.getSyncIcon();
            } else {
                return IconUtil.getUnsyncIcon();
            }
        },
        // vanchung.nguyen add new-dashboard start
        getDashboardIcon : function(iconName) {
            return "<img width=\"14px\" height=\"14px\" src=\"" + commonIconPath + iconName + "\">";
        },
        getCloseDashboard : function() {
            return IconUtil.getDashboardIcon("remove.png");
        },
        // vanchung.nguyen add new-dashboard end
        // common icon end
        // avatar icon start
        getAvatarIcon : function(iconName) {
            return "<img style=\"border-radius: 99px;\" width=\"29px\" height=\"29px\" src=\"" + avatarPath + iconName + "\">";
        },
        getAvatarIconByGender : function(gender, avatarName) {
            if(avatarName == undefined || avatarName == "") {
                if(gender == 'male') {
                    avatarName = "nm.jpg";
                } else if(gender == 'female') {
                    avatarName = "nf.jpg";
                } else {
                    // default
                    avatarName = "nm.jpg";
                }
            }
            return IconUtil.getAvatarIcon(avatarName);
        },
        // avatar icon end
        // ajax-loader icon start
        getLoadingIcon : function() {
            return "<img src=\"" + ajaxLoadersPath + "ajax-loader-1.gif\">";
        },
        //minhnhut.pham dashboard-ktp start
        getLargeLoadingIcon : function() {
            return "<img src=\"" + ajaxLoadersPath + "ajax-loader-4.gif\">";
        },
        getLoadingIconCustom : function(width, height) {
            return "<img src=\"" + ajaxLoadersPath + "ajax-loader-4.gif\" width=\""+width+"\" height=\""+height+"\">";
        },
        //minhnhut.pham dashboard-ktp end
        // ajax-loader icon end
        //thanhuy.nguyen ADD START
        getBreadScrumbIcon : function(iconName) {
            return "<img style=\"margin: 0px 3px 3px 0px\" src=\"" + breadcrumbIconPath + iconName + "\" class ="+'"'+"ems-icon-size"+'"'+" >";
        },
        getBreadScrumbCommonIcon : function(iconName) {
            return "<img style=\"margin: 0px 3px 3px 0px\" src=\"" + commonIconPath + iconName + "\" class ="+'"'+"ems-icon-size"+'"'+" >";
        },
        getHomeIcon : function() {
            return IconUtil.getBreadScrumbIcon("home_blue.png");
        },
        //admin
        getAdminAccountIcon : function() {
            return IconUtil.getBreadScrumbIcon("admin_account_blue.png");
        },
        getAdminGroupIcon : function() {
            return IconUtil.getBreadScrumbIcon("admin_group_blue.png");
        },
        getAdminUserIcon : function() {
            return IconUtil.getBreadScrumbIcon("admin_user_blue.png");
        },
        //configuration 
        getConfigurationDeviceIcon : function() {
            return IconUtil.getBreadScrumbIcon("configuration_device_blue.png");
        },
        getConfigurationGlobalIcon : function() {
            return IconUtil.getBreadScrumbIcon("configuration_global_blue.png");
        },
        getConfigurationSiteManagementIcon : function() {
            return IconUtil.getBreadScrumbIcon("configuration_sitemanagent_blue.png");
        },
        getConfigurationTrendingHistoricalIcon : function() {
            return IconUtil.getBreadScrumbIcon("configuration_trendhistory_blue.png");
        },
        getConfigurationMailIcon : function() {
            return IconUtil.getBreadScrumbIcon("mail_config-02.png");
        },
        getConfigurationSmsIcon : function() {
            return IconUtil.getBreadScrumbIcon("sms_config.png");
        },
        getConfigurationMemmapIcon : function() {
            return IconUtil.getBreadScrumbIcon("configuration_memmap.png");
        },
        getConfigurationPackageIcon : function() {
            return IconUtil.getBreadScrumbIcon("configuration_package.png");
        },
        //Monitoring
        getMonitoringLiveViewIcon : function() {
            return IconUtil.getBreadScrumbIcon("monitoring_liveview_blue.png");
        },
        getMonitoringTrendingIcon : function() {
            return IconUtil.getBreadScrumbIcon("monitoring_trending_blue.png");
        },
        getMonitoringAlarmIcon : function() {
            return IconUtil.getBreadScrumbIcon("monitoring_alarm_blue.png");
        },
        getMonitoringEventIcon : function() {
            return IconUtil.getBreadScrumbIcon("monitoring_event_blue.png");
        },
        //energy
        getEnergyDashboardIcon : function() {
            return IconUtil.getBreadScrumbIcon("energy_dashboard_blue.png");
        },
        getEnergyReportIcon : function() {
            return IconUtil.getBreadScrumbIcon("energy_report_blue.png");
        },
        //
        getParameterIcon : function() {
            return IconUtil.getBreadScrumbIcon("parameter_bue.png");
        },
        getdDeviceConfigManagerIcon : function() {
            return IconUtil.getBreadScrumbIcon("device_config_manage.png");
        },
        getListIcon : function() {
            return IconUtil.getBreadScrumbCommonIcon("list_account.png");
        },
        getMyAccountIcon : function() {
            return IconUtil.getBreadScrumbIcon("my_account.png");
        },
        getMyProfileIcon : function() {
            return IconUtil.getBreadScrumbIcon("my_profile.png");
        },
        getAddIcon : function() {
            return IconUtil.getBreadScrumbIcon("new.png");
        },
        getMapsBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("map-04.png");
        },
        getSellReportBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("sell report-04.png");
        },
        getDetailBoilerBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("detail boiler-04.png");
        },
        getSiteBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("site-04.png");
        },
        getMemoryMapBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("memory map-04.png");
        },
        getModbusCommandBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("modbud command-04.png");
        },
        getModbusConfigBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("modbud config-04.png");
        },
        getDetailBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("detail-04.png");
        },
        getHistoryBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("history-04.png");
        },
        getSummaryBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("summary-04.png");
        },
        getAlarmConfigBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("alarm config-02.png");
        },
        getAssignGroupBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("assign to group-04.png");
        },
        getSiteConfigCloudBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("site config cloud-02.png");
        },
        getHealthConfigBreadScrumbIcon : function(){
            return IconUtil.getBreadScrumbIcon("health config-02.png");
        },
        //thanhuy.nguyen ADD END
    };
}();
//minhnhut.pham ADD END

var DataTableUtil = function() {
    return {
        addRow : function(targetDataTable, dataTableRow) {
            //targetDataTable.fnAddData(dataTableRow);
            targetDataTable.dataTable().fnAddData(dataTableRow);
        },
        removeRow : function(targetDataTable, targetRow) {
            var rowIdx = DataTableUtil.getRowIndex(targetDataTable, targetRow);
            // targetDataTable.fnDeleteRow(rowIdx);
            targetDataTable.dataTable().fnDeleteRow(rowIdx);
        },
        getRowIndex : function(targetDataTable, targetRow) {
//            return targetDataTable.fnGetPosition(targetRow);
            return targetDataTable.dataTable().fnGetPosition(targetRow);
        },
        moveRowUp : function(targetDataTable, row) {
            var rowIdx = DataTableUtil.getRowIndex(targetDataTable, row);
            DataTableUtil.moveRow(targetDataTable, row, rowIdx - 1);
        },
        moveRowDown : function(targetDataTable, row) {
            var rowIdx = DataTableUtil.getRowIndex(targetDataTable, row);
            DataTableUtil.moveRow(targetDataTable, row, rowIdx + 1);
        },
        moveRow : function(targetDataTable, row, newIndex) {
            var targetDataTableObj = targetDataTable.dataTable();
            var rowIndex = DataTableUtil.getRowIndex(targetDataTable, row);
            if(rowIndex !== newIndex) {
                var data = targetDataTableObj.fnGetData();
                var numOfData = data.length;
                if(newIndex >= 0 && newIndex <= numOfData) {
                    targetDataTableObj.fnClearTable();
                    // remove row
                    var rowToMove = data.splice(rowIndex, 1)[0];
                    // add row
                    data.splice(newIndex, 0, rowToMove);
                    targetDataTableObj.fnAddData(data);
                }
            }
            return false;
        },
        getNumOfRow : function(targetDataTable) {
            return targetDataTable.dataTable().fnGetData().length;
        },
    };
}();

var JsonUtil = function() {

    return {
        // minhnhut.pham ADD START
        getJsonKey : function(keyIndex, json) {
            return Object.keys(json)[keyIndex];
        },
        getJsonValue : function(key, json) {
            var value = "";
            if(json) {
                if(json[key] !== undefined) {
                    value = json[key];
                }
            }
            return value;
        },
        getJson : function(keys, json) {
            var val = "";
            for (var i = 0, n = keys.length; i < n; i++) {
                var temp = this.getJsonValue(keys[i], json);
                if (temp != "") {
                    json = temp;
                    if (i == (n - 1)) {
                        val = json;
                    }
                }
            }
            return val;
        },
        isEmpty : function(json) {
            var isEmpty = true;
            if(json != undefined  && Object.keys(json).length > 0) {
                isEmpty = false;
            }
            return isEmpty;
        },
        // minhnhut.pham ADD END
    };
}();

var ValidationUtil = function() {
    return {
        mergeRegex : function(pre_ex, exceptCharacters, suf_ex) {
            for ( var i = 0, n = exceptCharacters.length; i < n; i++) {
                pre_ex += exceptCharacters[i];
            }
            return pre_ex + suf_ex;
        },
        validate_an_except : function(value, exceptCharacters) {
            var pre_ex = "^[a-zA-Z0-9";
            var suf_ex = "]+$";
            var regex = this.mergeRegex(pre_ex, exceptCharacters, suf_ex);
            return new RegExp(regex).test(value);
        },
        validate_a : function(value) {
            return /^[a-zA-Z]+$/.test(value);
        },
        validate_n_except : function(value, exceptCharacters) {
            var pre_ex = "^[0-9";
            var suf_ex = "]+$";
            var regex = this.mergeRegex(pre_ex, exceptCharacters, suf_ex);
            return new RegExp(regex).test(value);
        },
        validate_n : function(value) {
            return /^[0-9]+$/.test(value);
        },
        validate_an : function(value) {
            return /^[a-zA-Z0-9 ]+$/.test(value);
        },
        validate_as : function(value) {

        },
        validate_ns : function(value) {

        },
        validate_ans : function(value) {

        },
        validate_phone : function(value) {
            
        },
        validate_latin : function(value) {
        	// thanhuy.nguyen MODIFY START 
        	//var regex = XRegExp('^[\\p{Latin}\\p{Zs}]+$'); 
            var regex = XRegExp('^[\\p{Latin}\\p{Zs}0-9]+$'); 
            return regex.test(value);
        	// thanhuy.nguyen MODIFY END 
        },
        validate_ansu : function(value) {
        // vanchung.nguyen add start
            //var regex = XRegExp('^[\\p{Latin}\\p{Zs}a-zA-Z0-9 _]+$');
            var regex = XRegExp('^[\\p{Latin}\\p{Zs}a-zA-Z0-9 _.-]+$');
        // vanchung.nguyen add start
            return regex.test(value);
        },
        validate_hex : function(value) {
            return /^[0-9A-Fa-f]+$/.test(value);
        },
        validate_float : function(value) {
        	return /^[-+]?[0-9]+\.[0-9]+$/.test(value); // /^\d{0,2}(?:\.\d{0,2}){0,1}$/
        },
        validate_integer : function(value) {
        	return /^\d+$/.test(value);
        },
        // vanchung.nguyen add start
        validate_host : function(value) {
                var regex = XRegExp('^[\\p{Latin}\\p{Zs}a-zA-Z0-9 /.-]+$');
                return regex.test(value);
            },
        // vanchung.nguyen add end
        // vanchung.nguyen add set-data-bit start
        validate_bit_live_view : function(value) {
            return /^[0-1-xX]+$/.test(value);
        },
        // vanchung.nguyen add set-data-bit end
       };
}();

var EMSValidate = function() {

    var CHARACTER_SPACE = " ";
    var CHARACTER_DOT = ".";
    var CHARACTER_UNDERSCORE = "_";
    var CHARACTER_PLUS = "+";

    jQuery.validator.addMethod("validate_a", function(value, element) {
        return ValidationUtil.validate_a(value);
    }, "Please enter [a-zA-Z]");

    jQuery.validator.addMethod("validate_n", function(value, element) {
        if(value!="") {
            return ValidationUtil.validate_n(value);
        }
        return true;
    }, "Please enter [0-9]");

    jQuery.validator.addMethod("validate_an", function(value, element) {
        return ValidationUtil.validate_an(value);
    }, "Please enter [a-zA-Z0-9 ]");

    jQuery.validator.addMethod("validate_hex", function(value, element) {
        return ValidationUtil.validate_hex(value);
    }, "Please enter valid hex value");
    // thanhuy.nguyen ADD START 
    jQuery.validator.addMethod("ems_validate_email", function(value, element) {
        var result = true;
        if(value.trim().length > 0) {
        	var emailFormat = 
        		/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        	result = emailFormat.test(value);
        }
    	return result;
    }, "Please enter valid email");
    jQuery.validator.addMethod("ems_validate_service_name", function(value, element) {
    	return ValidationUtil.validate_an_except(value, [CHARACTER_UNDERSCORE,'-']);
    }, "Please enter valid service name");
    // thanhuy.nguyen ADD END
    
    // minhnhut.pham ADD START 
    //custom validation for user form START
    jQuery.validator.addMethod("ems_validate_firstname", function(value, element) {
        return ValidationUtil.validate_latin(value);
    }, "Please enter valid first name");
    
    jQuery.validator.addMethod("ems_validate_lastname", function(value, element) {
        return ValidationUtil.validate_latin(value);
    }, "Please enter valid last name");
    
    jQuery.validator.addMethod("ems_validate_username", function(value, element) {
        return ValidationUtil.validate_an_except(value, [CHARACTER_DOT, 
                                                         CHARACTER_UNDERSCORE]);
    }, "Please enter valid username");
    
    jQuery.validator.addMethod("ems_validate_phone", function(value, element) {
        if (value != "") {
        	// thanhuy.nguyen MODIFY START 
        		// return ValidationUtil.validate_n_except(value, [ CHARACTER_PLUS,
        		//                     CHARACTER_DOT, CHARACTER_SPACE, "(", ")" ]);
            return ValidationUtil.validate_n_except(value, [ CHARACTER_PLUS,
                                       CHARACTER_DOT, "-" ]);
            // thanhuy.nguyen MODIFY END 
        }
        return true;
    }, "Please enter valid phone");
    //custom validation for user form END

    jQuery.validator.addMethod("ems_validate_phone_device", function(value, element) {
        if (value != "") {
        	// thanhuy.nguyen MODIFY START 
        		// return ValidationUtil.validate_n_except(value, [ CHARACTER_PLUS,
        		//                     CHARACTER_DOT, CHARACTER_SPACE, "(", ")" ]);
            return ValidationUtil.validate_n_except(value, [ CHARACTER_PLUS]);
            // thanhuy.nguyen MODIFY END 
        }
        return true;
    }, "Please enter valid phone");
    
    //custom validation for site form START
    jQuery.validator.addMethod("ems_validate_site_name", function(value, element) {
        return ValidationUtil.validate_an_except(value, [CHARACTER_SPACE, 
                                                         CHARACTER_UNDERSCORE]);
    }, "Please enter valid name");
    //custom validation for site form END
    //custom validation for device form START
    jQuery.validator.addMethod("ems_validate_device_name", function(value, element) {
        return ValidationUtil.validate_an_except(value, [CHARACTER_SPACE, 
                                                         CHARACTER_UNDERSCORE]);
    }, "Please enter valid name");
    
    // thanhuy.nguyen ADD START
    jQuery.validator.addMethod("ems_validate_host", function(value, element) {
    	//return ValidationUtil.validate_n_except(value, [CHARACTER_DOT]);
    	/* with the range of 1.0.0.0 to 255.255.255.254 */
//    	var ipAddressFormat =  "^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$";
    	
    	/* with the range of 0.0.0.0 to 255.255.255.254 */
    	var ipAddressFormat =  "^([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$"; // xuanluc.le ~ modify 25-09-2014 
    	
    	var arrSubString = value.split(".");
    	var result = true;
    	result = value.match(ipAddressFormat);
    	
    	if(arrSubString.length<4){
    		//if user input string mix dot for format ip address 
    		result = false;
    	}else if(arrSubString.length==4){
    		//Case broadcast ip 255.255.255.255  
    		if( arrSubString[0]=='255' &&
    			arrSubString[1]=='255' && 
    			arrSubString[2]=='255' && 
    			arrSubString[3]=='255'  ){
    			result = false;
    		}
    	}
    	
        return result;
    }, "Please enter valid host");
    // vanchung.nguyen add list device start
    jQuery.validator.addMethod("ems_validate_host_list_device", function(value, element) {
        var result = true;
        if(value === "") {
            return result;
        }
        var ipAddressFormat =  "^([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[0-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$";
        
        var arrSubString = value.split(".");
        
        result = value.match(ipAddressFormat);
        
        if(arrSubString.length<4){
            //if user input string mix dot for format ip address 
            result = false;
        }else if(arrSubString.length==4){
            //Case broadcast ip 255.255.255.255  
            if( arrSubString[0]=='255' &&
                arrSubString[1]=='255' && 
                arrSubString[2]=='255' && 
                arrSubString[3]=='255'  ){
                result = false;
            }
        }
        
        return result;
    }, "Please enter valid host");
    // vanchung.nguyen add list device end
    jQuery.validator.addMethod("ems_validate_port", function(value, element) {
    	 var result = false;
         value = parseInt(value);
         
         if (value > 2000 && value <= 65535) {
             result = true;
         }
         
         return result;
    }, "Please enter valid port,port input should be used 2001 to 65535.");
    jQuery.validator.addMethod("ems_validate_port_site", function(value, element) {
   	 var result = false;
        value = parseInt(value);
        
        if (value > 0 && value <= 65535) {
            result = true;
        }
        
        return result;
   }, "Please enter valid port,port input should be used 1 to 65535.");
   jQuery.validator.addMethod("ems_validate_port_modbus_config", function(value, element) {
           var result = false;
           if(value == ''){
               return true;
           }else{
               value = parseInt(value);
               
               if (value > 0 && value <= 65535) {
                   result = true;
               }
           }
           return result;
    }, "Please enter valid port,port input should be used 1 to 65535.");
   jQuery.validator.addMethod("ems_validate_timeout_modbus_config", function(value, element) {
       var result = false;
          value = parseInt(value);
          
          if (value >= 100 && value <= 5000) {
              result = true;
          }
          return result;
   }, "Please enter valid timeout ,timeout input should be used 100 ms to 5000 ms.");
   jQuery.validator.addMethod("ems_validate_decimalPlaces_length", function(value, element) {
       var result = false;
          value = parseInt(value);
          var selectedDataType = ParameterCloudViewUtil.getSelectDataType().find('option:selected').val();
          if(selectedDataType != 'float'){
              return true;
          }
          if (value >= 0 && value <= 5) {
              result = true;
          }
          return result;
   }, "Please enter decimal places >= 0 and decimal places <= 5");
    // thanhuy.nguyen ADD END
    
    //custom validation for device form END
    //custom validation for parameter form START
    jQuery.validator.addMethod("ems_validate_parameter_name", function(value, element) {
        return ValidationUtil.validate_an_except(value, [CHARACTER_SPACE, 
                                                         CHARACTER_UNDERSCORE]);
    }, "Please enter valid name");
    jQuery.validator.addMethod("ems_validate_parameter_short_name", function(value, element) {
        return ValidationUtil.validate_an_except(value, [CHARACTER_SPACE, 
                                                         CHARACTER_UNDERSCORE]);
    }, "Please enter valid short name");
    jQuery.validator.addMethod("ems_validate_data_length_byte", function(value, element) {
        var result = false;
        value = parseInt(value);
        if (value > 0 && value <= 128) {
            result = true;
        }
        return result;
    }, "Please enter data length > 0 and data length <= 128");
    //custom validation for parameter form END
    //custom validation for device config form START
    
    jQuery.validator.addMethod("ems_validate_float_type", function(value, element) {
    	var result = false;
    	value = parseFloat(value);
    	if(!isNaN(value)) {
    		result = true;
    	}
        return result;
    }, "Please enter only digits");
    
    jQuery.validator.addMethod("ems_validate_min_max_liveview", function(value, element) {
        var result = false;
        var min = $("#txtMin").val();
        var max = $("#txtMax").val();
        min = parseFloat(min);
        max = parseFloat(max);
        max <= min ? result = false : result = true;
        return result;
    }, "Please enter max value greater than min value");
    jQuery.validator.addMethod("ems_validate_line_chart_max_liveview", function(value, element) {
        var result = false;
      
        var max = $("#txtMaxPoint").val();
        max = parseInt(max);
        if(max >= 50 && max <= 500){
            result = true;
        }
        return result;
    }, "Please enter max value greater than 50 and less than 500");
    // thanhuy.nguyen ADD START
    // vanchung.nguyen add new-dashboard start
    jQuery.validator.addMethod("ems_validate_item_per_page", function(value, element) {
        var result = false;
        var itemPerPage = $("#txtItemPerPage").val();
        itemPerPage = parseInt(itemPerPage);
        if(itemPerPage > 0 && itemPerPage < 100){
            result = true;
        }
        return result;
    }, "Please enter max value greater than 0 and less than 100");
    jQuery.validator.addMethod("ems_validate_left_right_write_value_liveview", function(value, element) {
        var result = false;
        var leftWrite = $("#txtLeftValue").val();
        var rightWrite = $("#txtRightValue").val();
        leftWrite = parseInt(leftWrite);
        rightWrite = parseInt(rightWrite);
        rightWrite !== leftWrite ? result = true : result = false;
        return result;
    }, "Please enter right write value different left write value");
    // vanchung.nguyen add new-dashboard end
    //thanhuy.nguyen set-data-bit start
    jQuery.validator.addMethod("ems_validate_bit_value_format_liveview", function(value, element) {
        return /^[0-1-x]+$/.test(value);
    }, "Please enter valid bit data format");
    jQuery.validator.addMethod("ems_validate_bit_value_length_liveview", function(value, element) {
        var length = parseInt($("#txtWriteBitData").attr("bitlength"));
        if(isNaN(length) || length !== value.length) {
            jQuery.validator.messages.ems_validate_bit_value_length_liveview = "Please enter "+length+"-bit string";
            return false;
        }
        return true;
    }, "");
    //thanhuy.nguyen set-data-bit end
    jQuery.validator.addMethod("ems_validate_add_device_config_data_length", function(value, element ) {
       var strDataType = 
    	   DeviceCfgViewUtil.getSelectDataType().find('option:selected').text();
       value = parseInt(value);
       var result = false;
       
       switch (strDataType) {
	       case DeviceCfgViewUtil.getDataTypeMapping()['float'][0]:
	    	   
	    	   var valueDataTpyeFloat = 
	    		   DeviceCfgViewUtil.getDataTypeMapping()['float'][1];
	    	   if(value % valueDataTpyeFloat == 0 
	    			   && value > 0 && value <=1444){
	    		   result = true;
	    	   }
	    	   
	    	   break;
	    	   
	       case DeviceCfgViewUtil.getDataTypeMapping()['integer_32'][0]:
	    	   
	    	   var valueDataTpyeInt32 = 
	    		   DeviceCfgViewUtil.getDataTypeMapping()['integer_32'][1];
	    	   if(value % valueDataTpyeInt32 == 0 
	    			   && value > 0 && value <=1444){
	    		   result = true;
	    	   }
	    	   
	    	   break;
	    	   
	       case DeviceCfgViewUtil.getDataTypeMapping()['integer_64'][0]:
	    	   
	    	   var valueDataTpyeInt64 = 
	    		   DeviceCfgViewUtil.getDataTypeMapping()['integer_64'][1];
	    	   if(value % valueDataTpyeInt64 == 0 
	    			   && value > 0 && value <=1444 ){
	    		   result = true;
	    	   }
	    	   
	    	   break;
	    	   
	       case DeviceCfgViewUtil.getDataTypeMapping()['string'][0]:
	    	   
	    	   if (value > 0 && value <= 128) {
	               result = true;
	           }
	       
	    	   break;
	    	   
	       default:
	    	   result = true;
	       
	    	   break;
       }
       return result;
    }, "Please enter valid data length");
    // thanhuy.nguyen END START
    
    //custom validation for device config form END
    // minhnhut.pham ADD END 
    // xuanluc.le ADD START
    jQuery.validator.addMethod("ems_validate_ansu", function(value, element) {
        if (value != "") {
            return ValidationUtil.validate_ansu(value);
        }
        return true;
    }, "Please enter valid name. Please enter [a-zA-Z0-9 _-.]");
    // xuanluc.le ADD END
    // vanchung.nguyen ADD START
//    jQuery.validator.addMethod("ems_validate_notnull_hihi", function(value, element,params) {
//    	var result = false;
//    	if ( $(params).val().toString() != "")  {
//    		result = true;
//        }
//        return result;
//    }, "Please enter previous value");
//    jQuery.validator.addMethod("ems_validate_notnull_hi", function(value, element,params) {
//    	var result = false;
//    	if ( $(params).val().toString() != "")  {
//    		result = true;
//        }
//        return result;
//    }, "Please enter previous value");
//    jQuery.validator.addMethod("ems_validate_notnull_lo", function(value, element,params) {
//    	var result = false;
//    	if ( $(params).val().toString() != "")  {
//    		result = true;
//        }
//        return result;
//    }, "Please enter previous value");
//    jQuery.validator.addMethod("ems_validate_notnull_lolo", function(value, element,params) {
//    	var result = false;
//    	if ( $(params).val().toString() != "")  {
//    		result = true;
//        }
//        return result;
//    }, "Please enter previous value");
    jQuery.validator.addMethod("ems_validate_hi_value", function(value, element) {
    	var result = false;
    	var hihiValue = parseFloat(AlarmConfigNormalUtil.getTxtHiHiStatus().val());
        value = parseFloat(value);
    	if (value < hihiValue)  {
    		result = true;
        }
        return result;
    }, "Hi value cannot greater than HiHi value");
    jQuery.validator.addMethod("ems_validate_lo_value", function(value, element) {
    	var result = false;
    	var hiValue = parseFloat(AlarmConfigNormalUtil.getTxtHiStatus().val());
        value = parseFloat(value);
    	if (value < hiValue )  {
    		result = true;
        }
        return result;
    }, "Lo value cannot greater than Hi value");
    jQuery.validator.addMethod("ems_validate_lolo_value", function(value, element) {
    	var result = false;
    	var loValue = parseFloat(AlarmConfigNormalUtil.getTxtLoStatus().val());
        value = parseFloat(value);
        if(value == 0 )
        	result = true;
        else
        	{
        	if (value < loValue)  {
        		result = true;
        	}
        }
        return result;
    }, "LoLo value cannot greater than Lo value");

    /* Start using for alarm of i12 */
//    jQuery.validator.addMethod("ems_cloud_validate_hi_value", function(value, element) {
//    	var result = false;
//    	var hihiValue = parseFloat(AlarmConfigCloudUtil.getTxtHiHiStatus().val());
//        value = parseFloat(value);
//    	if (value < hihiValue)  {
//    		result = true;
//        }
//        return result;
//    }, "Hi value cannot greater than HiHi value");
//    jQuery.validator.addMethod("ems_cloud_validate_lo_value", function(value, element) {
//    	var result = false;
//    	var hiValue = parseFloat(AlarmConfigCloudUtil.getTxtHiStatus().val());
//        value = parseFloat(value);
//    	if (value < hiValue )  {
//    		result = true;
//        }
//        return result;
//    }, "Lo value cannot greater than Hi value");
//    jQuery.validator.addMethod("ems_cloud_validate_lolo_value", function(value, element) {
//    	var result = false;
//    	var loValue = parseFloat(AlarmConfigCloudUtil.getTxtLoStatus().val());
//        value = parseFloat(value);
//        if(value == 0 )
//        	result = true;
//        else
//        	{
//        	if (value < loValue)  {
//        		result = true;
//        	}
//        }
//        return result;
//    }, "LoLo value cannot greater than Lo value");
    /* End using for alarm of i12 */
    // vanchung.nguyen ADD END
    
    //custom validation for account management form START
    // thanhuy.nguyen END START
    jQuery.validator.addMethod("ems_validate_fax", function(value, element) {
        if (value != "") {
            return ValidationUtil.validate_n_except(value, [ CHARACTER_PLUS,
                                       CHARACTER_DOT, "-" ]);
        }
        return true;
    }, "Please enter valid fax");
    // thanhuy.nguyen END END
    //custom validation for account management form END
    
    jQuery.validator.addMethod("ems_validate_start_time", function(value, element) {
    	if(value === '') {
    		 return false;
    	}
     	return /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
    }, "Please enter valid time, time input should be used format 'HH:mm'");

    jQuery.validator.addMethod("ems_validate_date_time", function(value, element) {
    	return moment(value).isValid();
    }, "Please enter valid time!");
    
}();

var CounterUtils = function() {
	return {
//        startAscendingCounter : function(seconds, callback) {
//            console.log("CounterUtils:: start ascending counter ... ");
//        },
        startDescendingCounter : function(seconds, isStop, callback) {
            console.log("CounterUtils:: start descending counter ... ");
            seconds = parseInt(seconds);
            var counter = seconds + 1;
            var id = setInterval(function() {
//                console.log("Interval:: " + id + " execute descending counter every " + seconds + " seconds...");
                --counter;
                var strTime = CounterUtils.getStrTime(counter);
//                console.log(strTime);
                if (counter === 0) {
                    callback(id, counter, strTime, true);
                    if(isStop === true) {
                        CounterUtils.clearCounter(id);
                    } else {
                        counter = seconds + 1;
                    }
                } else {
                    callback(id, counter, strTime, false);
                }
            }, 1000);
            return id;
        },
        clearCounter : function(id) {
            console.log("Clear counter " + id);
            clearInterval(id);
        },
        getTime : function(seconds) {
            var hours = parseInt(seconds / 3600);
            var remainingSeconds = seconds % 3600;
            var minutes = parseInt(remainingSeconds / 60);
            remainingSeconds = seconds % 60;
            var ret = {
                h : hours,
                m : minutes,
                s : remainingSeconds
            };
            return ret;
        },
        getStrTime : function(seconds) {
            var time = CounterUtils.getTime(seconds);
            var h = time['h'];
            var m = time['m'];
            var s = time['s'];

            var HOUR_MAPPING = EmsUtil.getHourMapping();
            var MINUTE_MAPPING = EmsUtil.getMinuteMapping();
            var SECOND_MAPPING = EmsUtil.getSecondMapping();

            var strHour = HOUR_MAPPING[h];
            var strMinute = MINUTE_MAPPING[m];
            var strSecond = SECOND_MAPPING[s];

            var strResult = "";
            if (strHour != undefined) {
                strResult += strHour;
            }
            if (strMinute != undefined) {
                if (strResult != "") {
                    strResult += ":";
                    strResult += strMinute;
                } else {
//                    if (strMinute != "00") {
                        strResult += strMinute;
//                    }
                }
            }
            if (strSecond != undefined) {
                if (strResult != "") {
                    strResult += ":";
                }
                strResult += strSecond;
            }
            return strResult;
        },
	};
}();
 