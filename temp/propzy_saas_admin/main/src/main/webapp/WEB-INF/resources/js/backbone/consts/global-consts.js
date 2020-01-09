var UserConsts = function() {
    
    var USER_STATUS_ACTIVED_KEY = "ACT";
    var USER_STATUS_LOCKED_KEY = "LCK";
    
    var USER_STATUS_ACTIVED = {
        "key" : USER_STATUS_ACTIVED_KEY,
        "text" : "Actived",
        "html" : "<span class=\"label label-primary\">Actived</span>"
    };
    
    var USER_STATUS_LOCKED = {
        "key" : USER_STATUS_LOCKED_KEY,
        "text" : "Locked",
        "html" : "<span class=\"label label-danger\">Locked</span>"
    };
    var USER_STATUS = [USER_STATUS_ACTIVED, USER_STATUS_LOCKED];

    var USER_GENDER_MALE_KEY = "male";
    var USER_GENDER_FEMALE_KEY = "female";
    
    var USER_GENDER_MALE = {
        "key" : USER_GENDER_MALE_KEY,
        "text" : "Male",
        "html" : "Male"
    };
    
    var USER_GENDER_FEMALE = {
        "key" : USER_GENDER_FEMALE_KEY,
        "text" : "Female",
        "html" : "Female"
    };
    var USER_GENDER = [USER_GENDER_MALE, USER_GENDER_FEMALE];
    
    var listUserBreadcrumb = [{
        name : "List Of User"
    }];
    
    var addUserBreadcrumb = [{
        url : "index#users",
        name : "List Of User",
    }, {
        name : "Add User",
    }];
    
    var editUserBreadcrumb = [{
        url : "index#users",
        name : "List Of User",
    }, {
        name : "Edit User",
    }];
    
    var myProfileBreadcrumb = [{
        name : "User Profile",
    }];
    
    return {
        getDialogContainerId : function() {
            return "user-dialog-container";
        },
        getBreadcrumbHeader : function() {
            return "User Management";
        },
        getListUserBreadcrumb : function() {
            return listUserBreadcrumb;
        },
        getAddUserBreadcrumb : function() {
            return addUserBreadcrumb;
        },
        getEditUserBreadcrumb : function() {
            return editUserBreadcrumb;
        },
        getMyProfileBreadcrumb : function() {
            return myProfileBreadcrumb;
        },
        getUserStatus : function() {
            return USER_STATUS;
        },
        getUserStatusHtml : function(status) {
            var ret = "";
            if(status == USER_STATUS_ACTIVED_KEY) {
                ret = USER_STATUS_ACTIVED["html"];
            } else if(status == USER_STATUS_LOCKED_KEY) {
                ret = USER_STATUS_LOCKED["html"];
            }
            return ret;
        },
        getUserStatusActivedKey : function() {
            return USER_STATUS_ACTIVED_KEY;
        },
        getUserStatusLockedKey : function() {
            return USER_STATUS_LOCKED_KEY;
        },
        isUserStatusActived : function(status) {
            return status == USER_STATUS_ACTIVED_KEY;
        },
        getUserGender : function() {
            return USER_GENDER;
        },
        getUserGenderHtml : function(gender) {
            var ret = "";
            if(gender == USER_GENDER_MALE_KEY) {
                ret = USER_GENDER_MALE["html"];
            } else if(gender == USER_GENDER_FEMALE_KEY) {
                ret = USER_GENDER_FEMALE["html"];
            }
            return ret;
        },
    };
}();

var GroupConsts = function() {
    
    var listGroupBreadcrumb = [{
        name : "List Of Group"
    }];
    
    var addGroupBreadcrumb = [{
        url : "index#groups",
        name : "List Of Group",
    }, {
        name : "Add Group",
    }];
    
    var editGroupBreadcrumb = [{
        url : "index#groups",
        name : "List Of Group",
    }, {
        name : "Edit Group",
    }];
    
    return {
        getBreadcrumbHeader : function() {
            return "Group Management";
        },
        getListGroupBreadcrumb : function() {
            return listGroupBreadcrumb;
        },
        getAddGroupBreadcrumb : function() {
            return addGroupBreadcrumb;
        },
        getEditGroupBreadcrumb : function() {
            return editGroupBreadcrumb;
        },
    };
}();

var RoleConsts = function() {
    
    var listRoleBreadcrumb = [{
        name : "List Of Role"
    }];

    return {
        getBreadcrumbHeader : function() {
            return "Role Management";
        },
        getListRoleBreadcrumb : function() {
            return listRoleBreadcrumb;
        },
    };
}();

