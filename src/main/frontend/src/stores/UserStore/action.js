
import {
    getMyPageInfo,
    getUserProfile,
    updateUserProfile,
    registerUser,
    sendRegisterEmailCode,
    verifyEmailCode,
    loginUser,
    logout,
    // getUserInfo,
    deleteUser,
    findUserId,
    resetPassword,
    changePassword,
    verifyPassword,
    checkNickName,
    sendEmailCode,
    findUserPassword,
    getTemporalPw
    // uploadImg
} from '../../service/apiService';

export const CHANGE_USER_NUM = "CHANGE_USER_NUM";
export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_NAME = "CHANGE_NAME";
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD";
export const CHANGE_NICKNAME = "CHANGE_NICKNAME";
export const CHANGE_PHONE_NUMBER = "CHANGE_PHONE_NUMBER";
export const CHANGE_PROFILE_IMG = "CHANGE_PROFILE_IMG";
export const CHANGE_USER_SHORT_DESCRIPTION = "CHANGE_USER_SHORT_DESCRIPTION";
export const CHANGE_USER_ACTIVATED_STATUS = "CHANGE_USER_ACTIVATED_STATUS";
export const CHANGE_USER_BANK_NAME = "CHANGE_USER_BANK_NAME";
export const CHANGE_USER_ACCOUNT_NUMBER = "CHANGE_USER_ACCOUNT_NUMBER";
export const CHANGE_USER_ACCOUNT_HOLDER = "CHANGE_USER_ACCOUNT_HOLDER";
export const CHANGE_USER_JOIN_DATE = "CHANGE_USER_JOIN_DATE";
export const CHANGE_CORPORATION_NAME = "CHANGE_CORPORATION_NAME";
export const CHANGE_CORPORATION_TEL = "CHANGE_CORPORATION_TEL";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const CHANGE_BSN = "CHANGE_BSN";
export const RESET_STATE = "RESET_STATE";


export const changeUserNum = (userNum) => ({ type: CHANGE_USER_NUM, payload: userNum });
export const changeEmail = (email) => ({ type: CHANGE_EMAIL, payload: email });
export const changeName = (name) => ({ type: CHANGE_NAME, payload: name });
export const changeNickName = (nickName) => ({ type: CHANGE_NICKNAME, payload: nickName });
export const changePhoneNumber = (phoneNumber) => ({ type: CHANGE_PHONE_NUMBER, payload: phoneNumber });
export const changeProfileImg = (profileImg) => ({ type: CHANGE_PROFILE_IMG, payload: profileImg });
export const changeUserShortDescription = (userShortDescription) => ({ type: CHANGE_USER_SHORT_DESCRIPTION, payload: userShortDescription });
export const changeUserActivatedStatus = (activatedStatus) => ({ type: CHANGE_USER_ACTIVATED_STATUS, payload: activatedStatus });
export const changeUserBankName = (bankName) => ({ type: CHANGE_USER_BANK_NAME, payload: bankName });
export const changeUserAccountNumber = (accountNumber) => ({ type: CHANGE_USER_ACCOUNT_NUMBER, payload: accountNumber });
export const changeUserAccountHolder = (accountHolder) => ({ type: CHANGE_USER_ACCOUNT_HOLDER, payload: accountHolder });
export const changeUserJoinDate = (joinDate) => ({ type: CHANGE_USER_JOIN_DATE, payload: joinDate });
export const changeCorporationName = (corporationName) => ({ type: CHANGE_CORPORATION_NAME, payload: corporationName });
export const changeCorporationTel = (corporationTel) => ({ type: CHANGE_CORPORATION_TEL, payload: corporationTel });
export const updateAllFields = (fields) => ({ type: UPDATE_ALL_FIELDS, payload: fields });
export const changeBSN = (BSN) => ({ type: CHANGE_BSN, payload: BSN });
export const resetState = () => ({ type: RESET_STATE });

