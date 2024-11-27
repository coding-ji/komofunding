import React from "react";
import { useParams, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Btn } from "../../components/MyBtn";

const DetailContainer = styled.div`
  width: 100%;
  height : 100%
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  background-color: #fff;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Date = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

const Status = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.status === "답변완료" ? "green" : "red")};
`;

const QnAContainer = styled.div`
  margin-top: 2rem;
`;

const Question = styled.div`
  margin-bottom: 1rem;
  padding: 15px;
  background-color: #fbfbfb;

  border-radius: 5px;
    word-wrap: break-word; /* 길이가 긴 단어를 줄 바꿈 */
  word-break: break-word; /* 단어를 강제로 줄 바꿈 */
  white-space: pre-wrap; /* 공백도 유지하며 줄 바꿈 */
  min-height : 150px;

`;

const Answer = styled.div`
  margin-bottom: 1rem;
  padding: 15px;
  background-color: #fbfbfb;

  border-radius: 5px;
    word-wrap: break-word; /* 길이가 긴 단어를 줄 바꿈 */
  word-break: break-word; /* 단어를 강제로 줄 바꿈 */
  white-space: pre-wrap; /* 공백도 유지하며 줄 바꿈 */
   min-height : 300px;

`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  margin-top: 2rem; /* 위 여백 */
`;
const LineDiv = styled.div`
 width: 100%; /* 전체 너비로 설정 */
  height: 2px; /* 구분선 높이 */
  background-color: #e4e4e4; /* 구분선 색상 */
  margin: 1rem 0; /* 위아래 여백 */
`

const QnAView = () => {
  const { id } = useParams();
  const inquiries = useOutletContext(); // MyInquiry에서 전달된 데이터
  const inquiry = inquiries.find((item) => item.id === parseInt(id));

  if (!inquiry) return <p>해당 문의를 찾을 수 없습니다.</p>;

  return (
    <DetailContainer>
      <Title> {inquiry.title}</Title>
      <HeaderContainer>
        <Date>{inquiry.replyDate}</Date>
        <Status status={inquiry.status}>{inquiry.status}</Status>
      </HeaderContainer>
      <QnAContainer>
        <Question>
          <strong>Q:</strong> {inquiry.content || "문의 내용이 없습니다."}
        </Question>
        <LineDiv/>
        <Answer>
          <strong>A:</strong> {inquiry.answer || "답변이 아직 없습니다."}
        </Answer>
      </QnAContainer>
      <ButtonContainer>
      <Btn 
      margin-top="2rem"
      padding = "2px 5px"
      text = "목록"
      width= "90px"
      height="40px"
      fontSize="1.2rem"
      onClick={() => window.history.back()}/>

</ButtonContainer>
    </DetailContainer>
  );
};

export default QnAView;
