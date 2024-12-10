import {
    READ_IMG,
    CREATE_IMG,
    UPDATE_IMG,
    DELETE_IMG,
    READ_FILE,
    CREATE_FILE,
    UPDATE_FILE,
    DELETE_FILE
} from "./action";

export const initialState = {};

export const reducer = (state, action) => {
    switch (action.type) {
        // 이미지 관련 액션 처리
        case READ_IMG:
            return { ...state, img: action.payload };

        case CREATE_IMG:
            return { ...state, img: action.payload }; // 이미지 업로드 후 상태 갱신

        case UPDATE_IMG:
            return { ...state, img: action.payload }; // 이미지 업데이트 후 상태 갱신

        case DELETE_IMG:
            return { ...state, img: null }; // 이미지 삭제 후 상태 갱신 (null로 설정)

        // 파일 관련 액션 처리
        case READ_FILE:
            return { ...state, file: action.payload };

        case CREATE_FILE:
            return { ...state, file: action.payload }; // 파일 업로드 후 상태 갱신

        case UPDATE_FILE:
            return { ...state, file: action.payload }; // 파일 업데이트 후 상태 갱신

        case DELETE_FILE:
            return { ...state, file: null }; // 파일 삭제 후 상태 갱신 (null로 설정)

        default:
            return state;
    }
};