import React, { forwardRef, useState, useEffect } from "react";
import DescriptionProduct from "../DescriptionProduct";
import TitleBox from "../TitleBox";
import styled from "styled-components";
import UserQnaBox from "./UserQnaBox/UserQnaBox";
import { ProductBtn1, ProductBtn2 } from "../MyBtn";
import "../../index.css";
import Input from "../input";
import { useParams } from "react-router-dom";
import { useStore as QnaStore } from "../../stores/QnaStore/useStore";

const Head = styled.div`
  margin: 5px 0px 5px 5px;
  display: flex;
  justify-content: space-between;
`;

const QBox = styled.div`
  padding: 0 5px;
  display: ${(props) =>
    props.visible ? "block" : "none"}; /* visible 상태에 따라 표시 */
`;

const Btns = styled.div`
  display: flex;
  gap: 5px;
  margin: 2px 7px;
  justify-content: flex-end;
`;

const MainProDetailQnA = forwardRef((qnaState,ref) => {
  const { projectNum } = useParams();
  const [isQBoxVisible, setIsQBoxVisible] = useState(false); // QBox 관리
  const [inputValue, setInputValue] = useState(""); // Input -> 수정 / 답변
  const { state, actions } = QnaStore();

  // user정보 가져오기
  const user = JSON.parse(localStorage.getItem("user"));

  const handleInquiryClick = () => {
    setIsQBoxVisible(true); // QBox 보이기
  };

  useEffect(() => {
    // qnaState가 배열이 아니거나 null/undefined인 경우 빈 배열로 초기화
    const currentQnaState = Array.isArray(qnaState) ? qnaState : [];

    // 새로운 inputValue를 추가한 배열 생성
    const updatedQnaState = [...currentQnaState, inputValue];
    qnaState.projectActions.changeQnaList(updatedQnaState);
    qnaState.setIsAdded(true);
  }, [state]);

  // 문의등록
  const handleConfirmClick = async () => {
    if (inputValue.trim()) {
      const data = {
        qnaCategory: "COMMENT",
        questionComment: inputValue,
      };
      await actions.createProjectComment(projectNum, data);

      setInputValue(""); // 입력 값 초기화
      setIsQBoxVisible(false); // QBox 숨기기
      qnaState.setIsAdded(true)
    }
  };

  useEffect(() => {
    if(qnaState.isAdded){
      qnaState.projectActions.changeQnaList(qnaState.qnaState);
    }

  },[qnaState.isAdded])

  const handleCancelClick = () => {
    setInputValue(""); // 입력 값 초기화
    setIsQBoxVisible(false); // QBox 숨기기
  };

  // 수정 (수정은 댓글 작성자만 가능)
  const handleUpdate = async (qna, commentText) => {
    if(commentText){
      await actions.updatedComment(qna.qnaNumber, commentText);
      qnaState.setIsAdded(true)
    }
  };

  // 답변 (프로젝트 작성자만 답변 가능)
  const handleAnswer = async (qna, answerText) => {
    if (answerText) {
      await actions.updateReplyQna(qna.qnaNumber, answerText);
      qnaState.setIsAdded(true);
    }
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
          value={inputValue} // 문의 작성
          onChange={(e) => setInputValue(e.target.value)} // 입력 값 변경
        />
        <Btns>
          <ProductBtn1
            fontSize="0.7rem"
            padding="3px 0px"
            width="55px"
            text="확인"
            onClick={handleConfirmClick}
          />
          <ProductBtn2
            fontSize="0.7rem"
            padding="3px 0px"
            width="55px"
            text="취소"
            onClick={handleCancelClick}
          />
        </Btns>
      </QBox>

      {/* Q&A 리스트 */}
      {Array.isArray(qnaState.qnaState) &&
        qnaState.qnaState.map((qna, index) => (
          <UserQnaBox
            key={qna.qnaNumber}
            qna={qna}
            onUpdate={handleUpdate} // 수정 핸들러 전달
            onAnswer={handleAnswer} // 답변 핸들러 전달
            user={user}
            projectUser={qnaState.projectUser}
          />
        ))}
    </div>
  );
});

export default MainProDetailQnA;
