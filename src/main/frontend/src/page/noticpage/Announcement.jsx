import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Announcement.module.css";

const Announcement = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch("/data/notifications.json"); // JSON 파일 경로
        const data = await response.json();
        const foundAnnouncement = data.find((item) => item.id === parseInt(id));
        setAnnouncement(foundAnnouncement);
      } catch (error) {
        console.error("공지사항 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (!announcement) {
    return <div className={styles.loading}>공지사항 로딩 중...</div>;
  }

  return (
    <div className={styles.announcementPage}>
      <h1 className={styles.header}>공지사항</h1>
     <hr />
   
      <main className={styles.mainContent}>
        <article className={styles.announcement}>
          <header className={styles.announcementHeader}>
            <h2>{announcement.title}</h2>
            <div className={styles.announcementMeta}>
              <span className={styles.date}>{announcement.date}</span>
              <span className={styles.author}>{announcement.author}</span>
            
            </div>
            <hr />
          </header>
          <section className={styles.announcementBody}>
            {announcement.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        </article>
        
      </main>
      <button
          className={styles.backButton}
          onClick={() => navigate("/notice")}
        >
          목록
        </button>
    </div>
  );
};

export default Announcement;
