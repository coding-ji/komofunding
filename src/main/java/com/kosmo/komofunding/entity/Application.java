package com.kosmo.komofunding.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
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

    @Column(name = "user_id", nullable = false, updatable = false)
    private String userId; // 신청자 아이디

    @Column(name = "attachment_path", nullable = false)
    private String attachmentPath; // 첨부 파일 경로 (이미지, hwp 등)

    @Column(name = "application_date", nullable = false, updatable = false)
    private LocalDateTime applicationDate; // 신청 날짜

    @Column(name = "approval_date")
    private LocalDateTime approvalDate; // 신청 승인 날짜

    @Column(name = "rejected_date")
    private LocalDateTime rejectedDate; // 신청 거절 날짜

    @Column(name = "is_hidden", nullable = false)
    private boolean isHidden = false; // 숨김 처리 여부

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
