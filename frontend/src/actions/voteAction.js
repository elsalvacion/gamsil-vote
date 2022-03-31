import axios from "axios";
import { USER_LOGIN_SUCCESS } from "../reducers/types/userTypes";
import {
  RELEASE_RESULTS_ERRORS,
  RELEASE_RESULTS_LOADING,
  RELEASE_RESULTS_SUCCESS,
  SEND_VOTE_ERRORS,
  SEND_VOTE_LOADING,
  SEND_VOTE_SUCCESS,
  START_O_STOP_ERRORS,
  START_O_STOP_LOADING,
  START_O_STOP_SUCCESS,
  _GET_START_O_STOP_ERRORS,
  _GET_START_O_STOP_LOADING,
  _GET_START_O_STOP_SUCCESS,
} from "../reducers/types/voteTypes";
import { logoutUser } from "./userAction";

export const sendVotes = (votes) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_VOTE_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/vote`,
      {
        votes,
      },
      config
    );

    if (data) {
      const newInfo = userInfo;
      newInfo.voted = 1;
      localStorage.setItem("userInfo", JSON.stringify(newInfo));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: newInfo,
      });
      dispatch({
        type: SEND_VOTE_SUCCESS,
      });
    }
  } catch (err) {
    console.log(err.response);
    if (err.response.data && err.response.data.errors)
      err.response.data.errors.forEach((error) => {
        if (
          error.msg === "Not Authorized: No Token" ||
          error.msg === "Not Authorized: Invalid User" ||
          error.msg === "Not authorized as an admin"
        ) {
          dispatch(logoutUser());
        }
      });
    dispatch({
      type: SEND_VOTE_ERRORS,
      payload: err.response.data.errors,
    });
  }
};

export const releaseElectionResults = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RELEASE_RESULTS_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/vote/release`, config);

    if (data) {
      dispatch({
        type: RELEASE_RESULTS_SUCCESS,
      });
    }
  } catch (err) {
    console.log(err.response);
    if (err.response.data && err.response.data.errors)
      err.response.data.errors.forEach((error) => {
        if (
          error.msg === "Not Authorized: No Token" ||
          error.msg === "Not Authorized: Invalid User" ||
          error.msg === "Not authorized as an admin"
        ) {
          dispatch(logoutUser());
        }
      });
    dispatch({
      type: RELEASE_RESULTS_ERRORS,
      payload: err.response.data.errors,
    });
  }
};

// start/stop vote
export const startOStopElection = (isOpen) => async (dispatch, getState) => {
  try {
    dispatch({
      type: START_O_STOP_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/vote/start-o-stop`,
      {
        isOpen: isOpen ? 1 : 0,
      },
      config
    );

    if (data) {
      dispatch({
        type: START_O_STOP_SUCCESS,
      });
    }
  } catch (err) {
    console.log(err.response);
    if (err.response.data && err.response.data.errors)
      err.response.data.errors.forEach((error) => {
        if (
          error.msg === "Not Authorized: No Token" ||
          error.msg === "Not Authorized: Invalid User" ||
          error.msg === "Not authorized as an admin"
        ) {
          dispatch(logoutUser());
        }
      });
    dispatch({
      type: START_O_STOP_ERRORS,
      payload: err.response.data.errors,
    });
  }
};

// get start or stop
export const getStartOStopElection = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: _GET_START_O_STOP_LOADING,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/vote/start-o-stop`, config);
    if (data) {
      dispatch({
        type: _GET_START_O_STOP_SUCCESS,
        payload: data.msg,
      });
    }
  } catch (err) {
    console.log(err.response);
    if (err.response.data && err.response.data.errors)
      err.response.data.errors.forEach((error) => {
        if (
          error.msg === "Not Authorized: No Token" ||
          error.msg === "Not Authorized: Invalid User" ||
          error.msg === "Not authorized as an admin"
        ) {
          dispatch(logoutUser());
        }
      });
    dispatch({
      type: _GET_START_O_STOP_ERRORS,
      payload: err.response.data.errors,
    });
  }
};
