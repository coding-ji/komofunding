package com.kosmo.komofunding.dto;

public record EmailRequestDTO(
        String email,
        String verificationCode  // 인증 코드 (emailverification에 사용)
) {}