package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommunityInDTO {

    private CommunityCategory communityCategory; // 카테고리
    private String communityTitle; // 커뮤니티 제목
    private String communityContent; // 커뮤니티 내용
    private LocalDateTime writeDate; // 작성일
    private String author; // 작성자
}
