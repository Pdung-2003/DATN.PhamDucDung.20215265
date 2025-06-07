package com.devteria.identityservice.controller;

import com.devteria.identityservice.entity.Notification;
import com.devteria.identityservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/user/{userId}")
    public List<Notification> getNotifications(@PathVariable Long userId) {
        return notificationService.getNotificationsForUser(userId);
    }

    @GetMapping("/user/{userId}/unread-count")
    public long getUnreadCount(@PathVariable Long userId) {
        return notificationService.countUnreadNotifications(userId);
    }

    @PostMapping("/user/{userId}/mark-all-read")
    public void markAllAsRead(@PathVariable Long userId) {
        notificationService.markAllAsRead(userId);
    }
} 