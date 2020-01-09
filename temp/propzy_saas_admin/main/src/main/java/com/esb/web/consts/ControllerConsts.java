package com.esb.web.consts;

public interface ControllerConsts {

    public static final String WEB_CONTROLLER_URL = "web/controller";

    public static final String WEB_PUBLIC_CONTROLLER_URL = WEB_CONTROLLER_URL + "/public";

    public static final String WEB_AUTHENTICATED_CONTROLLER_URL = WEB_CONTROLLER_URL + "/authenticated";

    public static final String LOGIN_PAGE = "login";
    public static final String INDEX_PAGE = "index#users";
    public static final String USER_PROFILE_PAGE = "index#my-profile";

    /** Authentication Controller START **/
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String DO_LOGIN = "/doLogin";
    public static final String EXPIRED_SESSION = "/expiredSession";
    public static final String CHECK_EXPIRED_SESSION = "/checkSessionExpired";
    /** Authentication Controller END **/

    public static final String USERS_GET_BASIC_INFO_SESSION = WEB_AUTHENTICATED_CONTROLLER_URL + "/basic-info-session";

    // user module start
    public static final String USERS = WEB_AUTHENTICATED_CONTROLLER_URL + "/users";

    public static final String USERS_LIST_USER_DATA_MODEL = USERS + "/list-user-data-model";

    public static final String USERS_ADD_USER_DATA_MODEL = USERS + "/add-user-data-model";

    public static final String USERS_EDIT_USER_DATA_MODEL = USERS + "/edit-user-data-model/user-id/{userId}";

    public static final String USERS_DELETE_USER_BY_USER_ID = USERS + "/user-id/{userId}";

    public static final String USERS_MY_PROFILE_DATA_MODEL = USERS + "/my-profile-data-model";

    public static final String USERS_UPDATE_MY_PROFILE = USERS + "/update-my-profile";

    public static final String USERS_CHANGE_PASSWORD = USERS + "/change-password";

    public static final String USERS_UPDATE_USER_STATUS = USERS + "/update-user-status";

    public static final String USERS_RESET_PASSWORD = USERS + "/reset-password/user-id/{userId}";

    public static final String USERS_VALIDATE_USER = USERS + "/validate";
    // user module end

    // group module start
    public static final String GROUPS = WEB_AUTHENTICATED_CONTROLLER_URL + "/groups";

    public static final String GROUPS_LIST_GROUP_DATA_MODEL = GROUPS + "/list-group-data-model";

    public static final String GROUPS_ADD_GROUP_DATA_MODEL = GROUPS + "/add-group-data-model";

    public static final String GROUPS_EDIT_GROUP_DATA_MODEL = GROUPS + "/edit-group-data-model/group-id/{groupId}";

    public static final String GROUPS_DELETE_GROUP_BY_GROUP_ID = GROUPS + "/group-id/{groupId}";
    // group module end

    // role module start
    public static final String ROLES = WEB_AUTHENTICATED_CONTROLLER_URL + "/roles";

    public static final String ROLES_LIST_ROLE_DATA_MODEL = ROLES + "/list-role-data-model";
    // role module end

    // host module start
    public static final String HOSTS = WEB_AUTHENTICATED_CONTROLLER_URL + "/hosts";

    public static final String HOSTS_LIST_HOST_DATA_MODEL = HOSTS + "/list-host-data-model";

    public static final String HOSTS_ADD_HOST_DATA_MODEL = HOSTS + "/add-host-data-model";

    public static final String HOSTS_EDIT_HOST_DATA_MODEL = HOSTS + "/edit-host-data-model/host-id/{hostId}";

    public static final String HOSTS_DELETE_HOST_BY_HOST_ID = HOSTS + "/host-id/{hostId}";

    public static final String HOSTS_VALIDATE_HOST = HOSTS + "/validate";
    // host module end

    // service module start
    public static final String SERVICES = WEB_AUTHENTICATED_CONTROLLER_URL + "/services";

    public static final String SERVICES_LIST_SERVICE_DATA_MODEL = SERVICES + "/list-service-data-model";

    public static final String SERVICES_ADD_SERVICE_DATA_MODEL = SERVICES + "/add-service-data-model";

    public static final String SERVICES_EDIT_SERVICE_DATA_MODEL = SERVICES
            + "/edit-service-data-model/service-id/{serviceId}";

    public static final String SERVICES_DELETE_SERVICE_BY_SERVICE_ID = SERVICES + "/service-id/{serviceId}";
    // service module end

    // routing module start
    public static final String ROUTINGS = WEB_AUTHENTICATED_CONTROLLER_URL + "/routings";

    public static final String ROUTINGS_LIST_ROUTING_DATA_MODEL = ROUTINGS + "/list-routing-data-model";

    public static final String ROUTINGS_ADD_ROUTING_DATA_MODEL = ROUTINGS + "/add-routing-data-model";

    public static final String ROUTINGS_EDIT_ROUTING_DATA_MODEL = ROUTINGS
            + "/edit-routing-data-model/routing-id/{routingId}";

    public static final String ROUTINGS_DELETE_ROUTING_BY_ROUTING_ID = ROUTINGS + "/routing-id/{routingId}";
    // routing module end

    // mapping field module start
    public static final String MAPPING_FIELDS = WEB_AUTHENTICATED_CONTROLLER_URL + "/mapping-fields";

    public static final String MAPPING_FIELDS_LIST_ROUTING_DATA_MODEL = MAPPING_FIELDS
            + "/list-mapping-field-data-model/routing-id/{routingId}";
    // mapping field module end

    // action log module start
    public static final String ACTION_LOGS = WEB_AUTHENTICATED_CONTROLLER_URL + "/action-logs";

    public static final String ACTION_LOGS_LIST_ACTION_LOG_DATA_MODEL = ACTION_LOGS + "/list-action-log-data-model";
    // action log module end
}
