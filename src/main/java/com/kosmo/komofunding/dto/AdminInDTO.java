package com.kosmo.komofunding.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class AdminInDTO {

    @NotBlank(message = "관리자 별명은 필수입니다.")
    @Size(max = 50, message = "관리자 별명은 최대 50자까지 입력할 수 있습니다.")
    private String adminNickname; // 관리자 별명

    @NotBlank(message = "관리자 이메일은 필수입니다.")
    @Email(message = "유효한 이메일 주소를 입력하세요.")
    private String adminEmail; // 관리자 이메일

    @NotBlank(message = "관리자 비밀번호는 필수입니다.")
    @Size(min = 8, max = 20, message = "비밀번호는 8자 이상 20자 이하로 입력하세요.")
    private String adminPw; // 관리자 비밀번호

    private List<String> noticeIdList; // 관리자 작성 글 ID 리스트
}
