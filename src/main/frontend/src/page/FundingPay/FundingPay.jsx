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
import PopupInquiry from "../MyPage/writeQnA/PopupInquiry";

const FundingPay = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
    memberId: "",
    phone: "",
  });

  const [FundingInfo, setFundingInfo] = useState({
    sender: "",
    recipient: "",
    phone: "",
    address: "",
    detailAddress: "",
    accountNumber: "",
    bank: "",
  });

  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부


  const bankOptions = [
    "신한은행", "국민은행", "우리은행", "카카오뱅크", "하나은행", "수협은행", "농협은행", "새마을금고",
  ];

  const handleBankSelect = (selectedBank) => {
    setFundingInfo({ ...FundingInfo, bank: selectedBank });
  };

  const [products, setProducts] = useState([
    { itemName: "상품 1", itemPrice: 1000, itemAmount: 5 },
    { itemName: "상품 2", itemPrice: 2000, itemAmount: 3 }
  ]);
  const [showModal, setShowModal] = useState(false); // 모달 상태

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // phone 및 accountNumber 필드에서 숫자만 허용
    if ((name === "phone" || name === "accountNumber") && !/^\d*$/.test(value)) {
      return;
    }
  
    setFundingInfo({ ...FundingInfo, [name]: value });
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.itemPrice * product.itemAmount, 0);
  };

  const handleZipCodeClick = (e) => {
    e.preventDefault(); // 폼 제출 방지
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleAddressSelect = (address) => {
    setFundingInfo({ ...FundingInfo, address }); // 선택된 주소 업데이트
  };

  const shippingCost = 2500; // 배송비는 2500원으로 고정인데 수정해야하면 바꾸겠습니다

  const handleSubmit = () => {
    const isFormValid = Object.values(FundingInfo).every((field) => field.trim() !== "");

    if (isFormValid && products.length > 0) {
      // 로컬 스토리지에 데이터 저장
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("FundingInfo", JSON.stringify(FundingInfo));
      localStorage.setItem("products", JSON.stringify(products));

      setShowPopup(true); // 팝업을 보여주기 위해 상태 변경

      } else {
      if (products.length === 0) {
        alert("환불할 상품이 없습니다.");
      } else {
        alert("입력이 완료되지 않았습니다.");
      }
    }
  };

  return (
    <div className={styles.refundContainer}>
      
      <TitleText height="100px" title="후원하기" />
      
      {products.length === 0 && <div className={styles.alert}></div>}

      <div className={styles.fundingInfos}>
        <TitleBox text="후원자 정보" />
        <div className={styles.fundingInfoGrid}>
        <label htmlFor="email" className={styles.email}>이메일</label>
        <input 
        type="text" 
        className={styles.inputField} 
        id="email" 
        name="email"
        value={userInfo.email}
        onChange={(e) =>
          setUserInfo({ ...userInfo, email: e.target.value }) // 상태 업데이트
        }
        required />
        <label htmlFor="nickname" className={styles.nickname}>닉네임</label>
        <input 
        type="text" 
        className={styles.inputField} 
        id="nickname" 
        name="nickname"
        value={userInfo.nickname}
        onChange={(e) =>
          setUserInfo({ ...userInfo, nickname: e.target.value }) // 상태 업데이트
        }
        required />
        <label htmlFor="memberId" className={styles.memberId}>회원 번호</label>
        <input 
        type="text" 
        className={styles.inputField} 
        id="memberId" 
        name="memberId"
        value={userInfo.memberId}
        onChange={(e) =>
          setUserInfo({ ...userInfo, memberId: e.target.value }) // 상태 업데이트
        }
        required />

  <label htmlFor="phone" className={styles.userPhone}>휴대폰 번호</label>
    <input 
        type="text" 
        className={styles.inputField} 
        id="phone" 
        name="phone"
        value={userInfo.phone}
        onChange={(e) =>
          setUserInfo({ ...userInfo, phone: e.target.value }) // 상태 업데이트
        }
        required />
        </div>
      </div>

      <MyNavLine />

      <div>
        <TitleBox text="상품 목록" />
        <ProductList products={products} />
      </div>

      <MyNavLine />

      <div className={styles.transInfos}>
        <TitleBox text="배송지 정보" />
        <form>
          <div className={styles.gridContainer}>
            <label htmlFor="sender" className={styles.sender}>보내는 분</label>
            <input
              className={styles.inputField}
              id="sender"
              name="sender"
              value={FundingInfo.sender}
              onChange={handleInputChange}
              type="text"
              required
            />

            <label htmlFor="recipient" className={styles.recipient}>받으실 분</label>
            <input
              className={styles.inputField}
              id="recipient"
              name="recipient"
              value={FundingInfo.recipient}
              onChange={handleInputChange}
              type="text"
              required
            />

            <label htmlFor="phone" className={styles.phone}>휴대폰 번호</label>
            <input
              id="phone"
              name="phone"
              value={FundingInfo.phone}
              onChange={handleInputChange}
              className={styles.inputField}
              type="text"
              required
            />

            <label htmlFor="address" className={styles.address}>주소</label>
            <div className={styles.addressInput}>
              <input
                id="address"
                name="address"
                value={FundingInfo.address}
                onChange={handleInputChange}
                className={styles.inputField}
                type="text"
                required
                disabled
              />
              {showModal && <AddressSearchModal onClose={handleModalClose} onAddressSelect={handleAddressSelect} />}
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

            <label htmlFor="detailAddress" className={styles.detailAddress}>상세 주소</label>
            <input
              id="detailAddress"
              name="detailAddress"
              value={FundingInfo.detailAddress}
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
          <label htmlFor="bank" className={styles.bank}>은행 선택</label>
          <Dropdown
            options={bankOptions}
            onSelect={handleBankSelect}
            defaultValue={FundingInfo.bank}
          />
          <label htmlFor="accountNumber" className={styles.num}>계좌번호</label>
          <input
            id="accountNumber"
            name="accountNumber"
            value={FundingInfo.accountNumber}
            onChange={(e) =>
              setFundingInfo({ ...FundingInfo, accountNumber: e.target.value })
            }
            className={styles.inputField}
            type="text"
            required
          />

          <label htmlFor="accountHolder" className={styles.name}>예금주</label>
          <input
            id="accountHolder"
            type="text"
            name="accountHolder"
            className={styles.inputField}
            value={FundingInfo.accountHolder}
            onChange={(e) =>
              setFundingInfo({ ...FundingInfo, accountHolder: e.target.value })
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
            text={`구매 금액 : ${calculateTotalPrice().toLocaleString()} 원`}
          />
          <TitleProduct
            fontSize="1.8rem"
            text={`배송비 : ${shippingCost.toLocaleString()} 원`}
          />
          <MyNavLine />
          <TitleProduct
            fontSize="1.8rem"
            text={`총 결제 금액 : ${(calculateTotalPrice() + shippingCost).toLocaleString()} 원`}
          />
        </div>

        <MyNavLine />
      </div>

      <div className={styles.btns}>
        <Btn text="확인" padding="5px 0px" width="80px" fontSize="1.1rem" onClick={handleSubmit} />
        <WhiteBtn text="취소" padding="5px 0px" width="80px" fontSize="1.1rem" />
      </div>

   {/* PopupInquiry 팝업을 조건부로 렌더링 */}
    {showPopup && <PopupInquiry message="후원이 완료되었습니다."
                                onClose={() => window.location.reload()} 
  />}

    </div>
  );
};

export default FundingPay;
