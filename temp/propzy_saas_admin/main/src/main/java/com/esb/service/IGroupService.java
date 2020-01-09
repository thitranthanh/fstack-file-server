package com.esb.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.esb.entity.CKGroupHasFunction;
import com.esb.entity.CKGroupHasUser;
import com.esb.entity.Function;
import com.esb.entity.Group;
import com.esb.entity.GroupHasFunction;
import com.esb.entity.GroupHasUser;
import com.esb.entity.User;

@Service
public interface IGroupService {

    // group start
    public List<Group> getListGroup();

    public Group getGroupByGroupId(String groupId);

    public boolean addGroup(Group group);

    public boolean updateGroup(String groupId, Map<String, String> params);

    public boolean deleteGroupByGroupId(String groupId);

    public List<Group> getListGroupOfUser(String userId);

    public List<User> getListUserOfGroup(String groupId);

    public List<Function> getListFunctionOfGroup(String groupId);
    // group end

    // group has user start
    public GroupHasUser getGroupHasUser(String groupId, String userId);

    public List<GroupHasUser> getListGroupHasUserByGroupId(String groupId);

    public List<GroupHasUser> getListGroupHasUserByUserId(String userId);

    public boolean addGroupHasUser(GroupHasUser groupHasUser);

    public boolean addGroupHasUser(String groupId, String userId);

    public boolean updateGroupHasUserByUserId(String userId, List<String> groupIds);

    public boolean updateGroupHasUserByGroupId(String groupId, List<String> userIds);

    public boolean deleteGroupHasUserByCK(CKGroupHasUser ckGroupHasUser);

    public boolean deleteGroupHasUserByGroupId(String groupId);

    public boolean deleteGroupHasUserByUserId(String userId);

    public boolean deleteGroupHasUser(String groupId, String userId);
    // group has user end

    // group has function start
    public GroupHasFunction getGroupHasFunction(String groupId, String roleId, Integer permissionId);

    public List<GroupHasFunction> getListGroupHasFunctionByGroupId(String groupId);

    public List<GroupHasFunction> getListGroupHasFunctionByRoleIdAndPermissionId(String roleId, Integer permissionId);

    public boolean addGroupHasFunction(GroupHasFunction groupHasFunction);

    public boolean updateGroupHasFunction(String groupId, List<GroupHasFunction> groupHasFunctions);

    public boolean deleteGroupHasFunctionByCK(CKGroupHasFunction ckGroupHasFunction);

    public boolean deleteGroupHasFunctionByGroupId(String groupId);

    public boolean deleteGroupHasFunctionByFunctionId(String roleId, Integer permissionId);

    public boolean deleteGroupHasFunction(String groupId, String roleId, Integer permissionId);
    // group has function end
}
