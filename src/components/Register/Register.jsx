import React, { useState } from "react";
import "./Register.css";
import Btn from "../Buttons/Btn";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handelSignup = () => {
    if (password === rePassword) {
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
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
        <div className="errorArea">
          {password === rePassword ? "" : "PASSWORDS DO NOT MATCH"}
        </div>
      </div>
      <Btn name={"SIGN UP"} onClickProp={handelSignup} />
      <div className="notReg" onClick={() => navigate("/login")}>
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
