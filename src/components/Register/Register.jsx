import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Btn from "../Buttons/Btn";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OauthLogin from "../Oauth/OauthLogin";
import GuestBtn from "../Buttons/GuestBtn";

const Register = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [vaidEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // Check email validity according to RegExpressions
  const isValidEmail = (email) => {
    /\S+@\S+\.\S+/.test(email) ? setValidEmail(true) : setValidEmail(false);
  };

  const handelSignup = () => {
    // Check if all input fields are filled
    if (email === "" || password === "" || rePassword === "") {
      toast.warn("Please input all details");
      return;
    } else if (password === rePassword && vaidEmail) {
      //API call if passwords match and email is valid
      const instance = axios.create({
        withCredentials: true,
        baseURL: props.host,
      });

      instance
        .post("/api/auth/register", {
          email,
          password,
        })
        .then(
          (res) => {
            if (res.status === 200) {
              toast.success("Signup Successfull");
            }
          },
          (error) => {
            toast.error("Signup Unsuccessfull");
          }
        );
    }
  };

  return (
    <div
      className="
    formMain"
    >
      {/* Form start*/}
      <div className="formInner">
        <h1 className="title">SIGN UP</h1>
        <input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            isValidEmail(e.target.value);
          }}
        />
        {/* Display error if email is not valid */}
        {vaidEmail || email === "" ? (
          ""
        ) : (
          <div className="errorArea">Please Enter A Valid Email</div>
        )}
        {/* --- Error display end --- */}
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Re-enter password"
          type="password"
          className={password === rePassword ? "match" : "notMatch"}
          onChange={(e) => setRePassword(e.target.value)}
        />

        {/* Display error  if passwords do not match */}
        {password === rePassword ? (
          ""
        ) : (
          <div className="errorArea">Passwords do not match</div>
        )}
        {/* --- Error display end --- */}
      </div>
      <Btn name={"SIGN UP"} onClickProp={handelSignup} />

      {/* Nav to Login page */}
      <div className="notReg" onClick={() => navigate("/")}>
        Already registered? Login here
      </div>

      <div className="orContainer">
        <div className="orContainerLine"></div> &nbsp; Or &nbsp;
        <div className="orContainerLine"></div>
      </div>

      {/* Oauth Component */}
      <OauthLogin
        fbText={"Signup with Facebook"}
        gText={"Signup with Google"}
      ></OauthLogin>

      <GuestBtn />

      {/* Toast Message Container  --- Keep under all other components*/}
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Register;
