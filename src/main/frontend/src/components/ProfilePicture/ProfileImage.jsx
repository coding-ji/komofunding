import React, { useState } from "react";
import "./ProfileImage.css";

const ProfileImage = ({ initialImageSrc, size = "100px", gridArea, handleImageUpload }) => {

  return (
    <>
    <div
      className="profile-image-wrapper"
      style={{
        // width: `100%`,
        // height: `100%`,
        borderRadius: "50%",
        overflow: "hidden",
        border: "2px solid #ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridArea:gridArea,
        height: size,
        width : size
      }}
    >
      {/* 프로필 이미지 */}
      <img
        src={initialImageSrc}
        alt="Profile"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* 숨겨진 파일 업로드 */}
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
    </>
  );
};

export default ProfileImage;
