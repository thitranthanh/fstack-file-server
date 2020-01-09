package com.esb.web.model;

import java.util.ArrayList;
import java.util.List;

import com.esb.web.consts.RespCodeConsts;

public class RespModel {

    public static final transient int SUCCESS = 1;
    public static final transient int WARNING = 0;
    public static final transient int ERROR = -1;
    public static final transient int CONFIRM = -2;

    private int status;

    private List<String> respCodes;
    private List<Object> params;

    private Object data;

    public RespModel() {
        this.respCodes = new ArrayList<String>();
        this.params = new ArrayList<Object>();
        this.status = WARNING;
    }

    public boolean isSuccess() {
        return this.status == SUCCESS;
    }

    public void setStatusError() {
        this.status = ERROR;
    }

    public void setStatusSuccess() {
        this.status = SUCCESS;
    }

    public void setStatusWarning() {
        this.status = WARNING;
    }

    public void setStatusConfirm() {
        this.status = CONFIRM;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<String> getRespCodes() {
        return respCodes;
    }

    public void setRespCodes(List<String> respCodes) {
        this.respCodes = respCodes;
    }

    public List<Object> getParams() {
        return params;
    }

    public void setParams(List<Object> params) {
        this.params = params;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public void setRespCode(String respCode) {
        this.setRespCode(respCode, null);
    }

    public void setRespCode(String respCode, Object param) {
        if (respCode != null) {
            this.respCodes.add(respCode);
            if (param != null) {
                this.params.add(param);
            } else {
                String[] temp = {};
                this.params.add(temp);
            }
        }
    }

    public void setCommonError() {
        this.setStatusError();
        this.setRespCode(RespCodeConsts.COMMON_ERROR);
    }
}
