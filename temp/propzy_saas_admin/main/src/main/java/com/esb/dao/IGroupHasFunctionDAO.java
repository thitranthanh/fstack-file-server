package com.esb.dao;

import org.springframework.stereotype.Repository;

import com.esb.entity.CKGroupHasFunction;
import com.esb.entity.GroupHasFunction;

@Repository
public interface IGroupHasFunctionDAO extends IBasicDAO<GroupHasFunction, CKGroupHasFunction> {

}
