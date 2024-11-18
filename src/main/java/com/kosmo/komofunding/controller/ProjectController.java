package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.converter.ProjectConverter;
import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.service.ProjectService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;  // ProjectService 주입
    @Autowired
    private ProjectConverter projectConverter;

    // 프로젝트 생성 (POST 요청)
    @PostMapping
    public ResponseEntity<ProjectInDTO> createProject(@RequestBody ProjectInDTO projectInDTO, HttpSession session) {
        // 세션에서 creatorId 가져오기
        UUID creatorId = (UUID) session.getAttribute("userId");

        if (creatorId == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);  // 로그인되지 않았으면 403 에러
        }

        // creatorId를 DTO에 설정
        projectInDTO.setCreatorId(creatorId);

        // 컨버터를 사용하여 DTO 변환
        Project project = projectConverter.convertToEntity(projectInDTO);

        // 프로젝트 생성 서비스 호출
        ProjectInDTO createdProject = projectService.createProject(projectInDTO);

        // 성공적으로 생성된 프로젝트 반환
        return ResponseEntity.ok(createdProject);
    }


    // 프로젝트 조회 (GET 요청)
    @GetMapping("/{projectNumber}")
    public ProjectOutDTO getProjectByNumber(@PathVariable("projectNumber") Long projectNumber) {
        return projectService.findProjectByProjectNumber(projectNumber);
    }
}