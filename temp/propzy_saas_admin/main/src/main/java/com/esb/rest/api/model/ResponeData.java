package com.esb.rest.api.model;

import com.google.gson.annotations.SerializedName;

public class ResponeData extends RequestData {

    @SerializedName("output")
    public Object output;

    @SerializedName("response_code")
    public String responseCode;

    @SerializedName("response_message")
    public String responseMessage;

    public ResponeData() {
    }

    public ResponeData(RequestData req) {
        hostname = req.getHostname();
        serviceCode = req.getServiceCode();
        timestamp = req.getTimestamp();
    }

    public Object getOutput() {
        return output;
    }

    public void setOutput(Object output) {
        this.output = output;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

}
