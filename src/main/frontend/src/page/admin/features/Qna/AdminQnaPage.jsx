
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../../../../page/MyPage/Pagination";
import TitleText from "../../../../components/TitleText";
import ReusableTable from "../../../../components/Table/ReusableTable";
// import styles from "../../styles/TablePageLayout.module.css";

const AdminQnaPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]); // QnA 데이터
  const [loading, setLoading] = useState(true);

  const columns = [
    { label: "No", accessor: "qna_number" },
    { label: "제목", accessor: "title" },
    { label: "별명", accessor: "nickName" },
    { label: "작성일", accessor: "writtenDate" },
    { label: "상태", accessor: "answer" },
    { label: "답변여부", accessor: "answer_status" },
  ];

  const ITEMS_PER_PAGE = 10; // 한 페이지에 표시할 항목 수
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  // 데이터 로드
  useEffect(() => {
    fetch("/data/orders.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Loaded data:", data); // 데이터 확인
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>데이터 로딩 중...</p>;
  }

  const currentData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.gridContainer}>
      <TitleText title="QnA" />

      <ReusableTable title ="QnA 목록" data={currentData} columns={columns} />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AdminQnaPage;
