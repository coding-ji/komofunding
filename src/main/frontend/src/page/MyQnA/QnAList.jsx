import React from "react";
import styled from "styled-components";

const InquiryListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

`;

const InquiryItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e4e4e4;
  padding: 15px 20px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Status = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) =>
    props.status?.trim() === "답변완료" ? "green" : "red"};
`;

const ReplyDate = styled.div`
  font-size: 0.9rem;
  font-weight: nomal;
`
const Div = styled.div`
    display : flex;
    gap : 1rem;
`

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;


const QnAList = ({ inquiries, onInquiryClick }) => {
  return (
    <InquiryListContainer>
      {inquiries.map((inquiry) => (
        <InquiryItem key={inquiry.id} onClick={() => onInquiryClick(inquiry.id)}>
          <Div>
          <Status status={inquiry.status}>{inquiry.status}</Status>
          <ReplyDate>{inquiry.replyDate}</ReplyDate>
          </Div>
          <Title>{inquiry.title}</Title>
        </InquiryItem>
      ))}
    </InquiryListContainer>
  );
};

export default QnAList;
