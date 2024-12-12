import React, { useState } from "react";
import styles from "./OrderTable.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../MyPage/Pagination";
import { AdminBtn2 } from "../../components/MyBtn";
import PopupInquiry from "../MyPage/writeQnA/PopupInquiry";
import TitleText from "../../components/TitleText";
import UserManageDetail from "./UserManageDetail";

const UserManage = ({items, render}) => {

// 유형, 회원코드, 닉네임, 이메일, 전화번호, 가입일, 상태
  const [users, setUsers] = useState([
    {
      type: "후원자", // or "제작자"   
      memberId: "20241234",
      nickname: "조인삼",
      email : "insam1004@naver.com",
      phone: "010-1111-2222",
      joinDate: "2024-11-10",
    },
    {
      type: "제작자",
      memberId: "20244786",
      nickname: "백송우",
      email : "100wincow@naver.com",
      phone: "010-7449-0886",
      joinDate: "2024-11-14",
    },
    {
        type: "후원자",
        memberId: "20241235",
        nickname: "김철수",
        email: "chulsoo123@naver.com",
        phone: "010-2222-3333",
        joinDate: "2024-11-11",
    },
    {
        type: "제작자",
        memberId: "20241236",
        nickname: "박영희",
        email: "younghee456@naver.com",
        phone: "010-3333-4444",
        joinDate: "2024-11-12",
    },
      {
        type: "후원자",
        memberId: "20241237",
        nickname: "이민호",
        email: "minho789@naver.com",
        phone: "010-4444-5555",
        joinDate: "2024-11-13",
      },
      {
        type: "후원자",
        memberId: "20241238",
        nickname: "정지우",
        email: "jiwoo1010@naver.com",
        phone: "010-5555-6666",
        joinDate: "2024-11-14",
      },
      {
        type: "제작자",
        memberId: "20241239",
        nickname: "최성훈",
        email: "sunghoon234@naver.com",
        phone: "010-6666-7777",
        joinDate: "2024-11-15",
      },
      {
        type: "후원자",
        memberId: "20241240",
        nickname: "한지민",
        email: "jimin345@naver.com",
        phone: "010-7777-8888",
        joinDate: "2024-11-16",
      },
      {
        type: "후원자",
        memberId: "20241241",
        nickname: "서준호",
        email: "junho456@naver.com",
        phone: "010-8888-9999",
        joinDate: "2024-11-17",
      },
      {
        type: "제작자",
        memberId: "20241242",
        nickname: "안유진",
        email: "yujin567@naver.com",
        phone: "010-9999-1010",
        joinDate: "2024-11-18",
      },
      {
        type: "후원자",
        memberId: "20241243",
        nickname: "남주혁",
        email: "joohyuk678@naver.com",
        phone: "010-1010-1111",
        joinDate: "2024-11-19",
      },
      {
        type: "제작자",
        memberId: "20241244",
        nickname: "김소연",
        email: "soyeon789@naver.com",
        phone: "010-1111-1212",
        joinDate: "2024-11-20",
      },
      {
        type: "후원자",
        memberId: "20241245",
        nickname: "신재훈",
        email: "jaehoon891@naver.com",
        phone: "010-1212-1313",
        joinDate: "2024-11-21",
      },
      {
        type: "후원자",
        memberId: "20241246",
        nickname: "박수현",
        email: "soohyun912@naver.com",
        phone: "010-1313-1414",
        joinDate: "2024-11-22",
      },
      {
        type: "제작자",
        memberId: "20241247",
        nickname: "오지현",
        email: "jihyun913@naver.com",
        phone: "010-1414-1515",
        joinDate: "2024-11-23",
      },
      {
        type: "후원자",
        memberId: "20241248",
        nickname: "임채영",
        email: "chaeyoung914@naver.com",
        phone: "010-1515-1616",
        joinDate: "2024-11-24",
      },
      {
        type: "후원자",
        memberId: "20241249",
        nickname: "조성훈",
        email: "sunghoon915@naver.com",
        phone: "010-1616-1717",
        joinDate: "2024-11-25",
      },
      {
        type: "제작자",
        memberId: "20241250",
        nickname: "이은지",
        email: "eunji916@naver.com",
        phone: "010-1717-1818",
        joinDate: "2024-11-26",
      },
      {
        type: "후원자",
        memberId: "20241251",
        nickname: "강현우",
        email: "hyunwoo917@naver.com",
        phone: "010-1818-1919",
        joinDate: "2024-11-27",
      },
  ]);

  const [orderChecked, setOrderChecked] = useState(
    users.map(() => false) // 각 주문 항목에 대해 체크 상태를 false로 초기화
  );
  const [allChecked, setAllChecked] = useState(false);

  // 전체 선택/해제
  const handleSelectAll = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setOrderChecked(users.map(() => newChecked)); // 모든 항목을 선택/해제
  };

  // 개별 행의 체크박스를 클릭할 때
  const handleCheckboxChange = (index) => {
    const updatedChecked = [...orderChecked];
    updatedChecked[index] = !updatedChecked[index]; // 해당 인덱스의 체크 상태를 반전
    setOrderChecked(updatedChecked);
  };

  // 프린트 출력 함수
  const handlePrint = () => {
    window.print();
  };
  
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지 당 아이템 수
  
  // 총 페이지 수 계산
  const totalPages = Math.ceil(users.length / itemsPerPage);
  
  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 현재 페이지에 맞는 데이터만 잘라서 반환
  const currentLists = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // (게시글이 10개 이하일때) 아이템 없는 빈 공간을 추가할 개수 계산
   const emptyRows = itemsPerPage - currentLists.length;

  // 팝업 상태 관리 (showPopup은 팝업이 보일지 여부를 결정)
  const [showPopup, setShowPopup] = useState(false);
  
  // 팝업 열기
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  // 팝업 닫기
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleButtonClick = () => {
    console.log("버튼 클릭됨!");
    setShowPopup(false);
    // 여기에 버튼 클릭 시 처리할 로직 추가
  };

  // 유형, 회원코드, 닉네임, 이메일, 전화번호, 가입일, 상태
  return (
    <div className={styles.wrapper}>
     <TitleText title={"회원관리"}/>
      <div className={styles.buttonWrapper} >
        <div className={styles.printBtn}>
          <button className={styles.printButton} onClick={handlePrint}>
            프린트 출력
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={allChecked}
                  onChange={handleSelectAll}
                />
              </th>
              <th>유형</th>
              <th>회원코드</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>가입일</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {currentLists.map((user, index) => (
              <tr
                key={index}
                className={orderChecked[index] ? styles.selected : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={orderChecked[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                {/* type, memberId, nickname, email, phone, joindate */}
                <td>{user.type}</td>
                <td>{user.memberId}</td>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.joinDate}</td>
                <td>
                  <AdminBtn2 text={"더보기"} width={"74px"} 
                  fontSize={"1.0em"} height={"35px"}
                  padding={"0px 10px"} onClick={handleOpenPopup}/>
                </td>
              </tr>
            ))}
            {/* 빈 공간 추가 (아이템이 부족한 경우) */}
            {emptyRows > 0 && (
              Array.from({ length: emptyRows }).map((_, index) => (
                <tr key={`empty-row-${index}`}>
                  <td colSpan="10">
                    <div className={styles.emptyRow}>
                      {/* 빈 공간을 나타내는 div */}
                      <p style={{caretColor: "transparent"}}>&nbsp;</p>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange}
      />
      {showPopup && (
        <UserManageDetail
          message="집에 가시겠습니까?"
          onClose={handleClosePopup} // 팝업 닫는 함수
          handleButtonClick={handleButtonClick} // 버튼 클릭 핸들러
          text="취소"
        />
      )}
      </div>
      {/* { message, onClose, handleButtonClick, navigateTo, text = "확인" } */}

    </div>
  );
};

export default UserManage;