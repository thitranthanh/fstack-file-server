var GroupService = function() {
    
    var GROUPS = "web/controller/authenticated/groups";
    
    var TEMPLATES = undefined;
    
    return {
        getListGroupDataModel : function(onsuccess, options) {
            var url = GROUPS + "/list-group-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getAddGroupDataModel : function(onsuccess, options) {
            var url = GROUPS + "/add-group-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getEditGroupDataModel : function(groupId, onsuccess, options) {
            var url = GROUPS + "/edit-group-data-model/group-id/" + groupId;
            AjaxUtils.doGet(url, onsuccess, options);
        },
        addGroup : function(groupDataModel, onsuccess, options) {
            var data = {
                data : JSON.stringify(groupDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPost(GROUPS, onsuccess, options);
        },
        updateGroup : function(groupDataModel, onsuccess, options) {
            var data = {
                data : JSON.stringify(groupDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPut(GROUPS, onsuccess, options);
        },
        deleteGroup : function(groupId, onsuccess, options) {
            var url = GROUPS + "/group-id/" + groupId;
            AjaxUtils.doDelete(url, onsuccess, options);
        },
        loadTemplates : function() {
            var dfd = jQuery.Deferred();
            if(TEMPLATES != undefined) {
                dfd.resolve(TEMPLATES);
            } else {
                RequireJSUtils.loadGroupModuleTemplates([
                     "list-group.htm", "add-group.htm"], 
                     function(listGroupTpl, addGroupTpl) {
                         TEMPLATES = {
                             listGroupTpl : listGroupTpl,
                             addGroupTpl : addGroupTpl,
                         };
                         dfd.resolve(TEMPLATES);
                     }
                );
            }
            return dfd.promise();
        },
        showGroupListView : function() {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getListGroupDataModel(function(groupDataModel) {
                    var targetView = new GroupListView({
                        templates : templates,
                        groupDataModel : groupDataModel
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
        showGroupAddView : function() {
            var myself = this;
            var btnLoading = $("#btnAdd");
            myself.loadTemplates().done(function(templates) {
                myself.getAddGroupDataModel(function(groupDataModel) {
                    var targetView = new GroupView({
                        templates : templates,
                        groupDataModel : groupDataModel,
                        isViewAdd : true
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
        showGroupEditView : function(groupId) {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getEditGroupDataModel(groupId, function(groupDataModel) {
                    var targetView = new GroupView({
                        templates : templates,
                        groupDataModel : groupDataModel
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
    };
}();

// group list view start
var GroupListView = Backbone.View.extend({

    initialize : function(options) {
        this.MSG_CONFIRM_DELETE = InspiniaCommonUtil.getMessage("GROUP_103");
        
        var templates = options["templates"];
        this.templates = templates;
        
        var groupDataModel = options["groupDataModel"];
        
        this.tpl = templates["listGroupTpl"];
        this.setGroups(groupDataModel["groups"]);
        
        var breadcrumb = GroupConsts.getListGroupBreadcrumb();
        InspiniaCommonUtil.renderBreadcrumb(GroupConsts.getBreadcrumbHeader(), breadcrumb);
        this.prepareData();
    },
    events : {
        "click button[id='btnAdd']" : "showAddGroup",
    },
    render : function() {
        var myself = this;
        var authorities = SessionManager.getGroupModuleAuthorities();
        var renderHtml = _.template(myself.tpl, {
            groups : myself.getGroups(),
            authorities : authorities
        });
        return this.$el.html(renderHtml);
    },
    getGroups : function() {
        var ret = this.groups;
        if(ret == undefined) {
            ret = [];
        }
        return ret;
    },
    getGroupByGroupId : function(groupId) {
        var ret = undefined;
        var groups = this.getGroups();
        for(var i=0; i<groups.length; i++) {
            var group = groups[i];
            if(group["id"] == groupId) {
                ret = group;
                break;
            }
        }
        if(ret == undefined) {
            ret = {};
        }
        return ret;
    },
    setGroups : function(groups) {
        this.groups = groups;
    },
    prepareData : function() {
        var myself = this;
        var authorities = SessionManager.getGroupModuleAuthorities();
        
        var isAdd = authorities["isAdd"];
        var isUpdate = authorities["isUpdate"];
        var isDelete = authorities["isDelete"];

        var groups = myself.getGroups();
        for(var i=0; i<groups.length; i++) {
            var group = groups[i];
        }
    },
    pageReady : function() {
        var authorities = SessionManager.getGroupModuleAuthorities();
        var hasActionButtons = 
            authorities['isView'] || authorities['isUpdate'] || authorities['isDelete'];
        
        var aoColumns = [];
        var order = [];
        if(hasActionButtons) {
            aoColumns = [
                         { sWidth: '1%', "bSortable": false },
                         { "bSortable": true },
                         { "bSortable": true },
                       ];
            order = [[ 1, "asc" ]];
        } else {
            aoColumns = [
                         { "bSortable": true },
                         { "bSortable": true },
                       ];
            order = [[ 0, "asc" ]];
        }
        
        $('#tblGroups').DataTable({
//            dom: '<"html5buttons"B>lTfgitp',
            buttons: [
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {extend: 'print',
                 customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                }
                }
            ],
            "aoColumns": aoColumns,
            "order": order,
        });
    },
    reloadListGroup : function (){
        GroupService.showGroupListView();
        return false;
    },
    showAddGroup : function(e) {
        var myself = this;
        router.navigateToAddGroup();
        return false;
    },
    editGroup : function(e) {
        var myself = this;
        var target = $(e);
        var groupId = target.attr("group-id");
        router.navigateToEditGroup(groupId);
        return false;
    },
    deleteGroup : function(e) {
        var myself = this;
        var target = $(e);
        var groupId = target.attr("group-id");
        var group = myself.getGroupByGroupId(groupId);
        var msg = InspiniaCommonUtil.formatMessage(
                this.MSG_CONFIRM_DELETE, [group["name"]]);
        
        InspiniaDialogUtil.confirm(msg, function() {
            GroupService.deleteGroup(groupId, function(result) {
                InspiniaCommonUtil.showResponses(result);
                myself.reloadListGroup();
            });
        });
        return false;
    },
    close : function() {
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
});
// group list view end

// group view start
var GroupView = Backbone.View.extend({
    
    initialize : function(options) {
        this.MSG_CONFIRM_ADD = InspiniaCommonUtil.getMessage("GROUP_101");
        this.MSG_CONFIRM_UPDATE = InspiniaCommonUtil.getMessage("GROUP_102");
        this.MSG_CONFIRM_CANCEL = InspiniaCommonUtil.getMessage("GROUP_109");
        
        var templates = options["templates"];
        var groupDataModel = options["groupDataModel"];
        this.setGroupDataModel(groupDataModel);
        
        var isViewAdd = options["isViewAdd"];
        this.isViewAdd = isViewAdd;
        
        this.tpl = templates["addGroupTpl"];
        
        var breadcrumb = [];
        if(isViewAdd) {
            breadcrumb = GroupConsts.getAddGroupBreadcrumb();
        } else {
            breadcrumb = GroupConsts.getEditGroupBreadcrumb();
        }
        InspiniaCommonUtil.renderBreadcrumb(GroupConsts.getBreadcrumbHeader(), breadcrumb);
    },
    render : function() {
        var authorities = SessionManager.getGroupModuleAuthorities();
        var isAdd = authorities["isAdd"];
        var isUpdate = authorities["isUpdate"];
        var title = "";
        var canEdit = true;
        
        if(this.isViewAdd) {
            title = "Add Group";
        } else {
            if(isUpdate) {
                title = "Edit Group";
            } else {
                canEdit = false;
                title = "View Group";
            }
        }
        var disabled = (canEdit)?"":"disabled";
        
        var renderHtml = _.template(this.tpl, {
            isViewAdd : this.isViewAdd,
            authorities : authorities,
            group : this.getGroup(),
            roles : this.getRoles(),
            title : title,
            canEdit : canEdit,
            disabled : disabled
        });
        return this.$el.html(renderHtml);
    },
    events : {
        "click button[id='btnSubmit']" : "submit",
        "click button[id='btnBack']" : "back"
    },
    getGroupDataModel : function() {
        return this.groupDataModel;
    },
    setGroupDataModel : function(groupDataModel) {
        return this.groupDataModel = groupDataModel;
    },
    getGroup : function() {
        var ret = undefined;
        try {
            ret = this.getGroupDataModel()["group"];
        } catch(ex) {
        }
        if(ret == undefined) {
            ret = {};
        }
        return ret;
    },
    getUsers : function() {
        return this.getGroupDataModel()["users"];
    },
    getRoles : function() {
        return this.getGroupDataModel()["roles"];
    },
    getUsersOfGroup : function() {
        return this.getGroupDataModel()["usersOfGroup"];
    },
    getTxtName : function() {
        return $("#txtName");
    },
    getTxtDescription : function() {
        return $("#txtDescription");
    },
    getSelectUser : function() {
        return $("#selectUser");
    },
    getFormData : function() {
        var txtName = this.getTxtName();
        var txtDescription = this.getTxtDescription();
        var selectUser = this.getSelectUser();
        
        var isFormValid = true;
        if(txtName.val() == "") {
            isFormValid = false;
            InspiniaCommonUtil.showFormRequiredError(txtName);
        } else {
            InspiniaCommonUtil.hideFormError(txtName);
        }
        
        var groupDataModel = undefined;
        if(isFormValid) {
            var group = {
                    name : txtName.val(),
                    description : txtDescription.val()
            };
            if(!this.isViewAdd) {
                group["id"] = this.getGroup()["id"];
            }
            
            var usersOfGroup = selectUser.val();
            if(usersOfGroup == null || usersOfGroup == undefined) {
                usersOfGroup = [];
            }
            
            var rolesOfGroup = [];
            var selectRoles = $(".select-role");
            for(var i=0; i<selectRoles.length; i++) {
                var selectRole = $(selectRoles[i]);
                var roleId = selectRole.attr("role-id");
                var functions = selectRole.val();
                if(functions != null && functions != undefined && functions.length > 0) {
                    rolesOfGroup.push({
                        "roleId" : roleId,
                        "funtionsOfUser" : functions
                    });
                }
            }
            
            groupDataModel = {
                "group" : group,
                "usersOfGroup" : usersOfGroup,
                "rolesOfGroup" : rolesOfGroup
            };
        }
        return groupDataModel;
    },
    submit : function(e) {
        var myself = this;
        var groupDataModel = myself.getFormData();
        if(groupDataModel != undefined) {
            if(this.isViewAdd) {
                var msg = this.MSG_CONFIRM_ADD;
                InspiniaDialogUtil.confirm(msg, function() {
                    GroupService.addGroup(groupDataModel, function(result) {
                        if(InspiniaCommonUtil.showResponses(result)) {
                            router.navigateToListGroup();
                        }
                    }, AjaxUtils.blockUILoadingAjax());
                });
            } else {
                var msg = this.MSG_CONFIRM_UPDATE;
                InspiniaDialogUtil.confirm(msg, function() {
                    GroupService.updateGroup(groupDataModel, function(result) {
                        if(InspiniaCommonUtil.showResponses(result)) {
                            router.navigateToListGroup();
                        }
                    }, AjaxUtils.blockUILoadingAjax());
                });
            }
        }
        return false;
    },
    back : function() {
        var myself = this;
        var msg = this.MSG_CONFIRM_CANCEL;
        InspiniaDialogUtil.confirm(msg, function() {
            router.navigateToListGroup();
        });
        return false;
    },
    pageReady : function() {
        this.$el.find(".error").hide();
        var selectUser = this.getSelectUser();

        var selectedUsers = [];
        if(!this.isViewAdd) {
            var usersOfGroup = this.getUsersOfGroup();
            for(var i=0; i<usersOfGroup.length; i++) {
                selectedUsers.push(usersOfGroup[i]);
            }
        }
        
        var users = this.getUsers();
        var selectUserOptions = {
            "data-key" : "id",
            "data-text" : "fullName",
            "has-place-holder" : true,
            "place-holder" : "Select user",
            "selected-key" : selectedUsers,
        };
        InspiniaFormUtil.setSelect2(users, selectUser, selectUserOptions);
        
        var roles = this.getRoles();
        for(var i=0; i<roles.length; i++) {
            var role = roles[i];
            var roleId = role["roleId"];
            var selectRole = $("#select-role-"+roleId);
            var functions = role["functions"];
            var selectedPermissions = [];
            if(!this.isViewAdd) {
                selectedPermissions = role["funtionsOfUser"];
            }
            var selectFunctionOptions = {
                "data-key" : "permissionId",
                "data-text" : "permissionName",
                "has-place-holder" : true,
                "place-holder" : "Select permission",
                "selected-key" : selectedPermissions,
            };
            InspiniaFormUtil.setSelect2(functions, selectRole, selectFunctionOptions);
        }
    },
    close : function() {
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
});
// group view end