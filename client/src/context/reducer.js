import {
  SET_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  LOGOUT_USER,
  START_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_ERROR,
} from "./actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case SET_USER:
      return { ...state, user: action.payload };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        errorMessage: null,
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
        jobs: [],
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
        errorMessage: null,
        jobs: action.payload,
      };
    case FETCH_JOBS_ERROR:
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
