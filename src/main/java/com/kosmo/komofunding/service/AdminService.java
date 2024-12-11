package com.kosmo.komofunding.service;

import com.kosmo.komofunding.dto.AdminOutDTO;
import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.AdminRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminService {
    private AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    //Admin저장
    public Admin saveAdmin(Admin admin){return adminRepository.save(admin);}

    //AdminId로 찾기
    public Optional<Admin>  fintByAdminId(String adminId){return adminRepository.findById(adminId);}

    // 모든 Admin 데이터 가져오기
    public List<Admin> findAllAdmins() {
        return adminRepository.findAll();
    }

}
