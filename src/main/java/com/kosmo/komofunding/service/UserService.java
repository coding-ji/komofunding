package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    //User 저장
    public User saveUser(User user) {
        return userRepository.save(user); // User 저장
    }

    // userid로 찾기
    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }
}