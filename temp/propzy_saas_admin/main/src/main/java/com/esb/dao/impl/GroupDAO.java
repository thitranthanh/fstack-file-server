package com.esb.dao.impl;

import org.springframework.stereotype.Repository;

import com.esb.dao.IGroupDAO;
import com.esb.entity.Group;

@Repository
public class GroupDAO extends BasicDAO<Group, String> implements IGroupDAO {

}
