import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import TitleText from "../../components/TitleText";
import MyNavLine from "../../components/MyNavLine";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './SelectPrj.module.css';  // CSS 모듈 임포트
import { useState } from "react";
import PopupInquiry from "../MyPage/writeQnA/PopupInquiry"; // PopupInquiry 임포트

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PrjFooter = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  margin-right: 10vw;
  margin-bottom: 20px;
`;

function SelectPrj() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수 상태를 useState로 정의
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가

  const handleNextClick = () => {
    setClickCount((prev) => prev + 1); // 클릭 횟수 증가
  };

  const getNextPage = () => {
    if (clickCount === 0) {
      navigate("prj-two");
    } else if (clickCount === 1) {
      navigate("prj-three");
    }
  };

  const handleCompleteClick = () => {
    // "완료" 클릭 시 PrjAll 페이지로 이동
    navigate("/prjall");  // PrjAll 페이지로 이동
    setShowPopup(true); // 팝업 표시 (필요한 경우)
  };

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
          key={clickCount} // 버튼 클릭 시마다 변경되어 애니메이션 트리거
          initial={{ x: "50%", opacity: 0 }} // 오른쪽에서 가까운 곳으로 시작하고, 초기 opacity는 0
          animate={{ x: 0, opacity: 1 }} // 화면에 나타나고, opacity 1
          exit={{ x: "-50%", opacity: 0 }} // 왼쪽으로 퇴장하며 opacity 0
          transition={{ duration: 0.5 }} // 애니메이션 지속 시간
        >
          <div className={styles.Children}>
            <Outlet />
          </div>
        </motion.div>
      </AnimatePresence>

      <PrjFooter>
        <Btn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          fontFamily="var(--kr-font)"
          text="임시저장"
        />

        <WhiteBtn
          width="80px"
          fontSize="0.9rem"
          padding="8px 3px"
          onClick={() => {
            if (clickCount === 2) {
              handleCompleteClick(); // "완료" 클릭 시 PrjAll 페이지로 이동
            } else {
              getNextPage();
              handleNextClick(); // "다음" 버튼 클릭 시 페이지 이동 및 클릭 횟수 증가
            }
          }}
          text={clickCount === 2 ? "완료" : "다음"} // clickCount가 2일 때 "완료"로 텍스트 변경
        />
      </PrjFooter>

      {/* PopupInquiry 컴포넌트가 showPopup이 true일 때 나타나도록 조건부 렌더링 */}
      {showPopup && <PopupInquiry message="프로젝트 승인까지 3~5일 정도 소요됩니다." 
      closePopup={() => setShowPopup(false)} />}
    </div>
  );
}

export default SelectPrj;
