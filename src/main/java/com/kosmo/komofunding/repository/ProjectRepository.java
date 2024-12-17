package com.kosmo.komofunding.repository;

import com.kosmo.komofunding.common.enums.ProjectCategory;
import com.kosmo.komofunding.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {
    Optional<Project> findByProjectId(String projectId);
    // 프로젝트 글번호로 검색
    Optional<Project> findByProjectNum(Long projectNum);
    // 프로젝트 제목으로 검색 (정확히 일치)
    Optional<Project> findByTitle(String title);
    // 특정 사용자ID로 작성된 프로젝트 조회
    List<Project> findByUserId(String userId);
    // 작성일자가 일치하는 프로젝트 조회 (정확히 일치)
    List<Project> findByWrittenDate(LocalDateTime writtenDate);
    // 시작과 끝 날짜에 프로젝트 시작 날짜가 포함되어있는 프로젝트 조회
    List<Project> findByProjectStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    // 시작과 끝 날짜에 프로젝트 끝나는 날짜가 포함되어있는 프로젝트 조회
    List<Project> findByProjectEndDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    // 진행 중 프로젝트
    List<Project> findByProjectStartDateBeforeAndProjectEndDateAfter(LocalDateTime startDate, LocalDateTime endDate);
    // 마감된 프로젝트: 종료일이 오늘 이전인 프로젝트
    List<Project> findByProjectEndDateBefore(LocalDateTime today);
    // 프로젝트 카테고리로 프로젝트 조회
    List<Project> findByProjectCategory(ProjectCategory category);
    // 프로젝트 Id를 통해서 후원자 찾기
    List<Project> findSupportersIdListByProjectId(String projectId);
    // 프로젝트 제목에서 포함된 단어 찾기
    List<Project> findByTitleContaining(String keyword);
    // 프로젝트 존재여부 확인
    Boolean existsByProjectNum(Long projectNum);
    // isHidden 값으로 프로젝트 여부 찾기?
    List<Project> findByIsHidden(Boolean isHidden);

    // 온고잉이면 진행되는 것들이 사이에 , upcoming이면 시작되는게 지금보다 뒤에 !!
    @Query("SELECT p FROM Project p WHERE " +
            "((:fundingStatus = 'ONGOING' AND p.projectStartDate <= :now AND p.projectEndDate >= :now) " +
            "OR (:fundingStatus = 'UPCOMING' AND p.projectStartDate > :now) " +
            "OR (:fundingStatus = 'HOME')) " +
            "AND (:projectCategory = 'ALL' OR p.projectCategory = :projectCategory)")
    List<Project> findProjectsByCategoryAndFundingStatusAndDateRange(
            @Param("projectCategory") ProjectCategory projectCategory,
            @Param("fundingStatus") String fundingStatus,
            @Param("now") LocalDateTime now);

    @Query("SELECT p FROM Project p WHERE " +
            "(:fundingStatus = 'HOME' OR " + // fundingStatus가 'HOME'일 경우 모든 프로젝트 반환
            "(:fundingStatus = 'ONGOING' AND p.projectStartDate <= :now AND p.projectEndDate >= :now) " +
            "OR (:fundingStatus = 'UPCOMING' AND p.projectStartDate > :now))")
    List<Project> findProjectsByFundingStatus(@Param("fundingStatus") String fundingStatus, @Param("now") LocalDateTime now);
}
