import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./input";

function DateRangePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(""); // 날짜 범위 문자열 상태
  const [isOpen, setIsOpen] = useState(false); // 날짜 선택창 열기 상태

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start || new Date());
    setEndDate(end || null);

    // 날짜 범위 문자열로 업데이트
    if (start && end) {
      setDateRange(`${start.toLocaleDateString()} - ${end.toLocaleDateString()}`);
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
        type="text"
        value={dateRange}
        readOnly
        placeholder="펀딩 기간을 선택하세요"
        onClick={handleInputClick} // input 클릭 시 날짜 선택창 열기
        margin ="5px 0px"
        size ="small"
      />

      {/* 날짜 선택창 */}
      {isOpen && (
        <div style={{ position: "absolute", zIndex: 1 }}>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 5)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            showDisabledMonthNavigation
            onClickOutside={handleOutsideClick} // 날짜 선택창 외부 클릭 시 닫기
            onSelect={() => setIsOpen(false)} // 날짜 선택 후 선택창 닫기
          />
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
