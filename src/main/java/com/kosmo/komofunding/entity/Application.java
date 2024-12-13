package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.converter.StringListConverter;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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
    @Convert(converter = StringListConverter.class)
    private List<String> applicationImg; // 첨부 파일 경로 (이미지, hwp 등)

    @Column(name = "application_date", nullable = false, updatable = false)
    private LocalDateTime applicationDate; // 신청 날짜

    @Column(name = "approval_date")
    @Builder.Default
    private LocalDateTime approvalDate = null; // 신청 승인 날짜

    @Column(name = "rejected_date")
    @Builder.Default
    private LocalDateTime rejectedDate = null; // 신청 거절 날짜

    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private Boolean isDeleted = false; // 삭제 여부

    @Column(name = "activated_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus activatedStatus; // 신청서 상태 (PENDING, APPROVED, REJECTED)


}
