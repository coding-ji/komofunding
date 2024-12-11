import React from "react";

const Bluebox = ({ text }) => {
  const containerStyle = {
    padding: "16px",
    color: "white",
    backgroundColor: "#256E91",
    borderRadius: "2px",
    width: "auto",
    textAlign: "center",
    margin: "0 auto", // 수평 중앙 정렬
    display: "block", // 블록 레벨로 설정
    fontSize: "20px"
  };

  return (
    <div style={containerStyle}>
      <h4>{text}</h4>
    </div>
  );
};

export default Bluebox;
