import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminProjectCard.module.css";
import { AdminBtn1, AdminBtn2 } from "../../../../components/MyBtn";
import { useStore } from "../../../../stores/AdminStore/useStore";

const AdminProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const { actions } = useStore();
      
  function approveProject() {
    if (window.confirm("이 프로젝트를 승인하시겠습니까?")) {
     
      actions.approve(project[0].projectNum);
      alert("프로젝트가 승인되었습니다.");
      navigate("/admin/project/project-management")
    }
  }
  
  function rejectProject() {
    if (window.confirm("이 프로젝트를 거부하시겠습니까?")) {
      actions.reject(project[0].projectNum);
      alert("프로젝트가 거부되었습니다.");
      navigate("/admin/project/project-management")
    }
  }
  

  return (
    <>
      {project && 
   
        <div className={styles.container}>
          {/* 상단: 제작자 정보와 프로젝트 상태 */}
          <div className={styles.contentGrid}>
            {/* 제작자 정보 */}
            <div className={styles.creatorSection}>
              <h3 className={styles.sectionTitle}>제작자 정보</h3>
              <div className={styles.contentWrapper}>
                <div className={styles.profileWrapper}>
                  <img
                    src={project[0].profileImg}
                    alt="프로필"
                    className={styles.thumbnail}
                  />
                </div>

                <div className={styles.details}>
                  <p><strong>닉네임:</strong> {project[0].nickname}</p>
                  <p><strong>카테고리:</strong> {project[0].projectCategory}</p>
                  <p>
                    <strong>이메일:</strong>{" "}
                    <a href={`mailto:${project[0].email}`}>{project[0].email}</a>
                  </p>
                  <p><strong>휴대전화:</strong> {project[0].phoneNumber}</p>
                  <div className={styles.intro}>
                    <strong>한줄소개</strong>
                    <p>{project.userShortDescription || "소개가 없습니다."}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 프로젝트 상태 */}
            <div className={styles.statusSection}>
              <h3 className={styles.sectionTitle}>프로젝트 상태</h3>
              <p><strong>신청 날짜:</strong> {project[0].writtenDate || "2024-00-00"}</p>
              <p><strong>승인 날짜:</strong> {project[0].approvalDate || "해당없음"}</p>
              <p><strong>미승인 날짜:</strong> {project[0].rejectionDate || "해당없음"}</p>
              <div className={styles.buttons}>
                <AdminBtn1 text="승인" 
                onClick={() => approveProject()}
                padding=" 10px 20px" width="100px" height="40px" margin="10px" fontSize="1rem" />
                <AdminBtn2 text="거부"
                onClick={() => rejectProject()}
                 padding=" 10px 20px" width="100px" height="40px" margin="10px"   fontSize="1rem"/>
              </div>
            </div>
          </div>

          {/* 하단: 목록 버튼 */}
          <div className={styles.footer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              목록
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default AdminProjectCard;
