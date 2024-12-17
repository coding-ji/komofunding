import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TitleText from "../../../../components/TitleText";
import ReusableTable from "../../../../components/Table/ReusableTable";
import styles from "../../../../components/Table/ReusableTable.module.css";
import Pagination from "../../../MyPage/Pagination";
import AdminFilterTabs from "../../components/AdminTabs/AdminFilterTabs";
import { useStore } from "../../../../stores/AdminStore/useStore";


const ProjectManagementPage = () => {
    const { state, actions } = useStore(); // 어드민 프로젝트 상태 및 액션
    const navigate = useNavigate();

    // 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchOption, setSearchOption] = useState("title");
    const [activeTab, setActiveTab] = useState("ALL");
     const [searchParams] = useSearchParams(); // URL의 파라미터 읽기

    const ITEMS_PER_PAGE = 10;

    
      useEffect(() => {
        const tabParam = searchParams.get("tab"); // 'tab' 파라미터 읽기
        if (tabParam) {
          setActiveTab(tabParam); // 파라미터에 맞게 activeTab 설정
        }
      }, [searchParams]);

      

    useEffect(() => {
        const fetchData = async () => {
            try {
                actions.fetchAdminProjects();
            } catch (error) {
                console.error("프로젝트를 가져오는데 실패했습니다.")
            }
        };

        fetchData();
    }, [])

    if (!Array.isArray(state.project)) {
        return <p>데이터 로드 중...</p>;
      }


    // 데이터 변환 로직
    const enhancedData = state.project.map((project) => ({
        ...project,
        status: project.isHidden ? "숨김" : "활성",
        actions: (
            <button onClick={() => handleDelete(project.projectNum)}>
                삭제
            </button>
        ),
    }));

    // 프로젝트 데이터 필터링
    const filteredData = enhancedData.filter((project) => {
        if (activeTab === "REVIEW") return project.status === "PENDING_REVIEW";
        if (activeTab === "HIDDEN") return project.isHidden;
        return true; // 기본적으로 모든 데이터 포함
    });

    // 현재 페이지 데이터
    const currentData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const categoryOptions = [
        { value: "ACCESSORY", label: "액세서리" },
        { value: "BOOK", label: "도서" },
        { value: "CLOTHES", label: "의류" },
        { value: "COSMETICS", label: "화장품" },
        { value: "ETC", label: "기타" },
        { value: "FOOD", label: "식품" },
        { value: "HOMEDECO", label: "홈데코" },
        { value: "PET", label: "반려동물" },
        { value: "TRAVEL", label: "여행" },
    ];

    // 열 정의
    const getColumns = () => [
        { label: "프로젝트번호", accessor: "projectNum" },
        { label: "카테고리", accessor: "category" },
        { label: "제목", accessor: "title" },
        { label: "제작자", accessor: "creatorName" },
        { label: "휴대폰", accessor: "creatorPhone" },
        { label: "신청날짜", accessor: "applicationDate" },
        { label: "상태", accessor: "status" },
        { label: "관리", accessor: "actions" }, // 삭제 버튼 추가
    ];

    // 탭 클릭 핸들러
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setCurrentPage(1);
        setSearchKeyword("");
        setSearchOption("title");
    };

    // 삭제 핸들러
    const handleDelete = async (projectNum) => {
        if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
            try {
                await actions.deleteProject(projectNum);
                alert("프로젝트가 성공적으로 삭제되었습니다.");
            } catch (error) {
                console.error("프로젝트 삭제 실패:", error);
                alert("프로젝트 삭제에 실패했습니다.");
            }
        }
    };

    return (
        <div className={styles.gridContainerAdminNotice}>
            <TitleText title="프로젝트 관리" />

            <AdminFilterTabs
                navItems={[
                    { name: "ALL", label: "전체 프로젝트" },
                    { name: "REVIEW", label: "심사 현황" },
                    { name: "HIDDEN", label: "숨김 프로젝트" },
                ]}
                activeTab={activeTab}
                onTabClick={handleTabClick}
            />

            <ReusableTable
                title="프로젝트 목록"
                data={currentData}
                columns={getColumns()}
                searchOptions={[
                    { label: "제목", value: "title" },
                    { label: "글번호", value: "projectNum" },
                    { label: "제작자", value: "creatorName" },
                    { label: "카테고리", value: "category" },
                ]}
                categoryOptions={categoryOptions}
                onSearch={(option, keyword) => {
                    setSearchOption(option);
                    setSearchKeyword(keyword);
                    setCurrentPage(1);
                }}
            />

            {Math.ceil(filteredData.length / ITEMS_PER_PAGE) > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default ProjectManagementPage;
