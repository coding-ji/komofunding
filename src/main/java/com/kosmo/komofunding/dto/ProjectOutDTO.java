package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.enums.ProjectCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectOutDTO {
    private String userName; // 해당 creatorId의 유저 이름
    private String nickName; // 해당 유저 닉네임
    private String userEmail; //해당 유저 이메일
    private String userPhone;//해당 유저 폰번호
    private String userShortDescription; // 해당 유저 짧은 소개글
    private Long projectNumber;
    private String title;
    private String shortDescription;
    private ProjectCategory projectCategory;
    private String description;
    private Long currentAmount;
    private Long totalAmount;
    private LocalDateTime projectStartDate;
    private LocalDateTime projectEndDate;
    private LocalDateTime writtenDate;
    private LocalDateTime approvalDate;
    private LocalDateTime rejectionDate;
    private Boolean isHidden;
    private String statusChangeReason;
}