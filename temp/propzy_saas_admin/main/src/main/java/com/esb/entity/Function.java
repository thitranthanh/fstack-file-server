package com.esb.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.esb.consts.GlobalConsts;

@Entity
@Table(name = GlobalConsts.TABLE_FUNCTION)
public class Function {

    public final static transient String ROLE_ID = "role_id";
    public final static transient String PERMISSION_ID = "permission_id";
    public final static transient String PERMISSION_NAME = "permission_name";

    @EmbeddedId
    private CKFunction primaryKey;

    @Column(name = PERMISSION_NAME)
    private String permissionName;

    public Function() {
    }

    public CKFunction getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(CKFunction primaryKey) {
        this.primaryKey = primaryKey;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

}
