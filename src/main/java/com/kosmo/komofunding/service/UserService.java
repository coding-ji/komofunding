package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.dto.Valid;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;

    // 랜덤 인증 코드 생성
    private String generateVerificationCode() {
        return String.format("%06d", (int) (Math.random() * 1000000));
    }

    // 매일 자정에 만료된 인증 코드 삭제
    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteExpiredVerificationCodes() {
        LocalDateTime currentTime = LocalDateTime.now();
        userRepository.deleteExpiredVerificationCodes(currentTime);
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
    public User registerUser(@Valid User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        userRepository.save(user);
        return user; // DTO 반환 대신 Entity 그대로 반환
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
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
        return user; // DTO 없이 Entity 반환
    }

    // 비밀번호 재설정
    public boolean resetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        String newPassword = generateRandomPassword();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

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

    // 비밀번호 인증
    public void verifyPassword(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        // 비밀번호 비교
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
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
}
