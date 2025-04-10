package com.devteria.identityservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String fullName;

    private String phoneNumber;
    private String address;

    @Column(nullable = false, updatable = false)
    private java.sql.Timestamp createdAt;

    @Column(nullable = false)
    private java.sql.Timestamp updatedAt;
}
