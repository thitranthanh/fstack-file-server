package com.esb.web.model;

import java.util.List;

import com.esb.entity.Group;
import com.esb.entity.User;

public class GroupModel {

    private List<Group> groups;
    private Group group;

    private List<User> users;
    private List<RoleDataModel> roles;

    private List<String> usersOfGroup;
    private List<RoleDataModel> rolesOfGroup;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<RoleDataModel> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleDataModel> roles) {
        this.roles = roles;
    }

    public List<Group> getGroups() {
        return groups;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public List<String> getUsersOfGroup() {
        return usersOfGroup;
    }

    public void setUsersOfGroup(List<String> usersOfGroup) {
        this.usersOfGroup = usersOfGroup;
    }

    public List<RoleDataModel> getRolesOfGroup() {
        return rolesOfGroup;
    }

    public void setRolesOfGroup(List<RoleDataModel> rolesOfGroup) {
        this.rolesOfGroup = rolesOfGroup;
    }

}
