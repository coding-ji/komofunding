import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import MyNavLine from "../../components/MyNavLine";
import { Outlet, useLocation, useParams } from "react-router-dom"; // useLocation 사용
import styles from "./SelectPrj.module.css"; // CSS 모듈 임포트
import { useStore as ProjectStore } from "../../stores/ProjectStore/useStore";

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

function SelectPrj() {
  const location = useLocation(); // 경로 감지해서 애니메이션 활성화되도록
  const { projectNum } = useParams(); // URL에서 projectNum 추출
  const { state : projectState, actions :projectActions } = ProjectStore();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [data, setData] = useState(null);

  // 새로고침 감지
  const handleBeforeUnload = (event) => {
    event.preventDefault(); // 기본 새로고침 동작 차단
    event.returnValue = "";
  };

  // 컴포넌트가 마운트되면 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem("projectState");
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (projectNum) {
        await projectActions.readProjectDetail(projectNum);
      }
    };

    fetchData();
  }, [projectNum]);

  useEffect(() => {
    if (projectState.project) {
      setData(projectState.project);
      localStorage.setItem("projectState", JSON.stringify(projectState.project));
    } else {
      localStorage.removeItem("projectState");
      setIsLoading(false);
    }
  }, [projectState.project]);

  return (
    <div>
      <SelectBox>
        <div className={styles.Title}>
          <TitleText
            title={projectNum ? "프로젝트 수정" : "새 프로젝트 등록"}
          />
        </div>
        <MyNavLine />
      </SelectBox>
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>로딩 중...</div>
      ) : (
        // 페이지 전환 애니메이션
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} // 경로가 변경될 때마다 새로운 키를 할당하여 애니메이션 트리거
            initial={{ x: "30%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-30%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.Children}>
              {/* Outlet에 프로젝트 데이터를 전달 */}
              <Outlet context={{ data, projectActions, projectNum }} />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default SelectPrj;
