import React from "react";
import "./MembersSection.css";
import "../../../index.css";

const names = [
  "장은지",
  "권은지",
  "표건우",
  "곽대훈",
  "금규환",
  "김주원",
  "김진혁",
  "문상일",
  "박상진",
  "백승우",
  "조연희",
  "오재헌",
  "유수현",
  "이종구",
  "지소엽",
  "장환익",
  "최혜린",
]; // 나타날 이름들

const MembersSection = () => {
  return (
    <div className="film-strip">
      {/* 상단 중앙의 MEMBERS 텍스트 */}
      <div className="film-header">MEMBERS</div>

      {/* 왼쪽 필름 구멍 */}
      <div className="film-holes film-holes-left">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="hole"></div>
        ))}
      </div>

      {/* 이름 마키 애니메이션 */}
      <div className="name-marquee">
        <div className="name-list">
          {names.map((name, index) => (
            <span key={index} className="name">
              {name}
            </span>
          ))}
          {/* 반복된 이름 추가 */}
          {names.map((name, index) => (
            <span key={`repeat-${index}`} className="name">
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* 오른쪽 필름 구멍 */}
      <div className="film-holes film-holes-right">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="hole"></div>
        ))}
      </div>
    </div>
  );
};

export default MembersSection;
