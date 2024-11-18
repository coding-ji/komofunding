package com.kosmo.komofunding.controller;
import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // 사용자 생성 (POST 요청)
    @PostMapping
    public ResponseEntity<UserInDTO> createUser(@RequestBody UserInDTO userDTO) {
        UserInDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.ok(createdUser);  // 생성된 사용자 정보 반환
    }

    @GetMapping
    public ResponseEntity<UserOutDTO> findUserByUserNickname(@RequestParam("nickname") String nickName) {
        System.out.println("Received nickname: " + nickName);  // 로그 출력
        UserOutDTO user = userService.findUserByNickName(nickName);
        return ResponseEntity.ok(user);
    }

}