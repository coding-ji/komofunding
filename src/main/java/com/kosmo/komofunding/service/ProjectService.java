package com.kosmo.komofunding.service;

import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    // projectRepository, userRepository 가져와 데이터 가공
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // 프로젝트 저장
    public Project saveProject(ProjectInDTO project) {

    }

    // projectId로 프로젝트를 조회하는 메소드
    public Optional<Project> getProjectById(String projectId) {
        return projectRepository.findById(projectId);
    }



    // 달성률 계산
    private double calculateAchievementRate(Project project) {
        if (project.getTotalAmount() == 0) return 0;
        return (double) project.getCurrentAmount() / project.getTotalAmount() * 100;
    }
}