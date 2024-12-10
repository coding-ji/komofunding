import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import "./ProfileEdit.css";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import "../../index.css";
import TitleBox from "../../components/TitleBox";
import { useStore } from "../../stores/UserStore/useStore";
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import Input from "../../components/input";
import PasswordPopup from "./PasswordPopup";
import { updateUserProfile, getUserProfile, changePassword, uploadProfileImage } from "../../service/apiService";

const ProfileEdit = () => {
    const { userNum } = useParams();
    const { state, dispatch } = useStore(); // dispatch로 상태 변경
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [currentPasswordCheck, setCurrentPasswordCheck] = useState("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const [newProfileImage, setNewProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // 사용자 데이터 불러오기
     useEffect(() => {
        if (userNum) {
          const fetchUserProfileData = async () => {
            try {
              // API 호출해서 사용자 데이터 가져오기
              const response = await getUserProfile(userNum);  // getUserProfile을 사용하여 API 요청
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
      }, [userNum]); // userNum이 변경될 때마다 다시 API 호출

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // dispatch를 통해 상태 업데이트
        dispatch({ type: "UPDATE_FIELD", field: name, value });
    };

    // 프로필 저장
    const handleSaveProfile = async () => {
        try {
            let uploadedImgUrl = state.profileImage;

            if (newProfileImage) {
                const formData = new FormData();
                formData.append("file", newProfileImage);

                const response = await uploadProfileImage(formData); // 이미지 업로드 API 호출
                if (response.status === 200) {
                    uploadedImgUrl = response.data; // 업로드된 이미지 URL 설정
                } else {
                    alert("이미지 업로드 실패");
                    return;
                }
            }

//             const updatedProfile = {
//                 userNum: state.userNum,
//                 email: state.email,
//                 password: state.password,
//                 name: state.name,
//                 nickName: state.nickName,
//                 phoneNumber: state.phoneNumber,
//                 profileImage: uploadedImgUrl,
//                 shortDescription: state.shortDescription,
//                 activatedStatus: state.activatedStatus,
//                 bankName: state.bankName,
//                 accountNumber: state.accountNumber,
//                 accountHolder: state.accountHolder,
//                 BSN: state.BSN,
//             };


            // 프로필 업데이트 API 호출
            const updateResponse = await updateProfile(userNum, updatedProfile); // API 호출
            if (updateResponse.status === 200) {
                alert("수정이 완료되었습니다");
                navigate(`/profile/${state.userNum}`);
            } else {
                throw new Error("프로필 업데이트 실패");
            }
        } catch (error) {
            console.error("프로필 저장 중 오류 발생:", error);
            alert("프로필 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const handleCancel = () => {
        navigate(`/profile/${state.userNum}`);
    };

    // 비밀번호 확인
    const handlePasswordCheck = async () => {
        if (!currentPassword || !currentPasswordCheck) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (currentPassword !== currentPasswordCheck) {
            alert("비밀번호가 서로 일치하지 않습니다.");
            return;
        }

        if (state.password && currentPassword === state.password) {
            alert("비밀번호 확인 성공");
            setIsPasswordCorrect(true);
            setShowModal(true); // 모달 열기
        } else {
            alert("현재 비밀번호가 올바르지 않습니다.");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result); // 미리보기용 이미지 업데이트
            setNewProfileImage(file); // 파일 저장
        };
        reader.readAsDataURL(file);
    };

    const handlePasswordSave = (newPassword) => {
        console.log("새 비밀번호 저장:", newPassword);
        // 비밀번호 저장 API 호출
        changePassword(state.email, newPassword); // API 호출로 변경
    };

    return (
        <div className="profile-edit-container">
            <TitleBox text="회원정보" />
            <div className="profile-edit-grid-box">
                <div className="profile-image-container">
                    <ProfileImage size="200px" initialImageSrc={state.profileImage} />
                    <input
                        id="upload-profile-image"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <WhiteBtn
                        text="이미지 업로드"
                        height="30px"
                        fontSize="0.8rem"
                        padding="5px 15px"
                        width="200px"
                        onClick={() => document.getElementById("upload-profile-image").click()}
                    />
                </div>

                <div className="profile-edit-form">
                    <div className="flex-row">
                        <label>이름</label>
                        <p>{state.name}</p>
                    </div>

                    <div className="flex-row">
                        <label>닉네임</label>
                        <Input
                            type="text"
                            value={state.nickName}
                            name="nickName"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-row">
                        <label>이메일</label>
                        <p>{state.email}</p>
                    </div>

                    <div className="flex-row">
                        <label>회원번호</label>
                        <p>{state.userNum}</p>
                    </div>

                    <div className="flex-row">
                        <label>한줄 소개</label>
                        <textarea
                            name="description"
                            rows="2"
                            value={state.shortDescription}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-row">
                        <label>휴대폰 번호</label>
                        <Input
                            type="text"
                            value={state.phoneNumber}
                            name="phoneNumber"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-row">
                        <label>계좌 정보</label>
                        <select
                            value={state.bankName}
                            name="bankName"
                            onChange={handleInputChange}
                        >
                            <option value="">은행 선택</option>
                            <option value="신한">신한</option>
                            <option value="우리">우리</option>
                            <option value="하나">하나</option>
                            <option value="카카오">카카오</option>
                            <option value="농협">농협</option>
                            <option value="기업">기업</option>
                            <option value="국민">국민</option>
                            <option value="수협">수협</option>
                        </select>
                        <Input
                            type="text"
                            value={state.accountNumber}
                            name="accountNumber"
                            onChange={handleInputChange}
                            placeholder="계좌번호"
                        />
                        <Input
                            type="text"
                            value={state.accountHolder}
                            name="accountHolder"
                            onChange={handleInputChange}
                            placeholder="계좌주"
                        />
                    </div>



                    <div className="flex-row">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="현재 비밀번호"
                    />
                        <input
                            type="password"
                            value={currentPasswordCheck}
                           onChange={(e) => setCurrentPasswordCheck(e.target.value)}
                           placeholder="비밀번호 재확인"
                    />
                    <button onClick={handlePasswordCheck}>비밀번호 확인</button>
                    </div>

                    {showModal && (
                        <PasswordPopup
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            onSavePassword={handlePasswordSave}
                        />
                    )}

                    <div className="profile-edit-buttons">
                        <Btn text="저장" onClick={handleSaveProfile} />
                        <WhiteBtn text="취소" onClick={handleCancel} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
