import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";
import { useState, useEffect } from "react";
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
  const { state: projectState, actions: projectActions } = ProjectStore();
  const items = projectState.items || [];
   
  // 개별 상품 정보 상태 관리
  const [itemName, setItemName] = useState(null);
  const [itemPrice, setItemPrice] = useState(null);
  const [itemAmount, setItemAmount] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 상태 복원
    const savedState = localStorage.getItem("projectState");
    if (savedState) {
      projectActions.updateAllFields(JSON.parse(savedState));
    }
  }, [projectActions]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "itemName") {
      setItemName(value);
    } else if (field === "itemPrice") {
      setItemPrice(value);
    } else if (field === "itemAmount") {
      setItemAmount(value);
    }
  };

  const handleSubmit = () => {
    if (!itemName || !itemPrice || !itemAmount) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    // 새로운 상품 정보
    const newProduct = { itemName, itemPrice, itemAmount };

    // 프로젝트의 아이템 정보 업데이트
    projectActions.changeItems([...items, newProduct]);

    // 입력 필드 초기화
    setItemName("");
    setItemPrice("");
    setItemAmount("");
    setError(""); // 에러 메시지 초기화
  };

  // 설명 텍스트
  const descriptions = [
    "등록하고자 하는 상품의 이름을 작성해 주세요.",
    "상품의 개당 가격을 작성해 주세요. 해당 란에는 숫자만 기입해야 합니다.",
    "상품 최소 수량을 작성해주세요 해당 란에는 숫자만 기입해야 합니다.",
  ];

  // 다음 단계로 이동
  const handleNextClick = () => {
    navigate("/home/selectprj/prj-three");
    localStorage.setItem("projectState", JSON.stringify(projectState));
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
            value={
              index === 0 ? itemName : index === 1 ? itemPrice : itemAmount
            }
            onChange={handleInputChange(
              index === 0
                ? "itemName"
                : index === 1
                ? "itemPrice"
                : "itemAmount"
            )}
            type={index === 1 || index === 2 ? "number" : "text"}
          />
        </div>
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <ProductList products={projectState.items} />
      <MyNavLine />
      <PrjFooter>
        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          text="이전"
          onClick={() => navigate("/home/selectprj")}
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
