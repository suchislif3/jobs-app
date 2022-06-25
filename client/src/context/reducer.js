import {
  SET_USER,
  AUTH_USER_SUCCESS,
  LOGOUT_USER,
  START_LOADING,
  STOP_LOADING,
  SET_ERROR_MESSAGE,
  SET_CLIENT_ERROR_MESSAGE,
  FETCH_JOBS_SUCCESS,
  FETCH_SINGLE_JOB_SUCCESS,
  CLEAR_SINGLE_JOB,
  CREATE_JOB_SUCCESS,
  EDIT_JOB_SUCCESS,
  SET_EDIT_COMPLETE,
  DELETE_JOB_SUCCESS,
} from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        clientErrorMessage: null,
        editComplete: false,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_USER:
      return { ...state, user: action.payload };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isLoading: false,
        jobs: null,
        singleJob: null,
        errorMessage: null,
        clientErrorMessage: null,
        editComplete: false,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SET_CLIENT_ERROR_MESSAGE:
      return {
        ...state,
        clientErrorMessage: action.payload,
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        jobs: action.payload,
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
    case CLEAR_SINGLE_JOB:
      return {
        ...state,
        singleJob: null,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: [action.payload, ...state.jobs],
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
        clientErrorMessage: null,
        editComplete: true,
      };
    case SET_EDIT_COMPLETE:
      return {
        ...state,
        editComplete: false,
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
