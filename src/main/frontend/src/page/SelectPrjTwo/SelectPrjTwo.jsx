// SelectPrjTwo.js
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Input from "../../components/input";
import MyNavLine from "../../components/MyNavLine";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import ProductList from "../../components/ProductList";

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PrjFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const EnrollButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

function SelectPrjTwo() {
  const [productName, setProductName] = useState(""); 
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); // 에러 메시지 상태 추가

  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleSubmit = () => {
    if (isNaN(productPrice) || isNaN(productQuantity) || productPrice <= 0 || productQuantity <= 0) {
      setError("상품 가격과 수량은 숫자만 입력해 주세요.");
      return;
    }
    
    setProducts([...products, { name: productName, price: productPrice, quantity: productQuantity }]);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setError(""); // 에러 메시지 초기화
  };

  return (
    <SelectBox>
      <TitleBox text="프로젝트 상품 등록" />

      {["상품 명", "상품 가격", "상품 최소 수량"].map((title, index) => (
        <div key={index}>
          <TitleProduct text={title} />
          <DescriptionProduct text={`상품의 ${title}을 작성해주세요. 숫자만 기입해 주세요.`} />
          <Input
            size="small"
            value={index === 0 ? productName : index === 1 ? productPrice : productQuantity}
            onChange={handleInputChange(index === 0 ? setProductName : index === 1 ? setProductPrice : setProductQuantity)}
            type={index === 1 || index === 2 ? "number" : "text"}
          />
        </div>
      ))}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <EnrollButton>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          fontFamily="var(--kr-font)"
          text="등록"
          onClick={handleSubmit}
        />
      </EnrollButton>

      <MyNavLine />
      <TitleBox text="등록한 상품" />

      {/* 등록 상품 부르기 */}
      <ProductList products={products} />

      <MyNavLine />

      <PrjFooter>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          fontFamily="var(--kr-font)"
          text="이전"
          onClick={() => navigate("/selectprj")}
        />
        <Btn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="다음"
          onClick={() => navigate("/selectprj/prj-three")}
        />
      </PrjFooter>
    </SelectBox>
  );
}

export default SelectPrjTwo;
