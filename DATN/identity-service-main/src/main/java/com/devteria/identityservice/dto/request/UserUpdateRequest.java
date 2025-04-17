package com.devteria.identityservice.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    String password;  // Mật khẩu mới
    String fullName;  // Tên đầy đủ
    String phoneNumber;
    String address;
    Set<String> roles;  // Set các vai trò của người dùng
}
