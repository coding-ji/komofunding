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
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "payment_id", nullable = false, updatable = false, length = 36)
    private String paymentId;

    @Column(name = "payment_num", nullable = false, unique = true, updatable = false)
    @Builder.Default
    private Long paymentNum = null;

    @Column(name = "user_id", nullable = false, updatable = false)
    private String userId;

    @Column(name = "project_id", nullable = false, updatable = false)
    private String projectId;

    @Convert(converter = ItemListConverter.class)
    @Column(name = "items", columnDefinition = "longtext")
    private List<ItemDTO> items;

    @Column(name = "paid_amount", nullable = false, updatable = false)
    private Long paidAmount;

    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus;

    @Column(name = "failure_reason")
    private String failureReason;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "shipping_name")
    private String shippingName;

    @Column(name = "shipping_phone")
    private String shippingPhone;

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "refund_bank_name")
    private String refundBankName;

    @Column(name = "refund_account_holder")
    private String refundAccountHolder;

    @Column(name = "refund_account_number")
    private String refundAccountNumber;

    @Column(name = "is_refunded")
    private Boolean isRefunded;

}