package com.esb.web.bo;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esb.consts.GlobalConsts;
import com.esb.entity.ActionLog;
import com.esb.entity.Function;
import com.esb.service.IActionLogService;
import com.esb.service.IFunctionService;
import com.esb.util.Util;
import com.esb.web.authentication.SessionManager;
import com.esb.web.consts.RespCodeConsts;
import com.esb.web.model.RespModel;
import com.google.gson.Gson;

@Service
public class WebFunctionBO {

    private static final Logger log = Logger.getLogger(WebFunctionBO.class);
    @Autowired
    private Gson gs;
    @Autowired
    private IActionLogService actionLogService;
    @Autowired
    private IFunctionService functionService;

    @Autowired
    private SessionManager sessionManager;

    public List<Function> getListFunctionByRoleId(String roleId) {
        return this.functionService.getListFunctionByRoleId(roleId);
    }

    public Function getFunction(String roleId, Integer permissionId) {
        return this.functionService.getFunction(roleId, permissionId);
    }

    public RespModel addFunction(String roleId, Integer permissionId, String permissionName) {
        RespModel respModel = new RespModel();
        boolean result = false;
        try {
            result = this.functionService.addFunction(roleId, permissionId, permissionName);
            if (result) {
                String[] params = { permissionName };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.FUNCTION_ADD_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }
        try {
            log.info(String.format("Add function " + "[roleId [%s] " + "[permissionId [%s] " + "[permissionName [%s] "
                    + "[status [%s] ", roleId, permissionId, permissionName, result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_ADD);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_FUNCTION);
            actionLog.setComment("Add function");
            actionLog.setInput(roleId + " - " + permissionId + " - " + permissionName);
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    public RespModel updateFunction(String roleId, Integer permissionId, String permissionName) {
        RespModel respModel = new RespModel();
        boolean result = false;
        try {
            boolean isDelete = this.functionService.deleteFunctionByRoleIdAndPermissionId(roleId, permissionId);
            if (isDelete) {
                result = this.functionService.addFunction(roleId, permissionId, permissionName);
            }
            if (result) {
                String[] params = { permissionName };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.FUNCTION_UPDATE_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Update function " + "[roleId [%s] " + "[permissionId [%s] "
                    + "[permissionName [%s] " + "[status [%s] ", roleId, permissionId, permissionName, result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_UPDATE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_FUNCTION);
            actionLog.setComment("Update function");
            actionLog.setInput(roleId + " - " + permissionId + " - " + permissionName);
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }

    public RespModel deleteFunction(String roleId, Integer permissionId) {
        RespModel respModel = new RespModel();
        boolean result = false;
        try {
            Function function = this.functionService.getFunction(roleId, permissionId);
            if (function != null) {
                result = this.functionService.deleteFunctionByRoleIdAndPermissionId(roleId, permissionId);
            }
            if (result) {
                String[] params = { function.getPermissionName() };
                respModel.setStatusSuccess();
                respModel.setRespCode(RespCodeConsts.FUNCTION_DELETE_SUCCESS, params);
            } else {
                respModel.setCommonError();
            }
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
            respModel.setCommonError();
        }

        try {
            log.info(String.format("Delete function " + "[roleId [%s] " + "[permissionId [%s] " + "[status [%s] ",
                    roleId, permissionId, result));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setUsername(sessionManager.getUserName());
            actionLog.setAction(GlobalConsts.ACTION_LOG_DELETE);
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setInput(roleId + " - " + permissionId);
            actionLog.setComment("Delete function");
            actionLog.setOutput(this.gs.toJson(respModel));
            if (respModel.isSuccess()) {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            } else {
                actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            }
            this.actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return respModel;
    }
}
