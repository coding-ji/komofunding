package com.kosmo.komofunding.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.List;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        try {
            if (attribute == null) {
                return null; // null 처리
            }
            return objectMapper.writeValueAsString(attribute); // List<String> -> JSON String으로 변환
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting list to database column", e);
        }
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        try {
            if (dbData == null || dbData.isEmpty()) {
                return List.of(); // null 또는 빈 문자열일 경우 빈 리스트 반환
            }
            return objectMapper.readValue(dbData, objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
        } catch (JsonProcessingException e) {
            // JSON 형식이 잘못된 경우 로깅하고 빈 리스트 반환
            System.err.println("잘못된 JSON 형식: " + dbData);
            return List.of(); // 빈 리스트 반환
        } catch (Exception e) {
            throw new IllegalArgumentException("데이터베이스 컬럼을 리스트로 변환하는 중 오류 발생", e);
        }
//
//        try {
//            if (dbData == null || dbData.isEmpty()) {
//                return List.of(); // null이나 빈 문자열은 빈 리스트로 처리
//            }
//            return objectMapper.readValue(dbData, objectMapper.getTypeFactory().constructCollectionType(List.class, String.class));
//        } catch (Exception e) {
//            throw new IllegalArgumentException("Error converting database column to list", e);
//        }
    }
}