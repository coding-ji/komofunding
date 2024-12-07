package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.common.enums.QnaCategory;
import com.kosmo.komofunding.entity.QnA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface QnARepository extends JpaRepository<QnA, String> {
    // QnaId로 검색 (uid)
    Optional<QnA> findByQnaId(String qndId);
    // QnaNumber로 검색
    Optional<QnA> findByQnaNumber(Long qnaNumber);
    // 작성자ID로 검색
    Optional<QnA> findByUserId(String userId);
    // 카테고리로 검색 : 댓글(COMMENT) / 1:1문의(QUESTION)
    Optional<QnA> findByQnaCategory(QnaCategory qnaCategory);
    // 1:1문의 제목으로 검색(1:1문의일 때만 제목있음 - 완전일치)
    Optional<QnA> findByTitle(String title);
    // 1:1 문의 제목에서 포함된 단어 찾기
    List<QnA> findByTitleContaining(String keyword);
    // 작성 날짜로 검색
    List<QnA> findByWrittenDate(LocalDateTime writtenDate);
}
