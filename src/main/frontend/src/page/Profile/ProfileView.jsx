import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidemenu from "../../components/SideMenu/SideMenu";
import Profile from "../../container/Profile/Profile";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import "./ProfileView.css";

function ProfileView() {
  // URL에서 userNum 가져오기
  const { userNum } = useParams();
  const { state: userState, actions: userActions } = UserStore();
  const navigate = useNavigate();

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
      await userActions.removeUser(userNum);
      navigate("/");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("삭제에 실패했습니다.", error)
    }
  }


  return (
    <div className="ProfileViewPosition">
      <Sidemenu onDeleteAccount={deleteUser}/>
      {userState.user ? (
        <Profile profileData={userState.user} userNum={userNum} /> // Profile 컴포넌트에 데이터 전달
      ) : (
        <div>로딩 중...</div> // 프로필 데이터 로딩 중이면 표시할 내용
      )}
    </div>
  );
}

export default ProfileView;