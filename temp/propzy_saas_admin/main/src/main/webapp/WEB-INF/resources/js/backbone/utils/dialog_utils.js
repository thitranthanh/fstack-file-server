var DialogUtil = function () {

    var STATUS_SUCCESS = 1;
    var STATUS_WARNING = 0;
    var STATUS_ERROR = -1;
    var STATUS_CONFIRM = -2;

    return {
        getStatusSuccess: function () {
            return STATUS_SUCCESS;
        },
        getStatusWarning: function () {
            return STATUS_WARNING;
        },
        getStatusError: function () {
            return STATUS_ERROR;
        },
        getStatusConfirm: function () {
            return STATUS_CONFIRM;
        },
        isStatusSuccess: function (status) {
            return status === STATUS_SUCCESS;
        },
        hideAll: function () {
            bootbox.hideAll();
        },
        /**
         * status : 1 - success 0 - warning -1 - error other : custom
         * 
         * @param status
         * @param msg
         * @param title
         * @returns
         */
        alertResult: function (status, msg, callback, title) {
            var titleTemp = title;
            var titleHtml = "";
            if (status === STATUS_SUCCESS || status === true) {
                if (titleTemp === undefined) {
                    titleTemp = "Successful!";
                }
                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-success fade in">';
                titleHtml += "<h4><i class=\"fa fa-check-square-o\"></i> "
                    + titleTemp + "</h4>";
                titleHtml += '</div>';
            } else if (status === STATUS_WARNING) {
                if (titleTemp === undefined) {
                    titleTemp = "Warning!";
                }
                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-warning fade in">';
                titleHtml += "<h4><i class=\"fa fa-exclamation-circle\"></i> "
                    + titleTemp + "</h4>";
                titleHtml += '</div>';
            } else if (status === STATUS_ERROR || status === false) {
                if (titleTemp === undefined) {
                    titleTemp = "Error!";
                }
                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-danger fade in">';
                titleHtml += "<h4><i class=\"fa fa-times\"></i> " + titleTemp
                    + "</h4>";
                titleHtml += '</div>';
            }
            bootbox.dialog({
                message: msg,
                title: titleHtml,
                // className : "class-with-width",
                // remove close button
                closeButton: false,
                buttons: {
                    danger: {
                        label: "Close",
                        // className : "btn-default",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                        callback: callback,
                    },
                }
            });
        },
        alertResponses: function (resp, successCallback, params) {
            var respCodes = resp['respCodes'];
            var respParams = resp['params'];
            if (respParams !== undefined) {
                params = respParams;
            }
            var msg = "";
            for (var i = 0, n = respCodes.length; i < n; i++) {
                if (i != 0) {
                    msg += "<br/>";
                }
                var subMessage = EmsUtil.getMessage(respCodes[i]);
                if (params != undefined) {
                    var subParams = params[i];
                    msg += EmsUtil.formatMessage(subMessage, subParams);
                } else {
                    msg += subMessage;
                }
            }
            DialogUtil.alertResult(resp['status'], msg, successCallback);
            //            bootbox.alert(msg, function() {
            //                if (typeof successCallback === 'function') {
            //                    successCallback();
            //                }
            //            });
        },
        alert: function (msg, callback) { // xuanluc.le | modify: 25/04/2014 | add parameter: msg and callback
            //thanhuy.nguyen MODIFY START
            //            bootbox.alert(msg, callback);
            bootbox.alert({
                buttons: {
                    ok: {
                        label: "OK",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                    }
                },
                callback: function () {
                    if (typeof callback != 'undefined') {
                        callback();
                    }
                },
                message: msg
            });
            //thanhuy.nguyen MODIFY END
        },
        //        alertError : function(callback) {
        //            //thanhuy.nguyen MODIFY START
        ////            bootbox.alert(EmsUtil.getMessage("-1"), callback);
        //            bootbox.alert({
        //                buttons : { 
        //                    ok : {
        //                        label : "OK",
        //                        className : EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
        //                    }
        //                },
        //                callback : function() {
        //                    if (typeof callback != 'undefined') {
        //                        callback();
        //                    }
        //                },
        //                message : EmsUtil.getMessage("-1")
        //            });
        //            //thanhuy.nguyen MODIFY END
        //        },
        confirm: function (msg, okCallback, cancelCallback) {
            //thanhuy.nguyen MODIFY START
            //            bootbox.confirm(msg, function(result) {
            //                if (result == true) {
            //                    okCallback();
            //                } else {
            //                    if (typeof cancelCallback != 'undefined') {
            //                        cancelCallback();
            //                    }
            //                }
            //            });
            bootbox.confirm({
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                    },
                    confirm: {
                        label: "OK",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        okCallback();
                    } else {
                        if (typeof cancelCallback != 'undefined') {
                            cancelCallback();
                        }
                    }
                },
                message: msg
            });
        },
        showDialogDeleteConfirm: function (username, cancelCallback, yesCallback) {
            var msg = "<div class='form-group' style='margin-bottom: 15px'>";
            msg += "<label style='min-width: 120px; margin-top:8px;' class='col-md-1 control-label'>Username :</label>";
            msg += "<input type='text' class='form-control' value='" + username + "' id='txtUsernameConfirm' style='width: 180px;' readonly/>";
            msg += "</div>";
            msg += "<div class='form-group' style='margin-bottom: 15px'>";
            msg += "<label style='min-width: 120px; margin-top:8px;' class='col-md-1 control-label'>Password :</label>";
            msg += "<input type='password' class='form-control' id='txtPasswordConfirm' autocomplete='off' style='width: 180px;'/>";
            msg += "<span id='spanTxtPasswordError' class='report-error-span' style='margin-left: 120px; display:none'>Password is incorrect</span>";
            msg += "</div>";
            bootbox.dialog({
                message: msg,
                title: "You need administrator permission to perform this action. Please enter administrator password:",
                closeButton: false,
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                        callback: cancelCallback,
                    },
                    confirm: {
                        label: "Yes",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: yesCallback,
                    }
                },
            });
            setTimeout(function () {
                $("#txtPasswordConfirm").focus();
            }, 300);
        },
        showDialogSetValueControlPanel: function (parameterName, cancelCallback, noCallback, okCallback) {
            var msg = "<label style='min-width: 80px; margin-top:8px; margin-left:120px;' class='col-md-1 control-label'>Value</label>";
            msg += "<input type='text' class='form-control' id='txtValue' maxlength='50' style='width: 110px;'/>";
            msg += "<span id='spanTxtValueError' class='report-error-span' style='margin-left:200px; display:none'>Please enter value</span>";
            bootbox.dialog({
                message: msg,
                title: "Set data to parameter '" + parameterName + "'",
                closeButton: false,
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0] + " btnCancel",
                        callback: cancelCallback,
                    },
                    danger: {
                        label: "No",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_BACK[0] + " btnNo",
                        callback: noCallback,
                    },
                    confirm: {
                        label: "<i class=\"fa fa-refresh fa-spin\" style=\"display:none\"></i> OK",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0] + " btnOK",
                        callback: okCallback,
                    }
                },
            });

            setTimeout(function () {
                $("#txtValue").focus();
            }, 300);
        },
        showDialogChooseDateFormat: function (okCallback) {
            var msg = "<label style='min-width: 110px; margin-top: 6px;' class='col-md-1 control-label'>Date Format</label>";
            msg += "<select id='selectDateFormat' style='min-width: 220px'></select>";
            bootbox.dialog({
                message: msg,
                title: "Choose Date Format",
                closeButton: false,
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                    },
                    confirm: {
                        label: "OK",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: okCallback,
                    }
                },
            });
        },
        showDialogCheckSmsServer: function (okCallback) {
            var msg = "<div id='divShowDialogCheckSms'>";
            msg += "<label class='control-label col-md-3' style='margin-top: 5px;'>Contact Number</label>"
            msg += "<input type='text' class='form-control col-md-2' id='txtContactNumber' style='width: 220px;'/>";
            msg += "<i style='color: #61d8ff; margin-top: 10px; margin-left: 20px;'></i>";
            msg += "</div>";
            msg += "<br>";
            msg += "<div class='col-md-12'>"
            msg += "<span id='spanMessageCheckSms'></span>";
            msg += "</div>"
            bootbox.dialog({
                message: msg,
                title: "Check SMS Server",
                closeButton: false,
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                    },
                    confirm: {
                        label: "<i class='fa fa-refresh fa-spin' style='display: none;'></i> OK",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: okCallback,
                    }
                },
            });

            setTimeout(function () {
                $("#txtContactNumber").focus();
            }, 300);
        },
        showDialogCheckMailServer: function (okCallback) {
            var msg = "<div id='divShowDialogCheckMail' style='margin-bottom: 15px;'>";
            msg += "<label class='control-label col-md-3' style='margin-top: 5px;'>Your email:</label>"
            msg += "<input type='text' class='form-control col-md-2' id='txtEmailAddress' style='width: 220px;'/>";
            msg += "<i style='color: #61d8ff; margin-top: 10px; margin-left: 20px;'></i>";
            msg += "</div>";
            //            msg += "<br>";
            //            msg += "<div class='col-md-12'>"
            //            msg += "<span id='spanMessageCheckMail'></span>";
            //            msg += "</div>"
            bootbox.dialog({
                message: msg,
                title: "Check Mail Server",
                closeButton: false,
                buttons: {
                    cancel: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                    },
                    confirm: {
                        label: "<i class='fa fa-refresh fa-spin' style='display: none;'></i> Send",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: okCallback,
                    }
                },
            });

            setTimeout(function () {
                $("#txtEmailAddress").focus();
            }, 300);
        },
        showDialog: function (title, htmlContent, okLabel, okCallback,
            cancelCallback, cancelLabel) {
            if (!okLabel) {
                okLabel = "Submit";
            }
            if (!cancelLabel) {
                cancelLabel = "Cancel";
            }
            // bootbox.dialog({
            return bootbox.dialog({
                message: htmlContent,
                title: title,
                //                className : "class-with-width",
                // remove close button
                closeButton: false,
                buttons: {
                    danger: {
                        label: cancelLabel,
                        // className : "btn-default",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0] + ' cancelModalBtn',
                        callback: cancelCallback,
                    },
                    main: {
                        label: okLabel,
                        //                        className: "btn-primary",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0] + ' submitModalBtn',
                        callback: okCallback,
                    }
                }
            });
        },
        showDialogImport: function (title, htmlContent, okCallback, cancelCallback) {
            bootbox.dialog({
                message: htmlContent,
                title: title,
                closeButton: false,
                buttons: {
                    danger: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                        callback: cancelCallback,
                    },
                    main: {
                        label: "Import",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: okCallback,
                    }
                }
            });
        },
        //        hubspot : function (msg) {
        //			var mytheme = $('input[name=theme]:checked').val();
        //			var mypos = $('input[name=position]:checked').val();
        //			//Set theme
        //			Messenger.options = {
        //				extraClasses: 'messenger-fixed '+ mypos,
        //				theme: mytheme
        //			};
        //			//Call
        //			Messenger().post({
        //				message: msg,
        //				showCloseButton: true
        //			});
        //        },
        //        confirmResponses : function(resp, params, okCallback, cancelCallback) {
        //            var respCodes = resp['respCodes'];
        //            var msg = "";
        //            for ( var i = 0, n = respCodes.length; i < n; i++) {
        //                if(i != 0) {
        //                    msg += "<br/>";
        //                }
        //                var subMessage = EmsUtil.getMessage(respCodes[i]);
        //                if(params != undefined) {
        //                    var subParams = params[i];
        //                    msg += EmsUtil.formatMessage(subMessage, subParams);
        //                } else {
        //                    msg += subMessage;
        //                }
        //            }
        //            DialogUtil.confirmResult(resp['clientStatus'], msg, okCallback, cancelCallback);
        //        },
        alertResponse: function (resp, successCallback) {

            var msg = EmsUtil.formatMessage(EmsUtil.getMessage(resp.respCode),
                resp.params);
            DialogUtil.alertResult(resp['status'], msg, successCallback);
            //            bootbox.alert(msg, function() {
            //                if (typeof successCallback === 'function') {
            //                    successCallback();
            //                }
            //            });
        },
        //        alertResponses : function(resp, successCallback, params) {
        //            // alertResponses
        //            var respCodes = resp['respCodes'];
        //            var msg = "";
        //            for ( var i = 0, n = respCodes.length; i < n; i++) {
        //                if(i != 0) {
        //                    msg += "<br/>";
        //                }
        //                var subMessage = EmsUtil.getMessage(respCodes[i]);
        //                if(params != undefined) {
        //                    var subParams = params[i];
        //                    msg += EmsUtil.formatMessage(subMessage, subParams);
        //                } else {
        //                    msg += subMessage;
        //                }
        //            }
        //            DialogUtil.alertResult(resp['clientStatus'], msg, successCallback);
        ////            bootbox.alert(msg, function() {
        ////                if (typeof successCallback === 'function') {
        ////                    successCallback();
        ////                }
        ////            });
        //        },
        //        showDialog : function(title, htmlContent, okCallback, cancelCallback) {
        ////            html = "";
        ////            html += "<div class='box-body'>";
        ////                html += "<form class='form-horizontal ' action='#'>";
        ////                    html += "<div class='form-group'>";
        ////                        html += "<label class='col-md-2 control-label'>Textarea:</label>"; 
        ////                        html += "<div class='col-md-10'><textarea rows='3' cols='5' name='textarea' class='form-control'></textarea></div>";
        ////                    html += "</div>";
        ////                    html += "<div class='form-group'>";
        ////                        html += "<label class='col-md-2 control-label'>Autosize textarea:</label>"; 
        ////                        html += "<div class='col-md-10'><textarea rows='3' cols='5' name='textarea' class='autosize form-control'></textarea><span class='help-block'>Keep pressing Enter button to expand the textarea</span></div>";
        ////                    html += "</div>";
        ////                    html += "<div class='form-group'>";
        ////                        html += "<label class='col-md-2 control-label'>With character counter:</label>"; 
        ////                        html += "<div class='col-md-10'> <textarea rows='3' cols='5' name='textarea' class='countable form-control' data-limit='100'></textarea> <p class='help-block'>You have <span id='counter'></span> characters left.</p> </div>";
        ////                    html += "</div>";
        ////                html += "</form>";
        ////            html += "</div>";
        //            bootbox.dialog({
        //                message : htmlContent,
        //                title : title,
        //                buttons : {
        //                    // success: {
        //                    // label: "Success!",
        //                    // className: "btn-success",
        //                    // callback: function() {
        //                    // Example.show("great success");
        //                    // }
        //                    // },
        //                    danger : {
        //                        label : "Cancel",
        //                        //thanhuy.nguyen MODIFY START
        ////                      className : "btn-default",
        //                      className : EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
        //                      //thanhuy.nguyen MODIFY END
        //                        callback : cancelCallback,
        //                    },
        //                    main : {
        //                        label : "Acknowledge",
        //                        //thanhuy.nguyen MODIFY START
        ////                      className: "btn-primary",
        //                      className : EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
        //                      //thanhuy.nguyen MODIFY END
        //                        callback : okCallback,
        //                    }
        //                }
        //            });
        //        },
        showDialogNew: function (title, htmlContent, okLabel, okCallback, cancelCallback,
            cancelLabel) {
            if (!okLabel) {
                okLabel = "Submit";
            }
            if (!cancelLabel) {
                cancelLabel = "Cancel";
            }
            // minhnhut.pham add-map modify start
            //          bootbox.dialog({
            return bootbox.dialog({
                // minhnhut.pham add-map modify end
                message: htmlContent,
                title: title,
                //                className : "class-with-width",
                // remove close button
                closeButton: false,
                buttons: {
                    danger: {
                        label: cancelLabel,
                        //thanhuy.nguyen MODIFY START
                        //                      className : "btn-default",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0] + " cancelModalBtn",
                        //thanhuy.nguyen MODIFY END
                        callback: cancelCallback,
                    },
                    main: {
                        label: okLabel,
                        //thanhuy.nguyen MODIFY START
                        //                      className: "btn-primary",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0] + " submitModalBtn",
                        //thanhuy.nguyen MODIFY END
                        callback: okCallback,
                    }
                }
            });
        },
        showCustomDialog: function (title, htmlContent, successButton, dangerButton, mainButton) {
            var buttons = {};
            if (successButton != undefined) {
                buttons["success"] = successButton;
            }
            if (dangerButton != undefined) {
                buttons["danger"] = dangerButton;
            }
            if (mainButton != undefined) {
                buttons["main"] = mainButton;
            }
            return bootbox.dialog({
                message: htmlContent,
                title: title,
                closeButton: false,
                buttons: buttons
            });
        },
        //      //thanhuy.nguyen ADD START
        showDialogAboutSoftware: function (title, htmlContent, okLabel, okCallback) {
            bootbox.dialog({
                message: htmlContent,
                title: title,
                closeButton: false,
                buttons: {
                    main: {
                        label: okLabel,
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: okCallback,
                    }
                }
            });
        },
        showDialogExportHistory: function (title, htmlContent, okCallback, cancelCallback) {
            bootbox.dialog({
                message: htmlContent,
                title: title,
                closeButton: false,
                buttons: {
                    danger: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                        callback: cancelCallback,
                    },
                    main: {
                        label: "Export",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: okCallback,
                    }
                }
            });
        },
        //      //thanhuy.nguyen ADD END
        //      /**
        //       * status : 1 - success
        //       *          0 - warning
        //       *          -1 - error
        //       *          other : custom
        //       * @param status
        //       * @param msg
        //       * @param title
        //       * @returns
        //       */
        //      confirmResult : function(status, msg, okCallback, cancelCallback, title) {
        //            var titleTemp = title;
        //            var titleHtml = "";
        //            if (status === STATUS_SUCCESS || status === true) {
        //                if(titleTemp === undefined) {
        //                    titleTemp = "Successful!";
        //                }
        //                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-success fade in">';
        //                titleHtml +=    "<h4><i class=\"fa fa-check-square-o\"></i> "+titleTemp+"</h4>";
        //                titleHtml += '</div>';
        //            } else if(status === STATUS_WARNING) {
        //                if(titleTemp === undefined) {
        //                    titleTemp = "Warning!";
        //                }
        //                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-warning fade in">';
        //                titleHtml +=    "<h4><i class=\"fa fa-exclamation-circle\"></i> "+titleTemp+"</h4>";
        //                titleHtml += '</div>';
        //            } else if(status === STATUS_CONFIRM) {
        //                /*if(titleTemp === undefined) {
        //                    titleTemp = "Confirm!";
        //                }
        //                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-info fade in">';
        //                titleHtml +=    "<h4><i class=\"fa fa-question\"></i> "+titleTemp+"</h4>";
        //                titleHtml += '</div>';*/
        //            } 
        //            else if(status === STATUS_ERROR || status === false) {
        //                if(titleTemp === undefined) {
        //                    titleTemp = "Error!";
        //                }
        //                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-danger fade in">';
        //                titleHtml +=    "<h4><i class=\"fa fa-times\"></i> "+titleTemp+"</h4>";
        //                titleHtml += '</div>';
        //            }
        //
        //            var buttons = {
        //                    danger : {
        //                        label : "Close",
        //                        //thanhuy.nguyen MODIFY START
        ////                      className : "btn-default",
        //                      className : EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
        //                      //thanhuy.nguyen MODIFY END
        //                        callback : okCallback,
        //                    },
        //            };
        //            if(status === STATUS_CONFIRM || status === STATUS_WARNING) {
        //            	buttons = {
        //                	success: {
        //                    	label: "OK",
        //                    	//thanhuy.nguyen MODIFY START
        ////                      className: "btn-primary",
        //                      className : EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
        //                      //thanhuy.nguyen MODIFY END
        //                    	callback: okCallback
        //                    },
        //                    danger : {
        //                        label : "Cancel",
        //                        //thanhuy.nguyen MODIFY START
        ////                      className : "btn-default",
        //                      className : EMS_CONSTS.DEFAULT.BUTTONS.BTN_INVERSE[0],
        //                      //thanhuy.nguyen MODIFY END
        //                        callback : cancelCallback
        //                    },
        //                };
        //            };
        //            
        //            bootbox.dialog({
        //                message : msg,
        //                title : titleHtml,
        //                closeButton : false,
        //                buttons : buttons,
        //            });
        //            
        //            
        //        },
        //         // vanchung.nguyen add start for import file excel
        showResponses: function (resp, yesCallback, noCallback, cancelCallback, params) {
            // alertResponses
            var respCodes = resp['respCodes'];
            var msg = "";
            for (var i = 0, n = respCodes.length; i < n; i++) {
                if (i != 0) {
                    msg += "<br/>";
                }
                var subMessage = EmsUtil.getMessage(respCodes[i]);
                if (params != undefined) {
                    var subParams = params[i];
                    msg += EmsUtil.formatMessage(subMessage, subParams);
                } else {
                    msg += subMessage;
                }
            }
            DialogUtil.showResult(resp['status'], msg, yesCallback, noCallback, cancelCallback);
            //            bootbox.alert(msg, function() {
            //                if (typeof successCallback === 'function') {
            //                    successCallback();
            //                }
            //            });
        },
        showResult: function (status, msg, yesCallback, noCallback, cancelCallback, title) {
            var titleTemp = title;
            var titleHtml = "";
            if (status === STATUS_SUCCESS || status === true) {
                if (titleTemp === undefined) {
                    titleTemp = "Successful!";
                }
                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-success fade in">';
                titleHtml += "<h4><i class=\"fa fa-check-square-o\"></i> " + titleTemp + "</h4>";
                titleHtml += '</div>';
            } else if (status === STATUS_WARNING) {
                if (titleTemp === undefined) {
                    titleTemp = "Warning!";
                }
                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-warning fade in">';
                titleHtml += "<h4><i class=\"fa fa-exclamation-circle\"></i> " + titleTemp + "</h4>";
                titleHtml += '</div>';
            } else if (status === STATUS_ERROR || status === false) {
                if (titleTemp === undefined) {
                    titleTemp = "Error!";
                }
                titleHtml += '<div style="margin-bottom:0px; padding:5px;" class="alert alert-block alert-danger fade in">';
                titleHtml += "<h4><i class=\"fa fa-times\"></i> " + titleTemp + "</h4>";
                titleHtml += '</div>';
            }
            bootbox.dialog({
                message: msg,
                title: titleHtml,
                // className : "class-with-width",
                // remove close button
                closeButton: false,
                buttons: {
                    danger: {
                        label: "Cancel",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_INVERSE[0],
                        callback: cancelCallback,
                    },
                    main: {
                        label: "No",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_PRIMARY[0],
                        callback: noCallback
                    },
                    success: {
                        label: "Yes",
                        className: EMS_CONSTS.SKINS.DEFAULT.BUTTONS.BTN_SUCCESS[0],
                        callback: yesCallback,
                    },
                }
            });
        },
        //        // vanchung.nguyen add end for import file excel
        alertResultError: function (msg, callback) {
            return DialogUtil.alertResult(STATUS_ERROR, msg, callback);
        },
        alertResultWarning: function (msg, callback) {
            return DialogUtil.alertResult(STATUS_WARNING, msg, callback);
        },
        //        // vanchung.nguyen add start | 9-5-2014
        //        alertResultSuccess : function(msg, callback) {
        //            return DialogUtil.alertResult(STATUS_SUCCESS, msg, callback);
        //        },
        //        // vanchung.nguyen add end
    };
}();
/**
 * using alert
 *          DialogUtil.alert("alert msg", function() {
                alert("ok");
            });
*/
/**
 * using confirm
 *          DialogUtil.confirm("confirm msg", function() {
                alert("ok");
            }, function() {
                alert("cancel");
            });
*/

