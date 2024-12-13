package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.entity.Application; // 신청서 데이터를 나타내는 클래스
import com.kosmo.komofunding.service.ApplicationService; // 신청서를 처리하는 도우미 클래스
import lombok.RequiredArgsConstructor; // 필요한 도구들을 자동으로 준비해 주는 마법 도구
import org.springframework.http.ResponseEntity; // 요청에 대한 답장을 만드는 클래스
import org.springframework.stereotype.Controller; // 이 클래스가 요청을 처리할 수 있다는 표시
import org.springframework.web.bind.annotation.*; // 요청 처리와 관련된 여러 마법 도구들

import java.time.LocalDateTime; // 날짜와 시간을 관리하는 도구
import java.util.Collections; // 빈 목록을 만들 때 사용하는 도구
import java.util.List; // 여러 개의 데이터를 담는 리스트
import java.util.Optional; // 있을 수도, 없을 수도 있는 데이터를 관리하는 도구

@Controller // 이 클래스가 웹 요청을 처리하는 곳임을 나타냄
@RequiredArgsConstructor // 필요한 도구들을 자동으로 준비함
@RequestMapping("/api/applications") // 이 클래스의 기본 주소는 '/api/applications'임
public class ApplicationController {

    private final ApplicationService applicationService; // 신청서를 처리하는 도우미

    /**
     * 모든 신청서를 가져오는 메서드
     * @return 모든 신청서를 목록으로 돌려줌
     */
    @GetMapping // GET 요청을 처리함
    public ResponseEntity<List<Application>> getAllApplications() { // 여러 신청서를 리스트로 답장
        try {
            List<Application> applications = applicationService.getAllApplications(); // 신청서를 모두 가져옴
            return ResponseEntity.ok(applications); // 가져온 신청서를 돌려줌
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.emptyList()); // 문제가 생기면 빈 목록을 돌려줌
        }
    }

    /**
     * 특정 사용자 ID로 신청서를 가져오는 메서드
     * @param userId 사용자의 ID
     * @return 해당 사용자의 신청서 목록
     */
    @GetMapping("/user/{userId}") // 특정 사용자 ID로 신청서를 찾음
    public ResponseEntity<List<Application>> getApplicationsByUserId(@PathVariable("userId") String userId) {
        try {
            List<Application> applications = applicationService.getApplicationsByUserId(userId); // 사용자 ID로 신청서를 가져옴
            return ResponseEntity.ok(applications); // 신청서를 돌려줌
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.emptyList()); // 문제가 생기면 빈 목록을 돌려줌
        }
    }

    /**
     * 특정 기간 동안의 신청서를 가져오는 메서드
     * @param startDate 시작 날짜
     * @param endDate 끝나는 날짜
     * @return 해당 기간 동안의 신청서 목록
     */
    @GetMapping("/date") // 특정 기간 동안의 신청서를 찾음
    public ResponseEntity<List<Application>> getApplicationsByDateRange(@RequestParam LocalDateTime startDate,
                                                                        @RequestParam LocalDateTime endDate) {
        try {
            List<Application> applications = applicationService.getApplicationsByDateRange(startDate, endDate); // 날짜 범위로 신청서를 가져옴
            return ResponseEntity.ok(applications); // 신청서를 돌려줌
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Collections.emptyList()); // 문제가 생기면 빈 목록을 돌려줌
        }
    }

    /**
     * 새로운 신청서를 만드는 메서드
     * @param application 새로 만들 신청서 정보
     * @return 만들어진 신청서를 돌려줌
     */
    @PostMapping("/create") // 새 신청서를 만드는 요청을 처리함
    public ResponseEntity<Application> createApplication(@RequestBody Application application) { // 신청서를 만들고 돌려줌
        try {
            Application savedApplication = applicationService.saveApplication(application); // 신청서를 저장함
            return ResponseEntity.status(201).body(savedApplication); // 저장된 신청서를 돌려줌
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // 문제가 생기면 아무것도 돌려주지 않음
        }
    }

    /**
     * 특정 신청서를 가져오는 메서드
     * @param applicationId 신청서의 ID
     * @return 해당 신청서
     */
    @GetMapping("/{applicationId}") // 특정 신청서를 찾는 요청
    public ResponseEntity<Application> getApplicationById(@PathVariable("applicationId") String applicationId) {
        try {
            Optional<Application> application = applicationService.findById(applicationId); // 신청서를 ID로 찾음
            return application.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build()); // 찾은 신청서를 돌려줌
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // 문제가 생기면 아무것도 돌려주지 않음
        }
    }

    /**
     * 신청서를 삭제하는 메서드
     * @param applicationId 삭제할 신청서의 ID
     * @return 상태 코드 204(No Content)를 돌려줌
     */
    @DeleteMapping("/{applicationId}") // 신청서를 삭제하는 요청
    public ResponseEntity<Void> deleteApplication(@PathVariable("applicationId") String applicationId) {
        try {
            applicationService.deleteApplication(applicationId); // 신청서를 삭제함
            return ResponseEntity.noContent().build(); // 성공하면 아무것도 돌려주지 않음
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // 문제가 생기면 상태 코드 500을 돌려줌
        }
    }
}
