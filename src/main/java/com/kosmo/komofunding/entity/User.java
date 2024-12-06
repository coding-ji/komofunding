package com.kosmo.komofunding.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kosmo.komofunding.common.enums.CreatorSwitchStatus;
import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.converter.StringListConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Entity
@Table(name = "USER", // 명시적으로 테이블 이름을 USER로 지정
        indexes = {
                @Index(name = "idx_user_num", columnList = "user_num"),
                @Index(name = "idx_email", columnList = "email"),
                @Index(name = "idx_name", columnList = "name"),
                @Index(name = "idx_nick_name", columnList = "nick_name"),
                @Index(name = "idx_phone_number", columnList = "phone_number"),
                @Index(name = "idx_activated_status", columnList = "activated_status")})
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false, updatable = false, length = 36)
    private String userId;  // 자동 생성되는 유저 고유 ID

    @Column(name = "user_num", nullable = false, unique = true)
    private Long userNum; // 자동 생성되는 유저 번호

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email; // 유저 이메일 및 유저 로그인 시 아이디

    @Column(name = "password", nullable = false)
    private String password; // 유저 비밀번호

    @Column(name = "name", nullable = false, length = 20)
    private String name;  // 유저 이름

    @Column(name = "nick_name", nullable = false, unique = true, length = 20)
    private String nickName;  // 유저 별명

    @Column(name = "phone_number", nullable = false, unique = true, length = 20)
    private String phoneNumber; // 유저 핸드폰 번호

    @Column(name = "profile_img", length = 255)
    private String profileImg; // 프로필 이미지

    @Column(name = "short_description", length = 80)
    private String shortDescription; // 유저 짧은 소개글

    @Enumerated(EnumType.STRING)
    @Column(name = "activated_status", nullable = false, columnDefinition = "varchar(255) default 'DONOR'")
    private UserStatus activatedStatus;  // 유저의 활동(후원자, 제작자 대기, 제작자), 탈퇴, 정지 상태

    @Column(name = "deactivation_reason", length = 200)
    private String deactivationReason; // 유저 탈퇴 혹은 정지 사유

    @Column(name = "deactivation_date")
    private LocalDateTime deactivationDate; // 탈퇴 날짜

    @Column(name = "bank_name", length = 50)
    private String bankName; // 은행명

    @Column(name = "account_number", length = 50)
    private String accountNumber; // 은행 계좌 번호

    @Column(name = "account_holder", length = 50)
    private String accountHolder; // 예금주

    @Column(name = "join_date", nullable = false)
    private LocalDateTime joinDate;  // 가입 날짜

    @Column(name = "last_login_time")
    private LocalDateTime lastLoginTime; // 최종 로그인 시간

    @Column(name = "corporation_name", length = 100)
    private String corporationName; // 사업자명

    @Column(name = "corporation_tel", length = 100)
    private String corporationTel; // 사업자 번호

    @Column(name = "bsn", length = 100)
    private Long BSN; // 사업자 등록 번호

    @Column(name = "project_ids", columnDefinition = "longtext")
    @Convert(converter = StringListConverter.class)
    private List<String> projectIds; // 프로젝트 ID들 저장

    @Column(nullable = true)
    private String verificationCode;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime verificationCodeExpiration; // 인증 코드 만료 시간

    @Enumerated(EnumType.STRING)
    @Column(name = "creator_switch_status")
    private CreatorSwitchStatus creatorSwitchStatus;  // 제작자 전환 신청 상태

    @Column(name = "request_image")
    private String requestImage;   // 신청 이미지 URL

    @Column(name = "application_date")
    private LocalDateTime applicationDate;  // 신청일

    @Column(name = "privacy_agreement")
    private Boolean privacyAgreement = false; // 개인정보 동의 여부 (객체로 변경)

    // 6자리 랜덤 숫자 생성(회원번호) , Service 생성시에 save시에 넣기 !!!!!
    private Long generateRandomNumber() {
        Random random = new Random();
        return 100000L + random.nextInt(900000); // 100000~999999 사이의 랜덤 숫자 생성
    }

    // 엔티티가 저장되기 전에 값 설정
    @PrePersist
    public void setUserDefaults() {
        if (this.userNum == null) {
            // 회원번호 랜덤으로 숫자 생성
            this.userNum = generateRandomNumber();
        }

        if (this.activatedStatus == null) {
            // 회원가입 시 DONOR(후원자)로 기본값 생성
            this.activatedStatus = UserStatus.DONOR;
        }

        if (this.joinDate == null){
            this.joinDate = LocalDateTime.now();
        }

        if (this.privacyAgreement == null) {
            this.privacyAgreement = false; // 기본값 설정
        }
    }

    public boolean isSuspended() {
        return this.activatedStatus == UserStatus.SUSPENDED;
    }

    // 만료된 코드인지 확인하는 메소드
    public boolean isVerificationCodeExpired() {
        if (verificationCodeExpiration == null) {
            return false;  // 또는 적절한 기본값 처리
        }
        return verificationCodeExpiration.isBefore(LocalDateTime.now());
    }

    // 인증 코드 설정 시 만료 시간도 설정
    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
        this.verificationCodeExpiration = LocalDateTime.now().plusMinutes(5); // 예시: 5분 후 만료
    }
}
