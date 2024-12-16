package com.kosmo.komofunding.dto;

import com.kosmo.komofunding.common.dto.ItemDTO;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class PaymentOutDTO {
    // 유저관련
    private String userNum;
    private String nickName;
    private String name;
    private String email;
    private String phoneNumber;
    private String bankName;
    private String accountNumber;
    private String accountHolder;

    // 결제관련
    private String paymentId;
    private String paymentNum;
    private List<ItemDTO> items;
    private Long paidAmount;
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String paymentStatus;
    private String failureReason;
    private String senderName;
    private String shippingName;
    private String shippingPhone;
    private String shippingAddress;
    private String refundBankName;
    private String refundAccountHolder;
    private String refundAccountNumber;
    private Boolean isRefunded;

    // 프로젝트 관련
    private List<String> thumbnailImgs;
    private String title;
    private String shortDescription;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}
