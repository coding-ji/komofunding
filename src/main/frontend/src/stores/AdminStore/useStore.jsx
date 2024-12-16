import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import { fetchUsers, fetchAdminProjects, deleteProject } from './action';

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    fetchUsers: () => fetchUsers()(dispatch), // 유저 리스트 조회
    fetchAdminProjects: () => fetchAdminProjects()(dispatch), // 어드민 프로젝트 조회
    deleteProject: (projectNum) => deleteProject(projectNum)(dispatch), // 프로젝트 삭제
  };

  return { state, actions };
};
