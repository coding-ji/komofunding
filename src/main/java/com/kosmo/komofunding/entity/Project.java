package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.enums.ProjectCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(columnDefinition = "binary(16)", name = "project_id")
    private UUID projectId; // 프로젝트 id

    @Column(columnDefinition = "binary(16)", name = "creator_id", nullable = false)
    private UUID creatorId; // 프로젝트 작성한 유저 id

    @Column(nullable = false)
    private Long projectNumber;   // 프로젝트 글번호 (6자리 숫자 랜덤)

    @Column(nullable = false)
    private String title;  // 프로젝트 제목

    @Column(nullable = false)
    private String shortDescription; // 프로젝트 짧은 설명글

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectCategory projectCategory;   // 프로젝트 카테고리

    @Column(nullable = false)
    private String description; // 프로젝트 긴 설명글

    @Column(nullable = false, columnDefinition = "BIGINT default 0")
    private Long currentAmount; // 프로젝트 현재 모인 금액

    @Column(nullable = false, columnDefinition = "BIGINT default 0")
    private Long totalAmount; // 프로젝트 최종 목표 금액

    @Column (nullable = false)
    private LocalDateTime projectStartDate; // 프로젝트 시작 날짜

    @Column (nullable = false)
    private LocalDateTime projectEndDate;// 프로젝트 마감 날짜

    @Column (nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime writtenDate; // 프로젝트 작성 날짜

    private LocalDateTime updatedDate; // 프로젝트 수정 날짜

    private LocalDateTime approvalDate; // 프로젝트 승인 날짜

    private LocalDateTime rejectionDate; // 프로젝트 거절 날짜

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean isHidden; // 프로젝트 숨김 여부

    private String statusChangeReason;  // 프로젝트 숨김 이유(거절이유와 숨김이유 둘 다 포함)

    // 6자리 랜덤 숫자 생성(글번호)
    private Long generateRandomNumber() {
        Random random = new Random();
        return 100000L + random.nextInt(900000); // 100000~999999 사이의 랜덤 숫자 생성
    }

    //엔티티가 저장되기 전에 필요한 값들 설정
    @PrePersist
    public void setProjectDefaults() {
        // creatorId 설정 (필수)
        if (this.creatorId == null) {
            // creatorId를 null로 두지 않기 위해 기본값을 설정해야 합니다.
            // 예를 들어, 로그인한 유저의 ID로 설정하거나, 임시로 특정 ID를 설정할 수 있습니다.
            // 임시로 UUID.randomUUID()로 설정하면 프로젝트 생성 시 creatorId가 필수로 채워집니다.
            this.creatorId = UUID.randomUUID(); // 임시 ID, 실제 환경에서는 적절한 ID 설정 필요
        }

        // projectNumber 설정 (필수)
        if (this.projectNumber == null) {
            this.projectNumber = generateRandomNumber(); // 6자리 랜덤 숫자 생성
        }

        // title 설정 (필수)
        if (this.title == null || this.title.isEmpty()) {
            this.title = "Untitled Project"; // 기본 제목 설정
        }

        // shortDescription 설정 (필수)
        if (this.shortDescription == null || this.shortDescription.isEmpty()) {
            this.shortDescription = "";
        }

        // description 설정 (필수)
        if (this.description == null || this.description.isEmpty()) {
            this.description = "";
        }

        // projectCategory 설정 (필수)
        if (this.projectCategory == null) {
            this.projectCategory = ProjectCategory.ACCESSORY; // 기본 카테고리 설정
        }

        // projectStartDate 설정 (필수)
        if (this.projectStartDate == null) {
            this.projectStartDate = LocalDateTime.now(); // 현재 시간으로 설정
        }

        // projectEndDate 설정 (필수)
        if (this.projectEndDate == null) {
            this.projectEndDate = this.projectStartDate.plusDays(0);
        }

        // writtendate 설정 (필수)
        if (this.writtenDate == null) {
            this.writtenDate = LocalDateTime.now(); // 현재 시간으로 설정
        }
        // currentAmount, totalAmount 설정 (필수)
        if (this.currentAmount == null) {
            this.currentAmount = 0L; // 기본값 0
        }

        if (this.totalAmount == null) {
            this.totalAmount = 0L; // 기본값 0
        }

        if(this.isHidden == null){
            this.isHidden = true;
        }
    }
}