var HostConsts = function() {
    
    var listHostBreadcrumb = [{
        name : "List Of Host"
    }];

    var addHostBreadcrumb = [{
        url : "index#hosts",
        name : "List Of Host",
    }, {
        name : "Add Host",
    }];
    
    var editHostBreadcrumb = [{
        url : "index#hosts",
        name : "List Of Host",
    }, {
        name : "Edit Host",
    }];
    return {
        getBreadcrumbHeader : function() {
            return "Host Management";
        },
        getListHostBreadcrumb : function() {
            return listHostBreadcrumb;
        },
        getAddHostBreadcrumb : function() {
            return addHostBreadcrumb;
        },
        getEditHostBreadcrumb : function() {
            return editHostBreadcrumb;
        },
        getHostStatusHtml : function(status) {
            var ret = "";
            if(status == true) {
                ret = "<span class=\"label label-primary\">Actived</span>";
            } else if(status == false) {
                ret = "<span class=\"label label-danger\">Locked</span>";
            }
            return ret;
        },
    };
}();

var ServiceConsts = function() {
    
    var listServiceBreadcrumb = [{
        name : "List Of Service"
    }];
    
    var addServiceBreadcrumb = [{
        url : "index#services",
        name : "List Of Service",
    }, {
        name : "Add Service",
    }];
    
    var editServiceBreadcrumb = [{
        url : "index#services",
        name : "List Of Service",
    }, {
        name : "Edit Service",
    }];
    
    var SERVICE_PROTOCOL_SOAP_KEY = "http";
    var SERVICE_PROTOCOL_REST_KEY = "https";

    var SERVICE_PROTOCOL_SOAP = {
        "key" : SERVICE_PROTOCOL_SOAP_KEY,
        "text" : "HTTP",
    };
    
    var SERVICE_PROTOCOL_REST = {
        "key" : SERVICE_PROTOCOL_REST_KEY,
        "text" : "HTTPS",
    };
    
    var SERVICE_PROTOCOL = [ SERVICE_PROTOCOL_SOAP, SERVICE_PROTOCOL_REST ];
    
    var SERVICE_METHOD_GET_KEY = "get";
    var SERVICE_METHOD_POST_KEY = "post";
    var SERVICE_METHOD_PUT_KEY = "put";
    var SERVICE_METHOD_DELETE_KEY = "delete";

    var SERVICE_METHOD_GET = {
        "key" : SERVICE_METHOD_GET_KEY,
        "text" : "GET",
    };
    
    var SERVICE_METHOD_POST = {
        "key" : SERVICE_METHOD_POST_KEY,
        "text" : "POST",
    };
    
    var SERVICE_METHOD_PUT = {
        "key" : SERVICE_METHOD_PUT_KEY,
        "text" : "PUT",
    };
    
    var SERVICE_METHOD_DELETE = {
        "key" : SERVICE_METHOD_DELETE_KEY,
        "text" : "DELETE",
    };
    
    var SERVICE_METHOD = [ SERVICE_METHOD_GET, SERVICE_METHOD_POST, 
                           SERVICE_METHOD_PUT, SERVICE_METHOD_DELETE ];
    
    var SERVICE_MESSAGE_FORMAT_XML_KEY = "xml";
    var SERVICE_MESSAGE_FORMAT_JSON_KEY = "json";

    var SERVICE_MESSAGE_FORMAT_XML = {
        "key" : SERVICE_MESSAGE_FORMAT_XML_KEY,
        "text" : "XML",
    };
    
    var SERVICE_MESSAGE_FORMAT_JSON = {
        "key" : SERVICE_MESSAGE_FORMAT_JSON_KEY,
        "text" : "JSON",
    };
    
    var SERVICE_MESSAGE_FORMAT = [ SERVICE_MESSAGE_FORMAT_XML, SERVICE_MESSAGE_FORMAT_JSON ];
    
    return {
        getBreadcrumbHeader : function() {
            return "Service Management";
        },
        getListServiceBreadcrumb : function() {
            return listServiceBreadcrumb;
        },
        getAddServiceBreadcrumb : function() {
            return addServiceBreadcrumb;
        },
        getEditServiceBreadcrumb : function() {
            return editServiceBreadcrumb;
        },
        getIsAuthenHeaderHtml : function(status) {
            var ret = "";
            if(status == true) {
                ret = "<i class=\"fa fa-check-square-o\" style=\"color: #1ab394;\"></i>";
            } else if(status == false) {
                ret = "<i class=\"fa fa-square-o\" style=\"color: #676a6c;\"></i>";
            }
            return ret;
        },
        getIsResultArrayHtml : function(status) {
            return this.getIsAuthenHeaderHtml(status);
        },
        getIsActivedHtml : function(status) {
            return this.getIsAuthenHeaderHtml(status);
        },
        getProtocol : function() {
            return SERVICE_PROTOCOL;
        },
        getProtocolHtml : function(protocol) {
            var ret = "";
            if(protocol == SERVICE_PROTOCOL_SOAP_KEY) {
                ret = SERVICE_PROTOCOL_SOAP["text"];
            } else if(protocol == SERVICE_PROTOCOL_REST_KEY) {
                ret = SERVICE_PROTOCOL_REST["text"];
            }
            return ret;
        },
        getMethod : function() {
            return SERVICE_METHOD;
        },
        getMethodHtml : function(method) {
            var ret = "";
            if(method == SERVICE_METHOD_GET_KEY) {
                ret = SERVICE_METHOD_GET["text"];
            } else if(method == SERVICE_METHOD_POST_KEY) {
                ret = SERVICE_METHOD_POST["text"];
            } else if(method == SERVICE_METHOD_PUT_KEY) {
                ret = SERVICE_METHOD_PUT["text"];
            } else if(method == SERVICE_METHOD_DELETE_KEY) {
                ret = SERVICE_METHOD_DELETE["text"];
            }
            return ret;
        },
        getMessageFormat : function() {
            return SERVICE_MESSAGE_FORMAT;
        },
        getMessageFormatHtml : function(messageFormat) {
            var ret = "";
            if(messageFormat == SERVICE_MESSAGE_FORMAT_XML_KEY) {
                ret = SERVICE_MESSAGE_FORMAT_XML["text"];
            } else if(messageFormat == SERVICE_MESSAGE_FORMAT_JSON_KEY) {
                ret = SERVICE_MESSAGE_FORMAT_JSON["text"];
            }
            return ret;
        },
    };
}();

