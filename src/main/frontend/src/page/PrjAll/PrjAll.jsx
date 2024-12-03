import { useState } from "react";
import styled from "styled-components";
import TitleBox from "../../components/TitleBox";
import DescriptionProduct from "../../components/DescriptionProduct";
import TitleProduct from "../../components/TitleProduct";
import Category from "../../components/Category";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import MyNavLine from "../../components/MyNavLine";
import ProductItem from "../../components/ProductItem";
import Date from "../../components/Date";
import ReactQuill from "react-quill"; // react-quill import
import "react-quill/dist/quill.snow.css"; // quill 기본 스타일 import
import ImageUploader from "../../components/ImageUploader"; // ImageUploader 컴포넌트 import
import styles from './PrjAll.module.css';
import Input from "../../components/input";

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const PrjFooter = styled.div`
width : 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top : 20px;
  margin-bottom: 20px;
`;

function PrjAll() {
  // SelectPrjOne 상태
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(""); // 에러 메시지 상태

  // SelectPrjThree 상태
  const [content, setContent] = useState(""); // 에디터의 내용 관리 상태
  const [images, setImages] = useState([]); // 이미지 상태

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

  const handleImagesChange = (updatedImages) => {
    setImages(updatedImages); // ImageUploader에서 변경된 이미지 상태를 업데이트
  };

  return (
    <div>
    <SelectBox>
      {/* SelectPrjOne */}
      <TitleBox text="프로젝트 기본 정보" />
      
      <div>
        <TitleProduct text="프로젝트 제목" />
        <DescriptionProduct text="프로젝트 제목을 통해 프로젝트의 목적을 한눈에 알 수 있도록 작성해주세요." />
        <Input size="small" margin="5px" value={productName} onChange={handleInputChange(setProductName)} />
      </div>

      <div>
        <TitleProduct text="짧은 소개 글" />
        <DescriptionProduct text="프로젝트를 간략하게 소개하고 후원자들이 프로젝트에 대해 빠르게 이해할 수 있도록 돕는 글을 작성해 주세요." />
        <Input 
        size="small" margin="5px" value={productPrice} onChange={handleInputChange(setProductPrice)} />
      </div>

      <div>
        <TitleProduct text="카테고리" />
        <DescriptionProduct text="프로젝트에 해당하는 여러 카테고리 중 가장 적합한 카테고리를 선택해주세요." />
        <Category />
      </div>

      <MyNavLine />

      {/* SelectPrjTwo */}
      <TitleBox text="프로젝트 상품 등록" />

      <div>
        <TitleProduct text="상품 명" />
        <DescriptionProduct text="등록하고자 하는 상품의 이름을 작성해주세요." />
        <Input size="small" value={productName} onChange={handleInputChange(setProductName)} />
      </div>

      <div>
        <TitleProduct text="상품 가격" />
        <DescriptionProduct text="상품의 개당 가격을 작성해주세요. 해당 란 안에는 숫자만 기입해 주세요." />
        <Input
          size="small"
          value={productPrice}
          onChange={handleInputChange(setProductPrice)}
          type="number"
        />
      </div>

      <div>
        <TitleProduct text="상품 수량" />
        <DescriptionProduct text="해당 상품의 수량을 작성해주세요. 해당 란에는 숫자만 기입해 주세요." />
        <Input
          size="small"
          value={productQuantity}
          onChange={handleInputChange(setProductQuantity)}
          type="number"
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
            <ProductItem key={index} product={product} />
          ))}
        </ProductDetails>
      )}

      {/* SelectPrjThree */}
      <TitleBox text="프로젝트 기간" />

      <div>
        <TitleProduct text="이미지 첨부" />
        <DescriptionProduct text="프로젝트와 관련된 이미지를 첨부해주세요." />
        <ImageUploader onImagesChange={handleImagesChange} />
      </div>

      <div>
        <TitleProduct text="프로젝트 기간 설정" />
        <DescriptionProduct text="프로젝트 시작일과 종료일을 선택해주세요." />
        <Date />
      </div>

      <div>
        <TitleProduct text="프로젝트 상세 정보" />
        <ReactQuill value={content} onChange={setContent} />
      </div>

      <MyNavLine />
    </SelectBox>

<PrjFooter>
<Btn
    width="80px"
    fontSize="0.9rem"
    padding="8px 3px"
    text="제출"
/>
</PrjFooter>
</div>
  );
}

export default PrjAll;
