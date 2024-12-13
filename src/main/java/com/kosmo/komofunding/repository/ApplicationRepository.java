package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {


    // 신청 날짜로 범위 조회
    List<Application> findByApplicationDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    // 특정 사용자의 신청 조회
    List<Application> findByUserId(String userId);

    // 특정 상태의 신청서 조회
    List<Application> findByActivatedStatus(UserStatus activatedStatus);

    // 삭제되지 않은 신청서 조회
    List<Application> findByIsDeletedFalse();
}
