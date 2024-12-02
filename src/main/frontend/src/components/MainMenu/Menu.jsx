import { motion } from "framer-motion";
import styles from './Menu.module.css';

function Menu({ text, rec, cir }) {
    return (
        <motion.div
            className={styles.menubar}
            whileHover={{ scale: 1.1 }}  // 전체 메뉴 크기 확대
            transition={{ duration: 0 }}
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
