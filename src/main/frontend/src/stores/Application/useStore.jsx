import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { updateAllFields, resetState, createUserApplication } from "./action";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    updateAllFields: (fields) => dispatch(updateAllFields(fields)),
    resetState: () => dispatch(resetState()),
    createUserApplication: (data) => createUserApplication(data)(dispatch),
  };

  return { state, actions };
};
