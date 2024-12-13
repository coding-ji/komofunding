import React, { useRef } from "react";
import styled from "styled-components";
import TitleBox from "../TitleBox";
import DescriptionProduct from "../DescriptionProduct";
import MyNavLine from "../MyNavLine";
import PrjCategory from "../PrjCategory";
import TitleProduct from "../TitleProduct";
import MainProDetailQnA from "./MainProDetailQnA";
import RefundPolicy from "./RefundPolicy";
import UserQnaBox from "./UserQnaBox/UserQnaBox";
 
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  border-radius: 2px;
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
`;
function MainProDetailsIntro({ project, qnaList, setQnaList,htmlContent }) {
    // 각 섹션에 대한 ref 생성
    const introRef = useRef(null);
    const scheduleRef = useRef(null);
    const productInfoRef = useRef(null);
    const policyRef = useRef(null);
    const inquiryRef = useRef(null);
  
    const dateText = `${project.projectStartDate}\n~\n${project.projectEndDate}`;
  
    return (
      <IntroBox>
        {/* 나 들어가유 */}
        <div>
        <TitleProduct 
        fontSize = "1.5rem"
        padding = "5px 0px "
        text="프로젝트 스토리" />
        <PrjCategory
          sectionRefs={[
            introRef,
            scheduleRef,
            productInfoRef,
            policyRef,
            inquiryRef,
          ]}
        />
        </div>
  
        {/* 소개 - 이미지 */}
        <TitleBox text="소개" ref={introRef} />
        <DescriptionProduct
        fontSize= "1rem"
        color = "rgb(0,0,0)"
        text = {htmlContent}
         />
        
        {/* <ImageContainer ref={introRef}>
          {project.imgs.map((img, index) => (
            <img key={index} src={img} alt={`${index + 1}`} />
          ))}
        </ImageContainer> */}
  
        {/* 일정 */}
        <TitleBox text="일정" ref={scheduleRef} />
        <DescriptionProduct
          textAlign="center"
          fontSize="1.5rem"
          lineHeight="2rem"
          color="black"
          fontWeight="bold"
          letterSpacing="0.1rem"
          text={dateText}
        />
        <MyNavLine />
  
        {/* 상품 정보 */}
        <TitleBox text="상품 정보" ref={productInfoRef} />
        {Array.isArray(project.items)&&project.items.length>0 && project.items.map((item, index) => (
          <ItemCard key={index}>
            <DescriptionProduct
              color="#436446"
              fontWeight="bold"
              fontSize="1.5rem"
              text={item.itemName}
            />
            <DescriptionProduct
              color="black"
              fontSize="1.0rem"
              lineHeight="2rem"
              text={`가격: ${item.itemPrice}원\n 수량: ${item.itemAmount}`}
            />
          </ItemCard>
        ))}
  
        <MyNavLine />
  
        {/* 환불/정책 */}
        <RefundPolicy ref={policyRef} />
  
        {/* 문의 */}
        <MainProDetailQnA qnaList={qnaList} setQnaList={setQnaList} ref={inquiryRef} />
      </IntroBox>
    );
  }

  export default MainProDetailsIntro;