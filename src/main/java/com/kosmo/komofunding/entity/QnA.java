package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.dto.CommentDTO;
import com.kosmo.komofunding.common.enums.QnaCategory;
import com.kosmo.komofunding.converter.CommentDTOConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "QNA")
@Getter
@Setter
public class QnA {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="qna_id", nullable = false, updatable = false)
    private String qnaId; // 문의글 id

    @Enumerated(EnumType.STRING)
    @Column(name="qna_category")
    private QnaCategory qnaCategory; // 문의글 카테고리(질문인지 답변인지)

    @Column(name = "title", length = 100) //댓글로 문의글 적을경우 title null값 허용
    private String title;

    @Column(name="question_comment")
    @Convert(converter = CommentDTOConverter.class)
    private CommentDTO questionComment; // 질문내용

    @Column(name="answer_comment")
    @Convert(converter = CommentDTOConverter.class)
    private CommentDTO answerComment; // 답변내용
}
