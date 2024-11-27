package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.converter.StringListConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ADMIN")
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "admin_id", nullable = false, updatable = false)
    private String adminId; //관리자 ID

    @Column(name = "admin_nickname")
    private String adminNickname; //관리자 별명

    @Column(name = "admin_email", nullable = false, updatable = false)
    private String adminEmail; // 관리자 이메일

    @Column(name = "admin_pw", nullable = false)
    private String adminPw; //관리자 비밀번호

    @Column(name = "admin_join_date", nullable = false, updatable = false)
    private LocalDateTime adminJoinDate; // 관리자 생성날짜

    @Convert(converter = StringListConverter.class)
    @Column(name = "notice_id_list")
    private List<String> noticeIdList; // 관리자 글 리스트(공지사항/이벤트 글)

    // 엔티티가 저장되기 전에 값 설정 ----> 나중에 service 생성하면서 save 할때 !!!!!
    @PrePersist
    public void setProjectDefaults() {
        if(this.adminJoinDate == null){
            this.adminJoinDate = LocalDateTime.now();
        }
    }
}
