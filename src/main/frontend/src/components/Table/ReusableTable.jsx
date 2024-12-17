import React, { useState } from "react";
import styles from "./ReusableTable.module.css";
import { WhiteBtn } from "../MyBtn";
import { formattedDate } from "../../utils/formattedData";

const ReusableTable = ({
  title,
  data,
  columns,
  searchOptions,
  onSearch,
  categories,
  onRowClick,
  tableClassName,
  defaultSortBy = "writeDate",
  defaultSortOrder = "desc",
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState(searchOptions?.[0]?.value || "");
  const [checkedRows, setCheckedRows] = useState(data.map(() => false));
  const [allChecked, setAllChecked] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: defaultSortBy,
    direction: defaultSortOrder,
  });

  // 필터링: 검색 기능
  const filteredData = data.filter((row) => {
    const value = String(row[selectedOption] || "").toLowerCase();
    return value.includes(searchKeyword.toLowerCase());
  });

  // 정렬
  const sortedData = [...filteredData].sort((a, b) => {
    const key = sortConfig.key;
    const direction = sortConfig.direction === "asc" ? 1 : -1;

    const aValue = a[key] || "";
    const bValue = b[key] || "";

    if (typeof aValue === "string") {
      return aValue.localeCompare(bValue) * direction;
    } else {
      return (aValue - bValue) * direction;
    }
  });

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(selectedOption, searchKeyword);
    }
  };

  return (
    <div className={styles.wrapper01}>
      <div className={styles.buttonWrapper0}>
        <WhiteBtn
          onClick={() => window.print()}
          text="프린트 출력"
          width="120px"
          fontSize="1rem"
          padding="3px 5px"
          height="40px"
        />
        <div className={styles.searchWrapper0}>
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
          <input
            type="text"
            className={styles.searchInput0}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="검색어를 입력하세요"
          />
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

      <div className={styles.tableWrapper0}>
        <table className={`${styles.table0} ${tableClassName || ""}`.trim()}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={() => {
                    setAllChecked(!allChecked);
                    setCheckedRows(data.map(() => !allChecked));
                  }}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                  style={{ cursor: "pointer" }}
                >
                  {col.label}{" "}
                  {sortConfig.key === col.accessor
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={checkedRows[rowIndex] ? styles.selected0 : ""}
                onClick={() => onRowClick && onRowClick(row)}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={checkedRows[rowIndex]}
                    onChange={(e) => {
                      e.stopPropagation();
                      const newCheckedRows = [...checkedRows];
                      newCheckedRows[rowIndex] = !newCheckedRows[rowIndex];
                      setCheckedRows(newCheckedRows);
                      setAllChecked(newCheckedRows.every(Boolean));
                    }}
                  />
                </td>
                {columns.map((col) => (
                  <td key={col.accessor}>
                    {col.accessor === "writeDate" || col.accessor === "endDate" 
                    || col.accessor === "writtenDate" ||col.accessor === "joinDate" 
                    || col.accessor === "deactivationDate" ||col.accessor === "approvalDate" 
                      ? formattedDate(row[col.accessor])
                      : col.accessor === "isHidden"
                      ? row[col.accessor] === false
                        ? "공개"
                        : "비공개"
                      : row[col.accessor] || ""}
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
