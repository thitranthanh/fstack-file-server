package com.esb.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.esb.consts.GlobalConsts;

@Entity
@Table(name = GlobalConsts.TABLE_GROUP_HAS_USER)
public class GroupHasUser {

    public final static transient String GROUP_ID = "group_id";
    public final static transient String USER_ID = "user_id";

    @EmbeddedId
    private CKGroupHasUser primaryKey;

    public CKGroupHasUser getPrimaryKey() {
        return primaryKey;
    }

    public void setPrimaryKey(CKGroupHasUser primaryKey) {
        this.primaryKey = primaryKey;
    }

}
