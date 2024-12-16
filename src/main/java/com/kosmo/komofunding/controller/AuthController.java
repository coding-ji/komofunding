package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.dto.*;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.AdminRepository;
import com.kosmo.komofunding.repository.UserRepository;
import com.kosmo.komofunding.service.EmailService;
import com.kosmo.komofunding.service.UserService;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final EmailService emailService;
    private final JavaMailSender mailSender;
    private final AdminRepository adminRepository;

    // 회원 가입
    @PostMapping("/register")
    public ResponseEntity<UserOutDTO> registerUser(@RequestBody UserInDTO userInDTO) {
        // UserService에서 회원 가입 로직 처리 후 UserOutDTO로 반환
        UserOutDTO createdUser = userService.registerUser(userInDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // 이메일 인증 코드 발송 (회원가입용)
    @PostMapping("/register/emailcheck")
    public HashMap<String, Object> sendRegisterEmailCode(@RequestBody EmailRequestDTO emailRequest) {
        HashMap<String, Object> map = new HashMap<>();
        String email = emailRequest.getEmail();  // 이메일 주소 추출

        try {
            // 이메일 유효성 검사
            if (email == null || email.isEmpty()) {
                map.put("success", Boolean.FALSE);
                map.put("message", "이메일을 입력해주세요.");
                return map;
            }

            // 이메일 인증 코드 전송 메서드 호출
            MimeMessage message = emailService.sendVerificationCode(email);

            if (message != null) {
                // 이메일 전송 성공 시
                mailSender.send(message);  // 실제 이메일 전송
                map.put("success", Boolean.TRUE);
                map.put("message", "이메일이 발송되었습니다.");
            } else {
                // 이메일 전송 실패 시
                map.put("success", Boolean.FALSE);
                map.put("message", "이메일 발송에 실패했습니다.");
            }

        } catch (Exception e) {
            // 예외 발생 시 처리
            map.put("success", Boolean.FALSE);
            map.put("message", "이메일 처리 중 오류가 발생했습니다: " + e.getMessage());
        }

        return map;
    }

    // 이메일 인증 코드 발송
//    @PostMapping("/emailcheck")
//    public ResponseEntity<Void> sendVerificationCode(@RequestBody EmailRequestDTO emailRequest) {
//        boolean isSent = emailService.sendVerificationCode(emailRequest.email());
//        return isSent
//                ? ResponseEntity.noContent().build() // 204 No Content
//                : ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400 Bad Request
//    }

    // 이메일 인증 코드 검증
    @PostMapping("/emailverification")
    public ResponseEntity<Map<String, Object>> emailVerification(@RequestBody EmailRequestDTO emailRequest) {
        String email = emailRequest.getEmail(); // 이메일 주소
        String inputCode = emailRequest.getVerificationCode(); // 입력된 인증 코드

        Map<String, Object> responseMap = new HashMap<>();

        try {
            boolean isValid = emailService.verifyCode(email, inputCode);

            if (isValid) {
                // 인증 코드가 유효한 경우
                responseMap.put("success", Boolean.TRUE);
                responseMap.put("message", "인증 코드가 맞습니다.");
                return ResponseEntity.ok(responseMap); // 200 OK 응답과 함께 성공 메시지 반환
            } else {
                // 인증 코드가 잘못된 경우
                responseMap.put("success", Boolean.FALSE);
                responseMap.put("message", "인증 코드가 틀렸습니다. 다시 확인해주세요.");
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(responseMap); // 422 응답과 함께 실패 메시지 반환
            }
        } catch (Exception e) {
            // 예외 발생 시 처리
            responseMap.put("success", Boolean.FALSE);
            responseMap.put("message", "인증 코드 검증 중 오류가 발생했습니다: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMap); // 500 응답과 함께 오류 메시지 반환
        }
    }

    // 닉네임 중복 확인
    @PostMapping("/checkNickName")
    public ResponseEntity<Map<String, Boolean>> checkNickName(
            @RequestBody Map<String,String> request) {
        String nickName = request.get("nickName"); // 요청에서 닉네임 추출
        // 서비스에서 중복 확인
        boolean isAvailable = userService.isNickNameAvailable(nickName);

        Map<String, Boolean> response = new HashMap<>();
        response.put("isAvailable", isAvailable);

        return ResponseEntity.ok(response);
    }

    //     로그인
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserInDTO loginRequest, HttpSession session) {
    String email = loginRequest.getEmail();
    String password = loginRequest.getPassword();

    try {
        Map<String, String> response = userService.login(email, password, session);
        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException e) {
        System.err.println("로그인 실패: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
    } catch (IllegalStateException e) {
        System.err.println("로그인 실패: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", e.getMessage()));
    } catch (Exception e) {
        System.err.println("로그인 실패: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "서버 오류 발생"));
    }
}



    // 로그아웃 처리
    @PostMapping("/logout")
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
//    @DeleteMapping("/delete/{userNum}")
//    public ResponseEntity<Map<String, String>> deleteUser(
//            @RequestBody UserInDTO userInDTO) {
//        try {
//            boolean isDeleted = userService.deleteUser(userInDTO.getEmail(), userInDTO.getPassword());
//            if (!isDeleted) {
//                Map<String, String> errorResponse = new HashMap<>();
//                errorResponse.put("message", "이메일 또는 비밀번호가 올바르지 않습니다.");
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//            }
//
//            // 성공 메시지 포함 응답
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "회원 탈퇴가 완료되었습니다.");
//            return ResponseEntity.ok(response); // 200 OK
//        } catch (IllegalArgumentException e) {
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("message", e.getMessage());
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
//        }
//    }
    // 회원 탈퇴
    @DeleteMapping("/delete/{userNum}")
    public ResponseEntity<Map<String, String>> deleteUser(HttpSession session) {
        try {
            String userId = (String) session.getAttribute("userId"); // 세션에서 userId 문자열로 가져오기
            if (userId == null) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "사용자가 로그인되지 않았습니다.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            // 데이터베이스에서 사용자 조회
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

            // 사용자의 상태를 비활성화로 변경 (회원 탈퇴 처리)
            user.setActivatedStatus(UserStatus.DEACTIVATED);
            userRepository.save(user);

            session.invalidate(); // 세션 종료

            Map<String, String> response = new HashMap<>();
            response.put("message", "회원 탈퇴가 완료되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "서버 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
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
    public ResponseEntity<Map<String, String>> updatePassword(@RequestBody UserProfileUpdateDTO user) {
        System.out.println("Received email: " + user.getEmail()); // 로그 추가
        String password = user.getNewPassword();

        try {
            // 서비스 호출
            userService.updatePassword(user, password);

            // 성공 응답
            Map<String, String> response = new HashMap<>();
            response.put("message", "비밀번호가 성공적으로 변경되었습니다.");
            return ResponseEntity.ok(response); // 200 OK
        } catch (NoSuchElementException e) {
            // 사용자 존재하지 않음
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(404).body(response); // 404 Not Found
        } catch (Exception e) {
            // 기타 오류
            Map<String, String> response = new HashMap<>();
            response.put("message", "비밀번호 변경에 실패했습니다.");
            return ResponseEntity.status(400).body(response); // 400 Bad Request
        }
    }
//    @PatchMapping("/setting/pw")
//    public ResponseEntity<Map<String, String>> updatePassword(@RequestBody String email, String password) {
//        Optional<User> user = userRepository.findByEmail(email);
//
//        userService.updatePassword(password);
//
//        if (!isChanged) {
//            // 비밀번호 변경 실패 시, 400 상태 코드와 함께 실패 메시지를 반환
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "비밀번호 변경에 실패했습니다.");
//            return ResponseEntity.status(400).body(response); // 400 Bad Request
//        }
//
//        // 비밀번호 변경 성공 시, 성공 메시지를 포함하여 200 상태 코드를 반환
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "비밀번호가 성공적으로 변경되었습니다.");
//        return ResponseEntity.ok(response); // 200 OK
//    }

    // 비밀번호 인증
    @PostMapping("/pw/{userNum}")
    public ResponseEntity<String> verifyPassword(
            @PathVariable(name = "userNum") Long userNum,
            @RequestBody Map<String, String> request) {
        System.out.println("Received userNum: " + userNum);
        System.out.println("Received password: " + request);
        String password = request.get("password");

        if (password == null || password.isEmpty()) {
            return ResponseEntity.status(400).body("비밀번호를 입력하세요."); // Bad Request
        }

        try {
            userService.verifyPassword(userNum, password);
            return ResponseEntity.ok("비밀번호 인증 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body("비밀번호가 일치하지 않습니다."); // Unauthorized
        }
    }

    // 로그인 정지 상태 확인
    @GetMapping("/login/status/{userNum}")
    public ResponseEntity<String> checkSuspension(@PathVariable("userNum") Long userNum) {
        String suspensionReason = userService.getSuspensionReason(String.valueOf(userNum));
        if (suspensionReason != null) {
            return ResponseEntity.status(403).body(suspensionReason); // Forbidden
        }
        return ResponseEntity.ok("정상 로그인 가능합니다.");
    }

}
