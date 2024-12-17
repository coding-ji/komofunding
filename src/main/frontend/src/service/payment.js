import { useStore } from "../stores/PaymentStore/useStore";

export const payment = (user, payment, shipping) => {
  const { state, actions } = useStore();

  const { IMP } = window;
  IMP.init(`imp43603888`);

  // 1개 이상일 경우 아이템 명 수정
  const formatName = (items) => {
    return items.length > 1
      ? `${items[0].itemName} 외 + ${items.length}`
      : `${items[0].itemName}`;
  };


  // projectId, projectNum에 관련된건 requestParam으로 받고, userId에 관련된거는 session으로 받음
  const data = {
    channelKey: "channel-key-199e83d4-ec2a-48e3-8928-647898bd9f99",
    merchant_uid: `mid-${crypto.randomUUID()}`, // 주문번호
    name: formatName(payment.items), // 주문명
    amount: payment.paidAmount, // 결제금액
    pay_method: "card", // 결제수단

    buyer_name: user.name, // 구매자 이름
    buyer_tel: user.phoneNumber, // 구매자 전화번호
    buyer_email: user.email, // 구매자 이메일
    buyer_addr: shipping.address, // 구매자 주소
  };
  IMP.request_pay(data, callback);
};

const callback = async (response) => {
  const { success, error_msg } = response;

  if (success) {
    const paymentData = {
      "paymentId": response.data.merchant_uid,
      "items": payment.items,
      "paidAmount": response.data.amount,
      "paymentMethod": response.data.pay_method,
      "paymentStatus": response.data.status,
      "senderName": shipping.sender,
      "shippingName": shipping.recipient,
      "shippingPhone": shipping.phoneNumber,
      "shippingAddress": shipping.address + " " + shipping.detailAddress,
      "refundBankName": shipping.bank,
      "refundAccountHolder": shipping.accountHolder,
      "refundAccountNumber": shipping.accountNumber,
      "isRefunded": false
    }

    try {
      // 비동기 작업을 기다림
      await actions.addPayment(paymentData);
    } catch (error) {
      console.error("결제 데이터 추가 중 오류 발생:", error);
    }

  } else {
    alert(`결제 실패: ${error_msg}`);
  }
}