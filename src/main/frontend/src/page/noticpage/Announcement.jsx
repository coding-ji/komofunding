
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Announcement.module.css";
import TitleText from "../../components/TitleText";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 반환
  }


const Announcement = () => {

  const { state } = useLocation(); // 전달된 데이터를 읽음

  const navigate = useNavigate();

  // 공지사항 데이터를 상태로 설정
  const announcement = state?.announcement;

  if (!announcement) {
    return <div className={styles.loading}>공지사항 로딩 중...</div>;
  }


  return (
    <div className={styles.announcementPage}>
      <TitleText title={announcement.communityCategory}/>
     <hr />
   
      <main className={styles.mainContent}>
        <article className={styles.announcement}>
          <header className={styles.announcementHeader}>
            <h2>{announcement.communityTitle}</h2>
            <div className={styles.announcementMeta}>
              <span className={styles.date}>{formatDate(announcement.writeDate)}</span>
              <span className={styles.author}>{announcement.author}</span>
            
            </div>
            <hr />
          </header>
          <section className={styles.announcementBody}>
            {/* <p>{announcement.communityContent}</p> */}
            <div dangerouslySetInnerHTML={{ __html: announcement.communityContent }} />
          </section>
        </article>
        
      </main>
      <button
          className={styles.backButton}
          onClick={() => navigate("/home/notice")}
        >
          목록
        </button>
    </div>
  );
};

export default Announcement;
