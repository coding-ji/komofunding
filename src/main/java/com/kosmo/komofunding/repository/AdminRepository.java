package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {

    // ------------------- 관리자 관련 메서드 -------------------

    // 관리자 이메일로 조회
    Admin findByAdminEmail(String adminEmail);

    // 관리자 별명 검색 (포함 검색)
    List<Admin> findByAdminNicknameContaining(String adminNickname);

    // 공지사항/이벤트 글 ID가 포함된 관리자 검색
    List<Admin> findByNoticeIdListContaining(String noticeId);

    // 특정 가입 날짜 범위의 관리자 검색
    List<Admin> findByAdminJoinDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    // ------------------- 사용자(User) 관리 기능 -------------------

    // 사용자 닉네임 검색 (포함 검색)
    @Query("SELECT u FROM User u WHERE u.nickName LIKE %:nickName%")
    List<User> findUsersByNickNameContaining(@Param("nickName") String nickName);

    // 사용자 회원 번호로 검색
    @Query("SELECT u FROM User u WHERE u.userNum = :userNum")
    User findUserByUserNum(@Param("userNum") Long userNum);

    // 가입 날짜 기준으로 정렬하여 사용자 조회 (최신순/오래된 순)
    @Query("SELECT u FROM User u ORDER BY u.joinDate :direction")
    List<User> findUsersOrderedByJoinDate(@Param("direction") String direction);

    // 특정 가입 날짜 범위의 사용자 검색
    @Query("SELECT u FROM User u WHERE u.joinDate BETWEEN :startDate AND :endDate ORDER BY u.joinDate DESC")
    List<User> findUsersByJoinDateBetween(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);

    // 특정 활성화 상태를 가진 사용자 검색
    @Query("SELECT u FROM User u WHERE u.activatedStatus = :status ORDER BY u.joinDate DESC")
    List<User> findUsersByActivatedStatus(@Param("status") String status);
}
