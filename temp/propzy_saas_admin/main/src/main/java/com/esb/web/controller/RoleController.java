package com.esb.web.controller;

import java.text.ParseException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esb.util.Util;
import com.esb.web.bo.WebRoleBO;
import com.esb.web.consts.ControllerConsts;
import com.google.gson.Gson;

@Controller
public class RoleController {

    private static final Logger log = Logger.getLogger(RoleController.class);

    @Autowired
    private WebRoleBO roleBO;
    @Autowired
    private Gson gs;

    @RequestMapping(value = ControllerConsts.ROLES_LIST_ROLE_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getListRoleDataModel() throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.ROLES_LIST_ROLE_DATA_MODEL));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.roleBO.getListRoleDataModel());
    }
}
