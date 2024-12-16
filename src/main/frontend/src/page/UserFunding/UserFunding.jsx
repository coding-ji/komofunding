import React from "react";
import TitleText from "../../components/TitleText";
import MyNavLine from "../../components/MyNavLine";
import MyNav from "../../components/MyNav";
import { Outlet } from "react-router-dom";
import styles from "./UserFunding.module.css"; // CSS 모듈 임포트
import { useStore } from "../../stores/PaymentStore/useStore";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function UserFunding() {
  const { state, actions } = useStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 처음 렌더링될 때 데이터 가져오기
  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const normalizedPath = location.pathname.replace(/\/$/, ""); // 끝의 슬래시 제거
        if (normalizedPath === "/home/userfunding") {
          actions.getMyFundingByProject("ongoing");
        } else if (normalizedPath === "/home/userfunding/user-completed") {
          actions.getMyFundingByProject("completed");
        }
      } catch (error) {
        console.error("데이터 가져오기 오류", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFundingData(); 
  }, []); // 빈 배열을 넣어 첫 렌더링에 실행

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const normalizedPath = location.pathname.replace(/\/$/, "");
        if (normalizedPath === "/home/userfunding") {
          actions.getMyFundingByProject("ongoing");
        } else if (normalizedPath === "/home/userfunding/user-completed") {
          actions.getMyFundingByProject("completed");
        }
      } catch (error) {
        console.error("데이터 가져오기 오류", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFundingData();
  }, [location.pathname]); // pathname이 변경될 때마다 데이터 갱신


  const navItems = [
    { label: "진행 중 후원", path: "" },
    { label: "마감된 후원", path: "user-completed" },
  ];

  return (
    <div className={styles.FundingGrid}>
      {" "}
      {/* className에 styles 객체 사용 */}
      <div className={styles.header}>
        <TitleText title="나의 후원" />
      </div>
      <div className={styles.nav}>
        <MyNav navItems={navItems} basePath="/home/userfunding" />
      </div>
      <div className={styles.line}>
        <MyNavLine />
      </div>
      <div className={styles.contentContainer}>
        <Outlet context={{ state, actions, loading }}/>
      </div>
    </div>
  );
}

export default UserFunding;
