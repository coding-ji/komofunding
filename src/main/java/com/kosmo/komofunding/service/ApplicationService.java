package com.kosmo.komofunding.service;

import com.kosmo.komofunding.dto.ApplicationInDTO;
import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.ApplicationRepository;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ApplicationService {
    private ApplicationRepository applicationRepository;
    private UserRepository userRepository;


    // 신청서 전환
    public Application saveApplication(ApplicationInDTO applicationInDTO, HttpSession session) {
        // 현재 날짜 가져오기
        LocalDateTime now = LocalDateTime.now();

        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalStateException("사용자 인증 정보가 없습니다.");
        }

        // userId로 User 객체 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // Application 엔티티 생성
        Application application = Application.builder()
                .applicationId(null) // 자동 생성
                .applicationNum(generateApplicationNum()) // 서비스에서 6자리 숫자 생성
                .userId(user.getUserId()) // 세션에서 가져온 사용자 ID
                .applicationImg(applicationInDTO.getApplicationImage()) // 이미지 경로
                .applicationDate(now) // 신청 날짜
                .approvalDate(null) // 기본값: null
                .rejectedDate(null) // 기본값: null
                .isDeleted(false) // 기본값: false
                .status(Application.ApplicationStatus.PENDING) // 기본값: PENDING
                .build();

        // 저장
        return applicationRepository.save(application);
    }

    private Long generateApplicationNum() {
        // 6자리 숫자 생성 (랜덤 예시)
        return (long) (Math.random() * 900000) + 100000;
    }
    // 신청서 삭제
    public void deleteApplication(String applicationId) {
        Optional<Application> application = applicationRepository.findById(applicationId);
        if (application.isPresent()) {
            Application app = application.get();
            app.setDeleted(true);
            applicationRepository.save(app);
        } else {
            throw new RuntimeException("Application not found with ID: " + applicationId);
        }
    }

    // ID로 신청서 검색
    public Optional<Application> findById(String applicationId) {
        return applicationRepository.findById(applicationId);
    }

    // 모든 신청서 반환
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // 사용자 ID로 신청서 조회
    public List<Application> getApplicationsByUserId(String userId) {
        return applicationRepository.findByUserId(userId);
    }

    // 날짜 범위로 신청서 조회
    public List<Application> getApplicationsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return applicationRepository.findByApplicationDateBetween(startDate, endDate);
    }

    // 상태로 신청서 조회
    public List<Application> getApplicationsByStatus(Application.ApplicationStatus status) {
        return applicationRepository.findByStatus(status);
    }

    // 삭제되지 않은 신청서 조회
    public List<Application> getVisibleApplications() {
        return applicationRepository.findByIsDeletedFalse();
    }

    // 신청서 승인 처리
    public Application approveApplication(String applicationId) {
        Optional<Application> application = applicationRepository.findById(applicationId);
        if (application.isPresent()) {
            Application app = application.get();
            app.setStatus(Application.ApplicationStatus.APPROVED);
            app.setApprovalDate(LocalDateTime.now());
            return applicationRepository.save(app);
        }
        throw new RuntimeException("Application not found with ID: " + applicationId);
    }

    // userNum을 통해 신청 조회
    public List<Application> getApplicationsByUserNum(String userNum) {
        // userNum을 사용하여 User를 찾습니다
        Optional<User> user = userRepository.findByUserNum(Long.valueOf(userNum));

        // User가 존재할 경우 해당 User의 신청 내역을 반환
        if (user.isPresent()) {
            return applicationRepository.findByUserId(user.get().getUserId()); // UserId를 사용하여 신청 내역 조회
        } else {
            // User가 없으면 빈 리스트 반환
            return List.of();
        }
    }
    // 신청서 거절 처리
    public Application rejectApplication(String applicationId) {
        Optional<Application> application = applicationRepository.findById(applicationId);
        if (application.isPresent()) {
            Application app = application.get();
            app.setStatus(Application.ApplicationStatus.REJECTED);
            app.setRejectedDate(LocalDateTime.now());
            return applicationRepository.save(app);
        }
        throw new RuntimeException("Application not found with ID: " + applicationId);
    }
}

