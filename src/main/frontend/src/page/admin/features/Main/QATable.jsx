import React from "react";
import styles from "./QATable.module.css";

export const QATable1 = ({ data }) => {
  return (
    <table className={styles.qaTable}>
      <thead>
        <tr>
          <th>번호</th>
          <th>질문</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{item.views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const QATable2 = ({ data }) => {
  return (
    <table className={styles.qaTable}>
      <thead>
        <tr>
          <th>번호</th>
          <th>사용자 ID</th>
          <th>이름</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.userId}</td>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const QATable3 = ({ data }) => {
  return (
    <table className={styles.qaTable}>
      <thead>
        <tr>
          <th>번호</th>
          <th>질문</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.title}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
