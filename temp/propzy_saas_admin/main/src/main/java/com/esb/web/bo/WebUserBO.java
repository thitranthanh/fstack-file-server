package com.esb.web.bo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.esb.consts.GlobalConsts;
import com.esb.entity.ActionLog;
import com.esb.entity.Group;
import com.esb.entity.User;
import com.esb.service.IActionLogService;
import com.esb.service.IGroupService;
import com.esb.service.IUserService;
import com.esb.util.CloudUtil;
import com.esb.util.RandomUtil;
import com.esb.util.Util;
import com.esb.web.authentication.RolePermissionsMapping;
import com.esb.web.authentication.SessionManager;
import com.esb.web.authentication.UserInfoSession;
import com.esb.web.consts.RespCodeConsts;
import com.esb.web.model.BasicInfoSession;
import com.esb.web.model.RespModel;
import com.esb.web.model.UserModel;
import com.google.gson.Gson;

@Service
public class WebUserBO {

    private static final Logger log = Logger.getLogger(WebUserBO.class);

    @Autowired
    private Gson gs;
    @Autowired
    private IActionLogService actionLogService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IGroupService groupService;

    @Autowired
    private SessionManager sessionManager;

    public BasicInfoSession getBasicInfoSession() {
        BasicInfoSession basicInfoSession = new BasicInfoSession();
        User user = this.userService.getUserByUserId(this.sessionManager.getUserId());
        Map<String, Integer> permissions = this.userService.getPermissions(user.getUsername());
        basicInfoSession.setUser(user);
        basicInfoSession.setPermissions(permissions);
        basicInfoSession.setDefaultPassword(GlobalConsts.USER_DEFAULT_PASSWORD);
        return basicInfoSession;
    }

