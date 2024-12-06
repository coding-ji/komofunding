package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.Valid;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        User registeredUser = userService.registerUser(user); // UserEntity 그대로 반환
        return ResponseEntity.ok(registeredUser); // User Entity 반환
    }

    // 이메일 인증 코드 발송
    @PostMapping("/emailcheck")
    public ResponseEntity<Void> sendVerificationCode(@RequestBody String email) {
        boolean isEmailSent = userService.sendVerificationCode(email);
        if (!isEmailSent) {
            return ResponseEntity.status(500).build();
        }
        return ResponseEntity.ok().build();
    }

    // 이메일 인증
    @PostMapping("/emailverification")
    public ResponseEntity<Void> emailVerification(@RequestBody String email, String code) {
        boolean isVerified = userService.verifyEmailCode(email, code);
        if (!isVerified) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody String email, String password) {
        User user = userService.login(email, password); // DTO 대신 Entity 반환
        if (user == null) {
            return ResponseEntity.status(401).build(); // Unauthorized
        }
        return ResponseEntity.ok(user); // User Entity 반환
    }

    // 사용자 정보 조회
    @GetMapping("/user")
    public ResponseEntity<User> getUserInfo(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            return ResponseEntity.status(404).build(); // User not found
        }
        return ResponseEntity.ok(user); // User Entity 반환
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
    public ResponseEntity<String> findUserId(@RequestBody String name, String phoneNumber) {
        String email = userService.findEmailByNameAndPhoneNumber(name, phoneNumber);
        if (email == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(email);
    }

    // 비밀번호 재설정
    @PostMapping("/pw")
    public ResponseEntity<Void> resetPassword(@RequestBody String email) {
        boolean isReset = userService.resetPassword(email);
        if (!isReset) {
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().build();
    }

    // 비밀번호 변경
    @PatchMapping("/setting/pw")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody String email, @RequestParam String newPassword) {
        boolean isChanged = userService.updatePassword(email, newPassword);

        if (!isChanged) {
            // 비밀번호 변경 실패 시, 400 상태 코드와 함께 실패 메시지를 반환
            Map<String, String> response = new HashMap<>();
            response.put("message", "비밀번호 변경에 실패했습니다.");
            return ResponseEntity.status(400).body(response); // 400 Bad Request
        }

        // 비밀번호 변경 성공 시, 성공 메시지를 포함하여 200 상태 코드를 반환
        Map<String, String> response = new HashMap<>();
        response.put("message", "비밀번호가 성공적으로 변경되었습니다.");
        return ResponseEntity.ok(response); // 200 OK
    }

    // 비밀번호 인증
    @PostMapping("/pw/{email}")
    public ResponseEntity<String> verifyPassword(@PathVariable String email, @RequestBody String password) {
        try {
            userService.verifyPassword(email, password);
            return ResponseEntity.ok("비밀번호 인증 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body("비밀번호가 일치하지 않습니다."); // Unauthorized
        }
    }

    // 로그인 정지 상태 확인
    @GetMapping("/login/status/{email}")
    public ResponseEntity<String> checkSuspension(@PathVariable String email) {
        String suspensionReason = userService.getSuspensionReason(email);
        if (suspensionReason != null) {
            return ResponseEntity.status(403).body(suspensionReason); // Forbidden
        }
        return ResponseEntity.ok("정상 로그인 가능합니다.");
    }

}
