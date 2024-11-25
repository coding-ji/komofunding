package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.converter.StringListConverter;
import jakarta.persistence.*;
import lombok.Data;

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
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id", nullable = false, updatable = false, length = 36)
    private String userId;  //자동 생성되는 유저고유ID

    @Column(name = "user_num", nullable = false, unique = true)
    private Long userNum; //자동 생성되는 유저번호

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email; // 유저 이메일 및 유저 로그인시 아이디

    @Column(name = "password", nullable = false)
    private String password; // 유저비밀번호

    @Column(name = "name", nullable = false, length = 20)
    private String name;  // 유저이름

    @Column(name = "nick_name", nullable = false, unique = true, length = 20)
    private String nickName;  // 유저별명

    @Column(name = "phone_number", nullable = false, unique = true, length = 20)
    private String phoneNumber; // 유저 핸드폰번호

    @Column(name = "profile_img", length = 255)
    private String profileImg; // 프로필 이미지

    @Column(name = "short_description", length = 80)
    private String shortDescription; //유저 짧은 소개글

    @Enumerated(EnumType.STRING)
    @Column(name = "activated_status", nullable = false, columnDefinition = "varchar(255) default 'DONOR'")
    private UserStatus activatedStatus;  // 유저의 활동(후원자, 제작자대기, 제작자), 탈퇴, 정지상태

    @Column(name = "deactivation_reason", length = 200)
    private String deactivationReason; // 유저 탈퇴 혹은 정지 사유

    @Column(name = "deactivation_date")
    private LocalDateTime deactivationDate; // 탈퇴 날짜

    @Column(name = "bank_name", length = 50)
    private String bankName; //은행명

    @Column(name = "account_number", length = 50)
    private String accountNumber; //은행계좌번호

    @Column(name = "account_holder", length = 50)
    private String accountHolder; //예금주

    @Column(name = "join_date", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime joinDate;  //가입날짜

    @Column(name = "last_login_time")
    private LocalDateTime lastLoginTime; // 최종 로그인 시간

    @Column(name = "corporation_name", length = 100)
    private String corporationName; //사업자명

    @Column(name = "corporation_tel", length = 100)
    private String corporationTel; //사업자번호

    @Column(name = "bsn", length = 100)
    private Long BSN; //사업자등록번호

    @Column(name = "project_ids", columnDefinition = "longtext")
    @Convert(converter = StringListConverter.class)
    private List<String> projectIds; // 프로젝트 ID들 저장


    // 6자리 랜덤 숫자 생성(회원번호)
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
            // 회원가입시에 DONOR(후원자)로 기본값 생성
            this.activatedStatus = UserStatus.DONOR;
        }

        if (this.joinDate == null){
            this.joinDate = LocalDateTime.now();
        }
    }
}