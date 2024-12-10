package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EmailRepository extends JpaRepository<Email, String> {
    Optional<Email> findByEmail(String email);
    @Modifying
    @Query("DELETE FROM Email e WHERE e.createdAt < :currentTime")
    void deleteExpiredVerificationCodes(@Param("currentTime") LocalDateTime currentTime);
}
