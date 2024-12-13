import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { resetState, updateAllFields, createDonorByProject, readDonorsByProjectNum } from "./action";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    resetState: () => dispatch(resetState),
    updateAllFields: (data) => dispatch(updateAllFields(data)),
    createDonorByProject: (projectNum, payment) => createDonorByProject(projectNum, payment)(dispatch),
    readDonorsByProjectNum: (projectNum) => readDonorsByProjectNum(projectNum)(dispatch)
  };

  return { state, actions };
};
