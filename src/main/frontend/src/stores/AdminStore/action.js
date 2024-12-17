import {
  fetchAllUsers,
  fetchAllProjectsForAdmin,
  deleteProjectByAdmin,
  deactivateUser,
  approveProject,
  rejectProject,
  ProjectVisibility,
  fetchAllProjects
} from '../../service/apiService';

// 초기화
export const RESET_STATE = "RESET_STATE";

// 액션 타입 정의
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const UPDATE_ALL_FIELDS = 'UPDATE_ALL_FIELDS';
export const FETCH_ADMIN_PROJECTS = 'FETCH_ADMIN_PROJECTS';
export const FETCH_ADMIN_PROJECTS_SUCCESS = 'FETCH_ADMIN_PROJECTS_SUCCESS';

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
export const fetchUsers = (userNum) => async (dispatch) => {
  dispatch({ type: FETCH_USERS });
  try {
    const response = await fetchAllUsers(userNum);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("유저목록을 불러올 수 없습니다.");
  }
};

// 프로젝트 전체 조회
export const fetchAllProject = () => async (dispatch) => {
  dispatch({ type: FETCH_ADMIN_PROJECTS });
  try {
    const response = await fetchAllProjects();
    dispatch({ type: READ_PROJECT, payload: response.data});
  } catch (error) {
    console.error("프로젝트 전체 목록을 불러올 수 없습니다.");
  }
};

// 어드민 특정 프로젝트 조회
export const fetchAdminProjects = (projectNum) => async (dispatch) => {
  dispatch({ type: FETCH_ADMIN_PROJECTS });
  try {
    const response = await fetchAllProjectsForAdmin(projectNum);
    dispatch({ type: FETCH_ADMIN_PROJECTS_SUCCESS, payload: response.data});
  } catch (error) {
    console.error("특정 프로젝트를 불러올 수 없습니다.");
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

// 유저 탈퇴, 정지 시키고 이유
export const deactivate = (userNum, deactivationData) => async (dispatch) => {
  try {
    const response = await deactivateUser(userNum, deactivationData);
    dispatch({type : UPDATE_USER, payload : response.data})
  }catch (error) {
    console.error('유저 데이터 수정 실패:', error)
    throw error;
  }
};

// 프로젝트 승인
export const approve = (projectNum) => async (dispatch) => {
  try {
    const response = await approveProject(projectNum);
    dispatch({type : UPDATE_PROJECT, payload : response.data})
  }catch (error) {
    console.error('프로젝트 승인 실패:', error)
    throw error;
  }
};

// 프로젝트 거절
export const reject = (projectNum) => async (dispatch) => {
  try {
    const response = await rejectProject(projectNum);
    dispatch({type : UPDATE_PROJECT, payload : response.data})
  }catch (error) {
    console.error('프로젝트 거절 실패:', error)
    throw error;
  }
};

// 프로젝트 공개 / 숨김 처리
export const visibility = (projectNum) => async (dispatch) => {
  try {
    const response = await ProjectVisibility(projectNum);
    dispatch({type : UPDATE_PROJECT, payload : response.data})
  }catch (error) {
    console.error('프로젝트 거절 실패:', error)
    throw error;
  }
};