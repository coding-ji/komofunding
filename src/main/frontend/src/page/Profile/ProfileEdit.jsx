import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileEdit.css"; // CSS 파일 import
import { Btn, WhiteBtn } from "../../components/MyBtn";
import "../../index.css";
import TitleBox from "../../components/TitleBox";
import { useStore } from '../../stores/UserStore/useStore'
import ProfileImage from "../../components/ProfilePicture/ProfileImage";


const ProfileEdit = () => {
    const { userNum } = useParams(); // URL 파라미터에서 userNum 추출
    const { state, actions } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/data/userData.json");
                const datas = response.data;
                const userData = datas.find(data => data.userNum === userNum);
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
                profileImg: state.profileImg,
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

            await axios.put(`/api/users/${userNum}`, updatedProfile);
            alert("프로필이 저장되었습니다.");
            navigate(`/profile/${userNum}`);
        } catch (error) {
            console.error("프로필 저장 중 오류 발생:", error);
            alert("프로필 저장 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const handleCancel = () => {
        navigate(`/profile/${userNum}`);
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
                    <WhiteBtn
                        text="이미지 업로드"
                        height="30px"
                        fontSize="0.8rem"
                        padding="5px 15px"
                        width="200px"
                    />
                </div>

                <div className="profile-edit-form">
                    <label>이름</label>
                    <p>{state.name}</p>

                    <label>닉네임</label>
                    <input
                        type="text"
                        value={state.nickname}
                        name="nickname"
                        onChange={handleInputChange}
                    />

                    <label>이메일</label>
                    <p>{state.email}</p>

                    <label>회원번호</label>
                    <p>{state.userNum}</p>

                    <label>한줄 소개</label>
                    <textarea
                        name="description"
                        rows="4"
                        cols="50"
                        value={state.description}
                        onChange={handleInputChange}
                    />

                    <label>휴대폰 번호</label>
                    <input
                        type="text"
                        value={state.phone}
                        name="phone"
                        onChange={handleInputChange}
                    />

                    <div className="account-info-container">
                        <label>계좌 정보</label>
                        <div className="account-info">
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
                            <input
                                type="text"
                                value={state.accountNumber}
                                name="accountNumber"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <TitleBox text="사업자 정보" />
            <div className="profile-edit-grid-box">
                <label>법인/상호명</label>
                <input
                    type="text"
                    value={state.businessName}
                    name="businessName"
                    onChange={handleInputChange}
                />

                <label>대표자명</label>
                <input
                    type="text"
                    value={state.representativeName}
                    name="representativeName"
                    onChange={handleInputChange}
                />

                <label>사업자 번호</label>
                <input
                    type="text"
                    value={state.businessNumber}
                    name="businessNumber"
                    onChange={handleInputChange}
                />

                <div className="button-group">
                    <Btn text="확인" onClick={handleSaveProfile} />
                    <Btn text="취소" onClick={handleCancel} />
                </div>
            </div>
        </div>
    );
};

export default ProfileEdit;
