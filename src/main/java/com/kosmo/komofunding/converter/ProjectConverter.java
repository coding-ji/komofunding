package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.QnAOutDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.QnA;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.QnARepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProjectConverter {

    private final UserRepository userRepository;
    private final QnARepository qnARepository;
    private final QnAConverter qnAConverter;

    //Entity에서 DTO 변환
    public ProjectOutDTO toOutDTO(Project project) {
        // 사용자 정보 가져오기
        User user = userRepository.findById(project.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // QnA 리스트 생성 (null 처리)
        List<QnA> qnaEntities = Optional.ofNullable(project.getQnaIdList())
                .map(qnaIdList -> qnARepository.findAllByQnaIdIn(qnaIdList))
                .orElse(Collections.emptyList());
        List<QnAOutDTO> qnaList = qnaEntities.stream()
                .map(qnAConverter::toOutDTO)
                .collect(Collectors.toList());

        // Supporters 리스트 생성 (null 처리)
        List<UserOutDTO> supporters = Optional.ofNullable(project.getSupportersIdList())
                .orElse(Collections.emptyList())
                .stream()
                .map(userId -> userRepository.findById(userId).orElse(null))  // 사용자 ID가 없으면 null 반환
                .filter(Objects::nonNull)  // null 값은 필터링
                .map(UserConverter::toOutDTO)
                .collect(Collectors.toList());

        // 달성률 계산
        Double progressRate = 0.0;
        if (project.getTotalAmount() != null && project.getTotalAmount() > 0) {
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
                .shortDescription(projectInDTO.getProjectShortDescription())
                .description(projectInDTO.getDescription())
                .items(projectInDTO.getItems())
                .totalAmount(totalAmount)
                .projectStartDate(projectInDTO.getProjectStartDate())
                .projectEndDate(projectInDTO.getProjectEndDate())
                .build();
    }
}
