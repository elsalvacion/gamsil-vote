import axios from "axios";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../reducers/types/userTypes";
export const loginUser = (email) => async (dispatch) => {
  console.log(email);
  try {
    dispatch({
      type: USER_LOGIN_LOADING,
    });

    const { data } = await axios.post(
      "/user/login",
      {
        email,
      },
      {
        "Content-Type": "application/json",
      }
    );
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.msg,
    });

    localStorage.setItem("userInfo", JSON.stringify(data.msg));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: err.response.data.errors,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("userInfo");
};
