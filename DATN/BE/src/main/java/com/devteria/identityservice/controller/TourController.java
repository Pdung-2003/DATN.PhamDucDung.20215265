package com.devteria.identityservice.controller;

import com.devteria.identityservice.dto.request.ApiResponse;
import com.devteria.identityservice.dto.request.TourFilterRequest;
import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.PaginationResponse;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.service.TourService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j(topic = "Tour-Controller")
@RestController
@RequestMapping("/api/tours")
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    // Tạo tour mới
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<ApiResponse<TourResponse>> createTour(@RequestPart(name = "tour") TourRequest tourRequest,
                                                                @RequestPart(name = "banner") MultipartFile file
    ) {
        TourResponse tourResponse = tourService.createTour(tourRequest, file);
        return ResponseEntity.ok().body(
                ApiResponse.<TourResponse>builder()
                        .result(tourResponse)
                        .build()
        );
    }

    // Cập nhật tour
    @PutMapping("/{tourId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<TourResponse> updateTour(@PathVariable Long tourId,
                                                   @RequestPart(name = "tour", required = false) TourRequest tourRequest,
                                                   @RequestPart(name = "banner", required = false) MultipartFile file
    ) {
        TourResponse updatedTour = tourService.updateTour(tourId, tourRequest, file);
        return ResponseEntity.ok(updatedTour);
    }

    //Lấy tất cả các tour
    @PostMapping("/search")
    public ResponseEntity<ApiResponse<?>> getTours(@RequestBody(required = false) TourFilterRequest filterRequest) {
        Page<TourResponse> tours = tourService.searchTour(filterRequest);
        ApiResponse<?> apiResponse = ApiResponse.builder()
                .result(tours.getContent())
                .pagination(new PaginationResponse(tours))
                .build();
        return ResponseEntity.ok().body(apiResponse);
    }

    // Lấy tour theo tourId
    @GetMapping("/{tourId}")
    public ResponseEntity<ApiResponse<TourResponse>> getTour(@PathVariable Long tourId) {
        TourResponse tourResponse = tourService.getTourById(tourId);
        return ResponseEntity.ok().body(
                ApiResponse.<TourResponse>builder()
                        .result(tourResponse)
                        .build()
        );
    }

     //Xóa tour
    @DeleteMapping("/{tourId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TOUR_MANAGER')")
    public ResponseEntity<Void> deleteTour(@PathVariable Long tourId) {
        tourService.deleteTour(tourId);
        return ResponseEntity.noContent().build();
    }
}
