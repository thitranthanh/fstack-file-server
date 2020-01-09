package com.esb.consts;

public interface RespCodeTrxnConsts {

    public static final String SUCCESS = "00";
    public static final String SUCCESS_MSG = "Success";

    public static final String SERVICE_IS_UNAVAILABLE = "01";
    public static final String SERVICE_IS_UNAVAILABLE_MSG = "Service {1} is not actived.";

    public static final String SERVICE_HAVE_NOT_ROUTING_TABLE = "02";
    public static final String SERVICE_HAVE_NOT_ROUTING_TABLE_MSG = "Service {1} haven't routing table.";

    public static final String SERVER_NOT_RESPONSE = "03";
    public static final String SERVER_NOT_RESPONSE_MSG = "Server {1} is not response.";

    public static final String SERVICE_NOT_SUPPORT = "04";
    public static final String SERVICE_NOT_SUPPORT_MSG = "Service type {1} is not support.";

}
