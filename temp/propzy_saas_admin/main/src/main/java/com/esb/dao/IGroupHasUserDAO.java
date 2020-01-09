package com.esb.dao;

import org.springframework.stereotype.Repository;

import com.esb.entity.CKGroupHasUser;
import com.esb.entity.GroupHasUser;

@Repository
public interface IGroupHasUserDAO extends IBasicDAO<GroupHasUser, CKGroupHasUser> {

}
