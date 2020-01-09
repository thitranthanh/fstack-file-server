package com.esb.dao;

import org.springframework.stereotype.Repository;

import com.esb.entity.CKFunction;
import com.esb.entity.Function;

@Repository
public interface IFunctionDAO extends IBasicDAO<Function, CKFunction> {

}
