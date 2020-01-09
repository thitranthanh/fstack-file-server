package com.esb.web.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.esb.consts.GlobalConsts;
import com.esb.util.Util;
import com.esb.web.authentication.SessionManager;
import com.esb.web.consts.ControllerConsts;
import com.google.code.kaptcha.servlet.KaptchaExtend;

@Controller
public class AuthenticationController extends KaptchaExtend {

    @Autowired
    private SessionManager sessionManager;

    private static final Logger log = Logger.getLogger(AuthenticationController.class);

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String defaultPageOne(HttpServletResponse res) {
        sessionManager.accessLoginPage(res);
        return ControllerConsts.LOGIN_PAGE;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String defaultPageTwo(HttpServletResponse res) {
        sessionManager.accessLoginPage(res);
        return ControllerConsts.LOGIN_PAGE;
    }

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    @RequestMapping(value = ControllerConsts.LOGIN, method = RequestMethod.GET)
    public String login(HttpServletRequest req, HttpServletResponse res) {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.LOGIN));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        sessionManager.accessLoginPage(res);
        return ControllerConsts.LOGIN_PAGE;
    }

    @RequestMapping(value = ControllerConsts.LOGOUT, method = RequestMethod.GET)
    public String logout() {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.LOGOUT));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        SecurityContextHolder.clearContext();
        // SecurityContextHolder.getContext().setAuthentication(null);
        return ControllerConsts.LOGIN_PAGE;
    }

    @RequestMapping(value = ControllerConsts.DO_LOGIN, method = RequestMethod.POST)
    public void doLogin(HttpServletRequest request, HttpServletResponse response) {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.POST, ControllerConsts.DO_LOGIN));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        try {
            request.getRequestDispatcher("/j_spring_security_check").forward(request, response);
        } catch (Exception ex) {
            log.info(Util.convertExceptionToString(ex));
        }
    }

    @RequestMapping(value = ControllerConsts.EXPIRED_SESSION, method = RequestMethod.GET)
    public void expiredSessionHandler(HttpServletRequest req, HttpServletResponse resp) {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.EXPIRED_SESSION));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }

        SecurityContextHolder.getContext().setAuthentication(null);

        String ajaxHeader = ((HttpServletRequest) req).getHeader(GlobalConsts.AJAX_HEADER_ATTRIBUTE);
        if (GlobalConsts.AJAX_HEADER.equals(ajaxHeader)) {
            try {
                log.info("Session is expired. Send default expired session code is 901");
                resp.sendError(901);
            } catch (IOException e) {
            }
        } else {
            try {
                // req.getRequestDispatcher("/login").forward(req, resp);
                resp.sendRedirect(ControllerConsts.LOGIN_PAGE);
            } catch (Exception ex) {
                log.info(Util.convertExceptionToString(ex));
            }
        }
    }

    @RequestMapping(value = "/captcha.jpg", method = RequestMethod.GET)
    public void captcha(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.captcha(req, resp);
    }

    @RequestMapping(value = ControllerConsts.CHECK_EXPIRED_SESSION, method = RequestMethod.GET)
    public void checkSessionExpired(HttpServletRequest request, HttpServletResponse response) {
        try {
            log.info(String.format("[%s][%s]", RequestMethod.GET, ControllerConsts.CHECK_EXPIRED_SESSION));
        } catch (Exception ex) {
            log.warn(Util.convertExceptionToString(ex));
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (null == auth) {
            try {
                log.info("Session is expired. Send default expired session code is 901");
                response.sendError(901);
            } catch (Exception ex) {
                log.info(Util.convertExceptionToString(ex));
            }
        }
    }
}
