import React from "react";
import "./Button.css";

const Button = ({ text, clickfunction }) => {
  return (
    <button className="myBtn" onClick={clickfunction}>
      {text}
    </button>
  );
};

export default Button;
