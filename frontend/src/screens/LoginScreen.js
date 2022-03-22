import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

const LoginScreen = () => {
  const { userInfo, errors } = useSelector((state) => state.userLogin);
  const history = useHistory();
  useEffect(() => {
    if (userInfo) history.push("/home");
  }, [userInfo, history]);
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b  from-blue-400 via-white to-green-400 ">
      <div className="bg-white rounded p-4 w-10/12 md:w-1/2 shadow-md  mt-16">
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
      </div>
    </div>
  );
};

export default LoginScreen;
