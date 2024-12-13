import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidemenu from "../../components/SideMenu/SideMenu";
import Profile from "../../container/Profile/Profile";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import "./ProfileView.css";
import Popup from '../../components/Popupmodal/Popup'

function ProfileView() {
  // URL에서 userNum 가져오기
  const { userNum } = useParams();
  const { state: userState, actions: userActions } = UserStore();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (userNum) {
      const fetchUserProfileData = async () => {
        try {
          // API 호출해서 사용자 데이터 가져오기
          await userActions.fetchUserProfile(userNum);  // getUserProfile을 사용하여 API 요청

        } catch (error) {
          console.error("프로필 정보 가져오기 실패:", error);
        }
      };

      fetchUserProfileData();
    } else {
      console.error("userNum이 존재하지 않습니다.");
    }
  }, [userNum]); // userNum이 변경될 때마다 다시 API 호출


  const deleteUser = async () => {
    try {
      console.log("회원 탈퇴 요청 시작");
      await userActions.removeUser(userNum);
      console.log("회원 탈퇴 성공");
      navigate("/");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("삭제에 실패했습니다.", error)
    }
  }

  const openPopup = () => setIsPopupOpen(true); // 팝업 열기
  const closePopup = () => setIsPopupOpen(false); // 팝업 닫기

  return (
    <div className="ProfileViewPosition">
      <Sidemenu onDeleteAccount={openPopup}/>
      {userState.user ? (
        <Profile profileData={userState.user} userNum={userNum} /> // Profile 컴포넌트에 데이터 전달
      ) : (
        <div>로딩 중...</div> // 프로필 데이터 로딩 중이면 표시할 내용
      )}

{isPopupOpen && (
        <Popup
          message="정말로 탈퇴하시겠습니까?"
          onClose={closePopup} // 팝업 닫기
          onConfirm={() => {
            deleteUser(); // 탈퇴 로직 실행
            closePopup(); // 팝업 닫기
          }}
        />
      )}
    </div>
  );
}

export default ProfileView;