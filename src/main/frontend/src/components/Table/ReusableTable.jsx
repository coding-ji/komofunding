import React, { useState } from "react";
import styles from "./ReusableTable.module.css";
import { WhiteBtn } from "../MyBtn";
import { formattedDate } from "../../utils/formattedData";
const ReusableTable = ({ title, data, columns, searchOptions, onSearch, categories, onRowClick, tableClassName }) => {

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState(searchOptions?.[0]?.value || ""); // 기본 검색 옵션
  const [checkedRows, setCheckedRows] = useState(data.map(() => false)); // 각 행의 체크 상태
  const [allChecked, setAllChecked] = useState(false); // 전체 선택 상태

  // 검색 실행
  const handleSearch = () => {
    if (onSearch) {
      onSearch(selectedOption, searchKeyword); // 검색 기준과 키워드를 부모로 전달
      setSearchKeyword(""); // 검색어 초기화
      setSelectedOption(searchOptions?.[0]?.value || ""); // 드롭다운 초기화
    }
  };
``
  // 엔터 키로 검색 실행
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
      {/* 버튼 영역 */}
      <div className={styles.buttonWrapper0}>
        <WhiteBtn
          onClick={handlePrint}
          text="프린트 출력"
          width="120px"
          fontSize="1rem"
          padding="3px 5px"
          height="40px"
        />
        <div className={styles.searchWrapper0}>
          {/* 검색 기준 드롭다운 */}
          <select
            className={styles.dropdown0}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {searchOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* 검색 키워드 입력 */}
          {selectedOption === "isHidden" ? (
            <select
              className={styles.dropdown0}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            >
              <option value="">전체</option>
              <option value="false">공개</option>
              <option value="true">비공개</option>
            </select>
          ) : selectedOption === "communityCategory" ? (
            <select
              className={styles.dropdown0}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            >
              <option value="">전체</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            ) : (
            <input
              type="text"
              className={styles.searchInput0}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress} // 엔터 키로 검색 실행
              placeholder="검색어를 입력하세요"
            />
          )}

          {/* 검색 버튼 */}
          <WhiteBtn
            onClick={handleSearch}
            text="검색"
            width="80px"
            fontSize="1rem"
            padding="3px 5px"
            height="40px"
          />
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className={styles.tableWrapper0}>
      <table className={`${styles.table0} ${tableClassName || ''}`.trim()}>
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
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={checkedRows[rowIndex] ? styles.selected0 : ""}
                onClick={() => onRowClick && onRowClick(row)} // 추가: 행 클릭 처리
                style={{ cursor: onRowClick ? "pointer" : "default" }} // 클릭 가능 여부 시각적 피드백
              >
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox0}
                    checked={checkedRows[rowIndex]}
                    onChange={(e) => {
                      e.stopPropagation(); // 행 클릭 이벤트 차단
                      handleCheckboxChange(rowIndex);
                    }}
                  />
                </td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {col.accessor === "writeDate" || col.accessor === "endDate" || col.accessor === "joinDate" || col.accessor === "applicationDate" || col.accessor === "deactivationDates" 
                      ? formattedDate(row[col.accessor]).toLocaleString()
                      : col.accessor === "isHidden"
                      ? row[col.accessor] === false
                        ? "공개"
                        : "비공개"
                      : row[col.accessor]}
                  </td>
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
