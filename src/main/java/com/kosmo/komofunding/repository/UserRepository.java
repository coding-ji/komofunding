package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String userId);
    Optional<User> findByEmail(String email);
    Optional<User> findByNameAndPhoneNumber(String name, String phoneNumber);
    Optional<User> findByEmailAndPassword(String email, String password);
    Optional<User> findByUserNum(Long userNum);
    List<User> findByUserIdIn(List<String> userIds);



    // 만료된 인증 코드가 있는 사용자 삭제
    @Modifying
    @Query("DELETE FROM User u WHERE u.verificationCodeExpiration < :currentTime")
    void deleteExpiredVerificationCodes(@Param("currentTime") LocalDateTime currentTime);

    boolean existsByNickName(String nickName);
}