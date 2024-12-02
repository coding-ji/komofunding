import React from 'react';
import TitleText from '../../components/TitleText';
import MyNavLine from '../../components/MyNavLine';
import MyNav from '../../components/MyNav';
import { Outlet } from 'react-router-dom';
import styles from './UserFunding.module.css';  // CSS 모듈 임포트

function UserFunding() {

    const navItems = [
        { label: "진행 중 후원", path: "" },
        { label: "마감된 후원", path: "user-completed" },
      ];    

    return (
        <div className={styles.FundingGrid}> {/* className에 styles 객체 사용 */}
            <div className={styles.header}>
                <TitleText title="나의 후원" />
            </div>
            <div className={styles.nav}>
                <MyNav navItems={navItems} basePath="/userfunding"/>
            </div>
            <div className={styles.line}>
                <MyNavLine />
            </div>
            <div className={styles.contentContainer}>
                <Outlet />
            </div>
        </div>
    );
}

export default UserFunding;
