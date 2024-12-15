import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleText from "../../../../../components/TitleText";
import ReusableTable from "../../../../../components/Table/ReusableTable";
import { useStore } from "../../../../../stores/NoticeStore/useStore";
import styles from "../../../../../components/Table/ReusableTable.module.css";
import Pagination from "../../../../MyPage/Pagination";
  

const AdminNoticePage = () => {
  const { state, actions } = useStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchOption, setSearchOption] = useState("communityTitle"); // 기본 검색 옵션

  const columns = [
    { label: "No", accessor: "communityNumber" },
    { label: "제목", accessor: "communityTitle" },
     { label: "관리자", accessor: "author" },
    { label: "작성일", accessor: "writeDate" },
    { label: "공개 여부", accessor: "isHidden" },
  ];

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actions.readAllCommunities();
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        alert("데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(state.communities)) {
    return <p>데이터 로드 중...</p>;

  }

        // FAQ 또는 NOTICE 카테고리만 필터링
        const faqAndNoticeData = state.communities.filter(
          (item) =>
            item.communityCategory === "FAQ" || item.communityCategory === "NOTICE"
        );

  const filteredData = faqAndNoticeData.filter((item) => {
    console.log(faqAndNoticeData)
    if (searchOption === "isHidden") {
      const isHiddenValue = searchKeyword === "true";
      return searchKeyword === "" || item.isHidden === isHiddenValue;
    } else {
      const searchValue = String(item[searchOption]).toLowerCase();
      return searchValue.includes(searchKeyword.toLowerCase());
    }
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (option, keyword) => {
    setSearchOption(option);
    setSearchKeyword(keyword);
  };

  return (
    <div className={styles.gridContainerAdminNotice}>
      <TitleText title="공지사항 관리" />

      <ReusableTable
        title="공지사항 목록"
        data={currentData}
        columns={columns}
        searchOptions={[
          { label: "제목", value: "communityTitle" },
          { label: "관리자", value: "author" },
          { label: "공개 여부", value: "isHidden" },
        ]}
        onSearch={handleSearch}
      />

      {Math.ceil(filteredData.length / ITEMS_PER_PAGE) > 1 && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AdminNoticePage;
