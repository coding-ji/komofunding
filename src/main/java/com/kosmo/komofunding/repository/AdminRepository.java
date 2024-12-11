package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.entity.Admin;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {


    Admin findByAdminId(String adminId);
 // 관리자 이메일로 조회
Admin findByAdminEmail(String adminEmail);

    // 관리자 별명 검색 (포함 검색)
    List<Admin> findByAdminNicknameContaining(String adminNickname);

//
//    // 관리자 별명 검색 (포함 검색)
//    List<Admin> findByAdminNicknameContaining(String adminNickname);
//
//    // 공지사항/이벤트 글 ID가 포함된 관리자 검색
//    List<Admin> findByNoticeIdListContaining(String noticeId);

    // 특정 가입 날짜 범위의 관리자 검색
    List<Admin> findByAdminJoinDateBetween(LocalDateTime startDate, LocalDateTime endDate);

}
