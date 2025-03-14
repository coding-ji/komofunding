import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TitleText from "../../../../components/TitleText";
import ReusableTable from "../../../../components/Table/ReusableTable";
import { useStore } from "../../../../stores/AdminStore/useStore";
import styles from "../../../../components/Table/ReusableTable.module.css";
import Pagination from "../../../MyPage/Pagination";
import AdminFilterTabs from "../../components/AdminTabs/AdminFilterTabs";
import UserInfoModal from "./UserInfoModal";
import CreatorPendingModal from "./CreatorPendingModal";

// 상태 및 유형 매핑
const getDescriptionFromStatus = (status) => {
  switch (status) {
    case "DONOR":
      return "후원자";
    case "CREATORPENDING":
      return "제작자 신청 중";
    case "CREATOR":
      return "제작자";
    case "REJECTED":
      return "제작자 거절";
    case "DEACTIVATED":
      return "탈퇴";
    case "SUSPENDED":
      return "정지";
    default:
      return "활동";
  }
};

const UserManagementPage = () => {
  const { state, actions } = useStore();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchOption, setSearchOption] = useState("nickName");
  const [activeTab, setActiveTab] = useState("ALL");
  const [searchParams] = useSearchParams(); // URL의 파라미터 읽기
  const [isDone, setIsDone] = useState(false);

  // 모달 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  const [modalType, setModalType] = useState(null); // 'userInfo' 또는 'creatorPending'

  useEffect(() => {
    const tabParam = searchParams.get("tab"); // 'tab' 파라미터 읽기
    if (tabParam) {
      setActiveTab(tabParam); // 파라미터에 맞게 activeTab 설정
    }
  }, [searchParams]);

  // 모달 열기 함수
  const openUserModal = (user) => {
    if (activeTab === "CREATORPENDING") {
      // 제작자 전환 대기 모달 열기
      setModalType("creatorPending");
    } else {
      // 전체 회원 또는 탈퇴/정지 회원 모달 열기
      setModalType("userInfo");
      setSelectedUserData({
        userCode: user.userNum,
        email: user.email,
        name: user.name,
        nickName: user.nickName,
        phoneNumber: user.phoneNumber,
        joinDate: user.joinDate,
        address: user.address || "주소 없음",
        accountNumber: user.accountNumber || "계좌번호 없음",
        role: user.userType, // 제작자 or 후원자
      });
    }
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

 // 강제 탈퇴 실행 함수
const handleForceDelete = () => {
  const isConfirmed = window.confirm("정말 이 회원을 강제 탈퇴시키겠습니까?");
  if (isConfirmed) {
    actions.deactivate(selectedUserData.userCode, "SUSPENDED"); // 탈퇴 API 실행
    setIsDone(true);  // isDone 상태 업데이트
    closeModal(); // 모달 닫기
  } else {
    console.log("강제 탈퇴가 취소되었습니다.");
  }
};

// 데이터를 불러오는 함수
const fetchData = async () => {
  try {
    await actions.fetchUsers();
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    alert("데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
  }
};

// useEffect로 fetchUsers 실행
useEffect(() => {
  fetchData();  // 컴포넌트 로딩 시 데이터 불러오기
}, []);

// isDone 상태 변경 시 fetchUsers 재호출
useEffect(() => {
  if (isDone) {
    fetchData(); // 데이터 새로 불러오기
    setIsDone(false); // isDone 상태 초기화
  }
}, [isDone]);

  const userTypeOptions = [
    { value: "후원자", label: "후원자" },
    { value: "제작자 신청 중", label: "제작자 신청 중" },
    { value: "제작자", label: "제작자" },
    { value: "제작자 거절", label: "제작자 거절" },
  ];

  const userStatusOptions = [
    { value: "활동회원", label: "활동회원" },
    { value: "탈퇴회원", label: "탈퇴회원" },
    { value: "정지회원", label: "정지회원" },
  ];

  const ITEMS_PER_PAGE = 10;

  if (!Array.isArray(state.user)) {
    return <p>데이터 로드 중...</p>;
  }

  // 상태 및 유형 변환
  const transformedData = state.user.map((user) => ({
    ...user,
    userType: getDescriptionFromStatus(user.activatedStatus),
    userStatus:
      user.activatedStatus === "DEACTIVATED" ||
      user.activatedStatus === "SUSPENDED"
        ? getDescriptionFromStatus(user.activatedStatus)
        : "활동",
  }));

  // 탭에 따라 데이터 필터링
  const filteredData = transformedData.filter((user) => {
    if (
      activeTab === "CREATORPENDING" &&
      user.activatedStatus !== "CREATORPENDING"
    ) {
      return false;
    }
    if (activeTab === "DEACTIVATED" && user.activatedStatus !== "DEACTIVATED") {
      return false;
    }
    return true;
  });

  // 열 정의 변경
  const getColumns = () => {
    if (activeTab === "ALL") {
      return [
        { label: "유형", accessor: "userType" },
        { label: "회원번호", accessor: "userNum" },
        { label: "닉네임", accessor: "nickName" },
        { label: "이메일", accessor: "email" },
        { label: "전화번호", accessor: "phoneNumber" },
        { label: "가입일", accessor: "joinDate" },
        { label: "상태", accessor: "userStatus" },
      ];
    } else if (activeTab === "CREATORPENDING") {
      return [
        { label: "유형", accessor: "userType" },
        { label: "회원번호", accessor: "userNum" },
        { label: "닉네임", accessor: "nickName" },
        { label: "이메일", accessor: "email" },
        { label: "전화번호", accessor: "phoneNumber" },
        { label: "신청일", accessor: "approvalDate" },
        { label: "상태", accessor: "userStatus" },
      ];
    } else if (activeTab === "DEACTIVATED") {
      return [
        { label: "유형", accessor: "userType" },
        { label: "회원번호", accessor: "userNum" },
        { label: "닉네임", accessor: "nickName" },
        { label: "이메일", accessor: "email" },
        { label: "전화번호", accessor: "phoneNumber" },
        { label: "탈퇴일", accessor: "deactivationDate" },
        { label: "상태", accessor: "userStatus" },
      ];
    }
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (option, keyword) => {
    setSearchOption(option);
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
    setSearchKeyword("");
    setSearchOption("nickName");
  };

  return (
    <>
      {state.user && (
        <div className={styles.gridContainerAdminNotice}>
          <TitleText title="유저 관리" />
          <AdminFilterTabs
            navItems={[
              { name: "ALL", label: "전체회원" },
              { name: "CREATORPENDING", label: "제작자 전환 대기" },
              { name: "DEACTIVATED", label: "탈퇴/정지 회원" },
            ]}
            activeTab={activeTab}
            onTabClick={handleTabClick}
          />

          <ReusableTable
            title="유저 목록"
            data={currentData}
            columns={getColumns()}
            searchOptions={[
              { label: "닉네임", value: "nickName" },
              { label: "이메일", value: "email" },
              { label: "전화번호", value: "phoneNumber" },
              { label: "유형", value: "userType" },
              { label: "상태", value: "userStatus" },
            ]}
            userTypeOptions={userTypeOptions}
            userStatusOptions={userStatusOptions}
            onSearch={handleSearch}
            onRowClick={openUserModal}
          />

          {Math.ceil(filteredData.length / ITEMS_PER_PAGE) > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
              onPageChange={setCurrentPage}
            />
          )}
          {isModalOpen && modalType === "userInfo" && (
            <UserInfoModal
              userData={selectedUserData}
              onClose={closeModal}
              onForceDelete={handleForceDelete}
            />
          )}

          {isModalOpen && modalType === "creatorPending" && (
            <CreatorPendingModal
              userData={selectedUserData}
              onClose={closeModal}
              onApprove={() => {
                console.log("승인 처리:", selectedUserData.userCode);
                closeModal();
              }}
              onReject={() => {
                console.log("거절 처리:", selectedUserData.userCode);
                closeModal();
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserManagementPage;
