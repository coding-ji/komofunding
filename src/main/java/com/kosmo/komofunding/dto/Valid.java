package com.kosmo.komofunding.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public @interface Valid {
    @NotBlank(message = "이름은 필수 항목입니다.")
    String name = "";

    @Email(message = "올바른 이메일 형식이어야 합니다.")
    String email = "";

    @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다.")
    String password = "";
}
