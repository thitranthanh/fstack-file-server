package com.esb.web.controller;

import java.text.ParseException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esb.util.Util;
import com.esb.web.bo.WebGroupBO;
import com.esb.web.consts.ControllerConsts;
import com.esb.web.model.GroupModel;
import com.google.gson.Gson;

@Controller
public class GroupController {

    private static final Logger log = Logger.getLogger(GroupController.class);

    @Autowired
    private WebGroupBO groupBO;
    @Autowired
    private Gson gs;

    @RequestMapping(value = ControllerConsts.GROUPS_LIST_GROUP_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getListGroupDataModel() throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.GROUPS_LIST_GROUP_DATA_MODEL));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.groupBO.getListGroupDataModel());
    }

    @RequestMapping(value = ControllerConsts.GROUPS_ADD_GROUP_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getAddGroupDataModel() throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.GROUPS_ADD_GROUP_DATA_MODEL));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.groupBO.getAddGroupDataModel());
    }

    @RequestMapping(value = ControllerConsts.GROUPS_EDIT_GROUP_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getEditGroupDataModel(@PathVariable String groupId) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[groupId: %s]", RequestMethod.GET,
                    ControllerConsts.GROUPS_EDIT_GROUP_DATA_MODEL, groupId));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.groupBO.getEditGroupDataModel(groupId));
    }

    @RequestMapping(value = ControllerConsts.GROUPS, method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addGroup(@RequestBody String groupJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[group: %s]", RequestMethod.POST, ControllerConsts.GROUPS, groupJSON));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        GroupModel groupModuleEntity = this.gs.fromJson(groupJSON, GroupModel.class);
        return this.gs.toJson(this.groupBO.addGroup(groupModuleEntity));
    }

    @RequestMapping(value = ControllerConsts.GROUPS, method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateGroup(@RequestBody String groupJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[group: %s]", RequestMethod.PUT, ControllerConsts.GROUPS, groupJSON));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        GroupModel groupModuleEntity = this.gs.fromJson(groupJSON, GroupModel.class);
        return this.gs.toJson(this.groupBO.updateGroup(groupModuleEntity));
    }

    @RequestMapping(value = ControllerConsts.GROUPS_DELETE_GROUP_BY_GROUP_ID, method = RequestMethod.DELETE, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteGroup(@PathVariable String groupId) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[groupId: %s]", RequestMethod.DELETE,
                    ControllerConsts.GROUPS_DELETE_GROUP_BY_GROUP_ID, groupId));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.groupBO.deleteGroupByGroupId(groupId));
    }
}
