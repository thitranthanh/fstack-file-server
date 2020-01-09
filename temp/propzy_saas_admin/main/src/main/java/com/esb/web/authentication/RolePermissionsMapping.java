package com.esb.web.authentication;

public class RolePermissionsMapping {

    /** GLOBAL ROLE CONSTS START **/
    public static final String ROLE_PERMISSION_SPLITTER = ":";

    public static final String ROLE_USER = "USER";
    public static final String ROLE_GROUP = "GROUP";
    public static final String ROLE_ROLE = "ROLE";
    public static final String ROLE_FUNCTION = "FUNCTION";
    public static final String ROLE_HOST = "HOST";
    public static final String ROLE_SERVICE = "SERVICE";
    public static final String ROLE_ROUTING = "ROUTING";
    public static final String ROLE_MAPPING_FIELD = "MAPPING_FIELD";
    /** GLOBAL ROLE CONSTS END **/

    /** GLOBAL PERMISSION CONSTS START **/
    public static final int PERMISSION_VIEW = 1;
    public static final int PERMISSION_UPDATE = 2;
    public static final int PERMISSION_ADD = 4;
    public static final int PERMISSION_DELETE = 8;
    /** GLOBAL PERMISSION CONSTS END **/

    /** USER ROLE PERMISSION CONSTS START **/
    // view user (USER:1)
    public static final String USER_VIEW_PERMISSION = ROLE_USER + ROLE_PERMISSION_SPLITTER + PERMISSION_VIEW;
    // update user (USER:2)
    public static final String USER_UPDATE_PERMISSION = ROLE_USER + ROLE_PERMISSION_SPLITTER + PERMISSION_UPDATE;
    // add user (USER:4)
    public static final String USER_ADD_PERMISSION = ROLE_USER + ROLE_PERMISSION_SPLITTER + PERMISSION_ADD;
    // delete user (USER:8)
    public static final String USER_DELETE_PERMISSION = ROLE_USER + ROLE_PERMISSION_SPLITTER + PERMISSION_DELETE;
    // assign group for user (USER:16)
    public static final String USER_ASSIGN_GROUP_PERMISSION = ROLE_USER + ROLE_PERMISSION_SPLITTER + 16;
    // reset user password (USER:32)
    public static final String USER_RESET_PASSWORD_PERMISSION = ROLE_USER + ROLE_PERMISSION_SPLITTER + 32;
    /** USER ROLE PERMISSION CONSTS END **/

    /** GROUP ROLE PERMISSION CONSTS START **/
    // view group (GROUP:1)
    public static final String GROUP_VIEW_PERMISSION = ROLE_GROUP + ROLE_PERMISSION_SPLITTER + PERMISSION_VIEW;
    // update group (GROUP:2)
    public static final String GROUP_UPDATE_PERMISSION = ROLE_GROUP + ROLE_PERMISSION_SPLITTER + PERMISSION_UPDATE;
    // add group (GROUP:4)
    public static final String GROUP_ADD_PERMISSION = ROLE_GROUP + ROLE_PERMISSION_SPLITTER + PERMISSION_ADD;
    // delete group (GROUP:8)
    public static final String GROUP_DELETE_PERMISSION = ROLE_GROUP + ROLE_PERMISSION_SPLITTER + PERMISSION_DELETE;
    /** GROUP ROLE PERMISSION CONSTS END **/

    /** ROLE ROLE PERMISSION CONSTS START **/
    // view role (ROLE:1)
    public static final String ROLE_VIEW_PERMISSION = ROLE_ROLE + ROLE_PERMISSION_SPLITTER + PERMISSION_VIEW;

    // config function role (ROLE:16)
    public static final String ROLE_CONFIG_FUNCTION_PERMISSION = ROLE_ROLE + ROLE_PERMISSION_SPLITTER + 16;
    /** ROLE ROLE PERMISSION CONSTS END **/

}
