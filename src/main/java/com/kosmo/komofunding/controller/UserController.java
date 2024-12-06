package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.CreatorSwitchRequestDTO;
import com.kosmo.komofunding.dto.CreatorSwitchResponseDTO;
import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Controller
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/myinfo")
    public ResponseEntity<Map<String, String>> getMyPageInfo(HttpSession session){
        // 세션에서 사용자 이메일 가져오기
        String email = (String) session.getAttribute("userEmail");
        if (email == null ){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            // 세션에 이메일이 없으면 401 반환
        }
        try {
            // 사용자 세부 정보를 가져와 응답
            Map<String, String> userDetails = userService.getMyPageInfo(email);
            return ResponseEntity.ok(userDetails);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 사용자가 없으면 404 반환
        }
    }

    // 프로필 조회
    @GetMapping("/{email}/myinfo/profile")
    public ResponseEntity<User> getUserProfile(@PathVariable("email") String email) {
        try {
            // 이메일로 사용자 정보 조회
            User user = userService.getUserByEmail(email)
                    .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

            return ResponseEntity.ok(user); // 성공적으로 반환
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 사용자 없으면 404 반환
        }
    }

    // 프로필 수정
    @PatchMapping("/{email}/myinfo/profile")
    public ResponseEntity<String> updateUserProfile(
            @PathVariable("email") String email,
            @RequestBody UserInDTO userInDTO) {

        try {
            // 프로필 업데이트
            boolean isProfileUpdated = userService.updateUserProfile(email, userInDTO);

            // 비밀번호가 포함된 경우 업데이트 처리
            if (userInDTO.getPassword() != null) {
                boolean isPasswordUpdated = userService.updateUserPassword(email, userInDTO.getPassword());
                if (isPasswordUpdated) {
                    return ResponseEntity.ok("프로필 및 비밀번호 수정 완료");
                }
            }

            // 비밀번호 없이 프로필만 수정한 경우
            if (isProfileUpdated) {
                return ResponseEntity.ok("프로필 수정 완료");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수정 실패");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/{email}/myinfo/creator-switch")
    public ResponseEntity<CreatorSwitchResponseDTO> applyForCreatorSwitch(
            @PathVariable String email,
            @RequestBody CreatorSwitchRequestDTO requestDTO) {

        // 이메일이 일치하는지 확인
        if (!requestDTO.getEmail().equals(email)) {
            return ResponseEntity.badRequest().body(new CreatorSwitchResponseDTO("이메일이 일치하지 않습니다."));
        }

        // 제작자 전환 신청 처리
        CreatorSwitchResponseDTO responseDTO = userService.applyForCreatorSwitch(requestDTO);
        return ResponseEntity.ok(responseDTO);
    }

}