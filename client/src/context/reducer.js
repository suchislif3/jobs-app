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
  SET_DATABASE_JOBS_ORDER,
  SET_SAVE_JOBS_ORDER_TIMEOUT_ID,
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
        databaseJobsOrder: null,
        saveJobsOrderTimeoutId: null,
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
        databaseJobsOrder: action.payload?.length
          ? action.payload.map((job) => job._id).toString()
          : null,
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
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
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
        editComplete: action.payload,
      };
    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
        errorMessage: null,
      };
    case SET_DATABASE_JOBS_ORDER:
      return {
        ...state,
        databaseJobsOrder: action.payload,
      };
    case SET_SAVE_JOBS_ORDER_TIMEOUT_ID:
      return {
        ...state,
        saveJobsOrderTimeoutId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
