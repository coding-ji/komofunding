import React, { useState, useEffect } from "react";
import styles from "./FundingPay.module.css"; // CSS 모듈 import
import { Btn, WhiteBtn, ProductBtn2 } from "../../components/MyBtn"; // 버튼 컴포넌트
import ProductList from "../../components/ProductList"; // ProductList 컴포넌트
import RefundPolicy from "../../components/Refunded/RefundPolicy";
import AddressSearchModal from "../../components/Refunded/AddressSearchModal"; // 모달 컴포넌트
import TitleText from "../../components/TitleText";
import TitleBox from "../../components/TitleBox";
import MyNavLine from "../../components/MyNavLine";
import Dropdown from "../../components/Dropdown/Dropdown";
import TitleProduct from "../../components/TitleProduct";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useStore as PaymentStore } from "../../stores/PaymentStore/useStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/formattedData";
import * as PortOne from "@portone/browser-sdk/v2";


const FundingPay = () => {
  const { projectNum } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // 이동하면서 project 내용과 payment 내용 가져옴
  const { project, payment, paymentActions } = location.state || {};
  const { state, actions } = PaymentStore();
  const { state: userState, actions: userActions } = UserStore();

  useEffect(() => {
    // 로컬스토리지에서 'user' 데이터를 가져옴
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      userActions.fetchUserProfile(user.userNum);
    } else {
      navigate("/home/login");
    }
  }, []);

  const [fundingInfo, setFundingInfo] = useState({
    sender: "",
    recipient: "",
    phoneNumber: "",
    address: "",
    detailAddress: "",
    accountNumber: "",
    bank: "",
  });

  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부

  const bankOptions = [
    "은행 선택",
    "신한은행",
    "국민은행",
    "우리은행",
    "카카오뱅크",
    "하나은행",
    "수협은행",
    "농협은행",
    "새마을금고",
  ];

  const handleBankSelect = (selectedBank) => {
    setFundingInfo({ ...fundingInfo, bank: selectedBank });
  };

  const [showModal, setShowModal] = useState(false); // 모달 상태

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // phoneNumber 및 accountNumber 필드에서 숫자만 허용
    if (
      (name === "phoneNumber" || name === "accountNumber") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    setFundingInfo({ ...fundingInfo, [name]: value });
  };

  const handleZipCodeClick = (e) => {
    e.preventDefault(); // 폼 제출 방지
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleAddressSelect = (address) => {
    setFundingInfo({ ...fundingInfo, address }); // 선택된 주소 업데이트
  };

  const shippingCost = 2500;

  // 결제 처리 함수
  const handleSubmit = async () => {
    const formatName = (items) => {
      return items.length > 1
        ? `${items[0].itemName} 외 ${items.length - 1}`
        : `${items[0].itemName}`;
    };

    try {
      console.log("결제 시작...");
      const paymentId = `payment-${crypto.randomUUID()}`; // UUID 생성

      // 결제 요청 데이터 구성
      const paymentRequestData = {
        storeId: "store-b90f386e-0f27-451e-9d1b-2a5c5c06ee18",
        channelKey: "channel-key-f872bd78-c5b7-44a7-9bcd-037b64429005", // 채널 키
        paymentId: paymentId, // 주문 번호
        orderName: formatName(payment.items), // 주문명
        totalAmount: payment.paidAmount, // 결제 금액
        currency: "KRW",
        payMethod: "CARD", // 결제 수단
      };

      // PortOne 결제 요청
      const response = await PortOne.requestPayment(paymentRequestData);
      console.log("결제 응답:", response);

      // 응답 유효성 검사
      if (!response || !response.transactionType) {
        console.error("결제 응답이 잘못되었습니다:", response);
        alert("결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
        return;
      }

      // 결제 성공 여부 확인
      if (response.transactionType === "PAYMENT") {
        console.log("결제 성공! PaymentId:", response.paymentId);

        // 결제 성공 시 저장할 데이터 구성
        const paymentSaveData = {
          paymentId: response.paymentId, // 주문 ID
          txId: response.txId, // 거래 ID
          items: payment.items, // 주문 항목
          paidAmount: payment.paidAmount, // 결제 금액
          paymentMethod: paymentRequestData.payMethod, // 결제 수단
          paymentStatus: "SUCCESS", // 결제 성공으로 상태 설정
          senderName: fundingInfo.sender,
          shippingName: fundingInfo.recipient,
          shippingPhone: fundingInfo.phoneNumber,
          shippingAddress: `${fundingInfo.address} ${fundingInfo.detailAddress}`,
          refundBankName: fundingInfo.bank,
          refundAccountHolder: fundingInfo.accountHolder,
          refundAccountNumber: fundingInfo.accountNumber,
          isRefunded: false,
        };

        try {
          // 백엔드에 결제 데이터 저장
          await actions.addPayment(projectNum, paymentSaveData);
          alert("결제가 성공적으로 처리되었습니다!");
        } catch (saveError) {
          console.error("결제 데이터 저장 중 오류 발생:", saveError);
          alert("결제는 성공했지만 데이터 저장 중 문제가 발생했습니다.");
        } finally{
          navigate("/home")
        }
      } else {
        console.error("결제 실패: 알 수 없는 상태입니다.", response);
        alert("결제가 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
      alert("결제 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      {userState.user && (
        <div className={styles.refundContainer}>
          <TitleText height="100px" title="후원하기" />

          {payment.items.length === 0 && <div className={styles.alert}></div>}

          <div className={styles.fundingInfos}>
            <TitleBox text="후원자 정보" />
            <div className={styles.fundingInfoGrid}>
              <label htmlFor="email" className={styles.email}>
                이메일
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="email"
                name="email"
                value={userState.user.email}
                disabled
                required
              />
              <label htmlFor="nickname" className={styles.nickname}>
                닉네임
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="nickname"
                name="nickname"
                value={userState.user.nickName}
                disabled
                required
              />
              <label htmlFor="memberId" className={styles.memberId}>
                회원 번호
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="memberId"
                name="memberId"
                value={userState.user.userNum}
                disabled
                required
              />

              <label htmlFor="phoneNumber" className={styles.userphoneNumber}>
                휴대폰 번호
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="phoneNumber"
                name="phoneNumber"
                value={userState.user.phoneNumber}
                disabled
                required
              />
            </div>
          </div>

          <MyNavLine />

          <div>
            <TitleBox text="상품 목록" />
            <ProductList products={payment.items} />
          </div>

          <MyNavLine />

          <div className={styles.transInfos}>
            <TitleBox text="배송지 정보" />
            <form>
              <div className={styles.gridContainer}>
                <label htmlFor="sender" className={styles.sender}>
                  보내는 분
                </label>
                <input
                  className={styles.inputField}
                  id="sender"
                  name="sender"
                  value={fundingInfo.sender}
                  onChange={handleInputChange}
                  type="text"
                  required
                />

                <label htmlFor="recipient" className={styles.recipient}>
                  받으실 분
                </label>
                <input
                  className={styles.inputField}
                  id="recipient"
                  name="recipient"
                  value={fundingInfo.recipient}
                  onChange={handleInputChange}
                  type="text"
                  required
                />

                <label htmlFor="phoneNumber" className={styles.phoneNumber}>
                  휴대폰 번호
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={fundingInfo.phoneNumber}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  type="text"
                  required
                />

                <label htmlFor="address" className={styles.address}>
                  주소
                </label>
                <div className={styles.addressInput}>
                  <input
                    id="address"
                    name="address"
                    value={fundingInfo.address}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    type="text"
                    required
                    disabled
                  />
                  {showModal && (
                    <AddressSearchModal
                      onClose={handleModalClose}
                      onAddressSelect={handleAddressSelect}
                    />
                  )}
                  <ProductBtn2
                    onClick={handleZipCodeClick}
                    text="주소 찾기"
                    margin="0px"
                    fontSize="0.9rem"
                    width="110px"
                    height="auto"
                    textAlign="center"
                    padding="5px 10px"
                  />
                </div>

                <label htmlFor="detailAddress" className={styles.detailAddress}>
                  상세 주소
                </label>
                <input
                  id="detailAddress"
                  name="detailAddress"
                  value={fundingInfo.detailAddress}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  type="text"
                  required
                />
              </div>
            </form>
          </div>

          <MyNavLine />

          <div className={styles.FundingInfo}>
            <TitleBox text="환불 정보" />
            <div className={styles.refundGrid}>
              <label htmlFor="bank" className={styles.bank}>
                은행 선택
              </label>
              <Dropdown
                options={bankOptions}
                onSelect={handleBankSelect}
                defaultValue={fundingInfo.bank}
              />
              <label htmlFor="accountNumber" className={styles.num}>
                계좌번호
              </label>
              <input
                id="accountNumber"
                name="accountNumber"
                value={fundingInfo.accountNumber}
                onChange={(e) =>
                  setFundingInfo({
                    ...fundingInfo,
                    accountNumber: e.target.value,
                  })
                }
                className={styles.inputField}
                type="text"
                required
              />

              <label htmlFor="accountHolder" className={styles.name}>
                예금주
              </label>
              <input
                id="accountHolder"
                type="text"
                name="accountHolder"
                className={styles.inputField}
                value={fundingInfo.accountHolder}
                onChange={(e) =>
                  setFundingInfo({
                    ...fundingInfo,
                    accountHolder: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <MyNavLine />

          <div className={styles.payInfos}>
            <TitleBox text="결제 정보" />
            <RefundPolicy />
            <MyNavLine />

            <div className={styles.payInfo}>
              <TitleProduct
                fontSize="1.8rem"
                text={`구매 금액 : ${formatCurrency(payment.paidAmount)}원`}
              />
              <TitleProduct
                fontSize="1.8rem"
                text={`배송비 : ${formatCurrency(shippingCost)} 원`}
              />
              <MyNavLine />
              <TitleProduct
                fontSize="1.8rem"
                text={`총 결제 금액 : 
                  ${formatCurrency(payment.paidAmount + shippingCost)} 원`}
              />
            </div>

            <MyNavLine />
          </div>

          <div className={styles.btns}>
            <Btn
              text="확인"
              padding="5px 0px"
              width="80px"
              fontSize="1.1rem"
              onClick={handleSubmit}
            />
            <WhiteBtn
              text="취소"
              padding="5px 0px"
              width="80px"
              fontSize="1.1rem"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FundingPay;
