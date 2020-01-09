package com.esb.web.model;

import java.util.List;

import com.esb.entity.Group;
import com.esb.entity.User;

public class UserModel {

    private List<User> users;
    private User user;
    private List<Group> groups;
    private List<String> groupsOfUser;

    private String oldPassword;
    private String newPassword;

    private boolean isUserNameExisted;
    private boolean isEmailExisted;
    private boolean isContactNumberExisted;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Group> getGroups() {
        return groups;
    }

    public void setGroups(List<Group> groups) {
        this.groups = groups;
    }

    public List<String> getGroupsOfUser() {
        return groupsOfUser;
    }

    public void setGroupsOfUser(List<String> groupsOfUser) {
        this.groupsOfUser = groupsOfUser;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public boolean isEmailExisted() {
        return isEmailExisted;
    }

    public void setEmailExisted(boolean isEmailExisted) {
        this.isEmailExisted = isEmailExisted;
    }

    public boolean isUserNameExisted() {
        return isUserNameExisted;
    }

    public void setUserNameExisted(boolean isUserNameExisted) {
        this.isUserNameExisted = isUserNameExisted;
    }

    public boolean isContactNumberExisted() {
        return isContactNumberExisted;
    }

    public void setContactNumberExisted(boolean isContactNumberExisted) {
        this.isContactNumberExisted = isContactNumberExisted;
    }

}
