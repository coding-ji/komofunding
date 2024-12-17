import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import {
  fetchUsers,
  fetchAdminProjects,
  deleteProject,
  deactivate,
  updateAllFields,
  resetState
} from './action';

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    fetchUsers: (userNum) => fetchUsers(userNum)(dispatch), // 유저 리스트 조회
    fetchAdminProjects: (projectNum) => fetchAdminProjects(projectNum)(dispatch), // 어드민 프로젝트 조회
    deleteProject: (projectNum) => deleteProject(projectNum)(dispatch), // 프로젝트 삭제
    deactivate: (userNum, deactivationData) => deactivate(userNum, deactivationData)(dispatch), // 관리자의 회원 탈퇴, 정지

    updateAllFields: () => dispatch(updateAllFields()),
    resetState: () => dispatch(resetState()),
  };

  return { state, actions };
};
