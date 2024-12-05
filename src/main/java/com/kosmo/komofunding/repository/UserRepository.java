package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String userId);
    Optional<User> findByEmail(String email);
    Optional<User> findByNameAndPhoneNumber(String name, String phoneNumber);
    boolean existsByEmail(String email);
}