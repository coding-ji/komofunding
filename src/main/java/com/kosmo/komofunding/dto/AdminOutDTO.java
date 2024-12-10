package com.kosmo.komofunding.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AdminOutDTO {

    private String adminId; // 관리자 UID
    private String adminNickname; // 관리자 별명
    private String adminPw;//관리자 비번
    private String adminEmail; // 관리자 이메일
    private LocalDateTime adminJoinDate; // 관리자 생성 날짜
    private List<String> noticeIdList; // 공지사항/이벤트 글 ID 리스트
}
