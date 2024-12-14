import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SidebarLayout.module.css";
import memberIcon from "./회원관리/user svg.svg";
import projectIcon from "./프로젝트/prj svg.svg";
import paymentIcon from "./결제/pay svg.svg";
import noticeIcon from "./공지사항/notice svg.svg";
import eventIcon from "./이벤트/event svg.svg";
import qnaIcon from "./q&a/Q&A svg.svg";


const SidebarLayout = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true); // 메뉴 접힘 상태

  const navigate = useNavigate()
  
  const toggleMenu = (menu,event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    setActiveMenu((prevMenu) => (prevMenu === menu ? "" : menu));
  };

  const handleMenuClick = (menu, path, event) => {
    event.stopPropagation();
    toggleMenu(menu, event); // 메뉴 확장/축소
    navigate(path); // 페이지 이동
  };



  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev); // 사이드바 접힘 상태 토글
  };

  return (
    <div
      className={styles.sidebar}   >
       <div className={styles.headeradminside} onClick={toggleSidebar}>
      <h1 className={styles.logo}>포실포실포시리</h1>
      <h2 className={styles.email}>email</h2>
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
            onClick={(e) => toggleMenu("member",e)}
            Link to="admin/community"
          >
            <img src={memberIcon} alt="회원관리" /> 회원관리
          </div>
          {activeMenu === "member" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/member/all">전체회원</Link>
              </li>
              <li>
                <Link to="/admin/member/waiting">제작자 전환 대기</Link>
              </li>
              <li>
                <Link to="/admin/member/withdrawal">탈퇴회원</Link>
              </li>
            </ul>
          )}
        </li>

        {/* 프로젝트 */}
        <li>
        <div
            className={styles.menuHeader}
            onClick={(e) => toggleMenu("project",e)}
          >
            <img src={projectIcon} alt="프로젝트" /> 프로젝트
          </div>
          {activeMenu === "project" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/project/review">심사 현황</Link>
              </li>
              <li>
                <Link to="/admin/project/manage">승인 프로젝트 관리</Link>
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
            onClick={(e) => handleMenuClick("announcement", "/admin/community/notice-faq", e)}
          >
            <img src={noticeIcon} alt="공지사항" /> 공지사항
          </div>

          {activeMenu === "announcement" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/community/write">작성 및 수정</Link>
              </li>
            </ul>
          )}
 
          {/* 이벤트 */}
          <div
            className={styles.menuHeader}
            onClick={(e) => handleMenuClick("event", "/admin/community/event", e)}
          >
            <img src={eventIcon} alt="이벤트" /> 이벤트
          </div>
          {activeMenu === "event" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/event/ongoing">진행 중인 이벤트</Link>
              </li>
              <li>
                <Link to="/admin/event/ended">종료된 이벤트</Link>
              </li>
            </ul>
          )}

          {/* 알림/수신 */}
          <div
            className={styles.menuHeader}
            onClick={(e) => toggleMenu("alert",e)}
          >
            🔔 알림/수신
          </div>
          {activeMenu === "alert" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/email-send">이메일 발송</Link>
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
