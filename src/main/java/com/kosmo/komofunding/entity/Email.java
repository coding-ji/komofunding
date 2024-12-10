package com.kosmo.komofunding.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "EMAIL")
@Getter
@Setter
public class Email {
    @Id
    @Column(name = "email", nullable = false)
    private String email; // 이메일 주소

    @Column(name = "verification_code", nullable = false)
    private String verificationCode; // 인증 코드

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt; // 인증 코드 생성 시간
}
