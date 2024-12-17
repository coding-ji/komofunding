import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TitleText from "../../../../../components/TitleText";
import ReusableTable from "../../../../../components/Table/ReusableTable";
import { useStore } from "../../../../../stores/NoticeStore/useStore";
import styles from "../../../../../components/Table/ReusableTable.module.css";
import Pagination from "../../../../MyPage/Pagination";
import AdminFilterTabs from "../../../components/AdminTabs/AdminFilterTabs"; // 필터 탭 컴포넌트 추가


const AdminNoticePage = () => {
  const { state, actions } = useStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchOption, setSearchOption] = useState("communityTitle"); // 기본 검색 옵션
  const [activeTab, setActiveTab] = useState("ALL"); // 활성화된 탭 상태
    const [searchParams] = useSearchParams(); // URL의 파라미터 읽기


  
    useEffect(() => {
      const tabParam = searchParams.get("tab"); // 'tab' 파라미터 읽기
      if (tabParam) {
        setActiveTab(tabParam); // 파라미터에 맞게 activeTab 설정
      }
    }, [searchParams]);
  

    // 테이블 행 클릭 시 동작
    const handleRowClick = (row) => {
      navigate("/admin/community/edit", { state: { announcement: row } });
    };

  

  const columns = [
    { label: "카테고리", accessor: "communityCategory" },
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

  // 카테고리별 데이터 필터링
  const filteredByTab = state.communities.filter((item) => {
    if (activeTab === "ALL") return item.communityCategory === "FAQ" || item.communityCategory === "NOTICE";
    return item.communityCategory === activeTab;
  });

  // 검색어로 데이터 필터링
  const filteredData = filteredByTab.filter((item) => {
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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSearchKeyword(""); // 검색 키워드 초기화
    setSearchOption("communityTitle"); // 검색 옵션 초기화
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 초기화
  };

  const navItems = [
    { name: "ALL", label: "전체" },
    { name: "NOTICE", label: "공지사항" },
    { name: "FAQ", label: "자주 묻는 질문" },
  ];

  return (
    <div className={styles.gridContainerAdminNotice}>
      <TitleText title="공지사항 관리" />

      {/* 카테고리 탭 추가 */}
      <AdminFilterTabs navItems={navItems} activeTab={activeTab} onTabClick={handleTabClick} />

      <ReusableTable
        title="공지사항"
        data={currentData}
        columns={columns}
        onRowClick={handleRowClick} // 행 클릭으로 이동
        searchOptions={[
          { label: "제목", value: "communityTitle" },
          { label: "관리자", value: "author" },
          { label: "공개 여부", value: "isHidden" },
        ]}
        // 정렬 기준 설정
        defaultSortBy="writeDate" // 작성일 기준 정렬
        defaultSortOrder="desc"   // 내림차순 정렬
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
