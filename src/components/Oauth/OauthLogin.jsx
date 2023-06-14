import React from "react";

import facebookImg from "../../assets/facebookImg.png";
import googleImg from "../../assets/googleImg.png";

import "./Oauth.css";

const OauthLogin = (props) => {
  const google = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };
  const facebook = () => {
    window.open("http://localhost:3001/auth/facebook", "_self");
  };
  return (
    <div className="OauthLogin">
      <div className="loginButton google" onClick={google}>
        <img src={googleImg} alt="" className="icon" /> &nbsp; {props.gText}
      </div>
      <div className="loginButton facebook" onClick={facebook}>
        <img src={facebookImg} alt="" className="icon" />
        &nbsp; {props.fbText}
      </div>
    </div>
  );
};

export default OauthLogin;
