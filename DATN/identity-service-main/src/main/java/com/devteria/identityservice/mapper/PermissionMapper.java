package com.devteria.identityservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.devteria.identityservice.dto.request.PermissionRequest;
import com.devteria.identityservice.dto.response.PermissionResponse;
import com.devteria.identityservice.entity.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {

    @Mapping(target = "roles", ignore = true)  // Nếu bạn không muốn ánh xạ roles trong permission
    Permission toPermission(PermissionRequest request);  // Tạo permission từ request

    PermissionResponse toPermissionResponse(Permission permission);  // Tạo PermissionResponse từ Permission entity
}
