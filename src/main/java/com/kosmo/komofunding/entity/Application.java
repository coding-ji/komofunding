package com.kosmo.komofunding.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Builder
@Table(name = "APPLICATION",
        indexes = {
                @Index(name = "idx_user_id", columnList = "user_id"),
                @Index(name = "idx_application_date", columnList = "application_date")
        })
@Getter
@Setter
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "application_id", nullable = false, updatable = false)
    private String applicationId; // 제작자 신청서 UID

    @Column(name = "application_num", nullable = false, unique = true, updatable = false)
    @Builder.Default
    private Long applicationNum = null; // 프로젝트 번호 (자동 생성, 6자리)

    @Column(name = "user_id", nullable = false, updatable = false)
    private String userId; // 신청자 아이디

    @Column(name = "application_Img", nullable = false)
    private String applicationImg; // 첨부 파일 경로 (이미지, hwp 등)

    @Column(name = "application_date", nullable = false, updatable = false)
    private LocalDateTime applicationDate; // 신청 날짜

    @Column(name = "approval_date")
    private LocalDateTime approvalDate; // 신청 승인 날짜

    @Column(name = "rejected_date")
    private LocalDateTime rejectedDate; // 신청 거절 날짜

    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false; // 삭제 여부


    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.PENDING; // 신청서 상태 (PENDING, APPROVED, REJECTED)

    @PrePersist
    public void setDefaults() {
        if (this.applicationDate == null) {
            this.applicationDate = LocalDateTime.now();
        }
    }

    public enum ApplicationStatus {
        PENDING, // 검토 중
        APPROVED, // 승인됨
        REJECTED // 거절됨
    }
}
