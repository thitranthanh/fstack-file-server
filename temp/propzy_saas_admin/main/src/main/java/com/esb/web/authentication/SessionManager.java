package com.esb.web.authentication;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.esb.entity.User;
import com.esb.util.Util;
import com.esb.web.consts.ControllerConsts;

@Service
public class SessionManager {

    private static final Logger log = Logger.getLogger(SessionManager.class);

    public UserInfoSession getUserInfoSession() {
        UserInfoSession ret = null;
        try {
            ret = (UserInfoSession) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception ex) {
            // log.warn(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public User getUserInfo() {
        User ret = null;
        try {
            UserInfoSession userInfoSession = getUserInfoSession();
            if (userInfoSession != null) {
                ret = userInfoSession.getUserInfo();
            }
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public Map<String, Integer> getPermissions() {
        Map<String, Integer> ret = new HashMap<String, Integer>();
        try {
            UserInfoSession userInfoSession = getUserInfoSession();
            if (userInfoSession != null) {
                ret = userInfoSession.getPermissions();
            }
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return ret;
    }

    public boolean isAuthenticated() {
        boolean isAuthenticated = false;
        try {
            isAuthenticated = this.getUserInfo() != null;
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return isAuthenticated;
    }

    public String getUserName() {
        String userName = null;
        try {
            userName = this.getUserInfo().getUsername();
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        if (userName == null) {
            userName = "";
        }
        return userName;
    }

    public String getUserId() {
        String userId = null;
        try {
            userId = this.getUserInfo().getId();
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        return userId;
    }

    public void accessLoginPage(HttpServletResponse res) {
        if (this.isAuthenticated()) {
            try {
                Map<String, Integer> permissions = this.getPermissions();
                if (permissions.containsKey("USER")) {
                    res.sendRedirect(ControllerConsts.INDEX_PAGE);
                } else {
                    res.sendRedirect(ControllerConsts.USER_PROFILE_PAGE);
                }
            } catch (Exception ex) {
                log.warn(Util.convertExceptionToString(ex));
            }
        }
    }
}
