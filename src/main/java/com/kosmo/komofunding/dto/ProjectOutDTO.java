package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.dto.ItemDTO;
import com.kosmo.komofunding.common.enums.ProjectCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class ProjectOutDTO {
    // 프로젝트 작성 유저 관련 정보 (userId로 찾아오기)
    private Long userNum;
    private String nickname;
    private String email;
    private String phoneNumber;
    private String userShortDescription;

    // 프로젝트 관련 정보
    private Long projectNum;
    private String title;
    private ProjectCategory projectCategory;
    private List<String> thumbnailImgs;
    private String projectShortDescription;
    private String description;
    private List<ItemDTO> items;
    private Long currentAmount;
    private Long totalAmount;
    private LocalDateTime projectStartDate;
    private LocalDateTime projectEndDate;
    private LocalDateTime writtenDate;  //작성날짜이자 신청날짜
    private LocalDateTime approvalDate;
    private LocalDateTime rejectionDate;
    private Boolean isHidden;
    private Double progressRate; // 달성률

    //프로젝트 문의댓글
    private List<QnAOutDTO> qnaList;

    //프로젝트 후원자목록
    private List<UserOutDTO> supporters;
}
