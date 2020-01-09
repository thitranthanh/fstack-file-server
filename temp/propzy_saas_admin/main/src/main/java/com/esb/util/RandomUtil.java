package com.esb.util;

import java.util.Random;
import java.util.UUID;

public class RandomUtil {

    public static String generateGeneralId(String prefix) {
        StringBuilder strGroupId = new StringBuilder();
        strGroupId.append(prefix);
        strGroupId.append(UUID.randomUUID());
        String groupId = strGroupId.toString();
        return groupId;
    }

    public static String generateUserId() {
        return generateGeneralId("user-");
    }

    public static String generateGroupHasUserId() {
        return generateGeneralId("group-has-user-");
    }

    public static String generateGroupId() {
        return generateGeneralId("group-");
    }

    public static String generateGroupHasFunctionId() {
        return generateGeneralId("group-has-function");
    }

    public static String generateFunctionId() {
        return generateGeneralId("function-");
    }

    public static String generateRoleId() {
        return generateGeneralId("role-");
    }

    public static String generateHostId() {
        return generateGeneralId("host-");
    }

    public static String generateServiceId() {
        return generateGeneralId("service-");
    }

    public static String generateRoutingId() {
        return generateGeneralId("routing-");
    }

    public static String generateMappingFieldDefinedId() {
        return generateGeneralId("mappign-field-defined-");
    }

    public static String generateActionLogId() {
        return generateGeneralId("action-log-");
    }

    public static int randomIntNumber(int min, int max) {
        Random rand = new Random();
        return rand.nextInt((max - min) + 1) + min;
    }
}
