import React, { useState } from "react";
import styles from "./UserQnaBox.module.css";
import DescriptionProduct from "../../DescriptionProduct";
import { ProductBtn1, ProductBtn2 } from "../../MyBtn";

function UserQnaBox() {
  const [isAnswerVisible, setAnswerVisible] = useState(false);

  const toggleAnswer = () => {
    setAnswerVisible(!isAnswerVisible);
  };

  return (
    <div>
      {/* 유저 질문 부분 */}
      <div className={styles.qnaBox} onClick={toggleAnswer}>
        <div className={styles.userInfo}>
          <DescriptionProduct color="black" padding="0" fontWeight="bold" text="김꼬모" />
        </div>

        <div className={styles.dateInfo}>
          <DescriptionProduct color="black" fontWeight="bold" padding="0" text="2024-11-08" />
        </div>

        <div className={styles.questionText}>
          <DescriptionProduct
            color="black"
            padding="0px 0px 20px 0px"
            text="저기 궁금한데, 이거 술 100%인가요?"
          />
        </div>

        <div className={styles.buttons}>
          <ProductBtn1 width="60px" padding="0" fontSize="0.8rem" text="수정" />
          <ProductBtn2 width="60px" padding="0" fontSize="0.8rem" text="삭제" />
        </div>
      </div>

      {/* 제작자 답변 부분 */}
      <div
        className={`${styles.answerBox} ${
          isAnswerVisible ? styles.show : styles.hide
        }`}
      >
        <div className={styles.userInfo}>
          <DescriptionProduct color="black" fontWeight="bold" padding="0" text="제작자" />
        </div>

        <div className={styles.dateInfo}>
          <DescriptionProduct color="black" fontWeight="bold" padding="0" text="2024-11-09" />
        </div>

        <div className={styles.questionText}>
          <DescriptionProduct
            color="black"
            padding="0px 0px 20px 0px"
            text="안녕하세요! 이 술은 100%가 맞습니다. 추가 질문 있으시면 말씀해주세요!"
          />
        </div>
      </div>
    </div>
  );
}

export default UserQnaBox;
