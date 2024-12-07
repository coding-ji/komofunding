package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.EmailRequestDTO;
import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.exception.UnauthorizedException;
import com.kosmo.komofunding.repository.UserRepository;
import com.kosmo.komofunding.service.EmailService;
import com.kosmo.komofunding.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    private final UserService userService;
    private final EmailService emailService;

    // 회원 가입
    @PostMapping("/register")
    public ResponseEntity<UserOutDTO> registerUser(@RequestBody UserInDTO userInDTO) {
        // UserService에서 회원 가입 로직 처리 후 UserOutDTO로 반환
        UserOutDTO createdUser = userService.registerUser(userInDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // 이메일 인증 코드 발송 (회원가입용)
    @PostMapping("/register/emailcheck")
    public ResponseEntity<Void> sendRegisterEmailCode(@RequestBody EmailRequestDTO emailRequest) {
        boolean isSent = emailService.sendVerificationCode(emailRequest.email());
        return isSent
                ? ResponseEntity.noContent().build() // 204 No Content
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400 Bad Request
    }

    // 이메일 인증 코드 발송
    @PostMapping("/emailcheck")
    public ResponseEntity<Void> sendVerificationCode(@RequestBody EmailRequestDTO emailRequest) {
        boolean isSent = emailService.sendVerificationCode(emailRequest.email());
        return isSent
                ? ResponseEntity.noContent().build() // 204 No Content
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400 Bad Request
    }

    // 이메일 인증 코드 검증
    @PostMapping("/emailverification")
    public ResponseEntity<Void> emailVerification(@RequestBody EmailRequestDTO emailRequest) {
        boolean isValid = emailService.verifyCode(emailRequest.email(), emailRequest.verificationCode());
        return isValid
                ? ResponseEntity.noContent().build() // 204 No Content
                : ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build(); // 422 Unprocessable Entity
    }

//     로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody UserInDTO loginRequest,
            HttpSession session) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Map<String, String> response = userService.login(email, password, session);
        return ResponseEntity.ok(response); // 세션 ID 포함 응답 반환
    }

    // 로그아웃 처리
    @PostMapping("/api/user/logout")
    public ResponseEntity<String> logout(@RequestBody UserInDTO userInDTO, HttpSession session) {
        // 로그아웃 처리: 세션을 종료해서 jsessionid만 삭제
        session.invalidate();  // 세션 무효화 (jsessionid 제거)

        // 응답 반환
        return ResponseEntity.ok("로그아웃이 완료되었습니다.");
    }

    // 사용자 정보 조회
    @GetMapping("/users")
    public ResponseEntity<User> getUserInfo(@RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isEmpty()) {
            return ResponseEntity.status(404).build();  // 사용자 없음
        }
        return ResponseEntity.ok(user.get());  // User 반환
    }

    // 회원 탈퇴
    @DeleteMapping("/delete/{usernum}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userNum) {
        return userService.deleteUser(String.valueOf(userNum))
                ? ResponseEntity.noContent().build() // 204 No Content
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found
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
        return userService.resetPassword(email)
                ? ResponseEntity.noContent().build() // 204 No Content
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400 Bad Request
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
    @PostMapping("/pw/{usernum}")
    public ResponseEntity<String> verifyPassword(@PathVariable Long userNum, @RequestBody String password, HttpSession session) {
        try {
            userService.verifyPassword(session, password);
            return ResponseEntity.ok("비밀번호 인증 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body("비밀번호가 일치하지 않습니다."); // Unauthorized
        }
    }

    // 로그인 정지 상태 확인
    @GetMapping("/login/status/{usernum}")
    public ResponseEntity<String> checkSuspension(@PathVariable Long userNum) {
        String suspensionReason = userService.getSuspensionReason(String.valueOf(userNum));
        if (suspensionReason != null) {
            return ResponseEntity.status(403).body(suspensionReason); // Forbidden
        }
        return ResponseEntity.ok("정상 로그인 가능합니다.");
    }

}
