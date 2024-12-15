package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.QnaCategory;
import com.kosmo.komofunding.dto.QnAInDTO;
import com.kosmo.komofunding.entity.QnA;
import com.kosmo.komofunding.repository.QnARepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class QnAService {

    @Autowired
    private QnARepository qnARepository;

    // QnA 저장
    @Transactional
    public QnA createQnA(QnAInDTO qnAInDTO, HttpSession session) {
        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            throw new IllegalStateException("사용자 인증 정보가 없습니다.");
        }

        QnA qna = new QnA();
        LocalDateTime now = LocalDateTime.now();
        Long qnaNumber = generateQnaNumber();

        qna.setQnaNumber(qnaNumber);
        qna.setUserId(userId);
        qna.setQnaCategory(qnAInDTO.getQnaCategory());

        // COMMENT 카테고리일 경우 title은 null이어야 하므로 null로 설정
        if (qnAInDTO.getQnaCategory() == QnaCategory.COMMENT && qnAInDTO.getTitle() != null) {
            qna.setTitle(null);
        } else {
            qna.setTitle(qnAInDTO.getTitle());
        }

        qna.setQuestion_comment(qnAInDTO.getQuestionComment());
        qna.setWrittenDate(now);
        qna.setUpdatedDate(now);

        return qnARepository.save(qna);
    }

    // 답변 업데이트 (QnA에 대한 답변을 수정)
    public Optional<QnA> updateAnswer(Long qnaNumber, QnAInDTO qnaInDTO, HttpSession session) {
        Optional<QnA> existingQnA = qnARepository.findByQnaNumber(qnaNumber);

        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            throw new IllegalStateException("사용자 인증 정보가 없습니다.");
        }

        if(existingQnA.isPresent()){
            QnA qna = existingQnA.get();

            String answer = qnaInDTO.getAnswer();
            String answerUserId = qnaInDTO.getAnswerUserId();

            LocalDateTime now = LocalDateTime.now();

            // 기존에 답변이 있으면 모든 정보를 갱신
            if (qna.getAnswer() != null && !qna.getAnswer().isEmpty()) {
                qna.setAnswer(answer); // 답변 내용 갱신
                qna.setAnswerUserId(answerUserId); // 답변자 정보 갱신
                qna.setAnswerUpdatedDate(now); // 답변 업데이트 시간 갱신
            } else {
                // 새로운 답변인 경우
                qna.setAnswer(answer);
                qna.setAnswerUserId(answerUserId);
                qna.setAnswerWrittenDate(now);
                qna.setAnswerUpdatedDate(now);
            }

            return Optional.of(qnARepository.save(qna));
        }

        return Optional.empty(); // QnA가 없으면 빈 Optional 반환
    }

    // 댓글 업데이트
    public Optional<QnA> updateComment(Long qnaNumber, QnAInDTO qnAInDTO, HttpSession session) {
        Optional<QnA> existingQnA = qnARepository.findByQnaNumber(qnaNumber);

        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            throw new IllegalStateException("사용자 인증 정보가 없습니다.");
        }

        if (existingQnA.isPresent()) {
            QnA qna = existingQnA.get();

            // 댓글 작성자(userId)와 세션의 userId가 일치하는지 확인
            if (!qna.getUserId().equals(userId)) {
                throw new IllegalStateException("댓글 작성자만 수정할 수 있습니다.");
            }

            // 댓글 내용과 수정일자 갱신
            String updatedComment = qnAInDTO.getQuestionComment(); // 수정된 댓글 내용
            LocalDateTime now = LocalDateTime.now();

            // 기존 답변은 그대로 두고, 댓글만 업데이트
            qna.setQuestion_comment(updatedComment);
            qna.setUpdatedDate(now); // 댓글 수정 시, 업데이트 날짜만 갱신

            return Optional.of(qnARepository.save(qna));
        }

        return Optional.empty(); // QnA가 없으면 빈 Optional 반환
    }


    // userId로 1:1문의 혹은 댓글 조회
    public List<QnA> getQnaByUserIdAndCategory(String userId, QnaCategory qnaCategory) {
        return qnARepository.findByUserIdAndQnaCategory(userId, qnaCategory);
    }

    // userId와 qnaNumber로 1:1 문의글 상세조회
    public Optional<QnA> getQnaByQnaNumberAndUserId(Long qnaNumber, String userId){
        return qnARepository.findByQnaNumberAndUserId(qnaNumber, userId);
    }

    // QnA 조회 (QnaId로)
    public Optional<QnA> getQnaByQnaId(String qnaId) {
        return qnARepository.findByQnaId(qnaId);
    }

    // QnA 조회 (QnaNumber로)
    public Optional<QnA> getQnaByQnaNumber(Long qnaNumber) {
        return qnARepository.findByQnaNumber(qnaNumber);
    }

    // QnA 삭제
    public boolean deleteQnA(String qnaId) {
        Optional<QnA> qna = qnARepository.findByQnaId(qnaId);
        if (qna.isPresent()) {
            qnARepository.delete(qna.get());
            return true;
        }
        return false; // QnA가 없으면 삭제하지 않음
    }



    // 6자리 랜덤 숫자 생성
    private Long generateRandomQnaNumber() {
        return (long) (100000 + Math.random() * 900000);  // 100000~999999 범위
    }

    // 프로젝트 번호 생성 로직 (6자리 중복 방지)
    private Long generateQnaNumber() {
        Long qnaNumber = generateRandomQnaNumber();
        int attempts = 0;
        while (qnARepository.existsByQnaNumber(qnaNumber)) {
            qnaNumber = generateRandomQnaNumber();
            attempts++;
            // 너무 많은 반복이 발생하면 예외를 던짐
            if (attempts > 100) {
                throw new IllegalStateException("프로젝트 번호 생성 실패");
            }
        }
        return qnaNumber;
    }
}