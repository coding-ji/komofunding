import React, { useState } from "react";
import TitleText from "../../../../components/TitleText";
import AdminFilterTabs from "../../components/AdminTabs/AdminFilterTabs"; // 탭 컴포넌트
import PaginationComp from "../../../../components/Pagination/PaginationComp";
import ReusableTable from "../../../../components/Table/ReusableTable";
import styles from "./QnaPage.module.css"; // CSS 파일

const navItems = [
  { name: "ALL", label: "전체" },
  { name: "WAITING", label: "답변대기" },
  { name: "COMPLETED", label: "답변완료" },
];

const dummyData = [
  { id: 1, title: "24주년 프로 이벤트 당첨 유의점", nickname: "포실포실시리", date: "2024.06.26", status: "미완", response: "답변 대기" },
  { id: 2, title: "정기 점검 안내", nickname: "유저1234", date: "2024.06.25", status: "완료", response: "답변 완료" },
  { id: 3, title: "서비스 이용 문의", nickname: "고객A", date: "2024.06.24", status: "미완", response: "답변 대기" },
  { id: 4, title: "결제 오류 문의", nickname: "에러123", date: "2024.06.23", status: "완료", response: "답변 완료" },
  { id: 5, title: "배송 관련 문의", nickname: "배송맨", date: "2024.06.22", status: "미완", response: "답변 대기" },
  { id: 6, title: "회원 정보 수정", nickname: "닉변유저", date: "2024.06.21", status: "완료", response: "답변 완료" },
  { id: 7, title: "프로모션 참여", nickname: "참여왕", date: "2024.06.20", status: "미완", response: "답변 대기" },
  { id: 8, title: "상품 문의", nickname: "상품알못", date: "2024.06.19", status: "완료", response: "답변 완료" },
  { id: 9, title: "회원 탈퇴 문의", nickname: "탈퇴고객", date: "2024.06.18", status: "미완", response: "답변 대기" },
  { id: 10, title: "리뷰 작성 방법", nickname: "리뷰어", date: "2024.06.17", status: "완료", response: "답변 완료" },
  { id: 11, title: "신규 이벤트 참여", nickname: "새로운유저", date: "2024.06.16", status: "미완", response: "답변 대기" },
  { id: 12, title: "24주년 프로 이벤트 당첨 유의점", nickname: "포실포실시리", date: "2024.06.26", status: "미완", response: "답변 대기" },
  { id: 13, title: "정기 점검 안내", nickname: "유저1234", date: "2024.06.25", status: "완료", response: "답변 완료" },
  { id: 14, title: "서비스 이용 문의", nickname: "고객A", date: "2024.06.24", status: "미완", response: "답변 대기" },
  { id: 15, title: "결제 오류 문의", nickname: "에러123", date: "2024.06.23", status: "완료", response: "답변 완료" },
  { id: 16, title: "배송 관련 문의", nickname: "배송맨", date: "2024.06.22", status: "미완", response: "답변 대기" },
  { id: 17, title: "회원 정보 수정", nickname: "닉변유저", date: "2024.06.21", status: "완료", response: "답변 완료" },
  { id: 18, title: "프로모션 참여", nickname: "참여왕", date: "2024.06.20", status: "미완", response: "답변 대기" },
  { id: 19, title: "상품 문의", nickname: "상품알못", date: "2024.06.19", status: "완료", response: "답변 완료" },
  { id: 20, title: "회원 탈퇴 문의", nickname: "탈퇴고객", date: "2024.06.18", status: "미완", response: "답변 대기" },
  { id: 21, title: "리뷰 작성 방법", nickname: "리뷰어", date: "2024.06.17", status: "완료", response: "답변 완료" },
  { id: 22, title: "신규 이벤트 참여", nickname: "새로운유저", date: "2024.06.16", status: "미완", response: "답변 대기" },
  { id: 23, title: "24주년 프로 이벤트 당첨 유의점", nickname: "포실포실시리", date: "2024.06.26", status: "미완", response: "답변 대기" },
  { id: 24, title: "정기 점검 안내", nickname: "유저1234", date: "2024.06.25", status: "완료", response: "답변 완료" },
  { id: 25, title: "서비스 이용 문의", nickname: "고객A", date: "2024.06.24", status: "미완", response: "답변 대기" },
  { id: 26, title: "결제 오류 문의", nickname: "에러123", date: "2024.06.23", status: "완료", response: "답변 완료" },
  { id: 27, title: "배송 관련 문의", nickname: "배송맨", date: "2024.06.22", status: "미완", response: "답변 대기" },
  { id: 28, title: "회원 정보 수정", nickname: "닉변유저", date: "2024.06.21", status: "완료", response: "답변 완료" },
  { id: 29, title: "프로모션 참여", nickname: "참여왕", date: "2024.06.20", status: "미완", response: "답변 대기" },
  { id: 30, title: "상품 문의", nickname: "상품알못", date: "2024.06.19", status: "완료", response: "답변 완료" },
  { id: 31, title: "회원 탈퇴 문의", nickname: "탈퇴고객", date: "2024.06.18", status: "미완", response: "답변 대기" },
  { id: 32, title: "리뷰 작성 방법", nickname: "리뷰어", date: "2024.06.17", status: "완료", response: "답변 완료" },
  { id: 33, title: "신규 이벤트 참여", nickname: "새로운유저", date: "2024.06.16", status: "미완", response: "답변 대기" },
];

const columns = [
  { label: "No", accessor: "id" },
  { label: "제목", accessor: "title" },
  { label: "별명", accessor: "nickname" },
  { label: "날짜", accessor: "date" },
  { label: "상태", accessor: "status" },
  { label: "답변 여부", accessor: "response" },
];

const searchOptions = [
  { label: "제목", value: "title" },
  { label: "별명", value: "nickname" },
  { label: "상태", value: "status" },
];

function QnaPage() {
  const [activeTab, setActiveTab] = useState("ALL"); // 현재 활성화된 탭 상태
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드
  const [searchOption, setSearchOption] = useState("title"); // 검색 옵션

  // 탭에 따른 데이터 필터링
  const filteredByTab = dummyData.filter((item) => {
    if (activeTab === "WAITING") return item.response === "답변 대기";
    if (activeTab === "COMPLETED") return item.response === "답변 완료";
    return true; // "ALL" 탭
  });

  // 검색 키워드에 따른 데이터 필터링
  const filteredData = filteredByTab.filter((item) => {
    const value = item[searchOption]?.toString().toLowerCase() || "";
    return value.includes(searchKeyword.toLowerCase());
  });

  // 검색 핸들러
  const handleSearch = (option, keyword) => {
    setSearchOption(option);
    setSearchKeyword(keyword);
  };

  return (
    <div className={styles["wrapper-qna"]}>
      <TitleText height="150px" title="Q&A 관리" />
      <AdminFilterTabs
        navItems={navItems}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        className={styles["buttonWrapper-qna"]}
      />
      <div className={styles["tableWrapper-qna"]}>
        <PaginationComp
          items={filteredData}
          itemsPerPage={10} // 한 페이지당 표시할 데이터 수
          render={(currentItems) => (
            <ReusableTable
              title="Q&A 리스트"
              data={currentItems}
              columns={columns}
              searchOptions={searchOptions}
              onSearch={handleSearch}
              tableClassName={styles["table-qna"]}
            />
          )}
        />
      </div>
    </div>
  );
}

export default QnaPage;
