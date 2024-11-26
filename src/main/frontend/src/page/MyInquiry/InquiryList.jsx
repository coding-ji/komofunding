import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import inquiriesData from "./inquiriesData.json"; // JSON 데이터 가져오기

// 스타일 정의
const InquiryListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 100px;
`;

const InquiryItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e4e4e4;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
`;

const Status = styled.span`
  font-weight: bold;
  color: ${(props) => (props.status === "답변완료" ? "#28a745" : "#dc3545")};
`;

const InquiryTitle = styled.h2`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 18px;
  color: #333;
  margin: 10px 0 5px 0;
`;

// `InquiryList` 컴포넌트
const InquiryList = () => {
  const navigate = useNavigate();

  const handleItemClick = (link) => {
    navigate(link); // 라우터로 이동
  };

  return (
    <InquiryListContainer>
      {inquiriesData.map((inquiry) => (
        <InquiryItem
          key={inquiry.id}
          onClick={() => handleItemClick(inquiry.link)}
        >
          <InquiryHeader>
            <div>
              <Status status={inquiry.status}>{inquiry.status}</Status>
              {" | "}
              <span style={{ color: "var(--darkblue-color)" }}>
                {inquiry.replyDate}
              </span>
            </div>
          </InquiryHeader>
          <InquiryTitle>{inquiry.title}</InquiryTitle>
        </InquiryItem>
      ))}
    </InquiryListContainer>
  );
};

export default InquiryList;
