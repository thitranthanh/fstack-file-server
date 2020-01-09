package com.esb.dao;

import org.springframework.stereotype.Repository;

import com.esb.entity.ActionLog;

@Repository
public interface IActionLogDAO extends IBasicDAO<ActionLog, String> {

}
