package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;

public class UserConverter {
    public static UserOutDTO toOutDTO(User user){
        return UserOutDTO.builder()
//                .userid(user.getUserId())
                .nickName(user.getNickName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .shortDescription(user.getShortDescription())
                .build();
    }
}
