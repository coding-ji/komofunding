package com.kosmo.komofunding.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosmo.komofunding.common.dto.ItemDTO;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

@Converter
public class ItemListConverter implements AttributeConverter<List<ItemDTO>, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<ItemDTO> items) {
        if (items == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(items);
        }catch(JsonProcessingException e){
            throw new IllegalArgumentException("JSON writing error", e);
        }
    }

    @Override
    public List<ItemDTO> convertToEntityAttribute(String s) {
       if (s == null || s.isEmpty()) {
           return new ArrayList<>();
       }
       try{
           return objectMapper.readValue(s, objectMapper.getTypeFactory().constructCollectionType(List.class, ItemDTO.class));
       }catch(JsonProcessingException e){
           throw new IllegalArgumentException("JSON reading error", e);
       }
    }
}
