package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.QnAOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.QnARepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProjectConverter {
    private final UserRepository userRepository;

    //Entity에서 DTO 변환
    public ProjectOutDTO toOutDTO(Project project){
        // 사용자 정보 가져오기
        User user = userRepository.findById(project.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // QnA 리스트 생성
        List<QnAOutDTO> qnaList = project.getQnaIdList().stream()
                .map(qna -> QnAConverter.toOutDTO(qna))
                .collect(Collectors.toList());



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
                .build();
    }
}
