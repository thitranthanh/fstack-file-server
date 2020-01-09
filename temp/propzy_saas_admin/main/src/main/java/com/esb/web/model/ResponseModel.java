package com.esb.web.model;

import java.io.Serializable;
import java.util.ArrayList;

public class ResponseModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private boolean result = true;
    private String code;
    private String message;
    private Object data = new ArrayList<>();

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
