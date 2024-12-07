package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.exception.UnauthorizedException;
import com.kosmo.komofunding.service.ProjectService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/myinfo/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

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