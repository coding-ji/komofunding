import React from 'react';
import styles from './Announcement.module.css'; // CSS Modules로 가져오기
import MainHeader from '../container/MainHeader';
import Footer from '../components/Footer/Footer'
import { motion } from 'framer-motion';

const Announcement = () => {
  return (<>
   <MainHeader />
    <div className={styles.announcementPage}>


      <motion.div className={styles.header} initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <h1>공지사항</h1>
      </motion.div>


      <hr />
      <main className={styles.mainContent}>
        <article className={styles.announcement}>
          <header className={styles.announcementHeader}>
            <h2>갈비뼈를 다 발라먹어버렸다</h2>

            <div className={styles.announcementMeta}>
              <span className={styles.date}>2024-11-09</span>
              <span className={styles.author}>관리자</span>

            </div>
            <hr />
          </header>
          <section className={styles.announcementBody}>
            <div className={styles.textBox}>
              <p>크라우드 펀딩 이용 안내입니다.</p>
              <p>
                프로젝트 등록을 원한다면 마이페이지 제작자 신청을 통해 승인 받은 뒤 등록이 가능합니다.
              </p>
              <p>추가 문의는 문의하기를 이용해 주세요.</p>
              <br /><br /><br /><br /><br /><br />
            </div>
          </section>
        </article>

      </main>
      <div className={styles.buttonWrapper}>
          <button className={styles.backButton}>목록</button>
        </div>
      <Footer />
    </div>
    </>
  );
};

export default Announcement;
