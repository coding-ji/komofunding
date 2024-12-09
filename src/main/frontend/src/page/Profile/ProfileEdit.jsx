import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileEdit.css"; // CSS 파일 import
import { Btn, WhiteBtn } from "../../components/MyBtn";
import "../../index.css";
import TitleBox from "../../components/TitleBox";
import { useStore } from '../../stores/UserStore/useStore'
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import Input from "../../components/input";
import PasswordPopup from "./PasswordPopup";
import PopupInquiry from "../MyPage/writeQnA/PopupInquiry";
import { updateUserProfile, getUserProfile, uploadImg } from "../../service/apiService";


const ProfileEdit = () => {
    const { userNum } = useParams(); // URL 파라미터에서 userNum 추출
    const { state, actions } = useStore();
    const navigate = useNavigate();

    // 비밀번호 상태
    const [currentPassword, setCurrentPassword] = useState(""); // 현재 비밀번호
    const [currentPasswordCheck, setCurrentPasswordCheck] = useState(""); // 비밀번호 재확인
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // 비밀번호 확인 여부

    const [showModal, setShowModal] = useState(false); // 모달 상태
    const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호

    // 이미지 상태 관리
    const [newProfileImage, setNewProfileImage] = useState(null); // 새 이미지 파일
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                getUserProfile(userNum); 
                const userData = response.data;

                if (userData) {
                    actions.changeNickName(userData.nickName);
                    actions.changePhoneNumber(userData.phoneNumber);
                    actions.changeProfileImg(userData.profileImg);
                    actions.changeUserShortDescription(userData.shortDescription)
                    actions.changeUserBankName(userData.bankName);
                    actions.changeUserAccountNumber(userData.accountNumber);
                    actions.changeUserAccountHolder(userData.accountHolder);
                    actions.changeCorporationName(userData.corporationName);
                    actions.changeCorporationTel(userData.corporationTel);
                    actions.changeBSN(userData.BSN);
                } else {
                    console.error("해당 유저를 찾을 수 없습니다.");
                }
            } catch (error) {
                console.error("데이터 로딩 실패", error);
            }
        };
        fetchUserData();
    }, [userNum]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // useStore의 actions를 사용하여 상태 업데이트
        switch (name) {
            case "nickName":
                actions.changeNickName(value);
                break;
            case "phone":
                actions.changePhoneNumber(value);
                break;
            case "description":
                actions.changeUserShortDescription(value);
                break;
            case "bankName":
                actions.changeUserBankName(value);
                break;
            case "accountNumber":
                actions.changeUserAccountNumber(value);
                break;
            case "corporationName":
                actions.changeCorporationName(value);
                break;
            case "representativeName":
                actions.changeCorporationName(value);
                break;
            case "accountHolder": 
                actions.changeUserAccountHolder(value);
                break;
            default:
                break;
        }
    };

    const handleSaveProfile = async () => {
        try {
            let uploadedImgUrl = state.profileImg; // 기존 이미지 URL 기본값
    
            // 새 이미지를 업로드한 경우 업로드 실행
            if (newProfileImage) {
                const formData = new FormData();
                formData.append("file", newProfileImage);
    
                const response = await uploadImg(formData); // 이미지 업로드
                if (response.status === 200) {
                    uploadedImgUrl = response.data; // 업로드된 이미지 URL 설정
                } else {
                    alert("이미지 업로드 실패");
                    return;
                }
            }
    
            // 업데이트 데이터 준비
            const updatedProfile = {
                userNum: state.userNum,
                email: state.email,
                password: state.password,
                name: state.name,
                nickName: state.nickName,
                phoneNumber: state.phoneNumber,
                profileImg: uploadedImgUrl, // 업로드된 이미지 URL 저장
                shortDescription: state.shortDescription,
                activatedStatus: state.activatedStatus,
                bankName: state.bankName,
                accountNumber: state.accountNumber,
                accountHolder: state.accountHolder,
                corporationName: state.corporationName,
                corporationTel: state.corporationTel,
                BSN: state.BSN,
            };
    
            // 프로필 업데이트 API 호출
            const updateResponse = await updateUserProfile(userNum, updatedProfile);
    
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

    const handlePasswordCheck = () => {
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
    
        // 미리보기 생성
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result); // 미리보기용 이미지 업데이트
            setNewProfileImage(file); // 파일 저장
        };
        reader.readAsDataURL(file);
    };

    const handlePasswordSave = (newPassword) => {
        console.log("새 비밀번호 저장:", newPassword);
        // 비밀번호 저장 처리 로직 추가
        actions.changePassword(newPassword);
    };

    return (
        <div className="profile-edit-container">
            <TitleBox text="회원정보" />
            <div className="profile-edit-grid-box">
                <div className="profile-image-container">
                    <ProfileImage
                        size="200px"
                        initialImageSrc={state.profileImg}
                    />
                    {/* 숨겨진 파일 업로드 */}
                    <input
                        id="upload-profile-image"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />

                    {/* WhiteBtn 클릭 시 파일 선택 창 열기 */}
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
                            <option value="국민">국민</option>
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
                        <label>사업자 등록번호</label>
                        <Input
                            type="text"
                            value={state.BSN}
                            name="BSN"
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* 비밀번호 확인 버튼 */}
                    <div className="flex-row">
                        <label>비밀번호 확인</label>
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
                </div>
                <div className="button-box">
                    <Btn
                        text="저장"
                        height="40px"
                        fontSize="1rem"
                        padding="5px 15px"
                        width="150px"
                        onClick={handleSaveProfile}
                    />
                    <WhiteBtn
                        text="취소"
                        height="40px"
                        fontSize="1rem"
                        padding="5px 15px"
                        width="150px"
                        onClick={handleCancel}
                    />
                </div>
            </div>
            {showModal && (
                <PasswordPopup
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handlePasswordSave}
                />
            )}
        </div>
    );
};

export default ProfileEdit;
