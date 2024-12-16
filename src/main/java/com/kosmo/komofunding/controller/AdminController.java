package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.AdminRepository;
import com.kosmo.komofunding.service.AdminService;
import com.kosmo.komofunding.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin") // 기본 경로 설정
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserService userService; // UserService 주입

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
    public ResponseEntity<List<UserOutDTO>> getAllUsers(HttpSession session) {
        // 어드민 권한 체크
        String role = (String) session.getAttribute("role");
        if (role == null || !role.equals("admin")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
        }

        // 전체 회원 데이터 조회
        List<User> users = userService.getAllUsers();
        List<UserOutDTO> userDtos = users.stream()
                .map(UserOutDTO::new) // 엔티티 -> DTO 변환
                .toList();

        return ResponseEntity.ok(userDtos);

    }
}
