import {
    fetchDonorsByProjectNum,
    createPayment
} from "../../service/apiService";

export const READ_PAYMENT = "READ_PAYMENT";
export const CREATE_PAYMENT = "CREATE_PAYMENT";
export const UPDATE_PAYMENT = "UPDATE_PAYMENT";
export const DELETE_PAYMENT = "DELETE_PAYMENT";
export const UPDATE_ALL_FIELDS = "UPDATE_ALL_FIELDS";
export const RESET_STATE = "RESET_STATE";

export const resetState = () => ({ type: RESET_STATE });
export const updateAllFields = (data) => ({ type: UPDATE_ALL_FIELDS, payload: data });

export const readDonorsByProjectNum = (projectNum) => async (dispatch) => {
    try {
        const response = await fetchDonorsByProjectNum(projectNum);
        dispatch({
            type: READ_PAYMENT,
            payload: response.data
        });
    } catch (error) {
        console.error("정보 불러오기 실패 ");
    }
}

export const createDonorByProject = (projectNum, payment) => async (dispatch) => {
    try {
        const response = await createPayment(projectNum, payment);
        dispatch({
            type: CREATE_PAYMENT,
            payload: response.data
        });
    } catch (error) {
            console.error("결제실패");
    }
}