package com.kosmo.komofunding.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosmo.komofunding.common.dto.CommentDTO;
import jakarta.persistence.AttributeConverter;

public class CommentDTOConverter implements AttributeConverter<CommentDTO, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(CommentDTO commentDTO) {
        if(commentDTO == null){
            return null;
        }
        try{
            return objectMapper.writeValueAsString(commentDTO);
        }catch(JsonProcessingException e){
            throw new IllegalArgumentException("Error converting CommentDTO to JSON",e);
        }
        }


    @Override
    public CommentDTO convertToEntityAttribute(String s) {
        if(s==null){
            return null;
        }
        try{
            return objectMapper.readValue(s, CommentDTO.class);
        }catch(JsonProcessingException e){
            throw new IllegalArgumentException("Error converting JSON to CommentDTO",e);
        }
    }
}
