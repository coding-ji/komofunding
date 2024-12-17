import {
  fetchAllUsers,
  fetchAllProjectsForAdmin,
  deleteProjectByAdmin,
} from '../../service/apiService';

// 모든 필드
export const UPDATE_ALL_FIELDS = 'UPDATE_ALL_FIELDS';

// 초기화 
export const RESET_STATE = "RESET_STATE";

// 유저 CRUD
export const READ_USER = "READ_USER";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

// 프로젝트 CRUD
export const READ_PROJECT = "READ_PROJECT";
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

// 모든 필드
export const updateAllFields = (fields) => ({
    type: UPDATE_ALL_FIELDS,
    payload: fields
});

// 초기화
export const resetState = () => ({
    type: RESET_STATE,
});

// 유저 목록 조회
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await fetchAllUsers();
    dispatch({ type: READ_USER, payload: response.data });
  } catch (error) {
    console.error("유저목록을 불러올 수 없습니다.");
  }
};

// 어드민 프로젝트 전체 조회
export const fetchAdminProjects = () => async (dispatch) => {
  try {
    const response = await fetchAllProjectsForAdmin();
    dispatch({ type: READ_PROJECT, payload: response.data });
  } catch (error) {
    console.error("프로젝트 전체 목록을 불러올 수 없습니다. ");
  }
};

// 프로젝트 삭제
export const deleteProject = (projectNum) => async (dispatch) => {
  try {
    const response = await deleteProjectByAdmin(projectNum);
    dispatch({ type: DELETE_PROJECT, payload: response.data });
  } catch (error) {
    console.error("Admin 프로젝트 삭제 실패:", error);
  }
};
