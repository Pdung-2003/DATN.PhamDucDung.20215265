package com.devteria.identityservice.service;

import com.devteria.identityservice.dto.request.ForgotPasswordRequest;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.exception.AppException;
import com.devteria.identityservice.exception.ErrorCode;
import com.devteria.identityservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Tạo token reset password
        String resetToken = generateResetToken();
        
        // Lưu token vào database
        user.setResetPasswordToken(resetToken);
        user.setResetPasswordTokenExpiry(LocalDateTime.now().plusHours(24)); // Token hết hạn sau 24 giờ
        userRepository.save(user);

        // Gửi email chứa link reset password
        String resetLink = "http://your-frontend-url/reset-password?token=" + resetToken;
        String emailContent = String.format(
            "Xin chào %s,\n\n" +
            "Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng click vào link sau để đặt lại mật khẩu:\n" +
            "%s\n\n" +
            "Link này sẽ hết hạn sau 24 giờ.\n\n" +
            "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\n" +
            "Trân trọng,\n" +
            "Team của chúng tôi",
            user.getFullName(),
            resetLink
        );

        // Gửi email
        emailService.sendEmail(
            user.getEmail(),
            "Yêu cầu đặt lại mật khẩu",
            Map.of("resetLink", resetLink, "fullName", user.getFullName()),
            "forgot-password"
        );
    }

    private String generateResetToken() {
        return UUID.randomUUID().toString();
    }
} 