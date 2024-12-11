import React from 'react';
import TitleText from '../../components/TitleText';
import MyNavLine from '../../components/MyNavLine';
import MyNav from '../../components/MyNav';
import { Outlet } from 'react-router-dom';
import styles from './MyFunding.module.css';  // CSS 모듈 임포트

function MyFunding() {

    const navItems = [
        { label: "진행 예정 프로젝트", path: "" },
        { label: "진행 중 프로젝트", path: "ongoing" },
        { label: "진행 마감 프로젝트", path: "completed" },
      ];    

    return (
        <div className={styles.FundingGrid}> {/* className에 styles 객체 사용 */}
            <div className={styles.header}>
                <TitleText title="나의 프로젝트" />
            </div>
            <div className={styles.nav}>
                <MyNav navItems={navItems} basePath="/home/myfunding"/>
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

export default MyFunding;
