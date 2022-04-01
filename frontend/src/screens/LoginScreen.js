import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../components/Card";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import Loading from "../components/Loading";
import { VERIFY_USER_RESET } from "../reducers/types/userTypes";

const LoginScreen = () => {
  const { userInfo, errors, loading } = useSelector((state) => state.userLogin);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) history.push("/home");
    dispatch({
      type: VERIFY_USER_RESET,
    });
  }, [userInfo, history, dispatch]);
  return (
    <div className="h-full w-full  flex justify-center ">
      {loading && <Loading text="Verifying your credentials" />}
      <Card>
        <img
          src="/assets/gamsil.jpeg"
          alt="gamsil"
          className="mx-auto w-32 h-32 mb-5"
        />

        {errors ? (
          <ul className="mb-3">
            {errors.map((error) => (
              <li className="py-1 text-red-500">* {error.msg}</li>
            ))}
          </ul>
        ) : (
          <h1 className="text-center font-bold my-5 text-3xl">Login To Vote</h1>
        )}

        {/* google login */}
        <GoogleLoginBtn />
      </Card>
    </div>
  );
};

export default LoginScreen;
