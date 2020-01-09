package com.esb.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HTTPErrorHandler {

    @RequestMapping(value = "/404")
    public String error404() {
        System.out.println("custom 404 error handler");
        return "/error_404";
    }
}
