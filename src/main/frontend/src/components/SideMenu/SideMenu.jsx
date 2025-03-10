import React, { useState } from "react";
import "./SideMenu.css";
import "../../index.css";
import inquiry from "./inquiry.svg";
import project from "./project.svg";
import support from "./support.svg";
import ArrowUp from "./arrow-up.svg";
import ArrowDown from "./arrow-down.svg";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden; /* 텍스트가 컨테이너 밖으로 넘치지 않도록 설정 */
  height: 4rem;
  margin-bottom: 5rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

const WrapperMenu = styled.div`
  display: inline-block;
  overflow: hidden; /* 텍스트가 컨테이너 밖으로 넘치지 않도록 설정 */
  height: 3rem;
  margin-bottom: 5rem;
  border-bottom: 3px solid white;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;

  &:hover {
    color: #f1c40f; }


`

function SideMenu({onDeleteAccount }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeMenu, setActiveMenu] = useState(null); // 현재 활성화된 메뉴 상태

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu); // 클릭한 메뉴를 토글
  };


  return (
    <div className="side-menu">
      <Wrapper>
        <motion.div
          className="profile"
          initial={{ y: "-100%" }} // 텍스트가 아래쪽에 숨겨진 상태로 시작
          animate={{ y: "0%" }} // 텍스트가 위로 올라오면서 완전히 보임
          transition={{
            duration: 1, // 애니메이션 지속 시간
            ease: "easeOut", // 부드러운 종료 효과
          }}
          viewport={{ once: true }}
        >
          프로필
        </motion.div>
      </Wrapper>
      <div className="menu">
        <WrapperMenu>
          <motion.div
            className="menutext"
            initial={{ y: "100%" }} // 텍스트가 아래쪽에 숨겨진 상태로 시작
            animate={{ y: "0%" }} // 텍스트가 위로 올라오면서 완전히 보임
            transition={{
              duration: 1, // 애니메이션 지속 시간
              ease: "easeOut", // 부드러운 종료 효과
            }}
            viewport={{ once: true }}
          >
            메뉴
          </motion.div>
        </WrapperMenu>
        <div className="menu-section">
          {/* 나의 후원 */}
          <div className="menu-title" onClick={() => toggleMenu("mySupport")}>
            <img src={support} alt="후원 아이콘" className="menu-icon" />
            나의 후원
            <span className="arrow">
              {activeMenu === "mySupport" ? (
                <img src={ArrowUp} alt="Up Arrow" />
              ) : (
                <img src={ArrowDown} alt="Down Arrow" />
              )}
            </span>
          </div>
          <motion.div
            className="submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={
              activeMenu === "mySupport"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <ul>
              <li><StyledLink to="/home/userfunding">진행 중인 후원</StyledLink></li>
              <li><StyledLink to="/home/userfunding/user-completed">마감 된 후원</StyledLink></li>
            </ul>
          </motion.div>
        </div>

        {/* 나의 프로젝트 */}
        <div className="menu-section">
          <div className="menu-title" onClick={() => toggleMenu("myProject")}>
            <img src={project} alt="프로젝트 아이콘" className="menu-icon" />
            나의 프로젝트
            <span className="arrow">
              {activeMenu === "myProject" ? (
                <img src={ArrowUp} alt="Up Arrow" />
              ) : (
                <img src={ArrowDown} alt="Down Arrow" />
              )}
            </span>
          </div>
          <motion.div
            className="submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={
              activeMenu === "myProject"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <ul>
              <li>
                <StyledLink to="/home/selectPrj">새 프로젝트 작성</StyledLink>
              </li>
              <li>
                <StyledLink to="/home/myfunding">진행 예정 프로젝트</StyledLink>
              </li>
              <li>
                {" "}
                <StyledLink to="/home/myfunding/ongoing">진행 중 프로젝트</StyledLink>
              </li>
              <li>
                <StyledLink to="/home/myfunding/completed">마감된 프로젝트</StyledLink>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* 나의 문의 */}
        <div className="menu-section">
          <div className="menu-title" onClick={() => toggleMenu("myInquiry")}>
            <img src={inquiry} alt="문의 아이콘" className="menu-icon" />
            나의 문의
            <span className="arrow">
              {activeMenu === "myInquiry" ? (
                <img src={ArrowUp} alt="Up Arrow" />
              ) : (
                <img src={ArrowDown} alt="Down Arrow" />
              )}
            </span>
          </div>
          <motion.div
            className="submenu"
            initial={{ height: 0, opacity: 0 }}
            animate={
              activeMenu === "myInquiry"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <ul>
              <li><StyledLink to={`/home/inquiry/${user.userNum}/write`}>문의하기</StyledLink></li>
              <li><StyledLink to={`/home/inquiry`}>나의 문의 내역</StyledLink></li>
            </ul>
          </motion.div>
        </div>
      </div>
      <div className="delete-account"
      onClick={onDeleteAccount}
      >
        회원탈퇴
      </div>
    </div>
  );
}

export default SideMenu;
