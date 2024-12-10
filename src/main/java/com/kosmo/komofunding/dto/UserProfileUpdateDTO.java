package com.kosmo.komofunding.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
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


    public String getCorporationTel() {
        return null;
    }

    public String getShortDescription() {
        return null;
    }

    public String getAccountNumber() {
        return null;
    }

    public String getAccountHolder() {
        return null;
    }
}
