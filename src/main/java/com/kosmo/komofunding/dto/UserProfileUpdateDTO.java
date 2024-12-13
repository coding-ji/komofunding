package com.kosmo.komofunding.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileUpdateDTO {
    private String profileImage;
    private String nickName;
    private Long userNum;
    private String email;
    private String name;
    private String shortDescription;
    private String password;
    private String phoneNumber;
    private String bankName;
    private String accountNumber;
    private String accountHolder;
    private String corporationName;
    private String corporationTel;
    private Long BSN;

    private String newPassword;
    private String confirmPassword;
}
