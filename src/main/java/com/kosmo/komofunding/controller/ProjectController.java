package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.converter.ProjectConverter;
import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.exception.UnauthorizedException;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import com.kosmo.komofunding.service.ProjectService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
    @RequestMapping("/api/user/myinfo/projects")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectConverter projectConverter;

    // 유저(uid)에 해당하는 프로젝트 조회
    @GetMapping
    public ResponseEntity<List<ProjectOutDTO>> getProjects(HttpSession session){
        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            // 인증되지 않은 사용자가 인증을 요구
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        // userId로 유저 정보 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // 유저의 프로젝트 ID 리스트 가져오기
        List<String> projectIds = user.getProjectIds();  // 유저가 참여한(혹은 생성한) 프로젝트 ID 리스트

        if (projectIds == null || projectIds.isEmpty()) {
            return ResponseEntity.ok(List.of());  // 프로젝트가 없으면 빈 리스트 반환
        }

        // 프로젝트 ID 리스트를 통해 해당 프로젝트 조회
        List<Project> projects = projectRepository.findAllById(projectIds);

        // 프로젝트들을 DTO로 변환하여 반환
        List<ProjectOutDTO> projectOutDTOs = projects.stream()
                .map(project -> projectConverter.toOutDTO(project))  // 엔티티를 DTO로 변환
                .collect(Collectors.toList());

        return ResponseEntity.ok(projectOutDTOs);
    }


    // 개인 프로젝트 생성
    @PostMapping
    public ResponseEntity<Map<String, String>> createProject(
            @RequestBody ProjectInDTO projectRequest,
            HttpSession session) {

        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            // 인증되지 않은 사용자가 인증을 요구
           throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        // 세션에서 가져온 userId를 ProjectInDTO에 설정
        projectRequest.setUserId(userId);

        // Project 생성
        projectService.createProject(projectRequest);

        // 성공 메시지 설정
        Map<String, String> response = new HashMap<>();
        response.put("message", "프로젝트 생성이 완료되었습니다. 프로젝트 심사까지 3~5일 걸립니다.");

        // 201 Created 상태와 함께 메시지 반환
        return ResponseEntity.status(201).body(response);
    }

//
//    // 프로젝트 생성 및 저장
//    @PostMapping("/api/projects")
//    public ResponseEntity<Project> createProject(@RequestBody Project project) {
//        Project savedProject = projectService.saveProject(project);
//        return ResponseEntity.ok(savedProject);
//    }
//
//    @GetMapping("/api/projects/{projectId}")
//    public ResponseEntity<Project> getProjectById(@PathVariable("projectId") String projectId) {
//        Optional<Project> project = projectService.getProjectById(projectId);
//        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
}