package com.kosmo.komofunding.service;

import com.kosmo.komofunding.common.enums.UserStatus;
import com.kosmo.komofunding.dto.UserInDTO;
import com.kosmo.komofunding.dto.UserOutDTO;
import com.kosmo.komofunding.dto.*;
import com.kosmo.komofunding.entity.Admin;
import com.kosmo.komofunding.entity.Email;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.AdminRepository;
import com.kosmo.komofunding.repository.EmailRepository;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static com.kosmo.komofunding.dto.Valid.password;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailRepository emailRepository;
    private final AdminRepository adminRepository;


    // 랜덤 인증 코드 생성
    private String generateVerificationCode() {
        return String.format("%06d", (int) (Math.random() * 1000000));
    }

    // 이메일 인증 코드 발송 및 저장
    private void sendVerificationEmail(String email) {
        String verificationCode = generateVerificationCode();

        // 인증 코드 데이터베이스에 저장
        Email emailEntity = new Email();
        emailEntity.setEmail(email);
        emailEntity.setVerificationCode(verificationCode);
        emailEntity.setCreatedAt(LocalDateTime.now());

        emailRepository.save(emailEntity);
    }

    // 이메일 인증 코드 검증
    public boolean verifyEmailCode(String email, String inputCode) {
        Optional<Email> emailEntity = emailRepository.findByEmail(email);
        if (emailEntity.isPresent()) {
            String storedCode = emailEntity.get().getVerificationCode();
            return storedCode.equals(inputCode);
        }
        return false;
    }

    // 매일 자정에 만료된 인증 코드 삭제
    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteExpiredVerificationCodes() {
        LocalDateTime currentTime = LocalDateTime.now();
        emailRepository.deleteExpiredVerificationCodes(currentTime);
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
    public UserOutDTO registerUser(@Valid UserInDTO userInDTO) {
        if (userRepository.findByEmail(userInDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(userInDTO.getPassword());
        userInDTO.setPassword(encryptedPassword);

        User user = new User();
        // userInDTO를 User 엔티티로 변환
        user.setName(userInDTO.getName());
        user.setNickName(userInDTO.getNickName());
        user.setEmail(userInDTO.getEmail());
        user.setPassword(userInDTO.getPassword());
        user.setPhoneNumber(userInDTO.getPhoneNumber());

        // 기본 프로필 이미지 URL 설정
        user.setProfileImg("http://localhost:8080/images/defaultImg.png");

        userRepository.save(user);

        // User 엔티티를 UserOutDTO로 변환
        UserOutDTO userOutDTO = UserOutDTO.builder()
                .userNum(user.getUserNum())
                .email(user.getEmail())
                .name(user.getName())
                .nickName(user.getNickName())
                .phoneNumber(user.getPhoneNumber())
                .profileImg(user.getProfileImg())
                .shortDescription(user.getShortDescription())
                .activatedStatus(user.getActivatedStatus())
                .deactivationReason(user.getDeactivationReason())
                .deactivationDate(user.getDeactivationDate())
                .joinDate(user.getJoinDate())
                .lastLoginTime(user.getLastLoginTime())
                .projectIds(user.getProjectIds())
                .build();


        return userOutDTO;
    }



    // 로그인
    @Transactional
    public Map<String, String> login(String email, String password, HttpSession session) {
        // Admin에서 먼저 검색
        Admin admin = adminRepository.findByAdminEmail(email);
        if (admin != null) {
            // Admin 로그인 로직
            if (password == admin.getAdminPw()) {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            }

            // 세션에 Admin ID 저장
            session.setAttribute("adminId", admin.getAdminId());

            // 응답 생성
            Map<String, String> response = new HashMap<>();
            response.put("sessionId", session.getId());
            response.put("role", "admin");
            return response;
        }

        // Admin에서 찾지 못하면 User에서 검색
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        // 비밀번호 확인
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 세션 생성 및 사용자 데이터 저장
        session.setAttribute("userId", user.getUserId()); // 세션에 사용자 ID 저장

        // 세션 ID 반환
        String sessionId = session.getId();

        // 클라이언트로 반환할 데이터 준비
        Map<String, String> response = new HashMap<>();
        response.put("sessionId", sessionId); // 세션 ID
        response.put("role", "user");
        response.put("userNum", user.getUserNum().toString()); // 유저 번호 로컬스토리지에 저장

        return response; // 세션 ID 포함 응답
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
    public boolean deleteUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // 비밀번호 검증
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new IllegalArgumentException("비밀번호가 올바르지 않습니다.");
            }

            // 상태를 비활성화로 변경 (회원 탈퇴 처리)
            user.setActivatedStatus(UserStatus.DEACTIVATED);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    // 사용자 이메일로 조회
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);  // Optional 반환
    }

    // 사용자 번호로 조회
    public Optional<User> getUserByUserNum(Long userNum){
        return userRepository.findByUserNum(userNum);
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

    // 비밀 번호 검증
    public boolean verifyPassword(Long userNum, String password) {
        // userNum이 null인지 확인
        if (userNum == null) {
            throw new IllegalArgumentException("사용자가 지정되지 않았습니다.");
        }

        // 사용자 조회
        User user = userRepository.findByUserNum(userNum)
                .orElseThrow(() -> new IllegalArgumentException("사용자가 존재하지 않습니다."));

        // 비밀번호 검증
        if (password == null || !passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("userNum: " + userNum);
            System.out.println("password: " + password);
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return true;
    }

    // 로그인 정지 상태 확인
    public String getSuspensionReason(String email) {
        // 이메일로 사용자 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        // 비밀번호 확인
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 로그인 정지 상태 확인
        if (user.getActivatedStatus() == UserStatus.SUSPENDED) {
            return "사용자가 정지되었습니다.";
        }

        return null; // 정상 로그인
    }

    public User getUserInfoByEmail(String email) {
        // 이메일로 사용자 조회
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다"));
    }

    // 사용자 정보 조회
    public Map<String, String> getUserProfile(Long userNum) {
        // 이메일로 사용자 조회
        User user = userRepository.findByUserNum(userNum)
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다"));


        // 반환할 사용자 정보 Map에 저장
        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("profileImage", user.getProfileImg());    // 프로필 이미지 URL
        userDetails.put("userNum", String.valueOf(user.getUserNum()));              // 유저 Num
        userDetails.put("nickName", user.getNickName());          // 유저 닉네임
        userDetails.put("userRole", user.getActivatedStatus().toString());  // 유저 역할 (후원자, 제작자 등)
        userDetails.put("shortDescription", user.getShortDescription()); // 짧은 소개글
        userDetails.put("name", user.getName());
        userDetails.put("phoneNumber", user.getPhoneNumber());
        userDetails.put("bankName", user.getBankName());
        userDetails.put("accountNumber", user.getAccountNumber());
        userDetails.put("accountHolder", user.getAccountHolder());
        userDetails.put("BSN", String.valueOf(user.getBSN()));
        userDetails.put("password", user.getPassword());

        return userDetails;
    }

    // 프로필 페이지 수정 내용
    // 비밀번호 검증
//    public boolean verifyPassword(Long userNum, String password) {
//        try {
//            User user = userRepository.findByUserNum(userNum)
//                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
//
//            // 로그 추가
//            System.out.println("User found: " + user.getEmail());
//
//            return passwordEncoder.matches(password, user.getPassword());
//        } catch (IllegalArgumentException e) {
//            // 예외 로그
//            System.err.println("Error verifying password: " + e.getMessage());
//            throw e;
//        }
//    }

    // 프로필 업데이트
    public User updateUserProfile(Long userNum, UserProfileUpdateDTO request) {
        User user = userRepository.findByUserNum(userNum)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 비밀번호 검증 (비밀번호가 변경되는 경우)
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            }
        }

        // 요청 데이터를 기반으로 사용자 프로필 업데이트
        if (request.getProfileImage() != null) {
            user.setProfileImg(request.getProfileImage());
        }
        if (request.getNickName() != null) {
            user.setNickName(request.getNickName());
        }
        if (request.getShortDescription() != null) {
            user.setShortDescription(request.getShortDescription());
        }
        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getBankName() != null) {
            user.setBankName(request.getBankName()); // 수정 필요 시 반영
        }
        if (request.getAccountNumber() != null) {
            user.setAccountNumber(request.getAccountNumber());
        }
        if (request.getAccountHolder() != null) {
            user.setAccountHolder(request.getAccountHolder());
        }
        if (request.getCorporationName() != null) {
            user.setCorporationName(request.getCorporationName());
        }
        if (request.getCorporationTel() != null) {
            user.setCorporationTel(request.getCorporationTel());
        }
        if (request.getBSN() != null) {
            user.setBSN(request.getBSN());
        }

        userRepository.save(user); // 업데이트된 정보 저장

        return user; // 수정된 사용자 객체 반환
    }

//    // 제작자 전환 신청 처리
//    public CreatorSwitchResponseDTO applyForCreatorSwitch(CreatorSwitchRequestDTO requestDTO) {
//        // 이메일을 기준으로 사용자 조회
//        User user = userRepository.findByEmail(requestDTO.getEmail())
//                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
//
//        // 제작자 전환 신청 상태 업데이트
//        user.setCreatorSwitchStatus(CreatorSwitchStatus.PENDING);  // 신청 상태를 PENDING으로 설정
//
//        // 추가 필드들 설정
//        user.setRequestImage(requestDTO.getRequestImage());  // 신청 이미지 URL
//        user.setPrivacyAgreement(requestDTO.isPrivacyAgreement());  // 개인정보 동의 여부
//        user.setApplicationDate(LocalDateTime.now());  // 신청일: 현재 시간으로 설정
//
//        // 변경된 사용자 정보 저장
//        userRepository.save(user);
//
//        return new CreatorSwitchResponseDTO("계정 전환 신청이 완료되었습니다.");
//    }

    }
