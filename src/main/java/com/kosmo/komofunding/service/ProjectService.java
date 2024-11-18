package com.kosmo.komofunding.service;

import com.kosmo.komofunding.converter.ProjectConverter;
import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProjectService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;  // ProjectRepository 주입

    @Autowired
    private ProjectConverter projectConverter;    // ProjectConverter 주입



    // ProjectService에서 프로젝트 아이디 리스트로 프로젝트들 조회
    public List<ProjectOutDTO> findProjectsByProjectIds(List<UUID> projectIds) {
        // 여러 개의 프로젝트 ID에 대해 프로젝트들을 조회
        List<Project> projects = projectRepository.findAllById(projectIds);

        // Project 엔티티 리스트를 ProjectOutDTO 리스트로 변환하여 반환
        return projects.stream()
                .map(projectConverter::convertToOutDTO)  // Project 엔티티를 ProjectOutDTO로 변환
                .collect(Collectors.toList());
    }

    @Transactional
    public ProjectInDTO createProject(ProjectInDTO projectInDTO) {
        // DTO -> 엔티티 변환
        Project project = projectConverter.convertToEntity(projectInDTO);

        // 프로젝트 저장
        project = projectRepository.save(project);

        // Creator ID로 User 조회
        User user = userRepository.findById(project.getCreatorId())
                .orElseThrow(() -> new RuntimeException("User not found with id: "));

        // User의 projectIds 업데이트 (중복 체크 추가)
        if (user.getProjectIds() == null) {
            user.setProjectIds(new ArrayList<>());
        }

        // 중복 체크 후 프로젝트 ID 추가
        if (!user.getProjectIds().contains(project.getProjectId())) {
            user.getProjectIds().add(project.getProjectId());
        }

        // User 저장
        userRepository.save(user);

        // 엔티티를 DTO로 변환하여 반환
        return projectConverter.convertToDTO(project);
    }

    // projectNumber로 프로젝트 조회
    public ProjectOutDTO findProjectByProjectNumber(Long projectNumber) {
        Project project = projectRepository.findByProjectNumber(projectNumber)
                .orElseThrow(() -> new RuntimeException("Project not found with number: " + projectNumber));

        return projectConverter.convertToOutDTO(project);
    }

}