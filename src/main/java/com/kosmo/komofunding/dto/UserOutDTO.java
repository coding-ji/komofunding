package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserOutDTO {
    private Long userNumber;
    private UserStatus activatedStatus;
    private String deactivationReason;
    private String email;
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
    private List<ProjectOutDTO> projects; // 프로젝트 정보 리스트

}
