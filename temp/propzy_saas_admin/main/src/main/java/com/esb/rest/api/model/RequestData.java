package com.esb.rest.api.model;

import java.util.Map;

import com.google.gson.annotations.SerializedName;

public class RequestData {

    @SerializedName("service_code")
    public String serviceCode;

    @SerializedName("hostname")
    public String hostname;

    @SerializedName("timestamp")
    public Long timestamp;

    @SerializedName("input")
    public Map<String, Object> input;

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getInput() {
        return input;
    }

    public void setInput(Map<String, Object> input) {
        this.input = input;
    }

}
