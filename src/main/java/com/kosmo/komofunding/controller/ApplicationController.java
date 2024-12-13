package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.ApplicationInDTO;
import com.kosmo.komofunding.dto.ApplicationOutDTO;
import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.repository.ApplicationRepository;
import com.kosmo.komofunding.service.ApplicationService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private final ApplicationService applicationService;

    @PostMapping("/create")
    // 제작자 전환 신청 처리
    public ResponseEntity<String> createApplication(@Validated @RequestBody ApplicationInDTO applicationInDTO,
                                                    HttpSession session) {
        try {
            // ApplicationService를 호출하여 신청서 저장
            Application savedApplication = applicationService.saveApplication(applicationInDTO, session);

            // 성공 응답 반환
            return ResponseEntity.ok("신청서가 성공적으로 생성되었습니다. 신청서 ID: " + savedApplication.getApplicationId());
        } catch (IllegalStateException e) {
            // 사용자 인증 정보가 없을 경우의 예외 처리
            return ResponseEntity.status(401).body("사용자 인증 정보가 없습니다.");
        } catch (RuntimeException e) {
            // 기타 예외 처리
            return ResponseEntity.status(400).body("신청서 생성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}