package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.dto.ItemDTO;
import com.kosmo.komofunding.common.enums.ProjectCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter

public class ProjectDTO {
    private String projectId;              // 프로젝트 UID
    private String userId;                 // 프로젝트 작성자아이디
    private Long projectNum;               // 프로젝트 번호 (6자리 랜덤)
    private String title;                  // 프로젝트 제목
    private ProjectCategory projectCategory;
    private List<String> thumbnailImgs;    // 썸네일 이미지 목록
    private String shortDescription;       // 프로젝트 짧은 소개
    private String description;            // 프로젝트 긴 소개 (html 파일 주소)
    private List<ItemDTO> items;           // 프로젝트 아이템들
    private Long currentAmount;            // 현재 금액
    private Long totalAmount;              // 총 금액
    private LocalDateTime projectStartDate;// 프로젝트 후원 시작날
    private LocalDateTime projectEndDate;  // 프로젝트 후원 마감날
    private LocalDateTime writtenDate;     // 작성일
    private LocalDateTime updatedDate;     // 업데이트 일
    private LocalDateTime approvalDate;    // 프로젝트 승인 날짜
    private LocalDateTime rejectionDate;   // 프로젝트 거부 날짜
    private Boolean isHidden;              // 숨김 여부
    private String statusChangeReason;     // 거부/숨김 이유
    private List<String> QnaIdList;
}
