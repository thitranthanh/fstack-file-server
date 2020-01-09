var FunctionService = function() {
    var _SERVER_FUNCTION_URL = "authenticated/functions";
    var _SERVER_FUNCTION_LIST_FUNCTION_BY_ROLE_ID_URL = _SERVER_FUNCTION_URL + "/functions-by-roleId";
    var _SERVER_FUNCTION_ADD_URL = _SERVER_FUNCTION_URL + "/add";
    var _SERVER_FUNCTION_UPDATE_URL = _SERVER_FUNCTION_URL + "/update";
    var _SERVER_FUNCTION_DELETE_URL = _SERVER_FUNCTION_URL + "/delete";
    var _SERVER_FUNCTION_GET_BY_KEY_URL = _SERVER_FUNCTION_URL + "/edit";
    var _SERVER_FUNCTION_CHECK_ID_EXISTED_URL = _SERVER_FUNCTION_URL + "/check-id-existed";
    // START BASIC_INFO_SERVICE
    var _SERVER_BASIC_ROLE_BY_ID_URL = "authenticated/basic/getRole"; 
    // END BASIC_INFO_SERVICE
    return {
        // START BASIC_INFO_SERVICE
        getRoleByIdInfoService : function(roleId,onsuccess, options){
            var url = _SERVER_BASIC_ROLE_BY_ID_URL + "/" + roleId;
            AjaxUtils.doGet(url, onsuccess, options);
        },
        // END BASIC_INFO_SERVICE
        
        getListFunctionByRoleId : function(roleId,onsuccess, options) {
            var url =  _SERVER_FUNCTION_LIST_FUNCTION_BY_ROLE_ID_URL + "/" + roleId;
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getFunctionEdit : function(roleId,permissionId,onsuccess, options){
            var url =  _SERVER_FUNCTION_GET_BY_KEY_URL + "/" + roleId + "/" + permissionId;
            AjaxUtils.doGet(url, onsuccess, options);
        },
        addFunction : function(roleId,permissionId,permissionName, onsuccess) {
            var options = {
                data : {
                    roleId : roleId,
                    permissionId : permissionId,
                    permissionName : permissionName
                }
            };
            options = $.extend({}, options, AjaxUtils.blockUIAjax());
            AjaxUtils.doPost(_SERVER_FUNCTION_ADD_URL, onsuccess, options);
        },
        
        updateFunction : function(functionObjectOld,functionObjectNew, onsuccess) {
            var options = {
                data : {
                    functionObjectOld : JSON.stringify(functionObjectOld),
                    functionObjectNew : JSON.stringify(functionObjectNew)
                }
            };
            options = $.extend({}, options, AjaxUtils.blockUIAjax());
            AjaxUtils.doPost(_SERVER_FUNCTION_UPDATE_URL, onsuccess, options);
        },
        
        checkFunctionKeyExisted : function(roleId,permissionId,isAdd,functionObject,onsuccess){
            var url =  _SERVER_FUNCTION_CHECK_ID_EXISTED_URL + "/" + roleId + "/" + permissionId + "/" + isAdd + "/" + JSON.stringify(functionObject);
            var options = {};
            AjaxUtils.doGet(url, onsuccess, options);
        },
        
        deleteFunction : function(roleId,permissionId, onsuccess) {
            var options = {
                data : {
                    roleId : roleId,
                    permissionId : permissionId,
                }
            };
            options = $.extend({}, options, AjaxUtils.blockUIAjax());
            AjaxUtils.doPost(_SERVER_FUNCTION_DELETE_URL, onsuccess, options);
        },
        
        showFunctionAddView : function(roleId) { 
            var myself = this;
            myself.getRoleByIdInfoService(roleId,function(role){
                RequireJSUtils.loadAddFunctionTemplate(function(tpl) {
                    router.showView(mainContent, new FunctionView({
                        tpl : tpl,
                        roleId : roleId,
                        role : role
                    }));
                });
            }, AjaxUtils.blockUIAjax());
        },
        
        showFunctionEditView : function(roleId,permissionId) {
            var myself = this;
            myself.getRoleByIdInfoService(roleId,function(role){
                myself.getFunctionEdit(roleId,permissionId,function(functionObject){
                    RequireJSUtils.loadAddFunctionTemplate(function(tpl) {
                        router.showView(mainContent, new FunctionView({
                            tpl : tpl,
                            roleId : roleId,
                            permissionId : permissionId,
                            functionObject : functionObject,
                            role : role,
                        }));
                    });
                });
            }, AjaxUtils.blockUIAjax());
        },
        
        showFunctionListView : function(roleId) { 
            var myself = this;
            myself.getListFunctionByRoleId(roleId,function(functionObects){
                RequireJSUtils.loadListFunctionTemplate(function(tpl) {
                    router.showView(mainContent, new FunctionListView({
                        tpl : tpl,
                        roleId : roleId,
                        functionObects : functionObects
                    }));
                });
            }, AjaxUtils.blockUIAjax());
        },
       
    };
}();

var FunctionViewUtil = function() {
    var ICON_IMAGE = {
        modbusCommandIcon : IconUtil.getModbusCommandIcon(),
        modbusConfigIcon : IconUtil.getModbusConfigIcon(),
        actionIcon : IconUtil.getActionIcon(),
        editIcon : IconUtil.getEditIcon(),
        deleteIcon : IconUtil.getDeleteIcon()
    };
  
    return {
        getIconsImage : function(){
            return ICON_IMAGE;
        },
        getViewState : function(state) {
            var viewState = {};
            var headerText = "";
            var btnSubmitText = "";
            var iconSource = "";
            if (state == EmsUtil.getViewStateEdit()) {
                headerText = "Edit Function";
                btnSubmitText = "Save Changes";
                iconSource = "resources/img/daviteq-icon/common/edit-white-04.png";
            } else if (state == EmsUtil.getViewStateAdd()) {
                headerText = "Add Function";
                btnSubmitText = "Save";
                iconSource = "resources/img/daviteq-icon/common/new-white-04.png";
            } else {
                headerText = "View Function";
                iconSource = "resources/img/daviteq-icon/common/view_white_02.png";
            }
            viewState["headerText"] = headerText;
            viewState["btnSubmitText"] = btnSubmitText;
            viewState["iconSource"] = iconSource;
            return viewState;
        },
        getLblBtnAction : function(authorities) {
            var lblBtnAction = {};
            var lblViewEdit = "";
            var iconView =  {};
    
            if (authorities.isUpdate)  {
                lblViewEdit = "Edit";
                iconView = EmsUtil.getCurrentSkin().BUTTONS.BTN_EDIT[1];
            }
            else if (authorities.isView) {
                lblViewEdit = "View";
                iconView = EmsUtil.getCurrentSkin().BUTTONS.BTN_VIEW[1];
            } 
           

            lblBtnAction["lblViewEdit"] = lblViewEdit;
            lblBtnAction["iconView"] = iconView;

            return lblBtnAction;
        },
       
    };
}();

var FunctionView = Backbone.View.extend({ 
    initialize : function(options) {
        // START MESSAGE CODE
        this.MSG_CONFIRM_RETURN_TO_LIST_FUNCTION = MessageMapping["Function_7"];
        // END MESSAGE CODE
        //start reference Object
        this.viewUtil = FunctionViewUtil;
        this.viewService = FunctionService;
        //end reference Object
        
        this.tpl = options.tpl;
//        var functionObject = options['functionObject'];
        var functionObject = {};
        var permissionId = options.permissionId;
        var roleId = options.roleId;
        var role = options.role;
        var roleName = role.name;
        var isViewAdd = (permissionId === undefined) || permissionId === "";
        var viewState = {};
        
        var authorities = UserClientSession.getFunctionModuleAuthorities();
        var actionButtons = UserClientSession.getCommonAuthorizedButtons(authorities);
        
        if(isViewAdd) {
            viewState = this.viewUtil.getViewState(EmsUtil.getViewStateAdd());
            EmsUtil.renderBreadcrumb([EMS_CONSTS.BREADCRUMB.FUNCTION_MANAGEMENT,
                                      EMS_CONSTS.BREADCRUMB.ADD_FUNCTION]);
        } else {
            if(actionButtons.btnViewOrEdit.text.toUpperCase() == EmsUtil.getViewStateEdit()){
                viewState = this.viewUtil.getViewState(EmsUtil.getViewStateEdit());
                EmsUtil.renderBreadcrumb([EMS_CONSTS.BREADCRUMB.FUNCTION_MANAGEMENT,
                                          EMS_CONSTS.BREADCRUMB.EDIT_FUNCTION]);
            } else {
                viewState = this.viewUtil.getViewState(EmsUtil.getViewStateView());
                EmsUtil.renderBreadcrumb([EMS_CONSTS.BREADCRUMB.FUNCTION_MANAGEMENT,
                                          EMS_CONSTS.BREADCRUMB.VIEW_FUNCTION]);
            }
            functionObject = options['functionObject'];
        }
        
        this.roleName = roleName;
        this.role = role;
        this.isViewAdd = isViewAdd;
        this.viewState = viewState;
        this.roleId = roleId;
        this.permissionId = permissionId;
        this.functionObject = functionObject;
    },
    render : function() {
//        var functionAuthorities = UserClientSession.getFunctionModuleAuthorities();
        var isShowBtnSubmit = UserClientSession
        .isShowBtnSubmit(UserClientSession.getFunctionModuleAuthorities());
        var renderHtml = _.template(this.tpl, {
            isShowBtnSubmit : isShowBtnSubmit,
            skin : EmsUtil.getCurrentSkin(),
            functionObject : this.functionObject,
            iconImage : this.viewUtil.getIconsImage(),
            viewState : this.viewState,
            roleName : this.roleName,
            validationRules : FunctionAddFormWizard.getValidationRules(),
        });
        return this.$el.html(renderHtml);
    },
    events : {
        "click a[name='btnCancelFunction']" : "returnListFunction",
        "click a[name='btnSubmitFunction']" : "submitFunction",
       
    },
    getTxtRoleName : function(){
        return $('#txtRoleName');
    },
    getTxtPermissionId : function(){
        return $('#txtPermissionId');
    },
    getTxtPermissionName : function(){
        return $('#txtPermissionName');
    },
    returnListFunction : function(){
        var myself = this;
        $("#btnCancelFunction").blur();
        var roleId = myself.roleId;
        var confirmMsg = EmsUtil.formatMessage(myself.MSG_CONFIRM_RETURN_TO_LIST_FUNCTION, 
                []);
        DialogUtil.confirm(confirmMsg, function() {
            router.navigateToListFunction(roleId);
        });
        return false;
    },
   
    submitFunction : function(){
        var myself = this;
        var confirmMsg;
        var isAddFunction = this.isViewAdd;
        if(isAddFunction) {
            confirmMsg = MessageMapping["Function_4"];
        } else {
            confirmMsg = MessageMapping["Function_5"];
        }
        var roleId = myself.roleId;
        var permissionId = myself.getTxtPermissionId().val();
        var permissionName = myself.getTxtPermissionName().val();
        
        var functionObjectNew = {
            permissionName : permissionName,
            primaryKey : {
                roleId : roleId,
                permissionId : permissionId
            },
        };
        
        FunctionAddFormWizard.validateFunctionForm().done(function (result) {
            if(result){
                confirmMsg = EmsUtil.formatMessage(confirmMsg, 
                        [permissionName]);
                DialogUtil.confirm(confirmMsg, function() {
                    if (isAddFunction) {
                        myself.viewService.addFunction(roleId,permissionId,permissionName, function(result) {
                            myself.showAddOrUpdateFunctionResult(result);
                        });
                    } else {
                        myself.viewService.updateFunction(myself.functionObject,functionObjectNew, function(result) {
                            myself.showAddOrUpdateFunctionResult(result);
                        });
                    }
                });
            }
        });
        $("#btnAddOrUpdateFunction").blur();
        $("input").blur();
        return false;
    },
    showAddOrUpdateFunctionResult : function(result) {
        var status = result['status'];
        var myself = this;
        var roleId = myself.roleId;
        DialogUtil.alertResponses(result, function() {
            if(DialogUtil.isStatusSuccess(status)) {
                router.navigateToListFunction(roleId);
            }
        });
    },
    pageReady : function() {
        var myself = this; 
        FunctionAddFormWizard.init();
        var isViewAdd = myself.isViewAdd;
        var roleName = myself.roleName;
        myself.getTxtRoleName().attr('readonly', 'true');
        myself.getTxtRoleName().val(roleName);
        
        if(!isViewAdd){
            var functionObject = myself.functionObject;
            var permissionId = functionObject.primaryKey.permissionId;
            var permissionName = functionObject.permissionName;
            
            myself.getTxtRoleName().val();
            myself.getTxtPermissionId().val(permissionId); 
            myself.getTxtPermissionName().val(permissionName); 
        }
        EmsUtil.setFocus("txtPermissionId");
        EmsUtil.bindSubmitForm($(".press-enter"));
    },
    close : function() {
        delete this.viewState;
        delete this.user;
        delete this.tpl;
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
    
});

var FunctionListView = Backbone.View.extend({ 
    initialize : function(options) {
        // START MESSAGE CODE
        this.MSG_CONFIRM_DELETE_FUNCTION = MessageMapping["Function_6"];
        // END MESSAGE CODE
        
        this.tpl = options.tpl;
        var roleId = options['roleId'];
        var functionObjects = options['functionObects'];
     
        //start reference Object
        this.viewUtil = FunctionViewUtil;
        this.viewService = FunctionService;
        //end reference Object
        
        this.roleId = roleId;
        this.functionObjects = functionObjects;
        
        EmsUtil.renderBreadcrumb([EMS_CONSTS.BREADCRUMB.FUNCTION_MANAGEMENT,
                                  EMS_CONSTS.BREADCRUMB.LIST_FUNCTION]);
        this.updateUserData();
    },
    render : function() {
        var functionAuthorities = UserClientSession.getFunctionModuleAuthorities();
        var hasActionColumn = functionAuthorities.isView
                || functionAuthorities.isUpdate
                    || functionAuthorities.isDelete;
        var btnAdd = UserClientSession.getAuthorizedButtonAdd(functionAuthorities, "Add Function");
        var renderHtml = _.template(this.tpl, {
            functionAuthorities : functionAuthorities,
            skin : EmsUtil.getCurrentSkin(),
            btnAdd : btnAdd,
            functionObjects : this.functionObjects,
            iconImage : this.viewUtil.getIconsImage(),
            lblBtnAction : this.viewUtil.getLblBtnAction(functionAuthorities),
            hasActionColumn : hasActionColumn,
        });
        return this.$el.html(renderHtml);
    },
    events : {
        "click button[name='btnAddFunction']" : "addFunction",
//        "click a[name='btnEditFunction']" : "editFunction",
        "click a[name='btnDeleteFunction']" : "deleteFunction",
        "click a[name='btnReload']" : "reloadListFunction",
        // thanhuy.nguyen 0000062 add start 
        "click button[name='btnReturnListRoles']" : "returnListRoles",
        // thanhuy.nguyen 0000062 add end
    },
    // thanhuy.nguyen 0000062 add start 
    returnListRoles : function(){
        router.navigateToListRole();
        return false;
    },
    // thanhuy.nguyen 0000062 add end 
    updateUserData : function() {
        var authorities = UserClientSession.getFunctionModuleAuthorities();
        for(var i=0; i<this.functionObjects.length; i++) {
            var functionObject = this.functionObjects[i];
            var actionButtons = UserClientSession.getCommonAuthorizedButtons(authorities);
            functionObject['actionButtons'] = actionButtons;
            functionObject['editLink'] = router.routerMapping.getRouterEditFunction(this.roleId, functionObject['id']);
        }
    },
    reloadListFunction : function(){
        var myself = this;
        var roleId = myself.roleId;
        this.viewService.showFunctionListView(roleId);
        return false;
    },
    addFunction : function(){
        var myself = this;
        var roleId = myself.roleId;
        router.navigateToAddFunction(roleId);
        return false;
    },
//    editFunction : function(e){
//        var target = $(e.currentTarget);
//        var roleId = target.attr("roleId");
//        var functionId = target.attr("functionId");
//        router.navigateToEditFunction(roleId,functionId);
//        
//        return false;
//    },
    deleteFunction : function(e){
        var myself = this;
        var target = $(e.currentTarget);
        target.blur();
        var roleId = target.attr("roleId");
        var permissionId = target.attr("functionId");
        var functionName = target.attr("functionName");
        var confirmMsg = EmsUtil.formatMessage(myself.MSG_CONFIRM_DELETE_FUNCTION, 
                [functionName]);
        DialogUtil.confirm(confirmMsg, function() {
            myself.viewService.deleteFunction(roleId,permissionId, function(result) {
                var status = result['status'];
                DialogUtil.alertResponses(result, function() {
                    if(DialogUtil.isStatusSuccess(status)) {
                        myself.reloadListFunction();
                    }
                });
            });
        });
        return false;
    },
    pageReady : function() {
        $('#datatable1').DataTable({
            "sPaginationType" : "bs_four_button",
            stateSave: true,
            "bAutoWidth": false,
            "aoColumns": [{ "bSortable": false, sWidth: '1px'},{sWidth: '30%'},{sWidth: '30%'},{sWidth: '40%'}],
            "aaSorting": [[ 1, "asc" ]],
        });
        $('.datatable').each(
                function() {
                    var datatable = $(this);
                    // SEARCH - Add the placeholder for Search and Turn this
                    // into in-line form control
                    var search_input = datatable.closest('.dataTables_wrapper')
                            .find('div[id$=_filter] input');
                    search_input.attr('placeholder', 'Search');
                    search_input.addClass('form-control input-sm');
                    // LENGTH - Inline-Form control
                    var length_sel = datatable.closest('.dataTables_wrapper')
                            .find('div[id$=_length] select');
                    length_sel.addClass('form-control input-sm');
        });
    },
    close : function() {
        delete this.viewState;
        delete this.user;
        delete this.tpl;
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
    
});

//var sampleUserDataFunction = function() {
//    var currentView = router.currentView;
//    currentView.getTxtName().keyup(function(e) {
//        if ((e.ctrlKey && e.keyCode == 81) || (e.ctrlKey && e.keyCode == 65)) {
//            var unique = EmsUtil.getRandomInt(1000,9999);
//            currentView.getTxtName().val("Parameter " + unique);
//            currentView.getTxtExpression().val("(a + b)*2");
//            currentView.getTxtAddress().val("1122");
//        }
//    });
//};

var FunctionAddFormWizard = function () {
    var functionWizform = null;
    var functionValidationRules = {
        "permissionId" : {
            required: true,
            maxlength : 45,
            digits : true,
        },
        "permissionName" : {
            required: true,
            maxlength : 45
        },
    };
    
    return {
        getValidationRules : function() {
            return functionValidationRules;
        },
        highlightAddress : function(isExisted, e) {
            if(isExisted) {
                FormWizardUtils.highlight(e, "The permission id is existed.");
            } else {
                FormWizardUtils.unhighlight(e);
            }
        },
        init: function () {
            
            
            var myself = this;
            
            if (!jQuery().bootstrapWizard) {
                return;
            }
            // debug code start
//            sampleUserDataFunction();
            // debug code end
            functionWizform = $('#functionWizform');
                
            functionWizform.validate({
                doNotHideMessage: true,
                onkeyup: false,
//                onfocusout: false,
                errorClass: 'error-span',
                errorElement: 'span',
                rules: functionValidationRules,
                //messages: userValidationMessages,
                highlight: function (element) { 
                    FormWizardUtils.highlight(element);
                },
                unhighlight: function (element) {
                    FormWizardUtils.unhighlight(element);
                },
                success: function (label) {
                    FormWizardUtils.success(label);
                }
            });
            

        },
        validateFunctionForm : function(){
//          return functionWizform.valid();
            var deferred = $.Deferred();
            var myself = this;
            var functionViewAdd = router.currentView;
            var isViewAdd = functionViewAdd.isViewAdd;
            
            if(functionWizform.valid() == false){
                return deferred.resolve(false);
            }
            
            var targetPermissionId = functionViewAdd.getTxtPermissionId();
            var permissionId = targetPermissionId.val();
            var roleId = functionViewAdd.roleId;
            var functionObject = functionViewAdd.functionObject;
            var loading = functionWizform.find(".loading");
            var btnSubmitFunction= $("#btnAddOrUpdateFunction");
            loading.show();
            btnSubmitFunction.attr("disabled", "disabled");
            
            functionViewAdd.viewService.checkFunctionKeyExisted(roleId,permissionId,isViewAdd,functionObject,function(isExisted){
                loading.hide();
                btnSubmitFunction.removeAttr("disabled");
                myself.highlightAddress(isExisted,targetPermissionId);
                if (isExisted) {
                    myself.highlightAddress(isExisted,targetPermissionId);
                } else {
                    deferred.resolve(true);
                }
            });
            
            return deferred.promise();
            
        }
    };
}();