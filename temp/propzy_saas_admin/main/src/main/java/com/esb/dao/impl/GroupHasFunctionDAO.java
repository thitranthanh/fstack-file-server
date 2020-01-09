package com.esb.dao.impl;

import org.springframework.stereotype.Repository;

import com.esb.dao.IGroupHasFunctionDAO;
import com.esb.entity.CKGroupHasFunction;
import com.esb.entity.GroupHasFunction;

@Repository
public class GroupHasFunctionDAO extends BasicDAO<GroupHasFunction, CKGroupHasFunction>
        implements IGroupHasFunctionDAO {

}
