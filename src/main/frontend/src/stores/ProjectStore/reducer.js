// 액션 타입 (액션 정의)
import {
    CHANGE_USER_NICKNAME,
    CHANGE_EMAIL,
    CHANGE_PHONE_NUMBER,
    CHANGE_USER_SHORT_DESCRIPTION,
    CHANGE_PROJECT_NUM,
    CHANGE_TITLE,
    CHANGE_PROJECT_CATEGORY,
    CHANGE_PROJECT_THUMBNAIL_IMGS,
    CHANGE_PROJECT_SHORT_DESCRIPTION,
    CHANGE_DESCRIPTION,
    CHANGE_ITEMS,
    CHANGE_CURRENT_AMOUNT,
    CHANGE_TOTAL_AMOUNT,
    CHANGE_PROJECT_START_DATE,
    CHANGE_PROJECT_END_DATE,
    CHANGE_WRITTEN_DATE,
    CHANGE_APPROVAL_DATE,
    CHANGE_REJECTION_DATE,
    CHANGE_IS_HIDDEN,
    CHANGE_PROGRESS_RATE,
    CHANGE_QNA_LIST,
    CHANGE_SUPPORTERS,
    UPDATE_ALL_FIELDS,
    RESET_STATE,
    READ_PROJECT,
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from "./action";

// 초기 상태 정의
export const initialState = {};

// 리듀서
export const reducer = (state, action) => {
    switch (action.type) {
        // 사용자 관련 상태 변경
        case CHANGE_USER_NICKNAME:
            return { ...state, userNickname: action.payload };
        case CHANGE_EMAIL:
            return { ...state, email: action.payload };
        case CHANGE_PHONE_NUMBER:
            return { ...state, phoneNumber: action.payload };
        case CHANGE_USER_SHORT_DESCRIPTION:
            return { ...state, shortDescription: action.payload };

        // 프로젝트 관련 상태 변경
        case CHANGE_PROJECT_NUM:
            return { ...state, projectNum: action.payload };
        case CHANGE_TITLE:
            return { ...state, title: action.payload };
        case CHANGE_PROJECT_CATEGORY:
            return { ...state, projectCategory: action.payload };
        case CHANGE_PROJECT_THUMBNAIL_IMGS:
            return { ...state, thumnailImgs: action.payload };
        case CHANGE_PROJECT_SHORT_DESCRIPTION:
            return { ...state, shortDescription: action.payload };
        case CHANGE_DESCRIPTION:
            return { ...state, description: action.payload };
        case CHANGE_ITEMS:
            return { ...state, items: action.payload };
        case CHANGE_CURRENT_AMOUNT:
            return { ...state, currentAmount: action.payload };
        case CHANGE_TOTAL_AMOUNT:
            return { ...state, totalAmount: action.payload };
        case CHANGE_PROJECT_START_DATE:
            return { ...state, projectStartDate: action.payload };
        case CHANGE_PROJECT_END_DATE:
            return { ...state, projectEndDate: action.payload };
        case CHANGE_WRITTEN_DATE:
            return { ...state, writtenDate: action.payload };
        case CHANGE_APPROVAL_DATE:
            return { ...state, approvalDate: action.payload };
        case CHANGE_REJECTION_DATE:
            return { ...state, rejectionDate: action.payload };
        case CHANGE_IS_HIDDEN:
            return { ...state, isHidden: action.payload };
        case CHANGE_PROGRESS_RATE:
            return { ...state, progressRate: action.payload };
        case CHANGE_QNA_LIST:
            return { ...state, qnaList: action.payload };
        case CHANGE_SUPPORTERS:
            return { ...state, supporters: action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload };

        // 초기화
        case RESET_STATE:
            return initialState;


        // 프로젝트 CRUD
        case READ_PROJECT:
            return { ...state, project: action.payload };
        case CREATE_PROJECT:
            return { ...state, project: action.payload }; // 프로젝트 생성 후, 프로젝트 정보 업데이트
        case UPDATE_PROJECT:
            return { ...state, project: action.payload }; // 프로젝트 업데이트 후, 새로운 정보로 상태 변경
        case DELETE_PROJECT:
            return { ...state, project: null }; // 프로젝트 삭제 시 상태를 초기화
        default:
            return state;
    }
};