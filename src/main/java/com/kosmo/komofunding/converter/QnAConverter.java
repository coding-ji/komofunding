package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.QnAInDTO;
import com.kosmo.komofunding.dto.QnAOutDTO;
import com.kosmo.komofunding.entity.QnA;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QnAConverter {

    @Autowired
    private final UserRepository userRepository;

    //QnA 엔티티에서 DTO로 변환
    public QnAOutDTO toOutDTO(QnA qna){
        // 작성자 찾기
        User user = userRepository.findById(qna.getUserId())
                .orElseThrow(() -> new RuntimeException("작성자를 찾을 수 없습니다."));

        // 답변자 찾기
        User answerUser = null;
        if(qna.getAnswerUserId() !=null){
            answerUser = userRepository.findById(qna.getAnswerUserId())
                    .orElseThrow(() -> new RuntimeException("답변자를 찾을 수 없습니다."));
        }

        return QnAOutDTO.builder()
                .qnaCategory(qna.getQnaCategory())
                .qnaNumber(qna.getQnaNumber())
                .nickName(user.getNickName())
                .userNum(user.getUserNum())
                .writtenDate(qna.getWrittenDate())
                // title은 댓글일 경우에는 null값 허용
                .title(qna.getTitle() != null ? qna.getTitle() : null)
                .questionComment(qna.getQuestion_comment())
                // answer이 없을 경우에는 null 값 설정
                .answerNickName(answerUser != null ? answerUser.getNickName() : null)
                .answerNum(answerUser != null ? answerUser.getUserNum() : null)
                .answerWrittenDate(qna.getAnswerWrittenDate())
                .answer(qna.getAnswer())
                .build();
    }


}
