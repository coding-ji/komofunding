import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import TitleBox from "../TitleBox";
import DescriptionProduct from "../DescriptionProduct";
import MyNavLine from "../MyNavLine";
import projectData from "../../../public/data/projectData.json";
import PrjCategory from "../PrjCategory";
import TitleProduct from "../TitleProduct";
import MainProDetailQnA from "./MainProDetailQnA";
import RefundPolicy from "./RefundPolicy";

const ImageContainer = styled.div`
  display: flex;
  flex-direction : column;
  align-items: center;    
  gap: 10px;       
`;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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

function MainProDetailsIntro() {
    const [project, setProject] = useState(null);

    // 각 섹션에 대한 ref 생성 => 버튼 클릭했을 때 해당 항목으로 이동하기 위함
    const introRef = useRef(null);
    const scheduleRef = useRef(null);
    const productInfoRef = useRef(null);
    const policyRef = useRef(null);
    const inquiryRef = useRef(null);

    // 1번째 데터 받기
    useEffect(() => {
        if (projectData && projectData.length > 0) {
            setProject(projectData[0]);
        }
    }, []);

    if (!project) {
        return null;
    }

    const dateText = `${project.startDate}\n~\n ${project.endDate}`;

    return (
        <IntroBox>

            <div>
                <TitleProduct text="프로젝트 스토리" />
                {/* 프로젝트 상세 목록 => 활성화된 경우 일치하는 box 로 이동 */}
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
            <ImageContainer ref={introRef}>
                {project.imgs.map((img, index) => (
                    <img key={index} src={img} alt={`${index + 1}`} />
                ))}
            </ImageContainer>

            {/* 일정 */}
            <TitleBox text="일정" ref={scheduleRef} />
            <DescriptionProduct
                textAlign="center"
                fontSize="1.5rem"
                lineHeight="2rem"
                color="black"
                fontWeight="bold"
                letterSpacing="0.1rem"
                text={dateText} />

            <MyNavLine />

            {/* 상품 정보 */}
            <TitleBox text="상품 정보" ref={productInfoRef} />
            {project.items.map((item, index) => (
                <ItemCard key={index}>
                    <DescriptionProduct
                        color="#436446"
                        fontWeight="bold"
                        fontSize="1.5rem"
                        text={`${item.itemName}`}
                    />
                    <DescriptionProduct
                        color="black"
                        textAlign="center"
                        fontSize="1.0rem"
                        lineHeight="2rem"
                        text={`가격: ${item.itemPrice}원 수량: ${item.itemAmount}`}
                    />
                </ItemCard>
            ))}

            <MyNavLine />

            {/* 환불/정책 */}
            <RefundPolicy ref={policyRef} />

            {/* 문의 */}
             <MainProDetailQnA ref={inquiryRef} />            

        </IntroBox>
    );
}

export default MainProDetailsIntro;
