var RequireJSUtils = function() {
    
    var requireJSBaseUrl = "resources/js/backbone";
    var requireJSPath = {};
    
    requireJSPath['text'] = "libs/text";
    
    var dependencyLibs = [];
    
    // config dependency libs
    var globalConstsLib = "globalConstsLib";
    var globalConstsLibPath = "consts/global-consts";
    requireJSPath[globalConstsLib] = globalConstsLibPath;
    dependencyLibs.push(globalConstsLib);
    
    // config router lib
    var routerLib = "routerLib";
    var routerLibPath = "routers/router";
    requireJSPath[routerLib] = routerLibPath;
    
    // config user module lib
    var userModuleLib = "userModuleLib";
    var userModuleLibPath = "modules/user/user-module";
    requireJSPath[userModuleLib] = userModuleLibPath;
    
    // config group module lib
    var groupModuleLib = "groupModuleLib";
    var groupModuleLibPath = "modules/group/group-module";
    requireJSPath[groupModuleLib] = groupModuleLibPath;

    // config role module lib
    var roleModuleLib = "roleModuleLib";
    var roleModuleLibPath = "modules/role/role-module";
    requireJSPath[roleModuleLib] = roleModuleLibPath;
    
    // config action log module lib
    var actionLogModuleLib = "actionLogModuleLib";
    var actionLogModuleLibPath = "modules/action-log/action-log-module";
    requireJSPath[actionLogModuleLib] = actionLogModuleLibPath;
    
    return {
        init : function() {
            var requireJSConfig = {
                waitSeconds : 30,
                baseUrl : requireJSBaseUrl,
                shim: {
//                    globalConstsLib : {
//                        deps: ['emsUtilLib']
//                    }
                },
                urlArgs : "bust=" + (new Date()).getTime(),
                paths : requireJSPath,
            };
            require.config(requireJSConfig);
        },
        loadCommonTemplates : function(tplNames, callback) {
            var paths = [];
            for(var i=0; i<tplNames.length; i++) {
                var tplName = tplNames[i];
                paths.push("text!modules/" + tplName);
            }
            require(paths, callback);
        },
        loadBreadcrumbTemplate : function(callback) {
            var path = "text!modules/breadcrumb.htm";
            require([path], callback);
        },
        getModuleTemplatePath :function(moduleName, tplName) {
            return "text!modules/" + moduleName + "/" + tplName;
        },
        loadModuleTemplates : function(path, tplNames, callback) {
            var paths = [];
            for(var i=0; i<tplNames.length; i++) {
                var tplName = tplNames[i];
                paths.push(this.getModuleTemplatePath(path, tplName));
            }
            require(paths, callback);
        },
        loadModuleTemplate : function(moduleName, tplName, callback) {
            var path = this.getModuleTemplatePath(moduleName, tplName);
            require([path], callback);
        },
        loadDependencyLibs : function(callback) {
            require(dependencyLibs, callback);
        },
        loadRouterLib : function(callback) {
            require([routerLib], callback);
        },
        // user module start
        loadUserModuleTemplates : function(tplNames, callback) {
            this.loadModuleTemplates("user", tplNames, callback);
        },
        loadUserModule : function(callback) {
            require([userModuleLib], callback);
        },
        // user module end
        // group module start
        loadGroupModuleTemplates : function(tplNames, callback) {
            this.loadModuleTemplates("group", tplNames, callback);
        },
        loadGroupModule : function(callback) {
            require([groupModuleLib], callback);
        },
        // group module end
        // role module start
        loadRoleModuleTemplates : function(tplNames, callback) {
            this.loadModuleTemplates("role", tplNames, callback);
        },
        loadRoleModule : function(callback) {
            require([roleModuleLib], callback); 
        },
        // role module end
        // action log module start
        loadActionLogModuleTemplates : function(tplNames, callback) {
            this.loadModuleTemplates("action-log", tplNames, callback);
        },
        loadActionLogModule : function(callback) {
            require([actionLogModuleLib], callback); 
        },
        // action log module end
    };
}();

