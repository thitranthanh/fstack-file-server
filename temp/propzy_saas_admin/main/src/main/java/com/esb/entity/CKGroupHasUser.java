package com.esb.entity;

import java.io.Serializable;

import javax.persistence.Column;

public class CKGroupHasUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = GroupHasUser.GROUP_ID)
    private String groupId;

    @Column(name = GroupHasUser.USER_ID)
    private String userId;

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
