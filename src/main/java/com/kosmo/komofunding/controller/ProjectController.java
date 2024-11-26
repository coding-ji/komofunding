package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // 프로젝트 생성 및 저장
    @PostMapping("/api/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectService.saveProject(project);
        return ResponseEntity.ok(savedProject);
    }

    @GetMapping("/api/projects/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable("projectId") String projectId) {
        Optional<Project> project = projectService.getProjectById(projectId);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}