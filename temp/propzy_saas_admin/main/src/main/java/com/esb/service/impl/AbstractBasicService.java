package com.esb.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esb.consts.GlobalConsts;
import com.esb.dao.IActionLogDAO;
import com.esb.dao.IFunctionDAO;
import com.esb.dao.IGroupDAO;
import com.esb.dao.IGroupHasFunctionDAO;
import com.esb.dao.IGroupHasUserDAO;
import com.esb.dao.IRoleDAO;
import com.esb.dao.IUserDAO;
import com.esb.entity.ActionLog;
import com.esb.entity.CKFunction;
import com.esb.entity.CKGroupHasFunction;
import com.esb.entity.CKGroupHasUser;
import com.esb.entity.Function;
import com.esb.entity.Group;
import com.esb.entity.GroupHasFunction;
import com.esb.entity.GroupHasUser;
import com.esb.entity.Role;
import com.esb.entity.User;
import com.esb.service.IActionLogService;
import com.esb.service.IBasicService;
import com.esb.service.IFunctionService;
import com.esb.service.IGroupService;
import com.esb.service.IRoleService;
import com.esb.service.IUserService;
import com.esb.util.RandomUtil;
import com.esb.util.Util;
import com.google.gson.Gson;

@Service
public abstract class AbstractBasicService
        implements IBasicService, IActionLogService, IFunctionService, IGroupService, IUserService, IRoleService {

    private static final Logger log = Logger.getLogger(AbstractBasicService.class);

    @Autowired
    protected IActionLogDAO actionLogDAO;
    @Autowired
    protected IFunctionDAO functionDAO;
    @Autowired
    protected IGroupDAO groupDAO;
    @Autowired
    protected IGroupHasUserDAO groupHasUserDAO;
    @Autowired
    protected IGroupHasFunctionDAO groupHasFunctionDAO;
    @Autowired
    protected IRoleDAO roleDAO;
    @Autowired
    protected IUserDAO userDAO;
    @Autowired
    protected Gson gs;

    @Override
    public List<ActionLog> getListActionLog() {
        return this.actionLogDAO.findAll(GlobalConsts.MAX_RECORD);
    }

    @Override
    public ActionLog getActionLogByActionLogId(String actionLogId) {
        return this.actionLogDAO.findById(actionLogId);
    }

    @Override
    public boolean addActionLog(ActionLog actionLog) {
        actionLog.setId(RandomUtil.generateActionLogId());
        actionLog.setTimestamp(System.currentTimeMillis());
        return this.actionLogDAO.persist(actionLog);
    }

    @Override
    public List<Function> getListFunction() {
        return this.functionDAO.findAll(GlobalConsts.MAX_RECORD);
    }

    @Override
    public List<Function> getListFunctionByRoleId(String roleId) {
        return this.functionDAO.findBy(Function.ROLE_ID, roleId);
    }

    @Override
    public Function getFunction(String roleId, Integer permissionId) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(Function.ROLE_ID, roleId);
        params.put(Function.PERMISSION_ID, permissionId);
        return this.functionDAO.getUniqueBy(params);
    }

    @Override
    public boolean addFunction(Function function) {
        return this.functionDAO.persist(function);
    }

    @Override
    public boolean addFunction(String roleId, Integer permissionId, String permissionName) {
        CKFunction primaryKey = new CKFunction();
        primaryKey.setPermissionId(permissionId);
        primaryKey.setRoleId(roleId);
        Function function = new Function();
        function.setPrimaryKey(primaryKey);
        function.setPermissionName(permissionName);
        return this.addFunction(function);
    }

    @Override
    public boolean deleteFunctionByCK(CKFunction ckFunction) {
        boolean result = false;
        try {
            result = deleteGroupHasFunctionByFunctionId(ckFunction.getRoleId(), ckFunction.getPermissionId())
                    && this.functionDAO.remove(ckFunction);
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return result;
    }

    @Override
    public boolean deleteFunctionByRoleIdAndPermissionId(String roleId, Integer permissionId) {
        boolean result = false;
        try {
            CKFunction ckFunction = new CKFunction();
            ckFunction.setRoleId(roleId);
            ckFunction.setPermissionId(permissionId);
            result = this.deleteFunctionByCK(ckFunction);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            result = false;
        }
        return result;
    }

    @Override
    public boolean deleteFunctionByRoleId(String roleId) {
        boolean result = false;
        try {
            boolean temp = true;
            List<Function> functions = this.getListFunctionByRoleId(roleId);
            for (Function function : functions) {
                CKFunction ckFunction = function.getPrimaryKey();
                temp = this.deleteFunctionByCK(ckFunction) & temp;
            }
            result = temp;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            result = false;
        }
        return result;
    }

    // group start
    @Override
    public List<Group> getListGroup() {
        return this.groupDAO.findAll(GlobalConsts.MAX_RECORD);
    }

    @Override
    public Group getGroupByGroupId(String groupId) {
        return this.groupDAO.findById(groupId);
    }

    @Override
    public boolean addGroup(Group group) {
        return this.groupDAO.persist(group);
    }

    @Override
    public boolean updateGroup(String groupId, Map<String, String> params) {
        boolean result = false;
        try {
            Map<String, Object> convertedParams = convertParamsUpdateGroup(params);
            log.info("Update Group Params:: " + this.gs.toJson(convertedParams));
            if (!convertedParams.isEmpty()) {
                result = this.groupDAO.update(convertedParams, Group.ID, groupId);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return result;
    }

    private Map<String, Object> convertParamsUpdateGroup(Map<String, String> params) {
        Map<String, Object> convertedParams = new HashMap<String, Object>();
        try {
            String name = params.get(Group.NAME);
            if (name != null) {
                convertedParams.put(Group.NAME, name);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }

        try {
            String description = params.get(Group.DESCRIPTION);
            if (description != null) {
                convertedParams.put(Group.DESCRIPTION, description);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return convertedParams;
    }

    @Override
    public boolean deleteGroupByGroupId(String groupId) {
        boolean result = false;
        try {
            result = this.deleteGroupHasUserByGroupId(groupId) && this.deleteGroupHasFunctionByGroupId(groupId)
                    && this.groupDAO.remove(groupId);
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return result;
    }

    @Override
    public List<Group> getListGroupOfUser(String userId) {
        List<Group> groups = new ArrayList<Group>();
        try {
            List<GroupHasUser> groupsOfUser = this.getListGroupHasUserByUserId(userId);
            for (GroupHasUser groupHasUser : groupsOfUser) {
                try {
                    CKGroupHasUser ck = groupHasUser.getPrimaryKey();
                    String groupId = ck.getGroupId();
                    Group group = this.getGroupByGroupId(groupId);
                    if (group != null) {
                        groups.add(group);
                    }
                } catch (Exception ex) {
                    log.warn(Util.convertExceptionToString(ex));
                }
            }
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return groups;
    }

    @Override
    public List<User> getListUserOfGroup(String groupId) {
        List<User> users = new ArrayList<User>();
        try {
            List<GroupHasUser> usersOfGroup = this.getListGroupHasUserByGroupId(groupId);
            for (GroupHasUser groupHasUser : usersOfGroup) {
                try {
                    CKGroupHasUser ck = groupHasUser.getPrimaryKey();
                    String userId = ck.getUserId();
                    User user = getUserByUserId(userId);
                    if (user != null) {
                        users.add(user);
                    }
                } catch (Exception ex) {
                    log.warn(Util.convertExceptionToString(ex));
                }
            }
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return users;
    }

    @Override
    public List<Function> getListFunctionOfGroup(String groupId) {
        List<Function> functions = new ArrayList<Function>();
        try {
            List<GroupHasFunction> functionsOfGroup = this.getListGroupHasFunctionByGroupId(groupId);
            for (GroupHasFunction groupHasFunction : functionsOfGroup) {
                try {
                    CKGroupHasFunction ck = groupHasFunction.getPrimaryKey();
                    String roleId = ck.getRoleId();
                    Integer permissionId = ck.getPermissionId();
                    Function function = getFunction(roleId, permissionId);
                    if (function != null) {
                        functions.add(function);
                    }
                } catch (Exception ex) {
                    log.warn(Util.convertExceptionToString(ex));
                }
            }
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return functions;
    }
    // group end

    // group has user start
    @Override
    public List<GroupHasUser> getListGroupHasUserByGroupId(String groupId) {
        return groupHasUserDAO.findBy(GroupHasUser.GROUP_ID, groupId);
    }

    @Override
    public GroupHasUser getGroupHasUser(String groupId, String userId) {
        Map<String, Object> cols = new HashMap<String, Object>();
        cols.put(GroupHasUser.GROUP_ID, groupId);
        cols.put(GroupHasUser.USER_ID, userId);
        return this.groupHasUserDAO.getUniqueBy(cols);
    }

    @Override
    public List<GroupHasUser> getListGroupHasUserByUserId(String userId) {
        return this.groupHasUserDAO.findBy(GroupHasUser.USER_ID, userId);
    }

    @Override
    public boolean addGroupHasUser(GroupHasUser groupHasUser) {
        return this.groupHasUserDAO.persist(groupHasUser);
    }

    @Override
    public boolean addGroupHasUser(String groupId, String userId) {
        GroupHasUser groupHasUser = new GroupHasUser();
        CKGroupHasUser ck = new CKGroupHasUser();
        ck.setGroupId(groupId);
        ck.setUserId(userId);
        groupHasUser.setPrimaryKey(ck);
        return this.addGroupHasUser(groupHasUser);
    }

    @Override
    public boolean updateGroupHasUserByUserId(String userId, List<String> groupIds) {
        boolean result = false;
        try {
            List<GroupHasUser> listGroupsOfUserDb = this.getListGroupHasUserByUserId(userId);
            List<GroupHasUser> listDeleteGroupsOfUser = new ArrayList<GroupHasUser>();

            List<String> existedGroupsOfUser = new ArrayList<String>();
            for (GroupHasUser groupHasUser : listGroupsOfUserDb) {
                CKGroupHasUser ck = groupHasUser.getPrimaryKey();
                String groupId = ck.getGroupId();
                if (groupIds.contains(groupId)) {
                    existedGroupsOfUser.add(groupId);
                } else {
                    listDeleteGroupsOfUser.add(groupHasUser);
                }
            }

            // add group has user
            for (String groupId : groupIds) {
                if (!existedGroupsOfUser.contains(groupId)) {
                    this.addGroupHasUser(groupId, userId);
                }
            }

            // delete group has user
            for (GroupHasUser groupHasUser : listDeleteGroupsOfUser) {
                this.deleteGroupHasUserByCK(groupHasUser.getPrimaryKey());
            }
            result = true;
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return result;
    }

    @Override
    public boolean updateGroupHasUserByGroupId(String groupId, List<String> userIds) {
        boolean result = false;
        try {
            List<GroupHasUser> listGroupsOfUserDb = this.getListGroupHasUserByGroupId(groupId);
            List<GroupHasUser> listDeleteGroupsOfUser = new ArrayList<GroupHasUser>();

            List<String> existedGroupsOfUser = new ArrayList<String>();
            for (GroupHasUser groupHasUser : listGroupsOfUserDb) {
                CKGroupHasUser ck = groupHasUser.getPrimaryKey();
                String userId = ck.getUserId();
                if (userIds.contains(userId)) {
                    existedGroupsOfUser.add(userId);
                } else {
                    listDeleteGroupsOfUser.add(groupHasUser);
                }
            }

            // add group has user
            for (String userId : userIds) {
                if (!existedGroupsOfUser.contains(userId)) {
                    this.addGroupHasUser(groupId, userId);
                }
            }

            // delete group has user
            for (GroupHasUser groupHasUser : listDeleteGroupsOfUser) {
                this.deleteGroupHasUserByCK(groupHasUser.getPrimaryKey());
            }
            result = true;
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return result;
    }

    @Override
    public boolean deleteGroupHasUserByCK(CKGroupHasUser ckGroupHasUser) {
        return this.groupHasUserDAO.remove(ckGroupHasUser);
    }

    @Override
    public boolean deleteGroupHasUserByGroupId(String groupId) {
        boolean result = false;
        try {
            boolean temp = true;
            List<GroupHasUser> listGroupHasUser = this.getListGroupHasUserByGroupId(groupId);
            for (GroupHasUser groupHasUser : listGroupHasUser) {
                CKGroupHasUser ckGroupHasUser = groupHasUser.getPrimaryKey();
                temp = this.deleteGroupHasUserByCK(ckGroupHasUser) & temp;
            }
            result = temp;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            result = false;
        }
        return result;
    }

    @Override
    public boolean deleteGroupHasUserByUserId(String userId) {
        boolean result = false;
        try {
            boolean temp = true;
            List<GroupHasUser> listGroupHasUser = this.getListGroupHasUserByUserId(userId);
            for (GroupHasUser groupHasUser : listGroupHasUser) {
                CKGroupHasUser ckGroupHasUser = groupHasUser.getPrimaryKey();
                temp = this.deleteGroupHasUserByCK(ckGroupHasUser) & temp;
            }
            result = temp;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            result = false;
        }
        return result;
    }

    @Override
    public boolean deleteGroupHasUser(String groupId, String userId) {
        boolean result = false;
        try {
            CKGroupHasUser ckGroupHasUser = new CKGroupHasUser();
            ckGroupHasUser.setGroupId(groupId);
            ckGroupHasUser.setUserId(userId);
            result = this.deleteGroupHasUserByCK(ckGroupHasUser);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return result;
    }
    // group has user end

    // group has function start
    public GroupHasFunction getGroupHasFunction(String groupId, String roleId, Integer permissionId) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(GroupHasFunction.GROUP_ID, groupId);
        params.put(GroupHasFunction.ROLE_ID, roleId);
        params.put(GroupHasFunction.PERMISSION_ID, permissionId);
        return this.groupHasFunctionDAO.getUniqueBy(params);
    };

    @Override
    public List<GroupHasFunction> getListGroupHasFunctionByGroupId(String groupId) {
        return this.groupHasFunctionDAO.findBy(GroupHasFunction.GROUP_ID, groupId);
    }

    @Override
    public List<GroupHasFunction> getListGroupHasFunctionByRoleIdAndPermissionId(String roleId, Integer permissionId) {
        Map<String, Object> cols = new HashMap<String, Object>();
        cols.put(GroupHasFunction.ROLE_ID, roleId);
        cols.put(GroupHasFunction.PERMISSION_ID, permissionId);
        return this.groupHasFunctionDAO.findBy(cols);
    }

    @Override
    public boolean addGroupHasFunction(GroupHasFunction groupHasFunction) {
        return this.groupHasFunctionDAO.persist(groupHasFunction);
    }

    private boolean isGroupHasFunctionExisted(String roleId, Integer permissionId,
            List<GroupHasFunction> groupHasFunctions) {
        boolean isExisted = false;
        for (GroupHasFunction temp : groupHasFunctions) {
            try {
                CKGroupHasFunction ckTemp = temp.getPrimaryKey();
                if (ckTemp.getRoleId().equals(roleId)
                        && ckTemp.getPermissionId().intValue() == permissionId.intValue()) {
                    isExisted = true;
                    break;
                }
            } catch (Exception ex) {
            }
        }
        return isExisted;
    }

    private boolean isGroupHasFunctionExisted(GroupHasFunction groupHasFunction,
            List<GroupHasFunction> groupHasFunctions) {
        CKGroupHasFunction ckGroupHasFunction = groupHasFunction.getPrimaryKey();
        return this.isGroupHasFunctionExisted(ckGroupHasFunction.getRoleId(), ckGroupHasFunction.getPermissionId(),
                groupHasFunctions);
    }

    @Override
    public boolean updateGroupHasFunction(String groupId, List<GroupHasFunction> groupHasFunctions) {
        boolean result = false;
        try {
            List<GroupHasFunction> listGroupHasFunctionDb = this.getListGroupHasFunctionByGroupId(groupId);
            List<GroupHasFunction> listDeleteGroupHasFunction = new ArrayList<GroupHasFunction>();

            List<GroupHasFunction> existedGroupHasFunctions = new ArrayList<GroupHasFunction>();
            for (GroupHasFunction groupHasFunction : listGroupHasFunctionDb) {
                boolean isGroupHasFunctionExisted = this.isGroupHasFunctionExisted(groupHasFunction, groupHasFunctions);
                if (isGroupHasFunctionExisted) {
                    existedGroupHasFunctions.add(groupHasFunction);
                } else {
                    listDeleteGroupHasFunction.add(groupHasFunction);
                }
            }

            // add group has function
            for (GroupHasFunction groupHasFunction : groupHasFunctions) {
                if (!this.isGroupHasFunctionExisted(groupHasFunction, existedGroupHasFunctions)) {
                    this.addGroupHasFunction(groupHasFunction);
                }
            }

            // delete group has user
            for (GroupHasFunction groupHasFunction : listDeleteGroupHasFunction) {
                this.deleteGroupHasFunctionByCK(groupHasFunction.getPrimaryKey());
            }
            result = true;
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return result;
    }

    @Override
    public boolean deleteGroupHasFunctionByCK(CKGroupHasFunction ckGroupHasFunction) {
        return this.groupHasFunctionDAO.remove(ckGroupHasFunction);
    }

    @Override
    public boolean deleteGroupHasFunctionByGroupId(String groupId) {
        boolean result = false;
        try {
            boolean temp = true;
            List<GroupHasFunction> listGroupHasFunction = this.getListGroupHasFunctionByGroupId(groupId);
            for (GroupHasFunction groupHasFunction : listGroupHasFunction) {
                CKGroupHasFunction ckGroupHasFunction = groupHasFunction.getPrimaryKey();
                temp = this.deleteGroupHasFunctionByCK(ckGroupHasFunction) & temp;
            }
            result = temp;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            result = false;
        }
        return result;
    }

    @Override
    public boolean deleteGroupHasFunctionByFunctionId(String roleId, Integer permissionId) {
        boolean result = false;
        try {
            boolean temp = true;
            List<GroupHasFunction> listGroupHasFunction = this.getListGroupHasFunctionByRoleIdAndPermissionId(roleId,
                    permissionId);
            for (GroupHasFunction groupHasFunction : listGroupHasFunction) {
                CKGroupHasFunction ckGroupHasFunction = groupHasFunction.getPrimaryKey();
                temp = this.deleteGroupHasFunctionByCK(ckGroupHasFunction) & temp;
            }
            result = temp;
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            result = false;
        }
        return result;
    }

    @Override
    public boolean deleteGroupHasFunction(String groupId, String roleId, Integer permissionId) {
        boolean result = false;
        try {
            CKGroupHasFunction ckGroupHasFunction = new CKGroupHasFunction();
            ckGroupHasFunction.setGroupId(groupId);
            ckGroupHasFunction.setRoleId(roleId);
            ckGroupHasFunction.setPermissionId(permissionId);
            result = this.deleteGroupHasFunctionByCK(ckGroupHasFunction);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return result;
    }
    // group has function end

    @Override
    public List<Role> getListRole() {
        return this.roleDAO.findAll(GlobalConsts.MAX_RECORD);
    }

    @Override
    public Role getRoleByRoleId(String roleId) {
        return this.roleDAO.findById(roleId);
    }

    @Override
    public boolean addRole(Role role) {
        return this.roleDAO.persist(role);
    }

    @Override
    public boolean updateRole(String roleId, Map<String, String> params) {
        boolean result = false;
        try {
            Map<String, Object> convertedParams = convertParamsUpdateRole(params);
            if (!convertedParams.isEmpty()) {
                log.info("Update Role Params:: " + this.gs.toJson(convertedParams));
                result = this.roleDAO.update(convertedParams, Role.ID, roleId);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return result;
    }

    private Map<String, Object> convertParamsUpdateRole(Map<String, String> params) {
        Map<String, Object> convertedParams = new HashMap<String, Object>();
        try {
            String name = params.get(Role.NAME);
            if (name != null) {
                convertedParams.put(Role.NAME, name);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return convertedParams;
    }

    @Override
    public boolean deleteRoleByRoleId(String roleId) {
        boolean result = false;
        try {
            result = deleteFunctionByRoleId(roleId) && this.roleDAO.remove(roleId);
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return result;
    }

    @Override
    public List<User> getListUser() {
        return this.userDAO.findAll(GlobalConsts.MAX_RECORD);
    }

    @Override
    public User getUserByUserId(String userId) {
        return this.userDAO.findById(userId);
    }

    @Override
    public User getUserByUserName(String username) {
        return this.userDAO.getUniqueBy(User.USERNAME, username);
    }

    @Override
    public User getUserByEmail(String email) {
        return this.userDAO.getUniqueBy(User.EMAIL_ADDRESS, email);
    }

    @Override
    public User getUserByContactNumber(String contactNumber) {
        return this.userDAO.getUniqueBy(User.CONTACT_NUMBER, contactNumber);
    }

    @Override
    public User getUser(String username, String password) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(User.USERNAME, username);
        params.put(User.PASSWORD, password);
        return this.userDAO.getUniqueBy(params);
    }

    @Override
    public boolean addUser(User user) {
        return this.userDAO.persist(user);
    }

    @Override
    public boolean updateUser(String userId, Map<String, String> params) {
        boolean result = false;
        try {
            Map<String, Object> convertedParams = this.convertParams(params);
            log.info("Update User Params:: " + this.gs.toJson(convertedParams));
            if (!convertedParams.isEmpty()) {
                result = this.userDAO.update(convertedParams, User.ID, userId);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return result;
    }

    private Map<String, Object> convertParams(Map<String, String> params) {
        Map<String, Object> convertedParams = new HashMap<String, Object>();
        try {
            String fullName = params.get(User.FULLNAME);
            if (fullName != null) {
                convertedParams.put(User.FULLNAME, fullName);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String gender = params.get(User.GENDER);
            if (gender != null) {
                convertedParams.put(User.GENDER, gender);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String contactNumber = params.get(User.CONTACT_NUMBER);
            if (contactNumber != null) {
                convertedParams.put(User.CONTACT_NUMBER, contactNumber);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String username = params.get(User.USERNAME);
            if (username != null) {
                convertedParams.put(User.USERNAME, username);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String password = params.get(User.PASSWORD);
            if (password != null) {
                convertedParams.put(User.PASSWORD, password);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String email = params.get(User.EMAIL_ADDRESS);
            if (email != null) {
                convertedParams.put(User.EMAIL_ADDRESS, email);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String lastUpdated = params.get(User.LAST_UPDATED);
            if (lastUpdated != null) {
                convertedParams.put(User.LAST_UPDATED, Long.parseLong(lastUpdated));
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String lastSignedIn = params.get(User.LAST_SIGNED_IN);
            if (lastSignedIn != null) {
                convertedParams.put(User.LAST_SIGNED_IN, Long.parseLong(lastSignedIn));
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        try {
            String userStatus = params.get(User.USER_STATUS);
            if (userStatus != null) {
                convertedParams.put(User.USER_STATUS, userStatus);
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return convertedParams;
    }

    @Override
    public boolean deleteUserByUserId(String userId) {
        boolean result = false;
        try {
            result = deleteGroupHasUserByUserId(userId) && this.userDAO.remove(userId);
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return result;
    }

    @Override
    public Map<String, Integer> getPermissions(String username) {
        Map<String, Integer> permissions = new HashMap<String, Integer>();
        try {
            User user = this.getUserByUserName(username);
            Map<String, List<Integer>> functionsMap = new HashMap<String, List<Integer>>();
            List<GroupHasUser> listGroupsOfUser = getListGroupHasUserByUserId(user.getId());
            for (GroupHasUser groupOfUser : listGroupsOfUser) {
                String groupId = groupOfUser.getPrimaryKey().getGroupId();
                List<GroupHasFunction> listGroupHasFunction = getListGroupHasFunctionByGroupId(groupId);
                for (GroupHasFunction groupHasFunction : listGroupHasFunction) {
                    CKGroupHasFunction ckGroupHasFunction = groupHasFunction.getPrimaryKey();
                    String roleId = ckGroupHasFunction.getRoleId();
                    Integer permissionId = ckGroupHasFunction.getPermissionId();
                    this.addFunction(roleId, permissionId, functionsMap);
                }
            }

            for (Map.Entry<String, List<Integer>> entry : functionsMap.entrySet()) {
                String roleId = entry.getKey();
                int temp = 0;
                for (Integer permission : entry.getValue()) {
                    temp = temp | permission;
                }
                if (temp != 0) {
                    permissions.put(roleId, temp);
                }
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return permissions;
    }

    private void addFunction(String roleId, Integer permissionId, Map<String, List<Integer>> functionsMap) {
        List<Integer> temp = null;
        if (functionsMap.containsKey(roleId)) {
            temp = functionsMap.get(roleId);
        } else {
            temp = new ArrayList<Integer>();
            functionsMap.put(roleId, temp);
        }
        temp.add(permissionId);
    }

}
