import { motion } from "framer-motion";
import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

function Menu({ text, rec, cir, onClick }) {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 경로 이동

    const handleClick = () => {
        if (onClick) {
            onClick();  // 전달된 onClick 함수가 있으면 실행
        } else {
            navigate("/"); // onClick이 없으면 기본 경로로 이동 (옵션)
        }
    };

    return (
        <motion.div
            className={styles.menubar}
            whileHover={{ scale: 1.1, boxShadow: '5px 5px 1px rgba(0, 0, 0, 0.3)' }}  // 전체 메뉴 크기 확대
            transition={{ duration: 0 }}
            onClick={handleClick}  // 클릭 이벤트 핸들러 추가
        >
            <div className={styles.recAndText}>
                <img className={styles.rec} src={rec} alt="rec" />
                <div className={styles.textrec}>
                    {text}
                </div>
            </div>

            {/* Menu 전체에 호버 시 회전하는 효과 적용 */}
            <motion.img
                className={styles.cir}
                src={cir}
                alt="circle"
                whileHover={{
                    rotate: 360,  // 360도 회전
                    transition: { duration: 1, repeat: Infinity, ease: "linear" }  // 반복되는 회전
                }}
                initial={{ rotate: 0 }}  // 처음엔 회전하지 않도록 설정
            />
        </motion.div>
    );
}

export default Menu;
