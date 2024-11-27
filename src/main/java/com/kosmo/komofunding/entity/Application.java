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

    @Column(name = "application_img", nullable = false)
    private String applicationImg; // 신청 사진

    @Column(name = "application_date", nullable = false)
    private LocalDateTime applicationDate; // 신청 날짜

    @Column(name = "approval_date")
    private LocalDateTime approvalDate; // 신청 승인 날짜

    @Column(name = "rejected_date")
    private LocalDateTime rejectedDate; // 신청 거절 날짜

// 나중에 Service에서 생성!!
@PrePersist
public void setApplicationDefaults(){
    if(this.applicationDate == null){
        this.applicationDate = LocalDateTime.now();
    }
}

}
