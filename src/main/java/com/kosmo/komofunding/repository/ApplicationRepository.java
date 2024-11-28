package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, String> {
}
