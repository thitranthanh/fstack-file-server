package com.esb.dao.impl;

import org.springframework.stereotype.Repository;

import com.esb.dao.IGroupHasUserDAO;
import com.esb.entity.CKGroupHasUser;
import com.esb.entity.GroupHasUser;

@Repository
public class GroupHasUserDAO extends BasicDAO<GroupHasUser, CKGroupHasUser> implements IGroupHasUserDAO {

}
