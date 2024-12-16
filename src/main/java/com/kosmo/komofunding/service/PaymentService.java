package com.kosmo.komofunding.service;

import com.kosmo.komofunding.converter.PaymentConverter;
import com.kosmo.komofunding.dto.PaymentInDTO;
import com.kosmo.komofunding.dto.PaymentOutDTO;
import com.kosmo.komofunding.dto.ProjectOutDTO;
import com.kosmo.komofunding.entity.Payment;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.PaymentRepository;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PaymentService {
    private PaymentRepository paymentRepository;
    private PaymentConverter paymentConverter;
    private ProjectRepository projectRepository;
    private UserRepository userRepository;
    private ProjectService projectService;

    @Transactional
    public Payment savePayment(PaymentInDTO paymentInDTO, Long projectNum, HttpSession httpSession){
        // HttpSession에서 userId를 가져옵니다.
        String userId = (String) httpSession.getAttribute("userId");
        if (userId == null) {
            throw new RuntimeException("세션에서 유저 아이디를 찾을 수 없습니다.");
        }

        // ProjectNum을 통해 ProjectId를 가져옵니다.
        Project project = projectRepository.findByProjectNum(projectNum)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));

        // PaymentInDTO에서 projectId 가져오기
        String projectId = project.getProjectId(); // projectId를 가져옴

        // 해당 프로젝트의 후원자 목록에 userId 추가
        List<String> supporters = new ArrayList<>(project.getSupportersIdList()); // 불변 리스트를 변경 가능한 리스트로 복사
        if (!supporters.contains(userId)) {
            supporters.add(userId);
            project.setSupportersIdList(supporters);  // 후원자 목록 갱신
        }

        // 프로젝트의 현재 금액(currentAmount)을 결제 금액만큼 증가시킴
        Long paidAmount = paymentInDTO.getPaidAmount();  // 결제 금액을 가져옴
        Long currentAmount = project.getCurrentAmount();
        project.setCurrentAmount(currentAmount + paidAmount);  // currentAmount 갱신

        // 프로젝트를 DB에 저장
        projectRepository.save(project);

        // 결제 정보 처리
        Long paymentNum = generatePaymentNum();
        Payment payment = paymentConverter.toEntity(paymentInDTO);
        payment.setPaymentNum(paymentNum);
        payment.setProjectId(projectId);
        payment.setUserId(userId);

        return paymentRepository.save(payment); // 결제 저장
    }

    // 6자리 랜덤 숫자 생성
    private Long generateRandomPaymentNum() {
        return (long) (100000 + Math.random() * 900000);  // 100000~999999 범위
    }

    // 프로젝트 번호 생성 로직 (6자리 중복 방지)
    private Long generatePaymentNum() {
        Long paymentNum = generateRandomPaymentNum();
        int attempts = 0;
        while (paymentRepository.existsByPaymentNum(paymentNum)) {
            paymentNum = generateRandomPaymentNum();
            attempts++;
            // 너무 많은 반복이 발생하면 예외를 던짐
            if (attempts > 100) {
                throw new IllegalStateException("프로젝트 번호 생성 실패");
            }
        }
        return paymentNum;
    }

//     특정 사용자의 후원 정보를 조회
// 특정 사용자의 후원 정보를 조회
public List<PaymentOutDTO> getMyFunding(String userId, String projectStatus) {
    // 유저의 모든 후원 목록 불러옴
    List<Payment> payments = paymentRepository.findByUserId(userId);

    // 현재 날짜와 시간
    LocalDateTime now = LocalDateTime.now();

    // 각 결제에 대해 프로젝트 상태 확인 후 필터링
    return payments.stream()
            .filter(payment -> {
                // 결제와 연결된 프로젝트 가져오기
                Optional<Project> projectOpt = projectRepository.findByProjectId(payment.getProjectId());

                // 프로젝트 존재 여부 확인
                if (projectOpt.isPresent()) {
                    Project project = projectOpt.get();

                    // 상태 필터링 로직
                    if ("ONGOING".equalsIgnoreCase(projectStatus)) {
                        // 진행 중: 종료일이 현재 날짜 이후
                        return project.getProjectEndDate().isAfter(now);
                    } else if ("COMPLETED".equalsIgnoreCase(projectStatus)) {
                        // 완료된 프로젝트: 종료일이 현재 날짜 이전
                        return project.getProjectEndDate().isBefore(now);
                    }
                }

                return false; // 프로젝트가 없거나 조건에 맞지 않으면 제외
            })
            .map(payment -> {
                // Payment -> PaymentOutDTO로 변환
                return paymentConverter.toOutDTO(payment);
            })
            .collect(Collectors.toList());
}
}



