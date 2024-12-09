import React, {  useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import "./Profile.css"; // CSS 파일 import
import { Btn , WhiteBtn } from "../../components/MyBtn";
import '../../index.css'
import { useStore } from "../../stores/UserStore/useStore";



const Profile = ({profileData, userNum}) => {

    const navigate = useNavigate();

  function ProfileEdit(){
    navigate(`/home/profile-edit/${userNum}`);
  }

  function handleCreateApply(){
    navigate(`/create-apply`)
  }

  return (
    <div className="profile-container">
      {/* 상단 프로필 정보 */}
      <div className="profile-header">
        <ProfileImage
          size="200px"
          initialImageSrc={profileData.profileImg}
          gridArea="profileImage"
        />
        <div className="profile-info">
          <h1 className="usernickname">{profileData.nickName}</h1>
          <p className="user-id">회원번호: {profileData.userNum}</p>
          <Btn text="프로필 편집"  height="30px" fontSize="0.7rem" padding="3px 10px"
           onClick={ProfileEdit}
          />
        </div>
      </div>

      {/* 자기 소개 섹션 */}
      <div className="profile-section">
        <h1 className="profile-sub-title">자기 소개</h1>
        <div className="conversion-options">
        <p>{profileData.shortDescription}</p>

        </div>
      </div>

      {/* 제작자 전환 신청 섹션 */}
      <div className="conversion-section">
        <p className="profile-sub-title">제작자 전환 신청</p>
        <div className="conversion-options">
          <div className="option">
            <h3>1. 개인 제작자</h3>
            <p>제출 서류: 신분증 사본</p>
            <p>추가 조건: 본인의 계좌 및 입금 가능 여부 확인</p>
          </div>
          <div className="option">
            <h3>2. 개인 사업자</h3>
            <p>제출 서류: 사업자 등록증</p>
            <p>추가 조건: 본인의 계좌 및 입금 가능 여부 확인</p>
          </div>
          <div className="option">
            <h3>3. 법인 사업자</h3>
            <p>제출 서류: 사업자 등록증, 법인 등록증</p>
            <p>추가 조건: 법인 명의 계좌 및 입금 가능 여부 확인</p>
          </div>
        </div>
        <WhiteBtn text="제작자 전환 신청"
            width="100%" height="50px" padding="3px auto" fontSize="1rem"
            onClick={handleCreateApply} // 확인해야 할 부분
        ></WhiteBtn>
      </div>
    </div>
  );
};

export default Profile;
