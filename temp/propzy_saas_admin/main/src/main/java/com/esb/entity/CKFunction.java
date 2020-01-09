package com.esb.entity;

import java.io.Serializable;

import javax.persistence.Column;

public class CKFunction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = Function.ROLE_ID)
    private String roleId;

    @Column(name = Function.PERMISSION_ID)
    private Integer permissionId;

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
