import React, { useState } from "react";
import "./SideMenu.css";
import "../../index.css";
import inquiry from "./inquiry.svg";
import project from "./project.svg";
import support from "./support.svg";
import ArrowUp from './arrow-up.svg'
import ArrowDown from './arrow-down.svg'
import { motion } from "framer-motion";
import styled from "styled-components";


const Wrapper = styled.div`
  display: inline-block;
  overflow: hidden; /* 텍스트가 컨테이너 밖으로 넘치지 않도록 설정 */
  height: 4rem;
  margin-bottom: 5rem;

      @media (max-width:600px) {
      display: none;
    }
`;

const WrapperMenu = styled.div`
  display: inline-block;
  overflow: hidden; /* 텍스트가 컨테이너 밖으로 넘치지 않도록 설정 */
  height: 3rem;
  margin-bottom: 5rem;
  border-bottom : 3px solid white;
  width : 100%;
`;


function SideMenu() {
    const [activeMenu, setActiveMenu] = useState(null); // 현재 활성화된 메뉴 상태

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu); // 클릭한 메뉴를 토글
    };

    return (
        <div className="side-menu">
            <Wrapper >
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
                    <motion.div className="menutext"
                        initial={{ y: "100%" }} // 텍스트가 아래쪽에 숨겨진 상태로 시작
                        animate={{ y: "0%" }} // 텍스트가 위로 올라오면서 완전히 보임
                        transition={{
                            duration: 1, // 애니메이션 지속 시간
                            ease: "easeOut", // 부드러운 종료 효과
                        }}
                        viewport={{ once: true }}
                    >메뉴</motion.div>
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
                            <li>진행 중인 후원</li>
                            <li>마감 된 후원</li>
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
                            <Link to="/home/selecPrj"><li>새 프로젝트 작성</li></Link>
                            <Link to="/home/myfunding"><li>진행 예정 프로젝트</li></Link>
                            <Link to="/home/myfunding/ongoing"><li>진행 중 프로젝트</li></Link>
                            <Link to="/home/myfunding/completed"><li>마감된 프로젝트</li></Link>
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
                            <li>문의하기</li>
                            <li>나의 문의 내역</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;
