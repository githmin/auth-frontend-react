import React, { useState } from "react";
import "./Register.css";
import Btn from "../Buttons/Btn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [vaidEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const isValidEmail = (email) => {
    /\S+@\S+\.\S+/.test(email) ? setValidEmail(true) : setValidEmail(false);
  };

  const handelSignup = () => {
    if (email === "" || password === "" || rePassword === "") {
      toast.warn("Please input all details");
      return;
    } else if (password === rePassword && vaidEmail) {
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
          (response) => {
            console.log(response);
            if (response.status === 200) {
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
      <div className="formInner">
        <h1 className="title">SIGN UP</h1>
        <input
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            isValidEmail(e.target.value);
          }}
        />
        {vaidEmail || email === "" ? (
          ""
        ) : (
          <div className="errorArea">Please Enter A Valid Email</div>
        )}
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

        {password === rePassword ? (
          ""
        ) : (
          <div className="errorArea">Passwords do not match</div>
        )}
      </div>
      <Btn name={"SIGN UP"} onClickProp={handelSignup} />
      <div className="notReg" onClick={() => navigate("/")}>
        Already registered? Login here
      </div>
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
