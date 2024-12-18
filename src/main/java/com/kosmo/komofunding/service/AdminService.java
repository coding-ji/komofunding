package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.converter.ProjectConverter;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.AdminRepository;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminService {
    private AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private UserService userService;
    private ProjectConverter projectConverter;
    private ProjectRepository projectRepository;

    //Admin저장
    public Admin saveAdmin(Admin admin){return adminRepository.save(admin);}

    // 모든 Admin 데이터 가져오기
    public List<Admin> findAllAdmins() {
        return adminRepository.findAll();
    }

    // 전체 회원 조회
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 특정 유저 조회
    public Optional<User> getUserByUserNum(Long userNum) {
        return userService.getUserByUserNum(userNum);
    }

    // 유저 탈퇴
    public UserOutDTO deactivateUser(Long userNum, UserStatus status) {
        // 유저 조회
        User user = userRepository.findByUserNum(userNum)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        // 회원 상태 변경 (정지 또는 탈퇴)
        user.setActivatedStatus(status); // 정지 또는 탈퇴 상태 설정

        // 회원 저장 (상태 변경 후 저장)
        userRepository.save(user);

        // 상태 변경된 유저의 정보를 DTO로 반환
        return new UserOutDTO(user);
    }



    // 특정 프로젝트 조회
    public ProjectOutDTO getProjectByProjectNum(Long projectNum) {
        // 프로젝트 번호로 프로젝트 조회
        Project project = projectRepository.findByProjectNum(projectNum)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));

        // 프로젝트의 유저 정보도 함께 가져오기
        User user = userRepository.findById(project.getUserId())
                .orElseThrow(() -> new RuntimeException("유저를 찾을 수 없습니다."));

        // ProjectOutDTO로 변환하여 반환
        return projectConverter.toOutDTO(project);  // Project 엔티티를 DTO로 변환
    }

    // 전체 프로젝트 조회
    public List<Project> getAllProjects() {
        return projectRepository.findAll();  // 모든 프로젝트 조회
    }

    // 프로젝트 승인 처리
    public void approveProject(Long projectNum) {
        Project project = projectRepository.findByProjectNum(projectNum)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));

        project.setApprovalDate(LocalDateTime.now());  // 승인 날짜 설정
        project.setIsHidden(false);  // 승인되면 공개 처리
        projectRepository.save(project);
    }

    // 프로젝트 거부 처리
    public void rejectProject(Long projectNum) {
        Project project = projectRepository.findByProjectNum(projectNum)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));

        project.setRejectionDate(LocalDateTime.now());  // 거부 날짜 설정
        project.setIsHidden(true);  // 거부되면 숨김 처리
        projectRepository.save(project);
    }

    // 프로젝트 숨김/공개 처리 (isHidden 토글)
    public void toggleProjectVisibility(Long projectNum) {
        Project project = projectRepository.findByProjectNum(projectNum)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));

        project.setIsHidden(!project.getIsHidden());  // 공개 여부 토글
        projectRepository.save(project);
    }
}
