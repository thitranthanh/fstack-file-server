package com.esb.dao.impl;

import org.springframework.stereotype.Repository;

import com.esb.dao.IActionLogDAO;
import com.esb.entity.ActionLog;

@Repository
public class ActionLogDAO extends BasicDAO<ActionLog, String> implements IActionLogDAO {

}
