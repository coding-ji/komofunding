import { useNavigate, useParams } from "react-router-dom";
import styles from "./Announcement.module.css";
import TitleText from "../../components/TitleText";
import { formattedDate } from "../../utils/formattedData";


// 상세 내역
const Announcement = () => {
  const { communityNum, userNum } = useParams();
  const navigate = useNavigate();



  

  // 공지사항 데이터를 상태로 설정
  const announcement = state?.announcement;

  if (!announcement) {
    return <div className={styles.loading}>공지사항 로딩 중...</div>;
  }

  return (
    <>
      {communityNum && (
        <div className={styles.announcementPage}>
          <TitleText title={announcement.communityCategory} />
          <hr />

          <main className={styles.mainContent}>
            <article className={styles.announcement}>
              <header className={styles.announcementHeader}>
                <h2>{announcement.communityTitle}</h2>
                <div className={styles.announcementMeta}>
                  <span className={styles.date}>
                    {formattedDate(announcement.writeDate)}
                  </span>
                  <span className={styles.author}>{announcement.author}</span>
                </div>
                <hr />
              </header>
              <section className={styles.announcementBody}>
                {/* <p>{announcement.communityContent}</p> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: announcement.communityContent,
                  }}
                />
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
      )}

      {userNum && (
        <div className={styles.announcementPage}>
          <TitleText title={announcement.communityCategory} />
          <hr />

          <main className={styles.mainContent}>
            <article className={styles.announcement}>
              <header className={styles.announcementHeader}>
                <h2>{announcement.communityTitle}</h2>
                <div className={styles.announcementMeta}>
                  <span className={styles.date}>
                    {formattedDate(announcement.writeDate)}
                  </span>
                  <span className={styles.author}>{announcement.author}</span>
                </div>
                <hr />
              </header>
              <section className={styles.announcementBody}>
                {/* <p>{announcement.communityContent}</p> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: announcement.communityContent,
                  }}
                />
              </section>
            </article>
          </main>
          <button
            className={styles.backButton}
            onClick={() => navigate(`profile/${userNum}`)}
          >
            목록
          </button>
        </div>
      )}
    </>
  );
};

export default Announcement;
