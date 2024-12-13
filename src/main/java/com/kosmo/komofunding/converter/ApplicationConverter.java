package com.kosmo.komofunding.converter;


import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.dto.ApplicationInDTO;
import com.kosmo.komofunding.dto.ApplicationOutDTO;
import com.kosmo.komofunding.entity.Application;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.ApplicationRepository;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ApplicationConverter {
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    // Entity에서 Dto 변환
    public ApplicationOutDTO applyDTO(Application application){
        // 사용자 정보 가져오기
        User user = userRepository.findById(application.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        return ApplicationOutDTO.builder()
                .userNum(user.getUserNum())
                .email(user.getEmail())
                .name(user.getName())
                .nickName(user.getNickName())
                .phoneNumber(user.getPhoneNumber())
                .joinDate(user.getJoinDate())
                .applicationImg(application.getApplicationImg())
                .build();
    }

    // Entity로 변환
    public Application applyEntity(ApplicationInDTO applicationInDTO, String userId){

        // 필요한 값들로 Application 엔티티 생성
        return Application.builder()
                .userId(userId)
                .approvalDate(applicationInDTO.getApprovalDate()) // 승인 날짜
                .rejectedDate(applicationInDTO.getRejectedDate()) // 거절 날짜
                .applicationImg(applicationInDTO.getApplicationImg()) // 신청 이미지
                .build();
    }
}

