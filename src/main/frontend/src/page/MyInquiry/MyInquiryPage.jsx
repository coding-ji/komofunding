import React from "react";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import "../../index.css";
import InquiryList from "./InquiryList"; // InquiryList 컴포넌트 임포트
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/MyBtn";


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const MyInquiryPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      {/* 제목 섹션 */}
      <TitleText title="나의 문의 내역" />

      {/* 문의 리스트 섹션 */}
      <InquiryList />

      {/* 버튼 섹션 */}
      <ButtonDiv>
        <Btn
          text="문의하기"
          onClick={() => navigate("/new-inquiry")} // 버튼 클릭 시 라우터 이동
          width = "250px"
          height ="50px"
          fontSize="1.5rem"
          padding="10px"
          fontFamily="var(--kr-font)"
        />
        
      </ButtonDiv>
    </PageContainer>
  );
};

export default MyInquiryPage;
