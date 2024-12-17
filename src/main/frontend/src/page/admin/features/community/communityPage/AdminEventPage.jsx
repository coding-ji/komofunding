import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TitleText from "../../../../../components/TitleText";
import ReusableTable from "../../../../../components/Table/ReusableTable";
import { useStore } from "../../../../../stores/NoticeStore/useStore";
import styles from "../../../../../components/Table/ReusableTable.module.css";
import Pagination from "../../../../MyPage/Pagination";
import { formattedDate } from "../../../../../utils/formattedData";
import AdminFilterTabs from "../../../components/AdminTabs/AdminFilterTabs"; // AdminTabs 추가


const AdminEventPage = () => {
  const { state, actions } = useStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchOption, setSearchOption] = useState("communityTitle"); // 기본 검색 옵션
  const [activeTab, setActiveTab] = useState("ALL"); // 현재 활성화된 탭 상태
    const [searchParams] = useSearchParams(); // URL의 파라미터 읽기

    
      useEffect(() => {
        const tabParam = searchParams.get("tab"); // 'tab' 파라미터 읽기
        if (tabParam) {
          setActiveTab(tabParam); // 파라미터에 맞게 activeTab 설정
        }
      }, [searchParams]);
    

  const columns = [
    { label: "No", accessor: "communityNumber" },
    { label: "제목", accessor: "communityTitle" },
    { label: "관리자", accessor: "author" },
    {
      label: "기간", // 작성일과 종료일을 병합하여 표시
      accessor: "period",
    },
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

  const today = new Date();

  // 이벤트 데이터 필터링
  const eventData = state.communities.filter((item) => item.communityCategory === "EVENT");

  // 탭에 따라 데이터 필터링
  const filteredByTab = eventData.filter((item) => {
    const endDate = item.endDate ? new Date(item.endDate) : null;

    if (activeTab === "ONGOING") {
      return !endDate || endDate >= today; // 오늘 이후의 데이터 또는 종료일 없음
    } else if (activeTab === "ENDED") {
      return endDate && endDate < today; // 오늘 이전에 종료된 데이터
    }
    return true; // ALL 탭
  });

  // 데이터 가공: "기간" 필드 추가
  const processedData = filteredByTab.map((item) => ({
    ...item,
    period: `${item.writeDate ? formattedDate(item.writeDate) : "N/A"} ~ ${
      item.endDate ? formattedDate(item.endDate) : "N/A"
    }`,
  }));

  // 검색 키워드로 데이터 필터링
  const filteredData = processedData.filter((item) => {
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
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 초기화
    setSearchKeyword(""); // 검색 키워드 초기화
    setSearchOption("communityTitle"); // 검색 옵션 초기화
  };

  const navItems = [
    { name: "ALL", label: "전체" },
    { name: "ONGOING", label: "진행 중인 이벤트" },
    { name: "ENDED", label: "진행 종료 이벤트" },
  ];

  return (
    <div className={styles.gridContainerAdminNotice}>
      <TitleText title="이벤트 관리" />

      {/* 탭 추가 */}
      <AdminFilterTabs navItems={navItems} activeTab={activeTab} onTabClick={handleTabClick} />

      <ReusableTable
        title="이벤트 목록"
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

export default AdminEventPage;
