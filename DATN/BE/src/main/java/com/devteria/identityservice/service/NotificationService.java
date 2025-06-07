package com.devteria.identityservice.service;

import com.devteria.identityservice.entity.Notification;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.Booking;
import com.devteria.identityservice.repository.NotificationRepository;
import com.devteria.identityservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public List<Notification> getNotificationsForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public void notifyManagerTourApproved(Tour tour) {
        Notification notification = Notification.builder()
                .user(tour.getManager())
                .content("Tour: " + tour.getTourName() + " đã được duyệt bởi admin")
                .createdAt(LocalDateTime.now())
                .isRead(false)
                .build();
        notificationRepository.save(notification);
    }

    public void notifyManagerTourBooked(Tour tour, User customer) {
        Notification notification = Notification.builder()
                .user(tour.getManager())
                .content("Tour: " + tour.getTourName() + " (ID: " + tour.getTourId() + ") có khách hàng " + customer.getFullName() + " vừa đặt, vui lòng kiểm tra tour.")
                .createdAt(LocalDateTime.now())
                .isRead(false)
                .build();
        notificationRepository.save(notification);
    }

    public long countUnreadNotifications(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return notificationRepository.countByUserAndIsReadFalse(user);
    }

    public void notifyCustomerBookingConfirmed(Booking booking) {
        Notification notification = Notification.builder()
            .user(booking.getCustomer())
            .content("Quản lý đã duyệt đơn đặt tour " + booking.getTour().getTourName() +
                     " với số lượng người " + booking.getNumberOfPeople() +
                     ". Bạn vui lòng tiếp tục thanh toán tour.")
            .createdAt(java.time.LocalDateTime.now())
            .isRead(false)
            .build();
        notificationRepository.save(notification);
    }

    public void markAllAsRead(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        notificationRepository.markAllByUserAsRead(user);
    }
} 