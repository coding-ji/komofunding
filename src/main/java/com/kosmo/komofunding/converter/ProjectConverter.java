package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProjectConverter {

    @Autowired
    private UserRepository userRepository;  // UserRepository를 통해 User 엔티티 조회

    // ProjectInDTO -> Project 엔티티로 변환
    public Project convertToEntity(ProjectInDTO projectInDTO) {
        Project project = new Project();

        // 필드 값 설정
        project.setProjectId(projectInDTO.getProjectId());
        project.setCreatorId(projectInDTO.getCreatorId());
        project.setProjectNumber(projectInDTO.getProjectNumber());
        project.setTitle(projectInDTO.getTitle());
        project.setShortDescription(projectInDTO.getShortDescription());
        project.setProjectCategory(projectInDTO.getProjectCategory());
        project.setDescription(projectInDTO.getDescription());
        project.setCurrentAmount(projectInDTO.getCurrentAmount());
        project.setTotalAmount(projectInDTO.getTotalAmount());
        project.setProjectStartDate(projectInDTO.getProjectStartDate());
        project.setProjectEndDate(projectInDTO.getProjectEndDate());
        project.setWrittenDate(projectInDTO.getWrittenDate());
        project.setUpdatedDate(projectInDTO.getUpdatedDate());
        project.setApprovalDate(projectInDTO.getApprovalDate());
        project.setRejectionDate(projectInDTO.getRejectionDate());
        project.setIsHidden(projectInDTO.getIsHidden());
        project.setStatusChangeReason(projectInDTO.getStatusChangeReason());

        return project;
    }

    // Project -> ProjectInDTO 변환
    public ProjectInDTO convertToDTO(Project project) {
        return new ProjectInDTO(
                project.getProjectId(),
                project.getCreatorId(),
                project.getProjectNumber(),
                project.getTitle(),
                project.getShortDescription(),
                project.getProjectCategory(),
                project.getDescription(),
                project.getCurrentAmount(),
                project.getTotalAmount(),
                project.getProjectStartDate(),
                project.getProjectEndDate(),
                project.getWrittenDate(),
                project.getUpdatedDate(),
                project.getApprovalDate(),
                project.getRejectionDate(),
                project.getIsHidden(),
                project.getStatusChangeReason()
        );
    }

    // Project -> ProjectOutDTO 변환
    public ProjectOutDTO convertToOutDTO(Project project) {
        // creatorId를 통해 User 정보를 조회
        User user = userRepository.findById(project.getCreatorId())
                .orElseThrow(() -> new RuntimeException("User not found for creatorId: " + project.getCreatorId()));

        return new ProjectOutDTO(
                user.getName(),              // User 이름
                user.getNickName(),          // User 닉네임
                user.getEmail(),             // User 이메일
                user.getPhoneNumber(),       // User 폰번호
                user.getShortDescription(),  // User 짧은 소개글
                project.getProjectNumber(),
                project.getTitle(),
                project.getShortDescription(),
                project.getProjectCategory(),
                project.getDescription(),
                project.getCurrentAmount(),
                project.getTotalAmount(),
                project.getProjectStartDate(),
                project.getProjectEndDate(),
                project.getWrittenDate(),
                project.getApprovalDate(),
                project.getRejectionDate(),
                project.getIsHidden(),
                project.getStatusChangeReason()
        );
    }
}