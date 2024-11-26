package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.dto.CommentDTO;
import com.kosmo.komofunding.common.enums.QnaCategory;
import com.kosmo.komofunding.converter.CommentDTOConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "QNA",
        indexes = {
                @Index(name = "idx_user_id", columnList = "user_id"),
                @Index(name = "idx_qna_category", columnList = "qna_category")
        })
@Getter
@Setter
public class QnA {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "qna_id", nullable = false, updatable = false)
    private String qnaId; // 문의글 id

    @Column(name = "user_id", nullable = false)
    private String userId; //문의글을 작성한 userId

    @Enumerated(EnumType.STRING)
    @Column(name = "qna_category")
    private QnaCategory qnaCategory; // 문의글 카테고리

    @Column(name = "title", length = 100) //댓글로 문의글 적을경우 title null값 허용
    private String title;

    @Column(name = "question_comment")
    private String content;  // 문의글 내용

    @Column(name = "written_date", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime writtenDate;  // 질문글 작성날짜

    @Column(name = "updated_date")
    private LocalDateTime updatedDate; // 질문글 업데이트 날짜

    @Column(name = "answer_comment")
    @Convert(converter = CommentDTOConverter.class)
    private CommentDTO answerComment; // 답변내용


    // 엔티티가 저장되기 전에 값 설정
    @PrePersist
    public void setQnaDefaults() {
        if (this.writtenDate == null) {
            this.writtenDate = LocalDateTime.now(); // 작성일 기본값 설정
        }
    }
}