import {
  fetchAllUsers as apiFetchAllUsers,
  fetchAllProjectsForAdmin,
  deleteProjectByAdmin,
} from '../../service/apiService';

// 액션 타입 정의
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const FETCH_ADMIN_PROJECTS = 'FETCH_ADMIN_PROJECTS';
export const FETCH_ADMIN_PROJECTS_SUCCESS = 'FETCH_ADMIN_PROJECTS_SUCCESS';
export const FETCH_ADMIN_PROJECTS_ERROR = 'FETCH_ADMIN_PROJECTS_ERROR';

export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';

// 유저 목록 조회
export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS });
  try {
    const response = await apiFetchAllUsers();
    dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USERS_ERROR, payload: error.message });
  }
};

// 어드민 프로젝트 전체 조회
export const fetchAdminProjects = () => async (dispatch) => {
  dispatch({ type: FETCH_ADMIN_PROJECTS });
  try {
    const response = await fetchAllProjectsForAdmin();
    const projectData = Array.isArray(response.data) ? response.data : response.data.data; // 데이터가 배열인지 확인 후 변환
    dispatch({ type: FETCH_ADMIN_PROJECTS_SUCCESS, payload: projectData});
  } catch (error) {
    dispatch({ type: FETCH_ADMIN_PROJECTS_ERROR, payload: error.message });
  }
};

// 프로젝트 삭제
export const deleteProject = (projectNum) => async (dispatch) => {
  try {
    await deleteProjectByAdmin(projectNum);
    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: projectNum });
  } catch (error) {
    console.error("Admin 프로젝트 삭제 실패:", error);
  }
};
