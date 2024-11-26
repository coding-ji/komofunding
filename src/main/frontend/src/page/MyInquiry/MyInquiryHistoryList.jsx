import { useState, useEffect } from "react";
import styles from "./MyInquiryHistoryList.module.css";
import TitleText from "../../components/TitleText";
import '../../index.css'

function MyInquiryHistoryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./MyInquiry.json"); // JSON 파일 경로
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        setInquiries(data.inquiries);
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <TitleText title="나의 문의 내역"/>
      <div>
      {inquiries.length === 0 ? (
        <p>문의 내역이 없습니다.</p>
      ) : (
        inquiries.map((inquiry) => (
          <div key={inquiry.id} className={styles.inquiryDiv}>
            <p className={styles.title}>{inquiry.title}</p>
            <p>{inquiry.content}</p>
          </div>
        ))
      )}
      </div>
    </div>
  );
}

export default MyInquiryHistoryList;
