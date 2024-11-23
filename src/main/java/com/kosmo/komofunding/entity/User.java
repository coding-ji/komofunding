package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.enums.UserStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Entity
@Table(name = "USER")  // 명시적으로 테이블 이름을 USER로 지정
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId;  //자동 생성되는 유저고유ID

    @Column(nullable = false, unique = true)
    private Long userNumber; //자동 생성되는 유저번호

    @Column(nullable = false, unique = true, length = 100)
    private String email; // 유저 이메일 및 유저 로그인시 아이디

    @Column(nullable = false)
    private String password; // 유저비밀번호

    @Column(nullable = false, length = 20)
    private String name;  // 유저이름

    @Column(nullable = false, unique = true, length = 20)
    private String nickName;  // 유저별명

    @Column(nullable = false, unique = true, length = 20)
    private String phoneNumber; // 유저 핸드폰번호

    @Column(length = 255)
    private String profileImageUrl; // 프로필 이미지 URL

    @Column(length = 80)
    private String shortDescription; //유저 짧은 소개글

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "varchar(255) default 'DONOR'")
    private UserStatus activatedStatus;  // 유저의 활동(후원자, 제작자대기, 제작자), 탈퇴, 정지상태

    @Column(length = 200)
    private String deactivationReason; // 유저 탈퇴 혹은 정지 사유

    private LocalDateTime deactivationDate; // 탈퇴 날짜

    @Column(length = 50)
    private String bankName; //은행명

    @Column(length = 50)
    private String accountNumber; //은행계좌번호

    @Column(length = 50)
    private String accountHolder; //예금주

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime joinDate;  //가입날짜

    private LocalDateTime lastLoginTime; // 최종 로그인 시간

    @Column(length = 100)
    private String corporationName; //사업자명

    @Column(length = 100)
    private String corporationTel; //사업자번호

    @Column(length = 100)
    private Long BSN; //사업자등록번호

    @Column(columnDefinition = "longtext")
    private List<String> projectUids; // 프로젝트 ID들 저장


    // 6자리 랜덤 숫자 생성(회원번호)
    private Long generateRandomNumber() {
        Random random = new Random();
        return 100000L + random.nextInt(900000); // 100000~999999 사이의 랜덤 숫자 생성
    }

    // 엔티티가 저장되기 전에 값 설정
    @PrePersist
    public void setUserDefaults() {
        if (this.userNumber == null) {
            // 회원번호 랜덤으로 숫자 생성
            this.userNumber = generateRandomNumber();
        }

        if (this.activatedStatus == null) {
            // 회원가입시에 DONOR(후원자)로 기본값 생성
            this.activatedStatus = UserStatus.DONOR;
        }
    }
}