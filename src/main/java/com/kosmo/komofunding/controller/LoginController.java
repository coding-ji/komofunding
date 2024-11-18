package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.LoginRequestDTO;
import com.kosmo.komofunding.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.UUID;


@Controller
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO loginRequestDTO, HttpSession session) {
        // 사용자 인증
        UUID userId = userService.authenticate(loginRequestDTO.getEmail(), loginRequestDTO.getPassword());

        // 인증된 사용자 정보를 세션에 저장
        if (userId != null) {
            session.setAttribute("userId", userId);  // UUID를 세션에 저장
            return "redirect:/";  // 로그인 성공 후 리디렉션
        } else {
            return "redirect:/login?error";  // 로그인 실패
        }
    }

}