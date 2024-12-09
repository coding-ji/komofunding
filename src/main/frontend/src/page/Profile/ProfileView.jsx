import Sidemenu from "../../components/SideMenu/SideMenu";
import Profile from "../../container/Profile/Profile";
import { updateUserProfile, getUserProfile } from "../../service/apiService";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./ProfileView.css";

function ProfileView() {
  // URL에서 userNum 가져오기
  const { userNum } = useParams();
  const { state: userState, actions: userActions } = UserStore();

  useEffect(() => {
    if (userNum) {
      const fetchUserProfileData = async () => {
        try {
          const response = await getUserProfile(userNum);
          const userData = response.data;
          userActions.updateAllFields(userData);
        } catch (error) {
          console.error("프로필 정보 가져오기 실패:", error);
        }
      };
  
      fetchUserProfileData();
    } else {
      console.error("userNum이 존재하지 않습니다.");
    }
  }, [userNum]);

  return (
    <div className="ProfileViewPosition">
      <Sidemenu />
      {console.log(userState)}
      {userState ? (
        <Profile profileData={userState} /> // Profile 컴포넌트에 데이터 전달
      ) : (
        <div>로딩 중...</div> // 프로필 데이터 로딩 중이면 표시할 내용
      )}
    </div>
  );
}

export default ProfileView;
