package com.kosmo.komofunding.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ApplicationInDTO {
    private String applicationId; // 제작자 신청서 UID
    private Long applicationNum;
    private String userId; // 신청자 아이디

    @NotNull(message = "신청 날짜는 필수 입력 항목입니다.")
    @FutureOrPresent(message = "신청 날짜는 현재 시각이나 이후여야 합니다.")
    private LocalDateTime applicationDate; // 신청 날짜

    private LocalDateTime approvalDate; // 신청 승인 날짜

    private LocalDateTime rejectedDate; // 신청 거절 날짜

    private boolean isHidden; // 숨김 처리 여부

    private String status; // 신청서 상태 (PENDING, APPROVED, REJECTED)

    private String applicationImg;
}
