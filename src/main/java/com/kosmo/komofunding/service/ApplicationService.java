package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.repository.ApplicationRepository;

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

    private final ApplicationRepository applicationRepository;

    private static final String UPLOAD_DIR = "uploads/";

    // 저장된 신청서 반환
    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    // 파일 저장 후 경로 반환
    public String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어 있습니다.");
        }

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        File destination = new File(UPLOAD_DIR + fileName);

        if (!destination.getParentFile().exists()) {
            destination.getParentFile().mkdirs();
        }

        file.transferTo(destination);
        return destination.getAbsolutePath();
    }

    // 신청서와 파일 저장
    public Application saveApplicationWithFile(Application application, MultipartFile file) {
        try {
            String filePath = saveFile(file);
            application.setApplicationImg(filePath);
            return applicationRepository.save(application);
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 실패: " + e.getMessage(), e);
        }
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

