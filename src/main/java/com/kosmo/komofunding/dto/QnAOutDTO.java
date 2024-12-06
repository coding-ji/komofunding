package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.enums.QnaCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class QnAOutDTO {
    //문의글 정보
    private QnaCategory qnaCategory; // 문의글 카테고리
    private Long qnaNumber; // 문의글 번호

    // 작성자 관련 정보
    private String nickName; //작성자 닉네임
    private Long userNum; //작성자 유저번호
    private LocalDateTime writtenDate; // 질문 작성일
    private String title; // 질문 제목
    private String questionComment; // 질문 내용

    // 답변자 관련 정보
    private String answerNickName; //답변자 닉네임
    private Long answerNum; //답변자 유저번호
    private LocalDateTime answerWrittenDate; // 답변 작성일
    private String answer; // 답변
}
