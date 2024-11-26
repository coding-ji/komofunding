import React, { useState } from "react";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import "../../index.css";
import InquiryList from "./InquiryList"; // InquiryList 컴포넌트
import { Btn } from "../../components/MyBtn";
import Pagination from "./Pagination";
import inquiriesData from "./inquiriesData.json"; // JSON 데이터 가져오기

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  grid-area : PageContainer;
  width : 100%;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const MainDiv= styled.div`
  display: grid; /* 그리드 레이아웃 활성화 */
  grid-template-areas:
    "left PageContainer right"; /* 그리드 영역 이름 정의 */
  grid-template-columns: 1fr 5fr 1fr; /* 열 너비 설정 */
  grid-template-rows: auto; /* 행 높이는 자동 */
  width: 100%;
  min-height: 100vh; /* 전체 화면 높이 채우기 */

    @media (max-width: 900px) {
    grid-template-areas:
      "PageContainer"; /* 모바일에서는 하나의 열만 표시 */
    grid-template-columns: 1fr; /* 전체 화면 너비 사용 */
  }
`

const ITEMS_PER_PAGE = 5; // 한 페이지당 표시할 항목 수

const MyInquiryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지 데이터 계산
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInquiries = inquiriesData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <MainDiv>
    <PageContainer>
      <TitleText title="나의 문의 내역" />
      {/* 문의 리스트 */}
      <InquiryList inquiries={currentInquiries} />
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(inquiriesData.length / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
      {/* 버튼 섹션 */}
      <ButtonDiv>
        <Btn
          text="문의하기"
          onClick={() => console.log("문의하기 클릭")} // 라우터로 연결 가능
          width="130px"
          height="40px"
          fontSize="1rem"
          padding="5px"
        />
      </ButtonDiv>
    </PageContainer>
    </MainDiv>
  );
};

export default MyInquiryPage;
