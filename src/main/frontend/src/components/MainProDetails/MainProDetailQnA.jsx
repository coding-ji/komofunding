import React, { forwardRef, useState } from "react";
import DescriptionProduct from "../DescriptionProduct";
import TitleBox from "../TitleBox";
import styled from "styled-components";
import UserQnaBox from "./UserQnaBox/UserQnaBox";
import { ProductBtn1, ProductBtn2 } from "../MyBtn";
import "../../index.css";
import Input from "../input";

const Head = styled.div`
  margin: 5px 0px 5px 5px;
  display: flex;
  justify-content: space-between;
`;

const QBox = styled.div`
  padding: 0 5px;
  display: ${(props) => (props.visible ? "block" : "none")}; /* visible 상태에 따라 표시 */
`;

const Btns = styled.div`
  display: flex;
  gap: 5px;
  margin: 2px 7px;
  justify-content: flex-end;
`;

const MainProDetailQnA = forwardRef(({ qnaList, setQnaList }, ref) => {
  const [isQBoxVisible, setIsQBoxVisible] = useState(false); // QBox 표시 여부
  const [inputValue, setInputValue] = useState(""); // Input 값 관리

  const handleInquiryClick = () => {
    setIsQBoxVisible(true); // QBox 보이기
  };

  const handleConfirmClick = () => {
    if (inputValue.trim()) {
      // qnaList에 새 Q&A 추가
      const newQna = {
        qnaId: Date.now(),
        userId: "User123", // 예시 유저 아이딘데 이거 어케 받아와야 하는겨..?
        writtenDate: new Date().toISOString(),
        question_Comment: inputValue,
        answer: null,
        answerUserId: null,
        answerWrittenDate: null,
      };

      setQnaList((prevList) => [...prevList, newQna]); // 상태 업데이트
      setInputValue(""); // 입력 값 초기화
      setIsQBoxVisible(false); // QBox 숨기기
    }
  };

  const handleCancelClick = () => {
    setInputValue(""); // 입력 값 초기화
    setIsQBoxVisible(false); // QBox 숨기기
  };

  return (
    <div ref={ref}>
      <TitleBox text="상품 문의" />
      <Head>
        <DescriptionProduct
          color="black"
          text="해당 제품과 관련 없는 글, 양도, 광고, 욕설, 비방 등은 예고 없이 삭제됩니다."
          lineHeight="2rem"
          fontSize="1rem"
          fontWeight="bold"
          letterSpacing="0.4px"
        />
        <ProductBtn1
          text="문의하기"
          padding="5px 3px"
          width="80px"
          fontSize="0.8rem"
          onClick={handleInquiryClick} // 클릭 시 QBox 표시
        />
      </Head>

      <QBox visible={isQBoxVisible}>
        <Input
          placeholder="문의하고자 하는 내용을 입력해주세요."
          width="97.8%"
          margin="0px"
          height="50px"
          padding="0px 5px"
          size="small"
          value={inputValue} // Input 값 바인딩
          onChange={(e) => setInputValue(e.target.value)} // 입력 값 변경
        />

        <Btns>
          <ProductBtn1
            fontSize="0.7rem"
            padding="3px 0px"
            width="55px"
            text="확인"
            onClick={handleConfirmClick} // 확인 버튼 클릭 핸들러
          />
          <ProductBtn2
            fontSize="0.7rem"
            padding="3px 0px"
            width="55px"
            text="취소"
            onClick={handleCancelClick} // 취소 버튼 클릭 핸들러
          />
        </Btns>
      </QBox>

      {/* Q&A 리스트 */}
      {qnaList.map((qna) => (
        <UserQnaBox key={qna.qnaId} qna={qna} />
      ))}
    </div>
  );
});

export default MainProDetailQnA;
