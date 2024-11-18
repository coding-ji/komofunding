package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.converter.UUIDListConverter;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(columnDefinition = "binary(16)", name = "user_id")
    private UUID userId;  //자동 생성되는 유저고유ID

    @Column(nullable = false, unique = true)
    private Long userNumber; // 유저번호

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "varchar(255) default 'DONOR'")
    private UserStatus activatedStatus;  // 유저의 활동(후원자, 제작자대기, 제작자), 탈퇴, 정지상태
    private String deactivationReason; // 유저 탈퇴 혹은 정지 사유

    @Column(nullable = false, unique = true)
    private String email; // 유저 이메일 및 유저 로그인시 아이디

    @Column(nullable = false)
    private String password; // 유저비밀번호

    private String name;  // 유저이름

    @Column(nullable = false, unique = true)
    private String nickName;  // 유저별명

    @Column(nullable = false, unique = true)
    private String phoneNumber; // 유저 핸드폰번호

    private String shortDescription; //유저 짧은 소개글
    private String bankName; //은행명
    private String accountNumber; //은행계좌번호
    private String accountHolder; //예금주

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime joinDate;  //가입날짜

    private String corporationName; //사업자명
    private String corporationTel; //사업자번호
    private Long BSN; //사업자등록번호

    @Convert(converter = UUIDListConverter.class)
    @Column(columnDefinition = "json")
    private List<UUID> projectIds; // 프로젝트 ID들만 저장



    // 6자리 랜덤 숫자 생성(회원번호)
    private Long generateRandomNumber() {
        Random random = new Random();
        return 100000L + random.nextInt(900000); // 100000~999999 사이의 랜덤 숫자 생성
    }

    // 엔티티가 저장되기 전에 필요한 값들을 설정하는 @PrePersist 메서드
    @PrePersist
    public void setUserDefaults() {
        if (this.userNumber == null) {
            // 6자리 랜덤 숫자 생성
            this.userNumber = generateRandomNumber();
        }

        // 엔티티가 저장되기 전에 activatedStatus 기본값 설정
        if (this.activatedStatus == null) {
            this.activatedStatus = UserStatus.DONOR;  // 기본값 설정
        }

        // email이 null일 경우 빈 문자열로 설정 (만약 기본값을 설정하려면 적절한 값으로 설정)
        if (this.email == null || this.email.isEmpty()) {
            this.email = "";  // 비어 있는 이메일을 빈 문자열로 설정
        }

        // 비밀번호가 null이거나 빈 문자열일 경우 기본값 설정
        if (this.password == null || this.password.isEmpty()) {
            this.password = "";  // 기본값을 빈 문자열로 설정 (보안상 해싱 처리 필요)
        }

        // nickName이 null일 경우 기본값 설정
        if (this.nickName == null || this.nickName.isEmpty()) {
            this.nickName = "defaultNickName";  // 기본값 설정 (적절한 기본값 설정)
        }

        // phoneNumber가 null일 경우 기본값 설정
        if (this.phoneNumber == null || this.phoneNumber.isEmpty()) {
            this.phoneNumber = "000-0000-0000";  // 기본값 설정 (유효한 번호로 설정해야 할 수도 있음)
        }

        // joinDate가 null일 경우 현재 시간으로 설정
        if (this.joinDate == null) {
            this.joinDate = LocalDateTime.now();  // 현재 시간 설정
        }
    }
}