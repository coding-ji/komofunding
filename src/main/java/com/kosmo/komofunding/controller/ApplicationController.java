package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    // 모든 신청서 조회
    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        try {
            List<Application> applications = applicationService.getAllApplications();
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }

    /**
     * 특정 사용자 ID로 신청서를 가져오는 메서드
     * @param userNum 사용자의 ID
     * @return 해당 사용자의 신청서 목록
     */
    @GetMapping("/user/{userNum}") // 특정 사용자 ID로 신청서를 찾음
    public ResponseEntity<List<Application>> getApplicationsByUserId(@PathVariable("userNum") String userNum) {
        try {
            List<Application> applications = applicationService.getApplicationsByUserNum(userNum); // 사용자 ID로 신청서를 가져옴
            return ResponseEntity.ok(applications); // 신청서를 돌려줌
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.emptyList()); // 문제가 생기면 빈 목록을 돌려줌
        }
    }

    // 특정 기간 동안의 신청서 조회
    @GetMapping("/date")
    public ResponseEntity<List<Application>> getApplicationsByDateRange(@RequestParam LocalDateTime startDate,
                                                                        @RequestParam LocalDateTime endDate) {
        try {
            List<Application> applications = applicationService.getApplicationsByDateRange(startDate, endDate);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }

    // 새로운 신청서 생성
//    @PostMapping("/create")
//    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
//        try {
//            Application savedApplication = applicationService.saveApplication(application);
//            return ResponseEntity.status(201).body(savedApplication);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body(null);
//        }
//    }

    // 특정 신청서 조회
    @GetMapping("/{applicationId}")
    public ResponseEntity<Application> getApplicationById(@PathVariable("applicationId") String applicationId) {
        try {
            Optional<Application> application = applicationService.findById(applicationId);
            return application.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // 신청서 삭제
    @DeleteMapping("/{applicationId}")
    public ResponseEntity<Void> deleteApplication(@PathVariable("applicationId") String applicationId) {
        try {
            applicationService.deleteApplication(applicationId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}