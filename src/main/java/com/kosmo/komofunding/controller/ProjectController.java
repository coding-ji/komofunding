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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectConverter projectConverter;

    // 권한 체크 메소드
    private boolean isAdmin(HttpSession session) {
        String role = (String) session.getAttribute("role");
        return "admin".equals(role);
    }




    // 현재 진행 중인 프로젝트 불러오기 (인기순으로 50개)
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectOutDTO>> getAllProjects() {
        try {
            List<ProjectOutDTO> projects = projectService.getAllProjects();

            return ResponseEntity.ok(projects);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }

    // 카테고리별 프로젝트 조회
    @GetMapping("/projects/category")
    public ResponseEntity<List<ProjectOutDTO>> getProjectsByCategory(
            @RequestParam(name = "projectCategory") String projectCategory,
            @RequestParam(name = "fundingStatus") String fundingStatus) {
        try {
            List<ProjectOutDTO> projects = projectService.getProjectsByCategoryAndStatus(projectCategory, fundingStatus);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.emptyList());
        }
    }


    // 유저(uid)에 해당하는 프로젝트 조회
    @GetMapping("/api/user/myinfo/projects")
    public ResponseEntity<List<ProjectOutDTO>> getProjects(HttpSession session) {
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

    // 프로젝트 번호에 해당하는 프로젝트 조회
    @GetMapping("/projects/{projectNum}")
    public ResponseEntity<ProjectOutDTO> findProjectByProjectNumber(@PathVariable("projectNum") Long projectNum) {
        // 프로젝트 번호로 조회
        Optional<Project> project = projectRepository.findByProjectNum(projectNum);

        // 프로젝트가 존재하지 않을 경우 404 응답 반환
        if (project.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Project -> ProjectOutDTO 변환
        ProjectOutDTO projectOutDTO = projectConverter.toOutDTO(project.get());

        // 변환된 DTO를 200 OK로 반환
        return ResponseEntity.ok(projectOutDTO);
    }

    // 개인 프로젝트 관련 Controller
    // 개인 프로젝트 생성
    @PostMapping("/api/user/myinfo/projects")
    public ResponseEntity<Map<String, String>> createProject(
            @RequestBody ProjectInDTO projectRequest,
            HttpSession session) {

        // Project 생성 요청 시 session전달
        projectService.createProject(projectRequest, session);

        // 성공 메시지 설정
        Map<String, String> response = new HashMap<>();
        response.put("message", "프로젝트 생성이 완료되었습니다. 프로젝트 심사까지 3~5일 걸립니다.");

        // 201 Created 상태와 함께 메시지 반환
        return ResponseEntity.status(201).body(response);
    }

    // 개인 프로젝트 수정
    @PatchMapping("/api/user/myinfo/projects/{projectNum}")
    public ResponseEntity<Map<String, String>> updateProject(
            @PathVariable("projectNum") Long projectNum,
            @RequestBody ProjectInDTO projectInDTO){

        try{
            Project updatedProject = projectService.updateProject(projectNum, projectInDTO);
            Map<String, String> response = new HashMap<>();
            response.put("message", "프로젝트가 수정이 되었습니다.");
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "프로젝트를 수정할 수 없습니다..");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

    }

    // 개인 프로젝트 삭제
    @DeleteMapping("/api/user/myinfo/projects/{projectNum}")
    public ResponseEntity<Map<String, String>> deleteProject(@PathVariable("projectNum") String projectNum) {
        // 프로젝트 삭제 처리
        Boolean isDeleted = projectService.deleteProjectByNum(projectNum);

        Map<String, String> response = new HashMap<>();
        if (isDeleted) {
            response.put("message", "프로젝트가 성공적으로 삭제되었습니다.");
            response.put("projectNum", projectNum);  // 삭제된 프로젝트 번호를 응답에 포함
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "프로젝트 삭제에 실패했습니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    // 어드민..

    // 어드민 전용: 모든 프로젝트 조회
    @GetMapping("/admin/projects")
    public ResponseEntity<List<ProjectOutDTO>> getAllProjectsForAdmin(HttpSession session) {
        // 세션에서 어드민 ID 확인
        String adminId = (String) session.getAttribute("adminId");

        if (adminId == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        // 모든 프로젝트 조회
        List<Project> projects = projectRepository.findAll();

        // 프로젝트 데이터를 DTO로 변환
        List<ProjectOutDTO> projectOutDTOs = projects.stream()
                .map(projectConverter::toOutDTO) // projectConverter를 활용
                .toList();

        return ResponseEntity.ok(projectOutDTOs);
    }
//
//        List<ProjectOutDTO> projects = projectService.getAllProjects();
//        return ResponseEntity.ok(projects);
//    }

//
//
//    public ResponseEntity<List<ProjectOutDTO>> getProjects(HttpSession session) {
//        // 세션에서 userId 가져오기
//        String userId = (String) session.getAttribute("userId");
//
//        if (userId == null) {
//            // 인증되지 않은 사용자가 인증을 요구
//            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
//        }
//
//        // userId로 유저 정보 조회
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));
//
//        // 유저의 프로젝트 ID 리스트 가져오기
//        List<String> projectIds = user.getProjectIds();  // 유저가 참여한(혹은 생성한) 프로젝트 ID 리스트
//
//        if (projectIds == null || projectIds.isEmpty()) {
//            return ResponseEntity.ok(List.of());  // 프로젝트가 없으면 빈 리스트 반환
//        }
//
//        // 프로젝트 ID 리스트를 통해 해당 프로젝트 조회
//        List<Project> projects = projectRepository.findAllById(projectIds);
//
//        // 프로젝트들을 DTO로 변환하여 반환
//        List<ProjectOutDTO> projectOutDTOs = projects.stream()
//                .map(project -> projectConverter.toOutDTO(project))  // 엔티티를 DTO로 변환
//                .collect(Collectors.toList());
//
//        return ResponseEntity.ok(projectOutDTOs);


    // 어드민 전용: 프로젝트 삭제
//    @DeleteMapping("/admin/projects/{projectNum}")
//    public ResponseEntity<Void> deleteProjectForAdmin(@PathVariable("projectNum") Long projectNum, HttpSession session) {
//        if (!isAdmin(session)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 확인
//        }
//
//        try {
//            projectService.hideProject(projectNum); // 숨김 처리 로직 호출
//            return ResponseEntity.noContent().build();
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 프로젝트가 존재하지 않는 경우
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 일반적인 서버 오류
//        }
//

}


