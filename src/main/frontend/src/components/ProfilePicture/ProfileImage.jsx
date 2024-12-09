import React, { useState } from "react";
import "./ProfileImage.css";

const ProfileImage = ({ initialImageSrc, size = "100px", gridArea  }) => {
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); // 이미지 미리보기
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImage;
