package com.kosmo.komofunding.controller;

import com.kosmo.komofunding.converter.PaymentConverter;
import com.kosmo.komofunding.dto.PaymentInDTO;
import com.kosmo.komofunding.dto.PaymentOutDTO;
import com.kosmo.komofunding.entity.Payment;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.exception.UnauthorizedException;
import com.kosmo.komofunding.repository.PaymentRepository;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import com.kosmo.komofunding.service.PaymentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    PaymentService paymentService;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    PaymentConverter paymentConverter;
    @Autowired
    UserRepository userRepository;

    // 프로젝트 후원자 목록
    @GetMapping("/list")
    public ResponseEntity<List<PaymentOutDTO>> getPaymentsByProjectNum(@RequestParam("projectNum") Long projectNum) {
        // 1. projectNum을 통해 Project 엔티티를 찾음
        Project project = projectRepository.findByProjectNum(projectNum)
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));

        // 2. ProjectId를 이용해 Payment 목록을 가져옴
        List<Payment> payments = paymentRepository.findByProjectId(project.getProjectId());

        // 3. Payment 리스트를 PaymentOutDTO 리스트로 변환
        List<PaymentOutDTO> paymentOutDTOList = payments.stream()
                .map(payment -> paymentConverter.toOutDTO(payment)) // paymentConverter를 통해 변환
                .collect(Collectors.toList());

        // 4. 변환된 DTO 리스트를 ResponseEntity로 반환
        return ResponseEntity.ok(paymentOutDTOList);
    }

    // 결제 정보 저장
    @PostMapping("/save")
    public ResponseEntity<String> savePayment(@RequestParam("projectNum") Long projectNum, @RequestBody PaymentInDTO paymentInDTO, HttpSession session){
        paymentService.savePayment(paymentInDTO, projectNum, session);

        return ResponseEntity.ok("결제되었습니다.");
    }

    // 나의 후원 활동 (조회)
    @GetMapping("/myinfo/funding")
    public List<PaymentOutDTO> getMyFunding(@RequestParam("projectStatus") String projectStatus, HttpSession session) {
        // 세션에서 userId 가져오기
        String userId = (String) session.getAttribute("userId");
    // 후원 내역 조회
        return paymentService.getMyFunding(userId, projectStatus);
    }

    // paymentId를 받아서 결제 정보 삭제
    @DeleteMapping("/myfunding/{paymentId}")
    public ResponseEntity<String> deleteFunding(@PathVariable String paymentId) {
        // deleteMyFunding 메서드를 호출하여 결제 정보 삭제
        String result = paymentService.refundPayment(paymentId);

        // 결제 삭제 결과를 반환
        if (result.equals("ok")) {
            return ResponseEntity.ok(result); // 성공 시 200 OK 반환
        } else {
            return ResponseEntity.badRequest().body(result); // 실패 시 400 Bad Request 반환
        }
    }

    // 전체 결제 목록 불러오기
    @GetMapping("/list/all")
    public ResponseEntity<List<PaymentOutDTO>> getAllPayments() {
        // 1. 모든 결제 정보 가져오기
        List<Payment> payments = paymentRepository.findAll(); // Payment 엔티티에서 모든 결제 정보를 가져옴

        // 2. 결제 정보를 PaymentOutDTO로 변환
        List<PaymentOutDTO> paymentOutDTOList = payments.stream()
                .map(payment -> paymentConverter.toOutDTO(payment)) // paymentConverter를 통해 DTO로 변환
                .collect(Collectors.toList());

        // 3. 변환된 DTO 리스트를 ResponseEntity로 반환
        return ResponseEntity.ok(paymentOutDTOList);
    }

}


