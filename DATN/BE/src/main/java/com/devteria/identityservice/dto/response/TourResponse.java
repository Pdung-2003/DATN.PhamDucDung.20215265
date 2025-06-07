package com.devteria.identityservice.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TourResponse {
    private Long tourId;
    private String tourCode;
    private String tourName;
    private String tourBanner;
    private String description;
    private String duration;
    private String location;
    private String destination;
    private BigDecimal price;
    private BigDecimal discount;
    private String companyName;
    private Integer maxCapacity;
    private Integer currentBooked;
    private LocalDate startDate;
    private LocalDate endDate;
    private ManagerDataResponse manager;
    private String status;
}
