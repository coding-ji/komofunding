package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.converter.ProjectConverter;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.AdminRepository;
import com.kosmo.komofunding.service.AdminService;
import com.kosmo.komofunding.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin") // 기본 경로 설정
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserService userService; // UserService 주입

    @Autowired
    private ProjectConverter projectConverter;

    // 어드민 생성
    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        Admin savedAdmin = adminService.saveAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    // 모든 어드민 조회
    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.findAllAdmins();
        return ResponseEntity.ok(admins);
    }

    // 특정 어드민 조회
    @GetMapping("/{adminId}")
    public ResponseEntity<Admin> findByAdminId(@PathVariable("adminId") String adminId) {
        Optional<Admin> admin = adminRepository.findById(adminId);
        return admin.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 전체 회원 조회 (어드민 전용)
    @GetMapping("/users")
    public ResponseEntity<List<UserOutDTO>> getAllUsers(@RequestParam(name = "userNum", required = false) Long userNum, HttpSession session) {
        // 어드민 권한 체크
        String role = (String) session.getAttribute("role");
        if (role == null || !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
        }

        List<User> users;
        if (userNum != null) {
            // userNum이 주어졌다면 특정 유저 조회
            Optional<User> user = userService.getUserByUserNum(userNum);
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 유저가 없을 경우
            }
            users = List.of(user.get()); // 하나의 유저만 반환
        } else {
            // userNum이 없으면 전체 회원 조회
            users = userService.getAllUsers();
        }

        // 엔티티 -> DTO 변환
        List<UserOutDTO> userDtos = users.stream()
                .map(UserOutDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userDtos);
    }

    // 회원 정지 또는 탈퇴 처리 (관리자가 상태를 선택할 수 있게 변경)
    @PutMapping("/users/{userNum}/deactivate")
    public ResponseEntity<UserOutDTO> deactivateUser(
            @PathVariable("userNum") Long userNum,
            @RequestBody UserOutDTO userOutDTO,
            HttpSession session) {

        // 어드민 권한 체크
        String role = (String) session.getAttribute("role");
        if (role == null || !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
        }

        try {
            // 회원 정지 또는 탈퇴 처리
            UserOutDTO updatedUser = adminService.deactivateUser(
                    userNum,
                    userOutDTO.getDeactivationReason(),
                    userOutDTO.getActivatedStatus()
            );
            return ResponseEntity.ok(updatedUser); // 상태 변경 후 유저 정보 반환
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 존재하지 않는 유저
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 기타 오류
        }
    }

    // 전체 프로젝트 조회
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectOutDTO>> getAllProjects(
            @RequestParam(name = "projectNum", required = false) Long projectNum,
            HttpSession session) {
        // 어드민 권한 확인
        String role = (String) session.getAttribute("role");
        if (role == null || !role.equals("admin")) {
            return ResponseEntity.status(403).build();  // 권한 없으면 403 응답
        }

        try {
            // 특정 프로젝트 조회
            ProjectOutDTO projectOutDTO = adminService.getProjectByProjectNum(projectNum);
            return ResponseEntity.ok(Collections.singletonList(projectOutDTO));  // DTO 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 프로젝트 승인 처리
    @PutMapping("/projects/{projectNum}/approve")
    public ResponseEntity<String> approveProject(@RequestParam(name = "projectNum") Long projectNum, HttpSession session) {
        // 어드민 권한 확인
        String role = (String) session.getAttribute("role");
        if (role == null || !role.equals("admin")) {
            return ResponseEntity.status(403).build();  // 권한 없으면 403 응답
        }

        try {
            // 승인 처리
            adminService.approveProject(projectNum);
            return ResponseEntity.ok("프로젝트가 승인되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("프로젝트를 찾을 수 없습니다.");
        }
    }

    // 프로젝트 거부 처리
    @PutMapping("/projects/{projectNum}/reject")
    public ResponseEntity<String> rejectProject(@RequestParam(name = "projectNum") Long projectNum, HttpSession session) {
        // 어드민 권한 확인
        String role = (String) session.getAttribute("role");
        if (role == null || !role.equals("admin")) {
            return ResponseEntity.status(403).build();  // 권한 없으면 403 응답
        }

        try {
            // 거부 처리
            adminService.rejectProject(projectNum);
            return ResponseEntity.ok("프로젝트가 거부되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("프로젝트를 찾을 수 없습니다.");
        }
    }

    // 프로젝트 숨김/공개 처리
    @PutMapping("/projects/{projectNum}/toggleVisibility")
    public ResponseEntity<String> toggleVisibility(@RequestParam(name = "projectNum") Long projectNum, HttpSession session) {
        // 어드민 권한 확인
        String role = (String) session.getAttribute("role");
        if (role == null || !role.equals("admin")) {
            return ResponseEntity.status(403).build();  // 권한 없으면 403 응답
        }

        try {
            // 숨김/공개 처리
            adminService.toggleProjectVisibility(projectNum);
            return ResponseEntity.ok("프로젝트의 공개 여부가 변경되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("프로젝트를 찾을 수 없습니다.");
        }
    }
}
