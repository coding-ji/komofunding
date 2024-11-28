package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, String> {
}
