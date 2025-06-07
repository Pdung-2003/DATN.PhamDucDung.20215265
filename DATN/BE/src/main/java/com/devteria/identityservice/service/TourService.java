package com.devteria.identityservice.service;

import com.devteria.identityservice.constant.PredefinedRole;
import com.devteria.identityservice.dto.request.TourFilterRequest;
import com.devteria.identityservice.dto.request.TourRequest;
import com.devteria.identityservice.dto.response.TourResponse;
import com.devteria.identityservice.entity.Tour;
import com.devteria.identityservice.entity.User;
import com.devteria.identityservice.entity.Notification;
import com.devteria.identityservice.exception.*;
import com.devteria.identityservice.mapper.TourMapper;
import com.devteria.identityservice.repository.TourRepository;
import com.devteria.identityservice.repository.NotificationRepository;
import com.devteria.identityservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository tourRepository;
    private final TourMapper tourMapper;
    private final UserService userService;
    private final CloudinaryService cloudinaryService;
    private final NotificationRepository notificationRepository;
    private final NotificationService notificationService;

    // Tạo mới tour
    @Transactional(rollbackFor = Exception.class)
    public TourResponse createTour(TourRequest request, MultipartFile file, Authentication authentication) {
        Tour tour = tourMapper.toEntity(request);
        User manager = userService.getUser(request.getManagerId());
        tour.setManager(manager);
        tour.setAvailableTicket(request.getMaxCapacity());
        tour.setCurrentBooked(0);

        User currentUser = userService.getUser(authentication.getName());
        boolean isAdmin = currentUser.getRoles().stream().anyMatch(r -> r.getName().equals("ADMIN"));
        if (isAdmin) {
            tour.setStatus(request.getStatus() != null ? request.getStatus() : Tour.Status.APPROVED);
        } else {
            tour.setStatus(Tour.Status.PENDING);
        }

        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.contains(".")) {
            fileName = fileName.substring(0, fileName.lastIndexOf("."));
        }
        String bannerUrl = cloudinaryService.uploadFile(file, "tour-banner", fileName);
        tour.setTourBanner(bannerUrl);
        tour = tourRepository.save(tour);
        return tourMapper.toResponse(tour);
    }

    public Tour getTour(Long tourId) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new AppException(ErrorCode.TOUR_NOT_EXISTED));

        // Nếu tour đã hết hạn, cập nhật trạng thái sang INACTIVE
        if (tour.getEndDate() != null && tour.getEndDate().isBefore(LocalDate.now())) {
            if (tour.getStatus() == Tour.Status.APPROVED) {
                tour.setStatus(Tour.Status.INACTIVE); // Chuyển sang INACTIVE khi tour hết hạn
                tourRepository.save(tour);
            }
        }
        return tour;
    }

    @Transactional(readOnly = true)
    public TourResponse getTourById(Long tourId) {
        Tour tour = getTour(tourId);
        return tourMapper.toResponse(tour);
    }

    @Transactional(rollbackFor = Exception.class)
    public TourResponse updateTour(Long tourId, TourRequest tourRequest, MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Tour existingTour = getTour(tourId);
        Long managerId = existingTour.getManager().getId();
        assertCanModifyBooking(authentication, managerId);
        if(tourRequest != null) {
            existingTour = updateTourData(existingTour, tourRequest);
        }
        if (file != null && !file.isEmpty()) {
            existingTour = updateTourBanner(file, existingTour);
        }
        return tourMapper.toResponse(tourRepository.save(existingTour));
    }

    public Tour updateTourData(Tour existingTour, TourRequest tourRequest) {

        existingTour = tourMapper.updateTour(tourRequest, existingTour);

        if (!existingTour.getManager().getId().equals(tourRequest.getManagerId())) {
            User manager = userService.getUser(tourRequest.getManagerId());
            existingTour.setManager(manager);
        }
        return existingTour;
    }

    private Tour updateTourBanner(MultipartFile file, Tour existingTour) {
        String oldBannerUrl = existingTour.getTourBanner();
        String fileName = file.getOriginalFilename();
        if (fileName != null && fileName.contains(".")) {
            fileName = fileName.substring(0, fileName.lastIndexOf("."));

        }
        String bannerUrl = cloudinaryService.uploadFile(file, "tour-banner", fileName);
        existingTour.setTourBanner(bannerUrl);
        cloudinaryService.deleteFile(oldBannerUrl);

        return existingTour;
    }

    @Transactional(rollbackFor = Exception.class)
    public TourResponse updateTourStatus(Long id, Tour.Status status, Authentication authentication) {
        // Kiểm tra quyền của Admin (chỉ Admin mới có quyền reject tour)
        User currentUser = userService.getUser(authentication.getName());
        boolean isAdmin = currentUser.getRoles().stream().anyMatch(r -> r.getName().equals("ADMIN"));

        // Chỉ admin mới có quyền reject tour
        if (status == Tour.Status.REJECTED && !isAdmin) {
            throw new RuntimeException("Only admin can reject tour");
        }

        Tour tour = tourRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tour not found"));

        // Cập nhật trạng thái tour
        tour.setStatus(status);
        tour = tourRepository.save(tour);

        // Nếu duyệt tour (PENDING -> APPROVED), tạo notification cho manager
        if (status == Tour.Status.APPROVED) {
            notificationService.notifyManagerTourApproved(tour);
        }

        return tourMapper.toResponse(tour);
    }

    @Transactional(readOnly = true)
    public Page<TourResponse> searchTour(TourFilterRequest filterRequest, Authentication authentication) {
    User currentUser = null;
    boolean isAdmin = false;
    boolean isManager = false;
    
    if (authentication != null) {
        currentUser = userService.getUser(authentication.getName());
        isAdmin = currentUser.getRoles().stream().anyMatch(r -> r.getName().equals("ADMIN"));
        isManager = currentUser.getRoles().stream().anyMatch(r -> r.getName().equals("TOUR_MANAGER"));
    }

    // Set statuses dựa vào role
    if (!isAdmin && !isManager) {
        // User thường chỉ thấy tour APPROVED
        filterRequest.setStatuses(List.of(Tour.Status.APPROVED));
        filterRequest.setEndDateFrom(LocalDate.now().minusMonths(2));
    } else if (isManager) {
        // Tour manager thấy tour của mình với các status PENDING, APPROVED, REJECTED
        filterRequest.setStatuses(List.of(Tour.Status.PENDING, Tour.Status.APPROVED, Tour.Status.REJECTED));
        // Thêm filter theo managerId
        filterRequest.setManagerId(currentUser.getId());
    }
    // Admin có thể thấy tất cả status
    Pageable pageable = PageRequest.of(filterRequest.getPageNumber() - 1, filterRequest.getPageSize());
    Page<Tour> tours = tourRepository.searchTour(
            filterRequest.getTourName(),
            filterRequest.getLocation(), 
            filterRequest.getDestination(),
            filterRequest.getStartDateFrom(), 
            filterRequest.getStartDateTo(),
            filterRequest.getMinPrice(), 
            filterRequest.getMaxPrice(),
            filterRequest.getStatuses(),
            filterRequest.getManagerId(),
            filterRequest.getCompany(),
            pageable);

    return tours.map(tourMapper::toResponse);
}

    // Xóa tour
    public void deleteTour(Long tourId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();;
        Tour existingTour = getTour(tourId);
        Long managerId = existingTour.getManager().getId();
        assertCanModifyBooking(authentication, managerId);
        tourRepository.delete(existingTour);
    }

    public void holdTicketForTour(Tour tour, Integer numberOfTicket) {
        if (tour.getStatus() != Tour.Status.APPROVED) {
            throw new BadRequestException("Tour chưa được duyệt hoặc không còn hoạt động");
        }
        if (tour.getEndDate() != null && tour.getEndDate().isBefore(LocalDate.now())) {
            throw new BadRequestException("Tour đã kết thúc, không thể đặt");
        }
        int availableTicket = tour.getAvailableTicket();
        if (availableTicket >= numberOfTicket) {
            tour.setAvailableTicket(availableTicket - numberOfTicket);
        } else {
            throw new BadRequestException("No available slots");
        }
        tourRepository.save(tour);
    }

    private boolean isRoleAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_" + PredefinedRole.ADMIN_ROLE));
    }

    private void assertCanModifyBooking(Authentication authentication, Long managerId) {
        if(!isRoleAdmin(authentication)) {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            User manager = userService.getUser(username);
            if (!manager.getId().equals(managerId)) {
                throw new ForbiddenException("You don't have permission");
            }
        }
    }
}
