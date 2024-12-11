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
    public ResponseEntity<User> getMyPageInfo(HttpSession session) {
        // 세션에서 사용자 이메일 가져오기
        String email = (String) session.getAttribute("userEmail");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            // 세션에 이메일이 없으면 401 반환
        }

        try {
            // 사용자 정보를 가져와 응답
            User user = userService.getUserInfoByEmail(email);
            return ResponseEntity.ok(user);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // 사용자가 없으면 404 반환
        }
    }


    // 프로필 조회
    @GetMapping("/{userNum}/my_info/profile")
    public ResponseEntity<UserProfileUpdateDTO> getUserProfile(@PathVariable("userNum") Long userNum) {
        try {
            User user = userService.getUserByUserNum(userNum)
                    .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

            // User 엔티티 -> UserProfileUpdateDTO로 변환
            UserProfileUpdateDTO response = UserProfileUpdateDTO.builder()
                    .profileImage(user.getProfileImg())
                    .nickName(user.getNickName())
                    .userNum(user.getUserNum())
                    .shortDescription(user.getShortDescription())
                    .phoneNumber(user.getPhoneNumber())
                    .email(user.getEmail())  // 변경 불가 필드도 반환
                    .name(user.getName())    // 변경 불가 필드도 반환
                    .bankName(user.getBankName())  // 은행 이름
                    .accountNumber(user.getAccountNumber())  // 계좌 번호
                    .accountHolder(user.getAccountHolder())  // 계좌 주
                    .BSN(user.getBSN())  // 사업자 등록 번호
                    .password(user.getPassword())  // 비밀번호
                    .build();

            return ResponseEntity.ok(response);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    // 프로필 수정
    @PatchMapping("/{userNum}/my_info/profile")
    public ResponseEntity<UserProfileUpdateDTO> updateUserProfile(
            @PathVariable("userNum") Long userNum,
            @RequestBody UserProfileUpdateDTO request  // 수정할 프로필 정보 받기
        ) {
        try {
//            // 비밀번호 확인
//            boolean isPasswordValid = userService.verifyPassword(Long.valueOf(String.valueOf(userNum)), request.getPassword());  // 비밀번호 검증
//
//            if (!isPasswordValid) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 비밀번호 오류시 400
//            }

            // 프로필 업데이트
            User updatedUser = userService.updateUserProfile(userNum, request); // 프로필 정보 수정

            // 수정된 프로필 반환
            UserProfileUpdateDTO response = UserProfileUpdateDTO.builder()
                    .profileImage(updatedUser.getProfileImg())
                    .nickName(updatedUser.getNickName())
                    .userNum(updatedUser.getUserNum())
                    .shortDescription(updatedUser.getShortDescription())
                    .phoneNumber(updatedUser.getPhoneNumber())
                    .email(updatedUser.getEmail())
                    .name(updatedUser.getName())
                    .bankName(updatedUser.getBankName())  // 은행 이름
                    .accountNumber(updatedUser.getAccountNumber())  // 계좌 번호
                    .accountHolder(updatedUser.getAccountHolder())  // 계좌 주
                    .BSN(updatedUser.getBSN())  // 사업자 등록 번호
                    .password(updatedUser.getPassword())  // 비밀번호
                    .build();

            return ResponseEntity.ok(response); // 수정된 프로필 반환
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 사용자 없으면 404 반환
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 예외 처리
        }
    }

    // 제작자 신청
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