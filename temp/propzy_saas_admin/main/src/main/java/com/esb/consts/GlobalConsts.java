package com.esb.consts;

public interface GlobalConsts {

    public static final String DEFAULT_SUPERADMIN_USERNAME = "superadmin";
    public static final String DEFAULT_GROUP_SUPERADMIN = "group-superadmin";

    public static final int MAX_RECORD = Integer.MAX_VALUE;

    public final static String J_USERNAME = "j_username";
    public final static String J_PASSWORD = "j_password";
    public final static String AJAX_HEADER = "XMLHttpRequest";
    public final static String AJAX_HEADER_ATTRIBUTE = "X-Requested-With";

    public final static String STATUS_ACTIVED = "ACT";
    public final static String STATUS_LOCKED = "LCK";
    public final static String STATUS_DELETED = "DEL";

    public final static String USER_DEFAULT_PASSWORD = "abc@123";
    public final static String USER_COOKIE = "user_cookie";
    public final static String USER_COOKIE_USERNAME = "user_cookie_username";
    public final static String USER_COOKIE_PASSWORD = "user_cookie_password";
    public final static String USER_COOKIE_PATH = "/";
    public final static int USER_COOKIE_EXPIRED = 7 * 24 * 60 * 60;

    public static final int ACTION_LOG_TTL_DEFAULT = 180 * 24 * 60 * 60;

    public static final String DEFAULT_TIMEZONE = "GMT+07:00";

    // table name start

    /* authentication and authorization */
    public static final String TABLE_USER = "a_user";
    public static final String TABLE_FUNCTION = "a_function";
    public static final String TABLE_GROUP = "a_group";
    public static final String TABLE_GROUP_HAS_FUNCTION = "a_group_has_function";
    public static final String TABLE_GROUP_HAS_USER = "a_group_has_user";
    public static final String TABLE_ROLE = "a_role";
    public static final String TABLE_ACTION_LOG = "a_action_log";

    // table name end

    public static final String ACTION_LOG_ADD = "ADD";
    public static final String ACTION_LOG_UPDATE = "UPDATE";
    public static final String ACTION_LOG_DELETE = "DELETE";

    public static final String ACTION_LOG_FUNCTION_USER = "USER";
    public static final String ACTION_LOG_FUNCTION_GROUP = "GROUP";
    public static final String ACTION_LOG_FUNCTION_ROLE = "ROLE";
    public static final String ACTION_LOG_FUNCTION_FUNCTION = "FUNCTION";
    public static final String ACTION_LOG_FUNCTION_SERVICE = "SERVICE";
    public static final String ACTION_LOG_FUNCTION_SERVICE_FIELD = "SERVICE_FIELD";
    public static final String ACTION_LOG_FUNCTION_SERVICE_INPUT_FIELD = "SERVICE_INPUT_FIELD";
    public static final String ACTION_LOG_FUNCTION_ROUTING = "ROUTING";
    public static final String ACTION_LOG_FUNCTION_ROUTING_FIELD = "ROUTING_FIELD";
    public static final String ACTION_LOG_FUNCTION_HOST = "HOST";

    public static final String ACTION_LOG_STATUS_FAIL = "FAIL";
    public static final String ACTION_LOG_STATUS_SUCCESS = "SUCCESS";

    public static final String SERVICE_TYPE_REQ = "request";
    public static final String SERVICE_TYPE_RESP = "response";

    public static final String SERVICE_METHOD_GET = "GET";
    public static final String SERVICE_METHOD_POST = "POST";
    public static final String SERVICE_METHOD_PUT = "PUT";
    public static final String SERVICE_METHOD_DELETE = "DELETE";

}
