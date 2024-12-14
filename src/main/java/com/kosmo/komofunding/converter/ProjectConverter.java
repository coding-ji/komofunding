package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.QnAOutDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.QnARepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

        // QnA 리스트 생성 (null 처리)
        List<QnAOutDTO> qnaList = (project.getQnaIdList() != null ? project.getQnaIdList() : Collections.emptyList())
                .stream()
                .map(qna -> qnARepository.findByQnaId((String) qna)
                        .orElseThrow(() -> new RuntimeException("QnA를 찾을 수 없습니다.")))
                .map(qna -> QnAConverter.toOutDTO(qna, userRepository))
                .collect(Collectors.toList());

        // Supporters 리스트 생성 (null 처리)
        List<UserOutDTO> supporters = (project.getSupportersIdList() != null ? project.getSupportersIdList() : Collections.emptyList())
                .stream()
                .map(userId -> userRepository.findById((String) userId)
                        .orElseThrow(() -> new RuntimeException("후원자를 찾을 수 없습니다.")))
                .map(UserConverter::toOutDTO)
                .collect(Collectors.toList());

        // 달성률 계산
        Double progressRate = 0.0;
        if (project.getTotalAmount() > 0) {
            progressRate = (project.getCurrentAmount() / (double) project.getTotalAmount()) * 100;
        }

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
                .projectShortDescription(project.getShortDescription())
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
                .progressRate(progressRate)
                .build();
    }

    // Entity로 변환
    public Project toEntity(ProjectInDTO projectInDTO, User user){

        // totalAmount 계산
        Long totalAmount = projectInDTO.getItems().
                stream().mapToLong(item -> item.itemPrice() * item.itemAmount())
                .sum();

        return Project.builder()
                .userId(user.getUserId())
                .title(projectInDTO.getTitle())
                .projectCategory(projectInDTO.getProjectCategory())
                .thumbnailImgs(projectInDTO.getThumnailImgs())
                .shortDescription(projectInDTO.getShortDescription())
                .description(projectInDTO.getDescription())
                .items(projectInDTO.getItems())
                .totalAmount(totalAmount)
                .projectStartDate(projectInDTO.getProjectStartDate())
                .projectEndDate(projectInDTO.getProjectEndDate())
                .build();
    }
}
