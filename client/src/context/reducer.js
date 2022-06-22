import {
  SET_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  LOGOUT_USER,
  START_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
  FETCH_SINGLE_JOB_SUCCESS,
  FETCH_SINGLE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_ERROR,
} from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        editComplete: false,
      };
    case SET_USER:
      return { ...state, user: action.payload };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case AUTH_USER_ERROR:
      return {
        ...state,
        user: null,
        isLoading: false,
        errorMessage: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        errorMessage: null,
        jobs: null,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.payload,
      };
    case FETCH_JOBS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case FETCH_SINGLE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        singleJob: {
          ...action.payload,
          applicationDate: new Date(
            Date.parse(action.payload.applicationDate)
          ).toLocaleDateString("en-CA"),
        },
      };
    case FETCH_SINGLE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        singleJob: null,
        errorMessage: action.payload,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: [action.payload, ...state.jobs],
      };
    case CREATE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case EDIT_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleJob: {
          ...action.payload,
          applicationDate: new Date(
            Date.parse(action.payload.applicationDate)
          ).toLocaleDateString("en-CA"),
        },
        errorMessage: null,
        editComplete: true,
      };
    case EDIT_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        editComplete: false,
        errorMessage: action.payload,
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
        errorMessage: null,
      };
    case DELETE_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
