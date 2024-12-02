import React, { useState } from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  color: ${(props) => (props.active ? "var(--darkblue-color)" : "var(--line-color)")};
  padding: 8px 12px;
  margin: 0 5px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: ${(props) => (props.active ? "1.05rem" : "1rem")};
  font-weight: ${(props) => (props.active ? "700" : "500")};
  cursor: pointer;

  &:hover {
    color: var(--darkblue-color);
    transition: all 0.2s ease;
  }

  &:disabled {
    cursor: not-allowed;
    color: #999;
  }
`;

// PaginationWrapper 컴포넌트
const PaginationComp = ({ items, itemsPerPage = 10, render }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  // 페이지 버튼 클릭 핸들러
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <>
      {/* 현재 페이지의 데이터를 render 함수로 넘겨서 렌더링 */}
      {render(currentItems)}

      {/* Pagination 컴포넌트 렌더링 */}
      <PaginationContainer>
        <PageButton onClick={handlePrevious} disabled={currentPage === 1}>
          {"<"}
        </PageButton>

        {pages.map((page) => (
          <PageButton
            key={page}
            active={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageButton>
        ))}

        <PageButton onClick={handleNext} disabled={currentPage === totalPages}>
          {">"}
        </PageButton>
      </PaginationContainer>
    </>
  );
};

export default PaginationComp;
