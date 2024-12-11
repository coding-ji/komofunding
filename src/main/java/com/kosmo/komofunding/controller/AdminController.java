package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Controller

public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/admin")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin){
        Admin savedAdmin = adminService.saveAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.findAllAdmins();
        return ResponseEntity.ok(admins);
    }


    @GetMapping("/admin/{adminId}")
    public ResponseEntity<Admin> findByAdminId(@PathVariable("adminId") String adminId){
        Optional<Admin> admin = adminService.fintByAdminId(adminId);
        return admin.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }

}
