package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.repository.AdminRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminService {
    private AdminRepository adminRepository;

    //Admin저장
    public Admin saveAdmin(Admin admin){return adminRepository.save(admin);}

    //AdminId로 찾기
    public Optional<Admin>  fintByAdminId(String adminId){return adminRepository.findById(adminId);}
}
