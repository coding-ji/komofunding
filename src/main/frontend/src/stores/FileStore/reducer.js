import {
    READ_IMG,
    CREATE_IMG,
    UPDATE_IMG,
    DELETE_IMG,
    READ_FILE,
    CREATE_FILE,
    UPDATE_FILE,
    DELETE_FILE,
    RESET_STATE
} from "./action";

export const initialState = "";

export const reducer = (state, action) => {
    switch (action.type) {
        // 이미지 관련 액션 처리
        case READ_IMG:
            return action.payload;  // 이미지 URL을 상태에 반영


        case CREATE_IMG:
            return action.payload;  // 이미지 URL을 상태에 반영


        case UPDATE_IMG:
            return action.payload;   // 이미지 URL 업데이트 후 상태 갱신


        case DELETE_IMG:
            return action.payload;  // 이미지 삭제 후 상태에서 URL 비우기

        // 파일 관련 액션 처리
        case READ_FILE:
            return action.payload;

        case CREATE_FILE:
            return action.payload;

        case UPDATE_FILE:
            return action.payload;

        case DELETE_FILE:
            return action.payload;

        // 초기화
        case RESET_STATE:
            return initialState;

        default:
            return state;
    }
};