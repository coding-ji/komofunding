package com.kosmo.komofunding.entity;

import com.kosmo.komofunding.common.dto.ItemDTO;
import com.kosmo.komofunding.converter.ItemListConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Table(name = "PAYMENT",
        indexes = {
                @Index(name = "idx_project_id", columnList = "project_id"),
                @Index(name ="idx_user_id", columnList = "user_id")
        })
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Payment {
    @Id
//    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "payment_id", nullable = false, updatable = false, length = 36)
    private String paymentId; // 결제 ID

    @Column(name = "payment_num", nullable = false, unique = true, updatable = false)
    @Builder.Default
    private Long paymentNum = null; // 결제 번호

    @Column(name = "user_id", nullable = false, updatable = false)
    private String userId; // 유저 ID

    @Column(name = "project_id", nullable = false, updatable = false)
    private String projectId; // 프로젝트 ID

    @Convert(converter = ItemListConverter.class)
    @Column(name = "items", columnDefinition = "longtext")
    private List<ItemDTO> items; // 상품?

    @Column(name = "paid_amount", nullable = false, updatable = false)
    private Long paidAmount; // 결제 금액

    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate; // 결제 일시

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod; // 결제 방법

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus; // 결제 승인

    @Column(name = "failure_reason")
    private String failureReason; // 거절 이유

    @Column(name = "sender_name")
    private String senderName; // 배송자 이름

    @Column(name = "shipping_name")
    private String shippingName; // 받는 사람 이름

    @Column(name = "shipping_phone")
    private String shippingPhone; // 받는 사람 핸드폰 번호

    @Column(name = "shipping_address")
    private String shippingAddress; // 받는 사람 주소

    @Column(name = "refund_bank_name")
    private String refundBankName; // 환불 은행

    @Column(name = "refund_account_holder")
    private String refundAccountHolder; // 환불 예금주

    @Column(name = "refund_account_number")
    private String refundAccountNumber; // 환불 계좌 번호

    @Column(name = "is_refunded")
    private Boolean isRefunded; // 환불 여부

}