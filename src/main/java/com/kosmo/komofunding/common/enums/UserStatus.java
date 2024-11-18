package com.kosmo.komofunding.common.enums;

public enum UserStatus {
    // DONOR(후원자), CREATORPENDING(제작자신청중), CREATOR(제작자)의 경우에는 활동회원
    DONOR,
    CREATORPENDING,
    CREATOR,
    // 탈퇴회원
    DEACTIVATED,
    // 정지회원
    SUSPENDED
}
