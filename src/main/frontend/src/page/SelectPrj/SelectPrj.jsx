import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import MyNavLine from "../../components/MyNavLine";
import { Outlet, useLocation } from "react-router-dom"; // useLocation 사용
import styles from './SelectPrj.module.css'; // CSS 모듈 임포트

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

function SelectPrj() {
  const location = useLocation(); // 경로 감지해서 애니메이션 활성화되도록

  // 새로고침 감지
  const handleBeforeUnload = (event) => {
    event.preventDefault(); // 기본 새로고침 동작 차단
    return ''; 
  };

  // 컴포넌트가 마운트되면 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <SelectBox>
        <div className={styles.Title}>
          <TitleText title="새 프로젝트 등록" />
        </div>
        <MyNavLine />
      </SelectBox>

      {/* 페이지 전환 애니메이션 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // 경로가 변경될 때마다 새로운 키를 할당하여 애니메이션 트리거
          initial={{ x: "30%", opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-30%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.Children}>
            <Outlet />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SelectPrj;
