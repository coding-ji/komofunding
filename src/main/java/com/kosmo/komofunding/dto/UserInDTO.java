package com.kosmo.komofunding.dto;
// 사용자가 서버에 데이터를 전송할 때 쓰는 DTO
// 클라이언트로 부터 입력받을 데이터만
// 비밀번호나 계좌 정보같은 민감한 정보는 별도의 로직이 필요할 수도 있음

import com.kosmo.komofunding.common.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInDTO {
    private String email;
    private String password;
    private String name;
    private String nickName;
    private Long userNum;
    private String phoneNumber;
    private String profileImg;
    private String shortDescription;
    private UserStatus activatedStatus;
    private String bankName;
    private String accountNumber;
    private String accountHolder;
    private String corporationName;
    private String corporationTel;
    private Long BSN;
    private List<String> projectIds;

    private String newPassword;
    private String confirmPassword;

}
