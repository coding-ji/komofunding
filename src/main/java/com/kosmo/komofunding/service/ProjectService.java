package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    // 프로젝트 저장
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    // projectId로 프로젝트를 조회하는 메소드
    public Optional<Project> getProjectById(String projectId) {
        return projectRepository.findById(projectId);
    }

}