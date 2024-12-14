package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.CommunityOutDTO;
import com.kosmo.komofunding.entity.Community;

public class convertToOutDTO {

    private CommunityOutDTO convertToOutDTO(Community community) {
        System.out.println("Converting Community: " + community);
        return CommunityOutDTO.builder()
                .communityNumber(community.getCommunityNumber())
                .communityCategory(community.getCommunityCategory())
                .communityTitle(community.getCommunityTitle())
                .communityContent(community.getCommunityContent())
                .writeDate(community.getWriteDate())
                .updatedDate(community.getUpdatedDate())
                .endDate(community.getEndDate())
                .author(community.getAdmin().getAdminNickname()) // Admin 닉네임 반환
                .isHidden(community.getIsHidden())
                .url("/posts/community/" + community.getCommunityId())
                .build();
    }

}
