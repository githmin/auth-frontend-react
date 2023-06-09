import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Btn from "../Buttons/Btn";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handeling Login
  const handleLogin = () => {
    const instance = axios.create({
      withCredentials: true,
      baseURL: props.host,
    });
    instance
      .post("/api/auth/login", {
        email,
        password,
      })
      .then(
        (response) => {
          toast.success(
            "You're seeing this message because your login was successfull!"
          );
        },
        (error) => {
          toast.error("Please check your credintials and try again!");
        }
      );
  };

  return (
    <div className="formMain">
      {/* Form start*/}
      <div className="formInner">
        <h1 className="title">LOGIN</h1>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Btn name={"LOGIN"} onClickProp={handleLogin} />

      {/* Nav to Signup page */}
      <div className="notReg" onClick={() => navigate("/signup")}>
        Not registered yet? Register here
      </div>

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

export default Login;