var RoutingConsts = function() {
    
    var listRoutingBreadcrumb = [{
        name : "List Of Routing"
    }];
    
    var addRoutingBreadcrumb = [{
        url : "index#routings",
        name : "List Of Routing",
    }, {
        name : "Add Routing",
    }];
    
    var editRoutingBreadcrumb = [{
        url : "index#routings",
        name : "List Of Routing",
    }, {
        name : "Edit Routing",
    }];
    
    var SERVICE_TYPE_REQUEST_KEY = "request";
    var SERVICE_TYPE_RESPONSE_KEY = "response";

    var SERVICE_TYPE_REQUEST = {
        "key" : SERVICE_TYPE_REQUEST_KEY,
        "text" : "Request",
    };
    
    var SERVICE_TYPE_RESPONSE = {
        "key" : SERVICE_TYPE_RESPONSE_KEY,
        "text" : "Response",
    };
    
    var SERVICE_TYPE = [ SERVICE_TYPE_REQUEST, SERVICE_TYPE_RESPONSE ];
    
    return {
        getBreadcrumbHeader : function() {
            return "Routing Management";
        },
        getListRoutingBreadcrumb : function() {
            return listRoutingBreadcrumb;
        },
        getAddRoutingBreadcrumb : function() {
            return addRoutingBreadcrumb;
        },
        getEditRoutingBreadcrumb : function() {
            return editRoutingBreadcrumb;
        },
        getIsMappingHtml : function(status) {
            var ret = "";
            if(status == true) {
                ret = "<i class=\"fa fa-check-square-o\" style=\"color: #1ab394;\"></i>";
            } else if(status == false) {
                ret = "<i class=\"fa fa-square-o\" style=\"color: #676a6c;\"></i>";
            }
            return ret;
        },
        getIsActivedHtml : function(status) {
            return this.getIsMappingHtml(status);
        },
        getIsModifyHtml : function(status) {
            return this.getIsMappingHtml(status);
        },
        getServiceType : function(status) {
            return SERVICE_TYPE;
        },
        getServiceTypeHtml : function(serviceType) {
            var ret = "";
            if(serviceType == SERVICE_TYPE_REQUEST_KEY) {
                ret = SERVICE_TYPE_REQUEST["text"];
            } else if(serviceType == SERVICE_TYPE_RESPONSE_KEY) {
                ret = SERVICE_TYPE_RESPONSE["text"];
            }
            return ret;
        },
    };
}();

