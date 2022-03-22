import {
  DELETE_USER_ERROR,
  DELETE_USER_LOADING,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  FETCH_SINGLE_USER_ERROR,
  FETCH_SINGLE_USER_LOADING,
  FETCH_SINGLE_USER_RESET,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_LOADING,
  FETCH_USERS_RESET,
  FETCH_USERS_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_LOADING,
  REGISTER_USER_RESET,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_LOADING,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./types/userTypes";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        userInfo: action.payload,
      };
    case USER_LOGIN_ERROR:
      return {
        errors: action.payload,
      };
    case USER_LOGOUT:
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

export const fetchUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_LOADING:
      return {
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
      };
    case FETCH_USERS_ERROR:
      return {
        errors: action.payload,
      };
    case FETCH_USERS_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchSingleUserReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER_LOADING:
      return {
        loading: true,
      };
    case FETCH_SINGLE_USER_SUCCESS:
      return {
        user: action.payload,
      };
    case FETCH_SINGLE_USER_ERROR:
      return {
        errors: action.payload,
      };
    case FETCH_SINGLE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_LOADING:
      return {
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        success: true,
      };
    case REGISTER_USER_ERROR:
      return {
        errors: action.payload,
      };
    case REGISTER_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_LOADING:
      return {
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        success: true,
      };
    case DELETE_USER_ERROR:
      return {
        errors: action.payload,
      };
    case DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const editUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_LOADING:
      return {
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        success: true,
      };
    case UPDATE_USER_ERROR:
      return {
        errors: action.payload,
      };
    case UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};
