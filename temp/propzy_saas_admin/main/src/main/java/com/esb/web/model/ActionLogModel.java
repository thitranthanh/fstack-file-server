package com.esb.web.model;

import java.util.List;

import com.esb.entity.ActionLog;

public class ActionLogModel {

    private List<ActionLog> actionLogs;
    private ActionLog actionLog;

    public List<ActionLog> getActionLogs() {
        return actionLogs;
    }

    public void setActionLogs(List<ActionLog> actionLogs) {
        this.actionLogs = actionLogs;
    }

    public ActionLog getActionLog() {
        return actionLog;
    }

    public void setActionLog(ActionLog actionLog) {
        this.actionLog = actionLog;
    }

}
