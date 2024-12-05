package com.kosmo.komofunding.config;

import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static sun.awt.image.MultiResolutionCachedImage.map;

@Configuration
public class WebConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // User -> UserInDTO 매핑 설정
        modelMapper.addMappings(new PropertyMap<User, UserInDTO>() {
            @Override
            protected void configure() {
                map(source.getEmail(), destination.getEmail());
                map(source.getName(), destination.getName());
                map(source.getNickName(), destination.getNickName());
                map(source.getPhoneNumber(), destination.getPhoneNumber());
                map(source.getProfileImg(), destination.getProfileImg());
                map(source.getShortDescription(), destination.getShortDescription());
                map(source.getActivatedStatus(), destination.getActivatedStatus());
                map(source.getBankName(), destination.getBankName());
                map(source.getAccountNumber(), destination.getAccountNumber());
                map(source.getAccountHolder(), destination.getAccountHolder());
                map(source.getCorporationName(), destination.getCorporationName());
                map(source.getCorporationTel(), destination.getCorporationTel());
                map(source.getBSN(), destination.getBSN());
                map(source.getProjectIds(), destination.getProjectIds());
            }
        });

        // User -> UserOutDTO 매핑 설정
        modelMapper.addMappings(new PropertyMap<User, UserOutDTO>() {
            @Override
            protected void configure() {
                map(source.getUserId(), destination.getUserid());
                map(source.getUserNum(), destination.getUserNum());
                map(source.getEmail(), destination.getEmail());
                map(source.getName(), destination.getName());
                map(source.getNickName(), destination.getNickName());
                map(source.getPhoneNumber(), destination.getPhoneNumber());
                map(source.getProfileImg(), destination.getProfileImg());
                map(source.getShortDescription(), destination.getShortDescription());
                map(source.getActivatedStatus(), destination.getActivatedStatus());
                map(source.getDeactivationReason(), destination.getDeactivationReason());
                map(source.getDeactivationDate(), destination.getDeactivationDate());
                map(source.getJoinDate(), destination.getJoinDate());
                map(source.getLastLoginTime(), destination.getLastLoginTime());
                map(source.getProjectIds(), destination.getProjectIds());
            }
        });

        return modelMapper;
    }
    // BCryptPasswordEncoder 빈 등록
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

