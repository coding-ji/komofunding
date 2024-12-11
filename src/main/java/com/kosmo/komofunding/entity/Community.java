package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.enums.CommunityCategory;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "community")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Community {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "community_id", nullable = false, updatable = false)
    private String communityId; // 커뮤니티 ID

    @Column(name = "community_number", unique = true, nullable = false)
    private Integer communityNumber; // 6자리 글 번호 (수동 생성)

    @Enumerated(EnumType.STRING)
    @Column(name = "community_category", nullable = false)
    private CommunityCategory communityCategory; // 커뮤니티 카테고리

    @Column(name = "community_title", nullable = false)
    private String communityTitle; // 커뮤니티 제목

    @Column(name = "community_content", columnDefinition = "TEXT")
    private String communityContent; // 커뮤니티 내용

    @Column(name = "write_date", nullable = false)
    private LocalDateTime writeDate; // 작성일

    @Column(name = "updated_date")
    private LocalDateTime updatedDate; // 수정일

    @Column(name = "end_date")
    private LocalDateTime endDate; // 종료일

    @Column(name = "author", nullable = false)
    private String author; // 작성자

    @Column(name = "is_hidden", nullable = false)
    private Boolean isHidden; // 숨김 여부

    // 추가: Admin과의 연관 관계
    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false) // admin_id가 FK로 설정됨
    private Admin admin;




    @PrePersist
    public void prePersist() {
        if (this.writeDate == null) {
            this.writeDate = LocalDateTime.now(); // 기본값으로 현재 시간 설정
        }
    }
}