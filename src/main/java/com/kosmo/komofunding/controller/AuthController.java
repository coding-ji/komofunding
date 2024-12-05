package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<UserOutDTO> register(@Valid @RequestBody User user) {
        UserOutDTO registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    // 이메일 인증 코드 발송
    @PostMapping("/emailcheck")
    public ResponseEntity<Void> sendVerificationCode(@RequestParam String email) {
        boolean isEmailSent = userService.sendVerificationCode(email);
        if (!isEmailSent) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok().build();
    }

    // 이메일 인증
    @PostMapping("/emailverification")
    public ResponseEntity<Void> emailVerification(@RequestParam String email, @RequestParam String code) {
        boolean isVerified = userService.verifyEmailCode(email, code);
        if (!isVerified) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<UserOutDTO> login(@RequestParam String email, @RequestParam String password) {
        UserOutDTO user = userService.login(email, password);
        if (user == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        return ResponseEntity.ok(user);
    }

    // 사용자 정보 조회
    @GetMapping("/user")
    public ResponseEntity<User> getUserInfo(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).build(); // User not found
        }
        return ResponseEntity.ok(user);
    }

    // 회원 탈퇴
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Void> deleteUser(@PathVariable String email) {
        boolean isDeleted = userService.deleteUser(email);
        if (!isDeleted) {
            return ResponseEntity.status(404).build(); // User not found
        }
        return ResponseEntity.noContent().build();
    }

    // 아이디 찾기 (이메일 찾기)
    @PostMapping("/id")
    public ResponseEntity<String> findUserId(@RequestParam String name, @RequestParam String phoneNumber) {
        String email = userService.findEmailByNameAndPhoneNumber(name, phoneNumber);
        if (email == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(email);
    }

    // 비밀번호 재설정
    @PostMapping("/pw")
    public ResponseEntity<Void> resetPassword(@RequestParam String email) {
        boolean isReset = userService.resetPassword(email);
        if (!isReset) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().build();
    }

    // 비밀번호 변경
    @PatchMapping("/setting/pw")
    public ResponseEntity<Void> changePassword(@RequestParam String email, @RequestParam String newPassword) {
        boolean isChanged = userService.updatePassword(email, newPassword);
        if (!isChanged) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().build();
    }

    // 로그인 정지 상태 확인
    @GetMapping("/login/status/{email}")
    public ResponseEntity<String> checkSuspension(@PathVariable String email) {
        String suspensionReason = userService.getSuspensionReason(email);
        if (suspensionReason != null) {
            return ResponseEntity.status(403).body(suspensionReason); // Forbidden
        }
        return ResponseEntity.ok("Normal login");
    }
}
