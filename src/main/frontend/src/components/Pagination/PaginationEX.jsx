import React from "react";
import PaginationComp from "./PaginationComp"; 


const PaginationEX = () => {
  // 예시 데이터
  const data = [
    { id: 1, title: "문의 1", content: "문의 내용 1" },
    { id: 2, title: "문의 2", content: "문의 내용 2" },
    { id: 3, title: "문의 3", content: "문의 내용 3" },
    { id: 4, title: "문의 4", content: "문의 내용 4" },
    { id: 5, title: "문의 5", content: "문의 내용 5" },
    // ... 더 많은 데이터
  ];

  return (
    <PaginationComp
      items={data} // 전체 데이터를 props로 전달
      itemsPerPage={2} // 페이지당 아이템 수 설정 (기본값 10)
      render={(currentItems) => (
        <ul>
          {currentItems.map((data) => (
            <li key={data.id}>
              <h3>{data.title}</h3>
              <p>{data.content}</p>
            </li>
          ))}
        </ul>
      )}
    />
  );
};

export default PaginationEX;
