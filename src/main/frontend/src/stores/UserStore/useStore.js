import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
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
    addItem, updateItemAction, deleteItemAction
} from "./action";

export const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        //유저번호 변경
        changeUserNum: (userNum) => dispatch(changeUserNum(userNum)),
        //유저이메일 변경 
        changeEmail: (email) => dispatch(changeEmail(email)),
        //유저패스워드 변경 
        changePassword: (password) => dispatch(changePassword(password)),
        //유저이름 변경
        changeName: (name) => dispatch(changeName(name)),
        //유저별명 변경
        changeNickName: (nickName) => dispatch(changeNickName(nickName)),
        //유저 핸드폰 변경
        changePhoneNumber: (phoneNumber) => dispatch(changePhoneNumber(phoneNumber)),
        //유저 프로필사진 변경
        changeProfileImg: (profileImg) => dispatch(changeProfileImg(profileImg)),
        //유저 짧은 소개글 변경
        changeUserShortDescriptionDescription: (shortDescription) => dispatch(changeUserShortDescription(shortDescription)),
        //유저 활동 상태 변경
        changeUserActivatedStatus: (activatedStatus) => dispatch(changeUserActivatedStatus(activatedStatus)),
        //유저 은행명 변경
        changeUserBankName: (bankName) => dispatch(changeUserBankName(bankName)),
        //유저 계좌번호 변경
        changeUserAccountNumber: (accountNumber) => dispatch(changeUserAccountNumber(accountNumber)),
        //유저 계좌 예금주 변경 
        changeUserAccountHolder: (accountHolder) => dispatch(changeUserAccountHolder(accountHolder)),
        //유저 가입일 변경
        changeUserJoinDate: (joinDate) => dispatch(changeUserJoinDate(joinDate)),
        //유저 회사명 변경
        changeCorporationName: (corporationName) => dispatch(changeCorporationName(corporationName)),
        //유저 회사 번호 변경
        changeCorporationTel: (corporationTel) => dispatch(changeCorporationTel(corporationTel)),
        //유저 사업자등록번호 변경
        changeBSN: (BSN) => dispatch(changeBSN(BSN)),
        //전체 변경
        updateAllFields: (fields) => dispatch(updateAllFields(fields)),
        // 상태값초기화
        resetState: () => dispatch(resetState()),
        addItem: (item) => addItem(item)(dispatch),
        updateItem: (item) => updateItemAction(item)(dispatch),
        deleteItem: (id) => deleteItemAction(id)(dispatch)
    };

    return { state, actions };
};
