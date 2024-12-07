package com.kosmo.komofunding.dto;
// 서버가 클라이언트에 응답할 때 사용
// 클라이언트한테 필요한 정보만 반환
// 민감한 정보 반환 되지 않게 필터링


import com.kosmo.komofunding.common.enums.UserStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserOutDTO {
    private Long userNum;
    private String email;
    private String name;
    private String nickName;
    private String phoneNumber;
    private String profileImg;
    private String shortDescription;
    private UserStatus activatedStatus;
    private String deactivationReason;
    private LocalDateTime deactivationDate;
    private LocalDateTime joinDate;
    private LocalDateTime lastLoginTime;
    private List<String> projectIds;
}
