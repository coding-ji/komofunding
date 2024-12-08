import React from "react";
import styles from "./GuideSection.module.css";
import image from "./img2.jpg"; // 이미지 파일을 임포트
import SelectProjectBtn from "../../../components/SelectProjectBtn";
import { useNavigate } from "react-router-dom";

const GuideSection = () => {
  const navinate = useNavigate();
  return (
    <div className={styles.gridDiv}>
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
              <SelectProjectBtn title="PROJECT SELECT" 
              subtitle="프로젝트 등록"
               onClick={()=>navinate("/home/selectPrj")} 
              />
              <SelectProjectBtn title="PROJECT MANAGE" 
              subtitle="프로젝트 관리"
                  onClick={()=>navinate("/home/myfunding")} 
              />
              <SelectProjectBtn title="PROJECT SUPPORT" 
               subtitle="후원 프로젝트"
                  onClick={()=>navinate("/home/userfunding")} 
               /> 
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default GuideSection;
