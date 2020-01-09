var RoleService = function() {
    
    var ROLES = "web/controller/authenticated/roles";
    
    var TEMPLATES = undefined;
    
    return {
        getListRoleDataModel : function(onsuccess, options) {
            var url = ROLES + "/list-role-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getAddRoleDataModel : function(onsuccess, options) {
            var url = ROLES + "/add-role-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getEditRoleDataModel : function(roleId, onsuccess, options) {
            var url = ROLES + "/edit-role-data-model/role-id/" + roleId;
            AjaxUtils.doGet(url, onsuccess, options);
        },
        addRole : function(roleDataModel, onsuccess, options) {
            var data = {
                data : JSON.stringify(roleDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPost(ROLES, onsuccess, options);
        },
        updateRole : function(roleDataModel, onsuccess, options) {
            var data = {
                data : JSON.stringify(roleDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPut(ROLES, onsuccess, options);
        },
        deleteRole : function(roleId, onsuccess, options) {
            var url = ROLES + "/role-id/" + roleId;
            AjaxUtils.doDelete(url, onsuccess, options);
        },
        loadTemplates : function() {
            var dfd = jQuery.Deferred();
            if(TEMPLATES != undefined) {
                dfd.resolve(TEMPLATES);
            } else {
                RequireJSUtils.loadRoleModuleTemplates([
                     "list-role.htm", "add-role.htm", "list-function.htm"], 
                     function(listRoleTpl, addRoleTpl, listFunctionTpl) {
                         TEMPLATES = {
                             listRoleTpl : listRoleTpl,
                             addRoleTpl : addRoleTpl,
                             listFunctionTpl : listFunctionTpl,
                         };
                         dfd.resolve(TEMPLATES);
                     }
                );
            }
            return dfd.promise();
        },
        showRoleListView : function() {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getListRoleDataModel(function(roleDataModel) {
                    var targetView = new RoleListView({
                        templates : templates,
                        roleDataModel : roleDataModel
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
    };
}();

// role list view start
var RoleListView = Backbone.View.extend({

    initialize : function(options) {
        this.MSG_CONFIRM_DELETE = InspiniaCommonUtil.getMessage("ROLE_103");
        
        var templates = options["templates"];
        this.templates = templates;
        
        var roleDataModel = options["roleDataModel"];
        
        this.tpl = templates["listRoleTpl"];
        this.setRoles(roleDataModel["roles"]);
        
        var breadcrumb = RoleConsts.getListRoleBreadcrumb();
        InspiniaCommonUtil.renderBreadcrumb(RoleConsts.getBreadcrumbHeader(), breadcrumb);
        this.prepareData();
    },
    events : {
        "click button[id='btnAdd']" : "showAddRole",
    },
    render : function() {
        var myself = this;
        var authorities = SessionManager.getRoleModuleAuthorities();
        var renderHtml = _.template(myself.tpl, {
            roles : myself.getRoles(),
            authorities : authorities
        });
        return this.$el.html(renderHtml);
    },
    getRoles : function() {
        var ret = this.roles;
        if(ret == undefined) {
            ret = [];
        }
        return ret;
    },
    setRoles : function(roles) {
        this.roles = roles;
    },
    getFunctionsByRoleId : function(roleId) {
        var functions = [];
        var roles = this.getRoles();
        for(var i=0; i<roles.length; i++) {
            var role = roles[i];
            if(role["roleId"] == roleId) {
                var temp = role["functions"];
                if(temp != undefined) {
                    functions = temp;
                }
                break;
            }
        }
        return functions;
    },
    prepareData : function() {
        var myself = this;
        var authorities = SessionManager.getRoleModuleAuthorities();
        
        var isAdd = authorities["isAdd"];
        var isUpdate = authorities["isUpdate"];
        var isDelete = authorities["isDelete"];

        var roles = myself.getRoles();
        for(var i=0; i<roles.length; i++) {
            var role = roles[i];
        }
    },
    pageReady : function() {
        var authorities = SessionManager.getRoleModuleAuthorities();
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
        
        $('#tblRoles').DataTable({
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
    viewFunctions : function(e) {
        var myself = this;
        var target = $(e);
        var roleId = target.attr("role-id");
        var functions = this.getFunctionsByRoleId(roleId);
        var renderHtml = _.template(this.templates["listFunctionTpl"], {
            functions : functions
        });
        var buttons = {
            close : {
                className : "btn-default",
                label : "Close",
            }
        }
        InspiniaDialogUtil.showDialog("List Functions Of '"+roleId+"'", 
                renderHtml, buttons);
        return false;
    },
    close : function() {
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
});
// role list view end