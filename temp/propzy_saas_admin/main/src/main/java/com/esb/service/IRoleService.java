package com.esb.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.esb.entity.Role;

@Service
public interface IRoleService {

    public List<Role> getListRole();

    public Role getRoleByRoleId(String roleId);

    public boolean addRole(Role role);

    public boolean updateRole(String roleId, Map<String, String> params);

    public boolean deleteRoleByRoleId(String roleId);

}