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
    RESET_STATE,
    READ_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
    APPLY_CREATOR_SWITCH,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    SEND_REGISTER_EMAIL_SUCCESS,
    SEND_EMAIL_VERIFICATION_SUCCESS,
    VERIFY_EMAIL_SUCCESS,
    FIND_EMAIL_SUCCESS,
    RESET_PASSWORD_REQUEST_SUCCESS,
    CHANGE_PASSWORD_SUCCESS,
    UPLOAD_PROFILE_IMAGE_SUCCESS,
    VERIFY_PASSWORD

} from './action.js';

// 초기 상태 정의
export const initialState = {
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
    bsn: '',
};

// 동적 상태 업데이트 함수
export const updateStateField = (state, field, value) => ({
    ...state,
    [field]: value,
});

// 리듀서 함수
export const reducer = (state , action) => {
    switch (action.type) {
        case CHANGE_USER_NUM:
            return updateStateField(state, 'userNum', action.payload);

        case CHANGE_EMAIL:
            return updateStateField(state, 'email', action.payload);

        case CHANGE_PASSWORD:
            return updateStateField(state, 'password', action.payload);

        case CHANGE_NAME:
            return updateStateField(state, 'name', action.payload );

        case CHANGE_NICKNAME:
            return updateStateField(state, 'nickname', action.payload);

        case CHANGE_PHONE_NUMBER:
            return updateStateField(state, 'phoneNumber', action.payload);

        case CHANGE_PROFILE_IMG:
            return updateStateField(state, 'profileImg', action.payload);

        case CHANGE_USER_SHORT_DESCRIPTION:
            return updateStateField(state, 'userShortDescription', action.payload);

        case CHANGE_USER_ACTIVATED_STATUS:
            return updateStateField(state, 'activatedStatus', action.payload);

        case CHANGE_USER_BANK_NAME:
            return updateStateField(state, 'bankName', action.payload);

        case CHANGE_USER_ACCOUNT_NUMBER:
            return updateStateField(state, 'accountNumber', action.payload);

        case CHANGE_USER_ACCOUNT_HOLDER:
            return updateStateField(state, 'accountHolder', action.payload);

        case CHANGE_USER_JOIN_DATE:
            return updateStateField(state, 'joinDate', action.payload);

        case CHANGE_CORPORATION_NAME:
            return updateStateField(state, 'corporationName', action.payload);

        case CHANGE_CORPORATION_TEL:
            return updateStateField(state, 'corporationTel', action.payload);

        case CHANGE_BSN:
            return updateStateField(state, 'bsn', action.payload);

        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };

        case RESET_STATE:
            return { ...initialState };

        case READ_USER:
            return { ...state, user: action.payload};

        case CREATE_USER:
            return { ...state, user: action.payload};

        case UPDATE_USER:
            return {...state, user: action.payload };

        case DELETE_USER:
            return { ...state, user: action.payload };

        case USER_REQUEST_START:
            return { ...state, isLoading: true, error: null };

        case USER_REQUEST_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        case SET_ALL_FIELDS:
            return { ...state, ...action.payload};

        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
};