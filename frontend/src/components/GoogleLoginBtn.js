import React from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userAction";
const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const responseGoogle = (response) => {
    // console.log(response.profileObj.email)
    dispatch(loginUser(response.profileObj.email));
  };
  return (
    <>
      <GoogleLogin
        clientId="381620487424-v23s7evj4474dc1fdhu7kee2ecn4egvv.apps.googleusercontent.com"
        buttonText="Login with IUT email"
        onSuccess={responseGoogle}
        cookiePolicy={"single_host_origin"}
        className="w-full filter-none text-center"
      />
      <p className="py-3 text-blue-500 text-sm">
        * If you are not registered you cannot login either. Contact admin so
        that you can be registered.
      </p>
    </>
  );
};

export default GoogleLoginBtn;
