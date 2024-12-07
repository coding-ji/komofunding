package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.dto.ItemDTO;
import com.kosmo.komofunding.common.enums.ProjectCategory;
import com.kosmo.komofunding.converter.ItemListConverter;
import com.kosmo.komofunding.converter.StringListConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Table(name = "PROJECT",
        indexes = {
                @Index(name = "idx_project_num", columnList = "project_num"),
                @Index(name ="idx_user_id", columnList = "user_id"),
                @Index(name="idx_written_date", columnList = "written_date")
        })
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "project_id", nullable = false, updatable = false, length = 36)
    private String projectId; // 프로젝트 UID

    @Column(name = "user_id", nullable = false, updatable = false)
    private String userId; // 프로젝트 작성자아이디

    @Column(name = "project_num", nullable = false, unique = true, updatable = false)
    @Builder.Default
    private Long projectNum = null; // 프로젝트 번호 (자동 생성, 6자리)

    @Column(name = "title", nullable = false, length = 100)
    private String title; // 프로젝트 제목

    @Column(name="project_category")
    @Enumerated(EnumType.STRING)
    private ProjectCategory projectCategory;

    @Column(name="thumbnail_imgs")
    @Convert(converter = StringListConverter.class)
    private List<String> thumbnailImgs;

    @Column(name = "short_description", nullable = false, length = 150)
    private String shortDescription; // 프로젝트 짧은 소개

    @Column(name = "description", nullable = false)
    private String description; // 프로젝트 긴 소개가 담겨있는 html  파일주소

    @Convert(converter = ItemListConverter.class)
    @Column(name = "items", columnDefinition = "longtext")
    private List<ItemDTO> items; // 프로젝트 아이템들

    @Column(name = "current_amount", nullable = false)
    @Builder.Default
    private Long currentAmount =0L;  // 현재 금액

    @Column(name = "total_amount", nullable = false)
    private Long totalAmount; // 총 금액

    @Column(name = "project_start_date", nullable = false)
    private LocalDateTime projectStartDate; // 프로젝트 후원 시작날

    @Column(name = "project_end_date", nullable = false)
    private LocalDateTime projectEndDate; // 프로젝트 후원 마감날

    @Column(name = "written_date", nullable = false, updatable = false)
    private LocalDateTime writtenDate; // 작성일

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate; // 글 업데이트 일

    @Column(name = "approval_date")
    private LocalDateTime approvalDate; // 프로젝트 승인 날짜

    @Column(name = "rejection_date")
    private LocalDateTime rejectionDate; // 프로젝트 거부날짜

    @Column(name = "is_hidden", nullable = false)
    @Builder.Default
    private Boolean isHidden = true; // 숨김 여부

    @Column(name = "status_change_reason")
    private String statusChangeReason; // 거부 / 숨김인 이유

    @Convert(converter = StringListConverter.class)
    @Column(name = "qna_id_list")
    @Builder.Default
    private List<String> QnaIdList = new ArrayList<>(); // 프로젝트 내에 문의댓글

    @Convert(converter = StringListConverter.class)
    @Column(name = "supporters_id_list")
    @Builder.Default
    private List<String> supportersIdList = null; // 프로젝트 후원자목록

}