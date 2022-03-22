import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer } from "./reducers/userReducer";

const initialState = {
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducers = combineReducers({
  userLogin: userLoginReducer,
});

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
