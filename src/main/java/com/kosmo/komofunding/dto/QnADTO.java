package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.enums.QnaCategory;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QnADTO {
    @NotBlank(message = "문의글 ID는 비워둘 수 없습니다.")
    private String qnaId; // 문의글 ID

    @NotBlank(message = "작성자 ID는 비워둘 수 없습니다.")
    private String userId; // 문의글 작성자 ID

    @NotNull(message = "문의글 카테고리를 선택해야 합니다.")
    private QnaCategory qnaCategory; // 문의글 카테고리

    @NotBlank(message = "문의글 제목은 비워둘 수 없습니다.")
    @Size(max = 100, message = "문의글 제목은 최대 100자까지 입력 가능합니다.")
    private String title; // 문의글 제목

    @NotBlank(message = "문의글 내용은 비워둘 수 없습니다.")
    @Size(min = 10, max = 1000, message = "문의글 내용은 최소 10자 이상, 최대 1000자까지 입력 가능합니다.")
    private String question_Comment; // 문의글 내용

    @PastOrPresent(message = "작성 날짜는 현재 날짜보다 미래일 수 없습니다.")
    private LocalDateTime writtenDate; // 질문글 작성날짜

    @PastOrPresent(message = "작성 날짜는 현재 날짜보다 미래일 수 없습니다.")
    private LocalDateTime updatedDate; // 질문글 업데이트 날짜

    private String answerUserId; // 문의답변 작성자 ID

    @Size(max = 1000, message = "답변 내용은 최대 1000자까지 입력 가능합니다.")
    private String answer; // 문의 답변

    @FutureOrPresent(message = "답변 수정 날짜는 현재 날짜보다 과거일 수 없습니다.")
    private LocalDateTime answerWrittenDate; // 문의 답변 작성 날짜

    @FutureOrPresent(message = "답변 수정 날짜는 현재 날짜보다 과거일 수 없습니다.")
    private LocalDateTime answerUpdatedDate; // 문의 답변 수정 날짜
}