/**
 * use jQuery BlockUI Plugin
 */
var AjaxLoadingUtil = function () {
    return {
        blockUI: function () {
            $.blockUI({
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });
        },
        unblockUI: function () {
            $.unblockUI();
        }
    };
}();

/* begin thanhthi.tran */

/**
 * noty - A jQuery Notification Plugin
 */
var EMSNoty = function () {

    var NOTY_TYPE = {
        "success": "success",
        "error": "error",
        "warning": "warning",
        "information": "information",
        "confirmation": "confirmation",
        "alert": "alert",
        "alarm": "alarm"
    };
    //thanhuy.nguyen ADD START
    var NOTY_ICON = {
        "success": "fa fa-check-circle",
        "error": "fa fa-times-circle",
        "warning": "fa fa-exclamation-triangle",
        "information": "fa fa-exclamation-circle",
        "confirmation": "fa fa-exclamation-circle",
        "alert": "fa fa-exclamation-circle",
        "alarm": "fa fa-bell"
    };
    //thanhuy.nguyen ADD END
    var NOTY_LAYOUT = {
        "top": "top",
        "topLeft": "topLeft",
        "topCenter": "topCenter",
        "topRight": "topRight",
        "center": "center",
        "centerLeft": "centerLeft",
        "centerRight": "centerRight",
        "bottom": "bottom",
        "bottomLeft": "bottomLeft",
        "bottomCenter": "bottomCenter",
        "bottomRight": "bottomRight"
    };

    var timeout = 10000;/* miliseconds */

    var defaultLayout = NOTY_LAYOUT.bottomRight;
    var defaultType = NOTY_TYPE.information;

    return {
        //thanhuy.nguyen ADD START
        getNotyLayout: function () {
            return NOTY_LAYOUT;
        },
        getNotyType: function () {
            return NOTY_TYPE;
        },
        getNotyIcon: function () {
            return NOTY_ICON;
        },
        //thanhuy.nguyen ADD END
        generateNoty: function (text, type, layout) {
            type = type || defaultType;
            layout = layout || defaultLayout;
            var n = noty({
                text: text,
                type: type,
                dismissQueue: true,
                killer: false,
                modal: false,
                force: true,
                layout: layout,
                theme: 'defaultTheme',
                maxVisible: 10
            });
            return n;
        },

        close: function (noty) {
            setTimeout(function () {
                $.noty.close(noty.options.id);
            }, timeout);
        },

        showNotyWithTimeout: function (text, type, layout) {
            var _noty = EMSNoty.generateNoty(text, type, layout);
            EMSNoty.close(_noty);
        },

        show: function (text, timestamp, type, layout) {
            switch (type) {
                case NOTY_TYPE.success:
                    this.success(text, timestamp, layout);
                    break;
                case NOTY_TYPE.error:
                    this.error(text, timestamp, layout);
                    break;
                case NOTY_TYPE.warning:
                    this.warning(text, timestamp, layout);
                    break;
                case NOTY_TYPE.alarm:
                    this.alarm(text, timestamp, layout);
                    break;
                case NOTY_TYPE.information:
                    this.information(text, timestamp, layout);
                    break;
                default:
                    this.alert(text, timestamp, layout);
                    break;
            }
        },

        success: function (text, timestamp, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.success); // Add Noty Desktop
            timestamp = (timestamp === undefined)
                ? new Date() : new Date(timestamp);
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.success + '"></i> Success</strong>'
                + '<span style="float: right;"><i class="fa fa-clock-o"></i> <span data-livestamp=\"' + timestamp + '\"></span></span><br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.success, layout);
        },

        error: function (text, timestamp, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.error); // Add Noty Desktop
            timestamp = (timestamp === undefined)
                ? new Date() : new Date(timestamp);
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.error + '"></i> Error</strong>'
                + '<span style="float: right;"><i class="fa fa-clock-o"></i> <span data-livestamp=\"' + timestamp + '\"></span></span><br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.error, layout);
        },

        warning: function (text, timestamp, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.warning); // Add Noty Desktop
            timestamp = (timestamp === undefined)
                ? new Date() : new Date(timestamp);
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.warning + '"></i> Warning</strong>'
                + '<span style="float: right;"><i class="fa fa-clock-o"></i> <span data-livestamp=\"' + timestamp + '\"></span></span><br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.warning, layout);
        },

        alarm: function (text, timestamp, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.warning); // Add Noty Desktop
            timestamp = (timestamp === undefined)
                ? new Date() : new Date(timestamp);
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.alarm + '"></i> Alarm</strong>'
                + '<span style="float: right;"><i class="fa fa-clock-o"></i> <span data-livestamp=\"' + timestamp + '\"></span></span><br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.warning, layout);
        },

        information: function (text, timestamp, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.information); // Add Noty Desktop
            timestamp = (timestamp === undefined)
                ? new Date() : new Date(timestamp);
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.information + '"></i> Information</strong>'
                + '<span style="float: right;"><i class="fa fa-clock-o"></i> <span data-livestamp=\"' + timestamp + '\"></span></span><br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.information, layout);
        },

        alert: function (text, timestamp, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.alert); // Add Noty Desktop
            timestamp = (timestamp === undefined)
                ? new Date() : new Date(timestamp);
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.alert + '"></i> Alert</strong>'
                + '<span style="float: right;"><i class="fa fa-clock-o"></i> <span data-livestamp=\"' + timestamp + '\"></span></span><br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.alert, layout);
        },

        successLiveView: function (text, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.success); // Add Noty Desktop
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.success + '"></i> Success</strong>'
                + '<br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.success, layout);
        },

        errorLiveView: function (text, layout) {
            EMSDesktopNoty.show(text, NOTY_TYPE.error); // Add Noty Desktop
            text = '<strong style="float: left;"><i class="' + NOTY_ICON.error + '"></i> Error</strong>'
                + '<br/>'
                + '<hr style="background-color: #D1DED5; height: 1px;"/><p style="float: left;">' + text + "</p>";
            EMSNoty.showNotyWithTimeout(text, NOTY_TYPE.error, layout);
        },

    };

}();
/* end thanhthi.tran */


