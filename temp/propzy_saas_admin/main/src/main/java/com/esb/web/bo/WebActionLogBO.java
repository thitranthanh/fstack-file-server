package com.esb.web.bo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.esb.consts.GlobalConsts;
import com.esb.entity.ActionLog;
import com.esb.service.IActionLogService;
import com.esb.util.DateTime;
import com.esb.web.authentication.RolePermissionsMapping;
import com.esb.web.model.ActionLogModel;

@Service
public class WebActionLogBO {

    @Autowired
    private IActionLogService actionLogService;

    @PreAuthorize("hasPermission(principal, '" + RolePermissionsMapping.ROLE_HOST + "')")
    public ActionLogModel getListActionLogDataModel() {
        ActionLogModel actionLogModuleEntity = new ActionLogModel();
        List<ActionLog> actionLogs = this.actionLogService.getListActionLog();
        String dateTimeFormat = "dd/MM/yyyy HH:mm:ss";
        for (ActionLog actionLog : actionLogs) {
            Long timestamp = actionLog.getTimestamp();
            String strDateTime = DateTime.getInstance().getDateByTimeZone(timestamp, dateTimeFormat,
                    GlobalConsts.DEFAULT_TIMEZONE);
            actionLog.setStrDateTime(strDateTime);
        }
        actionLogModuleEntity.setActionLogs(actionLogs);
        return actionLogModuleEntity;
    }
}