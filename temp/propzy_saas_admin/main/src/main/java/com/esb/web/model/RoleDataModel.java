package com.esb.web.model;

import java.util.ArrayList;
import java.util.List;

public class RoleDataModel {

    private String roleId;
    private String roleName;
    private List<FunctionDataModel> functions;

    private List<Integer> funtionsOfUser;

    public RoleDataModel() {
        functions = new ArrayList<FunctionDataModel>();
        funtionsOfUser = new ArrayList<Integer>();
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public List<FunctionDataModel> getFunctions() {
        return functions;
    }

    public void setFunctions(List<FunctionDataModel> functions) {
        this.functions = functions;
    }

    public List<Integer> getFuntionsOfUser() {
        return funtionsOfUser;
    }

    public void setFuntionsOfUser(List<Integer> funtionsOfUser) {
        this.funtionsOfUser = funtionsOfUser;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

}
