import {
    fetchImg,
    createImg,
    updateImg,
    deleteImg,
    fetchFile,
    createFile,
    updateFile,
    deleteFile
} from '../../service/fileService';

// 이미지 CRUD
export const READ_IMG = "READ_IMG";
export const CREATE_IMG = 'CREATE_IMG';
export const UPDATE_IMG = 'UPDATE_IMG';
export const DELETE_IMG = 'DELETE_IMG';


// 파일 CRUD
export const READ_FILE = "READ_FILE";
export const CREATE_FILE = 'CREATE_FILE';
export const UPDATE_FILE = 'UPDATE_FILE';
export const DELETE_FILE = 'DELETE_FILE';


// 이미지 불러오기
export const readImgData = (filename) => async (dispatch) => {
    try {
        const response = await fetchImg(filename);
        dispatch({
            type: READ_IMG,
            payload: response.data,
        });
    } catch (error) {
        console.error("이미지를 불러올 수 없습니다.", error);
    }
};

// 이미지 업로드
export const createImgData = (formData) => async (dispatch) => {
    try {
        const response = await createImg(formData);
        dispatch({
            type: CREATE_IMG,
            payload: response.data,
        });
    } catch (error) {
        console.error("이미지 업로드 실패", error);
    }
};

// 이미지 업데이트
export const updateImgData = (filename, updatedData) => async (dispatch) => {
    try {
        const response = await updateImg(filename, updatedData);
        dispatch({
            type: UPDATE_IMG,
            payload: response.data,
        });
    } catch (error) {
        console.error("이미지 업데이트 실패", error);
    }
};

// 이미지 삭제
export const deleteImgData = (filename) => async (dispatch) => {
    try {
        await deleteImg(filename);
        dispatch({
            type: DELETE_IMG,
            payload: filename,
        });
    } catch (error) {
        console.error("이미지 삭제 실패", error);
    }
};

// 파일 불러오기
export const readFileData = (filename) => async (dispatch) => {
    try {
        const response = await fetchFile(filename);
        dispatch({
            type: READ_FILE,
            payload: response.data,
        });
    } catch (error) {
        console.error("파일을 불러올 수 없습니다.", error);
    }
};

// 파일 업로드
export const createFileData = (formData) => async (dispatch) => {
    try {
        const response = await createFile(formData);
        dispatch({
            type: CREATE_FILE,
            payload: response.data,
        });
    } catch (error) {
        console.error("파일 업로드 실패", error);
    }
};

// 파일 업데이트
export const updateFileData = (filename, updatedData) => async (dispatch) => {
    try {
        const response = await updateFile(filename, updatedData);
        dispatch({
            type: UPDATE_FILE,
            payload: response.data,
        });
    } catch (error) {
        console.error("파일 업데이트 실패", error);
    }
};

// 파일 삭제
export const deleteFileData = (filename) => async (dispatch) => {
    try {
        await deleteFile(filename);
        dispatch({
            type: DELETE_FILE,
            payload: filename,
        });
    } catch (error) {
        console.error("파일 삭제 실패", error);
    }
};