package com.esb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.esb.entity.CKFunction;
import com.esb.entity.Function;

@Service
public interface IFunctionService {

    public List<Function> getListFunction();

    public List<Function> getListFunctionByRoleId(String roleId);

    public Function getFunction(String roleId, Integer permissionId);

    public boolean addFunction(Function function);

    public boolean addFunction(String roleId, Integer permissionId, String permissionName);

    public boolean deleteFunctionByCK(CKFunction ckFunction);

    public boolean deleteFunctionByRoleIdAndPermissionId(String roleId, Integer permissionId);

    public boolean deleteFunctionByRoleId(String roleId);

}