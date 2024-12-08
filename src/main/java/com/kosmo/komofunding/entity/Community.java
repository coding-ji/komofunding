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

    @Enumerated(EnumType.STRING)
    @Column(name = "community_category", nullable = false)
    private CommunityCategory communityCategory; // 커뮤니티 카테고리

    @Column(name = "community_title", nullable = false)
    private String communityTitle; // 커뮤니티 제목

    @Column(name = "community_content", columnDefinition = "TEXT")
    private String communityContent; // 커뮤니티 내용

    @Column(name = "write_date", nullable = false)
    private LocalDateTime writeDate; // 작성일

    @Column(name = "author", nullable = false)
    private String author; // 작성자
}