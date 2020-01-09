var RouterMapping = function() {
    
    var ROUTER_ADD_CONST = "new";
    var ROUTER_EDIT_CONST = "edit";
    
    return {
        buildUrl : function(args) {
            var url = "";
            try {
                for(var i=0; i<args.length; i++) {
                    url+="/";
                    url+=args[i];
                }
            } catch(ex) {
                console.log(ex);
            }
            return url;
        },
        // url : users
        getRouterListUser : function() {
            return "users";
        },
        // url : users/new
        getRouterAddUser : function() {
            return this.getRouterListUser() + this.buildUrl([ROUTER_ADD_CONST]);
        },
        // url : users/edit/:userId
        getRouterEditUser : function(id) {
            return this.getRouterListUser() + this.buildUrl([ROUTER_EDIT_CONST, id]);
        },
        // url : users/assignGroup/:userId
        getRouterAssignUserToGroup : function(id) {
            return this.getRouterListUser() + this.buildUrl([id, "assign-group"]);
        },
        // url : my-profile
        getRouterMyProfile : function() {
            return "my-profile";
        },
        // url : groups
        getRouterListGroup : function() {
            return "groups";
        },
        // url : groups/new
        getRouterAddGroup : function() {
            return this.getRouterListGroup() + this.buildUrl([ROUTER_ADD_CONST]);
        },
        // url : groups/edit/:groupId
        getRouterEditGroup : function(id) {
            return this.getRouterListGroup() + this.buildUrl([ROUTER_EDIT_CONST, id]);
        },
        // url : roles
        getRouterListRole : function() {
            return "roles";
        },
        // url: roles/:roleId/functions
        getRouterListFunction : function(id) {
            return this.getRouterListRole() + this.buildUrl([id, "functions"]);
        },
        // url : action-logs
        getRouterListActionLog : function() {
            return "action-logs";
        },
    };
}();

window.AppRouter = Backbone.Router.extend({
    registerRoute : function(url, name) {
        this.route(url, name);
    },
    moveTo : function(route) {
//        var currentRoute = Backbone.history.fragment;
//        if(route == currentRoute) {
//            Backbone.history.loadUrl();
//            return;
//        }
//        router.navigate(route, { trigger : true, replace: true });
        router.navigate(route, { trigger : true });
    },
//    moveToOnTree : function(route) {
//      var currentRoute = Backbone.history.fragment;
//      if(route == currentRoute) {
//          Backbone.history.loadUrl();
//          return;
//      }
//      router.navigate(route, { trigger : true, replace: true });
//    },
    showView : function(selector, view) {
        if (this.currentView !== undefined) {
            this.currentView.close();
        }
        this.currentView = view;
        $(selector).html(this.currentView.render());
        if(this.currentView.pageReady !== undefined) {
            this.currentView.pageReady();
        } else {
            console.warn("WARN:: target view does not implement function pageReady()");
        }
    },
    initialize : function() {
        this.isDebug = true;
        var routerMapping = RouterMapping;
        this.routerMapping = routerMapping;
        
        // user module start
        this.registerRoute(routerMapping.getRouterListUser(), "routerListUserHandler");
        this.registerRoute(routerMapping.getRouterAddUser(), "routerAddUserHandler");
        this.registerRoute(
                routerMapping.getRouterEditUser(":userId"), "routerEditUserHandler");
        this.registerRoute(
                routerMapping.getRouterAssignUserToGroup(":userId"), 
                "routerAssignUserToGroupHandler");
        this.registerRoute(routerMapping.getRouterMyProfile(), "routerMyProfileHandler");
        // user module end
        
        // group module start
        this.registerRoute(routerMapping.getRouterListGroup(), "routerListGroupHandler");
        this.registerRoute(routerMapping.getRouterAddGroup(), "routerAddGroupHandler");
        this.registerRoute(
                routerMapping.getRouterEditGroup(":groupId"), "routerEditGroupHandler");
        // group module end
        
        // role module start
        this.registerRoute(routerMapping.getRouterListRole(), "routerListRoleHandler");
        // role module end
        
        // action log module start
        this.registerRoute(routerMapping.getRouterListActionLog(), "routerListActionLogHandler");
        // action log module end
    },
    // user module start
    navigateToListUser : function() {
        this.moveTo(this.routerMapping.getRouterListUser());
    },
    navigateToAddUser : function() {
        this.moveTo(this.routerMapping.getRouterAddUser());
    },
    navigateToEditUser : function(id) {
        this.moveTo(this.routerMapping.getRouterEditUser(id));
    },
    navigateAssignUserToGroup : function(id) {
        this.moveTo(this.routerMapping.getRouterAssignUserToGroup(id));
    },
    navigateToMyProfile : function() {
        this.moveTo(this.routerMapping.getRouterMyProfile());
    },
    routerListUserHandler : function() {
        RequireJSUtils.loadUserModule(function() {
            UserService.showUserListView();
        });
    },
    routerAddUserHandler : function() {
        RequireJSUtils.loadUserModule(function() {
            UserService.showUserAddView();
        });
    },
    routerEditUserHandler : function(userId) {
        RequireJSUtils.loadUserModule(function() {
            UserService.showUserEditView(userId);
        });
    },
    routerAssignUserToGroupHandler : function(userId) {
        RequireJSUtils.loadUserModule(function() {
            UserService.showAssignUserToGroupView(userId);
        });
    },
    routerMyProfileHandler : function() {
        RequireJSUtils.loadUserModule(function() {
            UserService.showMyProfileView();
        });
    },
    // user module end
    // group module start
    navigateToListGroup : function() {
        this.moveTo(this.routerMapping.getRouterListGroup());
    },
    navigateToAddGroup : function() {
        this.moveTo(this.routerMapping.getRouterAddGroup());
    },
    navigateToEditGroup : function(id) {
        this.moveTo(this.routerMapping.getRouterEditGroup(id));
    },
    routerListGroupHandler : function() {
        RequireJSUtils.loadGroupModule(function() {
            GroupService.showGroupListView();
        });
    },
    routerAddGroupHandler : function() {
        RequireJSUtils.loadGroupModule(function() {
            GroupService.showGroupAddView();
        });
    },
    routerEditGroupHandler : function(groupId) {
        RequireJSUtils.loadGroupModule(function() {
            GroupService.showGroupEditView(groupId);
        });
    },
    // group module end
    // role module start
    navigateToListRole : function() {
        this.moveTo(this.routerMapping.getRouterListRole());
    },
    routerListRoleHandler : function(){
        RequireJSUtils.loadRoleModule(function(){
            RoleService.showRoleListView();
        });
    },
    // role module end
    // action log module start
    routerListActionLogHandler : function() {
        RequireJSUtils.loadActionLogModule(function() {
            ActionLogService.showActionLogListView();
        });
    },
    // action log module end
});
