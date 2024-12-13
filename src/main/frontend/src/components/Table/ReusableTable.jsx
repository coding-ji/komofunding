import React, { useState } from "react";
import styles from "./ReusableTable.module.css";
import { WhiteBtn } from "../MyBtn";

const ReusableTable = ({ title, data, columns }) => {
  const [checkedRows, setCheckedRows] = useState(data.map(() => false)); // 각 행의 체크 상태
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 상태

  // 전체 선택/해제
  const handleSelectAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setCheckedRows(data.map(() => newChecked)); // 모든 행의 체크 상태를 업데이트
  };

  // 개별 행 체크박스 상태 변경
  const handleCheckboxChange = (index) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);
    setAllChecked(updatedCheckedRows.every((isChecked) => isChecked)); // 모두 체크되었는지 확인
  };

  // 프린트 출력 (선택된 항목만)
  const handlePrint = () => {
    const selectedRows = data.filter((_, index) => checkedRows[index]); // 체크된 항목만 필터링
    if (selectedRows.length === 0) {
      alert("선택된 항목이 없습니다."); // 체크된 항목이 없을 경우 알림
      return;
    }

    const printWindow = window.open("", "_blank"); // 새로운 창 열기
    const printContent = `
      <html>
        <head>
          <title>프린트 출력</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <h1>${title || "선택된 데이터 출력"}</h1>
          <table>
            <thead>
              <tr>
                ${columns.map((col) => `<th>${col.label}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${selectedRows
                .map(
                  (row) =>
                    `<tr>${columns
                      .map((col) => `<td>${row[col.accessor] || ""}</td>`)
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
 
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={styles.wrapper01}>
      <div className={styles.buttonWrapper0}>
        <WhiteBtn
          onClick={handlePrint}
          text="프린트 출력"
          width="120px"
          fontSize="1rem"
          padding="3px 5px"
          height="40px"
        />
      </div>

      <div className={styles.tableWrapper0}>
        <table className={styles.table0}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox0}
                  checked={allChecked}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((col, index) => (
                <th key={index}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className={checkedRows[index] ? styles.selected0 : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox0}
                    checked={checkedRows[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
