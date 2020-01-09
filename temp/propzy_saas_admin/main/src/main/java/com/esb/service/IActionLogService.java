package com.esb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.esb.entity.ActionLog;

@Service
public interface IActionLogService {

    public List<ActionLog> getListActionLog();

    public ActionLog getActionLogByActionLogId(String actionLogId);

    public boolean addActionLog(ActionLog actionLog);
}
