import React from "react";
import "./MembersSection.css";
import "../../../index.css";

const names = [
  "JANG EUN JI",
  "KWON EUN JI",
  "PYO GEONWOO",
  "KWAK DAE HUN",
  "KEUM KYU HWAN",
  "KIM JU WON",
  "KIM JIN HYUK",
  "MOON SANG IL",
  "PARK SANG JIN",
  "PAIK SEUNG WOO ",
  "JO YEON HEE",
  "OH JAE HEON",
  "YOO SU HYEON",
  "LEE JONG GU",
  "JI SO YEOB",
  "JANG HWAN IK",
  "CHOI HYE RIN",
]; // 나타날 이름들

const MembersSection = () => {
  // 이름 배열을 두 줄로 나누기
  const namesLine1 = names.slice(0, Math.ceil(names.length / 2));
  const namesLine2 = names.slice(Math.ceil(names.length / 2));

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
        {/* 첫 번째 줄 */}
        <div className="name-list">
          {namesLine1.map((name, index) => (
            <span key={index} className="name">
              {name}
            </span>
          ))}
        </div>

        {/* 두 번째 줄 */}
        <div className="name-list">
          {namesLine2.map((name, index) => (
            <span key={index} className="name">
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