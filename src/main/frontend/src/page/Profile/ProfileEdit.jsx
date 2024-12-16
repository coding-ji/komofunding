import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfileEdit.css";
import { Btn, WhiteBtn } from "../../components/MyBtn";
import "../../index.css";
import TitleBox from "../../components/TitleBox";
import { useStore as UserStore } from "../../stores/UserStore/useStore";
import { useStore as FileStore } from "../../stores/FileStore/useStore";
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import Input from "../../components/input";
import PasswordPopup from "./PasswordPopup";

const ProfileEdit = () => {
    const { userNum } = useParams();
    // 유저정보
    const { state: userState, actions: userActions } = UserStore();
    // 프로필 이미지 정보
    const { state: fileState, actions: fileActions } = FileStore();

    const navigate = useNavigate();

    // 인풋에 작성된 패스워드 (1)
    const [currentPassword, setCurrentPassword] = useState("");
    // 패스워드 확인(2)
    const [currentPasswordCheck, setCurrentPasswordCheck] = useState("");

    // 패스워드가 승인되었을 때 true로 변경
    const [isValidated, setIsValidated] = useState(false);

    // 새 비밀번호 모달
    const [showModal, setShowModal] = useState(false);

    // 새 비밀번호 (1)
    const [newPassword, setNewPassword] = useState("");
    // 새 비밀번호 확인(2)
    const [newPasswordCheck, setNewPasswordCheck] = useState("");

    // 새로 변경되는 profileImage
    const [newProfileImage, setNewProfileImage] = useState(null);


    // 프로필 불러오기
    useEffect(() => {
        if (userNum) {
            const fetchData = async () => {
                try {
                    await userActions.fetchUserProfile(userNum);
                } catch (error) {
                    console.error("프로필 정보 가져오기 실패:", error);
                }
            };
            fetchData();
        } else {
            console.error("userNum이 존재하지 않습니다.");
        }
    }, [userNum]);

    // 프로필불러와서 userState에 저장
    useEffect(() => {
        if (userState.user) {
            userActions.updateAllFields(userState.user);
        }
    }, [userState.user]);

    // 해당하는 인풋을 변경함
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        userActions.updateAllFields({
            ...userState,
            [name]: value,
        });
    };

    // 이미지 변경하고 서버에 저장 후에 해당 url 가져오는 로직
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; // 업로드된 첫 번째 파일만 가져옴
        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setNewProfileImage(file);
        };
        reader.readAsDataURL(file);

        const localImage = URL.createObjectURL(file);

        // 로컬 이미지 상태 업데이트 (미리보기)
        setNewProfileImage(localImage);

        const formData = new FormData();
        formData.append("file", file);

        try {
            // 이미지 저장 요청 보내기
            await fileActions.createImgData(formData); // 서버에 이미지 업로드
        } catch (error) {
            console.error("이미지 업로드 실패", error);
            alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 서버에서 이미지 URL을 받아서 userState의 profile에 저장
    useEffect(() => {
        if (fileState) {
            userActions.changeProfileImg(fileState);
        }
    }, [fileState]);


    const handlePasswordCheck = async () => {
        try {
            const data = { ...userState, password: currentPassword }; // 새로운 객체 생성
            const result = await userActions.apiVerifyPassword(userNum, data.password);
    
            if (result === "ok") {
                alert("비밀번호 인증 성공");
                setShowModal(true); // 비밀번호 변경 모달 열기
            } else if (result === "fail") {
                alert("비밀번호가 올바르지 않습니다.");
            } else {
                alert("오류가 발생했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("비밀번호 검증 중 예외 발생:", error);
            alert("알 수 없는 오류가 발생했습니다.");
        }
    };


    const handlePasswordSave = () => {
        userActions.updateAllFields({
            ...userState,
            newPassword: newPasswordCheck

        });

        setIsValidated(true);
    };

    useEffect(() => {
        if (isValidated) {
            const result = userActions.updateUserPassword(userState);

            if (result === "ok") {
                alerts("비밀번호 업데이트 성공!");
            }
        }

        setIsValidated(false);
        setShowModal(false);
    }, [isValidated])


    const handleProfileUpdate = async () => {
   
        try {
            if (!userNum || !userState) {
                alert("유효하지 않은 사용자 정보입니다.");
                return; // 유효하지 않은 상태에서는 더 이상 진행하지 않음
            }
    
            // 새로운 데이터 객체 생성
            const data = {
                ...userState,
                password: currentPassword, // 사용자가 입력한 현재 비밀번호를 포함
            };
            
            // 프로필 업데이트 실행
            const result = await userActions.updateProfile(userNum, data);
    
            if (result === "ok") { // 업데이트 성공 여부를 판단
                alert("저장 성공");
                navigate(`/home/profile/${userState.userNum}`);
            } else {
                alert("저장에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <div className="profile-edit-container">
            {userState ? (
                <>
                    <TitleBox text="회원정보" />
                    <div className="profile-edit-grid-box">
                        <div className="profile-image-container">
                            <ProfileImage
                                size="200px"
                                initialImageSrc={userState.profileImage}
                                handleImageUpload={handleImageUpload}
                            />
                            <input
                                id="upload-profile-image"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageUpload}
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

                        <div>
                            <div className="profile-edit-form">
                                <div className="flex-row">
                                    <label>이름</label>
                                    <p>{userState.name}</p>
                                </div>

                                <div className="flex-row">
                                    <label>닉네임</label>
                                    <p>{userState.nickName}</p>
                                </div>

                                <div className="flex-row">
                                    <label>이메일</label>
                                    <p>{userState.email}</p>
                                </div>

                                <div className="flex-row">
                                    <label>회원번호</label>
                                    <p>{userState.userNum}</p>
                                </div>

                                <div className="flex-row">
                                    <label>한줄 소개</label>
                                    <Input
                                        name="shortDescription"
                                        type="text"
                                        value={userState.shortDescription}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="flex-row">
                                    <label>휴대폰 번호</label>
                                    <Input
                                        type="text"
                                        value={userState.phoneNumber}
                                        name="phoneNumber"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="flex-row">
                                    <label>계좌 정보</label>
                                    <select
                                        value={userState.bankName}
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
                                        value={userState.accountNumber}
                                        name="accountNumber"
                                        onChange={handleInputChange}
                                        placeholder="계좌번호"
                                    />
                                    <Input
                                        type="text"
                                        value={userState.accountHolder}
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
                                    <button type="button" onClick={handlePasswordCheck}>
                                        비밀번호 확인
                                    </button>
                                </div>

                                {showModal && (
                                    <PasswordPopup
                                        newPassword={newPassword}
                                        setNewPassword={setNewPassword}
                                        newPasswordCheck={newPasswordCheck}
                                        setNewPasswordCheck={setNewPasswordCheck}
                                        handlePasswordSave={handlePasswordSave}
                                        onClose={() => setShowModal(false)}
                                    />
                                )}

                                <div className="profile-edit-buttons">
                                    <Btn
                                        text="저장"
                                        type="button"
                                        onClick={handleProfileUpdate}
                                    />
                                    <WhiteBtn
                                        text="취소"
                                        onClick={() => {
                                            if (userState.userNum) {
                                                navigate(`/home/profile/${userState.userNum}`);
                                            } else {
                                                alert("사용자 정보를 불러오지 못했습니다.");
                                            }
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>로딩 중입니다...</p>
            )}
        </div>
    );
};

export default ProfileEdit;