    public UserInfoSession login(String usernameOrEmail, String password, String encryptedPassword) {
        UserInfoSession userInfoSession = null;
        try {
            User user = this.getUserByUsernameOrEmail(usernameOrEmail);
            if (user != null && user.getPassword().equals(encryptedPassword)
                    && GlobalConsts.STATUS_ACTIVED.equalsIgnoreCase(user.getStatus())) {
                String userName = user.getUsername();
                Map<String, Integer> permissions = this.getPermissions(userName);
                userInfoSession = new UserInfoSession(userName, password, user, permissions);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return userInfoSession;
    }

    public User getUserByUsernameOrEmail(String userNameOrEmail) {
        User user = null;
        try {
            user = this.userService.getUserByUserName(userNameOrEmail);
            if (user == null) {
                user = this.userService.getUserByEmail(userNameOrEmail);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return user;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.ROLE_USER + "')")
    public UserModel getListUserDataModel() {
        UserModel userModuleEntity = new UserModel();
        String currentUserId = sessionManager.getUserId();
        List<User> temp = this.userService.getListUser();
        List<User> users = new ArrayList<User>();
        for (User user : temp) {
            if (!currentUserId.equals(user.getId())
                    && !GlobalConsts.DEFAULT_SUPERADMIN_USERNAME.equals(user.getUsername())) {
                users.add(user);
            }
        }
        userModuleEntity.setUsers(users);
        return userModuleEntity;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.USER_VIEW_PERMISSION + "')"
            + " or hasPermission(principal, '" + RolePermissionsMapping.USER_ADD_PERMISSION + "')")
    public UserModel getAddUserDataModel() {
        UserModel userModuleEntity = new UserModel();
        List<Group> groups = this.groupService.getListGroup();
        userModuleEntity.setGroups(groups);
        return userModuleEntity;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.USER_VIEW_PERMISSION + "')"
            + " or hasPermission(principal, '" + RolePermissionsMapping.USER_UPDATE_PERMISSION + "')")
    public UserModel getEditUserDataModel(String userId) {
        UserModel userModuleEntity = new UserModel();
        User user = this.userService.getUserByUserId(userId);
        userModuleEntity.setUser(user);

        List<Group> groups = this.groupService.getListGroup();
        userModuleEntity.setGroups(groups);

        List<Group> groupsOfUser = this.groupService.getListGroupOfUser(userId);
        List<String> groupIds = new ArrayList<String>();
        for (Group group : groupsOfUser) {
            groupIds.add(group.getId());
        }
        userModuleEntity.setGroupsOfUser(groupIds);
        return userModuleEntity;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.USER_ADD_PERMISSION + "')")
    public RespModel addUser(UserModel userModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        User user = userModuleEntity.getUser();
        List<String> groupsOfUser = userModuleEntity.getGroupsOfUser();
        try {
            user.setId(RandomUtil.generateUserId());
            user.setUsername(user.getUsername().trim().toLowerCase());
            user.setEmailAddress(user.getEmailAddress().trim().toLowerCase());
            user.setContactNumber(user.getContactNumber().trim());
            user.setCreatedDate(System.currentTimeMillis());
            user.setPassword(CloudUtil.encryptPassword(user.getUsername(), GlobalConsts.USER_DEFAULT_PASSWORD));
            result = this.userService.addUser(user);
            if (result) {
                this.groupService.updateGroupHasUserByUserId(user.getId(), groupsOfUser);
                String[] params = { user.getFullName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.USER_ADD_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Add user " + "[user [%s] " + "[groups [%s] " + "[status [%s] ",
                    this.gs.toJson(user), this.gs.toJson(groupsOfUser), result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_ADD);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setComment("Add user ['" + user.getFullName() + "']");
            actionLog.setInput(this.gs.toJson(user));
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.USER_UPDATE_PERMISSION + "')")
    public RespModel updateUser(UserModel userModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        User user = userModuleEntity.getUser();
        List<String> groupsOfUser = userModuleEntity.getGroupsOfUser();
        try {
            Map<String, String> cols = new HashMap<String, String>();
            cols.put(User.FULLNAME, user.getFullName());
            cols.put(User.GENDER, user.getGender());
            cols.put(User.CONTACT_NUMBER, user.getContactNumber());
            cols.put(User.USERNAME, user.getUsername());
            cols.put(User.EMAIL_ADDRESS, user.getEmailAddress());
            cols.put(User.LAST_UPDATED, System.currentTimeMillis() + "");
            cols.put(User.USER_STATUS, user.getStatus());
            result = this.userService.updateUser(user.getId(), cols);
            if (result) {
                this.groupService.updateGroupHasUserByUserId(user.getId(), groupsOfUser);
                String[] params = { user.getFullName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.USER_UPDATE_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Update user " + "[user [%s] " + "[groups [%s] " + "[status [%s] ",
                    this.gs.toJson(user), this.gs.toJson(groupsOfUser), result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_UPDATE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setComment("Update user ['" + user.getFullName() + "']");
            actionLog.setInput(this.gs.toJson(user));
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.USER_UPDATE_PERMISSION + "')")
    public RespModel updateUserStatus(UserModel userModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        User user = userModuleEntity.getUser();
        String userId = user.getId();
        String status = user.getStatus();
        user = this.userService.getUserByUserId(userId);

        try {
            Map<String, String> cols = new HashMap<String, String>();
            cols.put(User.USER_STATUS, status);
            result = this.userService.updateUser(user.getId(), cols);
            if (result) {
                String[] params = { user.getFullName() };
                respModel.setStatusSuccess();
                if (GlobalConsts.STATUS_ACTIVED.equals(status)) {
                    respModel.setRespCode(RespCodeConsts.USER_UNLOCK_USER_SUCCESS, params);
                } else {
                    respModel.setRespCode(RespCodeConsts.USER_LOCK_USER_SUCCESS, params);
                }
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Update user status" + "[userId [%s] " + "[status [%s] " + "[result [%s] ", userId,
                    status, result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_UPDATE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setComment("Update user status ['" + user.getFullName() + "']");
            actionLog.setInput(status);
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.USER_UPDATE_PERMISSION + "')")
    public RespModel resetPassword(String userId) {
        RespModel respModel = new RespModel();
        boolean result = false;
        User user = this.userService.getUserByUserId(userId);
        try {
            Map<String, String> cols = new HashMap<String, String>();
            cols.put(User.PASSWORD, CloudUtil.encryptPassword(user.getUsername(), GlobalConsts.USER_DEFAULT_PASSWORD));
            result = this.userService.updateUser(user.getId(), cols);
            if (result) {
                String[] params = { user.getFullName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.USER_RESET_PASSWORD_USER_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Reset password " + "[userId [%s] " + "[result [%s] ", userId, result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_UPDATE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setComment("Reset password user ['" + user.getFullName() + "']");
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.USER_DELETE_PERMISSION + "')")
    public RespModel deleteUserByUserId(String userId) {
        RespModel respModel = new RespModel();
        boolean result = false;
        User user = this.userService.getUserByUserId(userId);
        try {
            if (user != null) {
                result = this.userService.deleteUserByUserId(userId);
            }
            if (result) {
                String[] params = { user.getFullName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.USER_DELETE_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Delete user " + "[userId [%s] " + "[status [%s] ", userId, result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_DELETE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setInput(user.getId());
            actionLog.setComment("Delete user ['" + user.getFullName() + "']");
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    public Map<String, Integer> getPermissions(String userName) {
        return this.userService.getPermissions(userName);
    }

    public UserModel getMyProfileDataModel() {
        UserModel userModuleEntity = new UserModel();
        String userId = this.sessionManager.getUserId();
        userModuleEntity.setUser(this.userService.getUserByUserId(userId));

        List<Group> groups = this.groupService.getListGroupOfUser(userId);
        userModuleEntity.setGroups(groups);

        List<String> groupIds = new ArrayList<String>();
        for (Group group : groups) {
            groupIds.add(group.getId());
        }
        userModuleEntity.setGroupsOfUser(groupIds);

        return userModuleEntity;
    }

    public RespModel updateMyProfile(UserModel userModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        String userId = this.sessionManager.getUserId();
        try {
            User user = this.userService.getUserByUserId(userId);
            if (user != null) {
                User targetUser = userModuleEntity.getUser();
                Map<String, String> cols = new HashMap<String, String>();
                cols.put(User.FULLNAME, targetUser.getFullName());
                cols.put(User.GENDER, targetUser.getGender());
                cols.put(User.CONTACT_NUMBER, targetUser.getContactNumber());
                cols.put(User.EMAIL_ADDRESS, targetUser.getEmailAddress());
                cols.put(User.LAST_UPDATED, System.currentTimeMillis() + "");
                result = this.userService.updateUser(user.getId(), cols);
            }
            if (result) {
                String[] params = { user.getFullName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.USER_UPDATE_MY_PROFILE_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Update my profile " + "[userId [%s] " + "[user [%s] " + "[status [%s] ", userId,
                    this.gs.toJson(userModuleEntity.getUser()), result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    public RespModel changePassword(UserModel userModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        String userName = this.sessionManager.getUserName();
        String oldPassword = userModuleEntity.getOldPassword();
        String newPassword = userModuleEntity.getNewPassword();
        try {
            User user = this.userService.getUserByUserName(userName);
            if (user != null) {
                String encryptedOldPassword = CloudUtil.encryptPassword(userName, oldPassword);
                if (encryptedOldPassword.equals(user.getPassword())) {
                    Map<String, String> cols = new HashMap<String, String>();
                    cols.put(User.PASSWORD, CloudUtil.encryptPassword(userName, newPassword));
                    cols.put(User.LAST_UPDATED, System.currentTimeMillis() + "");
                    result = this.userService.updateUser(user.getId(), cols);
                }
            }
            if (result) {
                String[] params = { user.getFullName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.USER_CHANGE_PASSWORD_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format(
                    "Change password " + "[username [%s] " + "[old password [%s] " + "[new password [%s] ", userName,
                    oldPassword, ""));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    public RespModel validate(UserModel userModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        User user = userModuleEntity.getUser();
        try {
            if (user != null) {
                boolean isUserNameExisted = false;
                boolean isEmailExisted = false;
                boolean isContactNumberExisted = false;

                String userId = user.getId();
                User targetUser = null;
                if (userId != null && !userId.isEmpty()) {
                    targetUser = this.userService.getUserByUserId(userId);
                }

                // validate username
                String userName = user.getUsername().trim().toLowerCase();
                User userByUserName = this.userService.getUserByUserName(userName);
                if (userByUserName != null) {
                    isUserNameExisted = true;
                    if (targetUser != null && targetUser.getId().equals(userByUserName.getId())) {
                        isUserNameExisted = false;
                    }
                }

                // validate email
                String email = user.getEmailAddress().trim().toLowerCase();
                User userByEmail = this.userService.getUserByEmail(email);
                if (userByEmail != null) {
                    isEmailExisted = true;
                    if (targetUser != null && targetUser.getId().equals(userByEmail.getId())) {
                        isEmailExisted = false;
                    }
                }

                // validate contact number
                String contactNumber = user.getContactNumber().trim();
                User userByContactNumber = this.userService.getUserByContactNumber(contactNumber);
                if (userByContactNumber != null) {
                    isContactNumberExisted = true;
                    if (targetUser != null && targetUser.getId().equals(userByContactNumber.getId())) {
                        isContactNumberExisted = false;
                    }
                }

                userModuleEntity.setUserNameExisted(isUserNameExisted);
                userModuleEntity.setEmailExisted(isEmailExisted);
                userModuleEntity.setContactNumberExisted(isContactNumberExisted);

                result = true;
            }
            if (result) {
                userModuleEntity.setUser(null);
                userModuleEntity.setGroupsOfUser(null);
                respModel.setData(userModuleEntity);
                respModel.setStatusSuccess();
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }
        return respModel;
    }
}