var ActionLogConsts = function() {
    
    var listActionLogBreadcrumb = [{
        name : "List Of Action Log"
    }];

    return {
        getBreadcrumbHeader : function() {
            return "Action Log Management";
        },
        getListActionLogBreadcrumb : function() {
            return listActionLogBreadcrumb;
        },
        getActionLogStatusHtml : function(status) {
            var ret = "";
            if(status == "SUCCESS") {
                ret = "<span class=\"label label-primary\">Success</span>";
            } else if(status == "FAIL") {
                ret = "<span class=\"label label-danger\">Fail</span>";
            } else {
                ret = status;
            }
            return ret;
        },
    };
}();

var MessageMapping = {
    "-1" : "There's must be some errors, please try again...",
    "-1_0" : "Request timeout...",
    
    "USER_001" : "User '{0}' has been successfully added",
    "USER_002" : "User '{0}' has been successfully updated",
    "USER_003" : "User '{0}' has been successfully deleted",
    "USER_004" : "User '{0}' has been successfully assigned group",
    "USER_005" : "Your profile has been successfully changed",
    "USER_006" : "Your password has been successfully changed",
    "USER_007" : "User '{0}' has been successfully locked",
    "USER_008" : "User '{0}' has been successfully unlocked",
    "USER_009" : "User '{0}' has been successfully reset password",
    "USER_101" : "Do you really want to add user?",
    "USER_102" : "Do you really want to update user?",
    "USER_103" : "Do you really want to delete user '{0}'?",
    "USER_104" : "Do you really want to lock user '{0}'?",
    "USER_105" : "Do you really want to unlock user '{0}'?",
    "USER_106" : "Do you really want to reset password user '{0}'?",
    "USER_107" : "Do you really want to update user profile?",
    "USER_108" : "Do you really want to change password?",
    "USER_109" : "Do you really want to cancel and go back to list user?",
    
    "FUNCTION_001" : "Function '{0}' has been successfully added",
    "FUNCTION_002" : "Function '{0}' has been successfully updated",
    "FUNCTION_003" : "Function '{0}' has been successfully deleted",
    "FUNCTION_101" : "Do you really want to add function '{0}'?",
    "FUNCTION_102" : "Do you really want to update function '{0}'?",
    "FUNCTION_103" : "Do you really want to delete function '{0}'?",
    
    "GROUP_001" : "Group '{0}' has been successfully deleted",
    "GROUP_002" : "Group '{0}' has been successfully deleted",
    "GROUP_003" : "Group '{0}' has been successfully deleted",
    "GROUP_101" : "Do you really want to add group?",
    "GROUP_102" : "Do you really want to update group?",
    "GROUP_103" : "Do you really want to delete group '{0}'?",
    "GROUP_109" : "Do you really want to cancel and go back to list group?",
    
    "ROLE_001" : "Role '{0}' has been successfully deleted",
    "ROLE_002" : "Role '{0}' has been successfully deleted",
    "ROLE_003" : "Role '{0}' has been successfully deleted",
    "ROLE_101" : "Do you really want to add role '{0}'?",
    "ROLE_102" : "Do you really want to update role '{0}'?",
    "ROLE_103" : "Do you really want to delete role '{0}'?",
    
    "HOST_001" : "Host '{0}' has been successfully added",
    "HOST_002" : "Host '{0}' has been successfully updated",
    "HOST_003" : "Host '{0}' has been successfully deleted",
    "HOST_101" : "Do you really want to add host?",
    "HOST_102" : "Do you really want to update host?",
    "HOST_103" : "Do you really want to delete host '{0}'?",
    "HOST_109" : "Do you really want to cancel and go back to list host?",
    
    "SERVICE_001" : "Service '{0}' has been successfully added",
    "SERVICE_002" : "Service '{0}' has been successfully updated",
    "SERVICE_003" : "Service '{0}' has been successfully deleted",
    "SERVICE_101" : "Do you really want to add service?",
    "SERVICE_102" : "Do you really want to update service?",
    "SERVICE_103" : "Do you really want to delete service '{0}'?",
    "SERVICE_109" : "Do you really want to cancel and go back to list service?",
    
    "ROUTING_001" : "Routing '{0}' has been successfully added",
    "ROUTING_002" : "Routing '{0}' has been successfully updated",
    "ROUTING_003" : "Routing '{0}' has been successfully deleted",
    "ROUTING_101" : "Do you really want to add routing?",
    "ROUTING_102" : "Do you really want to update routing?",
    "ROUTING_103" : "Do you really want to delete routing '{0}'?",
    "ROUTING_109" : "Do you really want to cancel and go back to list routing?",
    
    "MAPPING_FIELD_001" : "Mapping fields has been successfully saved",
};