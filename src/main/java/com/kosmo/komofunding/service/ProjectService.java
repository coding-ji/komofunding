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
    public Project saveProject(ProjectInDTO projectInDTO) {
        Project project = toEntity(projectInDTO);
        return projectRepository.save(project);
    }

    // DTO를 엔티티로 변환하는 메서드
    public Project toEntity(ProjectInDTO projectInDTO) {
        Project project = Project.builder()
                .userId(projectInDTO.getUserId())
                .title(projectInDTO.getTitle())
                .projectCategory(projectInDTO.getProjectCategory())
                .thumbnailImgs(projectInDTO.getThumnailImgs())
                .shortDescription(projectInDTO.getShortDescription())
                .items(projectInDTO.getItems())
                .totalAmount(projectInDTO.getTotalAmount())
                .projectStartDate(LocalDateTime.now())  // 현재 시간으로 설정
                .projectEndDate(LocalDateTime.now())


                .description(projectInDTO.getDescription())



                .updatedDate(LocalDateTime.now())  // 현재 시간으로 설정


                .isHidden(true)  // 기본값 true
                .statusChangeReason("")  // 기본값 빈 문자열
                .build();

        // 프로젝트 번호 생성
        project.setProjectNum(generateProjectNum());

        return project;
    }

    // 프로젝트 번호 생성 로직 (6자리 중복 방지)
    private Long generateProjectNum() {
        Long projectNum = generateRandomProjectNum();
        while (projectRepository.existsByProjectNum(projectNum)) {
            projectNum = generateRandomProjectNum();  // 중복되는 번호가 있으면 다시 생성
        }
        return projectNum;
    }

    // 6자리 랜덤 숫자 생성
    private Long generateRandomProjectNum() {
        return (long) (100000 + Math.random() * 900000);  // 100000~999999 범위
    }
}