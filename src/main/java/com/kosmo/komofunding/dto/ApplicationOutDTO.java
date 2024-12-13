package com.kosmo.komofunding.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
public class ApplicationOutDTO {
    // 사용자 정보 추가
    private Long userNum; // 회원 번호
    private String email;  // 사용자 이메일
    private String name;   // 사용자 이름
    private String nickName; // 사용자 닉네임
    private String phoneNumber;   // 사용자 휴대폰
    private LocalDateTime joinDate; // 가입 날짜
    private List<String> applicationImg; // 신청 이미지


    private Long applicationNum;
    private LocalDateTime applicationDate; // 신청 날짜
    private LocalDateTime approvalDate; // 신청 승인 날짜
    private LocalDateTime rejectedDate; // 신청 거절 날짜
    private Boolean isHidden; // 숨김 처리 여부
    private String activatedStatus; // 신청서 상태 (PENDING, APPROVED, REJECTED)
}
