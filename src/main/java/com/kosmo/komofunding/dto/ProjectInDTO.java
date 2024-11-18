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
public class ProjectInDTO {
    private UUID projectId;
    private UUID creatorId;
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
    private LocalDateTime updatedDate;
    private LocalDateTime approvalDate;
    private LocalDateTime rejectionDate;
    private Boolean isHidden;
    private String statusChangeReason;
}