// 유저 CRUD
export const READ_USER = "READ_USER";
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // 로그인 성공
export const LOGOUT_USER = 'LOGOUT_USER'; // 로그아웃
export const SEND_REGISTER_EMAIL_SUCCESS = 'SEND_REGISTER_EMAIL_SUCCESS'; // 회원가입 이메일 인증 성공
export const SEND_EMAIL_VERIFICATION_SUCCESS = 'SEND_EMAIL_VERIFICATION_SUCCESS'; // 이메일 인증 코드 발송 성공
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS'; // 이메일 인증 성공
export const VERIFY_EMAIL_FAILURE = "VERIFY_EMAIL_FAILURE";
export const FIND_EMAIL_SUCCESS = 'FIND_EMAIL_SUCCESS'; // 이메일 찾기 성공
export const FIND_PASSWORD_SUCCESS = 'FIND_PASSWORD_SUCCESS'; // 비밀번호 찾기 성공
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS'; // 비밀번호 재설정 요청 성공
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'; // 비밀번호 변경 성공
export const VERIFY_PASSWORD = 'VERIFY_PASSWORD' // 비밀번호 검증
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS'; // 프로필 이미지 업로드 성공
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const GET_NEW_PASSWORD = "GET_NEW_PASSWORD";


// 마이 페이지 정보 가져오기
export const fetchMyPageInfo = () => async (dispatch) => {
    try {
        const response = await getMyPageInfo();
        dispatch({
            type: READ_USER,
            payload: response.data
        }); // 상태에 전체 데이터 업데이트
    } catch (error) {
        console.error('마이페이지 정보 가져오기 실패:', error);
    }
};

// 비밀번호 인증
export const apiVerifyPassword = (userNum, password) => async (dispatch) => {
    try {
        const response = await verifyPassword(userNum, password);

        if (response.status === 200) {
            dispatch({
                type: VERIFY_PASSWORD,
                payload: response.data,
            });
            return "ok"; // 비밀번호 검증 성공
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("비밀번호 검증 실패: 잘못된 비밀번호");
            return "fail"; // 비밀번호 검증 실패
        } else {
            console.error("비밀번호 검증 실패: 알 수 없는 오류", error);
            return "error"; // 기타 오류
        }
    }
};

// 특정 사용자 프로필 가져오기
export const fetchUserProfile = (userNum) => async (dispatch) => {
    try {
        const response = await getUserProfile(userNum);
        dispatch({
            type: READ_USER,
            payload: response.data
        });
    } catch (error) {
        console.error('사용자 프로필 가져오기 실패:', error);
    }
};

// 사용자 프로필 업데이트
export const updateProfile = (userNum, request) => async (dispatch) => {
    try {
        const response = await updateUserProfile(userNum, request);
        if (response.status === 200) {
            dispatch({
                type: UPDATE_USER_PROFILE,
                payload: response.data,
            });
            return "ok"; // 프로필 업데이트 성공
        }
    } catch (error) {
        console.error("프로필 업데이트 실패:", error);
        return "error"; // 프로필 업데이트 실패
    }
};

// 인증 관련 로직
// 회원 가입
export const register = (userInDTO) => async (dispatch) => {
    try {
        const response = await registerUser(userInDTO);
        if (response.status === 200) {
            dispatch({ type: CREATE_USER, payload: response.data });
            return "ok"; // 회원가입 성공
        }
    } catch (error) {
        console.error("회원가입 실패:", error);
        return "error"; // 회원가입 실패
    }
};

// 회원가입 이메일 인증 요청
export const sendEmailForRegister = (email) => async (dispatch) => {
    try {
        const response = await sendRegisterEmailCode(email);
        if (response.status === 200) {
            dispatch({ type: SEND_REGISTER_EMAIL_SUCCESS, payload: response.data });
            return "ok"; // 이메일 인증 요청 성공
        }
    } catch (error) {
        console.error("이메일 인증 요청 실패:", error);
        return "error"; // 이메일 인증 요청 실패
    }
};

// 이메일 인증 코드 발송
export const sendEmailVerificationCode = (email) => async (dispatch) => {
    try {
        const response = await sendEmailCode(email);
        if (response.status === 200) {
            dispatch({ type: SEND_EMAIL_VERIFICATION_SUCCESS, payload: response.data });
            return "ok"; // 이메일 인증 코드 발송 성공
        }
    } catch (error) {
        console.error("이메일 인증 코드 발송 실패:", error);
        return "error"; // 이메일 인증 코드 발송 실패
    }
};

