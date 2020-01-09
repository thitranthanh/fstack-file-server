package com.esb.dao.impl;

import org.springframework.stereotype.Repository;

import com.esb.dao.IUserDAO;
import com.esb.entity.User;

@Repository
public class UserDAO extends BasicDAO<User, String> implements IUserDAO {

}
