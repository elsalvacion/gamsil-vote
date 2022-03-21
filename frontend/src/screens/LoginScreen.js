import React from "react";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

const LoginScreen = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b  from-blue-400 via-white to-green-400 ">
      <div className="bg-white rounded p-4 w-10/12 md:w-1/2 shadow-md  mt-16">
        <img
          src="/assets/gamsil.jpeg"
          alt="gamsil"
          className="mx-auto w-32 h-32 relative rounded-full mb-5"
        />
        <h1 className="text-center font-bold my-5 text-3xl">Login To Vote</h1>

        {/* google login */}
        <GoogleLoginBtn />
      </div>
    </div>
  );
};

export default LoginScreen;
