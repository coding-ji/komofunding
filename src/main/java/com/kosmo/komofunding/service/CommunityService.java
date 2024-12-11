package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import com.kosmo.komofunding.dto.CommunityInDTO;
import com.kosmo.komofunding.dto.CommunityOutDTO;
import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.entity.Community;
import com.kosmo.komofunding.repository.AdminRepository;
import com.kosmo.komofunding.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final AdminRepository adminRepository; // AdminRepository 추가


    public CommunityOutDTO getCommunityById(String communityId) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("커뮤니티 글을 찾을 수 없습니다."));
        return convertToOutDTO(community);
    }

    public List<CommunityOutDTO> getCommunitiesByCategory(CommunityCategory category) {
        List<Community> communities = communityRepository.findByCommunityCategory(category);
        return communities.stream()
                .map(this::convertToOutDTO)
                .collect(Collectors.toList());
    }


    public List<CommunityOutDTO> getAllCommunities() { // 모든 커뮤니티 데이터 가져오기 추가
        return communityRepository.findAll().stream()
                .map(this::convertToOutDTO)
                .collect(Collectors.toList());
    }

    public void createCommunity(CommunityInDTO communityInDTO) {
        // communityNumber 자동 증가 처리
        Integer maxCommunityNumber = communityRepository.findMaxCommunityNumber();
        int nextCommunityNumber = (maxCommunityNumber != null ? maxCommunityNumber : 0) + 1;

        // Admin 조회 (adminId는 String 타입)
        Admin admin = adminRepository.findById(communityInDTO.getAdminId())
                .orElseThrow(() -> new RuntimeException("Admin 정보를 찾을 수 없습니다."));

        Community community = Community.builder()
                .communityNumber(nextCommunityNumber)
                .communityCategory(communityInDTO.getCommunityCategory())
                .communityTitle(communityInDTO.getCommunityTitle())
                .communityContent(communityInDTO.getCommunityContent())
                .writeDate(LocalDateTime.now())
                .updatedDate(LocalDateTime.now())
                .author(admin.getAdminNickname()) // Admin의 닉네임 설정
                .admin(admin) // Admin 매핑
                .isHidden(communityInDTO.isHidden())
                .endDate(communityInDTO.getEndDate())
                .build();

        communityRepository.save(community);
    }

    public void updateCommunity(String communityId, CommunityInDTO communityInDTO) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new RuntimeException("커뮤니티 글을 찾을 수 없습니다."));
        community.setCommunityTitle(communityInDTO.getCommunityTitle());
        community.setCommunityContent(communityInDTO.getCommunityContent());
        community.setUpdatedDate(LocalDateTime.now());
        community.setIsHidden(communityInDTO.isHidden());
        community.setEndDate(communityInDTO.getEndDate());
        communityRepository.save(community);
    }

    public void deleteCommunity(String communityId) {
        if (!communityRepository.existsById(communityId)) {
            throw new RuntimeException("커뮤니티 글을 찾을 수 없습니다.");
        }
        communityRepository.deleteById(communityId);
    }

    private CommunityOutDTO convertToOutDTO(Community community) {
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