package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.QnA;
import com.kosmo.komofunding.repository.QnARepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class QnAService {

    private final QnARepository qnARepository;

    // QnA저장
    public QnA saveQnA(QnA qna) {
        return qnARepository.save(qna);
    }

    // userId로 QnA 저장
    public Optional<QnA> getQnaByUserId(String userid) {
        return qnARepository.findByUserId(userid);
    }

}
