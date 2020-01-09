package com.esb.web.authentication;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Map;

import com.esb.entity.User;

public class UserInfoSession extends org.springframework.security.core.userdetails.User implements Serializable {

    private static final long serialVersionUID = 1L;
    private User userInfo;
    private Map<String, Integer> permissions;

    public UserInfoSession(String username, String password, User userInfo, Map<String, Integer> permissions) {
        super(username, password, new ArrayList());
        this.userInfo = userInfo;
        this.permissions = permissions;
    }

    public User getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(User userInfo) {
        this.userInfo = userInfo;
    }

    public Map<String, Integer> getPermissions() {
        return permissions;
    }

    public void setPermissions(Map<String, Integer> permissions) {
        this.permissions = permissions;
    }
}
