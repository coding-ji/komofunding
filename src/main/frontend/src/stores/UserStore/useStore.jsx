import { useReducer } from "react";
import { reducer, initialState } from "./reducer";
import {
    changeUserNum,
    changeEmail,
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
    // applyCreatorSwitch,
    register,
    sendEmailForRegister,
    sendEmailVerificationCode,
    verifyEmail,
    login,
    logoutUser,
    removeUser,
    findEmail,
    resetUserPassword,
    updateUserPassword,
    // uploadProfileImage,
    apiVerifyPassword,
    checkNick
} from "./action"; // 액션들은 action.js 파일에서 import 합니다.

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        // 액션 예시: 예를 들어, 상태를 업데이트하는 로직을 여기에 정의
        // 각 액션이 호출될 때 해당 액션에 맞는 로직이 실행됨
        changeUserNum: (userNum) => dispatch(changeUserNum(userNum)),
        changeEmail: (email) => dispatch(changeEmail(email)),
        changeUserPassword: (password) => dispatch(changeUserPassword(password)),
        changeName: (name) => dispatch(changeName(name)),
        changeNickname: (nickName) => dispatch(changeNickName(nickName)),
        changePhoneNumber: (phoneNumber) => dispatch(changePhoneNumber(phoneNumber)),
        changeProfileImg: (profileImage) => dispatch(changeProfileImg(profileImage)),
        changeUserShortDescription: (userShortDescription) => dispatch(changeUserShortDescription(userShortDescription)),
        changeUserActivatedStatus: (activatedStatus) => dispatch(changeUserActivatedStatus(activatedStatus)),
        changeUserBankName: (bankName) => dispatch(changeUserBankName(bankName)),
        changeUserAccountNumber: (accountNumber) => dispatch(changeUserAccountNumber(accountNumber)),
        changeUserAccountHolder: (accountHolder) => dispatch(changeUserAccountHolder(accountHolder)),
        changeUserJoinDate: (joinDate) => dispatch(changeUserJoinDate(joinDate)),
        changeCorporationName: (corporationName) => dispatch(changeCorporationName(corporationName)),
        changeCorporationTel: (corporationTel) => dispatch(changeCorporationTel(corporationTel)),
        changeBSN: (BSN) => dispatch(changeBSN(BSN)),

        // 모든 필드를 한 번에 업데이트하는 액션
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),

        // 상태 초기화
        resetState: () => dispatch(resetState()),

        fetchMyPageInfo: () => fetchMyPageInfo()(dispatch),
        fetchUserProfile: (userNum) => fetchUserProfile(userNum)(dispatch),
        updateProfile:(userNum, request) => updateProfile(userNum, request)(dispatch),
        register:(userInDTO) => register(userInDTO)(dispatch),
        sendEmailForRegister: (email) => sendEmailForRegister(email)(dispatch),
        sendEmailVerificationCode: (email) => sendEmailVerificationCode(email)(dispatch),
        verifyEmail: (email, code) => verifyEmail(email, code)(dispatch),
        login: (email, password) => login(email, password)(dispatch),
        logoutUser: () => logoutUser()(dispatch),
        removeUser: (userNum) => removeUser(userNum)(dispatch),
        findEmail: (name, phoneNumber) => findEmail(name, phoneNumber)(dispatch),
        resetUserPassword: (email) => resetUserPassword(email)(dispatch),
        updateUserPassword: (request) => updateUserPassword(request)(dispatch),
//      uploadProfileImage: (file) => uploadProfileImage(file)(dispatch),
        apiVerifyPassword: (userNum, password) => apiVerifyPassword(userNum, password)(dispatch),
        checkNick: (nickName) => checkNick(nickName)(dispatch)
     };
    return { state, actions };
        // state 상태 객체
        // dispatch 상태를 업데이트할 수 있는 dispatch 함수
        // actions 상태를 업데이트하는 액션들
};