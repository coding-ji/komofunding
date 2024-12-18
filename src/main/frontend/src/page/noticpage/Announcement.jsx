import { useNavigate, useParams } from "react-router-dom";
import styles from "./Announcement.module.css";
import TitleText from "../../components/TitleText";
import { formattedDate } from "../../utils/formattedData";
import { useStore as NoticeStore } from "../../stores/NoticeStore/useStore";
import { useStore as QnaStore } from "../../stores/QnaStore/useStore";
import { useStore as FileStore } from "../../stores/FileStore/useStore";
import { useEffect } from "react";

// 상세 내역
const Announcement = () => {
  const { state: qnaState, actions: qnaActions } = QnaStore();
  const { state: noticeState, actions: noticeActions } = NoticeStore();
  const { state: fileState, actions: fileActions } = FileStore();

  const { communityNum, qnaNum } = useParams();
  const navigate = useNavigate();

  // 공지사항 or 문의사항 상세 데이터를 불러오는 useEffect
  useEffect(() => {
    if (communityNum) {
      // communityNum이 있으면 공지사항 데이터
      noticeActions.readCommunityById(communityNum);
    } else if (qnaNum) {
      // qnaNum이 있으면 1:1 문의사항 데이터
      qnaActions.readQnaDetailByQnaNumber(qnaNum);
    }
  }, [communityNum, qnaNum]);

  const handleClick = () => {
    if (communityNum) {
      navigate("/home/notice");
    } else if (qnaNum) {
      navigate("/home/inquiry");
    }
  };

  useEffect(() => {
    if (communityNum) {
      const fetchHtml = async () => {
        if (noticeState.communities) {
          try {
            await fileActions.readFileData(
              noticeState.communities.communityContent
            );
          } catch (error) {
            console.error("Error fetching HTML file:", error);
          }
        }
      };

      fetchHtml();
    }
  }, [noticeState.communities]);

  // 공지사항이나 1:1 문의사항 데이터 가져오기
  let announcement;
  if (communityNum) {
    announcement = noticeState.communities;
  } else if (qnaNum) {
    announcement = qnaState;
  }

  if (!announcement) {
    return <div className={styles.loading}>공지사항 로딩 중...</div>;
  }

  return (
    <>
      {announcement && (
        <div className={styles.announcementPage}>
          <TitleText
            title={announcement.communityCategory || announcement.qnaCategory}
          />
          <hr />

          <main className={styles.mainContent}>
            <article className={styles.announcement}>
              <header className={styles.announcementHeader}>
                <h2>
                  {announcement.communityTitle ||
                    announcement.title ||
                    "댓글내용"}
                </h2>
                <div className={styles.announcementMeta}>
                  <span className={styles.date}>
                    {formattedDate(
                      announcement.writeDate || announcement.writtenDate
                    )}
                  </span>
                  <span className={styles.author}>
                    {announcement.author || announcement.nickName}
                  </span>
                </div>
                <hr />
              </header>
              <section className={styles.announcementBody}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: fileState || announcement.questionComment,
                  }}
                />
              </section>
              {/* 답변 부분 추가 */}
              {qnaNum && announcement.answer && (
                <section className={styles.answerSection}>
                  <h3>답변</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: announcement.answer,
                    }}
                  />
                </section>
              )}
            </article>
          </main>
          <button className={styles.backButton} onClick={handleClick}>
            목록
          </button>
        </div>
      )}
    </>
  );
};

export default Announcement;
