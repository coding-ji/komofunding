import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import {
    changeUserNum,
    changeEmail,
    changePassword,
    changeName,
    changeNickName,
    changePhoneNumber,
    changeProfileImg,
    changeUserShortDescription,
    changeUserActivatedStatus,
    changeUserBankName,
    changeUserAccountNumber,
    changeUserAccountHolder,
    changeUserJoinDate,
    changeCorporationName,
    changeCorporationTel,
    changeBSN,
    updateAllFields,
    resetState,
    fetchMyPageInfo,
    fetchUserProfile,
    updateProfile,
    applyCreatorSwitch,
    register,
    sendEmailForRegister,
    sendEmailVerificationCode,
    verifyEmail,
    login,
    logoutUser,
    removeUser,
    findEmail,
    resetUserPassword,
    changeUserPassword,
    uploadProfileImage
} from "./action"; // 액션들은 action.js 파일에서 import 합니다.

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 유저 정보 관련 액션들
        changeUserNum: (userNum) => dispatch(changeUserNum(userNum)),
        changeEmail: (email) => dispatch(changeEmail(email)),
        changeUserPassword: (password) => dispatch(changeUserPassword(password)),
        changeName: (name) => dispatch(changeName(name)),
        changeNickname: (nickname) => dispatch(changeNickname(nickname)),
        changePhoneNumber: (phoneNumber) => dispatch(changePhoneNumber(phoneNumber)),
        changeProfileImg: (profileImg) => dispatch(changeProfileImg(profileImg)),
        changeUserShortDescription: (userShortDescription) => dispatch(changeUserShortDescription(userShortDescription)),
        changeUserActivatedStatus: (activatedStatus) => dispatch(changeUserActivatedStatus(activatedStatus)),
        changeUserBankName: (bankName) => dispatch(changeUserBankName(bankName)),
        changeUserAccountNumber: (accountNumber) => dispatch(changeUserAccountNumber(accountNumber)),
        changeUserAccountHolder: (accountHolder) => dispatch(changeUserAccountHolder(accountHolder)),
        changeUserJoinDate: (joinDate) => dispatch(changeUserJoinDate(joinDate)),
        changeCorporationName: (corporationName) => dispatch(changeCorporationName(corporationName)),
        changeCorporationTel: (corporationTel) => dispatch(changeCorporationTel(corporationTel)),
        changeBsn: (bsn) => dispatch(changeBsn(bsn)),

        // 모든 필드를 한 번에 업데이트하는 액션
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),

        // 상태 초기화
        resetState: () => dispatch(resetState()),

        fetchMyPageInfo: () => fetchMyPageInfo()(dispatch),
        fetchUserProfile: (userNum) => fetchUserProfile(userNum)(dispatch),
        updateProfile:(userNum, profileData) => updateProfile(userNum, profileData)(dispatch),
        applyCreatorSwitch: (email, requestDTO) => applyCreatorSwitch(email, requestDTO)(dispatch),
        register:(userInDTO) => register(userInDTO)(dispatch),
        sendEmailForRegister: (email) => sendEmailForRegister(email)(dispatch),
        sendEmailVerificationCode: (email) => sendEmailVerificationCode(email)(dispatch),
        verifyEmail: (email, code) => verifyEmail(email, code)(dispatch),
        login: (email, password) => login(email, password)(dispatch),
        logoutUser: () => logoutUser()(dispatch),
        removeUser: (userNum) => removeUser(userNum)(dispatch),
        findEmail: (name, phoneNumber) => findEmail(name, phoneNumber)(dispatch),
        resetUserPassword: (email) => resetUserPassword(email)(dispatch),
        changePassword: (email, newPassword) => changePassword(email, newPassword)(dispatch),
        uploadProfileImage: (file) => uploadProfileImage(file)(dispatch),
     };
    return { state, actions };
};