var SessionManager = function() {
    
    var user = {};
    var permissions = {};
    var defaultPassword = "abc@123";
    
    var PERMISSIONS = {
        'VIEW' : 1,
        'UPDATE' : 2,
        'ADD' : 4,
        'DELETE' : 8,
        'USER_ASSIGN_GROUP_TO_USER' : 16,
        'ROLE_CONFIG_FUNCTION' : 16,
        'SERVICE_CONFIG_FIELD' : 16,
        'SERVICE_CONFIG_INPUT_FIELD' : 32,
        'ROUTING_CONFIG_FIELD' : 16
    };
    
    var userModuleAuthorities = undefined;
    var groupModuleAuthorities = undefined;
    var roleModuleAuthorities = undefined;
    var functionModuleAuthorities = undefined;
    var hostModuleAuthorities = undefined;
    var serviceModuleAuthorities = undefined;
    var routingModuleAuthorities = undefined;
    var actionLogModuleAuthorities = undefined;
    
    return {
        setSession : function(session) {
//            var session = {
//                "user" : "user object",
//                "permissions" : "Map<String, Integer>",
//                "defaultPassword" : ""
//            };
            user = session["user"];
            permissions = session["permissions"];
            defaultPassword = session["defaultPassword"];
            this.updateMyProfile();
        },
        updateUserInfo : function(userInfo) {
            user = userInfo;
        },
        updateMyProfile : function() {
//            $("#userProfileName").html(user.fullName);
        },
        getDefaultPassword : function() {
            return defaultPassword;
        },
        getPermissions : function() {
            var ret = {};
            if(permissions != undefined) {
                ret = permissions;
            }
            return ret;
        },
        authorizePermission : function(role, permission) {
            var permissions = this.getPermissions();
            var result = permissions[role] != undefined;
            if(result & typeof permission != 'undefined') {
                result = ((permissions[role] & permission) === permission);
            }
            return result;
        },
        isAuthorizedView : function(role) {
            return this.authorizePermission(role, PERMISSIONS.VIEW);
        },
        isAuthorizedUpdate : function(role) {
            return this.authorizePermission(role, PERMISSIONS.UPDATE);
        },
        isAuthorizedAdd : function(role) {
            return this.authorizePermission(role, PERMISSIONS.ADD);
        },
        isAuthorizedDelete : function(role) {
            return this.authorizePermission(role, PERMISSIONS.DELETE);
        },
        getUserModuleAuthorities : function() {
            if(userModuleAuthorities == undefined) {
                var role = "USER";
                var authorities = {
                    isView : this.isAuthorizedView(role),
                    isUpdate : this.isAuthorizedUpdate(role),
                    isAdd : this.isAuthorizedAdd(role),
                    isDelete : this.isAuthorizedDelete(role),
                    isAssignGroup : this.authorizePermission(role, PERMISSIONS['USER_ASSIGN_GROUP_TO_USER']),
                };
                userModuleAuthorities = authorities;
            }
            return userModuleAuthorities;
        },
        getGroupModuleAuthorities : function() {
            if(groupModuleAuthorities == undefined) {
                var role = "GROUP";
                var authorities = {
                    isView : this.isAuthorizedView(role),
                    isUpdate : this.isAuthorizedUpdate(role),
                    isAdd : this.isAuthorizedAdd(role),
                    isDelete : this.isAuthorizedDelete(role),
                };
                groupModuleAuthorities = authorities;
            }
            return groupModuleAuthorities;
        },
        getRoleModuleAuthorities : function() {
            if(roleModuleAuthorities == undefined) {
                var role = "ROLE";
                var authorities = {
                    isView : this.isAuthorizedView(role),
                    isUpdate : this.isAuthorizedUpdate(role),
                    isAdd : this.isAuthorizedAdd(role),
                    isDelete : this.isAuthorizedDelete(role),
                    isConfigFunction : this.authorizePermission(role, PERMISSIONS['ROLE_CONFIG_FUNCTION'])
                };
                roleModuleAuthorities = authorities;
            }
            return roleModuleAuthorities;
        },
        getHostModuleAuthorities : function() {
            if(hostModuleAuthorities == undefined) {
                var role = "HOST";
                var authorities = {
                    isView : this.isAuthorizedView(role),
                    isUpdate : this.isAuthorizedUpdate(role),
                    isAdd : this.isAuthorizedAdd(role),
                    isDelete : this.isAuthorizedDelete(role),
                };
                hostModuleAuthorities = authorities;
            }
            return hostModuleAuthorities;
        },
        getServiceModuleAuthorities : function() {
            if(serviceModuleAuthorities == undefined) {
                var role = "SERVICE";
                var authorities = {
                    isView : this.isAuthorizedView(role),
                    isUpdate : this.isAuthorizedUpdate(role),
                    isAdd : this.isAuthorizedAdd(role),
                    isDelete : this.isAuthorizedDelete(role),
                    isConfigField : this.authorizePermission(role, PERMISSIONS['SERVICE_CONFIG_FIELD']),
                    isConfigInputField : this.authorizePermission(role, PERMISSIONS['SERVICE_CONFIG_INPUT_FIELD'])
                };
                serviceModuleAuthorities = authorities;
            }
            return serviceModuleAuthorities;
        },
        getRoutingModuleAuthorities : function() {
            if(routingModuleAuthorities == undefined) {
                var role = "ROUTING";
                var authorities = {
                    isView : this.isAuthorizedView(role),
                    isUpdate : this.isAuthorizedUpdate(role),
                    isAdd : this.isAuthorizedAdd(role),
                    isDelete : this.isAuthorizedDelete(role),
                    isConfigField : this.authorizePermission(role, PERMISSIONS['ROUTING_CONFIG_FIELD'])
                };
                routingModuleAuthorities = authorities;
            }
            return routingModuleAuthorities;
        },
        getActionLogModuleAuthorities : function() {
            if(actionLogModuleAuthorities == undefined) {
                var role = "ACTION_LOG";
                var authorities = {
                    isView : this.isAuthorizedView(role),
                };
                actionLogModuleAuthorities = authorities;
            }
            return actionLogModuleAuthorities;
        },
        showMenu : function(id) {
            $('#' + id).css('display', 'block');
        },
        removeMenu : function(id) {
        },
        authorizeMenu : function() {
            // administrators menu start
            var isUserManagementMenu = this.authorizePermission("USER");
            var isGroupManagementMenu = this.authorizePermission("GROUP");
            var isRoleManagementMenu = this.authorizePermission("ROLE");
//            var isHostManagementMenu = this.authorizePermission("HOST");
            var isServiceManagementMenu = this.authorizePermission("SERVICE");
            var isRoutingManagementMenu = this.authorizePermission("ROUTING");
            var isActionLogManagementMenu = this.authorizePermission("ACTION_LOG");
             
            if(isUserManagementMenu || isGroupManagementMenu || isRoleManagementMenu
                    || isActionLogManagementMenu) {
                this.showMenu('menuAdministrators');
                this.showMenu('menuMyProfile');
                if (isUserManagementMenu) {
                    this.showMenu('menuUser');
                }
                if (isGroupManagementMenu) {
                    this.showMenu('menuGroup');
                }
                if(isRoleManagementMenu) {
                    this.showMenu('menuRole');
                }
                if(isActionLogManagementMenu) {
                    this.showMenu('menuActionLog');
                }
            }
            
//            if(isHostManagementMenu || isServiceManagementMenu || isRoutingManagementMenu) {
            if(isServiceManagementMenu || isRoutingManagementMenu) {
                this.showMenu('menuServices'); 
//                if(isHostManagementMenu) {
//                    this.showMenu('menuHost');
//                }
                if(isServiceManagementMenu) {
                    this.showMenu('menuService');
                }
                if(isRoutingManagementMenu) {
                    this.showMenu('menuRouting');
                }
            }
        },
    };
}();

var router;
var mainContent;

(function() {
    RequireJSUtils.init();
    RequireJSUtils.loadDependencyLibs(function() {
        RequireJSUtils.loadRouterLib(function() {
            $(document).ready(function() {
                var url = "web/controller/authenticated/basic-info-session";
                AjaxUtils.doGet(url, function(basicInfoSession) {
                    
                    SessionManager.setSession(basicInfoSession);
                    SessionManager.authorizeMenu();
                    
                    router = new AppRouter();
                    Backbone.history.start();
                    mainContent = $("#ajax-content");
                }, {});
            });
        });
    });
})();