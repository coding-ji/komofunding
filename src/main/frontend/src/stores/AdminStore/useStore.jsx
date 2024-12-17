import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import {
  fetchUsers,
  fetchAdminProjects,
  deleteProject,
  deactivate,
  updateAllFields,
  resetState,
  approve,
  reject,
  visibility,
  fetchAllProject
} from './action';

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {

    updateAllFields: () => dispatch(updateAllFields()),
    resetState: () => dispatch(resetState()),


    fetchUsers: (userNum) => fetchUsers(userNum)(dispatch), // 유저 리스트 조회
    fetchAdminProjects: (projectNum) => fetchAdminProjects(projectNum)(dispatch), // 어드민 프로젝트 조회
    fetchAllProject: () => fetchAllProject()(dispatch),
    deleteProject: (projectNum) => deleteProject(projectNum)(dispatch), // 프로젝트 삭제
    deactivate: (userNum, deactivationData) => deactivate(userNum, deactivationData)(dispatch), // 관리자의 회원 탈퇴, 정지
    approve: (projectNum) => approve(projectNum)(dispatch), // 프로젝트 승인
    reject: (projectNum) => reject(projectNum)(dispatch), // 프로젝트 거부
    visibility: (projectNum) => visibility(projectNum)(dispatch) // 프로젝트 공개 / 숨김
  };

  return { state, actions };
};
