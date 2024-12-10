import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import {
  readImgData,
  createImgData,
  updateImgData,
  deleteImgData,
  readFileData,
  createFileData,
  updateFileData,
  deleteFileData,
} from "./action";

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    readImgData: (filename) => readImgData(filename)(dispatch),
    createImgData: (formData) => createImgData(formData)(dispatch),
    updateImgData: (filename, updatedData) => updateImgData(filename, updatedData)(dispatch),
    deleteImgData: (filename) => deleteImgData(filename)(dispatch),
    
    readFileData: (filename) => readFileData(filename)(dispatch),
    createFileData: (formData) => createFileData(formData)(dispatch),
    updateFileData: (filename, updatedData) => updateFileData(filename, updatedData)(dispatch),
    deleteFileData: (filename) => deleteFileData(filename)(dispatch),
  };

  return { state, actions };
};