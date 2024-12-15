import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./input";
import {formattedDate} from "../utils/formattedData"

function DateRangePicker({ onDateChange, startDate, endDate, projectActions, projectNum }) {
  const [dateRange, setDateRange] = useState(""); // 날짜 범위 문자열 상태
  const [isOpen, setIsOpen] = useState(false); // 날짜 선택창 열기 상태

  useEffect(() => {
    // startDate, endDate가 변경되면 dateRange를 업데이트
    if (startDate && endDate) {
      setDateRange(
        `${formattedDate(startDate)} - ${formattedDate(endDate)}`
      );
    } else {
      setDateRange("");
    }
  }, [startDate, endDate]); // startDate, endDate가 변경될 때마다 실행

  const onChange = (dates) => {
    const [start, end] = dates;

    projectActions.changeProjectStartDate(start || null);
    projectActions.changeProjectEndDate(end || null);

    // 날짜 범위 문자열로 업데이트
    if (start && end) {
      setDateRange(
        `${formattedDate(start)} - ${formattedDate(end)}`
      );
      // 부모 컴포넌트에 날짜 범위 전달
      if (onDateChange) {
        onDateChange(start, end);
      }
    } else {
      setDateRange("");
    }
  };

  const handleInputClick = () => {
    setIsOpen(true); // input 클릭 시 날짜 선택창 열기
  };

  const handleOutsideClick = () => {
    setIsOpen(false); // 날짜 선택창 외부 클릭 시 닫기
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 클릭 시 날짜 선택창이 열리는 input */}
      <Input
        width="300px"
        type="text"
        value={dateRange}
        readOnly
        placeholder="펀딩 기간을 선택하세요"
        onClick={handleInputClick} // input 클릭 시 날짜 선택창 열기
        margin="5px 0px"
        size="medium"
      />

      {/* 날짜 선택창 */}
      {isOpen && (
        <div style={{ position: "absolute", zIndex: 1 }}>
          <DatePicker
            selected={startDate} // 시작 날짜
            onChange={onChange} // 날짜 변경 시 실행될 함수
            minDate={new Date()} // 선택 가능한 최소 날짜
            maxDate={addMonths(new Date(), 5)} // 선택 가능한 최대 날짜 (5개월 후)
            startDate={startDate} // 시작 날짜
            endDate={endDate} // 종료 날짜
            selectsRange // 날짜 범위 선택
            inline
            showDisabledMonthNavigation
            onClickOutside={handleOutsideClick} // 날짜 선택창 외부 클릭 시 닫기
            onSelect={() => setIsOpen(false)} // 날짜 선택 후 선택창 닫기
            disabled={!!projectNum} // projectNum이 있을 경우 날짜 선택 비활성화
          />
          
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;