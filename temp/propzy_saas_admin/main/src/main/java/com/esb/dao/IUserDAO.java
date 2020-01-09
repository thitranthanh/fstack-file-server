package com.esb.dao;

import org.springframework.stereotype.Repository;

import com.esb.entity.User;

@Repository
public interface IUserDAO extends IBasicDAO<User, String> {

}
