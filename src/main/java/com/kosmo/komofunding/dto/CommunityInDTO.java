package com.kosmo.komofunding.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kosmo.komofunding.common.enums.CommunityCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommunityInDTO {

    private String communityTitle; // 커뮤니티 제목
    private String communityContent; // 커뮤니티 내용
    private CommunityCategory communityCategory; // 카테고리

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDate; // 종료일
    private boolean isHidden = false; // 기본값 false로 설정
    private String author; // 작성자


}


