package com.esb.entity.config;

import java.io.Serializable;

public class Property implements Serializable {

    private static final long serialVersionUID = -6750517622469390969L;

    private String key;
    private String split;
    private String value;

    public Property() {
        key = "";
        split = "";
        value = "";
    }

    public Property(String key, String value) {
        this.key = key;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getSplit() {
        return split;
    }

    public void setSplit(String split) {
        this.split = split;
    }
}