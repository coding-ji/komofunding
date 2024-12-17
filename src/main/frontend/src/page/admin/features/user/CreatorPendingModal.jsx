import React from "react";
import "./CreatorPendingModal.css";
import { AdminBtn1, AdminBtn2, Btn, WhiteBtn } from "../../../../components/MyBtn";
import { formattedDate } from "../../../../utils/formattedData";


const CreatorPendingModal = ({ userData, onClose, onApprove, onReject }) => {
    return (
        <div className="popup-overlay-comp">
            <div className="popup-content-comp">
                {/* 상단 검은색 헤더 */}
                <div className="popup-header-comp"></div>

                <h2 className="popup-title">회원 정보</h2>

                {/* 신청자 정보 */}
                <div className="input-container">
                    <label className="input-label">회원번호</label>
                    <input className="input-field" value={userData?.userCode} disabled />
                </div>

                <div className="input-container">
                    <label className="input-label">이메일</label>
                    <input className="input-field" value={userData?.email} disabled />
                </div>

                <div className="input-container">
                    <label className="input-label">이름</label>
                    <input className="input-field" value={userData?.name} disabled />
                </div>

                <div className="input-container">
                    <label className="input-label">닉네임</label>
                    <input className="input-field" value={userData?.nickName} disabled />
                </div>

                <div className="input-container">
                    <label className="input-label">휴대폰</label>
                    <input className="input-field" value={userData?.phoneNumber} disabled />
                </div>

                <div className="input-container">
                    <label className="input-label">가입날짜</label>
                    <input className="input-field" value={formattedDate(userData?.joinDate)} disabled />
                </div>

                {/* 신청 이미지 */}
                <div className="image-section">
                    <label className="input-label">신청 이미지</label>
                    <div className="image-placeholder">이미지 미리보기</div>
                </div>

                {/* 버튼 영역 */}
                <div className="button-container">
                    <div className="button-center">
                        <AdminBtn1 onClick={onApprove} text="승인" width="70px" height="25px" 
                        fontSize="1rem" padding="5px" margin="3px" />
                        <AdminBtn2 onClick={onReject} text="거절" width="70px" height="25px" 
                        fontSize="1rem" padding="5px" margin="3px" />
                    </div>
              
                <div className="button-footer">
                    <></>
                    <AdminBtn2 onClick={onClose} text="목록" width="70px" height="25px" fontSize="1rem" padding="5px" />
                </div>
                </div>

            </div>

        </div>



    );
};

export default CreatorPendingModal;
