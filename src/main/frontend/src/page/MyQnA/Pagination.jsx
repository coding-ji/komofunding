import React from "react";
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <PaginationContainer>
      <PageButton onClick={handlePrevious} disabled={currentPage === 1}>
        {"<"}
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton onClick={handleNext} disabled={currentPage === totalPages}>
        {">"}
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
