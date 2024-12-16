import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_ADMIN_PROJECTS,
  FETCH_ADMIN_PROJECTS_SUCCESS,
  FETCH_ADMIN_PROJECTS_ERROR,
  DELETE_PROJECT_SUCCESS,
} from './action';

export const initialState = {
  users: [], // 유저 데이터
  adminProjects: [], // 어드민 프로젝트 데이터
  loading: false, // 로딩 상태
  error: null, // 에러 상태
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS:
    case FETCH_ADMIN_PROJECTS:
      return { ...state, loading: true, error: null };

    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case FETCH_ADMIN_PROJECTS_SUCCESS:
      return { ...state, loading: false, adminProjects: action.payload };

    case FETCH_USERS_ERROR:
    case FETCH_ADMIN_PROJECTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        adminProjects: state.adminProjects.filter(
          (project) => project.projectNum !== action.payload
        ),
      };

    default:
      return state;
  }
};
