package com.esb.dao.impl;

import org.springframework.stereotype.Repository;

import com.esb.dao.IFunctionDAO;
import com.esb.entity.CKFunction;
import com.esb.entity.Function;

@Repository
public class FunctionDAO extends BasicDAO<Function, CKFunction> implements IFunctionDAO {

}
