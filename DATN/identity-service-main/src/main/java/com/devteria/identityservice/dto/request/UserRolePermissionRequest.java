package com.devteria.identityservice.dto.request;

import lombok.Data;

@Data
public class UserRolePermissionRequest {
    private Integer userId;
    private Integer roleId;
    private Integer permissionId;
}
