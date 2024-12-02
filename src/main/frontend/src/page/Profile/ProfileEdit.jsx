import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import "./ProfileEdit.css"; // CSS 파일 import
import { Btn } from "../../components/MyBtn";
import "../../index.css";

const ProfileEdit = () => {
  const { userNum } = useParams(); // URL 파라미터에서 userNum 추출
  const [profile, setProfile] = useState({
    profileImg: "",
    name: "",
    nickname: "",
    email: "",
    userId: "",
    description: "",
    phone: "",
    bankName: "",
    accountNumber: "",
    businessName: "",
    representativeName: "",
    businessNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/data/userData.json`);
        const users = response.data;
        const user = users.find((u) => u.userNum === userNum);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await axios.put(`/data/userData.json`, profile); // 서버에 데이터 저장 요청
      alert("프로필이 저장되었습니다.");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("프로필 저장 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="profile-edit-container">
      <h2 className="section-title">회원 정보</h2>
      <ProfileImage
        size="150px"
        initialImageSrc={profile.profileImg}
        gridArea="profileImage"
      />
      <Btn
        text="이미지 업로드"
        height="30px"
        fontSize="0.8rem"
        padding="5px 15px"
      />

      <div className="profile-edit-form">
        <label>이름</label>
        <input type="text" value={profile.name} name="name" readOnly />

        <label>닉네임</label>
        <input
          type="text"
          value={profile.nickname}
          name="nickname"
          onChange={handleInputChange}
        />

        <label>이메일</label>
        <input
          type="email"
          value={profile.email}
          name="email"
          onChange={handleInputChange}
        />

        <label>회원번호</label>
        <input type="text" value={profile.userId} name="userId" readOnly />

        <label>한줄 소개</label>
        <input
          type="text"
          value={profile.description}
          name="description"
          onChange={handleInputChange}
        />

        <label>휴대폰 번호</label>
        <input
          type="text"
          value={profile.phone}
          name="phone"
          onChange={handleInputChange}
        />

        <label>계좌 정보</label>
        <select
          value={profile.bankName}
          name="bankName"
          onChange={handleInputChange}
        >
          <option value="">은행 선택</option>
          <option value="신한">신한</option>
          <option value="우리">우리</option>
          <option value="국민">국민</option>
        </select>
        <input
          type="text"
          value={profile.accountNumber}
          name="accountNumber"
          onChange={handleInputChange}
        />

        <h2 className="section-title">사업자 정보</h2>
        <label>법인/상호명</label>
        <input
          type="text"
          value={profile.businessName}
          name="businessName"
          onChange={handleInputChange}
        />

        <label>대표자명</label>
        <input
          type="text"
          value={profile.representativeName}
          name="representativeName"
          onChange={handleInputChange}
        />

        <label>사업자 번호</label>
        <input
          type="text"
          value={profile.businessNumber}
          name="businessNumber"
          onChange={handleInputChange}
        />

        <div className="button-group">
          <Btn text="확인" onClick={handleSaveProfile} />
          <Btn text="취소" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
