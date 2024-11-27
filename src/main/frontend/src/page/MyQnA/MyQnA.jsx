import React, { useState,useEffect } from "react";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import { Outlet } from "react-router-dom";

const Div = styled.div`
   display: grid;
   grid-template-areas:
    "left main right"; /* 이름 설정 */
  grid-template-columns: 1fr 5fr 1fr; /* 열 비율 설정 */
  gap: 1rem; /* 열 간격 */

      /* 반응형 설정 */
  @media (max-width: 768px) {
    grid-template-columns: 0.5fr 9fr 0.5fr; /* 모바일에서는 비율 조정 */
    gap: 0.5rem;
`;


const MainDiv = styled.div`
  display: flex;
  width : 100%;
  flex-direction: column;
  min-height: 100vh; /* 화면 전체 높이 */

  grid-area : main;
    /* 반응형 설정 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr 10fr 1fr; 
    gap: 0;
`;


const PageContainer = styled.div`
  flex: 1; /* 콘텐츠 영역 확장 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
`;

const LineDiv = styled.div`
 width: 100%; /* 전체 너비로 설정 */
  height: 2px; /* 구분선 높이 */
  background-color: #e4e4e4; /* 구분선 색상 */
  margin: 1.3rem 0; /* 위아래 여백 */
`

const MyQnA = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // 데이터를 fetch로 로드
      fetch("/inquiriesData.json") // public 폴더의 JSON 파일 경로
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setInquiries(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading inquiries:", error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <p>로딩 중...</p>;
    }
  
    return (
      <Div>
      <MainDiv>
      <PageContainer>
        <TitleText title="나의 문의 내역" />
        <LineDiv/>
        <Outlet context={inquiries} /> {/* Outlet에 데이터를 전달 */}
      </PageContainer>
      </MainDiv>
      </Div>
    );
  };

export default MyQnA;
