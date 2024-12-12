import React, { useState, useEffect } from "react";
import styles from "./RefundPage.module.css"; // CSS 모듈 import
import { Btn, WhiteBtn, ProductBtn2 } from "../../components/MyBtn"; // 버튼 컴포넌트
import ProductList from "../../components/ProductList"; // ProductList 컴포넌트
import RefundPolicy from "../../components/Refunded/RefundPolicy";
import Bluebox from "../../components/Refunded/bluetextbox";
import AddressSearchModal from "../../components/Refunded/AddressSearchModal"; // 모달 컴포넌트
import TitleText from "../../components/TitleText";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import MyNavLine from "../../components/MyNavLine";
import Dropdown from "../../components/Dropdown/Dropdown";
import { style } from "framer-motion/client";
import TitleProduct from "../../components/TitleProduct";



// 상품명 수량 가격은 데이터를 받아오면 피그마처럼 작동하며 계산 방식은 아래코드로 작동됩니다-------------------------------------------------------------------
// const calculateTotalPrice = () => {
//   return products.reduce((total, product) => total + product.price * product.quantity, 0);
// };

const RefundPage = () => {

  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
    memberId: "",
    phone: "",
  });

  const [refundInfo, setRefundInfo] = useState({
    sender: "",
    recipient: "",
    phone: "",
    address: "",
    detailAddress: "",
    accountNumber: "",
    bank: "",

  });

  const bankOptions = ["신한은행", "국민은행", "우리은행", "카카오뱅크", "하나은행", "수협은행", "농협은행", "새마을금고"]; // 은행 목록 배열

  const handleBankSelect = (selectedBank) => {
    setRefundInfo({ ...refundInfo, bank: selectedBank });
  };


  const [errors, setErrors] = useState({
    phone: "",
    accountNumber: "",
  });

 // 아래 useState값이 추가되면 피그마처럼 상품이 나옵니다

  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [selectedAddress, setSelectedAddress] = useState("");

  // 유저 정보와 상품 데이터 가져오기
  useEffect(() => {
    // 유저 정보 로드
    fetch("/api/user-info") // 유저정보 받아오는것 수정★
      .then((response) => response.json())
      .then((data) => {
        setUserInfo({
          email: data.email || "",
          nickname: data.nickname || "",
          memberId: data.memberId || "",
          phone: data.phone || "",
        });
      })
      .catch((error) => console.error("Error loading user info:", error));

    // 상품 데이터 로드
    fetch("/api/products") // 상품 데이터 불러오기 수정★
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      return response.json();
    })
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error loading products:", error));
}, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let errorMessage = "";

    if (name === "phone" || name === "accountNumber") {
      if (!/^\d*$/.test(value)) {
        errorMessage = "숫자만 입력 가능합니다.";
      }
    }

    setErrors({ ...errors, [name]: errorMessage });
    setRefundInfo({ ...refundInfo, [name]: value });
  };

  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleZipCodeClick = (e) => {
    e.preventDefault(); // 폼 제출 방지
    setShowModal(true);
  };
  
  const handleModalClose = () => {
    setShowModal(false); // 모달 닫기
  };

  const handleAddressSelect = (address) => {
    setRefundInfo({ ...refundInfo, address }); // 선택된 주소 업데이트
  };

  const shippingCost = 2500; // 배송비는 2500원으로 고정인데 수정해야하면 바꾸겠습니다

  const handleSubmit = () => {
    const isFormValid = Object.values(refundInfo).every((field) => field.trim() !== "");

    if (isFormValid && products.length > 0) {
      alert("환불이 완료되었습니다.");
      window.location.reload();
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

      <TitleText title = "환불하기" />

      {products.length === 0 && <div className={styles.alert}></div>}

      <div className={styles.fundingInfo}>
        <TitleBox text="후원자 정보" />
          <DescriptionProduct 
          color="rgb(0,0,0)"
          padding="0 5px"
          fontWeight="bold"
          fontSize="1.1rem"
          text="이메일 :">
            {userInfo.email}
          </DescriptionProduct>

          <DescriptionProduct 
          color="rgb(0,0,0)"
          padding="0 5px"
          fontWeight="bold"
          fontSize="1.1rem"
          text="닉네임 :">
            {userInfo.nickname}
          </DescriptionProduct>

          <DescriptionProduct 
          color="rgb(0,0,0)"
          padding="0 5px"
          fontWeight="bold"
          fontSize="1.1rem"
          text="회원번호 :">
            {userInfo.memberId}
          </DescriptionProduct>

          <DescriptionProduct 
          color="rgb(0,0,0)"
          padding="0 5px"
          fontWeight="bold"
          fontSize="1.1rem"
          text="휴대폰 번호 :">
            {userInfo.phone}
          </DescriptionProduct>
      </div>

      <MyNavLine />

      <div>
      <TitleBox text="상품 목록" />
      <ProductList products={products} />
      </div>

      <MyNavLine />

      <div className={styles.transInfos}>
      <TitleBox text="배송지 정보"/>
      <form>
  <div className={styles.gridContainer}>
      <label htmlFor="sender" className={styles.sender}>보내는 분</label>
      <input 
        className={styles.inputField}

        id="sender"
        name="sender"
        value={refundInfo.sender}
        onChange={handleInputChange}
        type="text"
        required
      />

      <label htmlFor="recipient" className={styles.recipient}>받으실 분</label>
      <input
        className={styles.inputField}

        id="recipient"
        name="recipient"
        value={refundInfo.recipient}
        onChange={handleInputChange}
        type="text"
        required
      />

      <label htmlFor="phone" className={styles.phone}>휴대폰 번호</label>
      <input
        id="phone"
        name="phone"
        value={refundInfo.phone}
        onChange={handleInputChange}
        className={styles.inputField}
        type="text"
        required
      />
      {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}

      <label htmlFor="address" className={styles.address}>주소</label>
      {/* 우편번호 검색 모달 */}
      <div className={styles.addressInput}>
      <input
        id="address"
        name="address"
        value={refundInfo.address}
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
        margin ="0px"
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
        value={refundInfo.detailAddress}
        onChange={handleInputChange}
        className={styles.inputField}
        type="text"
        required
      />
  </div>
</form>
      </div>

      <MyNavLine />

      <div className={styles.refundInfo}>
      <TitleBox text="환불 정보" />
      <div className={styles.refundGrid}>
        
          <label
          htmlFor="bank" 
          className={styles.bank}>
            은행 선택
          </label>

          <Dropdown
            options={bankOptions}
            onSelect={handleBankSelect}
            defaultValue={refundInfo.bank} // 선택된 값 유지
          />
        
            <label 
            htmlFor="accountNumber" 
            className={styles.num}>
              계좌번호
            </label>
           <input
            id="accountNumber"
            name="accountNumber"
            value={refundInfo.accountNumber}
            onChange={(e) =>
              setRefundInfo({ ...refundInfo, accountNumber: e.target.value })
            }
            className={styles.inputField}
            type="text"
            required
          />

          {errors.accountNumber && (
            <p className={styles.errorText}>{errors.accountNumber}</p>
          )}

          <label 
          htmlFor="accountHolder" 
          className={styles.name}>
          예금주
          </label>
          <input
            id="accountHolder"
            type="text"
            name="accountHolder"
            className={styles.inputField}
            value={refundInfo.accountHolder}
            onChange={(e) =>
              setRefundInfo({ ...refundInfo, accountHolder: e.target.value })
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
        fontSize ="1.8rem"
        text= {`구매 금액 : ${calculateTotalPrice().toLocaleString()} 원`}></TitleProduct>
        <TitleProduct 
        fontSize="1.8rem"
        text= {`배송비 : ${shippingCost.toLocaleString()} 원`}></TitleProduct>

        <MyNavLine />

        <TitleProduct
        fontSize ="1.8rem"
        text= {`총 결제 금액 : ${(calculateTotalPrice() + shippingCost).toLocaleString()} 원`}></TitleProduct>
      </div>
      
        <MyNavLine />

    </div>      
      <div className={styles.btns}>
        <Btn text="확인" padding="5px 0px" width="80px" fontSize="1.1rem" onClick={handleSubmit} />
        <WhiteBtn text="취소" padding="5px 0px" width="80px" fontSize="1.1rem" />
      </div>
    </div>
  );
};

export default RefundPage;
