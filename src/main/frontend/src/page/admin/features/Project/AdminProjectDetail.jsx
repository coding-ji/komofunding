import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../../../stores/AdminStore/useStore";
import styles from "./AdminProjectDetail.module.css";
import AdminProjectCard from "./AdminProjectCard";
import MainProDetails from "../../../MainProDetails/MainProDetails";

const AdminProjectDetail = () => {
  const { projectNum } = useParams();
  const navigate = useNavigate();

  const { state: projectState, actions: projectActions } = useStore();

  // 프로젝트 데이터 불러오기
  useEffect(() => {
    if (projectNum) {
      projectActions.fetchAdminProjects(projectNum);
    }
  }, [projectNum]);


  if (!projectState.project) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  
  return (
    <div className={styles.container}>
      {/* 상단: 프로젝트 정보 */}
      <AdminProjectCard project={projectState.project} onUpdate={() => projectActions.fetchAdminProjects(projectNum)} />

      {/* 하단: 기존 MainProDetails 컴포넌트 */}
      <div className={styles.detailsSection}>
        <MainProDetails />
      </div>

      {/* 뒤로가기 버튼 */}
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        목록으로 돌아가기
      </button>
    </div>
  );
};

export default AdminProjectDetail;
