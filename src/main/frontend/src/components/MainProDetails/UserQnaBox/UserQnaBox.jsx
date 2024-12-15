import React, { useState, useEffect } from "react";
import styles from "./UserQnaBox.module.css";
import DescriptionProduct from "../../DescriptionProduct";
import { ProductBtn1, ProductBtn2 } from "../../MyBtn";

function UserQnaBox({ user, qna, projectUser, onUpdate, onAnswer }) {
  const [isAnswerVisible, setAnswerVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [editedQuestion, setEditedQuestion] = useState(qna.questionComment);
  const [answerText, setAnswerText] = useState(qna.answer || ""); // 답변 텍스트 상태 추가
  const [isAnswering, setIsAnswering] = useState(false); // 답변 모드 활성화 상태
  const [savedAnswer, setSavedAnswer] = useState(qna.answer); // 저장된 답변 상태

  const toggleAnswer = () => {
    setAnswerVisible(!isAnswerVisible);
  };

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드 활성화
  };

  const handleSaveClick = () => {
    setIsEditing(false); // 편집 모드 비활성화
    onUpdate(qna, editedQuestion); // 부모 컴포넌트에 업데이트 요청
  };

  const handleCancelClick = () => {
    setIsEditing(false); // 편집 모드 비활성화
    setEditedQuestion(qna.questionComment); // 수정 전 내용 복원
  };

  const handleAnswerClick = () => {
    setIsAnswering(true); // 답변 모드 활성화
  };

  const handleAnswerSave = () => {
    setIsAnswering(false); // 답변 모드 비활성화
    onAnswer(qna, answerText); // 부모 컴포넌트에 답변 요청
    setSavedAnswer(answerText); // 저장된 답변 업데이트
  };

  return (
    <div>
      {/* 유저 질문 부분 */}
      <div
        className={styles.qnaBox}
        onClick={!isEditing ? toggleAnswer : undefined}
      >
        <div className={styles.userInfo}>
          <DescriptionProduct
            color="black"
            padding="0"
            fontWeight="bold"
            text={qna.nickName}
          />
        </div>

        <div className={styles.dateInfo}>
          <DescriptionProduct
            color="black"
            fontWeight="bold"
            padding="0"
            text={new Date(qna.writtenDate).toLocaleDateString()}
          />
        </div>

        <div className={styles.questionText}>
          {isEditing ? (
            <textarea
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              className={styles.editInput}
            />
          ) : (
            <DescriptionProduct
              color="black"
              padding="12px 0px"
              text={qna.questionComment}
            />
          )}
        </div>

        {/* 수정 / 확인 / 취소 버튼 */}
        {!qna.answer && (
          <div className={styles.editButtons}>
            {isEditing ? (
              <>
                <ProductBtn1
                  fontSize="0.7rem"
                  padding="3px 0px"
                  width="55px"
                  text="확인"
                  onClick={handleSaveClick}
                />
                <ProductBtn2
                  fontSize="0.7rem"
                  padding="3px 0px"
                  width="55px"
                  text="취소"
                  onClick={handleCancelClick}
                />
              </>
            ) : (
              <>
                {user.userNum == qna.userNum &&
                  <ProductBtn1
                    justifySelf="center"
                    fontSize="0.7rem"
                    padding="3px 0px"
                    width="55px"
                    height="23px"
                    text="수정"
                    onClick={handleEditClick}
                  />
                }
                {user.userNum == projectUser && 
                  <ProductBtn1
                    justifySelf="center"
                    fontSize="0.7rem"
                    padding="3px 0px"
                    width="55px"
                    height="23px"
                    text="답변"
                    onClick={handleAnswerClick} // 답변 버튼 클릭 시 활성화
                  />
                }
              </>
            )}
          </div>
        )}
      </div>
      {/* 답변 작성 */}
      {isAnswering && !qna.answer && (
        <div className={styles.answerBox}>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className={styles.editInput}
          />
          <div className={styles.editButtons}>
            <ProductBtn1
              fontSize="0.7rem"
              padding="3px 0px"
              width="55px"
              text="등록"
              onClick={handleAnswerSave} // 답변 저장
            />
            <ProductBtn2
              fontSize="0.7rem"
              padding="3px 0px"
              width="55px"
              text="취소"
              onClick={() => setIsAnswering(false)} // 답변 취소
            />
          </div>
        </div>
      )}

      {/* 제작자 답변 */}
      <div
        className={`${styles.answerBox} ${
          isAnswerVisible ? styles.show : styles.hide
        }`}
      >
        {isAnswerVisible && (savedAnswer || qna.answer) && (
          <>
            <div className={styles.userInfo}>
              <DescriptionProduct
                color="black"
                fontWeight="bold"
                padding="0"
                text={qna.answerNickName}
              />
            </div>

            <div className={styles.dateInfo}>
              <DescriptionProduct
                color="black"
                fontWeight="bold"
                padding="0"
                text={new Date(qna.answerWrittenDate).toLocaleDateString()}
              />
            </div>

            <div className={styles.questionText}>
              <DescriptionProduct
                color="black"
                padding="12px 0px"
                text={savedAnswer || qna.answer} //저장된 답변 또는 기존 답변 표시
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserQnaBox;
