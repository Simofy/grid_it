import {
  SET_USER_NAME,
  SET_CANVAS_DATA,
  SET_SIDEBAR,
  SET_LOGIN,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_DATA_LIMIT,
} from "./constant";

import { ActionType, CellDataType } from "../types/types";

export const setUserName = (value: string): ActionType => {
  return {
    type: SET_USER_NAME,
    value,
  };
};

export const setCanvasData = (value: CellDataType[]): ActionType => {
  return {
    type: SET_CANVAS_DATA,
    value,
  };
};

export const setSideBar = (value: string): ActionType => {
  return {
    type: SET_SIDEBAR,
    value,
  };
};

export const setLogin = (value: string): ActionType => {
  return {
    type: SET_LOGIN,
    value,
  };
};
export const setErrorMsg = (value: string): ActionType => {
  return {
    type: SET_ERROR_MESSAGE,
    value,
  };
};
export const setLoading = (value: boolean): ActionType => {
  return {
    type: SET_LOADING,
    value,
  };
};
export const setDataLimit = (value: boolean): ActionType => {
  return {
    type: SET_DATA_LIMIT,
    value,
  };
};
