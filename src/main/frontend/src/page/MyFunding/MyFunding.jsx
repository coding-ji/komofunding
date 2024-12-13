import React from "react";
import TitleText from "../../components/TitleText";
import MyNavLine from "../../components/MyNavLine";
import MyNav from "../../components/MyNav";
import { Outlet } from "react-router-dom";
import styles from "./MyFunding.module.css"; // CSS 모듈 임포트
import { useStore } from "../../stores/ProjectStore/useStore";
import { useEffect, useState } from "react";

function MyFunding() {
  const { state, actions } = useStore();
  
  const [isDeleted, setIsDeleted] = useState(true);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const navItems = [
    { label: "진행 예정 프로젝트", path: "" },
    { label: "진행 중 프로젝트", path: "ongoing" },
    { label: "진행 마감 프로젝트", path: "completed" },
  ];

  useEffect(() => {
    if (user && isDeleted) {
      actions.readUserProjects(user.userNum);
    }

    setIsDeleted(false);
  }, [isDeleted]);

  return (
    <div className={styles.FundingGrid}>
      {" "}
      {/* className에 styles 객체 사용 */}
      <div className={styles.header}>
        <TitleText title="나의 프로젝트" />
      </div>
      <div className={styles.nav}>
        <MyNav navItems={navItems} basePath="/home/myfunding" />
      </div>
      <div className={styles.line}>
        <MyNavLine />
      </div>
      <div className={styles.contentContainer}>
        <Outlet context={{ state, actions, setIsDeleted }} />
      </div>
    </div>
  );
}

export default MyFunding;
