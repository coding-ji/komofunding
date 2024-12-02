import React from 'react';
import { Btn, ProductBtn1, ProductBtn2, WhiteBtn } from './components/MyBtn';
import styles from './ProgressContainer.module.css';
import Progress from './components/Progress';
import AmountInfo from './components/AmountInfo';
import OtherText from './components/OtherText'; // 새로 추가된 OtherText import

const ProgressContainer = () => {
  const targetAmount = 3750000; // 목표 금액
  const currentAmount = 3000000; // 현재 금액 (AmountInfo에 전달되는 값)
    // 목표금액과 현재금액은 props로 밖에서 받아서 쓸수있게 해주시면됩니다
  // const targetAmount = {targetAmount}; 
  // const currentAmount = {currentAmount};
  
  // 퍼센티지 계산 (소수점 두자리까지 표시)
  const percentage = ((currentAmount / targetAmount) * 100).toFixed(2);

  return (
    <div className={styles.container}>
      
      {/* 수정, 삭제 버튼 */}
      <div className={styles.buttonWrapper}>
        <ProductBtn2 
          text="수정" 
          width="100px" 
          height="40px" 
          fontSize="1rem"
          padding="5px"
          fontFamily="'Noto Sans', sans-serif" 
        />
        <ProductBtn1 
          text="삭제" 
          width="100px" 
          height="40px" 
          fontSize="1rem"
          padding="5px"
          fontFamily="'Noto Sans', sans-serif" 
        />
      </div>

      {/* 텍스트컴포넌츠 불러오기 */}
      <div className={styles.OtherTextWrapper}>
        <OtherText text="기타"/>
      </div>

      {/* AmountInfo 영역 */}
      <div className={styles.amountInfoWrapper}>
        <AmountInfo amount={currentAmount} percentage={percentage} />
      </div>

      {/* Progress 영역 */}
      <div className={styles.progressWrapper}>
        {/* Progress에 퍼센티지 기반 값 전달 */}
        <Progress color="#F5E6D6" value={currentAmount} max={targetAmount} />
        <p className={styles.targetAmount}>목표금액 : {targetAmount.toLocaleString()} 원</p>
      </div>

      {/* 회색 선 */}
      <div className={styles.separator}></div>

      {/* 버튼 영역 */}
      <div className={styles.buttonContainer}>
        <Btn
          text="후원하기"
          width="78%"
          height="50px"
          fontSize="1.2rem"
          padding="10px"
          fontFamily="'Noto Sans', sans-serif" 
        />
        <WhiteBtn
          text="링크"
          width="20%"
          height="50px"
          fontSize="1.2rem"
          padding="10px"
          fontFamily="'Noto Sans', sans-serif" 
        />
      </div>
    </div>
  );
};

export default ProgressContainer;
