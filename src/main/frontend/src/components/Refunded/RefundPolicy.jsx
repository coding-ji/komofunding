import React from "react";

const RefundPolicy = () => {
  const containerStyle = {
    padding: "16px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "2px",
    width: "70%",
    textAlign: "center",
    margin: "0 auto", // 수평 중앙 정렬
    display: "block", // 블록 레벨로 설정
  };
  const textStyle = {
    color: "#333",
    lineHeight: "1.6",
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}>
        프로젝트 마감 전까지는 <strong>마이페이지 ＞ 나의 프로젝트</strong>에서 후원을 취소할 수 있습니다.
        <br />
        프로젝트 달성률이 100%가 넘지 않으면 자동으로 환불됩니다.
        <br />
        달성률이 100%가 넘을 경우 환불이 불가합니다.
      </p>
    </div>
  );
};

export default RefundPolicy;