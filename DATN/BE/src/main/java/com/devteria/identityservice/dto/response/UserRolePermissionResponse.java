package com.devteria.identityservice.dto.response;

import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.entity.Role;
import com.devteria.identityservice.entity.Permission;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRolePermissionResponse {
    private Long userId;
    private String username;
    private Long roleId;
    private String roleName;
    private Long permissionId;
    private String permissionName;
}