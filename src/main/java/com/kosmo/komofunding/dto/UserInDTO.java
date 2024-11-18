package com.kosmo.komofunding.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kosmo.komofunding.common.enums.UserStatus;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInDTO {
    private UUID userId;
    private Long userNumber;
    private UserStatus activatedStatus;
    private String deactivationReason;
    private String email;
    private String password;
    private String name;
    private String nickName;
    private String phoneNumber;
    private String shortDescription;
    private String bankName;
    private String accountNumber;
    private String accountHolder;
    private LocalDateTime joinDate;
    private String corporationName;
    private String corporationTel;
    private Long BSN;
    private List<UUID> projectIds; // 프로젝트 ID 목록만 포함
}