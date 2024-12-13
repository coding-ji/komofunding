import { createApplication } from "../../service/apiService";

// 신청서 CRUD
export const UPDATE_ALL_FIELDS = 'UPDATE_ALL_FIELDS';
export const RESET_STATE = "RESET_STATE";
export const READ_APPLICATION = "READ_APPLICATION";
export const CREATE_APPLICATION = "CREATE_APPLICATION";
export const UPDATE_APPLICATION = "UPDATE_APPLICATION";
export const DELETE_APPLICATION = "DELETE_APPLICATION";

export const resetState = () => ({
    type: RESET_STATE,
});

export const updateAllFields = (fields) => ({
    type: UPDATE_ALL_FIELDS,
    payload: fields
});

export const createUserApplication = (data) => async (dispatch) => {
    try {
        const response = await createApplication(data);

        if (response.status === 200) {
            dispatch({
                type: CREATE_APPLICATION,
                payload: response.data
            });
            return response.data;
        }
    } catch (error) {
            console.error("신청 실패");
            return "fail";
    }
}