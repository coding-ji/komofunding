import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TitleText from "../../../../components/TitleText";
import ReusableTable from "../../../../components/Table/ReusableTable";
import styles from "../../../../components/Table/ReusableTable.module.css";
import Pagination from "../../../MyPage/Pagination";
import AdminFilterTabs from "../../components/AdminTabs/AdminFilterTabs";
import { useStore } from "../../../../stores/AdminStore/useStore";
import { formattedDate } from "../../../../utils/formattedData";


const ProjectManagementPage = () => {
    const { state, actions } = useStore();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchOption, setSearchOption] = useState("title");
    const [activeTab, setActiveTab] = useState("ALL");
    const [searchParams] = useSearchParams();

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const tabParam = searchParams.get("tab");
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                actions.fetchAllProject();
            } catch (error) {
                console.error("프로젝트를 가져오는데 실패했습니다.");
            }
        };

        fetchData();
    }, []);


    if (!Array.isArray(state.project)) {
        return <p>데이터 로드 중...</p>;
    }

    // 데이터 변환 로직
    const enhancedData = state.project.map((project) => ({
        ...project,
        status: project.isHidden ? "숨김" : "활성",
        projectPeriod: project.projectStartDate && project.projectEndDate
            ? `${formattedDate(project.projectStartDate)} ~ ${formattedDate(project.projectEndDate)}`
            : "미정", // 프로젝트 기간 가공
        actions: (
            <button onClick={() => handleDelete(project.projectNum)}>
                삭제
            </button>
        ),
    }));

    // 프로젝트 데이터 필터링
    const filteredData = enhancedData.filter((project) => {
        if (activeTab === "REVIEW") return !project.isHidden; // 히든이 아닌 프로젝트만
        if (activeTab === "HIDDEN") return project.isHidden;  // 히든인 프로젝트만
        return true; // ALL 탭: 모든 프로젝트
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

    const getColumns = () => [
        { label: "프로젝트번호", accessor: "projectNum" },
        { label: "카테고리", accessor: "projectCategory" },
        {
            label: "제목",
            accessor: "title",
            render: (project) => (
                <span
                onClick={() => {
                    console.log("Navigating to:", project.projectNum);
                    navigate(`/admin/project/detail/${project.projectNum}`);
                }}
                    style={{ cursor: "pointer" }}
                >
                    {project.title}
                </span>
            ),
        },
        { label: "제작자", accessor: "nickname" },
        { label: "휴대폰", accessor: "phoneNumber" },
        { label: "프로젝트 기간", accessor: "projectPeriod" },
        { label: "신청날짜", accessor: "writtenDate" },
        { label: "상태", accessor: "status" },
    ];


    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setCurrentPage(1);
        setSearchKeyword("");
        setSearchOption("title");
    };

    const handleDelete = async (projectNum) => {
        if (window.confirm("정말로 이 프로젝트를 삭제하시겠습니까?")) {
            try {
                await actions.deleteProject(projectNum);
                alert("프로젝트가 성공적으로 삭제되었습니다.");
                navigate("/admin/project")
            } catch (error) {
                console.error("프로젝트 삭제 실패:", error);
                alert("프로젝트 삭제에 실패했습니다.");
                navigate("/admin/project")
            }
        }
    };

    return (
        <div className={styles.gridContainerAdminNotice}>
            <TitleText title="프로젝트 관리" />

            <AdminFilterTabs
                navItems={[
                    { name: "ALL", label: "전체 프로젝트" },
                    { name: "REVIEW", label: "승인 프로젝트" },
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
                    { label: "프로젝트 번호", value: "projectNum" },
                    { label: "제작자", value: "creatorName" },
                    { label: "카테고리", value: "category" },
                ]}
                categoryOptions={categoryOptions}
                onSearch={(option, keyword) => {
                    setSearchOption(option);
                    setSearchKeyword(keyword);
                    setCurrentPage(1);
                }}
                onRowClick={(row) => navigate(`/admin/project/detail/${row.projectNum}`)} // 이 부분 추가
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
