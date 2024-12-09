import {
    CHANGE_USER_NUM,
    CHANGE_EMAIL,
    CHANGE_PASSWORD,
    CHANGE_NAME,
    CHANGE_NICKNAME,
    CHANGE_PHONE_NUMBER,
    CHANGE_PROFILE_IMG,
    CHANGE_USER_SHORT_DESCRIPTION,
    CHANGE_USER_ACTIVATED_STATUS,
    CHANGE_USER_BANK_NAME,
    CHANGE_USER_ACCOUNT_NUMBER,
    CHANGE_USER_ACCOUNT_HOLDER,
    CHANGE_USER_JOIN_DATE,
    CHANGE_CORPORATION_NAME,
    CHANGE_CORPORATION_TEL,
    UPDATE_ALL_FIELDS,
    CHANGE_BSN,
    RESET_STATE
} from './action.js';

// 초기 상태 정의
const initialState = {
    userNum: null,
    email: '',
    password: '',
    name: '',
    nickname: '',
    phoneNumber: '',
    profileImg: '',
    userShortDescription: '',
    activatedStatus: false,
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    joinDate: '',
    corporationName: '',
    corporationTel: '',
    bsn: ''
};

// 리듀서 함수
const reducer = (state = initialState, action) => {
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

        case CHANGE_PHONE_NUMBER:
            return { ...state, phoneNumber: action.payload };

        case CHANGE_PROFILE_IMG:
            return { ...state, profileImg: action.payload };

        case CHANGE_USER_SHORT_DESCRIPTION:
            return { ...state, userShortDescription: action.payload };

        case CHANGE_USER_ACTIVATED_STATUS:
            return { ...state, activatedStatus: action.payload };

        case CHANGE_USER_BANK_NAME:
            return { ...state, bankName: action.payload };

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

        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };

        case RESET_STATE:
            return { ...initialState };

        default:
            return state;
    }
};

export default reducer;