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
    CHANGE_BSN,
    RESET_STATE,
    UPDATE_ALL_FIELDS,
    ADD_ITEM, UPDATE_ITEM, DELETE_ITEM
} from "./action";

export const initialState = {
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
            return { ...state, nickName: action.payload };
        case CHANGE_PHONE_NUMBER:
            return { ...state, phoneNumber: action.payload };
        case CHANGE_PROFILE_IMG:
            return { ...state, profileImg: action.payload };
        case CHANGE_USER_SHORT_DESCRIPTION:
            return { ...state, shortDescription: action.payload };
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
            return initialState;
        case ADD_ITEM:
            return { ...state, items: [...state.items, action.payload] };
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                )
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        default:
            state;
    }
}



