import React, { useContext, useEffect, useReducer } from "react";
import API from "../api/AxiosInterceptor";

import {
  START_LOADING,
  STOP_LOADING,
  SET_USER,
  AUTH_USER_SUCCESS,
  LOGOUT_USER,
  SET_ERROR_MESSAGE,
  SET_CLIENT_ERROR_MESSAGE,
  FETCH_JOBS_SUCCESS,
  FETCH_SINGLE_JOB_SUCCESS,
  CLEAR_SINGLE_JOB,
  CREATE_JOB_SUCCESS,
  EDIT_JOB_SUCCESS,
  DELETE_JOB_SUCCESS,
  SET_EDIT_COMPLETE,
} from "./actionTypes";
import reducer from "./reducer";

const initialState = {
  user: null,
  isLoading: false,
  jobs: null,
  singleJob: null,
  errorMessage: null,
  clientErrorMessage: null,
  editComplete: false,
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startLoading = () => {
    if (!state.isLoading) dispatch({ type: START_LOADING });
  };
  const stopLoading = () => {
    dispatch({ type: STOP_LOADING });
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

  const setClientErrorMessage = (message) => {
    dispatch({ type: SET_CLIENT_ERROR_MESSAGE, payload: message });
  };

  const clearSingleJob = () => {
    dispatch({ type: CLEAR_SINGLE_JOB });
  };
  const register = async (userData) => {
    startLoading();
    try {
      const { data } = await API.post(`/auth/register`, userData);
      dispatch({ type: AUTH_USER_SUCCESS, payload: data.user.name });
      storeUserInLocalStorage(data);
    } catch (err) {
      stopLoading();
    }
  };

  const login = async (userData) => {
    startLoading();
    try {
      const { data } = await API.post(`/auth/login`, userData);
      dispatch({ type: AUTH_USER_SUCCESS, payload: data.user.name });
      storeUserInLocalStorage(data);
    } catch (err) {
      stopLoading();
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
      stopLoading();
    }
  };

  const fetchSingleJob = async (jobId) => {
    startLoading();
    try {
      const { data } = await API.get(`/jobs/${jobId}`);
      dispatch({ type: FETCH_SINGLE_JOB_SUCCESS, payload: data.job });
    } catch (err) {
      clearSingleJob();
      stopLoading();
    }
  };

  const createJob = async (jobData, clearForm) => {
    startLoading();
    try {
      const { data } = await API.post(`/jobs`, jobData);
      dispatch({ type: CREATE_JOB_SUCCESS, payload: data.job });
      clearForm();
    } catch (err) {
      stopLoading();
    }
  };

  const editJob = async (jobId, jobData) => {
    startLoading();
    try {
      const { data } = await API.patch(`/jobs/${jobId}`, jobData);
      dispatch({ type: EDIT_JOB_SUCCESS, payload: data.job });
    } catch (err) {
      dispatch({ type: SET_EDIT_COMPLETE, payload: false });
      stopLoading();
    }
  };

  const deleteJob = async (jobId) => {
    startLoading();
    try {
      await API.delete(`/jobs/${jobId}`);
      dispatch({ type: DELETE_JOB_SUCCESS, payload: jobId });
    } catch (err) {
      stopLoading();
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
        setClientErrorMessage,
        fetchJobs,
        fetchSingleJob,
        createJob,
        editJob,
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
