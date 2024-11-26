import React from "react";
import styles from "./MyInquiryHistoryItemmodule.css";

function MyInquiryHistoryItem({ title, content, date, status }) {
  return (
    <div className={styles.inquiryItem}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>
        <span className={styles.date}>{date}</span>
        <span className={styles.status}>{status}</span>
      </div>
    </div>
  );
}

export default MyInquiryHistoryItem;
