package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.QnAOutDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.QnARepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProjectConverter {

    private final UserRepository userRepository;
    private final QnARepository qnARepository;

    //Entity에서 DTO 변환
    public ProjectOutDTO toOutDTO(Project project){
        // 사용자 정보 가져오기
        User user = userRepository.findById(project.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // QnA 리스트 생성
        List<QnAOutDTO> qnaList = project.getQnaIdList().stream()
                .map(qnaId -> qnARepository.findByQnaId(qnaId)
                        .orElseThrow(()-> new RuntimeException("QnA를 찾을 수 없습니다.")))
                .map(qna -> QnAConverter.toOutDTO(qna, userRepository))
                .toList();

        // Supporters 리스트 생성
        List<UserOutDTO> supporters = project.getSupportersIdList().stream()
                .map(userId -> userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("후원자를 찾을 수 없습니다.")))
                .map(UserConverter::toOutDTO)
                .toList();

        return ProjectOutDTO.builder()
                .userNum(user.getUserNum())
                .nickname(user.getNickName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .userShortDescription(user.getShortDescription())
                .projectNum(project.getProjectNum())
                .title(project.getTitle())
                .projectCategory(project.getProjectCategory())
                .thumbnailImgs(project.getThumbnailImgs())
                .description(project.getDescription())
                .items(project.getItems())
                .currentAmount(project.getCurrentAmount())
                .totalAmount(project.getTotalAmount())
                .projectStartDate(project.getProjectStartDate())
                .projectEndDate(project.getProjectEndDate())
                .writtenDate(project.getWrittenDate())
                .approvalDate(project.getApprovalDate())
                .rejectionDate(project.getRejectionDate())
                .isHidden(project.getIsHidden())
                .qnaList(qnaList)
                .supporters(supporters)
                .build();
    }
}