/**
 * ****************************************************************************************************
 * 
 * Notification Desktop ~ of MDN ()
 * 
 * ****************************************************************************************************
 */
var EMSDesktopNoty = function () {
    var browserActive = true;
    var notyTimeOutDefault = 5000;

    var pathIcon = './resources/img/favicon/';
	/*var pathIcon = './resources/img/daviteq-icon/common/';
	var iconNoti = pathIcon + 'notifications-icon.png';*/
    var iconNotification = pathIcon + 'EMS_favicon 64-01-01.png';
    var iconSuccess = pathIcon + 'notification-success.png';
    var iconWarning = pathIcon + 'notification-error.png';
    var iconAlarm = pathIcon + 'notification-warning.png';
    var iconInformation = pathIcon + 'notification-alarm.png';
    var iconAlert = pathIcon + 'notification-information.png';
    var iconAlert = pathIcon + 'notification-alert.png';

    var NOTY_TYPE = {
        "success": "success",
        "error": "error",
        "warning": "warning",
        "information": "information",
        "confirmation": "confirmation",
        "alert": "alert",
        "alarm": "alarm"
    };

    var soundNameNoty = 'sound-alarm-detail';

    return {
        showNotification: function (title, body, icon, timeOut) {
            //		    console.log("browser active " + this.isBrowserActive());
            /* if brower is active => not show notify */
            if (this.isBrowserActive()) {
                return;
            }

            /* Check Browser support */
            if (!this.isBrowserSupport()) {
                DialogUtil.alert("This browser does not support desktop notification");
                return;
            }

            /* Check Permission */
            if (!this.isAllow()) {
                Notification.requestPermission(function (status) {
                    if (Notification.permission !== status) {
                        Notification.permission = status;
                    }

                    if (status === 'granted') {
                        EMSDesktopNoty.generateNotification(title, body, icon, timeOut);
                    }
                });
            } else {
                EMSDesktopNoty.generateNotification(title, body, icon, timeOut);
            }
        },
        generateNotification: function (title, body, icon, timeOut) {
            //			WebSpeaker.playSoundById(soundNameNoty);
            var notification = new Notification(title, { body: body, icon: icon });

            if (timeOut === undefined) {
                timeOut = notyTimeOutDefault;
            }
            setTimeout(function () {
                notification.close();
                //				WebSpeaker.stopSoundById(soundNameNoty);
            }, timeOut);
        },
        show: function (body, type) {
            switch (type) {
                case NOTY_TYPE.success:
                    this.success(body);
                    break;
                case NOTY_TYPE.error:
                    this.error(body);
                    break;
                case NOTY_TYPE.warning:
                    this.warning(body);
                    break;
                case NOTY_TYPE.alarm:
                    this.alarm(body);
                    break;
                case NOTY_TYPE.information:
                    this.information(body);
                    break;
                default:
                    this.alert(body);
                    break;
            }
        },
        success: function (body, timeOut) {
            this.showNotification('Success', body, iconNotification, timeOut);
        },
        error: function (body, timeOut) {
            this.showNotification('Error', body, iconNotification, timeOut);
        },
        warning: function (body, timeOut) {
            this.showNotification('Warning', body, iconNotification, timeOut);
        },
        alarm: function (body, timeOut) {
            this.showNotification('Alarm', body, iconNotification, timeOut);
        },
        information: function (body, timeOut) {
            this.showNotification('Information', body, iconNotification, timeOut);
        },
        alert: function (body, timeOut) {
            this.showNotification('Alert', body, iconNotification, timeOut);
        },
        setBrowserActive: function (status) {
            browserActive = status;
        },
        isBrowserActive: function () {
            return browserActive;
        },
        handleCheckBrowserActive: function () {
            window.onfocus = function () {
                //				console.log('isBrowserActive = true');
                EMSDesktopNoty.setBrowserActive(true);
            };
            window.onblur = function () {
                //				console.log('isBrowserActive = false');
                EMSDesktopNoty.setBrowserActive(false);
            };
        },
        askPermissionForNotification: function () {
            if (this.isBrowserSupport() && !this.isAllow()) {
                Notification.requestPermission(function (status) {
                    if (Notification.permission !== status) {
                        Notification.permission = status;
                    }
                });
            }
        },
        isBrowserSupport: function () {
            if (window.Notification) {
                return true;
            }
            return false;
        },
        isAllow: function () {
            if (Notification.permission === 'granted') {
                return true;
            }
            return false;
        },
    };
}();
