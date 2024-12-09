import Sidemenu from '../../components/SideMenu/SideMenu'
import Profile from '../../container/Profile/Profile'
import {updateUserProfile , getUserProfile} from "../../service/apiService"
import { useStore as UserStore } from '../../stores/UserStore/useStore';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import './ProfileView.css'

function ProfileView() {
    // URL에서 userNum 가져오기
    const { userNum } = useParams(); 
    const { state: userState, actions: userActions} = UserStore();

    useEffect(() => {
      // API 호출해서 사용자 프로필 정보 가져오기
      const fetchUserProfileData = async () => {
        try {
          const response = await getUserProfile(userNum); // userNum을 사용해 API 호출
          const userData = response.data;
          console.log(userData)
          userActions.updateAllFields(userData);
        } catch (error) {
          console.error("프로필 정보 가져오기 실패:", error);
        }
      };
  
      fetchUserProfileData(); // 컴포넌트가 마운트될 때 실행
    }, [userNum]); // userNum이 변경될 때마다 호출됨
  
    return (
      <div className='ProfileViewPosition'>
        <Sidemenu />
        {userState ? (
          <Profile profileData={userState} /> // Profile 컴포넌트에 데이터 전달
        ) : (
          <div>로딩 중...</div> // 프로필 데이터 로딩 중이면 표시할 내용
        )}
      </div>
    );
  }
  
  export default ProfileView;
  