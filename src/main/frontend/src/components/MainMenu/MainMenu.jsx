import { motion } from "framer-motion";
import styles from './MainMenu.module.css'; // CSS 모듈 임포트
import Menu from "./Menu";
import cir1 from "./img/cir1.png";
import rec1 from "./img/rec1.png";
import cir2 from "./img/cir2.png";
import rec2 from "./img/rec2.png";
import cir3 from "./img/cir3.png";
import rec3 from "./img/rec3.png";

function MainMenu() {
    // Variants 정의
    const menuVariants = {
        hidden: { opacity: 0, x: 50 }, // 초기 상태 (투명하고 아래쪽에 위치)
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.2 + 0.75 , // 순차적으로 등장하도록 딜레이
                duration: 0.6, // 애니메이션 지속 시간
                ease: "easeInOut",
            },
        }),
    };

    return (
        <div className={styles.mainMenu}>
            <div className={styles.menus}>
                {[
                    { text: "LOGIN", cir: cir1, rec: rec1 },
                    { text: "UPCOMING", cir: cir2, rec: rec2 },
                    { text: "ACTIVE", cir: cir3, rec: rec3 },
                ].map((menu, index) => (
                    <motion.div
                        key={menu.text}
                        custom={index} // variants에 전달할 인덱스
                        initial="hidden"
                        animate="visible"
                        variants={menuVariants}
                    >
                        <Menu text={menu.text} cir={menu.cir} rec={menu.rec} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default MainMenu;
