import Sidemenu from '../../components/SideMenu/SideMenu'
import Profile from '../../container/Profile/Profile'
import '../../index.css'
import './ProfileView.css'

function ProfileView(){

    return(
        <div className='ProfileViewPosition'>
        <Sidemenu/>
        <Profile/>
        </div>
    )
}

export default ProfileView