package com.kosmo.komofunding.service;

import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    // 프로젝트 저장 로직 (projectInDTO를 Entity로 저장)
    public Project createProject(ProjectInDTO projectInDTO) {
        Project project = toEntity(projectInDTO);
        return projectRepository.save(project);
    }

    // DTO를 엔티티로 변환하는 메서드
    public Project toEntity(ProjectInDTO projectInDTO) {
        // 현재시간 변수
        LocalDateTime now = LocalDateTime.now();

        Project project = Project.builder()
                .userId(projectInDTO.getUserId())
                .title(projectInDTO.getTitle())
                .projectCategory(projectInDTO.getProjectCategory())
                .thumbnailImgs(projectInDTO.getThumnailImgs())
                .shortDescription(projectInDTO.getShortDescription())
                .description(projectInDTO.getDescription())
                .items(projectInDTO.getItems())
                .totalAmount(projectInDTO.getTotalAmount())
                .projectStartDate(projectInDTO.getProjectStartDate())
                .projectEndDate(projectInDTO.getProjectEndDate())
                .writtenDate(now)
                .updatedDate(now)
                .statusChangeReason("")  // 기본값 빈 문자열
                .build();

        project.setProjectNum(generateProjectNum());
        return project;
    }

    // 6자리 랜덤 숫자 생성
    private Long generateRandomProjectNum() {
        return (long) (100000 + Math.random() * 900000);  // 100000~999999 범위
    }

    // 프로젝트 번호 생성 로직 (6자리 중복 방지)
    private Long generateProjectNum() {
        Long projectNum = generateRandomProjectNum();
        int attempts = 0;
        while (projectRepository.existsByProjectNum(projectNum)) {
            projectNum = generateRandomProjectNum();
            attempts++;
            // 너무 많은 반복이 발생하면 예외를 던짐
            if (attempts > 100) {
                throw new IllegalStateException("프로젝트 번호 생성 실패");
            }
        }
        return projectNum;
    }

}