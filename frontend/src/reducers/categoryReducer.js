import {
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_LOADING,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_LOADING,
  DELETE_CATEGORY_RESET,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_LOADING,
  FETCH_CATEGORY_RESET,
  FETCH_CATEGORY_SUCCESS,
  FETCH_SINGLE_CATEGORY_ERROR,
  FETCH_SINGLE_CATEGORY_LOADING,
  FETCH_SINGLE_CATEGORY_RESET,
  FETCH_SINGLE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_LOADING,
  UPDATE_CATEGORY_RESET,
  UPDATE_CATEGORY_SUCCESS,
} from "./types/categoryTypes";

export const fetchCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        categories: action.payload,
      };
    case FETCH_CATEGORY_ERROR:
      return {
        errors: action.payload,
      };
    case FETCH_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchSingleCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case FETCH_SINGLE_CATEGORY_SUCCESS:
      return {
        category: action.payload,
      };
    case FETCH_SINGLE_CATEGORY_ERROR:
      return {
        errors: action.payload,
      };
    case FETCH_SINGLE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        success: true,
      };
    case CREATE_CATEGORY_ERROR:
      return {
        errors: action.payload,
      };
    case CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        success: true,
      };
    case DELETE_CATEGORY_ERROR:
      return {
        errors: action.payload,
      };
    case DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

export const editCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_LOADING:
      return {
        loading: true,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        success: true,
      };
    case UPDATE_CATEGORY_ERROR:
      return {
        errors: action.payload,
      };
    case UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
