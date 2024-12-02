import React from "react";
import styles from "./ImageSection.module.css"; // CSS 모듈 임포트
import img from "./KOSMMOFUNDING.png";

const ImageSection = () => {
  return (
    <div>
      {/* Parallax Section */}
      <section
        className={styles.parallax}
        style={{ backgroundImage: `url(${img})` }} // 배경 이미지 설정
      >
        <div className={styles.container}>
          <div  className={styles.innerContainer}>
            <h1 className={styles.heading}>
              THE FINAL <br /> PROJECT
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageSection;
