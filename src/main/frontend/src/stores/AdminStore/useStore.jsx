import { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import { fetchUsers, fetchUserById } from './action';

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    fetchUsers: () => fetchUsers()(dispatch),
    fetchUserById: (userNum) => fetchUserById(userNum)(dispatch),
  };

  return { state, actions };
};
