package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user); // User 저장
    }
}