import {
    CHANGE_QNA_CATEGORY,
    CHANGE_QNA_NUMBER,
    CHANGE_NICKNAME,
    CHANGE_USER_NUM,
    CHANGE_WRITTEN_DATE,
    CHANGE_TITLE,
    CHANGE_QUESTION_COMMENT,
    CHANGE_ANSWER_NICKNAME,
    CHANGE_ANSWER_NUM,
    CHANGE_ANSWER_WRITTEN_DATE,
    CHANGE_ANSWER,
    UPDATE_ALL_FIELDS,
    RESET_STATE,
    READ_QNA,
    CREATE_QNA,
    UPDATE_QNA,
    DELETE_QNA,
} from "./action";


export const initialState = {};

// 리듀서 함수
export const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_QNA_CATEGORY:
            return { ...state, qnaCategory: action.payload };
        case CHANGE_QNA_NUMBER:
            return { ...state, qnaNumber: action.payload };
        case CHANGE_NICKNAME:
            return { ...state, nickName: action.payload };
        case CHANGE_USER_NUM:
            return { ...state, userNum: action.payload };
        case CHANGE_WRITTEN_DATE:
            return { ...state, writtenDate: action.payload };
        case CHANGE_TITLE:
            return { ...state, title: action.payload };
        case CHANGE_QUESTION_COMMENT:
            return { ...state, questionComment: action.payload };
        case CHANGE_ANSWER_NICKNAME:
            return { ...state, answerNickName: action.payload };
        case CHANGE_ANSWER_NUM:
            return { ...state, answerNum: action.payload };
        case CHANGE_ANSWER_WRITTEN_DATE:
            return { ...state, answerWrittenDate: action.payload };
        case CHANGE_ANSWER:
            return { ...state, answer: action.payload };
        case UPDATE_ALL_FIELDS:
            return { ...state, ...action.payload }; // 모든 필드를 업데이트
        case RESET_STATE:
            return initialState; // 초기 상태로 리셋
            
        case READ_QNA:
            return { ...state, ...action.payload }; // QnA 읽기
        case CREATE_QNA:
            return { ...state, ...action.payload }; // QnA 생성
        case UPDATE_QNA:
            return { ...state, ...action.payload }; // QnA 수정
        case DELETE_QNA:
            return initialState; 
        default:
            return state;
    }
};