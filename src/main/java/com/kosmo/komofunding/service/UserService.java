package com.kosmo.komofunding.service;

import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import com.kosmo.komofunding.common.enums.UserStatus;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;

    // 랜덤 인증 코드 생성
    private String generateVerificationCode() {
        return String.format("%06d", (int) (Math.random() * 1000000));
    }

    // 랜덤 비밀번호 생성
    private String generateRandomPassword() {
        int length = 12;
        String charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        Random random = new Random();
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < length; i++) {
            password.append(charSet.charAt(random.nextInt(charSet.length())));
        }
        return password.toString();
    }

    // 회원가입
    @Transactional
    public UserOutDTO registerUser(@Valid User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());

        // User 엔티티로 매핑
        user.setPassword(encryptedPassword);
        userRepository.save(user);

        return modelMapper.map(user, UserOutDTO.class);
    }

    // 인증 코드 전송
    public boolean sendVerificationCode(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 이메일입니다.");
        }

        String verificationCode = generateVerificationCode();
        User user = userOptional.get();
        user.setVerificationCode(verificationCode);
        userRepository.save(user);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setTo(email);
            helper.setSubject("인증 코드");
            helper.setText("인증 코드는 다음과 같습니다: " + verificationCode);
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            log.error("이메일 전송 실패: {}", e.getMessage());
            return false;
        }
    }

    // 이메일 인증 코드 검증
    public boolean verifyEmailCode(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        return user.getVerificationCode() != null && user.getVerificationCode().equals(code);
    }

    // 로그인
    public UserOutDTO login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        return modelMapper.map(user, UserOutDTO.class);
    }

    // 비밀번호 재설정
    public boolean resetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        String newPassword = generateRandomPassword();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // 이메일로 새 비밀번호 전송
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setTo(email);
            helper.setSubject("비밀번호 재설정");
            helper.setText("새로운 비밀번호는 다음과 같습니다: " + newPassword);
            mailSender.send(message);
            return true;
        } catch (Exception e) {
            log.error("비밀번호 재설정 이메일 전송 실패: {}", e.getMessage());
            return false;
        }
    }

    // 회원 탈퇴
    public boolean deleteUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setActivatedStatus(UserStatus.DEACTIVATED);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // 사용자 이메일로 조회
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    // 이름과 전화번호로 이메일 찾기
    public String findEmailByNameAndPhoneNumber(String name, String phoneNumber) {
        User user = userRepository.findByNameAndPhoneNumber(name, phoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("이름과 전화번호로 사용자를 찾을 수 없습니다."));
        return user.getEmail();
    }

    // 비밀번호 변경
    public boolean updatePassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
    }

    // 로그인 정지 상태 확인
    public String getSuspensionReason(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        // 로그인 정지 상태 확인 (이 부분은 예시입니다)
        if (user.getActivatedStatus() == UserStatus.SUSPENDED) {
            return "사용자가 정지되었습니다.";
        }
        return null; // 정상 로그인
    }



// 마이페이지 정보 제공
    public Map<String, String> getMyPageInfo(String email) {
        // 이메일로 사용자 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

        // 마이페이지 정보 구성
        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("userId", user.getUserId());
        userDetails.put("nickName", user.getNickName());
        userDetails.put("profileImg", user.getProfileImg());
        userDetails.put("userRole", user.getActivatedStatus().toString()); // 역할 정보 추가
        return userDetails;
    }

    // 사용자 프로필 조회
    public UserOutDTO getUserProfile(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

        // User -> UserOutDTO로 변환
        return modelMapper.map(user, UserOutDTO.class);
    }
}