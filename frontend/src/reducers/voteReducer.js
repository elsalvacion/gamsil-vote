import {
  RELEASE_RESULTS_ERRORS,
  RELEASE_RESULTS_LOADING,
  RELEASE_RESULTS_RESET,
  RELEASE_RESULTS_SUCCESS,
  SEND_VOTE_ERRORS,
  SEND_VOTE_LOADING,
  SEND_VOTE_RESET,
  SEND_VOTE_SUCCESS,
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
