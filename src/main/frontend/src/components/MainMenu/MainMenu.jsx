import { motion } from "framer-motion";
import styles from './MainMenu.module.css';  // CSS 모듈 임포트
import Menu from "./Menu";
import cir1 from "./img/cir1.png";
import rec1 from "./img/rec1.png";
import cir2 from "./img/cir2.png";
import rec2 from "./img/rec2.png";
import cir3 from "./img/cir3.png";
import rec3 from "./img/rec3.png";

function MainMenu() {
    return(
        <div className={styles.mainMenu}>
            <div className={styles.menus}>
                <Menu text="LOGIN" cir={cir1} rec={rec1}/>
                <Menu text="UPCOMING" cir={cir2} rec={rec2}/>
                <Menu text="ACTIVE" cir={cir3} rec={rec3}/>
            </div>
        </div>
    )
}

export default MainMenu;