import React, { useState } from "react";
import "./Login.css";
import Btn from "../Buttons/Btn";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          if (response.status === 200) {
            toast.success(
              "You're seeing this message because your login was successfull!"
            );
          }
        },
        (error) => {
          toast.error("Please check your credintials and try again!");
        }
      );
  };

  return (
    <div className="formMain">
      <div className="formInner">
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Btn name={"LOGIN"} onClickProp={handleLogin} />
      <div className="notReg" onClick={() => navigate("/signup")}>
        Not registered yet? Register here
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

export default Login;
