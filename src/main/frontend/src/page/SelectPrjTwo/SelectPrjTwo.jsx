import { useState } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Input from "../../components/input";
import { WhiteBtn } from "../../components/MyBtn";
import MyNavLine from "../../components/MyNavLine";
import ProductItem from "../../components/ProductItem";  // 새로운 컴포넌트 import
import styles from './SelectPrjTwo.module.css';

const ProductDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

function SelectPrjTwo() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); // 에러 메시지 상태 추가

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleSubmit = () => {
    // 가격과 수량이 숫자인지 체크
    if (isNaN(productPrice) || isNaN(productQuantity) || productPrice <= 0 || productQuantity <= 0) {
      setError("상품 가격과 수량은 숫자만 입력해 주세요.");
      return;
    }

    const newProduct = {
      name: productName,
      price: productPrice,
      quantity: productQuantity,
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setError(""); // 제출 시 에러 메시지 초기화
  };

  return (
    <div className={styles.prjContainer}>
      <TitleBox text="프로젝트 상품 등록" />

      <div>
        <TitleProduct text="상품 명" />
        <DescriptionProduct text="등록하고자 하는 상품의 이름을 작성해주세요." />
        <Input
          size="small"
          value={productName}
          onChange={handleInputChange(setProductName)}
        />
      </div>

      <div>
        <TitleProduct text="상품 가격" />
        <DescriptionProduct text="상품의 개당 가격을 작성해주세요. 해당 란 안에는 숫자만 기입해 주세요." />
        <Input
          size="small"
          value={productPrice}
          onChange={handleInputChange(setProductPrice)}
          type="number" // number 타입으로 설정하여 숫자만 입력 가능하게 함
        />
      </div>

      <div>
        <TitleProduct text="상품 최소 수량" />
        <DescriptionProduct text="해당 상품의 최소 수량을 작성해주세요. 해당 란에는 숫자만 기입해 주세요." />
        <Input
          size="small"
          value={productQuantity}
          onChange={handleInputChange(setProductQuantity)}
          type="number" // number 타입으로 설정하여 숫자만 입력 가능하게 함
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}

      <div className={styles.selectBtn}>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          fontFamily="var(--kr-font)"
          text="등록"
          onClick={handleSubmit}
        />
      </div>

      <MyNavLine />

      <TitleBox text="등록한 상품" />

      {products.length > 0 && (
        <ProductDetails>
          {products.map((product, index) => (
            <ProductItem key={index} product={product} /> // 컴포넌트 사용
          ))}
        </ProductDetails>
      )}
    </div>
  );
}

export default SelectPrjTwo;
