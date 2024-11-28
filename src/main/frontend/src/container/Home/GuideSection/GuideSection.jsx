import React from "react";
import styles from "./GuideSection.module.css";
import image from "./img2.jpg"; // 이미지 파일을 임포트
import SelectProjectBtn from "../../../components/SelectProjectBtn";

const GuideSection = () => {
  return (
    <div className={styles.maindiv}>

      {/* 상단 제목 */}
      <h1 className={styles.title}>A GUIDE TO USE</h1>
      <div className={styles.container}>
      {/* 이미지와 버튼 그룹 */}
      <div className={styles.content}>
        {/* 이미지 */}
        <div className={styles.imageContainer}>
          <img src={image} alt="Crosswalk" className={styles.image} />
        </div>

        {/* 버튼 그룹 */}
        <div className={styles.buttonContainer}>
          <SelectProjectBtn title="PROJECT SELECT" />
          <SelectProjectBtn title="PROJECT MANAGE" />
          <SelectProjectBtn title="PROJECT SUPPORT" />
        </div>
      </div>
    </div>
    </div >
  );
};

export default GuideSection;
