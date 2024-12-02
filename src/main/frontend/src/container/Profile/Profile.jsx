import React, {  useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import "./Profile.css"; // CSS 파일 import
import { Btn , WhiteBtn } from "../../components/MyBtn";
import '../../index.css'
import { useStore } from "../../stores/UserStore/useStore";



const Profile = () => {
 const { state, actions } = useStore();
  const { userNum } = useParams(); // URL 파라미터에서 userNum 추출
  const navigate = useNavigate();


  useEffect(() => {
    //데이터를 가져오는 비동기 작업
    axios.get("/data/userData.json")
    .then(response =>{
      //userData.json 데이터 가져오기
      const datas = response.data; 
      // 해당 유저
      const userData = datas.find(data=> data.userNum === userNum);
      if(userData){
        actions.changeUserNum(userData.userNum);
        actions.changeEmail(userData.email);
        actions.changePassword(userData.password);
        actions.changeName(userData.name);
        actions.changeNickname(userData.nickname);
        actions.changePhone(userData.phone);
        actions.changeProfileImg(userData.profileImg);
        actions.changeUserDescription(userData.description);
        actions.changeUserActivatedStatus(userData.activatedStatus);
        actions.changeUserBankName(userData.bankName);
        actions.changeUserAccountNumber(userData.accountNumber);
        actions.changeUserAccountHolder(userData.accountHolder);
        actions.changeUserJoinDate(userData.joinDate);
        actions.changeCorporationName(userData.corporationName);
        actions.changeCorporationTel(userData.corporationTel);
        actions.changeBSN(userData.bsn);
      }else{
        console.error("해당 유저를 찾을 수 없습니다.")
      }
    })
    .catch(error=>{
      console.error("데이터 로딩 실패", error);
    })
  }, [userNum]);



  function handleCreateApply(){
    navigate(`/create-apply`)
  }

  return (
    <div className="profile-container">
      {console.log(state)}
      {/* 상단 프로필 정보 */}
      <div className="profile-header">
        <ProfileImage
          size="200px"
          initialImageSrc={state.profileImg}
          gridArea="profileImage"
        />

        <div className="profile-info">
          <h1 className="usernickname">{state.nickname}</h1>
          <p className="user-id">회원번호: {state.userNum}</p>
          <Btn text="프로필 편집"  height="30px" fontSize="0.7rem" padding="3px 10px"/>
        </div>
      </div>

      {/* 자기 소개 섹션 */}
      <div className="profile-section">
        <h1 className="profile-sub-title">자기 소개</h1>
        <div className="conversion-options">
        <p>{state.description}</p>

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
