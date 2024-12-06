package com.kosmo.komofunding.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatorSwitchRequestDTO {
    private String email;  // 이메일
    private String requestImage;  // 신청 이미지 URL
    private boolean privacyAgreement;  // 개인정보 동의 여부
}