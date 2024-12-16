package com.kosmo.komofunding.converter;

import com.kosmo.komofunding.dto.PaymentInDTO;
import com.kosmo.komofunding.dto.PaymentOutDTO;
import com.kosmo.komofunding.entity.Payment;
import com.kosmo.komofunding.entity.Project;
import com.kosmo.komofunding.entity.User;
import com.kosmo.komofunding.repository.PaymentRepository;
import com.kosmo.komofunding.repository.ProjectRepository;
import com.kosmo.komofunding.repository.UserRepository;
import com.kosmo.komofunding.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;



@Component
@RequiredArgsConstructor

public class PaymentConverter {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final PaymentRepository paymentRepository;


    public PaymentOutDTO toOutDTO(Payment payment) {
        // 사용자 정보 가져오기
        User user = userRepository.findById(payment.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다"));

        // 프로젝트 정보 가져오기
        Project project = projectRepository.findById(payment.getProjectId())
                .orElseThrow(() -> new RuntimeException("프로젝트를 찾을 수 없습니다."));


        // PaymentOutDTO로 변환하여 반환
        return PaymentOutDTO.builder()
                .userNum(String.valueOf(user.getUserNum()))
                .nickName(user.getNickName())
                .name(user.getName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .bankName(user.getBankName())
                .accountNumber(user.getAccountNumber())
                .accountHolder(user.getAccountHolder())

                // 결제 관련 정보
                .paymentId(payment.getPaymentId())
                .paymentNum(String.valueOf(payment.getPaymentNum()))
                .items(payment.getItems())
                .paidAmount(payment.getPaidAmount())
                .paymentDate(payment.getPaymentDate())
                .paymentMethod(payment.getPaymentMethod())
                .paymentStatus(payment.getPaymentStatus())
                .failureReason(payment.getFailureReason())
                .senderName(payment.getSenderName())
                .shippingName(payment.getShippingName())
                .shippingPhone(payment.getShippingPhone())
                .shippingAddress(payment.getShippingAddress())
                .refundBankName(payment.getRefundBankName())
                .refundAccountHolder(payment.getRefundAccountHolder())
                .refundAccountNumber(payment.getRefundAccountNumber())
                .isRefunded(payment.getIsRefunded())

                // 프로젝트 관련
                .thumbnailImgs(project.getThumbnailImgs())
                .title(project.getTitle())
                .shortDescription(project.getShortDescription())
                .startDate(project.getProjectStartDate())
                .endDate(project.getProjectEndDate())
                .projectNum(project.getProjectNum())
                .build();
    }

    public Payment toEntity(PaymentInDTO paymentInDTO) {
        // PaymentInDTO를 기반으로 Payment 엔티티로 변환
        return Payment.builder()
                .items(paymentInDTO.getItems()) // 아이템 목록
                .paidAmount(paymentInDTO.getPaidAmount()) // 결제 금액
                .paymentDate(paymentInDTO.getPaymentDate()) // 결제 일시
                .paymentMethod(paymentInDTO.getPaymentMethod()) // 결제 방법
                .paymentStatus(paymentInDTO.getPaymentStatus()) // 결제 승인?
                .failureReason(paymentInDTO.getFailureReason()) // 실패 사유
                .senderName(paymentInDTO.getSenderName()) // 송금자 이름
                .shippingName(paymentInDTO.getShippingName()) // 배송 이름
                .shippingPhone(paymentInDTO.getShippingPhone()) // 배송 전화번호
                .shippingAddress(paymentInDTO.getShippingAddress()) // 배송 주소
                .refundBankName(paymentInDTO.getRefundBankName()) // 환불 은행명
                .refundAccountHolder(paymentInDTO.getRefundAccountHolder()) // 환불 계좌 예금주
                .refundAccountNumber(paymentInDTO.getRefundAccountNumber()) // 환불 계좌번호
                .isRefunded(paymentInDTO.getIsRefunded()) // 환불 여부
                .build();
    }
}
