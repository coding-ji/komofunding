package com.kosmo.komofunding.service;

import com.kosmo.komofunding.converter.ProjectConverter;
import com.kosmo.komofunding.converter.UserConverter;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserConverter userConverter;  // Converter 클래스 주입

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectConverter projectConverter; // 프로젝트 컨버터 사용


    // 사용자와 그들의 프로젝트들을 반환
    public UserOutDTO getUserProjects(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userConverter.convertToOutDTO(user);
    }



    // UUID로 사용자 찾기
    public UserInDTO findUserByUserId(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with userId: " + userId));

        return userConverter.convertToDTO(user);
    }


    // 사용자 생성
    public UserInDTO createUser(UserInDTO userDTO) {
        // DTO를 엔티티로 변환
        User user = userConverter.convertToEntity(userDTO);
        // 사용자 저장
        user = userRepository.save(user);
        // 엔티티를 DTO로 변환하여 반환
        return userConverter.convertToDTO(user);
    }


    // Nickname으로 사용자 찾기
    public UserOutDTO findUserByNickName(String nickname) {
        // nickname을 기준으로 User 객체를 조회
        User user = userRepository.findByNickName(nickname)
                .orElseThrow(() -> new RuntimeException("User not found with nickname: " + nickname));

        // User 객체를 UserOutDTO로 변환하여 반환
        return userConverter.convertToOutDTO(user);
    }

    public UUID authenticate(String email, String password) {
        // DB에서 사용자 조회
        User user = userRepository.findByEmailAndPassword(email, password).orElse(null);

        if (user != null) {
            return user.getUserId();  // 사용자 UUID 반환
        }
        return null;  // 로그인 실패
    }


}