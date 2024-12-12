import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SidebarLayout.module.css";
import memberIcon from "./회원관리/user svg.svg";
import projectIcon from "./프로젝트/prj svg.svg";
import paymentIcon from "./결제/pay svg.svg";
import noticeIcon from "./공지사항/notice svg.svg";
import eventIcon from "./이벤트/event svg.svg";
import qnaIcon from "./q&a/Q&A svg.svg";

const SidebarLayout = ({ className }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const toggleMenu = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? "" : menu));
  };

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <h1 className={styles.logo}>포실포실포시리</h1>
      <h2 className={styles.email}>email</h2>
      <ul className={styles.menu}>
        {/* 회원관리 */}
        <li>
          <div className={styles.sectionDivider}>관리 홈</div>
          <Link
            to="/admin/member/all"
            className={styles.menuHeader}
            onClick={() => toggleMenu("member")}
          >
            <img src={memberIcon} alt="회원관리" /> 회원관리
          </Link>
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
          <Link
            to="/admin/project/review"
            className={styles.menuHeader}
            onClick={() => toggleMenu("project")}
          >
            <img src={projectIcon} alt="프로젝트" /> 프로젝트
          </Link>
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
          <Link
            to="/admin/payment/settlement"
            className={styles.menuHeader}
            onClick={() => toggleMenu("payment")}
          >
            <img src={paymentIcon} alt="결제" /> 결제
          </Link>
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
          <Link
            to="/admin/notice"
            className={styles.menuHeader}
            onClick={() => toggleMenu("announcement")}
          >
            <img src={noticeIcon} alt="공지사항" /> 공지사항
          </Link>
          {activeMenu === "announcement" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/write">작성 및 수정</Link>
              </li>
            </ul>
          )}

          {/* 이벤트 */}
          <Link
            to="/admin/event/ongoing"
            className={styles.menuHeader}
            onClick={() => toggleMenu("event")}
          >
            <img src={eventIcon} alt="이벤트" /> 이벤트
          </Link>
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
          <Link
            to="/admin/email"
            className={styles.menuHeader}
            onClick={() => toggleMenu("alert")}
          >
            🔔 알림/수신 {/*FIXME: 아이콘 추가*/}
          </Link>
          {activeMenu === "alert" && (
            <ul className={styles.subMenu}>
              <li>
                <Link to="/admin/email-send">이메일 발송</Link>
              </li>
            </ul>
          )}

          {/* Q&A */}
          <Link
            to="/admin/qna/waiting"
            className={styles.menuHeader}
            onClick={() => toggleMenu("qna")}
          >
            <img src={qnaIcon} alt="Q&A" /> Q&A
          </Link>
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
