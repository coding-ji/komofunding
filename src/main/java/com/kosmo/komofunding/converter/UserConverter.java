package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserConverter {
    @Autowired
    ProjectService projectService;

    public User convertToEntity(UserInDTO userInDTO) {
        User user = new User();
        user.setUserId(userInDTO.getUserId());
        user.setUserNumber(userInDTO.getUserNumber());
        user.setActivatedStatus(userInDTO.getActivatedStatus());
        user.setDeactivationReason(userInDTO.getDeactivationReason());
        user.setEmail(userInDTO.getEmail());
        user.setPassword(userInDTO.getPassword());
        user.setName(userInDTO.getName());
        user.setNickName(userInDTO.getNickName());
        user.setPhoneNumber(userInDTO.getPhoneNumber());
        user.setShortDescription(userInDTO.getShortDescription());
        user.setBankName(userInDTO.getBankName());
        user.setAccountNumber(userInDTO.getAccountNumber());
        user.setAccountHolder(userInDTO.getAccountHolder());
        user.setJoinDate(userInDTO.getJoinDate());
        user.setCorporationName(userInDTO.getCorporationName());
        user.setCorporationTel(userInDTO.getCorporationTel());
        user.setBSN(userInDTO.getBSN());
        userInDTO.setProjectIds(user.getProjectIds());
        return user;
    }

    public UserInDTO convertToDTO(User user) {
        UserInDTO userInDTO = new UserInDTO();
        userInDTO.setUserId(user.getUserId());
        userInDTO.setUserNumber(user.getUserNumber());
        userInDTO.setActivatedStatus(user.getActivatedStatus());
        user.setDeactivationReason(userInDTO.getDeactivationReason());
        userInDTO.setEmail(user.getEmail());
        userInDTO.setPassword(user.getPassword()); // InDTO는 비밀번호 포함
        userInDTO.setName(user.getName());
        userInDTO.setNickName(user.getNickName());
        userInDTO.setPhoneNumber(user.getPhoneNumber());
        userInDTO.setShortDescription(user.getShortDescription());
        userInDTO.setBankName(user.getBankName());
        userInDTO.setAccountNumber(user.getAccountNumber());
        userInDTO.setAccountHolder(user.getAccountHolder());
        userInDTO.setJoinDate(user.getJoinDate());
        userInDTO.setCorporationName(user.getCorporationName());
        userInDTO.setCorporationTel(user.getCorporationTel());
        userInDTO.setBSN(user.getBSN());
        userInDTO.setProjectIds(user.getProjectIds());
        return userInDTO;
    }

    public UserOutDTO convertToOutDTO(User user) {
        List<ProjectOutDTO> projectOutDTOs = projectService.findProjectsByProjectIds(user.getProjectIds());


        UserOutDTO userOutDTO = new UserOutDTO();
        userOutDTO.setUserNumber(user.getUserNumber());
        userOutDTO.setActivatedStatus(user.getActivatedStatus());
        userOutDTO.setDeactivationReason(user.getDeactivationReason());
        userOutDTO.setEmail(user.getEmail());
        userOutDTO.setName(user.getName());
        userOutDTO.setNickName(user.getNickName());
        userOutDTO.setPhoneNumber(user.getPhoneNumber());
        userOutDTO.setShortDescription(user.getShortDescription());
        userOutDTO.setBankName(user.getBankName());
        userOutDTO.setAccountNumber(user.getAccountNumber());
        userOutDTO.setAccountHolder(user.getAccountHolder());
        userOutDTO.setJoinDate(user.getJoinDate());
        userOutDTO.setCorporationName(user.getCorporationName());
        userOutDTO.setCorporationTel(user.getCorporationTel());
        userOutDTO.setBSN(user.getBSN());
        userOutDTO.setProjects(projectOutDTOs);
        return userOutDTO;
    }
}