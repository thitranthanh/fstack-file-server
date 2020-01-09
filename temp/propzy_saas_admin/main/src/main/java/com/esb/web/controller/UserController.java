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
import com.esb.web.bo.WebUserBO;
import com.esb.web.consts.ControllerConsts;
import com.esb.web.model.UserModel;
import com.google.gson.Gson;

@Controller
public class UserController {

    private static final Logger log = Logger.getLogger(UserController.class);

    @Autowired
    private WebUserBO userBO;
    @Autowired
    private Gson gs;

    @RequestMapping(value = ControllerConsts.USERS_GET_BASIC_INFO_SESSION, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getCurrentLoggedUser() throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.USERS_GET_BASIC_INFO_SESSION));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.userBO.getBasicInfoSession());
    }

    @RequestMapping(value = ControllerConsts.USERS_LIST_USER_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getListUserDataModel() throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.USERS_LIST_USER_DATA_MODEL));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.userBO.getListUserDataModel());
    }

    @RequestMapping(value = ControllerConsts.USERS_ADD_USER_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getAddUserDataModel() throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.USERS_ADD_USER_DATA_MODEL));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.userBO.getAddUserDataModel());
    }

    @RequestMapping(value = ControllerConsts.USERS_EDIT_USER_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getEditUserDataModel(@PathVariable String userId) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[userId: %s]", RequestMethod.GET,
                    ControllerConsts.USERS_EDIT_USER_DATA_MODEL, userId));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.userBO.getEditUserDataModel(userId));
    }

    @RequestMapping(value = ControllerConsts.USERS, method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String addUser(@RequestBody String userJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[user: %s]", RequestMethod.POST, ControllerConsts.USERS, userJSON));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        UserModel userModuleEntity = this.gs.fromJson(userJSON, UserModel.class);
        return this.gs.toJson(this.userBO.addUser(userModuleEntity));
    }

    @RequestMapping(value = ControllerConsts.USERS, method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateUser(@RequestBody String userJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[user: %s]", RequestMethod.PUT, ControllerConsts.USERS, userJSON));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        UserModel userModuleEntity = this.gs.fromJson(userJSON, UserModel.class);
        return this.gs.toJson(this.userBO.updateUser(userModuleEntity));
    }

    @RequestMapping(value = ControllerConsts.USERS_DELETE_USER_BY_USER_ID, method = RequestMethod.DELETE, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String deleteUser(@PathVariable String userId) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[userId: %s]", RequestMethod.DELETE,
                    ControllerConsts.USERS_DELETE_USER_BY_USER_ID, userId));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.userBO.deleteUserByUserId(userId));
    }

    @RequestMapping(value = ControllerConsts.USERS_MY_PROFILE_DATA_MODEL, method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String getMyProfileDataModel() throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.USERS_MY_PROFILE_DATA_MODEL));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.userBO.getMyProfileDataModel());
    }

    @RequestMapping(value = ControllerConsts.USERS_UPDATE_USER_STATUS, method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateUserStatus(@RequestBody String userModuleEntityJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.PUT, ControllerConsts.USERS_UPDATE_USER_STATUS));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        UserModel userModuleEntity = this.gs.fromJson(userModuleEntityJSON, UserModel.class);
        return this.gs.toJson(this.userBO.updateUserStatus(userModuleEntity));
    }

    @RequestMapping(value = ControllerConsts.USERS_UPDATE_MY_PROFILE, method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String updateMyProfile(@RequestBody String userModuleEntityJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.PUT, ControllerConsts.USERS_UPDATE_MY_PROFILE));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        UserModel userModuleEntity = this.gs.fromJson(userModuleEntityJSON, UserModel.class);
        return this.gs.toJson(this.userBO.updateMyProfile(userModuleEntity));
    }

    @RequestMapping(value = ControllerConsts.USERS_CHANGE_PASSWORD, method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String changePassword(@RequestBody String userModuleEntityJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.PUT, ControllerConsts.USERS_CHANGE_PASSWORD));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        UserModel userModuleEntity = this.gs.fromJson(userModuleEntityJSON, UserModel.class);
        return this.gs.toJson(this.userBO.changePassword(userModuleEntity));
    }

    @RequestMapping(value = ControllerConsts.USERS_RESET_PASSWORD, method = RequestMethod.PUT, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String resetPassword(@PathVariable String userId) throws ParseException {
        try {
            log.info(String.format("[%s][%s]" + "[userId: %s]", RequestMethod.PUT,
                    ControllerConsts.USERS_RESET_PASSWORD, userId));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return this.gs.toJson(this.userBO.resetPassword(userId));
    }

    @RequestMapping(value = ControllerConsts.USERS_VALIDATE_USER, method = RequestMethod.POST, produces = "application/json; charset=utf-8")
    @ResponseBody
    public String validate(@RequestBody String userModuleEntityJSON) throws ParseException {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.POST, ControllerConsts.USERS_VALIDATE_USER));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        UserModel userModuleEntity = this.gs.fromJson(userModuleEntityJSON, UserModel.class);
        return this.gs.toJson(this.userBO.validate(userModuleEntity));
    }
}
