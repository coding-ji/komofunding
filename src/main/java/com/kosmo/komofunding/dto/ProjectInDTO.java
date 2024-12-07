package com.kosmo.komofunding.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kosmo.komofunding.common.dto.ItemDTO;
import com.kosmo.komofunding.common.enums.ProjectCategory;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ProjectInDTO {
    private String userId;

    @NotBlank(message = "제목은 필수로 입력해주세요.")
    private String title;

    @NotNull(message = "카테고리는 필수 입력입니다.")
    private ProjectCategory projectCategory;

    @NotNull(message = "썸네일 이미지는 필수 입력입니다.")
    @Size(min = 1, message = "썸네일 이미지는 최소 1개 이상이어야 합니다.")
    private List<String> thumnailImgs;

    @NotBlank(message = "짧은 소개는 필수 입력입니다.")
    @Size(max = 70, message = "짧은 소개는 70자 이하로 입력해야 합니다.")
    private String shortDescription;

    @NotBlank(message = "소개 내용은 필수 입력입니다.")
    private String description;

    @NotNull(message = "아이템 목록은 필수 입력입니다.")
    @Size(max = 10, message = "아이템은 최대 10개까지 입력할 수 있습니다.")
    private List<ItemDTO> items;

    @NotNull(message = "총 금액은 필수 입력입니다.")
    @Max(value = 9999999999L, message = "총 금액은 최대 100억원까지 가능합니다.")
    private Long totalAmount;

    @NotNull(message = "프로젝트 시작 날은 필수 입력입니다.")
    @PastOrPresent(message = "프로젝트 시작 날짜는 과거일 수 없습니다.")
    private LocalDateTime projectStartDate;

    @NotNull(message = "프로젝트 종료 날짜는 필수 입력입니다.")
    @FutureOrPresent(message = "프로젝트 종료 날짜는 현재나 미래여야 합니다.")
    private LocalDateTime projectEndDate;

    @Size(max = 100, message = "거부/숨김 이유는 100자 이하로 입력해야 합니다.")
    private String statusChangeReason;

    // 날짜 유효성 검증: 시작 날짜가 종료 날짜보다 앞서야 함
    @AssertTrue(message = "프로젝트 종료 날짜는 시작 날짜보다 나중이어야 합니다.")
    public boolean isValidDateRange() {
        return projectStartDate != null && projectEndDate != null && projectStartDate.isBefore(projectEndDate);
    }

}
