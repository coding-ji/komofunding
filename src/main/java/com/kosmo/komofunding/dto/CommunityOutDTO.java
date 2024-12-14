package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommunityOutDTO {


    private Integer communityNumber; // 커뮤니티 번호 (6자리 숫자)
    private String communityTitle; // 커뮤니티 제목
    private String communityContent; // 커뮤니티 내용
    private CommunityCategory communityCategory; // 카테고리
    private LocalDateTime writeDate; // 작성일
    private LocalDateTime updatedDate; // 수정일
    private LocalDateTime endDate; // 종료일
    private Boolean isHidden; // 숨김 처리 여부
    private String author; // 작성자 닉네임
    private String url; // 상세 조회 URL
}