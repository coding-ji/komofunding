import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleSubmit = () => {
    if (!productName || !productPrice || !productQuantity) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    setProducts([...products, { name: productName, price: productPrice, quantity: productQuantity }]);
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
    setError("");
  };

  const descriptions = [
    "등록하고자 하는 상품의 이름을 작성해 주세요.",
    "상품의 개당 가격을 작성해 주세요. 해당 란에는 숫자만 기입해야 합니다.",
    "상품 최소 수량을 작성해주세요 해당 란에는 숫자만 기입해야 합니다."
  ];

  const handleNextClick = () => {
    const projectData = JSON.parse(localStorage.getItem("projectData")) || {};
    projectData.products = products;
    localStorage.setItem("projectData", JSON.stringify(projectData));
    navigate("/selectprj/prj-three"); 
  };

  return (
    <SelectBox>
      <TitleBox text="프로젝트 상품 등록" />
      {["상품 명", "상품 가격", "상품 최소 수량"].map((title, index) => (
        <div key={index}>
          <TitleProduct text={title} />
          <DescriptionProduct text={descriptions[index]} />
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
          text="등록"
          onClick={handleSubmit}
        />
      </EnrollButton>
      <MyNavLine />
      <TitleBox text="등록한 상품" />
      <ProductList products={products} />
      <MyNavLine />
      <PrjFooter>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="이전"
          onClick={() => navigate("/selectprj")}
        />
        <Btn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="다음"
          onClick={handleNextClick}
        />
      </PrjFooter>
    </SelectBox>
  );
}

export default SelectPrjTwo;
