package com.kosmo.komofunding.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatorSwitchRequestDTO {
    private String userId;
    private String email;
    private String requestRole; // 개인/법인
    private String requestImage; // 신청 이미지 URL
    private boolean privacyAgreement; // 개인정보 수집 및 동의 여부
    private LocalDateTime applicationDate; // 신청일
}