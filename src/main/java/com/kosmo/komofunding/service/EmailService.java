package com.kosmo.komofunding.service;

import com.kosmo.komofunding.entity.Email;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.EmailRepository;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
public class EmailService {

    @Autowired
    private EmailRepository emailRepository;
    @Autowired
    private JavaMailSender mailSender;
    private static final String senderEmail= "k93305@gmail.com";

    // 랜덤 인증 코드 생성
    private String generateVerificationCode() {
        return String.format("%06d", (int) (Math.random() * 1000000));
    }

    // 회원가입 인증코드 전송
    public MimeMessage sendVerificationCode(String email) {
        String verificationCode = generateVerificationCode();

        // 이메일이 없으면 새로 생성
        Email emailEntity = emailRepository.findByEmail(email).orElse(new Email());

        // 이메일 엔티티 설정
        emailEntity.setEmail(email);
        emailEntity.setVerificationCode(verificationCode);
        emailEntity.setCreatedAt(LocalDateTime.now());

        // 이메일 저장
        emailRepository.save(emailEntity);

        MimeMessage message = mailSender.createMimeMessage();

        // 이메일 전송 코드
        try {
            message.setFrom(senderEmail);
            // 수신자 설정
            message.setRecipients(MimeMessage.RecipientType.TO, email);

            // 제목 설정
            message.setSubject("회원가입 인증 코드");

            // 본문 설정
            String body = "<p>회원가입을 위한 인증 코드입니다.</p><p>인증 코드: <strong>" + verificationCode + "</strong></p>";
            message.setText(body,"UTF-8", "html");  // HTML 형식의 텍스트 설정

        } catch (Exception e) {
            e.printStackTrace();  // 로그를 좀 더 상세하게 남기기
        }
        return message;
    }

    // 이메일 전송 로직 분리
    private boolean sendEmail(String email, String verificationCode) {
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
    public boolean verifyCode(String email, String inputCode) {
        Optional<Email> optionalEmail = emailRepository.findByEmail(email);

        if (optionalEmail.isPresent()) {
            Email emailEntity = optionalEmail.get();
            // 만료 시간 검증 (예: 5분)
            if (emailEntity.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(5))) {
                return false; // 만료됨
            }
            // 인증 코드 일치 여부 검증
            return emailEntity.getVerificationCode().equals(inputCode);
        }
        return false; // 이메일 정보 없음
    }
}