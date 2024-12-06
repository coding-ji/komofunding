package com.kosmo.komofunding.dto;
import com.kosmo.komofunding.common.enums.QnaCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class QnADTO {
    private String qnaId; // 문의글 id
    private String userId; // 문의글을 작성한 userId
    private QnaCategory qnaCategory; // 문의글 카테고리
    private String title; // 문의글 제목
    private String question_Comment; // 문의글 내용
    private LocalDateTime writtenDate; // 질문글 작성날짜
    private LocalDateTime updatedDate; // 질문글 업데이트 날짜
    private String answerUserId; // 문의답변 작성한 userId
    private String answer; // 문의 답변
    private LocalDateTime answerWrittenDate; // 문의 답변작성날짜
    private LocalDateTime answerUpdatedDate; // 문의 답변 수정 날짜
}
