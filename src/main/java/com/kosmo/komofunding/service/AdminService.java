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

    // 유저 탈퇴, 정지 회원 관리?
    public UserOutDTO deactivateUser(Long userNum, String reason, UserStatus status) {
        // 유저 조회
        User user = userRepository.findByUserNum(userNum)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        // 회원 상태 변경 (정지 또는 탈퇴)
        user.setActivatedStatus(status); // 정지 또는 탈퇴 상태 설정
        user.setDeactivationReason(reason); // 탈퇴 이유 설정

        // 회원 저장 (상태 변경 후 저장)
        userRepository.save(user);

        // 상태 변경된 유저의 정보를 DTO로 반환
        return new UserOutDTO(user);
    }

    // 특정 프로젝트 조회
    public Optional<Project> getProjectByProjectNum(Long projectNum) {
        return projectRepository.findByProjectNum(projectNum);  // 프로젝트 번호로 프로젝트 조회
    }

    // 전체 프로젝트 조회
    public List<Project> getAllProjects() {
        return projectRepository.findAll();  // 모든 프로젝트 조회
    }

}
