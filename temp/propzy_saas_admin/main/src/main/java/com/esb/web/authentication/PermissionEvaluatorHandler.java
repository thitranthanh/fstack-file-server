package com.esb.web.authentication;

import java.io.Serializable;
import java.util.Map;

import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;

public class PermissionEvaluatorHandler implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        boolean result = false;
        Map<String, Integer> permissions = ((UserInfoSession) targetDomainObject).getPermissions();
        String[] permits = ((String) permission).split(":");
        String roleId = permits[0];
        if (permissions.containsKey(roleId)) {
            if (permits.length > 1) {
                Integer functionPermission = Integer.parseInt(permits[1]);
                Integer userPermission = permissions.get(roleId);
                if ((functionPermission & userPermission) == functionPermission) {
                    result = true;
                }
            } else {
                result = true;
            }
        }
        return result;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType,
            Object permission) {
        throw new RuntimeException("Id and Class permissions are not supperted by this application");
    }

}
