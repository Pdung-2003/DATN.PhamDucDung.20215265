package com.devteria.identityservice.dto.request;

import lombok.*;

@Data
public class TourRequest {
    private String tourName;  // Tên tour
    private String description;  // Mô tả tour
    private Double price;  // Giá tour
    private Integer managerId;  // Quản lý tour, liên kết với User
}
