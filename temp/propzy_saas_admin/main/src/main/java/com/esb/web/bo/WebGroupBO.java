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
import com.esb.entity.CKFunction;
import com.esb.entity.CKGroupHasFunction;
import com.esb.entity.Function;
import com.esb.entity.Group;
import com.esb.entity.GroupHasFunction;
import com.esb.entity.User;
import com.esb.service.IActionLogService;
import com.esb.service.IGroupService;
import com.esb.service.IUserService;
import com.esb.util.RandomUtil;
import com.esb.util.Util;
import com.esb.web.authentication.RolePermissionsMapping;
import com.esb.web.authentication.SessionManager;
import com.esb.web.consts.RespCodeConsts;
import com.esb.web.model.FunctionDataModel;
import com.esb.web.model.GroupModel;
import com.esb.web.model.RespModel;
import com.esb.web.model.RoleDataModel;
import com.google.gson.Gson;

@Service
public class WebGroupBO {

    private static final Logger log = Logger.getLogger(WebGroupBO.class);

    @Autowired
    private Gson gs;

    @Autowired
    private IActionLogService actionLogService;
    @Autowired
    private IGroupService groupService;
    @Autowired
    private IUserService userService;

    @Autowired
    private SessionManager sessionManager;

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.ROLE_GROUP + "')")
    public GroupModel getListGroupDataModel() {
        GroupModel groupModuleEntity = new GroupModel();
        List<Group> temp = this.groupService.getListGroup();
        List<Group> groups = new ArrayList<Group>();
        for (Group group : temp) {
            if (!GlobalConsts.DEFAULT_GROUP_SUPERADMIN.equals(group.getId())) {
                groups.add(group);
            }
        }
        groupModuleEntity.setGroups(groups);
        return groupModuleEntity;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.GROUP_VIEW_PERMISSION + "')"
            + " or hasPermission(principal, '" + RolePermissionsMapping.GROUP_ADD_PERMISSION + "')")
    public GroupModel getAddGroupDataModel() {
        String userId = this.sessionManager.getUserId();

        GroupModel groupModuleEntity = new GroupModel();
        List<User> users = this.userService.getListUser();
        groupModuleEntity.setUsers(users);

        Map<String, List<Function>> functionsMap = new HashMap<String, List<Function>>();
        List<Function> functions = new ArrayList<Function>();
        List<Group> groupsOfUser = this.groupService.getListGroupOfUser(userId);
        for (Group groupTemp : groupsOfUser) {
            List<Function> functionsOfGroup = this.groupService.getListFunctionOfGroup(groupTemp.getId());
            if (functionsOfGroup != null && !functionsOfGroup.isEmpty()) {
                functions.addAll(functionsOfGroup);
            }
        }

        for (Function function : functions) {
            CKFunction ckFunction = function.getPrimaryKey();
            String roleId = ckFunction.getRoleId();
            List<Function> functionsTemp = null;
            if (functionsMap.containsKey(roleId)) {
                functionsTemp = functionsMap.get(roleId);
            } else {
                functionsTemp = new ArrayList<Function>();
                functionsMap.put(roleId, functionsTemp);
            }
            functionsTemp.add(function);
        }

        List<RoleDataModel> rolesDataModel = new ArrayList<RoleDataModel>();
        for (Map.Entry<String, List<Function>> entry : functionsMap.entrySet()) {
            String roleId = entry.getKey();
            List<FunctionDataModel> functionsDataModel = new ArrayList<FunctionDataModel>();
            for (Function function : entry.getValue()) {
                FunctionDataModel functionDataModel = new FunctionDataModel();
                functionDataModel.setPermissionId(function.getPrimaryKey().getPermissionId());
                functionDataModel.setPermissionName(function.getPermissionName());
                functionsDataModel.add(functionDataModel);
            }
            RoleDataModel roleDataModel = new RoleDataModel();
            roleDataModel.setRoleId(roleId);
            roleDataModel.setFunctions(functionsDataModel);
            rolesDataModel.add(roleDataModel);
        }
        groupModuleEntity.setRoles(rolesDataModel);
        return groupModuleEntity;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.GROUP_VIEW_PERMISSION + "')"
            + " or hasPermission(principal, '" + RolePermissionsMapping.GROUP_UPDATE_PERMISSION + "')")
    public GroupModel getEditGroupDataModel(String groupId) {
        String userId = this.sessionManager.getUserId();

        GroupModel groupModuleEntity = new GroupModel();
        // group
        Group group = this.groupService.getGroupByGroupId(groupId);
        groupModuleEntity.setGroup(group);

        // users
        List<User> users = this.userService.getListUser();
        groupModuleEntity.setUsers(users);

        // users of group
        List<User> usersOfGroup = this.groupService.getListUserOfGroup(groupId);
        List<String> userIds = new ArrayList<String>();
        for (User user : usersOfGroup) {
            userIds.add(user.getId());
        }
        groupModuleEntity.setUsersOfGroup(userIds);

        // functions
        Map<String, List<Function>> functionsMap = new HashMap<String, List<Function>>();
        List<Function> functions = new ArrayList<Function>();
        List<Group> groupsOfUser = this.groupService.getListGroupOfUser(userId);
        for (Group groupTemp : groupsOfUser) {
            List<Function> functionsOfGroup = this.groupService.getListFunctionOfGroup(groupTemp.getId());
            if (functionsOfGroup != null && !functionsOfGroup.isEmpty()) {
                functions.addAll(functionsOfGroup);
            }
        }

        for (Function function : functions) {
            CKFunction ckFunction = function.getPrimaryKey();
            String roleId = ckFunction.getRoleId();
            List<Function> functionsTemp = null;
            if (functionsMap.containsKey(roleId)) {
                functionsTemp = functionsMap.get(roleId);
            } else {
                functionsTemp = new ArrayList<Function>();
                functionsMap.put(roleId, functionsTemp);
            }
            functionsTemp.add(function);
        }

        List<RoleDataModel> rolesDataModel = new ArrayList<RoleDataModel>();
        for (Map.Entry<String, List<Function>> entry : functionsMap.entrySet()) {
            String roleId = entry.getKey();
            List<FunctionDataModel> functionsDataModel = new ArrayList<FunctionDataModel>();
            for (Function function : entry.getValue()) {
                FunctionDataModel functionDataModel = new FunctionDataModel();
                functionDataModel.setPermissionId(function.getPrimaryKey().getPermissionId());
                functionDataModel.setPermissionName(function.getPermissionName());
                functionsDataModel.add(functionDataModel);
            }
            RoleDataModel roleDataModel = new RoleDataModel();
            roleDataModel.setRoleId(roleId);
            roleDataModel.setFunctions(functionsDataModel);
            rolesDataModel.add(roleDataModel);
        }
        groupModuleEntity.setRoles(rolesDataModel);

        // functions of group
        List<Function> functionOfGroup = this.groupService.getListFunctionOfGroup(groupId);
        for (Function function : functionOfGroup) {
            CKFunction ck = function.getPrimaryKey();
            String roleId = ck.getRoleId();
            for (RoleDataModel roleDataModel : rolesDataModel) {
                if (roleId.equals(roleDataModel.getRoleId())) {
                    roleDataModel.getFuntionsOfUser().add(ck.getPermissionId());
                    break;
                }
            }
        }
        return groupModuleEntity;
    }

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.GROUP_ADD_PERMISSION + "')")
    public RespModel addGroup(GroupModel groupModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        Group group = groupModuleEntity.getGroup();
        List<String> usersOfGroup = groupModuleEntity.getUsersOfGroup();
        List<RoleDataModel> rolesOfGroup = groupModuleEntity.getRolesOfGroup();
        try {
            group.setId(RandomUtil.generateGroupId());
            result = this.groupService.addGroup(group);
            if (result) {
                // add group has user
                this.groupService.updateGroupHasUserByGroupId(group.getId(), usersOfGroup);

                // add group has function
                List<GroupHasFunction> groupHasFunctions = new ArrayList<GroupHasFunction>();
                for (RoleDataModel role : rolesOfGroup) {
                    String roleId = role.getRoleId();
                    List<Integer> funtionsOfUser = role.getFuntionsOfUser();
                    for (Integer permission : funtionsOfUser) {
                        GroupHasFunction groupHasFunction = new GroupHasFunction();
                        CKGroupHasFunction ck = new CKGroupHasFunction();
                        ck.setGroupId(group.getId());
                        ck.setRoleId(roleId);
                        ck.setPermissionId(permission);
                        groupHasFunction.setPrimaryKey(ck);
                        groupHasFunctions.add(groupHasFunction);
                    }
                }
                this.groupService.updateGroupHasFunction(group.getId(), groupHasFunctions);

                String[] params = { group.getName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.GROUP_ADD_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Add group " + "[group [%s] " + "[status [%s] ", this.gs.toJson(group), result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_ADD);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_GROUP);
            actionLog.setComment("Add group ['" + group.getName() + "']");
            actionLog.setInput(this.gs.toJson(group));
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

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.GROUP_UPDATE_PERMISSION + "')")
    public RespModel updateGroup(GroupModel groupModuleEntity) {
        RespModel respModel = new RespModel();
        boolean result = false;
        Group group = groupModuleEntity.getGroup();
        List<String> usersOfGroup = groupModuleEntity.getUsersOfGroup();
        List<RoleDataModel> rolesOfGroup = groupModuleEntity.getRolesOfGroup();
        try {
            Map<String, String> cols = new HashMap<String, String>();
            cols.put(Group.NAME, group.getName());
            cols.put(Group.DESCRIPTION, group.getDescription());
            result = this.groupService.updateGroup(group.getId(), cols);
            if (result) {
                // add group has user
                this.groupService.updateGroupHasUserByGroupId(group.getId(), usersOfGroup);

                // add group has function
                List<GroupHasFunction> groupHasFunctions = new ArrayList<GroupHasFunction>();
                for (RoleDataModel role : rolesOfGroup) {
                    String roleId = role.getRoleId();
                    List<Integer> funtionsOfUser = role.getFuntionsOfUser();
                    for (Integer permission : funtionsOfUser) {
                        GroupHasFunction groupHasFunction = new GroupHasFunction();
                        CKGroupHasFunction ck = new CKGroupHasFunction();
                        ck.setGroupId(group.getId());
                        ck.setRoleId(roleId);
                        ck.setPermissionId(permission);
                        groupHasFunction.setPrimaryKey(ck);
                        groupHasFunctions.add(groupHasFunction);
                    }
                }
                this.groupService.updateGroupHasFunction(group.getId(), groupHasFunctions);

                String[] params = { group.getName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.GROUP_UPDATE_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Update group " + "[group [%s] " + "[status [%s] ", this.gs.toJson(group), result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_UPDATE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_GROUP);
            actionLog.setComment("Update group ['" + group.getName() + "']");
            actionLog.setInput(this.gs.toJson(group));
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

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.GROUP_DELETE_PERMISSION + "')")
    public RespModel deleteGroupByGroupId(String groupId) {
        RespModel respModel = new RespModel();
        boolean result = false;
        Group group = this.groupService.getGroupByGroupId(groupId);
        try {
            if (group != null) {
                result = this.groupService.deleteGroupByGroupId(groupId);
            }
            if (result) {
                String[] params = { group.getName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.GROUP_DELETE_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Delete group " + "[groupId [%s] " + "[status [%s] ", groupId, result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_DELETE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_GROUP);
            actionLog.setInput(groupId);
            actionLog.setOutput(this.gs.toJson(respModel));
            actionLog.setComment("Delete group ['" + group.getName() + "']");
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
    // group end
}
