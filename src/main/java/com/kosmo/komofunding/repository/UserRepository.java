package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    // nickname으로 사용자 찾기
    Optional<User> findByNickName(String nickName);

    // creatorId로 User를 조회하는 메서드 추가
    Optional<User> findById(UUID userId);


    Optional<User> findByEmailAndPassword(String email, String password);  // 사용자 인증용
}