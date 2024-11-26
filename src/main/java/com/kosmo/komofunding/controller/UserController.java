package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 유저 생성 및 저장
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    // 기본 테스트용 엔드포인트
    @GetMapping("/test")
    public String testEndpoint() {
        return "User Controller is working!";
    }
}