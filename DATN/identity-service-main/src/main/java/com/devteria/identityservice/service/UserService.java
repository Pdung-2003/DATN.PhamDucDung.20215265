package com.devteria.identityservice.service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devteria.identityservice.dto.request.UserCreationRequest;
import com.devteria.identityservice.dto.request.UserUpdateRequest;
import com.devteria.identityservice.dto.response.UserResponse;
import com.devteria.identityservice.entity.Role;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.mapper.UserMapper;
import com.devteria.identityservice.repository.RoleRepository;
import com.devteria.identityservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    // Method to create a new user
    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Check and set Customer or Admin info
        if (request.getFullName() != null) {
            Customer customer = new Customer();
            customer.setUser(user);
            customer.setFullName(request.getFullName());
            customer.setPhoneNumber(request.getPhoneNumber());
            customer.setAddress(request.getAddress());
            customer.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            customer.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            user.setCustomer(customer); // Set Customer for User
        }

        if (request.getAdminLevel() != null) {
            Admin admin = new Admin();
            admin.setUser(user);
            admin.setAdminLevel(request.getAdminLevel());
            admin.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            admin.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            user.setAdmin(admin); // Set Admin for User
        }

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return userMapper.toUserResponse(user);
    }

    // Method to fetch logged-in user's information
    public UserResponse getMyInfo() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    // Update user information
    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<Role> roles = new HashSet<>(roleRepository.findAllById(request.getRoles()));
        user.setRoles(roles);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    // Delete user (admin only)
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    // Get all users (admin only)
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    // Get specific user (admin only)
    public UserResponse getUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }
}
