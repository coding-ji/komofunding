package com.kosmo.komofunding.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosmo.komofunding.common.dto.ItemDTO;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Converter
public class ItemListConverter implements AttributeConverter<List<ItemDTO>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<ItemDTO> items) {
        if (items == null) {
            return null; // items가 null인 경우
        }
        try {
            String json = objectMapper.writeValueAsString(items);  // List<ItemDTO>를 JSON 문자열로 변환
            return json;
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("JSON writing error", e);
        }
    }

    @Override
    public List<ItemDTO> convertToEntityAttribute(String s) {
        if (s == null || s.isEmpty()) {
            return new ArrayList<>();  // JSON이 null이거나 비어 있으면 빈 리스트 반환
        }
        try {
            List<ItemDTO> items = objectMapper.readValue(s, objectMapper.getTypeFactory().constructCollectionType(List.class, ItemDTO.class));
            return items;
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("JSON reading error", e);
        }
    }
}