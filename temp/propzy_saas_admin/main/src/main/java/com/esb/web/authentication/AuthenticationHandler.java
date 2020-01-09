package com.esb.web.authentication;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.esb.consts.GlobalConsts;
import com.esb.entity.ActionLog;
import com.esb.entity.User;
import com.esb.service.IActionLogService;
import com.esb.util.CloudUtil;
import com.esb.util.Util;
import com.esb.web.bo.WebUserBO;
import com.esb.web.consts.ControllerConsts;
import com.google.gson.Gson;

public class AuthenticationHandler implements UserDetailsService, AuthenticationFailureHandler,
        AuthenticationSuccessHandler, LogoutSuccessHandler {

    private static final Logger log = Logger.getLogger(AuthenticationHandler.class);

    @Autowired
    private WebUserBO webUserBO;

    @Autowired
    private IActionLogService actionLogService;

    @Autowired
    private SessionManager sessionManager;

    @Autowired
    private Gson gs;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {

        UserInfoSession userInfoSession = null;

        HttpServletRequest req = getRequest();

        usernameOrEmail = usernameOrEmail.toLowerCase();
        String password = req.getParameter("j_password");

        User userTemp = this.webUserBO.getUserByUsernameOrEmail(usernameOrEmail);
        try {
            if (userTemp != null) {
                boolean isSubmitFromCookie = "true".equals(req.getParameter("isSubmitFromCookie"));
                if (isSubmitFromCookie) {
                    String encryptedCookie = encryptCookie(usernameOrEmail, userTemp.getPassword(),
                            GlobalConsts.USER_COOKIE_EXPIRED + "");
                    if (encryptedCookie.equals(password)) {
                        userInfoSession = webUserBO.login(usernameOrEmail, password, userTemp.getPassword());
                    }
                } else {
                    String encryptedPassword = CloudUtil.encryptPassword(userTemp.getUsername(), password);
                    userInfoSession = webUserBO.login(usernameOrEmail, password, encryptedPassword);
                }
            }
        } catch (Exception ex) {
            log.error(ex.getMessage());
        }

        if (userInfoSession != null) {
            return userInfoSession;
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        User userInfo = sessionManager.getUserInfo();
        boolean isRemember = "on".equals(request.getParameter("isRemember"));
        if (isRemember) {
            response.addCookie(createUserCookie(userInfo, gs));
        } else {
        }

        Map<String, Integer> permissions = this.webUserBO.getPermissions(userInfo.getUsername());
        if (permissions.containsKey("USER")) {
            response.sendRedirect(ControllerConsts.INDEX_PAGE);
        } else {
            response.sendRedirect(ControllerConsts.USER_PROFILE_PAGE);
        }

        try {
            ActionLog actionLog = new ActionLog();
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setAction("Sign In");
            actionLog.setInput(userInfo.getUsername());
            actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_SUCCESS);
            actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        try {
            String username = request.getParameter(GlobalConsts.J_USERNAME);
            ActionLog actionLog = new ActionLog();
            actionLog.setFunction(GlobalConsts.ACTION_LOG_FUNCTION_USER);
            actionLog.setAction("Sign In");
            actionLog.setInput(username);
            actionLog.setStatus(GlobalConsts.ACTION_LOG_STATUS_FAIL);
            actionLogService.addActionLog(actionLog);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }

        String urlResult = "login?error=1";
        removeCookie(request, response, GlobalConsts.USER_COOKIE);
        response.sendRedirect(urlResult);
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            removeCookie(request, response, GlobalConsts.USER_COOKIE);
            response.sendRedirect("logout");
        } else {
            response.sendRedirect("login");
        }
    }

    /* private methods */
    private HttpServletRequest getRequest() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder
                .currentRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        return request;
    }

    private String encryptCookie(String username, String encryptPassword, String expiredDate) {
        String encryptCookie = null;
        try {
            encryptCookie = CloudUtil.encrypt("MD5", username + encryptPassword + expiredDate);
        } catch (Exception ex) {
            log.error(Util.convertExceptionToString(ex));
        }
        return encryptCookie;
    }

    private Cookie createUserCookie(User userInfo, Gson gson) {
        Map<String, String> userCookie = new HashMap<String, String>();
        userCookie.put(GlobalConsts.USER_COOKIE_USERNAME, userInfo.getUsername());
        userCookie.put(GlobalConsts.USER_COOKIE_PASSWORD,
                encryptCookie(userInfo.getUsername(), userInfo.getPassword(), GlobalConsts.USER_COOKIE_EXPIRED + ""));
        Cookie cookie = new Cookie(GlobalConsts.USER_COOKIE, gson.toJson(userCookie));
        cookie.setMaxAge(GlobalConsts.USER_COOKIE_EXPIRED);
        cookie.setPath(GlobalConsts.USER_COOKIE_PATH);
        return cookie;
    }

    private void removeCookie(HttpServletRequest req, HttpServletResponse res, String... cookieNames) {
        Cookie[] cookies = req.getCookies();
        new Gson().toJson(cookies);
        for (int i = 0, n = cookieNames.length; i < n; i++) {
            String cookieToRemove = cookieNames[i];
            for (int j = 0, m = cookies.length; j < m; j++) {
                Cookie cookie = cookies[j];
                if (cookieToRemove.equals(cookie.getName())) {
                    cookie.setValue("");
                    cookie.setMaxAge(0);
                    cookie.setPath(GlobalConsts.USER_COOKIE_PATH);
                    res.addCookie(cookie);
                    break;
                }
            }
        }
    }
}
