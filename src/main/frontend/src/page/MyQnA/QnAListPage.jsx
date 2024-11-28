import { useState } from "react";
import styled from "styled-components";
import QnAList from "./QnAList";
import Pagination from "./Pagination";
import { Btn } from "../../components/MyBtn";
import { useNavigate, useOutletContext } from "react-router-dom";


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  grid-area: PageContainer;
  width: 100%;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ITEMS_PER_PAGE = 10;

const QnAListPage = () => {
  const inquiries = useOutletContext() || []; // Outlet에서 데이터 받아오기 (기본값으로 빈 배열 설정)
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();


  const handleInquiryClick = (id) => {
    navigate(`/myqna/${id}`); // 상세 페이지로 이동
  };

  const handleNewInquiry = () => {
    navigate("/write-qna"); // 문의하기 페이지로 이동
  };

  // 현재 페이지에 표시할 데이터 계산
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInquiries = inquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  
  return (
    <PageContainer>
    <QnAList inquiries={currentInquiries} onInquiryClick={handleInquiryClick} />
    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil(inquiries.length / ITEMS_PER_PAGE)}
      onPageChange={setCurrentPage}
    />
      <ButtonDiv>
        <Btn text="문의하기"
          fontSize="1rem"
          width="100px"
          padding="2px 5px"
          onClick={handleNewInquiry} // 버튼 클릭 시 handleNewInquiry 실행
        ></Btn>
      </ButtonDiv>
    </PageContainer>
  );
};

export default QnAListPage;
