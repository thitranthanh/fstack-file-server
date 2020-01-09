package com.esb.entity;

import java.io.Serializable;

import javax.persistence.Column;

public class CKGroupHasFunction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = GroupHasFunction.GROUP_ID)
    private String groupId;

    @Column(name = GroupHasFunction.ROLE_ID)
    private String roleId;

    @Column(name = GroupHasFunction.PERMISSION_ID)
    private Integer permissionId;

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public Integer getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }
}
