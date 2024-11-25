package com.kosmo.komofunding.common.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDTO {
    private String userNickname;
    private String content;
    private LocalDateTime writtenDate;
    private LocalDateTime updatedDate;

    // writtenDate 기본값을 현재 시간으로 설정
    public CommentDTO() {
        this.writtenDate = LocalDateTime.now();
    }
}