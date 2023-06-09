import React from "react";
import "./Login.css";
import Btn from "../Buttons/Btn";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <div className="formMain">
      <div className="formInner">
        <input placeholder="Email" />
        <input placeholder="Password" />
      </div>
      <Btn name={"LOGIN"} />
      <Link className="notReg">Not registered yet?</Link>
    </div>
  );
};

export default Login;
