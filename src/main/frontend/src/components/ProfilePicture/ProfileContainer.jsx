import React from "react";
import ProfileImage from "./ProfileImage";
import "./ProfileContainer.css";

const ProfileContainer = () => {
  const handleImageUploadClick = () => {
    document.getElementById("upload-image").click(); // 파일 업로드 input 트리거
  };

  return (
    <>
    <div className="profile-container">
      {/* 프로필 이미지 */}
      <ProfileImage size={150} />
      
      {/* 이미지 등록 버튼 */}
      <button className="upload-button" onClick={handleImageUploadClick}>
        이미지 등록
      </button>
    </div>
    </>
  );
};

export default ProfileContainer;
