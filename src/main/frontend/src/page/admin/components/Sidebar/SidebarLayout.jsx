import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SidebarLayout.module.css";
import memberIcon from "./icon/user/user svg.svg";
import projectIcon from "./icon/project/prj svg.svg";
import paymentIcon from "./icon/pay/pay svg.svg";
import noticeIcon from "./icon/notice/notice svg.svg";
import eventIcon from "./icon/event/event svg.svg";
import qnaIcon from "./icon/q&a/Q&A svg.svg";



const SidebarLayout = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true); // 메뉴 접힘 상태
  const [adminNickname, setNickname] = useState(""); // 닉네임 상태
  const [adminEmail, setEmail] = useState(""); // 이메일 상태

  const navigate = useNavigate()
  
  const toggleMenu = (menu,event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    setActiveMenu((prevMenu) => (prevMenu === menu ? "" : menu));
  };

  const handleMenuClick = (menu, path, event) => {
    event.preventDefault(); // 기본 동작 방지
    event.stopPropagation(); // 이벤트 전파 방지
  
    toggleMenu(menu, event); // 메뉴 확장/축소
    console.log(`Navigating to ${path}`); // 디버그용 로그
  
    if (path) navigate(path); // 경로가 있을 경우만 이동
  };


  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev); // 사이드바 접힘 상태 토글
  };

    // 로컬스토리지에서 닉네임과 이메일 불러오기
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user")); // 로컬스토리지에서 가져오기
      if (userData) {
        setNickname(userData.adminNickname || "관리자"); // 닉네임 설정
        setEmail(userData.adminEmail || "admin@example.com"); // 이메일 설정
      }
    }, []);

  return (
    <div
      className={styles.sidebar}   >
       <div className={styles.headeradminside} onClick={toggleSidebar}>
      <h1 className={styles.logo}>{adminNickname || "포실포실포시리"}</h1>
      <h2 className={styles.email}>{adminEmail || "email@example.com"}</h2>
      </div>

      <ul
        className={`${styles.menu} ${
          isCollapsed ? styles.menuCollapsed : styles.menuExpanded
        }`}>
        {/* 회원관리 */}
        <li>
          <div className={styles.sectionDivider}>관리 홈</div>
          <div
            className={styles.menuHeader}

            onClick={(e) => handleMenuClick("member", "/admin/user/user-management?tab=ALL", e)}
          >
            <img src={memberIcon} alt="회원관리" /> 회원관리
          </div>
          {activeMenu === "member" && (
            <ul className={styles.subMenu}>
              <li>
                   <Link to="/admin/user/user-management?tab=ALL">전체회원</Link>
              </li>
              <li>

                <Link to="/admin/user/user-management?tab=CREATORPENDING">제작자 전환 대기</Link>
              </li>
              <li>

                <Link to="/admin/user/user-management?tab=DEACTIVATED">탈퇴회원</Link>
              </li>
            </ul>
          )}
        </li>

        {/* 프로젝트 */}
        <li>
        <div
            className={styles.menuHeader}
            onClick={(e) => handleMenuClick("project", "/admin/project/project-management?tab=ALL", e)}
          >
            <img src={projectIcon} alt="프로젝트" /> 프로젝트
          </div>
          {activeMenu === "project" && (
            <ul className={styles.subMenu}>
              <li>
              <Link to="/admin/project/project-management?tab=REVIEW">심사 현황</Link>
              </li>
              <li>
                <Link to="/admin/project/project-management?tab=HIDDEN">숨긴 프로젝트</Link>
              </li>
            </ul>
          )}
        </li>

        {/* 결제 */}
        <li>
        <div
            className={styles.menuHeader}
            onClick={(e) => toggleMenu("payment",e)}
          >
            <img src={paymentIcon} alt="결제" /> 결제
          </div>
          {activeMenu === "payment" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/payment/settlement">정산</Link>
              </li>
              <li>
                <Link to="/admin/payment/refund">환불</Link>
              </li>
            </ul>
          )}
        </li>

        {/* 펀딩 운영 */}
        <li>
          <div className={styles.sectionDivider}>펀딩 운영</div>
          {/* 공지사항 */}
{/*           
          <div
            className={styles.menuHeader}
            onClick={(e) => toggleMenu("announcement",e)}
          >
            <img src={noticeIcon} alt="공지사항" /> 공지사항
          </div> */}

          <div
            className={styles.menuHeader}
            onClick={(e) => handleMenuClick("announcement", "/admin/community/notice-faq?tab=ALL", e)}
          >
            <img src={noticeIcon} alt="공지사항" /> 공지사항
          </div>

          {activeMenu === "announcement" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/community/write">글 작성</Link>
              </li>
              <li>
                <Link to="/admin/community/notice-faq?tab=NOTICE">공지사항</Link>
              </li>
              <li>
                <Link to="/admin/community/notice-faq?tab=FAQ">자주 묻는 질문</Link>
              </li>
            </ul>
          )}
 
          {/* 이벤트 */}
          <div
            className={styles.menuHeader}
            onClick={(e) => handleMenuClick("event", "/admin/community/event?tab=ALL", e)}
          >
            <img src={eventIcon} alt="이벤트" /> 이벤트
          </div>
          {activeMenu === "event" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/community/event?tab=ONGOING">진행 중인 이벤트</Link>
              </li>
              <li>
                <Link to="/admin/community/event?tab=ENDED">종료된 이벤트</Link>
              </li>
            </ul>
          )}


          {/* Q&A */}
          <div
            className={styles.menuHeader}
            onClick={(e) => toggleMenu("qna",e)}
          >
            <img src={qnaIcon} alt="Q&A" /> Q&A
          </div>
          {activeMenu === "qna" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/qna/waiting">답변 대기</Link>
              </li>
              <li>
                <Link to="/admin/qna/completed">답변 완료</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
     
    </div>
  );
};

export default SidebarLayout;
