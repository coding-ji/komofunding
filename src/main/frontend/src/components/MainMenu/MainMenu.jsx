import { motion } from "framer-motion";
import styles from './MainMenu.module.css'; // CSS 모듈 임포트
import Menu from "./Menu";
import cir1 from "./img/cir1.png";
import rec1 from "./img/rec1.png";
import cir2 from "./img/cir2.png";
import rec2 from "./img/rec2.png";
import cir3 from "./img/cir3.png";
import rec3 from "./img/rec3.png";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import { useState, useEffect } from "react";

function MainMenu({setMenuOpen}) {
    const navigate = useNavigate(); // navigate 함수 초기화
    const [loginUser, setLoginUser] = useState(""); // 로컬 스토리지 값을 상태로 관리

    // 로컬 스토리지 값 초기화 및 변경 감지
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setLoginUser(storedUser);

        const handleStorageChange = () => {
            const updatedUser = localStorage.getItem("user");
            setLoginUser(updatedUser); // 상태 업데이트
        };

        // storage 이벤트 리스너 등록
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); // 빈 배열로 한 번만 실행

    
    const handleLoginClick = () => {
        navigate("/home/login"); // 로그인 버튼 클릭 시 /login 경로로 이동
    };

    const handleLoginOutClick = () => {
        localStorage.removeItem("user"); // 사용자 정보 삭제
        setMenuOpen(false); // 메뉴닫기
        setLoginUser(""); // 상태 갱신
        navigate("/"); // 홈으로 이동
    }

    const handleUpcomingClick = () => {
        navigate("/home/upcoming"); // UPCOMING 버튼 클릭 시 /upcoming 경로로 이동
    };

    const handleActiveClick = () => {
        navigate("/home/active"); // ACTIVE 버튼 클릭 시 /ongoing 경로로 이동
    };

    // Variants 정의
    const menuVariants = {
        hidden: { opacity: 0, x: 50 }, // 초기 상태 (투명하고 아래쪽에 위치)
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.2 + 0.75, // 순차적으로 등장하도록 딜레이
                duration: 0.6, // 애니메이션 지속 시간
                ease: "easeInOut",
            },
        }),
    };

    return (
        <div className={styles.mainMenu}>
            <div className={styles.menus}>
                {[
                    { text: loginUser ? "LOGOUT" : "LOGIN", cir: cir1, rec: rec1, onClick: loginUser? handleLoginOutClick : handleLoginClick }, // LOGIN 버튼에 onClick 추가
                    { text: "UPCOMING", cir: cir2, rec: rec2, onClick: handleUpcomingClick }, // UPCOMING 버튼에 onClick 추가
                    { text: "ACTIVE", cir: cir3, rec: rec3, onClick: handleActiveClick }, // ACTIVE 버튼에 onClick 추가
                ].map((menu, index) => (
                    <motion.div
                        key={menu.text}
                        custom={index} // variants에 전달할 인덱스
                        initial="hidden"
                        animate="visible"
                        variants={menuVariants}
                    >
                        <Menu text={menu.text} cir={menu.cir} rec={menu.rec} onClick={menu.onClick} /> {/* Menu 컴포넌트에 onClick 추가 */}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default MainMenu;
