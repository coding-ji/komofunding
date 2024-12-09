package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import com.kosmo.komofunding.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, String> {


    // 카테고리별 커뮤니티 조회
    List<Community> findByCommunityCategory(CommunityCategory category);

    // 숨김 여부로 조회
    List<Community> findByIsHidden(boolean isHidden);

    // communityNumber의 최대값 조회
    @Query("SELECT MAX(c.communityNumber) FROM Community c")
    Integer findMaxCommunityNumber();
}