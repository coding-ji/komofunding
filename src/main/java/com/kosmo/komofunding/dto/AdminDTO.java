package com.kosmo.komofunding.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AdminDTO {
        private String adminId;          // 관리자 UID
        private String adminNickname;    // 관리자 별명
        private String adminEmail;       // 관리자 이메일 (로그인 시 사용)
        private String adminPw;          // 관리자 비밀번호
        private LocalDateTime adminJoinDate; // 관리자 생성 날짜
        private List<String> noticeIdList;   // 관리자가 작성한 공지/이벤트 글 ID 목록

}
