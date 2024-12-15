import React from "react";
import Barchart from "./Barchart";
import ChartContainer from "./ChartContainer";
// import AdminPieChart from "./PieChart";
// import {QATable1, QATable2, QATable3} from "./QATable";
import styles from "./AdminMainPage.module.css";

const AdminMainPage = () => {
  // 변환된 데이터
  const transformedData = {
    totalMembers: 1200,
    monthlyNew: {
      data: [
        { month: "1월", members: 20 },
        { month: "2월", members: 25 },
        { month: "3월", members: 30 },
        { month: "4월", members: 22 },
        { month: "5월", members: 28 },
        { month: "6월", members: 35 },
      ],
    },
    withdrawMembers: {
      data: [
        { month: "7월", members: 18 },
        { month: "8월", members: 22 },
        { month: "9월", members: 15 },
        { month: "10월", members: 25 },
        { month: "11월", members: 23 },
      ],
    },
    yearly: {
      data: [
        { year: "2024", joined: 200, withdrawn: 40 },
        { year: "2023", joined: 180, withdrawn: 50 },
        { year: "2022", joined: 220, withdrawn: 60 },
      ],
    },
    dailyMembers: {
      data: [
        { name: "신규회원", value: 120 },
        { name: "탈퇴회원", value: 30 },
        { name: "일반회원", value: 250 },
      ],
    },
    projectViews: {
      data: [
        { id: 1, title: "인사버 커여워", views: "99.2%" },
        { id: 2, title: "단비 콤당", views: "98.8%" },
        { id: 3, title: "집에 가구싶다", views: "96%" },
        { id: 4, title: "졸리가 맛나네", views: "83%" },
        { id: 5, title: "도리 보고싶당", views: "82%" },
      ],
    },
    creators: {
      data: [
        { id: 1, userId: "20241114", name: "큰오지몽" },
        { id: 2, userId: "20231111", name: "수하니몽" },
        { id: 3, userId: "20000910", name: "작은지몽" },
      ],
    },
    qna: {
      data: [
        { id: 1, title: "일상비 내용 궁금해요", status: "주기" },
        { id: 2, title: "단비 관련", status: "주기" },
        { id: 3, title: "현재 가구석다", status: "미완" },
      ],
    },
  };

  const {
    totalMembers,
    monthlyNew,
    withdrawMembers,
    yearly,
    dailyMembers,
    projectViews,
    creators,
    qna,
  } = transformedData;

  return (
    <div className={styles.AdminMainPagecontainer}>
      <header className={styles.header}>
        <h1>
          현재 <span className={styles.totalMembers}>{totalMembers}</span>명의 회원이 이용 중입니다.
        </h1>
      </header>

      <section className={styles.charts}>
        <ChartContainer title="월간 신규 회원 분석">
        <Barchart data={monthlyNew.data} dataKey="month" barKey="members" />
        </ChartContainer>

        <ChartContainer title="월간 탈퇴 회원 분석">
        <Barchart
            data={withdrawMembers.data}
            dataKey="month"
            barKey="members"
            fillColor="#FF5733" // 모든 막대를 빨간색으로 설정
          />
        </ChartContainer>

        <ChartContainer title="연간 회원 분석">
  <Barchart
    data={yearly.data}
    dataKey="year"
    bars={[
      { dataKey: "joined", color: "#256E91" }, // 가입한 회원 (파란색)
      { dataKey: "withdrawn", color: "#FF5733" }, // 탈퇴한 회원 (빨간색)
    ]}
  />
</ChartContainer>
        <ChartContainer title="일간 회원 분석">
          <AdminPieChart data={dailyMembers.data} />
        </ChartContainer>
      </section>

      <section className={styles.tables}>
        <ChartContainer title="프로젝트 달성률">
          <QATable1 data={projectViews.data} />
        </ChartContainer>

        <ChartContainer title="제작자 신청">
          <QATable2 data={creators.data} />
        </ChartContainer>

        <ChartContainer title="Q&A 분석">
          <QATable3 data={qna.data} />
        </ChartContainer>
      </section>
    </div>
  );
};

export default AdminMainPage;
