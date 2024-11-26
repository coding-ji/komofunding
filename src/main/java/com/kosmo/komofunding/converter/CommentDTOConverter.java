package com.kosmo.komofunding.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kosmo.komofunding.common.dto.CommentDTO;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)  // 자동으로 모든 엔티티에 적용
public class CommentDTOConverter implements AttributeConverter<CommentDTO, String> {

    // ObjectMapper 설정을 개선합니다.
    private final ObjectMapper objectMapper;

    public CommentDTOConverter() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule()); // LocalDateTime을 처리하기 위한 모듈 등록
        objectMapper.configure(com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false); // 날짜 포맷 조정
    }

    @Override
    public String convertToDatabaseColumn(CommentDTO commentDTO) {
        if (commentDTO == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(commentDTO);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting CommentDTO to JSON", e);
        }
    }

    @Override
    public CommentDTO convertToEntityAttribute(String s) {
        if (s == null) {
            return null;
        }
        try {
            return objectMapper.readValue(s, CommentDTO.class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting JSON to CommentDTO", e);
        }
    }
}