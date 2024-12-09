package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.*;
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

@Controller
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/my_info")
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
    @GetMapping("/{user_num}/my_info/profile")
    public ResponseEntity<User> getUserProfile(@PathVariable("userNum") String userNum) {
        try {
            Long userNumLong = Long.parseLong(userNum);  // String -> Long 변환

            // 이메일로 사용자 정보 조회
            User user = userService.getUserByUserNum(userNumLong)
                    .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

            return ResponseEntity.ok(user); // 성공적으로 반환
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 사용자 없으면 404 반환
        }
    }

    // 프로필 수정
//    @PatchMapping("/{user_num}/my_info/profile")
//    public ResponseEntity<Boolean> updateUserProfile(
//            @PathVariable("userNum") Long userNum,
//            @RequestBody UserProfileUpdateDTO request,  // 수정할 프로필 정보 받기
//            @RequestParam String password  // 기존 비밀번호 받기
//        ) {
//        try {
//            // 비밀번호 확인
//            boolean isPasswordValid = userService.verifyPassword(String.valueOf(userNum), password);  // 비밀번호 검증
//            if (!isPasswordValid) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 비밀번호 오류시 400
//            }
//
//            // 프로필 업데이트
//            boolean updatedProfile = userService.updateUserProfile(userNum, request); // 프로필 정보 수정
//
//            // 수정된 프로필 반환
//            return ResponseEntity.ok(updatedProfile); // 성공적으로 수정된 프로필 반환
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 예외 처리
//        }
//    }

//    @PostMapping("/{email}/myinfo/creator-switch")
//    public ResponseEntity<CreatorSwitchResponseDTO> applyForCreatorSwitch(
//            @PathVariable String email,
//            @RequestBody CreatorSwitchRequestDTO requestDTO) {
//
//        // 이메일이 일치하는지 확인
//        if (!requestDTO.getEmail().equals(email)) {
//            return ResponseEntity.badRequest().body(new CreatorSwitchResponseDTO("이메일이 일치하지 않습니다."));
//        }
//
//        // 제작자 전환 신청 처리
//        CreatorSwitchResponseDTO responseDTO = userService.applyForCreatorSwitch(requestDTO);
//        return ResponseEntity.ok(responseDTO);
//    }

}