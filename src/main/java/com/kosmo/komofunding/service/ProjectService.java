package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.ProjectCategory;
import com.kosmo.komofunding.converter.ProjectConverter;
import com.kosmo.komofunding.dto.ProjectInDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.QnARepository;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectConverter projectConverter;
    private final UserRepository userRepository;
    private final QnARepository qnARepository;

    // 전체 프로젝트 조회
       public List<ProjectOutDTO> getAllProjects() {
        try {
            List<Project> allProjects = projectRepository.findAll();
            LocalDateTime now = LocalDateTime.now();
            return allProjects.stream()
                    .map(project -> {
                       return projectConverter.toOutDTO(project);
                    })
                    .filter(projectOutDTO -> {
                       return projectOutDTO.getProjectEndDate().isAfter(now);
                    })
                    .sorted(Comparator.comparingDouble(ProjectOutDTO::getProgressRate).reversed())
                    .limit(50)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error while fetching projects: " + e.getMessage());
            e.printStackTrace();
            throw e; // 예외를 다시 던져 컨트롤러에서 처리
        }
    }

// 카테고리 및 상태별 프로젝트 조회
    public List<ProjectOutDTO> getProjectsByCategoryAndStatus(String projectCategory, String fundingStatus) {
        LocalDateTime now = LocalDateTime.now();

        // projectCategory가 "all"일 경우, fundingStatus만 고려하여 조회
        if ("all".equalsIgnoreCase(projectCategory)) {
            return projectRepository.findProjectsByFundingStatus(fundingStatus, now)
                    .stream()
                    .map(project -> projectConverter.toOutDTO(project))
                    .collect(Collectors.toList());
        } else {
            // "ALL"이 아닌 카테고리는 Enum으로 변환하여 조회
            try {
                ProjectCategory category = ProjectCategory.valueOf(projectCategory.toUpperCase());
                return projectRepository.findProjectsByCategoryAndFundingStatusAndDateRange(category, fundingStatus, now)
                        .stream()
                        .map(project -> projectConverter.toOutDTO(project))
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException e) {
                // Enum 변환 실패 시 빈 리스트 반환
                return Collections.emptyList();
            }
        }
    }

    // 유저 uid로 프로젝트 조회
    public List<Project> getProjectsByUserId(String userId){
        return projectRepository.findByUserId(userId);
    }

    // 프로젝트 생성 로직
    @Transactional
    public ProjectOutDTO createProject(ProjectInDTO projectInDTO, HttpSession session) {
        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");
        if (userId == null) {
            throw new IllegalStateException("사용자 인증 정보가 없습니다.");
        }

        // userId로 User 객체 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 프로젝트 번호 생성
        Long projectNum = generateProjectNum();

        // 오늘 날짜
        LocalDateTime now = LocalDateTime.now();

        // Project 엔티티 생성
        Project project = projectConverter.toEntity(projectInDTO, user);
        project.setProjectNum(projectNum);
        project.setWrittenDate(now);
        project.setUpdatedDate(now);

        // 프로젝트 저장
        projectRepository.save(project);

        // 유저의 projectIds 필드에 새로운 프로젝트 번호 추가
        List<String> projectIds = user.getProjectIds();
        if (projectIds == null) {
            projectIds = new ArrayList<>();
        } else {
            // 불변 리스트일 경우 변경 가능한 리스트로 변환
            projectIds = new ArrayList<>(projectIds);
        }

        projectIds.add(String.valueOf(projectNum));  // 새 프로젝트 번호 추가
        user.setProjectIds(projectIds);

        // 유저 업데이트
        userRepository.save(user);

        // 결과 반환
        return projectConverter.toOutDTO(project);
    }

    // 특정 프로젝트 조회
    public ProjectOutDTO getProjectDetails(Long projectNum){
        Project project = projectRepository.findByProjectNum(projectNum)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));

        return projectConverter.toOutDTO(project);
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