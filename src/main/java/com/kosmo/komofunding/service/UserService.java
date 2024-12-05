package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;


    //User 저장
    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user); // User 저장
    }

    // userid로 찾기
    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    // 회원가입
    @Transactional
    public UserOutDTO registerUser(UserInDTO userInDTO) {
        User user = modelMapper.map(userInDTO, User.class);
        String hashedPassword = passwordEncoder.encode(userInDTO.getPassword());
        user.setPassword(hashedPassword);
        user.setJoinDate(LocalDateTime.now());
        userRepository.save(user);

        // 엔티티 -> UserOutDTO로 변환
        return modelMapper.map(user, UserOutDTO.class);
    }

    // 이메일 인증 로직
    public UserOutDTO sendVerificationCode(UserInDTO userInDTO) {
        String email = userInDTO.getEmail();

        // 인증번호 생성
        String verificationCode = generateVerificationCode1();

        System.out.println(verificationCode);

        try {
            // 이메일 전송
            sendVerificationCode(email, verificationCode);

            // 응답 데이터 준비
            UserOutDTO userOutDTO = new UserOutDTO();
            userOutDTO.setEmail(email);
            userOutDTO.setShortDescription("해당 이메일 사용이 가능합니다. 확인을 누르면 해당 메일로 인증번호가 전송됩니다.");

            return userOutDTO;
        } catch (Exception e) {
//            e.printStackTrace();
            log.error(e.getMessage());

            // 실패 응답 데이터 반환
            UserOutDTO errorResponse = new UserOutDTO();
            errorResponse.setEmail(email);
            errorResponse.setShortDescription("이메일 전송 실패: " + e.getMessage());

            return errorResponse;
        }
    }

    // 인증번호 생성
    public String generateVerificationCode1() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));  // 6자리 숫자
    }

    // 이메일 전송
    private void sendVerificationCode(String email, String verificationCode) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(email);
            helper.setSubject("이메일 인증 코드");
            helper.setText("귀하의 이메일 인증 번호는 " + verificationCode + "입니다.");

            System.out.println(verificationCode);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("이메일 전송 실패: " + e.getMessage());
        }
    }

    // 로그인
    // 이메일로 사용자 찾기
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 비밀번호 검증
    public boolean isPasswordCorrect(String password, User user) {
        // BCryptPasswordEncoder 사용하여 비밀번호 검증
        return passwordEncoder.matches(password, user.getPassword());
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 이메일로 사용자 찾기 (UserOutDTO 반환)
    public UserOutDTO getUserOutDTOByEmail(String email) {
        // 이메일을 기준으로 사용자 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다."));

        // User -> UserOutDTO로 변환
        return modelMapper.map(user, UserOutDTO.class);
    }

    // 회원탈퇴 로직
    @Transactional
    public boolean deleteUser(String userId) {
        // 사용자를 userId로 찾아오기
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            // 사용자를 찾을 수 없으면 false 반환
            return false;
        }

        // 탈퇴 처리
        user.setActivatedStatus(UserStatus.DEACTIVATED);
        user.setDeactivationDate(LocalDateTime.now());     // 탈퇴 날짜 설정
        // 개인정보 삭제
        user.setEmail(""); // 이메일 삭제
        user.setNickName(""); // 닉네임 삭제
        user.setProfileImg(""); // 프로필 이미지 삭제
        user.setShortDescription(""); // 설명 삭제
        user.setUserNum(user.getUserNum()); // 사용자 번호 어케 삭제함? 일단 유지
        user.setBSN(null); // 사업자 번호 삭제
        user.setAccountHolder(""); // 계좌주 삭제
        user.setAccountNumber(""); // 계좌번호 삭제
        user.setBankName(""); // 은행명 삭제
        user.setCorporationName(""); // 법인명 삭제
        user.setCorporationTel(""); // 법인 전화번호 삭제
        user.setDeactivationReason(""); // 탈퇴 사유 삭제

        // 탈퇴된 사용자의 정보는 그대로 두고, 활성화 상태만 변경
        userRepository.save(user);

        return true; // 탈퇴가 정상적으로 처리되었으면 true 반환
    }

    // 이름과 전화번호로 이메일을 찾는 로직
    public String findEmailByNameAndPhoneNumber(String name, String phoneNumber) {
        User user = userRepository.findByNameAndPhoneNumber(name, phoneNumber).orElse(null);

        return Objects.requireNonNull(user).getEmail();
    }


    // 인증 코드 생성
    public String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));  // 6자리 숫자
    }

    // 인증 코드 전송
    public void sendVerificationCode(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        String verificationCode = generateVerificationCode();
        user.setVerificationCode(verificationCode);
        userRepository.save(user);

        // 로그로 저장된 인증 코드 확인
        System.out.println("저장된 인증 코드: " + verificationCode);

        sendEmail(email, "인증 코드", "인증 코드는 " + verificationCode + " 입니다.");
    }

    // 비밀번호 재설정
    public String resetPassword(String email, String verificationCode) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && verificationCode.equals(user.getVerificationCode())) {
            String temporaryPassword = generateTemporaryPassword();
            String hashedTemporaryPassword = passwordEncoder.encode(temporaryPassword); // 비밀번호 해싱
            user.setPassword(hashedTemporaryPassword); // 해싱된 비밀번호 저장
            userRepository.save(user);

            sendEmail(email, "임시 비밀번호", "임시 비밀번호는 " + temporaryPassword + " 입니다.");
            return "임시비밀번호는 " + temporaryPassword + "입니다.";
        }
        return null;
    }

    // 임시 비밀번호 생성
    public String generateTemporaryPassword() {
        return "kosmo" + (int) (Math.random() * 10000); // 예: kosmo1234
    }

    // 이메일 전송
    public void sendEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("이메일 전송에 실패했습니다.");
        }
    }

    public void updatePassword(String email, String currentPassword, String newPassword) {
        // 이메일로 사용자 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 현재 비밀번호 검증
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        // 새 비밀번호 해싱 후 저장
        String hashedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedNewPassword);
        userRepository.save(user);
    }

    public void verifyPassword(String userId, String password) {
        // 사용자 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        // 비밀번호 일치 여부 확인
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    public String getSuspensionReason(String email, String password) {
        // 이메일로 사용자 조회 (존재하지 않으면 예외 발생)
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 비밀번호 확인
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 사용자 상태 확인 (정지 상태인 경우 정지 이유 반환)
        if (user.isSuspended()) {
            return "사기 계좌 때문에 정지 당했습니다."; // 예시 정지 이유
        }

        // 정상 사용자
        return "정상 로그인";
    }
}