package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import com.kosmo.komofunding.dto.CommunityInDTO;
import com.kosmo.komofunding.dto.CommunityOutDTO;
import com.kosmo.komofunding.entity.Community;
import com.kosmo.komofunding.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;

    public List<CommunityOutDTO> getCommunitiesByCategory(CommunityCategory category) {
        List<Community> communities = communityRepository.findByCommunityCategory(category);
        return communities.stream()
                .map(this::convertToOutDTO)
                .collect(Collectors.toList());
    }

    public void createCommunity(CommunityInDTO communityInDTO) {
        Community community = Community.builder()
                .communityCategory(communityInDTO.getCommunityCategory())
                .communityTitle(communityInDTO.getCommunityTitle())
                .communityContent(communityInDTO.getCommunityContent())
                .writeDate(communityInDTO.getWriteDate())
                .author(communityInDTO.getAuthor())
                .build();
        communityRepository.save(community);
    }

    private CommunityOutDTO convertToOutDTO(Community community) {
        return CommunityOutDTO.builder()
                .communityCategory(community.getCommunityCategory())
                .communityTitle(community.getCommunityTitle())
                .writeDate(community.getWriteDate())
                .author(community.getAuthor())
                .build();
    }
}