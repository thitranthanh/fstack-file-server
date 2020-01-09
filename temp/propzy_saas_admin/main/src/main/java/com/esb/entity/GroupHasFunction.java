package com.esb.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.esb.consts.GlobalConsts;

@Entity
@Table(name = GlobalConsts.TABLE_GROUP_HAS_FUNCTION)
public class GroupHasFunction {

    public final static transient String GROUP_ID = "group_id";
    public final static transient String ROLE_ID = "role_id";
    public final static transient String PERMISSION_ID = "permission_id";

    @EmbeddedId
    private CKGroupHasFunction primaryKey;

    public CKGroupHasFunction getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(CKGroupHasFunction primaryKey) {
        this.primaryKey = primaryKey;
    }

}
