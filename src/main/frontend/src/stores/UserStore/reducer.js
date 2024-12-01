import {
    CHANGE_USER_NUM,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_NAME,
    CHANGE_NICKNAME,
    CHANGE_PHONE,
    CHANGE_PROFILE_IMG,
    CHANGE_USER_DESCRIPTION,
    CHANGE_USER_ACTIVATED_STATUS,
    CHANGE_USER_BANKNAME,
    CHANGE_USER_ACCOUNT_NUMBER,
    CHANGE_USER_ACCOUNT_HOLDER,
    CHANGE_USER_JOIN_DATE,
    CHANGE_CORPORATION_NAME,
    CHANGE_CORPORATION_TEL,
    CHANGE_BSN,
    RESET_STATE
} from "./action";

export const initialState = {
    userNum: "",
    email: "",
    password: "",
    name: "",
    nickname: "",
    phone: "",
    profileImg: "",
    description: "",
    activatedStatus: "",
    bankname: "",
    accountNumber: "",
    accountHolder: "",
    joinDate: "",
    corporationName: "",
    corporationTeal: "",
    bsn: ""
}

export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_USER_NUM:
            return { ...state, userNum: action.payload };
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case CHANGE_NAME:
            return { ...state, name: action.payload };
        case CHANGE_NICKNAME:
            return { ...state, nickname: action.payload };
        case CHANGE_PHONE:
            return { ...state, phone: action.payload };
        case CHANGE_PROFILE_IMG:
            return { ...state, profileImg: action.payload };
        case CHANGE_USER_DESCRIPTION:
            return { ...state, description: action.payload };
        case CHANGE_USER_ACTIVATED_STATUS:
            return { ...state, activatedStatus: action.payload };
        case CHANGE_USER_BANKNAME:
            return { ...state, bankname: action.payload };
        case CHANGE_USER_ACCOUNT_NUMBER:
            return { ...state, accountNumber: action.payload };
        case CHANGE_USER_ACCOUNT_HOLDER:
            return { ...state, accountHolder: action.payload };
        case CHANGE_USER_JOIN_DATE:
            return { ...state, joinDate: action.payload };
        case CHANGE_CORPORATION_NAME:
            return { ...state, corporationName: action.payload };
        case CHANGE_CORPORATION_TEL:
            return { ...state, corporationTel: action.payload };
        case CHANGE_BSN:
            return { ...state, bsn: action.payload };
        case RESET_STATE:
            return initialState;
        default:
            state;
    }
}