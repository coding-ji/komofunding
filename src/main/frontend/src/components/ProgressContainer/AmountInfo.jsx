import React from 'react';
import styles from './AmountInfo.module.css'; // 별도 CSS 모듈 사용


const AmountInfo = ({ amount, percentage }) => {
  return (
    <div className={styles.amountWrapper}>
      <p className={styles.coin}>
        <span>모인금액</span>
        <span className={styles.numberstyle}>
          <span className={styles.amountstyle}>{amount.toLocaleString()}</span> 원
        </span>
      </p>
      <p className={styles.percentwrapper}>
        <span className={styles.percentinfo}>달 성 률</span>
        <span className={styles.percent}>
          <span className={styles.percentAmount}>{percentage}</span> %
        </span>
      </p>
    </div>
  );
};

export default AmountInfo;
