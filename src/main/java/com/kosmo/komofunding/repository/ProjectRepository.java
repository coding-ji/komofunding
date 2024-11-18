package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface ProjectRepository  extends JpaRepository<Project, UUID> {
    Optional<Project> findByProjectNumber(Long projectNumber);
}
