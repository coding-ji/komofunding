package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;


@Controller
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserOutDTO> registerUser(@RequestBody UserInDTO userInDTO) {
        UserOutDTO createdUser = userService.registerUser(userInDTO);

        System.out.println("가입이 완료되었습니다: " + createdUser.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // 이메일 인증
    @PostMapping("/emailcheck")
    public ResponseEntity<UserOutDTO> emailCheck(@RequestBody UserInDTO userInDTO) {
        // UserService의 sendVerificationCode 메서드를 호출하여 결과 반환
        UserOutDTO response = userService.sendVerificationCode(userInDTO);
        return ResponseEntity.ok(response);
    }

    // 이메일 인증 요청?
    @PostMapping("/emailverification")
    public ResponseEntity<UserOutDTO> emailverification(@RequestBody UserInDTO userInDTO) {
        // 이메일 인증 로직 호출
        UserOutDTO response = userService.sendVerificationCode(userInDTO);
        if (response.getShortDescription().contains("이메일 전송 실패")) {
            return ResponseEntity.badRequest().body(response); // 실패 시 400 Bad Request 반환
        }
        return ResponseEntity.ok(response);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(
            @RequestBody Map<String, String> credentials,
            HttpSession session
    ) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // 이메일로 사용자 찾기
        Optional<User> userOptional = userService.findUserByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("사용자를 찾을 수 없습니다.");
        }

        User user = userOptional.get();

        // 비밀번호 확인
        if (!userService.isPasswordCorrect(password, user)) {
            return ResponseEntity.status(401).body("비밀번호가 잘못되었습니다.");
        }

        // 세션 설정
        session.setMaxInactiveInterval(1800); // 30분
        session.setAttribute("userEmail", email);
        return ResponseEntity.ok("로그인에 성공하였습니다.");
    }

    @GetMapping("/user")
    public ResponseEntity<UserOutDTO> getUserByEmail(HttpSession session) {
        // 세션에서 사용자 이메일 가져오기
        String email = (String) session.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);  // 세션에 이메일이 없으면 401 반환
        }

        try {
            // 이메일에 해당하는 사용자 정보 가져오기
            UserOutDTO userOutDTO = userService.getUserOutDTOByEmail(email);
            return ResponseEntity.ok(userOutDTO);  // 사용자 정보 반환
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 사용자가 없으면 404 반환
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        // 세션 무효화
        session.invalidate();
        return ResponseEntity.ok("로그아웃 되었습니다.");
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable("email") String email) {
        boolean isDeleted = userService.deleteUser(email);
        if (isDeleted) {
            return ResponseEntity.ok("회원탈퇴가 완료되었습니다.");
        } else {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }
    }

    @PostMapping("/id")
    public ResponseEntity<String> findEmail(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String phoneNumber = request.get("phoneNumber");

        // 이메일 찾기
        String email = userService.findEmailByNameAndPhoneNumber(name, phoneNumber);

        if (email != null) {
            // 이메일을 부분적으로 마스킹 처리
            String maskedEmail = maskEmail(email);
            return ResponseEntity.ok("이메일은 " + maskedEmail + " 입니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }

    private String maskEmail(String email) {
        int atIndex = email.indexOf("@");
        String localPart = email.substring(0, atIndex);
        String domainPart = email.substring(atIndex);

        // 이메일 로컬 부분의 첫 2글자를 보이게 하고 나머지는 *로 마스킹
        String maskedLocalPart = localPart.charAt(0) + "" + localPart.charAt(1) + "**";

        return maskedLocalPart + domainPart;
    }

    @PostMapping("/pw")
    public ResponseEntity<?> handlePasswordReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String verificationCode = request.get("verificationCode");

        if (verificationCode == null || verificationCode.isEmpty()) {
            // 인증 코드 보내기
            userService.sendVerificationCode(email);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "인증 코드가 이메일로 전송되었습니다."));
        } else {
            // 비밀번호 재설정
            try {
                String message = userService.resetPassword(email, verificationCode);
                return ResponseEntity.ok().body(Collections.singletonMap("message", message));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(Collections.singletonMap("message", e.getMessage()));
            }
        }
    }

    @PatchMapping("/setting/pw")
    public ResponseEntity<Map<String, String>> updatePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String currentPassword = request.get("password");
        String newPassword = request.get("newpw");

        try {
            userService.updatePassword(email, currentPassword, newPassword);
            return ResponseEntity.ok(Collections.singletonMap("message", "비밀번호가 성공적으로 변경되었습니다."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PostMapping("/pw/{userid}")
    public ResponseEntity<Map<String, String>> verifyPassword(
            @PathVariable("userid") String userId,
            @RequestBody Map<String, String> request) {
        String password = request.get("password");

        try {
            // 비밀번호 확인 서비스 호출
            userService.verifyPassword(userId, password);
            return ResponseEntity.ok(Collections.singletonMap("message", "비밀번호가 확인되었습니다."));
        } catch (IllegalArgumentException e) {
            // 비밀번호가 틀렸을 경우 예외 처리
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @GetMapping("/login/{email}")
    public ResponseEntity<Map<String, String>> login(
            @PathVariable("email") String email,
            @RequestParam("suspended") boolean suspended,
            @RequestBody Map<String, String> requestBody) {

        // 요청 본문에서 email과 password를 가져옴
        String requestEmail = requestBody.get("email");
        String password = requestBody.get("password");

        // 요청 본문의 email과 PathVariable의 email이 일치하는지 확인
        if (!email.equals(requestEmail)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "이메일이 URL과 본문에서 일치하지 않습니다."));
        }

        // 쿼리 파라미터로 전달된 suspended 값이 true일 때만 처리
        if (suspended) {
            try {
                // 로그인 및 정지 이유 확인
                String suspensionReason = userService.getSuspensionReason(email, password);
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Collections.singletonMap("message", suspensionReason));
            } catch (IllegalArgumentException e) {
                // 비밀번호가 틀렸거나 다른 오류가 발생한 경우
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Collections.singletonMap("message", e.getMessage()));
            }
        }

        // suspended가 false일 경우 정상적인 로그인 처리
        return ResponseEntity.status(HttpStatus.OK)
                .body(Collections.singletonMap("message", "로그인 성공"));
    }

}
