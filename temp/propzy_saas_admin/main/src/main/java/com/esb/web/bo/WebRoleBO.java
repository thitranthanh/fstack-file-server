package com.esb.web.bo;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.esb.entity.Function;
import com.esb.entity.Role;
import com.esb.service.IFunctionService;
import com.esb.service.IRoleService;
import com.esb.web.authentication.RolePermissionsMapping;
import com.esb.web.model.FunctionDataModel;
import com.esb.web.model.RoleDataModel;
import com.esb.web.model.RoleModel;

@Service
public class WebRoleBO {

    @Autowired
    private IRoleService roleService;
    @Autowired
    private IFunctionService functionService;

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.ROLE_VIEW_PERMISSION + "')")
    public RoleModel getListRoleDataModel() {
        RoleModel roleModuleEntity = new RoleModel();
        List<RoleDataModel> rolesDataModel = new ArrayList<RoleDataModel>();
        roleModuleEntity.setRoles(rolesDataModel);

        List<Role> roles = this.roleService.getListRole();
        for (Role role : roles) {
            String roleId = role.getId();
            String roleName = role.getName();

            RoleDataModel roleDataModel = new RoleDataModel();

            List<FunctionDataModel> functions = new ArrayList<FunctionDataModel>();
            List<Function> temp = this.functionService.getListFunctionByRoleId(roleId);
            for (Function function : temp) {
                FunctionDataModel functionDataModel = new FunctionDataModel();
                functionDataModel.setPermissionId(function.getPrimaryKey().getPermissionId());
                functionDataModel.setPermissionName(function.getPermissionName());
                functions.add(functionDataModel);
            }
            roleDataModel.setRoleId(roleId);
            roleDataModel.setRoleName(roleName);
            roleDataModel.setFunctions(functions);
            rolesDataModel.add(roleDataModel);
        }
        return roleModuleEntity;
    }
}
