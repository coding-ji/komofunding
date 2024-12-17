import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import { updateAllFields,  resetState,  fetchUsers, fetchAdminProjects, deleteProject} from './action';

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    updateAllFields: () => dispatch(updateAllFields()),
    resetState: () => dispatch(resetState()),
    fetchUsers: () => fetchUsers()(dispatch),
    fetchAdminProjects:() => fetchAdminProjects()(dispatch),
    deleteProject: () => deleteProject()(dispatch)
  };

  return { state, actions };
};
