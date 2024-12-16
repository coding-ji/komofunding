import {
    CHANGE_USER_NUM,
    CHANGE_EMAIL,
    CHANGE_PASSWORD_SUCCESS,
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
    LOGIN_SUCCESS,
    LOGOUT_USER,
    SEND_REGISTER_EMAIL_SUCCESS,
    SEND_EMAIL_VERIFICATION_SUCCESS,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
    FIND_EMAIL_SUCCESS,
    RESET_PASSWORD_REQUEST_SUCCESS,
    UPDATE_USER_PROFILE,
    // CHANGE_PASSWORD_SUCCESS,
    // UPLOAD_PROFILE_IMAGE_SUCCESS,
    VERIFY_PASSWORD

} from './action.js';

// 초기 상태 정의
export const initialState = {
    //    userNum: null,
    //    email: '',
    //    password: '',
    //    name: '',
    //    nickName: '',
    //    phoneNumber: '',
    //    profileImage: '',
    //    userShortDescription: '',
    //    activatedStatus: false,
    //    bankName: '',
    //    accountNumber: '',
    //    accountHolder: '',
    //    joinDate: '',
    //    corporationName: '',
    //    corporationTel: '',
    //    BSN: '',
};

// 동적 상태 업데이트 함수
export const updateStateField = (state, field, value) => ({
    ...state,
    [field]: value,
});

// 리듀서 함수
export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_USER_NUM:
            return updateStateField(state, 'userNum', action.payload);

        case CHANGE_EMAIL:
            return updateStateField(state, 'email', action.payload);

        // case UPDATE_USER_PASSWORD:
        //     return updateStateField(state, 'password', action.payload);

        case CHANGE_NAME:
            return updateStateField(state, 'name', action.payload);

        case CHANGE_NICKNAME:
            return updateStateField(state, 'nickName', action.payload);

        case CHANGE_PHONE_NUMBER:
            return updateStateField(state, 'phoneNumber', action.payload);

        case CHANGE_PROFILE_IMG:
            return updateStateField(state, 'profileImage', action.payload);

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
            return updateStateField(state, 'BSN', action.payload);

        case UPDATE_ALL_FIELDS:
            return action.payload;

        case RESET_STATE:
            return { ...initialState };

        case READ_USER:
            return { ...state, user: action.payload };

        case CREATE_USER:
            return { ...state, user: action.payload };

        case UPDATE_USER:
            return { ...state, user: action.payload };

        case DELETE_USER:
            return { ...state, user: action.payload };

        // case USER_REQUEST_START:
        //     return { ...state, isLoading: true, error: null };

        // case USER_REQUEST_FAIL:
        //     return { ...state, isLoading: false, error: action.payload };

        case VERIFY_PASSWORD:
            return { ...state, message: action.payload };

        case UPDATE_USER_PROFILE:
            return { ...state, message: action.payload };

        // case APPLY_CREATOR_SWITCH:
        //     return {...state, message: action.payload};

        case LOGIN_SUCCESS:
            return { ...state, message: action.payload };

        case SEND_REGISTER_EMAIL_SUCCESS:
            return { ...state, message: action.payload };

        case SEND_EMAIL_VERIFICATION_SUCCESS:
            return { ...state, message: action.payload };

        case VERIFY_EMAIL_SUCCESS:
            return { ...state, successMessage: action.payload, errorMessage: null };

        case VERIFY_EMAIL_FAILURE:
            return { ...state, successMessage: null, errorMessage: action.payload };

        case LOGIN_SUCCESS:
            return { ...state, message: action.payload };

        case LOGOUT_USER:
            return { ...state, message: action.payload };

        case FIND_EMAIL_SUCCESS:
            return { ...state, message: action.payload };

        case RESET_PASSWORD_REQUEST_SUCCESS:
            return { ...state, message: action.payload };


        case CHANGE_PASSWORD_SUCCESS:
            return { ...state, message: action.payload };

        case RESET_STATE:
            return initialState;


        // case UPDATE_USER_PASSWORD:
        //     // 비밀번호 업데이트 중 로직 처리 (예: 로딩 상태 변경)
        //     return { ...state, isLoading: true };

        // case UPDATE_USER_PASSWORD_SUCCESS:
        //     // 비밀번호 업데이트 성공 후 상태 변경
        //     return { ...state, isLoading: false, passwordUpdated: true };  // 필요한 상태 추가


        default:
            return state;
    }
};