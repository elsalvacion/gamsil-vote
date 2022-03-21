import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginBtn = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <GoogleLogin
      clientId="381620487424-v23s7evj4474dc1fdhu7kee2ecn4egvv.apps.googleusercontent.com"
      buttonText="Login with IUT email"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      className="w-full filter-none text-center"
      fetchBasicProfile={true}
      redirectUri="http://localhost:3000/home"
    />
  );
};

export default GoogleLoginBtn;
