package com.kosmo.komofunding.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatorSwitchResponseDTO {
    private String message;  // 처리 결과 메시지

    public CreatorSwitchResponseDTO(String message) {
        this.message = message;
    }
}
