import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import "./Profile.css"; // CSS 파일 import
import { Btn , WhiteBtn } from "../../components/MyBtn";
import '../../index.css'



const Profile = () => {
  const { userNum } = useParams(); // URL 파라미터에서 userNum 추출
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/data/userData.json`);
        const users = response.data;
        const user = users.find((u) => u.userNum === userNum); // userNum으로 필터링
        if (user) {
          setProfile(user);
        } else {
          console.error("사용자를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProfile();
  }, [userNum]);

  if (!profile) {
    return <p>프로필 데이터를 불러오는 중입니다...</p>; // 로딩 상태
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
          initialImageSrc={profile.profileImg}
          gridArea="profileImage"
        />
        <div className="profile-info">
          <h1 className="usernickname">{profile.nickname}</h1>
          <p className="user-id">회원번호: {profile.userNum}</p>
          <Btn text="프로필 편집"  height="30px" fontSize="0.7rem" padding="3px 10px"/>
        </div>
      </div>

      {/* 자기 소개 섹션 */}
      <div className="profile-section">
        <h1 className="profile-sub-title">자기 소개</h1>
        <div className="conversion-options">
        <p>{profile.description}</p>
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
             onClick={handleCreateApply}
        ></WhiteBtn>
      </div>
    </div>
  );
};

export default Profile;
