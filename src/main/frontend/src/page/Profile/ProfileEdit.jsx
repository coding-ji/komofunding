import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileEdit.css"; // CSS 파일 import
import { Btn, WhiteBtn } from "../../components/MyBtn";
import "../../index.css";
import TitleBox from "../../components/TitleBox";
import { useStore } from '../../stores/UserStore/useStore'
import ProfileImage from "../../components/ProfilePicture/ProfileImage";
import defaultImage from '../../components/ProfilePicture/defaultImage.png'
import Input from "../../components/input";


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
    const [previewImage, setPreviewImage] = useState(state.profileImg); // 미리보기 이미지

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/data/userData.json");
                const datas = response.data;
                const userData = datas.find((data) => data.userNum === userNum);
                if (userData) {
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
                    setPreviewImage(userData.profileImg || defaultImage); 
                    console.log(userData); // 데이터를 확인
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
            case "nickname":
                actions.changeNickname(value);
                break;
            case "phone":
                actions.changePhone(value);
                break;
            case "description":
                actions.changeUserDescription(value);
                break;
            case "birthdate":
                actions.changeUserJoinDate(value);
                break;
            case "bankName":
                actions.changeUserBankName(value);
                break;
            case "accountNumber":
                actions.changeUserAccountNumber(value);
                break;
            case "businessName":
                actions.changeCorporationName(value);
                break;
            case "representativeName":
                actions.changeCorporationName(value); // 수정: 적절한 action 사용
                break;
            default:
                break;
        }
    };

    const handleSaveProfile = async () => {
        try {
            const updatedProfile = {
                userNum: state.userNum,
                email: state.email,
                password: state.password,
                name: state.name,
                nickname: state.nickname,
                phone: state.phone,
                profileImg: previewImage, // 변경된 이미지 또는 기존 이미지
                description: state.description,
                activatedStatus: state.activatedStatus,
                bankName: state.bankName,
                accountNumber: state.accountNumber,
                accountHolder: state.accountHolder,
                joinDate: state.joinDate,
                corporationName: state.corporationName,
                corporationTel: state.corporationTel,
                bsn: state.bsn,
            };
    
            const response = await axios.put(`/api/users/${userNum}`, updatedProfile, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 200) {
                alert("프로필이 성공적으로 저장되었습니다.");
                navigate(`/profile/${userNum}`);
            }
        } catch (error) {
            console.error("프로필 저장 중 오류 발생:", error);
            alert("프로필 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const handleCancel = () => {
        navigate(`/profile/${userNum}`);
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

    const handleNewPasswordSave = () => {
        if (!newPassword) {
            alert("새로운 비밀번호를 입력해주세요.");
            return;
        }
        // 더미 데이터에서 상태 업데이트
        actions.changePassword(newPassword);
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setShowModal(false); // 모달 닫기
        setNewPassword(""); // 입력 필드 초기화
        setCurrentPassword(""); // 현재 비밀번호 초기화
        setCurrentPasswordCheck(""); // 재확인 비밀번호 초기화
    };



    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return; // 선택된 파일이 없을 경우 처리하지 않음
    
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result); // 미리보기 이미지 업데이트
            setNewProfileImage(file); // 파일 저장
        };
        reader.readAsDataURL(file);
    };



    return (
        <div className="profile-edit-container">
            <TitleBox text="회원정보" />
            <div className="profile-edit-grid-box">
                <div className="profile-image-container">
                    <ProfileImage
                        size="200px"
                        initialImageSrc={previewImage} // previewImage로 설정
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
                            value={state.nickname}
                            name="nickname"
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
                            value={state.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-row">
                        <label>휴대폰 번호</label>
                        <Input
                            type="text"
                            value={state.phone}
                            name="phone"
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
                        />
                    </div>

                    {/* 비밀번호 변경 섹션 */}
                    <div className="password-change-container">
                        <div className="flex-row">
                            <label>현재 비밀번호</label>
                            <Input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="현재 비밀번호"
                            />

                            <Input
                                type="password"
                                value={currentPasswordCheck}
                                onChange={(e) => setCurrentPasswordCheck(e.target.value)}
                                placeholder="비밀번호 재확인"
                            />

                            <button className="passwordBtn" onClick={handlePasswordCheck}>
                                비밀번호 수정
                            </button>
                        </div>

                        {showModal && (
                            <div className="password-modal">
                                <div className="modal-content">
                                    <h3>새로운 비밀번호 설정</h3>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="새로운 비밀번호를 입력하세요"
                                    />
                                    <button className="btn" onClick={handleNewPasswordSave}>
                                        비밀번호 저장
                                    </button>
                                    <button className="btn cancel" onClick={() => setShowModal(false)}>
                                        취소
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <TitleBox text="사업자 정보" />

            <div className="profile-edit-grid-box">
                <div className="profile-edit-form">
                    <div className="flex-row">
                        <label>법인/상호명</label>
                        <Input
                            type="text"
                            value={state.businessName}
                            name="businessName"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-row">
                        <label>대표자명</label>
                        <Input
                            type="text"
                            value={state.representativeName}
                            name="representativeName"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex-row">
                        <label>사업자 번호</label>
                        <Input
                            type="text"
                            value={state.businessNumber}
                            name="businessNumber"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="button-group">
                        <Btn text="확인" onClick={handleSaveProfile} 
                            width="150px" height="50px" padding ="0.5rem 2rem" fontSize="1rem"
                        />
                        <WhiteBtn text="취소" onClick={handleCancel}
                        width="150px" height="50px" padding ="0.5rem 2rem" fontSize="1rem"
                        />
                    </div>
                </div>
            </div>
        </div>

    );

}

export default ProfileEdit;



// 백 연결 시 비밀번호 확인
/*   try {
       const response = await axios.post(`/api/users/${userNum}/check-password`, {
           password: currentPassword,
       });

       if (response.data.success) {
           alert("비밀번호 확인 성공");
           setIsPasswordCorrect(true);
           setShowModal(true); // 모달 열기
       } else {
           alert("현재 비밀번호가 올바르지 않습니다.");
       }
   } catch (error) {
       console.error("비밀번호 확인 중 오류 발생:", error);
       alert("비밀번호 확인 중 문제가 발생했습니다.");
   }
}; */

// const handleNewPasswordSave = async () => {
//     if (!newPassword) {
//         alert("새로운 비밀번호를 입력해주세요.");
//         return;
//     }

//     try {
//         const response = await axios.post(`/api/users/${userNum}/change-password`, {
//             newPassword,
//         });

//         if (response.data.success) {
//             alert("비밀번호가 성공적으로 변경되었습니다.");
//             setShowModal(false); // 모달 닫기
//             setNewPassword(""); // 입력 필드 초기화
//             setCurrentPassword(""); // 현재 비밀번호 초기화
//             setCurrentPasswordCheck(""); // 재확인 비밀번호 초기화
//         }
//     } catch (error) {
//         console.error("비밀번호 변경 중 오류 발생:", error);
//         alert("비밀번호 변경에 실패했습니다.");
//     }
// };