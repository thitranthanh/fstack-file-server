package com.esb.dao.impl;

import org.springframework.stereotype.Repository;

import com.esb.dao.IRoleDAO;
import com.esb.entity.Role;

@Repository
public class RoleDAO extends BasicDAO<Role, String> implements IRoleDAO {

}
