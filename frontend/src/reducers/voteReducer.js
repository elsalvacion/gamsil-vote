import {
  RELEASE_RESULTS_ERRORS,
  RELEASE_RESULTS_LOADING,
  RELEASE_RESULTS_RESET,
  RELEASE_RESULTS_SUCCESS,
  SEND_VOTE_ERRORS,
  SEND_VOTE_LOADING,
  SEND_VOTE_RESET,
  SEND_VOTE_SUCCESS,
  START_O_STOP_ERRORS,
  START_O_STOP_LOADING,
  START_O_STOP_RESET,
  START_O_STOP_SUCCESS,
  _GET_START_O_STOP_ERRORS,
  _GET_START_O_STOP_LOADING,
  _GET_START_O_STOP_RESET,
  _GET_START_O_STOP_SUCCESS,
} from "./types/voteTypes";

export const sendVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_VOTE_LOADING:
      return {
        loading: true,
      };
    case SEND_VOTE_SUCCESS:
      return {
        success: true,
      };
    case SEND_VOTE_ERRORS:
      return {
        errors: action.payload,
      };
    case SEND_VOTE_RESET:
      return {};
    default:
      return state;
  }
};

export const releaseResultReducer = (state = {}, action) => {
  switch (action.type) {
    case RELEASE_RESULTS_LOADING:
      return {
        loading: true,
      };
    case RELEASE_RESULTS_SUCCESS:
      return {
        success: true,
      };
    case RELEASE_RESULTS_ERRORS:
      return {
        errors: action.payload,
      };
    case RELEASE_RESULTS_RESET:
      return {};
    default:
      return state;
  }
};

export const startOStopReducer = (state = {}, action) => {
  switch (action.type) {
    case START_O_STOP_LOADING:
      return {
        loading: true,
      };
    case START_O_STOP_SUCCESS:
      return {
        success: true,
      };
    case START_O_STOP_ERRORS:
      return {
        errors: action.payload,
      };
    case START_O_STOP_RESET:
      return {};
    default:
      return state;
  }
};

export const getStartOStopReducer = (state = {}, action) => {
  switch (action.type) {
    case _GET_START_O_STOP_LOADING:
      return {
        loading: true,
      };
    case _GET_START_O_STOP_SUCCESS:
      return {
        isOpen: Number(action.payload),
        success: true,
      };
    case _GET_START_O_STOP_ERRORS:
      return {
        errors: action.payload,
      };
    case _GET_START_O_STOP_RESET:
      return {};
    default:
      return state;
  }
};
