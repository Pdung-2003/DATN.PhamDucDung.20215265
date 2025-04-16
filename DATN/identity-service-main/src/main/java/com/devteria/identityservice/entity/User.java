package com.devteria.identityservice.entity;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Set;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String passwordDigest;
    private String email;

    private String address;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    @Column(nullable = true)  // chỉ có Customer và Admin mới có
    private String fullName;

    @Column(nullable = true)  // chỉ có Customer và Admin mới có
    private java.sql.Date birthDate;
}

