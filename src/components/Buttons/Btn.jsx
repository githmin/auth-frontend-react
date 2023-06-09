import React from "react";
import "./Btn.css";

const Btn = (props) => {
  return <button className="btn01" onClick={props.onClickProp}>{props.name}</button>;
};

export default Btn;
