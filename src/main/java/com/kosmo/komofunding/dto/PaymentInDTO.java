    package com.kosmo.komofunding.dto;

    import com.kosmo.komofunding.common.dto.ItemDTO;
    import lombok.Getter;
    import lombok.Setter;

    import java.time.LocalDateTime;
    import java.util.List;

    @Getter
    @Setter
    public class PaymentInDTO {
        private String paymentId;
        private String paymentNum;
        private String userId;
        private String projectId;
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
    }
