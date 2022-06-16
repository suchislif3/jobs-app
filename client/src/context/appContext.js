import React, { useContext, useEffect, useReducer } from "react";
import API from "../api/AxiosInterceptor";

import {
  START_LOADING,
  SET_USER,
  AUTH_USER_SUCCESS,
  LOGOUT_USER,
  AUTH_USER_ERROR,
  SET_ERROR_MESSAGE,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
} from "./actionTypes";
import reducer from "./reducer";

const initialState = {
  user: null,
  isLoading: false,
  jobs: null,
  singleJob: null,
  errorMessage: null,
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startLoading = () => {
    if (!state.isLoading) dispatch({ type: START_LOADING });
  };

  const storeUserInLocalStorage = (data) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: data.user.name, token: data.token })
    );
  };

  const setErrorMessage = (message) => {
    dispatch({ type: SET_ERROR_MESSAGE, payload: message });
  };

  const register = async (userData) => {
    startLoading();
    try {
      const { data } = await API.post(`/auth/register`, userData);
      dispatch({ type: AUTH_USER_SUCCESS, payload: data.user.name });
      storeUserInLocalStorage(data);
    } catch (err) {
      dispatch({
        type: AUTH_USER_ERROR,
        payload: err.response.data.msg || "Something went wrong.",
      });
    }
  };

  const login = async (userData) => {
    startLoading();
    try {
      const { data } = await API.post(`/auth/login`, userData);
      dispatch({ type: AUTH_USER_SUCCESS, payload: data.user.name });
      storeUserInLocalStorage(data);
    } catch (err) {
      dispatch({
        type: AUTH_USER_ERROR,
        payload: err.response.data?.msg || "Something went wrong.",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT_USER });
  };

  const fetchJobs = async () => {
    startLoading();
    try {
      const { data } = await API.get(`/jobs`);
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs });
    } catch (err) {
      dispatch({
        type: FETCH_JOBS_ERROR,
        payload: err.response.data?.msg || "Fetching data failed.",
      });
    }
  };

  const createJob = async (jobData, clearForm) => {
    startLoading();
    try {
      const { data } = await API.post(`/jobs`, jobData);
      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job });
      clearForm();
    } catch (err) {
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: err.response.data?.msg || "Creating job failed.",
      });
    }
  };

  const deleteJob = async (jobId) => {
    startLoading();
    try {
      await API.delete(`/jobs/${jobId}`);
      dispatch({ type: DELETE_JOB_SUCCESS, payload: jobId });
    } catch (err) {
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: err.response.data?.msg || "Deleting job failed.",
      });
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const newUser = JSON.parse(user);
      dispatch({ type: SET_USER, payload: newUser.name });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        setErrorMessage,
        fetchJobs,
        createJob,
        deleteJob,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
