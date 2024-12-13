package com.kosmo.komofunding.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApplicationDTO {

    @JsonIgnore
    private String applicationId; // 제작자 신청서 UID

    @NotNull(message = "사용자 ID는 필수 입력 항목입니다.")
    @Size(min = 1, message = "사용자 ID는 비워둘 수 없습니다.")
    private String userId; // 신청자 아이디

    @Size(min = 1, message = "첨부 파일 경로는 1자 이상 입력해야 합니다.")
    private String applicationImg; // 첨부 파일 경로 (이미지)

    @NotNull(message = "신청 날짜는 필수 입력 항목입니다.")
    @FutureOrPresent(message = "신청 날짜는 현재 시각이나 이후여야 합니다.")
    private LocalDateTime applicationDate; // 신청 날짜

    private LocalDateTime approvalDate; // 신청 승인 날짜

    private LocalDateTime rejectedDate; // 신청 거절 날짜

    private boolean isDeleted; // 삭제 여부

    private String status; // 신청서 상태 (PENDING, APPROVED, REJECTED)
}
