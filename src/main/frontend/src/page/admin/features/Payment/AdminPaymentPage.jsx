import React, { useState, useEffect } from "react";
import TitleText from "../../../../components/TitleText";
import ReusableTable from "../../../../components/Table/ReusableTable";
import AdminFilterTabs from "../../components/AdminTabs/AdminFilterTabs";
import Pagination from "../../../MyPage/Pagination";
import { useStore } from "../../../../stores/PaymentStore/useStore";
import styles from "./AdminPaymentPage.module.css";

const AdminPaymentPage = () => {
  const { state, actions } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("정산");

  const [payments, setPayments] = useState([]); // 데이터를 쌓아두는 배열 상태
  const [isLoaded, setIsLoaded] = useState(true);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        actions.allPaymentInformation();

      } catch (error) {
        console.error("프로젝트를 가져오는데 실패했습니다.");
      }
    };

    fetchData();
  }, []);


  if (!Array.isArray(state.payment)) {
    return <p>데이터 로드 중...</p>;
  }

  // 필터링된 데이터
  const filteredData = state.payment && state.payment?.filter((item) => {
    if (activeTab === "정산") return item.paymentStatus === "정산";
    if (activeTab === "환불") return item.isRefunded === true;
    return true; // 기본
  });

  const currentData = filteredData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const columns = [
    { label: "No", accessor: "no", render: (_, index) => index + 1 },
    { label: "카테고리", accessor: "title" },
    { label: "달성률", accessor: "achievementRate", render: () => "60%" },
    { label: "회원코드", accessor: "userNum" },
    { label: "닉네임", accessor: "nickName" },
    { label: "이메일", accessor: "email" },
    { label: "상태", accessor: "paymentStatus" },
  ];

  const navItems = [
    { name: "정산", label: "정산" },
    { name: "환불", label: "환불" },
  ];

  return (
    <>
      {state.payment && (
        <div className={styles.container}>
          <TitleText title="결제 관리" />
          {/* 탭 필터 */}
          <AdminFilterTabs
            navItems={navItems}
            activeTab={activeTab}
            onTabClick={(tabName) => {
              setActiveTab(tabName);
              setCurrentPage(1);
            }}
          />
          
          {/* 테이블 */}
          <ReusableTable
            title="결제 목록"
            data={state.payment || []}
            columns={columns}
            defaultSortBy="paymentDate"
            defaultSortOrder="desc"
            searchOptions={[
              { label: "닉네임", value: "nickName" },
              { label: "이메일", value: "email" },
              { label: "전화번호", value: "phoneNumber" },
              { label: "유형", value: "userType" },
              { label: "상태", value: "userStatus" },
            ]}
          />

          {/* 페이지네이션 */}
          {filteredData?.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / ITEMS_PER_PAGE)}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdminPaymentPage;
