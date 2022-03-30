import {
  CREATE_CANDIDATE_ERROR,
  CREATE_CANDIDATE_LOADING,
  CREATE_CANDIDATE_RESET,
  CREATE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_ERROR,
  DELETE_CANDIDATE_LOADING,
  DELETE_CANDIDATE_RESET,
  DELETE_CANDIDATE_SUCCESS,
  FETCH_CANDIDATE_ERROR,
  FETCH_CANDIDATE_LOADING,
  FETCH_CANDIDATE_RESET,
  FETCH_CANDIDATE_SUCCESS,
  FETCH_SINGLE_CANDIDATE_ERROR,
  FETCH_SINGLE_CANDIDATE_LOADING,
  FETCH_SINGLE_CANDIDATE_RESET,
  FETCH_SINGLE_CANDIDATE_SUCCESS,
  UPDATE_CANDIDATE_ERROR,
  UPDATE_CANDIDATE_LOADING,
  UPDATE_CANDIDATE_RESET,
  UPDATE_CANDIDATE_SUCCESS,
  UPLOAD_IMAGE_ERROR,
  UPLOAD_IMAGE_LOADING,
  UPLOAD_IMAGE_RESET,
  UPLOAD_IMAGE_SUCCESS,
} from "./types/candidateTypes";

export const fetchCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CANDIDATE_LOADING:
      return {
        loading: true,
      };
    case FETCH_CANDIDATE_SUCCESS:
      return {
        candidates: action.payload,
      };
    case FETCH_CANDIDATE_ERROR:
      return {
        errors: action.payload,
      };
    case FETCH_CANDIDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchSingleCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SINGLE_CANDIDATE_LOADING:
      return {
        loading: true,
      };
    case FETCH_SINGLE_CANDIDATE_SUCCESS:
      return {
        candidate: action.payload,
      };
    case FETCH_SINGLE_CANDIDATE_ERROR:
      return {
        errors: action.payload,
      };
    case FETCH_SINGLE_CANDIDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const createCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CANDIDATE_LOADING:
      return {
        loading: true,
      };
    case CREATE_CANDIDATE_SUCCESS:
      return {
        success: true,
      };
    case CREATE_CANDIDATE_ERROR:
      return {
        errors: action.payload,
      };
    case CREATE_CANDIDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CANDIDATE_LOADING:
      return {
        loading: true,
      };
    case DELETE_CANDIDATE_SUCCESS:
      return {
        success: true,
      };
    case DELETE_CANDIDATE_ERROR:
      return {
        errors: action.payload,
      };
    case DELETE_CANDIDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const editCandidateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CANDIDATE_LOADING:
      return {
        loading: true,
      };
    case UPDATE_CANDIDATE_SUCCESS:
      return {
        success: true,
      };
    case UPDATE_CANDIDATE_ERROR:
      return {
        errors: action.payload,
      };
    case UPDATE_CANDIDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_LOADING:
      return {
        loading: true,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        image: action.payload,
      };
    case UPLOAD_IMAGE_ERROR:
      return {
        errors: action.payload,
      };
    case UPLOAD_IMAGE_RESET:
      return {};
    default:
      return state;
  }
};
