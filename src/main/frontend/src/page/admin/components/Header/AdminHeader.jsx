import React, { useState, useEffect } from "react";
import styles from "../../../../components/Header/Header.module.css"; // 모듈 CSS 가져오기
import HeaderMenu from "../../../../components/Header/HeaderMenu"; // 메뉴 컴포넌트
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdminHeaderChangeForm from './ChangeForm/AdminHeaderChangeForm'




const AdminHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 선언
  // const [userNum, setUserNum] = useState(null); // 로그인한 유저의 userNum 관리
  // const [searchValue, setSearchValue] = useState("");
  const [ isPopupOpen, setIsPopupOpen] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("123");
  const [newPassword, setNewPassword] = useState("");


  const handlePasswordSave = (newPassword) => {
    console.log("새 비밀번호 저장:", newPassword);
    // 비밀번호 저장 API 호출
    changePassword(state.email, newPassword); // API 호출로 변경
};




  //   // 컴포넌트가 렌더링될 때 로그인 상태 확인
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user")); // localStorage에서 사용자 정보 가져오기
  //   if (user) {
  //     setIsLoggedIn(true);
  //     setUserNum(user.userNum); // userNum 저장
  //   }
  // }, []);


  //    // 로그아웃 핸들러
  // const handleLogout = () => {
  //   localStorage.removeItem("user"); // 사용자 정보 삭제
  //   setIsLoggedIn(false); // 상태 갱신
  //   navigate("/"); // 홈으로 이동
  // };
  
  function changePassword(){
    setIsPopupOpen(true)
  }

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };



  return (
    <div className={styles.headerContainerAdmin}>
      {/* 로고 및 메뉴 섹션 */}
        <motion.div whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")} // 홈으로 이동
        >
          <div
            className={styles.logoImage}
            alt="로고이미지"
            style={{
              width: "120px", // 원하는 크기
              height: "50px",
            }}
          />
        </motion.div>
        <div className={styles.menuListAdmin}>
          <HeaderMenu name="메인화면" 
          //  onClick={() => navigate("/admin")}
           />
          <HeaderMenu
            name="비밀번호 변경"
             onClick={changePassword} 
          />
          <HeaderMenu
            name="로그아웃"
            // onClick={() => navigate("/home/active")} 
          />

    {isPopupOpen && (
        <AdminHeaderChangeForm
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        onSavePassword={handlePasswordSave}
        onClose={handlePopupClose}
        />
      )}


        </div>
  
    </div>
  );
};

export default AdminHeader;
