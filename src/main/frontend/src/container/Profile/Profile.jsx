import ProfileImage from '../../components/ProfilePicture/ProfileImage'
import './Profile.css'

function Profile(){

    return(
         <>
         <div className="profile-flexbox">
            <div className='profile-image-name'>
                <ProfileImage gridArea="ProfileImage"/>
                <p className='username'>포실친구</p>
            </div>
            <div>
                <h1>자기소개</h1>
            </div>
            <div>
                <h1>제작자 전환 신청</h1>
            </div>
         </div>
         </>
    )
}

export default Profile