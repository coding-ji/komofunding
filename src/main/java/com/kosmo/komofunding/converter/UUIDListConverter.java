package com.kosmo.komofunding.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Converter
public class UUIDListConverter implements AttributeConverter<List<UUID>, String> {

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<UUID> attribute) {
        try {
            // List<UUID> -> JSON 문자열로 변환
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("Error converting List<UUID> to JSON", e);
        }
    }

    @Override
    public List<UUID> convertToEntityAttribute(String dbData) {
        try {
            // JSON 문자열 -> List<UUID>로 변환
            return objectMapper.readValue(dbData, objectMapper.getTypeFactory().constructCollectionType(List.class, UUID.class));
        } catch (IOException e) {
            throw new IllegalArgumentException("Error converting JSON to List<UUID>", e);
        }
    }
}