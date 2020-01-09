var UserService = function() {
    
    var USERS = "web/controller/authenticated/users";
    
    var TEMPLATES = undefined;
    
    return {
        getListUserDataModel : function(onsuccess, options) {
            var url = USERS + "/list-user-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getAddUserDataModel : function(onsuccess, options) {
            var url = USERS + "/add-user-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getEditUserDataModel : function(userId, onsuccess, options) {
            var url = USERS + "/edit-user-data-model/user-id/" + userId;
            AjaxUtils.doGet(url, onsuccess, options);
        },
        getMyProfileDataModel : function(onsuccess, options) {
            var url = USERS + "/my-profile-data-model";
            AjaxUtils.doGet(url, onsuccess, options);
        },
        addUser : function(userDataModel, onsuccess, options) {
            var data = {
                data : JSON.stringify(userDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPost(USERS, onsuccess, options);
        },
        updateUser : function(userDataModel, onsuccess, options) {
            var data = {
                data : JSON.stringify(userDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPut(USERS, onsuccess, options);
        },
        updateUserStatus : function(userDataModel, onsuccess, options) {
            var url = USERS + "/update-user-status";
            var data = {
                data : JSON.stringify(userDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPut(url, onsuccess, options);
        },
        resetPassword : function(userId, onsuccess, options) {
            var url = USERS + "/reset-password/user-id/" + userId;
            AjaxUtils.doPut(url, onsuccess, options);
        },
        deleteUser : function(userId, onsuccess, options) {
            var url = USERS + "/user-id/" + userId;
            AjaxUtils.doDelete(url, onsuccess, options);
        },
        updateMyProfile : function(userDataModel, onsuccess, options) {
            var url = USERS + "/update-my-profile";
            var data = {
                data : JSON.stringify(userDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPut(url, onsuccess, options);
        },
        changePassword : function(userDataModel, onsuccess, options) {
            var url = USERS + "/change-password";
            var data = {
                data : JSON.stringify(userDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPut(url, onsuccess, options);
        },
        validateUser : function(userDataModel, onsuccess, options) {
            var url = USERS + "/validate";
            var data = {
                data : JSON.stringify(userDataModel)
            };
            options = $.extend({}, data, options);
            AjaxUtils.doPost(url, onsuccess, options);
        },
        loadTemplates : function() {
            var dfd = jQuery.Deferred();
            if(TEMPLATES != undefined) {
                dfd.resolve(TEMPLATES);
            } else {
                RequireJSUtils.loadUserModuleTemplates([
                     "list-user.htm", "add-user.htm", "my-profile.htm"], 
                     function(listUserTpl, addUserTpl, myProfileTpl) {
                         TEMPLATES = {
                             listUserTpl : listUserTpl,
                             addUserTpl : addUserTpl,
                             myProfileTpl : myProfileTpl,
                         };
                         dfd.resolve(TEMPLATES);
                     }
                );
            }
            return dfd.promise();
        },
        showUserListView : function() {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getListUserDataModel(function(userDataModel) {
                    var targetView = new UserListView({
                        templates : templates,
                        userDataModel : userDataModel
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
        showUserAddView : function() {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getAddUserDataModel(function(userDataModel) {
                    var targetView = new UserView({
                        templates : templates,
                        userDataModel : userDataModel,
                        isViewAdd : true
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
        showUserEditView : function(userId) {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getEditUserDataModel(userId, function(userDataModel) {
                    var targetView = new UserView({
                        templates : templates,
                        userDataModel : userDataModel
                    });
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
        showMyProfileView : function() {
            var myself = this;
            myself.loadTemplates().done(function(templates) {
                myself.getMyProfileDataModel(function(userDataModel) {
                    var targetView = new MyProfileView({
                        templates : templates,
                        userDataModel : userDataModel
                    })
                    router.showView(mainContent, targetView);
                }, AjaxUtils.blockUILoadingAjax());
            });
        },
    };
}();

// user list view start
var UserListView = Backbone.View.extend({

    initialize : function(options) {
        this.MSG_CONFIRM_DELETE = InspiniaCommonUtil.getMessage("USER_103");
        this.MSG_CONFIRM_LOCK = InspiniaCommonUtil.getMessage("USER_104");
        this.MSG_CONFIRM_UNLOCK = InspiniaCommonUtil.getMessage("USER_105");
        this.MSG_CONFIRM_RESET_PASSWORD = InspiniaCommonUtil.getMessage("USER_106");
        
        var templates = options["templates"];
        this.templates = templates;
        
        var userDataModel = options["userDataModel"];
        
        this.tpl = templates["listUserTpl"];
        this.setUsers(userDataModel["users"]);
        
        var breadcrumb = UserConsts.getListUserBreadcrumb();
        InspiniaCommonUtil.renderBreadcrumb(UserConsts.getBreadcrumbHeader(), breadcrumb);
        this.prepareData();
    },
    events : {
        "click button[id='btnAdd']" : "showAddUser",
    },
    render : function() {
        var myself = this;
        var authorities = SessionManager.getUserModuleAuthorities();
        var renderHtml = _.template(myself.tpl, {
            users : myself.getUsers(),
            authorities : authorities
        });
        return this.$el.html(renderHtml);
    },
    getUsers : function() {
        var ret = this.users;
        if(ret == undefined) {
            ret = [];
        }
        return ret;
    },
    getUserByUserId : function(userId) {
        var ret = undefined;
        var users = this.getUsers();
        for(var i=0; i<users.length; i++) {
            var user = users[i];
            if(user["id"] == userId) {
                ret = user;
                break;
            }
        }
        if(ret == undefined) {
            ret = {};
        }
        return ret;
    },
    setUsers : function(users) {
        this.users = users;
    },
    prepareData : function() {
        var myself = this;
        var authorities = SessionManager.getUserModuleAuthorities();
        
        var isAdd = authorities["isAdd"];
        var isUpdate = authorities["isUpdate"];
        var isDelete = authorities["isDelete"];

        var users = myself.getUsers();
        for(var i=0; i<users.length; i++) {
            var user = users[i];
            user["userStatusActived"] = UserConsts.getUserStatusActivedKey();
            user["userStatusLocked"] = UserConsts.getUserStatusLockedKey();
            user["isStatusActived"] = UserConsts.isUserStatusActived(user["status"]);
            user["statusHtml"] = UserConsts.getUserStatusHtml(user["status"]);
            user["genderHtml"] = UserConsts.getUserGenderHtml(user["gender"]);
        }
    },
    pageReady : function() {
        var authorities = SessionManager.getUserModuleAuthorities();
        var hasActionButtons = 
            authorities['isView'] || authorities['isUpdate'] || authorities['isDelete'];
        
        var aoColumns = [];
        var order = [];
        if(hasActionButtons) {
            aoColumns = [
                         { sWidth: '1%', "bSortable": false },
                         { "bSortable": true },
                         { "bSortable": true },
                         { "bSortable": true },
                         { "bSortable": true },
                         { sWidth: '1%', "bSortable": true }
             ];
            order = [[ 1, "asc" ]];
        } else {
            aoColumns = [
                         { "bSortable": true },
                         { "bSortable": true },
                         { "bSortable": true },
                         { "bSortable": true },
                         { sWidth: '1%', "bSortable": true }
             ];
            order = [[ 0, "asc" ]];
        }
                    
        $('#tblUsers').DataTable({
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
    reloadListUser : function (){
        UserService.showUserListView();
        return false;
    },
    showAddUser : function(e) {
        var myself = this;
        router.navigateToAddUser();
        return false;
    },
    editUser : function(e) {
        var myself = this;
        var target = $(e);
        var userId = target.attr("user-id");
        router.navigateToEditUser(userId);
        return false;
    },
    changeUserStatus : function(e) {
        var myself = this;
        var target = $(e);
        var userId = target.attr("user-id");
        var userStatus = target.attr("user-status");
        var user = myself.getUserByUserId(userId);
        var msg = "";
        if(UserConsts.isUserStatusActived(userStatus)) {
            msg = InspiniaCommonUtil.formatMessage(
                    this.MSG_CONFIRM_UNLOCK, [user["fullName"]]);
        } else {
            msg = InspiniaCommonUtil.formatMessage(
                    this.MSG_CONFIRM_LOCK, [user["fullName"]]);
        }
        InspiniaDialogUtil.confirm(msg, function() {
            var userDataModel = {
                "user" : {
                    "id" : userId,
                    "status" : userStatus
                }
            };
            UserService.updateUserStatus(userDataModel, function(result) {
                InspiniaCommonUtil.showResponses(result);
                myself.reloadListUser();
            }, AjaxUtils.blockUILoadingAjax());
        });
        return false;
    },
    deleteUser : function(e) {
        var myself = this;
        var target = $(e);
        var userId = target.attr("user-id");
        var user = myself.getUserByUserId(userId);
        var msg = InspiniaCommonUtil.formatMessage(
                this.MSG_CONFIRM_DELETE, [user["fullName"]]);
        
        InspiniaDialogUtil.confirm(msg, function() {
            UserService.deleteUser(userId, function(result) {
                InspiniaCommonUtil.showResponses(result);
                myself.reloadListUser();
            });
        });
        return false;
    },
    resetPassword : function(e) {
        var myself = this;
        var target = $(e);
        var userId = target.attr("user-id");
        var user = myself.getUserByUserId(userId);
        var msg = InspiniaCommonUtil.formatMessage(
                this.MSG_CONFIRM_RESET_PASSWORD, [user["fullName"]]);
        InspiniaDialogUtil.confirm(msg, function() {
            UserService.resetPassword(userId, function(result) {
                InspiniaCommonUtil.showResponses(result);
                myself.reloadListUser();
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
// user list view end

// user view start
var UserView = Backbone.View.extend({
    
    initialize : function(options) {
        this.MSG_CONFIRM_ADD = InspiniaCommonUtil.getMessage("USER_101");
        this.MSG_CONFIRM_UPDATE = InspiniaCommonUtil.getMessage("USER_102");
        this.MSG_CONFIRM_CANCEL = InspiniaCommonUtil.getMessage("USER_109");
        
        var templates = options["templates"];
        var userDataModel = options["userDataModel"];
        this.setUserDataModel(userDataModel);
        
        var isViewAdd = options["isViewAdd"];
        this.isViewAdd = isViewAdd;
        
        this.tpl = templates["addUserTpl"];
        
        var breadcrumb = [];
        if(isViewAdd) {
            breadcrumb = UserConsts.getAddUserBreadcrumb();
        } else {
            breadcrumb = UserConsts.getEditUserBreadcrumb();
        }
        InspiniaCommonUtil.renderBreadcrumb(UserConsts.getBreadcrumbHeader(), breadcrumb);
    },
    render : function() {
        var authorities = SessionManager.getUserModuleAuthorities();
        var isAdd = authorities["isAdd"];
        var isUpdate = authorities["isUpdate"];
        var title = "";
        var canEdit = true;
        
        if(this.isViewAdd) {
            title = "Add User";
        } else {
            if(isUpdate) {
                title = "Edit User";
            } else {
                canEdit = false;
                title = "View User";
            }
        }
        var disabled = (canEdit)?"":"disabled";
        var renderHtml = _.template(this.tpl, {
            isViewAdd : this.isViewAdd,
            user : this.getUser(),
            authorities : authorities,
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
    getUserDataModel : function() {
        return this.userDataModel;
    },
    setUserDataModel : function(userDataModel) {
        return this.userDataModel = userDataModel;
    },
    getUser : function() {
        var ret = undefined;
        try {
            ret = this.getUserDataModel()["user"];
        } catch(ex) {
        }
        if(ret == undefined) {
            ret = {};
        }
        return ret;
    },
    getGroups : function() {
        return this.getUserDataModel()["groups"];
    },
    getGroupsOfUser : function() {
        return this.getUserDataModel()["groupsOfUser"];
    },
    getTxtFullName : function() {
        return $("#txtFullName");
    },
    getSelectGender : function() {
        return $("#selectGender");
    },
    getTxtContactNumber : function() {
        return $("#txtContactNumber");
    },
    getTxtEmail : function() {
        return $("#txtEmail");
    },
    getTxtUserName : function() {
        return $("#txtUserName");
    },
    getTxtPassword : function() {
        return $("#txtPassword");
    },
    getSelectStatus : function() {
        return $("#selectStatus");
    },
    getSelectGroup : function() {
        return $("#selectGroup");
    },
    getBtnSubmit : function() {
        return $("#btnSubmit");
    },
    getFormData : function() {
        var dfd = jQuery.Deferred();

        var txtFullName = this.getTxtFullName();
        var selectGender = this.getSelectGender();
        var txtContactNumber = this.getTxtContactNumber();
        var txtEmail = this.getTxtEmail();
        var txtUserName = this.getTxtUserName();
//        var txtPassword = this.getTxtPassword();
        var selectStatus = this.getSelectStatus();
        var selectGroup = this.getSelectGroup();
        
        var isFormValid = true;
        if(txtFullName.val() == "") {
            isFormValid = false;
            InspiniaCommonUtil.showFormRequiredError(txtFullName);
        } else {
            InspiniaCommonUtil.hideFormError(txtFullName);
        }
        
        if(selectGender.val() == "") {
            isFormValid = false;
            InspiniaCommonUtil.showFormRequiredError(selectGender);
        } else {
            InspiniaCommonUtil.hideFormError(selectGender);
        }
        
        if(txtContactNumber.val() == "") {
            isFormValid = false;
            InspiniaCommonUtil.showFormRequiredError(txtContactNumber);
        } else {
            InspiniaCommonUtil.hideFormError(txtContactNumber);
        }
        
        if(txtEmail.val() == "") {
            isFormValid = false;
            InspiniaCommonUtil.showFormRequiredError(txtEmail);
        } else {
            InspiniaCommonUtil.hideFormError(txtEmail);
        }
        
        if(txtUserName.val() == "") {
            isFormValid = false;
            InspiniaCommonUtil.showFormRequiredError(txtUserName);
        } else {
            InspiniaCommonUtil.hideFormError(txtUserName);
        }
        
        if(selectStatus.val() == "") {
            isFormValid = false;
            InspiniaCommonUtil.showFormRequiredError(selectStatus);
        } else {
            InspiniaCommonUtil.hideFormError(selectStatus);
        }
        
        if(isFormValid) {
            var user = {
                fullName : txtFullName.val(),
                gender : selectGender.val(),
                contactNumber : txtContactNumber.val(),
                emailAddress : txtEmail.val(),
                username : txtUserName.val(),
//            password : txtPassword.val(),
                status : selectStatus.val(),
            };
            if(!this.isViewAdd) {
                user["id"] = this.getUser()["id"];
            }
            
            var groupsOfUser = selectGroup.val();
            if(groupsOfUser == null || groupsOfUser == undefined) {
                groupsOfUser = [];
            }
            var userDataModel = {
                "user" : user,
                "groupsOfUser" : groupsOfUser
            };
            var btnSubmit = this.getBtnSubmit();
            UserService.validateUser(userDataModel, function(result) {
                console.log(JSON.stringify(result));
                if(InspiniaNotificationUtil.isSuccess(result["status"])) {
                    var data = result["data"];
                    var isUserNameExisted = data["isUserNameExisted"];
                    var isEmailExisted = data["isEmailExisted"];
                    var isContactNumberExisted = data["isContactNumberExisted"];
                    if(isUserNameExisted) {
                        isFormValid = false;
                        InspiniaCommonUtil.showFormError(txtUserName, "Username is existed.");
                    }  else {
                        InspiniaCommonUtil.hideFormError(txtUserName);
                    }
                    
                    if(isEmailExisted) {
                        isFormValid = false;
                        InspiniaCommonUtil.showFormError(txtEmail, "Email is existed.");
                    }  else {
                        InspiniaCommonUtil.hideFormError(txtEmail);
                    }
                    
                    if(isContactNumberExisted) {
                        isFormValid = false;
                        InspiniaCommonUtil.showFormError(txtContactNumber, "Contact number is existed.");
                    }  else {
                        InspiniaCommonUtil.hideFormError(txtContactNumber);
                    }
                    
                    if(isFormValid) {
                        dfd.resolve(userDataModel);
                    } else {
                        dfd.resolve(undefined);
                    }
                }
            }, AjaxUtils.loadingButtonAjax(btnSubmit));
        }
        return dfd.promise();
    },
    submit : function(e) {
        var myself = this;
//        var target = $(e.currentTarget);
//        var btnLoading = target.ladda();
        myself.getFormData().done(function(userDataModel) {
            if(userDataModel != undefined) {
                if(myself.isViewAdd) {
                    var msg = myself.MSG_CONFIRM_ADD;
                    InspiniaDialogUtil.confirm(msg, function() {
                        UserService.addUser(userDataModel, function(result) {
                            InspiniaCommonUtil.showResponses(result);
                            router.navigateToListUser();
                        }, AjaxUtils.blockUILoadingAjax());
                    });
                } else {
                    var msg = myself.MSG_CONFIRM_UPDATE;
                    InspiniaDialogUtil.confirm(msg, function() {
                        UserService.updateUser(userDataModel, function(result) {
                            InspiniaCommonUtil.showResponses(result);
                            router.navigateToListUser();
                        }, AjaxUtils.blockUILoadingAjax());
                    });
                }
            }
        });
        return false;
    },
    back : function() {
        var myself = this;
        var msg = this.MSG_CONFIRM_CANCEL;
        InspiniaDialogUtil.confirm(msg, function() {
            router.navigateToListUser();
        });
        return false;
    },
    pageReady : function() {
        this.$el.find(".error").hide();
        var selectGender = this.getSelectGender();
        var selectStatus = this.getSelectStatus();
        var selectGroup = this.getSelectGroup();
        
        var selectedGender = "";
        var selectedStatus = "";
        var selectedGroups = [];
        
        if(!this.isViewAdd) {
            var user = this.getUser();
            selectedGender = user["gender"];
            selectedStatus = user["status"];
            var groupsOfUser = this.getGroupsOfUser();
            for(var i=0; i<groupsOfUser.length; i++) {
                selectedGroups.push(groupsOfUser[i]);
            }
        }
        var selectGenderOptions = {
            "data-key" : "key",
            "data-text" : "text",
            "has-place-holder" : true,
            "place-holder" : "Select gender",
            "selected-key" : selectedGender,
        };
        InspiniaFormUtil.setSelect2(UserConsts.getUserGender(), 
                selectGender, selectGenderOptions);
        
        var selectStatusOptions = {
            "data-key" : "key",
            "data-text" : "text",
            "has-place-holder" : true,
            "place-holder" : "Select status",
            "selected-key" : selectedStatus,
        };
        InspiniaFormUtil.setSelect2(UserConsts.getUserStatus(), 
                selectStatus, selectStatusOptions);
        
        var groups = this.getGroups();
        var selectGroupOptions = {
                "data-key" : "id",
                "data-text" : "name",
                "has-place-holder" : true,
                "place-holder" : "Select group",
                "selected-key" : selectedGroups,
        };
        InspiniaFormUtil.setSelect2(groups, selectGroup, selectGroupOptions);
        
        var authorities = SessionManager.getUserModuleAuthorities();
        if(authorities['isAssignGroup']) {
            $("#divAssignGroup").show();
        }
    },
    close : function() {
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
});
// user view end

// my profile view start
var MyProfileView = Backbone.View.extend({
    
    initialize : function(options) {
      this.MSG_CONFIRM_UPDATE_USER_PROFILE = InspiniaCommonUtil.getMessage("USER_107");
      this.MSG_CONFIRM_CHANGE_PASSWORD = InspiniaCommonUtil.getMessage("USER_108");
        
      var templates = options["templates"];
      var userDataModel = options["userDataModel"];
      this.setUserDataModel(userDataModel);
      
      var isViewAdd = options["isViewAdd"];
      this.isViewAdd = isViewAdd;
      
      this.tpl = templates["myProfileTpl"];
      
      var breadcrumb = UserConsts.getMyProfileBreadcrumb();
      InspiniaCommonUtil.renderBreadcrumb("Profile", breadcrumb);
    },
    render : function() {
        var renderHtml = _.template(this.tpl, {
            user : this.getUser()
        });
        return this.$el.html(renderHtml);
    },
    events : {
        "click button[id='btnSubmit']" : "submit",
        "click button[id='btnChangePassword']" : "changePassword",
    },
    getUserDataModel : function() {
        return this.userDataModel;
    },
    setUserDataModel : function(userDataModel) {
        return this.userDataModel = userDataModel;
    },
    getUser : function() {
        var ret = undefined;
        try {
            ret = this.getUserDataModel()["user"];
        } catch(ex) {
        }
        if(ret == undefined) {
            ret = {};
        }
        return ret;
    },
    getGroups : function() {
        return this.getUserDataModel()["groups"];
    },
    getGroupsOfUser : function() {
        return this.getUserDataModel()["groupsOfUser"];
    },
    getTxtFullName : function() {
        return $("#txtFullName");
    },
    getSelectGender : function() {
        return $("#selectGender");
    },
    getTxtContactNumber : function() {
        return $("#txtContactNumber");
    },
    getTxtEmail : function() {
        return $("#txtEmail");
    },
    getTxtUserName : function() {
        return $("#txtUserName");
    },
    getTxtPassword : function() {
        return $("#txtPassword");
    },
    getSelectStatus : function() {
        return $("#selectStatus");
    },
    getSelectGroup : function() {
        return $("#selectGroup");
    },
    getTxtOldPassword : function() {
        return $("#txtOldPassword");
    },
    getTxtNewPassword : function() {
        return $("#txtNewPassword");
    },
    getTxtConfirmNewPassword : function() {
        return $("#txtConfirmNewPassword");
    },
    getFormData : function() {
        var txtFullName = this.getTxtFullName();
        var selectGender = this.getSelectGender();
        var txtContactNumber = this.getTxtContactNumber();
        var txtEmail = this.getTxtEmail();
//        var txtUserName = this.getTxtUserName();
//        var txtPassword = this.getTxtPassword();
//        var selectStatus = this.getSelectStatus();
//        var selectGroup = this.getSelectGroup();
        var user = {
            fullName : txtFullName.val(),
            gender : selectGender.val(),
            contactNumber : txtContactNumber.val(),
            emailAddress : txtEmail.val(),
//            username : txtUserName.val(),
//            password : txtPassword.val(),
//            status : selectStatus.val(),
        };
        var userDataModel = {
            "user" : user,
        };
        return userDataModel;
    },
    submit : function() {
        var myself = this;
        var msg = this.MSG_CONFIRM_UPDATE_USER_PROFILE;
        InspiniaDialogUtil.confirm(msg, function() {
            var userDataModel = myself.getFormData();
            UserService.updateMyProfile(userDataModel, function(result) {
                UserService.showMyProfileView();
            });
        });
        return false;
    },
    changePassword : function() {
        var myself = this;
        var txtOldPassword = myself.getTxtOldPassword();
        var txtNewPassword = myself.getTxtNewPassword();
        var txtConfirmNewPassword = myself.getTxtConfirmNewPassword();
        
        var oldPassword = txtOldPassword.val();
        var newPassword = txtNewPassword.val();
        var confirmNewPassword = txtConfirmNewPassword.val();
        
        if(newPassword === confirmNewPassword) {
            var msg = this.MSG_CONFIRM_CHANGE_PASSWORD;
            InspiniaDialogUtil.confirm(msg, function() {
                var userDataModel = {
                    "oldPassword" : oldPassword,
                    "newPassword" : newPassword
                };
                UserService.changePassword(userDataModel, function(result) {
                    UserService.showMyProfileView();
                });
            });
        }
        return false;
    },
    pageReady : function() {
        var selectGender = this.getSelectGender();
        var selectStatus = this.getSelectStatus();
        var selectGroup = this.getSelectGroup();
        
        var selectedGender = "";
        var selectedStatus = "";
        var selectedGroups = [];
        
        var user = this.getUser();
        selectedGender = user["gender"];
        selectedStatus = user["status"];
        var groupsOfUser = this.getGroupsOfUser();
        for(var i=0; i<groupsOfUser.length; i++) {
            selectedGroups.push(groupsOfUser[i]);
        }
        
        var selectGenderOptions = {
            "data-key" : "key",
            "data-text" : "text",
            "has-place-holder" : true,
            "place-holder" : "Select gender",
            "selected-key" : selectedGender,
        };
        InspiniaFormUtil.setSelect2(UserConsts.getUserGender(), 
                selectGender, selectGenderOptions);
        
        var selectStatusOptions = {
            "data-key" : "key",
            "data-text" : "text",
            "has-place-holder" : true,
            "place-holder" : "Select status",
            "selected-key" : selectedStatus,
        };
        InspiniaFormUtil.setSelect2(UserConsts.getUserStatus(), 
                selectStatus, selectStatusOptions);
        
        var groups = this.getGroups();
        var selectGroupOptions = {
            "data-key" : "id",
            "data-text" : "name",
            "has-place-holder" : true,
            "place-holder" : "Select group",
            "selected-key" : selectedGroups,
        };
        InspiniaFormUtil.setSelect2(groups, selectGroup, selectGroupOptions);
    },
    close : function() {
        this.unbind();
        this.remove();
        delete this.$el;
        delete this.el;
    }
});
// my profile view end

/*
-- clear data
truncate user;
truncate group;
truncate group_has_function;
truncate group_has_user;
truncate role;
truncate function;
truncate action_log;

-- init data
-- table role
INSERT INTO role (id,name) VALUES ('USER','User Management');
INSERT INTO role (id,name) VALUES ('GROUP','Group Management');
INSERT INTO role (id,name) VALUES ('ROLE','Role Management');
INSERT INTO role (id,name) VALUES ('HOST','Host Management');
INSERT INTO role (id,name) VALUES ('SERVICE','Service Management');
INSERT INTO role (id,name) VALUES ('ROUTING','Routing Management');
INSERT INTO role (id,name) VALUES ('ACTION_LOG','Action Log Management');

-- table function
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ROLE',1,'View');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ROLE',16,'Function Configuration');

INSERT INTO function (role_id,permission_id,permission_name) VALUES ('USER',1,'View');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('USER',2,'Update');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('USER',4,'Add');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('USER',8,'Delete');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('USER',16,'Group Assignment');

INSERT INTO function (role_id,permission_id,permission_name) VALUES ('GROUP',1,'View');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('GROUP',2,'Update');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('GROUP',4,'Add');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('GROUP',8,'Delete');

INSERT INTO function (role_id,permission_id,permission_name) VALUES ('HOST',1,'View');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('HOST',2,'Update');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('HOST',4,'Add');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('HOST',8,'Delete');

INSERT INTO function (role_id,permission_id,permission_name) VALUES ('SERVICE',1,'View');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('SERVICE',2,'Update');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('SERVICE',4,'Add');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('SERVICE',8,'Delete');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('SERVICE',16,'Field Configuration');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('SERVICE',32,'Input Field Configuration');

INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ROUTING',1,'View');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ROUTING',2,'Update');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ROUTING',4,'Add');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ROUTING',8,'Delete');
INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ROUTING',16,'Field Configuration');

INSERT INTO function (role_id,permission_id,permission_name) VALUES ('ACTION_LOG',1,'View');

-- table group_has_function
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ROLE',1);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ROLE',16);

INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','USER',1);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','USER',2);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','USER',4);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','USER',8);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','USER',16);

INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','GROUP',1);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','GROUP',2);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','GROUP',4);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','GROUP',8);

INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','HOST',1);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','HOST',2);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','HOST',4);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','HOST',8);

INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','SERVICE',1);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','SERVICE',2);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','SERVICE',4);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','SERVICE',8);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','SERVICE',16);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','SERVICE',32);

INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ROUTING',1);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ROUTING',2);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ROUTING',4);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ROUTING',8);
INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ROUTING',16);

INSERT INTO group_has_function (group_id,role_id,permission_id) VALUES ('group-superadmin','ACTION_LOG',1);

-- table group_has_user
INSERT INTO group_has_user (group_id,user_id) VALUES ('group-superadmin','superadmin');

-- table user
INSERT INTO group(id,description,name) VALUES('group-superadmin','','Super Admin Group');
INSERT INTO group(id,description,name) VALUES('group-01','','Group 01');
INSERT INTO group(id,description,name) VALUES('group-02','','Group 02');

-- table user
INSERT INTO user (id,full_name,gender,contact_number,email_address,username,password,last_updated,last_signed_in,created_date,status) VALUES ('superadmin','Super Admin','male','+84123456789','superadmin@abc.def','superadmin','90BBB23D2B633AC4B95BCEE603286E67',1476845259812,1476845259812,1476845259812,'ACT');
*/