// 이메일 인증 코드 검증
export const verifyEmail = (email, code) => async (dispatch) => {
    try {
        const response = await verifyEmailCode(email, code); // 이메일 인증 API 호출
        // 성공적인 인증 처리
        if (response.status === 200) {
            dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: response.data.message });
            return response.message;  // 성공 메시지 반환
        } else if(response.status === 422){
            dispatch({ type: VERIFY_EMAIL_FAILURE, payload: response.data.message });
            return response.message;  // 실패 메시지 반환
        }
    } catch (error) {
        console.error("이메일 인증 실패:", error);
        dispatch({ type: VERIFY_EMAIL_FAILURE, payload: "인증 코드 검증 중 오류가 발생했습니다." });
        return "인증 코드 검증 중 오류가 발생했습니다.";  // 예외 메시지 반환
    }
};
// 로그인 및 로그 아웃
export const login = (email, password) => async (dispatch) => {
    try {
        const response = await loginUser(email, password);
        if (response.status === 200) {
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            return "ok"; // 로그인 성공
        }
    } catch (error) {
        console.error("로그인 실패:", error);
        return "error"; // 로그인 실패
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        await logout();
        dispatch({ type: LOGOUT_USER }); // 상태 초기화
        return "ok"; // 로그아웃 성공
    } catch (error) {
        console.error("로그아웃 실패:", error);
        return "error"; // 로그아웃 실패
    }
};

// 닉네임 중복확인
export const checkNick = (nickName) => async (dispatch) => {
    try {
        const response = await checkNickName(nickName);
        dispatch({
            type: READ_USER,
            payload: response.data
        });
    } catch (error) {
        console.error('사용자 프로필 가져오기 실패:', error);
    }
};

// 사용자 관리 로직
// 회원 탈퇴
export const removeUser = (userNum) => async (dispatch) => {
    try {
        const response = await deleteUser(userNum);
        dispatch({ type: DELETE_USER, payload: response.data }); // 상태 초기화
        return "ok"; // 회원 탈퇴 성공
    } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        return "error"; // 회원 탈퇴 실패
    }
};

// 이름과 전화번호로 이메일 찾기
export const findEmail = (name, phoneNumber) => async (dispatch) => {
    try {
        const response = await findUserId(name, phoneNumber);
        console.log('이메일 찾기 성공:', response.data);
        dispatch({ type: FIND_EMAIL_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('이메일 찾기 실패:', error);
    }
};

// 이메일과 인증번호로 비밀번호 찾기
export const findPassword = (email, verificationCode) => async (dispatch) => {
    try {
        const response = await findUserPassword(email, verificationCode);
        console.log('비밀번호 찾기 성공:', response.data);
        dispatch({type : FIND_PASSWORD_SUCCESS, payload: response.data})
    }catch (error) {
        console.error('비밀번호 찾기 실패:', error)
    }
};

// 비밀번호 재설정 및 변경
export const resetUserPassword = (email) => async (dispatch) => {
    try {
        await resetPassword(email);
        dispatch({ type: RESET_PASSWORD_REQUEST_SUCCESS });
        return "ok"; // 비밀번호 재설정 요청 성공
    } catch (error) {
        console.error("비밀번호 재설정 요청 실패:", error);
        return "error"; // 비밀번호 재설정 요청 실패
    }
};

export const updateUserPassword = (request) => async (dispatch) => {
    try {
        const response = await changePassword(request);
        if (response.status == 200) {
            dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });
            return "ok";
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error("비밀번호 검증 실패: 잘못된 비밀번호");
            return "fail"; // 비밀번호 검증 실패
        } else {
            console.error("비밀번호 검증 실패: 알 수 없는 오류", error);
            return "error"; // 기타 오류
        }
    }
};

export const temporalUserPassword = (email, verificationCode) => async(dispatch) => {
    try{
        const response = await getTemporalPw(email, verificationCode);
        dispatch({
            type: GET_NEW_PASSWORD,
            payload: response.data
        })
    }catch(error){
        console.error("임시비밀번호를 발급할 수 없습니다.")
    }
}
// 이미지 업로드
//export const uploadProfileImage = (file) => async(dispatch) => {
//    try {
//        await uploadProfileImage(file);
//        dispatch({ type : 'UPDATE_USER', payload : response.data}); // 상태에 업로드된 이미지 URL 저장
//        console.log('이미지 업로드 성공:', response.data.url);
//    } catch (error) {
//        console.error('이미지 업로드 실패:', error);
//    }
//};

