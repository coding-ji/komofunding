package com.kosmo.komofunding.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor  // 생성자 추가
@Builder
public class ApplicationInDTO {
    private String applicationId; // 제작자 신청서 UID
    private Long applicationNum;
    private String userId; // 신청자 아이디
    @Builder.Default
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSSSSS")  // JSON 포맷에 맞춰 날짜 형식 지정
    private LocalDateTime applicationDate = LocalDateTime.now(); // 신청 날짜, 기본값: 현재 날짜
    private LocalDateTime approvalDate; // 신청 승인 날짜
    private LocalDateTime rejectedDate; // 신청 거절 날짜
    @Builder.Default
    private Boolean isHidden = false; // 숨김 처리 여부, 기본값: false
    private String activatedStatus; // 신청서 상태 (PENDING, APPROVED, REJECTED)
    private List<String> applicationImg; // 신청 이미지 목록
}