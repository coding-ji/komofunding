package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.enums.QnaCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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

    @Column(name = "user_id", nullable = false, updatable = false)
    private String userId; //문의글을 작성한 userId

    @Enumerated(EnumType.STRING)
    @Column(name = "qna_category")
    private QnaCategory qnaCategory; // 문의글 카테고리

    @Column(name = "title", length = 100) //댓글로 문의글 적을경우 title null값 허용
    private String title;

    @Column(name = "question_comment")
    private String question_comment;  // 문의글 내용

    @Column(name = "written_date", nullable = false, updatable = false)
    private LocalDateTime writtenDate;  // 질문글 작성날짜

    @Column(name = "updated_date", nullable = false)
    private LocalDateTime updatedDate; // 질문글 업데이트 날짜

    @Column(name="answer_user_id")
    private String answerUserId; // 문의답변 작성한 userId

    @Column(name="answer", nullable = false)
    @ColumnDefault("'-'") // 답변이 작성되지 않았을 경우 하이픈(-)
    private String answer; // 문의 답변

    @Column(name = "answer_written_date")
    private LocalDateTime answerWrittenDate; // 문의 답변작성날짜

    @Column(name = "answer_updated_date")
    private LocalDateTime answerUpdatedDate; // 문의 답변 수정 날짜

    // 엔티티가 저장되기 전에 값 설정 ===> service 만들때 여기로 넣기 !!!!
    @PrePersist
    public void setQnaDefaults() {
        if (this.writtenDate == null) {
            this.writtenDate = LocalDateTime.now(); // 작성일 기본값 설정
        }

        if(this.updatedDate == null){
            this.updatedDate = LocalDateTime.now(); // 업데이트 날짜는 기본값을 설정
        }
    }
}